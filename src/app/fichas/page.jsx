"use client";
import Image from "next/image";
import { useState, useEffect } from 'react';
import Link from "next/link";
import BtnCriarFicha from "@/components/ficha/BtnCriarFicha"

export default function fichas() {
  const [fichas, setFichas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarFichas = () => {
      const salvas = localStorage.getItem('fichas');
      if (salvas) {
        setFichas(JSON.parse(salvas));
      }
      setCarregando(false);
    };

    buscarFichas();
  }, []);

  const excluirFicha = (idParaExcluir, nome) => {
    const confirmacao = window.confirm(`Tem certeza que deseja excluir o personagem ${nome || 'Sem Nome'}? Essa ação não pode ser desfeita.`);

    if (confirmacao) {
      const novaLista = fichas.filter(f => f.id !== idParaExcluir);
      localStorage.setItem('fichas', JSON.stringify(novaLista));
      setFichas(novaLista);
    }
  };

  return (
    <main className="flex flex-1 flex-col items-center pb-10 w-full">

      <div className=" max-w-[600px] box-content border-b border-fd-foreground/10 transition-colors p-4 px-8 lg:mt-4 lg:w-[calc(100%-1rem)] lg:rounded-2xl lg:border shadow-sm bg-fd-background/80 backdrop-blur-lg">
        <b> Ficha Excel</b>

        <p>1. Acesse o arquivo no Google docs
          <a className="hyperlink pl-2" target='_blank' href="https://docs.google.com/spreadsheets/d/1cZezQt8fyfF2wT1SN6AYVOKbV6HbRo4kANuCDSkdP7c/edit?gid=1362246236#gid=1362246236">
            Clicando aqui
          </a>
        </p>

        <p>2. Acesse o menu Arquivo: Fazer uma cópia</p>

        <p>3. Acesse e preencha a cópia criada</p>
      </div>

      <div className="flex flex-col gap-2 max-w-[600px] box-content border-b border-fd-foreground/10 transition-colors p-4 px-8 lg:mt-4 lg:w-[calc(100%-1rem)] lg:rounded-2xl lg:border shadow-sm bg-fd-background/80 backdrop-blur-lg">
        <b> Ficha no Site</b>

        <div className="w-full justify-center flex">
          <BtnCriarFicha tipo='personagem' />
        </div>

        <div>
          {carregando ?
            <div className="flex justify-center items-center h-screen bg-fd-background/80">
              <p className="text-xl text-fd-primary/60 animate-pulse">Carregando personagens...</p>
            </div>
            :
            (
              fichas.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 bg-fd-background/50 border-2 border-dashed border-fd-primary/20 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-fd-primary/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-lg text-fd-primary/60 font-medium">Você ainda não tem nenhum personagem.</p>
                  <p className="text-sm text-fd-primary/40 mt-1">Clique no botão acima para criar o seu primeiro!</p>
                </div>
              ) : (

                /* GRID DE CARTÕES */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                  {fichas.map((f) => (
                    <div key={f.id} className="group flex flex-col bg-fd-background/80 rounded-xl border border-fd-primary/20 shadow-sm hover:shadow-md hover:border-fd-primary/40 transition-all overflow-hidden relative">

                      {/* Parte clicável que leva para a ficha */}
                      <Link href={`/fichas/${f.id}`} className="p-6 flex-1 cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-fd-primary group-hover:text-blue-500 transition-colors truncate pr-2">
                            {f.ficha.infoPersonagem.nome || 'Desconhecido'}
                          </h3>
                          <span className="bg-fd-primary/10 text-fd-primary text-xs font-bold px-2 py-1 rounded-md">
                            Nv. {f.ficha.infoPersonagem.nivel || 0}
                          </span>
                        </div>

                        <div className="space-y-1 mt-4">
                          <p className="text-sm text-fd-primary/70">
                            <span className="font-semibold text-fd-primary/90">Vocação:</span> {f.ficha.infoPersonagem.vocacao || '—'}
                          </p>
                          <p className="text-sm text-fd-primary/70">
                            <span className="font-semibold text-fd-primary/90">Espécie:</span> {f.ficha.infoPersonagem.especie || '—'}
                          </p>
                          <p className="text-sm text-fd-primary/70">
                            <span className="font-semibold text-fd-primary/90">Jogador:</span> {f.ficha.infoPersonagem.jogador || '—'}
                          </p>
                        </div>
                      </Link>

                      {/* Botão de Excluir fixo no rodapé do card */}
                      <div className="bg-fd-background/50 border-t border-fd-primary/10 p-3 flex justify-end">
                        <button
                          onClick={() => excluirFicha(f.id, f.ficha.nome)}
                          className="text-xs font-semibold text-red-500 hover:text-red-700 hover:bg-red-500/10 px-3 py-1.5 rounded transition-colors flex items-center gap-1"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Excluir
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )
          }
        </div>

      </div>
    </main>
  );
}
