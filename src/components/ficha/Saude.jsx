"use client"

import { useState } from 'react';
import { useFicha } from '@/contexts/FichaContext';

import { calcularVida } from '@/utils/calculosSaude';

export default function Saude() {
    const {
        fichaAtual, modoEdicao, atributosFinais,
        atualizarDano, atualizarTotalSaude,
        adicionarStatus, atualizarStatus, removerStatus
    } = useFicha();

    const [indiceAberto, setIndiceAberto] = useState(null);

    if (!fichaAtual || !atributosFinais) return null;

    const s = fichaAtual.ficha.saude; // Atalho direto para o objeto saude!

    // --- MATEMÁTICA DA VIDA ---
    const { vidaTotal, vidaAtual, isMorto, isVidaVermelha } = calcularVida({
        corpo: atributosFinais.corpo || 0,
        nivel: Number(fichaAtual.ficha.infoPersonagem.nivel) || 0,
        vidaAdicional: Number(s.vidaTotal?.valorAdicional) || 0,
        danos: s.dano
    });

    // --- MATEMÁTICA DA MENTE ---
    const { menteTotal, menteAtual, isColapso } = calcularMente({
        persona: atributosFinais.persona,
        menteAdicional: s.menteTotal?.valorAdicional,
        danoPsiquico: s.dano?.psiquico
    });

    // Função para abrir/fechar a sanfona dos status
    const toggleSanfona = (index) => {
        setIndiceAberto(indiceAberto === index ? null : index);
    };

    return (
        <div className="space-y-6">

            {/* GRID SUPERIOR: VIDA E MENTE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* ---------------- CARD DE VIDA ---------------- */}
                <section className="bg-fd-background/80 p-6 rounded-xl border border-red-500/30 shadow-sm backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500/50"></div>

                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-red-500/90 dark:text-red-400">Vida (PV)</h2>
                        {isMorto && (
                            <span className="bg-gray-900 text-gray-100 dark:bg-black dark:text-gray-300 px-3 py-1 rounded-full text-xs font-bold tracking-widest animate-pulse border border-gray-700">
                                MORTO
                            </span>
                        )}
                    </div>

                    {!modoEdicao ? (
                        <div className="flex items-baseline gap-2">
                            <span className={`text-5xl font-black transition-colors ${isMorto ? 'text-gray-800 dark:text-gray-600' :
                                isVidaVermelha ? 'text-red-600 dark:text-red-500' :
                                    'text-fd-primary'
                                }`}>
                                {vidaAtual}
                            </span>
                            <span className="text-xl font-bold text-fd-primary/40">/ {vidaTotal}</span>
                        </div>
                    ) : (
                        <label className="flex flex-col text-xs font-semibold text-fd-primary/60">
                            Vida Adicional (Bônus)
                            <input type="number" className="bg-transparent border border-fd-primary/30 text-fd-primary rounded px-2 py-1.5 focus:ring-1 focus:ring-red-500"
                                value={s.vidaTotal?.valorAdicional} onChange={(e) => atualizarTotalSaude('vidaTotal', e.target.value)} />
                        </label>
                    )}
                    <div className="flex flex-col gap-3">


                        <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-fd-primary/10">
                            <span className="col-span-2 text-xs font-bold text-red-500/70">DANOS SOFRIDOS:</span>
                            <label className="flex flex-col text-[10px] text-fd-primary/60">Bruto
                                <input type="number" min="0" className="bg-red-500/5 border border-red-500/30 text-fd-primary rounded px-2 py-1" value={s.dano?.bruto} onChange={(e) => atualizarDano('bruto', e.target.value)} />
                            </label>
                            <label className="flex flex-col text-[10px] text-fd-primary/60">Térmico
                                <input type="number" min="0" className="bg-red-500/5 border border-red-500/30 text-fd-primary rounded px-2 py-1" value={s.dano?.termico} onChange={(e) => atualizarDano('termico', e.target.value)} />
                            </label>
                            <label className="flex flex-col text-[10px] text-fd-primary/60">Tóxico
                                <input type="number" min="0" className="bg-red-500/5 border border-red-500/30 text-fd-primary rounded px-2 py-1" value={s.dano?.toxico} onChange={(e) => atualizarDano('toxico', e.target.value)} />
                            </label>
                            <label className="flex flex-col text-[10px] text-fd-primary/60">Respiratório
                                <input type="number" min="0" className="bg-red-500/5 border border-red-500/30 text-fd-primary rounded px-2 py-1" value={s.dano?.respiratorio} onChange={(e) => atualizarDano('respiratorio', e.target.value)} />
                            </label>
                        </div>
                    </div>

                </section>

                {/* ---------------- CARD DE MENTE ---------------- */}
                <section className="bg-fd-background/80 p-6 rounded-xl border border-purple-500/30 shadow-sm backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-purple-500/50"></div>

                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-purple-600/90 dark:text-purple-400">Mente (PM)</h2>
                        {isColapso && (
                            <span className="bg-gray-900 text-gray-100 dark:bg-black dark:text-purple-950 px-3 py-1 rounded-full text-xs font-bold tracking-widest animate-pulse border border-purple-900">
                                COLAPSO
                            </span>
                        )}
                    </div>

                    {!modoEdicao ? (
                        <div className="flex items-baseline gap-2">
                            <span className={`text-5xl font-black transition-colors ${isColapso ? 'text-gray-800 dark:text-gray-600' :
                                'text-fd-primary'
                                }`}>
                                {menteAtual}
                            </span>
                            <span className="text-xl font-bold text-fd-primary/40">/ {menteTotal}</span>
                        </div>
                    ) : (
                        <label className="flex flex-col text-xs font-semibold text-fd-primary/60">
                            Mente Adicional (Bônus)
                            <input type="number" className="bg-transparent border border-fd-primary/30 text-fd-primary rounded px-2 py-1.5 focus:ring-1 focus:ring-purple-500"
                                value={s.menteTotal?.valorAdicional} onChange={(e) => atualizarTotalSaude('menteTotal', e.target.value)} />
                        </label>
                    )}
                    <div className="flex flex-col gap-3">


                        <div className="grid grid-cols-1 gap-2 mt-2 pt-2 border-t border-fd-primary/10">
                            <span className="text-xs font-bold text-purple-500/70">DANOS SOFRIDOS:</span>
                            <label className="flex flex-col text-[10px] text-fd-primary/60"> Psiquico
                                <input type="number" min="0" className="bg-purple-500/5 border border-purple-500/30 text-fd-primary rounded px-2 py-1" value={s.dano?.psiquico} onChange={(e) => atualizarDano('psiquico', e.target.value)} />
                            </label>
                        </div>
                    </div>

                </section>

            </div>

            {/* ---------------- SEÇÃO: STATUS ATUAIS ---------------- */}
            <section className="bg-fd-background/80 p-6 rounded-xl border border-fd-primary/20 shadow-sm backdrop-blur-sm">
                <h2 className="text-xl font-bold mb-4 border-b border-fd-primary/20 pb-2 data-[active=true]:text-fd-primary">
                    Status Atuais
                </h2>

                {(!s.statusAtuais || s.statusAtuais.length === 0) && !modoEdicao && (
                    <p className="text-fd-primary/50 italic">Personagem Saudável. Nenhum status ativo.</p>
                )}

                <ul className="flex flex-col gap-3 mb-4">
                    {(s.statusAtuais || []).map((status, index) => (
                        <li key={index} className="flex flex-col border border-fd-primary/20 rounded-md overflow-hidden">

                            {modoEdicao ? (
                                // --- MODO EDIÇÃO ---
                                <div className="p-3 flex flex-col gap-2 bg-fd-background/50">
                                    <div className="flex gap-2 items-start">
                                        <input
                                            placeholder="Nome do Status (ex: Envenenado)"
                                            className="flex-1 bg-transparent border border-fd-primary/30 text-fd-primary rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                                            value={status.nome || ''}
                                            onChange={(e) => atualizarStatus(index, 'nome', e.target.value)}
                                        />
                                        <button
                                            onClick={() => removerStatus(index)}
                                            className="text-red-500 hover:text-red-600 hover:bg-red-500/10 p-1.5 rounded-md transition-colors mt-1"
                                            title="Remover"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                    <textarea
                                        placeholder="Descrição do efeito do status..."
                                        rows={2}
                                        className="w-full bg-transparent border border-fd-primary/30 text-fd-primary rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                        value={status.descricao || ''}
                                        onChange={(e) => atualizarStatus(index, 'descricao', e.target.value)}
                                    />
                                </div>
                            ) : (
                                // --- MODO VISUALIZAÇÃO (SANFONA) ---
                                <>
                                    <button
                                        onClick={() => toggleSanfona(index)}
                                        className="w-full text-left p-3 flex justify-between items-center bg-fd-background/80 hover:bg-fd-primary/5 transition-colors"
                                    >
                                        <span className="font-semibold text-orange-500 dark:text-orange-400">{status.nome || 'Status sem nome'}</span>

                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className={`h-5 w-5 text-fd-primary/60 transform transition-transform duration-200 ${indiceAberto === index ? 'rotate-180' : ''}`}
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {indiceAberto === index && (
                                        <div className="p-3 border-t border-fd-primary/10 text-fd-primary/80 bg-fd-background/40">
                                            {status.descricao ? (
                                                <p className="whitespace-pre-wrap">{status.descricao}</p>
                                            ) : (
                                                <p className="italic text-fd-primary/40">Nenhuma descrição informada.</p>
                                            )}
                                        </div>
                                    )}
                                </>
                            )}

                        </li>
                    ))}
                </ul>

                {modoEdicao && (
                    <button
                        onClick={() => adicionarStatus({ nome: "", descricao: "" })}
                        className="w-full py-2 border-2 border-dashed border-fd-primary/30 text-fd-primary/70 rounded-md hover:border-fd-primary/60 hover:text-fd-primary transition-colors font-medium"
                    >
                        + Adicionar Status
                    </button>
                )}
            </section>

        </div>
    );
}