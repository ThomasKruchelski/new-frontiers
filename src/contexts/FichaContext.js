// src/contexts/FichaContext.js
"use client"

import { createContext, useContext, useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useTheme } from 'next-themes';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';

const FichaContext = createContext();

export function FichaProvider({ children }) {
    const { id } = useParams(); // Pega o ID da URL automaticamente
    const [fichaAtual, setFichaAtual] = useState(null);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [configSistema, setConfigSistema] = useState({});

    useEffect(() => {
        fetch('/json/v0-9/config-sistema.json')
            .then(res => res.json())
            .then(data => setConfigSistema(data))
            .catch(err => console.error("Erro ao carregar configSistema:", err));
    }, []);

    // 1. BUSCAR A FICHA VIA API
    useEffect(() => {
        if (!id) return;

        const buscarFichaNaApi = async () => {
            try {
                const resposta = await fetch(`/api/fichas/${id}`);

                if (resposta.ok) {
                    const dados = await resposta.json();
                    setFichaAtual(dados);
                } else {
                    toast.error("Ficha não encontrada!");
                }
            } catch (erro) {
                console.error("Erro ao buscar a ficha na API:", erro);
                toast.error("Erro ao conectar com o servidor.");
            }
        };

        buscarFichaNaApi();
    }, [id]);

    const { resolvedTheme } = useTheme();

    const salvarFicha = async () => {
        if (!fichaAtual || !id) return;

        try {
            const resposta = await fetch(`/api/fichas/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ficha: fichaAtual.ficha }) // Envia só a parte editável
            });

            if (resposta.ok) {
                setModoEdicao(false);
                toast.success("Ficha salva com sucesso!", {
                    position: "bottom-right",
                    autoClose: 2500,
                    theme: resolvedTheme === 'dark' ? 'dark' : 'light',
                });
            } else {
                throw new Error("Falha na API");
            }
        } catch (erro) {
            console.error("Erro ao salvar:", erro);
            toast.error("Erro ao salvar as alterações.");
        }
    };

    const cancelarEdicao = async () => {
        setModoEdicao(false);

        // Refaz o fetch para pegar o dado original do banco novamente
        try {
            const resposta = await fetch(`/api/fichas/${id}`);
            if (resposta.ok) {
                const dados = await resposta.json();
                setFichaAtual(dados);
            }
        } catch (erro) {
            console.error("Erro ao reverter ficha:", erro);
        }
    };

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

    let resistsEPrecursFinais = null;
    let sorteBase = 15
    let multiplicadorResitencia = 4
    let multiplicadorPrecursor = 3

    if (fichaAtual && atributosFinais) {
        const r = fichaAtual.ficha.resistencias;
        const p = fichaAtual.ficha.precursores;

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
                        nomeExibicao: `${pericia.nome} (${attr})`,
                        chaveUnica: `${pericia.nome}-${attr}`,
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
                    nomeExibicao: pericia.nome,
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

    const atualizarDano = (tipoDano, valor) => { setFichaAtual(prev => ({ ...prev, ficha: { ...prev.ficha, saude: { ...prev.ficha.saude, dano: { ...prev.ficha.saude.dano, [tipoDano]: valor } } } })); };
    const atualizarTotalSaude = (tipoSaude, valor) => { setFichaAtual(prev => ({ ...prev, ficha: { ...prev.ficha, saude: { ...prev.ficha.saude, [tipoSaude]: { ...prev.ficha.saude[tipoSaude], valorAdicional: valor } } } })); };
    const adicionarStatus = (objetoPadrao) => { setFichaAtual(prev => ({ ...prev, ficha: { ...prev.ficha, saude: { ...prev.ficha.saude, statusAtuais: [...(prev.ficha.saude.statusAtuais || []), objetoPadrao] } } })); };
    const atualizarStatus = (index, campo, valor) => { setFichaAtual(prev => { const novoArray = [...(prev.ficha.saude.statusAtuais || [])]; novoArray[index] = { ...novoArray[index], [campo]: valor }; return { ...prev, ficha: { ...prev.ficha, saude: { ...prev.ficha.saude, statusAtuais: novoArray } } }; }); };
    const removerStatus = (index) => { setFichaAtual(prev => { const novoArray = (prev.ficha.saude.statusAtuais || []).filter((_, i) => i !== index); return { ...prev, ficha: { ...prev.ficha, saude: { ...prev.ficha.saude, statusAtuais: novoArray } } }; }); };
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