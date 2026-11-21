// src/components/ficha/Pericias.js
"use client"

import { useState } from 'react';
import { useFicha } from '@/contexts/FichaContext';

export default function Pericias() {
    const { modoEdicao, periciasFinais, atualizarPericia } = useFicha();

    // 1. ESTADOS PARA FILTRO E ORDENAÇÃO
    const [busca, setBusca] = useState('');
    const [ordenacao, setOrdenacao] = useState('alfabetica'); // Pode ser 'alfabetica' ou 'pontos'

    if (!periciasFinais || periciasFinais.length === 0) {
        return <div className="text-fd-primary/50 italic p-6">Carregando perícias...</div>;
    }

    // 2. LÓGICA DE FILTRAGEM E ORDENAÇÃO
    // Pegamos o array do contexto e aplicamos as regras antes de renderizar
    const periciasFiltradasEOrdenadas = [...periciasFinais] // Criamos uma cópia para não mutar o original
        .filter(p => {
            // Filtra pelo nome digitado na busca (ignorando maiúsculas/minúsculas)
            return p.nomeExibicao.toLowerCase().includes(busca.toLowerCase());
        })
        .sort((a, b) => {
            if (ordenacao === 'alfabetica') {
                // Ordena de A a Z
                return a.nomeExibicao.localeCompare(b.nomeExibicao);
            } else {
                // Ordena por Maior Valor Base
                // Se der empate no valor base, ele desempata pela ordem alfabética automaticamente
                if (b.normal === a.normal) {
                    return a.nomeExibicao.localeCompare(b.nomeExibicao);
                }
                return b.normal - a.normal;
            }
        });

    return (
        <section className="bg-fd-background/80 p-6 rounded-xl border border-fd-primary/20 shadow-sm backdrop-blur-sm">

            {/* 3. NOVO CABEÇALHO COM CONTROLES */}
            <div className="flex flex-col  mb-6 gap-4 border-b border-fd-primary/20 pb-4">
                <h2 className="text-xl font-bold data-[active=true]:text-fd-primary">
                    Perícias
                </h2>

                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    {/* Campo de Busca */}
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-2.5 top-2 text-fd-primary/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Buscar perícia..."
                            className="pl-9 pr-3 py-1.5 bg-transparent border border-fd-primary/30 text-fd-primary rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full transition-all"
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>

                    {/* Botão de Ordenação */}
                    <button
                        onClick={() => setOrdenacao(prev => prev === 'alfabetica' ? 'pontos' : 'alfabetica')}
                        className="flex items-center justify-center gap-2 px-3 py-1.5 bg-fd-primary/5 border border-fd-primary/20 hover:bg-fd-primary/10 text-fd-primary rounded-md transition-colors text-sm font-medium whitespace-nowrap"
                    >
                        {ordenacao === 'alfabetica' ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                                </svg>
                                Ordem A-Z
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                                </svg>
                                Maior Base
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* 4. RENDERIZANDO A LISTA PROCESSADA */}
            {periciasFiltradasEOrdenadas.length === 0 ? (
                <p className="text-center text-fd-primary/50 py-4 italic">Nenhuma perícia encontrada com "{busca}".</p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {periciasFiltradasEOrdenadas.map((p) => (
                        <div key={p.chaveUnica + p.tipo} className="flex flex-col justify-between items-start p-2 bg-fd-background/50 rounded-lg border border-fd-primary/10 gap-2">

                            <div className="flex flex-col w-full">
                                <span className="font-semibold text-fd-primary capitalize">
                                    {p.nomeExibicao} {p.tipo && <span className="text-sm text-fd-primary/60">({p.tipo})</span>}
                                </span>
                                {!modoEdicao &&
                                    <div className='flex gap-2'>
                                        <span className="text-[10px] text-fd-primary/50">Base: {p.valorBase}</span>
                                        {p.vantagem > 0 && <span className="text-[10px] text-fd-primary/50">vantagem: {p.vantagem}</span>}
                                    </div>
                                }
                            </div>

                            {modoEdicao ? (
                                // MODO EDIÇÃO (Sem alterações no input)
                                <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 flex-wrap justify-around">
                                    <label className="flex flex-col text-[10px] text-fd-primary/60 w-4/10 wrap">
                                        Int
                                        <input type="number" className=" bg-transparent border border-fd-primary/30 text-fd-primary rounded px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            value={p.pontosInt} onChange={(e) => atualizarPericia(p.originalIndex, 'pontosInt', e.target.value)}
                                        />
                                    </label>
                                    <label className="flex flex-col text-[10px] text-fd-primary/60 w-4/10 wrap">
                                        Edu
                                        <input type="number" className="bg-transparent border border-fd-primary/30 text-fd-primary rounded px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            value={p.pontosEdu} onChange={(e) => atualizarPericia(p.originalIndex, 'pontosEdu', e.target.value)}
                                        />
                                    </label>
                                    <label className="flex flex-col text-[10px] text-fd-primary/60 w-4/10 wrap">
                                        Exp
                                        <input type="number" className="bg-transparent border border-fd-primary/30 text-fd-primary rounded px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            value={p.pontosExp} onChange={(e) => atualizarPericia(p.originalIndex, 'pontosExp', e.target.value)}
                                        />
                                    </label>
                                    <label className="flex flex-col text-[10px] text-fd-primary/60 w-4/10 wrap">
                                        Vantagem
                                        <input type="number" className="bg-transparent border border-fd-primary/30 text-fd-primary rounded px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                            value={p.vantagem} onChange={(e) => atualizarPericia(p.originalIndex, 'vantagem', e.target.value)}
                                        />
                                    </label>
                                </div>
                            ) : (
                                // MODO VISUALIZAÇÃO
                                <div className="flex  w-full sm:w-auto justify-end">
                                    <div className="flex flex-col items-center bg-red-500/10 border border-red-500/30 px-1 py-1 rounded-md min-w-[50px] max-w-[60px]">
                                        <span className="text-[10px] uppercase font-bold text-red-500/80">Ext</span>
                                        <span className="font-bold text-red-600 dark:text-red-400">{p.extremo}</span>
                                    </div>
                                    <div className="flex flex-col items-center bg-yellow-300/10 border border-yellow-500/30 px-1 py-1 rounded-md min-w-[50px] max-w-[60px]">
                                        <span className="text-[10px] uppercase font-bold text-yellow-500/80">Dif</span>
                                        <span className="font-bold text-yellow-600 dark:text-yellow-200/90">{p.dificil}</span>
                                    </div>
                                    <div className="flex flex-col items-center bg-fd-primary/5 border border-fd-primary/20 px-1 py-1 rounded-md min-w-[50px] max-w-[60px]">
                                        <span className="text-[10px] uppercase font-bold text-fd-primary/60">Nor</span>
                                        <span className="font-bold text-fd-primary">{p.normal}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}