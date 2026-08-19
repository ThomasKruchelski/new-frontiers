"use client"

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
import { useFicha } from '@/contexts/FichaContext';

import InfoPersonagem from '@/components/ficha/InfoPersonagem';
import Atributos from '@/components/ficha/Atributos';
import Caracteristicas from '@/components/ficha/Caracteristicas';
import Inventario from '@/components/ficha/Inventario';
import BonusEImplantes from '@/components/ficha/BonusEImplantes';
import ResistenciasEPrecursores from '@/components/ficha/ResistenciasEPrecursores';

export default function FichaPersonagem() {

  const { fichaAtual, modoEdicao, salvarFicha, setModoEdicao, cancelarEdicao } = useFicha();

  if (!fichaAtual) {
    return (
      <div className="flex justify-center items-center h-screen bg-fd-background/80">
        <p className="text-xl text-fd-primary/60 animate-pulse">Carregando ficha...</p>
      </div>
    );
  }

  const f = fichaAtual.ficha;

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 text-fd-primary relative">

      {/* CABEÇALHO E CONTROLES */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold data-[active=true]:text-fd-primary">Ficha de Personagem</h1>
        <div className="flex gap-2">
          <button 
            onClick={() => modoEdicao ? cancelarEdicao() : setModoEdicao(true)} 
            className={`px-4 py-2 font-semibold rounded-md transition-colors duration-200 border ${
              modoEdicao 
                ? 'bg-fd-background/80 text-fd-primary border-fd-primary/30 hover:bg-fd-primary/10' 
                : 'bg-blue-600 text-white border-transparent hover:bg-blue-700'
            }`}
          >
            {modoEdicao ? 'Cancelar Edição' : 'Editar Ficha'}
          </button>

          {modoEdicao && (
            <button
              onClick={salvarFicha}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-colors duration-200 shadow-sm border border-transparent"
            >
              Salvar Alterações
            </button>
          )}
        </div>
      </div>

      <hr className="mb-8 border-fd-primary/20" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* COLUNA ESQUERDA */}
        <div className="space-y-8">

          <InfoPersonagem/>
          
          <Atributos/>

          <ResistenciasEPrecursores/>

        </div>

        {/* COLUNA DIREITA */}
        <div className="space-y-8">

          <Caracteristicas/>

          <BonusEImplantes/>

          <Inventario/>

        </div>
      </div>

    </main>
  );
}