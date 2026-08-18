// src/components/ficha/Caracteristicas.js
"use client"

import { useState } from 'react';
import { useFicha } from '@/contexts/FichaContext';

export default function Caracteristicas() {
  const { fichaAtual, modoEdicao, adicionarObjetoArray, atualizarObjetoArray, removerObjetoArray } = useFicha();
  
  // Estado para controlar qual sanfona está aberta (guardamos o index)
  const [indiceAberto, setIndiceAberto] = useState(null);

  if (!fichaAtual) return null;

  const f = fichaAtual.ficha;

  // Função para abrir/fechar a sanfona
  const toggleSanfona = (index) => {
    // Se clicar no que já está aberto, ele fecha (null). Se não, abre o novo.
    setIndiceAberto(indiceAberto === index ? null : index);
  };

  return (
    <section className="bg-fd-background/80 p-6 rounded-xl border border-fd-primary/20 shadow-sm backdrop-blur-sm">
      <h2 className="text-xl font-bold mb-4 border-b border-fd-primary/20 pb-2 data-[active=true]:text-fd-primary">
        Características
      </h2>

      {f.caracteristicas.length === 0 && !modoEdicao && (
        <p className="text-fd-primary/50 italic">Nenhuma característica adicionada.</p>
      )}

      <ul className="flex flex-col gap-3 mb-4">
        {f.caracteristicas.map((carac, index) => (
          <li key={index} className="flex flex-col border border-fd-primary/20 rounded-md overflow-hidden">
            
            {modoEdicao ? (
              // --- MODO EDIÇÃO ---
              <div className="p-3 flex flex-col gap-2 bg-fd-background/50">
                <div className="flex gap-2 items-start">
                  <input 
                    placeholder="Nome da característica"
                    className="flex-1 bg-transparent border border-fd-primary/30 text-fd-primary rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                    value={carac.nome || ''} 
                    onChange={(e) => atualizarObjetoArray('caracteristicas', index, 'nome', e.target.value)} 
                  />
                  <button 
                    onClick={() => removerObjetoArray('caracteristicas', index)} 
                    className="text-red-500 hover:text-red-600 hover:bg-red-500/10 p-1.5 rounded-md transition-colors mt-1"
                    title="Remover"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <textarea 
                  placeholder="Descreva a característica..."
                  rows={2}
                  className="w-full bg-transparent border border-fd-primary/30 text-fd-primary rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  value={carac.descricao || ''} 
                  onChange={(e) => atualizarObjetoArray('caracteristicas', index, 'descricao', e.target.value)} 
                />
              </div>
            ) : (
              // --- MODO VISUALIZAÇÃO (SANFONA) ---
              <>
                <button 
                  onClick={() => toggleSanfona(index)}
                  className="w-full text-left p-3 flex justify-between items-center bg-fd-background/80 hover:bg-fd-primary/5 transition-colors"
                >
                  <span className="font-semibold text-fd-primary">{carac.nome || 'Característica sem nome'}</span>
                  
                  {/* Ícone de setinha que gira quando aberto */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-5 w-5 text-fd-primary/60 transform transition-transform duration-200 ${indiceAberto === index ? 'rotate-180' : ''}`} 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Conteúdo da Sanfona */}
                {indiceAberto === index && (
                  <div className="p-3 border-t border-fd-primary/10 text-fd-primary/80 bg-fd-background/40">
                    {carac.descricao ? (
                      <p className="whitespace-pre-wrap">{carac.descricao}</p>
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
          onClick={() => adicionarObjetoArray('caracteristicas', { nome: "", descricao: "" })}
          className="w-full py-2 border-2 border-dashed border-fd-primary/30 text-fd-primary/70 rounded-md hover:border-fd-primary/60 hover:text-fd-primary transition-colors font-medium"
        >
          + Adicionar Característica
        </button>
      )}
    </section>
  );
}