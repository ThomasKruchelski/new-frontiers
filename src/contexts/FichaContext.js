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

    const atualizarCampoBase = (campo, valor) => {
        setFichaAtual(prev => ({ ...prev, ficha: { ...prev.ficha, [campo]: valor } }));
    };

    const atualizarCampoBloco = (bloco, campo, valor) => setFichaAtual(
        prev => ({
            ...prev, ficha: {
                ...prev.ficha, [bloco]: {
                    ...prev.ficha[bloco], [campo]: valor
                }
            }
        })
    );

    const atualizarAtributo = (atributo, campo, valor) => setFichaAtual(
        prev => ({
            ...prev, ficha: {
                ...prev.ficha, atributos: {
                    ...prev.ficha.atributos, [atributo]: {
                        ...prev.ficha.atributos[atributo], [campo]: valor
                    }
                }
            }
        })
    );

    const adicionarStringArray = (nomeArray) => setFichaAtual(prev => ({ ...prev, ficha: { ...prev.ficha, [nomeArray]: [...prev.ficha[nomeArray], ""] } }));
    const atualizarStringArray = (nomeArray, index, valor) => setFichaAtual(prev => { const novo = [...prev.ficha[nomeArray]]; novo[index] = valor; return { ...prev, ficha: { ...prev.ficha, [nomeArray]: novo } }; });
    const removerStringArray = (nomeArray, index) => setFichaAtual(prev => { const novo = prev.ficha[nomeArray].filter((_, i) => i !== index); return { ...prev, ficha: { ...prev.ficha, [nomeArray]: novo } }; });
    const adicionarObjetoArray = (nomeArray, objetoPadrao) => setFichaAtual(prev => ({ ...prev, ficha: { ...prev.ficha, [nomeArray]: [...prev.ficha[nomeArray], objetoPadrao] } }));
    const atualizarObjetoArray = (nomeArray, index, campo, valor) => setFichaAtual(prev => { const novo = [...prev.ficha[nomeArray]]; novo[index] = { ...novo[index], [campo]: valor }; return { ...prev, ficha: { ...prev.ficha, [nomeArray]: novo } }; });
    const removerObjetoArray = (nomeArray, index) => setFichaAtual(prev => { const novo = prev.ficha[nomeArray].filter((_, i) => i !== index); return { ...prev, ficha: { ...prev.ficha, [nomeArray]: novo } }; });

    // ... (Aqui entrariam as outras funções: atualizarAtributo, etc) ...

    // 3. O que a antena vai transmitir? (Tudo que está no 'value')
    return (
        <FichaContext.Provider value={{
            fichaAtual,
            modoEdicao,
            setModoEdicao,
            salvarFicha,
            atualizarCampoBase,
            atualizarCampoBloco,
            atualizarAtributo,
            adicionarStringArray,
            atualizarStringArray,
            removerStringArray,
            adicionarObjetoArray,
            atualizarObjetoArray,
            removerObjetoArray
        }}>
            {children}
        </FichaContext.Provider>
    );
}

export function useFicha() {
    return useContext(FichaContext);
}