// src/contexts/FichaContext.js
"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useTheme } from 'next-themes';

// 1. Criamos a "frequência"
const FichaContext = createContext();

// 2. Criamos o Provider
export function FichaProvider({ children }) {
    const { id } = useParams(); // Pega o ID da URL automaticamente
    const [fichaAtual, setFichaAtual] = useState(null);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [configSistema, setConfigSistema] = useState({});

    // 2. Buscar o JSON ao carregar a página (coloque junto ou logo abaixo do outro useEffect)
    useEffect(() => {
        fetch('/json/v0-9/config-sistema.json')
            .then(res => res.json())
            .then(data => setConfigSistema(data))
            .catch(err => console.error("Erro ao carregar configSistema:", err));
    }, []);

    useEffect(() => {
        const fichasSalvas = localStorage.getItem('fichas');
        if (fichasSalvas) {
            const arrayDeFichas = JSON.parse(fichasSalvas);
            setFichaAtual(arrayDeFichas.find(f => f.id === id) || null);
        }
    }, [id]);

    const { resolvedTheme } = useTheme();

    const salvarFicha = () => {
        const fichasSalvas = localStorage.getItem('fichas');
        if (fichasSalvas) {
            let arrayDeFichas = JSON.parse(fichasSalvas);
            arrayDeFichas = arrayDeFichas.map(f => f.id === id ? fichaAtual : f);
            localStorage.setItem('fichas', JSON.stringify(arrayDeFichas));
            setModoEdicao(false);

            toast.success("Ficha salva com sucesso!", {
                position: "bottom-right",
                autoClose: 2500,
                theme: resolvedTheme === 'dark' ? 'dark' : 'light',
            });
        }
    };

    const cancelarEdicao = () => {
        setModoEdicao(false); // Sai do modo de edição

        // 2. Busca os dados originais no localStorage para descartar as alterações
        const fichasSalvas = localStorage.getItem('fichas');
        if (fichasSalvas) {
            const arrayDeFichas = JSON.parse(fichasSalvas);
            const fichaOriginal = arrayDeFichas.find(f => f.id === id);
            setFichaAtual(fichaOriginal || null);
        }
    };

    //calcula Atributos
    let atributosFinais = null;

    if (fichaAtual && fichaAtual.ficha.atributos) {
        const atributosObj = fichaAtual.ficha.atributos;

        atributosFinais = Object.keys(atributosObj).reduce((acumulador, chave) => {
            const inicial = Number(atributosObj[chave].valorInicial) || 0;
            const adicional = Number(atributosObj[chave].valorAdicional) || 0;

            acumulador[chave] = inicial + adicional;
            return acumulador;
        }, {});
    }

    //Calcula Resistência & Precursores

    let resistsEPrecursFinais = null;
    let sorteBase = 15
    let multiplicadorResitencia = 4
    let multiplicadorPrecursor = 3

    if (fichaAtual && atributosFinais) {
        const r = fichaAtual.ficha.resistencias;
        const p = fichaAtual.ficha.precursores;

        // Função interna para automatizar a matemática do Normal, Difícil e Extremo
        const calcularResistEPrecur = (valorAtributo, multiplicador, objOrigem) => {
            const adicional = Number(objOrigem.valorAdicional) || 0;
            const base = (valorAtributo * multiplicador) + adicional;

            return {
                adicional,
                vantagem: objOrigem.vantagem || 0,
                normal: base,
                dificil: Math.floor(base / 2),
                extremo: Math.floor(base / 5)
            };
        };

        resistsEPrecursFinais = {
            // Resistências
            fortitude: calcularResistEPrecur(atributosFinais.corpo || 0, multiplicadorResitencia, r.fortitude),
            reflexo: calcularResistEPrecur(atributosFinais.destreza || 0, multiplicadorResitencia, r.reflexo),
            vontade: calcularResistEPrecur(atributosFinais.persona || 0, multiplicadorResitencia, r.vontade),
            // Precursores
            ideia: calcularResistEPrecur(atributosFinais.inteligencia || 0, multiplicadorPrecursor, p.ideia),
            saber: calcularResistEPrecur(atributosFinais.educacao || 0, multiplicadorPrecursor, p.saber),
            sorte: calcularResistEPrecur(sorteBase, 1, p.sorte)
        };
    }

    // 3. CÁLCULO DE PERÍCIAS
    let periciasFinais = [];

    if (fichaAtual && atributosFinais && configSistema?.pericias?.length > 0) {
        // Trocamos o .map() pelo .flatMap()
        periciasFinais = fichaAtual.ficha.pericias.flatMap((pericia, index) => {

            const regra = configSistema.pericias.find(b => b.nome.toLowerCase() === pericia.nome.toLowerCase()) || {};

            const int = Number(pericia.pontosInt) || 0;
            const edu = Number(pericia.pontosEdu) || 0;
            const exp = Number(pericia.pontosExp) || 0;
            const custom = Number(pericia.valorCustom) || 0;
            const pontosInvestidos = int + edu + exp + custom;

            // EXCEÇÃO: Se o atributo for um Array (Ex: ["destreza", "corpo"])
            if (Array.isArray(regra.atributo)) {
                return regra.atributo.map(attr => {
                    const valorBase = (atributosFinais[attr] || 0) * (regra.multiplicador || 1);
                    const total = valorBase + pontosInvestidos;

                    return {
                        ...pericia,
                        nomeExibicao: `${pericia.nome} (${attr})`, // Cria o nome "luta (corpo)"
                        chaveUnica: `${pericia.nome}-${attr}`, // Cria uma chave para o React não reclamar
                        originalIndex: index,
                        valorBase,
                        normal: total,
                        dificil: Math.floor(total / 2),
                        extremo: Math.floor(total / 5)
                    };
                });
            }
            // REGRA PADRÃO: Atributo único ou Valor Fixo
            else {
                let valorBase = 0;
                if (regra.atributo && atributosFinais[regra.atributo]) {
                    valorBase = atributosFinais[regra.atributo] * (regra.multiplicador || 1);
                } else if (regra.valorFixo !== undefined) {
                    valorBase = regra.valorFixo;
                }

                const total = valorBase + pontosInvestidos;

                return [{
                    ...pericia,
                    nomeExibicao: pericia.nome, // Mantém o nome normal
                    chaveUnica: pericia.nome,
                    originalIndex: index,
                    valorBase,
                    normal: total,
                    dificil: Math.floor(total / 2),
                    extremo: Math.floor(total / 5)
                }];
            }
        });

    }

    // --- NOVAS FUNÇÕES DE ATUALIZAÇÃO ---
    // --- ATUALIZAÇÃO DE SAÚDE E DANO ---
    const atualizarDano = (tipoDano, valor) => {
        setFichaAtual(prev => ({
            ...prev, ficha: {
                ...prev.ficha,
                saude: {
                    ...prev.ficha.saude,
                    dano: { ...prev.ficha.saude.dano, [tipoDano]: valor }
                }
            }
        }));
    };

    const atualizarTotalSaude = (tipoSaude, valor) => {
        setFichaAtual(prev => ({
            ...prev, ficha: {
                ...prev.ficha,
                saude: {
                    ...prev.ficha.saude,
                    [tipoSaude]: { ...prev.ficha.saude[tipoSaude], valorAdicional: valor }
                }
            }
        }));
    };

    // Funções para o Array de Status Atuais
    const adicionarStatus = (objetoPadrao) => {
        setFichaAtual(prev => ({
            ...prev, ficha: { ...prev.ficha, saude: { ...prev.ficha.saude, statusAtuais: [...(prev.ficha.saude.statusAtuais || []), objetoPadrao] } }
        }));
    };

    const atualizarStatus = (index, campo, valor) => {
        setFichaAtual(prev => {
            const novoArray = [...(prev.ficha.saude.statusAtuais || [])];
            novoArray[index] = { ...novoArray[index], [campo]: valor };
            return { ...prev, ficha: { ...prev.ficha, saude: { ...prev.ficha.saude, statusAtuais: novoArray } } };
        });
    };

    const removerStatus = (index) => {
        setFichaAtual(prev => {
            const novoArray = (prev.ficha.saude.statusAtuais || []).filter((_, i) => i !== index);
            return { ...prev, ficha: { ...prev.ficha, saude: { ...prev.ficha.saude, statusAtuais: novoArray } } };
        });
    };

    //FALTA ADICIONAR PERICIA E REMOVER PERICIA
    const atualizarPericia = (index, campo, valor) => { setFichaAtual(prev => { const novoArray = [...prev.ficha.pericias]; novoArray[index] = { ...novoArray[index], [campo]: valor }; return { ...prev, ficha: { ...prev.ficha, pericias: novoArray } }; }); };
    const atualizarResistencia = (resistencia, campo, valor) => { setFichaAtual(prev => ({ ...prev, ficha: { ...prev.ficha, resistencias: { ...prev.ficha.resistencias, [resistencia]: { ...prev.ficha.resistencias[resistencia], [campo]: valor } } } })); };
    const atualizarPrecursor = (precursor, campo, valor) => { setFichaAtual(prev => ({ ...prev, ficha: { ...prev.ficha, precursores: { ...prev.ficha.precursores, [precursor]: { ...prev.ficha.precursores[precursor], [campo]: valor } } } })); };
    const atualizarCampoBase = (campo, valor) => { setFichaAtual(prev => ({ ...prev, ficha: { ...prev.ficha, [campo]: valor } })); };
    const atualizarCampoBloco = (bloco, campo, valor) => setFichaAtual(prev => ({ ...prev, ficha: { ...prev.ficha, [bloco]: { ...prev.ficha[bloco], [campo]: valor } } }));
    const atualizarAtributo = (atributo, campo, valor) => setFichaAtual(prev => ({ ...prev, ficha: { ...prev.ficha, atributos: { ...prev.ficha.atributos, [atributo]: { ...prev.ficha.atributos[atributo], [campo]: valor } } } }));
    const adicionarStringArray = (nomeArray) => setFichaAtual(prev => ({ ...prev, ficha: { ...prev.ficha, [nomeArray]: [...prev.ficha[nomeArray], ""] } }));
    const atualizarStringArray = (nomeArray, index, valor) => setFichaAtual(prev => { const novo = [...prev.ficha[nomeArray]]; novo[index] = valor; return { ...prev, ficha: { ...prev.ficha, [nomeArray]: novo } }; });
    const removerStringArray = (nomeArray, index) => setFichaAtual(prev => { const novo = prev.ficha[nomeArray].filter((_, i) => i !== index); return { ...prev, ficha: { ...prev.ficha, [nomeArray]: novo } }; });
    const adicionarObjetoArray = (nomeArray, objetoPadrao) => setFichaAtual(prev => ({ ...prev, ficha: { ...prev.ficha, [nomeArray]: [...prev.ficha[nomeArray], objetoPadrao] } }));
    const atualizarObjetoArray = (nomeArray, index, campo, valor) => setFichaAtual(prev => { const novo = [...prev.ficha[nomeArray]]; novo[index] = { ...novo[index], [campo]: valor }; return { ...prev, ficha: { ...prev.ficha, [nomeArray]: novo } }; });
    const removerObjetoArray = (nomeArray, index) => setFichaAtual(prev => { const novo = prev.ficha[nomeArray].filter((_, i) => i !== index); return { ...prev, ficha: { ...prev.ficha, [nomeArray]: novo } }; });

    // 3. O que a antena vai transmitir? (Tudo que está no 'value')
    return (
        <FichaContext.Provider value={{
            fichaAtual,
            configSistema,
            modoEdicao,
            setModoEdicao,
            salvarFicha,
            cancelarEdicao,
            atributosFinais,
            resistsEPrecursFinais,
            periciasFinais,
            atualizarCampoBase,
            atualizarCampoBloco,
            atualizarAtributo,
            adicionarStringArray,
            atualizarStringArray,
            removerStringArray,
            adicionarObjetoArray,
            atualizarObjetoArray,
            removerObjetoArray,
            atualizarResistencia,
            atualizarPrecursor,
            atualizarPericia,
            atualizarDano,
            atualizarTotalSaude,
            adicionarStatus,
            atualizarStatus,
            removerStatus
        }}>
            {children}
        </FichaContext.Provider>
    );
}

export function useFicha() {
    return useContext(FichaContext);
}