// src/app/fichas/page.js
"use client";

import Link from "next/link";
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore'; // <-- Novos imports do Firebase
import { db } from '@/lib/firebaseClient';
import BtnCriarFicha from "@/components/ficha/BtnCriarFicha";
import { useAuth } from '@/contexts/AuthContext';
import LoginGoogle from '@/components/LoginGoogle';

export default function Fichas() {
  const [fichas, setFichas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const { usuarioLogado, fazerLogout } = useAuth();

  useEffect(() => {
    const buscarFichasNoFirebase = async () => {
      if (!usuarioLogado) return;

      try {
        setCarregando(true);
        // 1. Cria a regra da busca (Filtro pelo UID)
        const q = query(
          collection(db, "fichas"),
          where("userId", "==", usuarioLogado.uid)
        );

        // 2. Executa a busca
        const querySnapshot = await getDocs(q);

        // 3. Transforma os dados do Firebase em um Array pro React
        const listaFichas = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setFichas(listaFichas);
      } catch (erro) {
        console.error("Erro ao buscar fichas:", erro);
      } finally {
        setCarregando(false);
      }
    };

    buscarFichasNoFirebase();
  }, [usuarioLogado]);

  const excluirFicha = async (idParaExcluir, nome) => {
    const confirmacao = window.confirm(`Tem certeza que deseja excluir o personagem ${nome || 'Sem Nome'}? Essa ação não pode ser desfeita.`);

    if (confirmacao) {
      try {
        // Apaga do banco de dados oficial
        await deleteDoc(doc(db, "fichas", idParaExcluir));

        // Apaga da tela instantaneamente
        setFichas(prev => prev.filter(f => f.id !== idParaExcluir));
      } catch (erro) {
        console.error("Erro ao excluir ficha:", erro);
        alert("Erro ao excluir personagem.");
      }
    }
  };

  // ==========================================
  // ESTADO 1: USUÁRIO NÃO LOGADO
  // ==========================================
  if (!usuarioLogado) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center pb-10 w-full min-h-[60vh]">
        <div className="max-w-[400px] w-full flex flex-col items-center gap-6 p-8 lg:rounded-2xl lg:border border-b border-fd-foreground/10 shadow-sm bg-fd-background/80 backdrop-blur-lg text-center">
          <div>
            <h1 className="text-2xl font-bold text-fd-primary">Acesse sua Conta</h1>
            <p className="text-fd-primary/60 mt-2">Faça login para criar e gerenciar suas fichas de personagem na nuvem.</p>
          </div>

          <LoginGoogle />
        </div>
      </main>
    );
  }

  // ==========================================
  // ESTADO 2: USUÁRIO LOGADO
  // ==========================================
  return (
    <main className="flex flex-1 flex-col items-center pb-10 w-full px-4">

      {/* CABEÇALHO DO USUÁRIO LOGADO */}
      <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-[800px] gap-4 mb-6 mt-4 p-6 lg:rounded-2xl lg:border border-b border-fd-foreground/10 shadow-sm bg-fd-background/80 backdrop-blur-lg">
        <div className="flex items-center gap-4">
          <img
            src={usuarioLogado.photoURL}
            alt="Foto de perfil"
            className="w-12 h-12 rounded-full border-2 border-fd-primary/20"
          />
          <div>
            <h2 className="text-xl font-bold text-fd-primary">Minhas Fichas</h2>
            <p className="text-sm text-fd-primary/60">Olá, {usuarioLogado.displayName}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={fazerLogout}
            className="text-sm font-semibold text-red-500 hover:text-red-600 hover:underline transition-colors"
          >
            Sair
          </button>
          <BtnCriarFicha tipo='personagem' />
        </div>
      </div>

      {/* ÁREA DA LISTAGEM DE FICHAS */}
      <div className="flex flex-col w-full max-w-[800px] p-6 lg:rounded-2xl lg:border border-b border-fd-foreground/10 shadow-sm bg-fd-background/80 backdrop-blur-lg">

        {carregando ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-xl text-fd-primary/60 animate-pulse">Carregando personagens...</p>
          </div>
        ) : (
          fichas.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-fd-background/50 border-2 border-dashed border-fd-primary/20 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-fd-primary/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-lg text-fd-primary/60 font-medium text-center">Você ainda não tem nenhum personagem.</p>
              <p className="text-sm text-fd-primary/40 mt-1 text-center">Clique no botão acima para criar o seu primeiro!</p>
            </div>
          ) : (
            /* GRID DE CARTÕES */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {fichas.map((f) => (
                <div key={f.id} className="group flex flex-col bg-fd-background/80 rounded-xl border border-fd-primary/20 shadow-sm hover:shadow-md hover:border-fd-primary/40 transition-all overflow-hidden relative">

                  {/* Parte clicável que leva para a ficha */}
                  <Link href={`/fichas/${f.id}`} className="p-6 flex-1 cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-fd-primary group-hover:text-blue-500 transition-colors truncate pr-2">
                        {f.ficha.infoPersonagem?.nome || 'Desconhecido'}
                      </h3>
                      <span className="bg-fd-primary/10 text-fd-primary text-xs font-bold px-2 py-1 rounded-md whitespace-nowrap">
                        Nv. {f.ficha.infoPersonagem?.nivel || 0}
                      </span>
                    </div>

                    <div className="space-y-1 mt-4">
                      <p className="text-sm text-fd-primary/70 truncate">
                        <span className="font-semibold text-fd-primary/90">Vocação:</span> {f.ficha.infoPersonagem?.vocacao || '—'}
                      </p>
                      <p className="text-sm text-fd-primary/70 truncate">
                        <span className="font-semibold text-fd-primary/90">Espécie:</span> {f.ficha.infoPersonagem?.especie || '—'}
                      </p>
                      <p className="text-sm text-fd-primary/70 truncate">
                        <span className="font-semibold text-fd-primary/90">Jogador:</span> {f.ficha.infoPersonagem?.jogador || '—'}
                      </p>
                    </div>
                  </Link>

                  {/* Botão de Excluir fixo no rodapé do card */}
                  <div className="bg-fd-background/50 border-t border-fd-primary/10 p-3 flex justify-end">
                    <button
                      onClick={() => excluirFicha(f.id, f.ficha.infoPersonagem?.nome)}
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
        )}
      </div>
    </main>
  );
}