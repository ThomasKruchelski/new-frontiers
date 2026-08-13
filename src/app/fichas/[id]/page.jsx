"use client"

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTheme } from 'next-themes';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import InfoPersonagem from '@/components/ficha/InfoPersonagem';

export default function FichaPersonagem() {
  const { id } = useParams();
  const { resolvedTheme } = useTheme();
  const [fichaAtual, setFichaAtual] = useState(null);
  const [modoEdicao, setModoEdicao] = useState(false);

  useEffect(() => {
    const fichasSalvas = localStorage.getItem('fichas');
    if (fichasSalvas) {
      const arrayDeFichas = JSON.parse(fichasSalvas);
      const fichaEncontrada = arrayDeFichas.find(f => f.id === id);
      setFichaAtual(fichaEncontrada || null);
    }
  }, [id]);

  const salvarFicha = () => {
    const fichasSalvas = localStorage.getItem('fichas');
    if (fichasSalvas) {
      let arrayDeFichas = JSON.parse(fichasSalvas);
      arrayDeFichas = arrayDeFichas.map(f => f.id === id ? fichaAtual : f);
      localStorage.setItem('fichas', JSON.stringify(arrayDeFichas));
      setModoEdicao(false);

      // 2. Substituímos o alert() pelo toast.success()
      toast.success("Ficha salva com sucesso!", {
        position: "bottom-right", 
        autoClose: 2500,          
        theme: resolvedTheme === 'dark' ? 'dark' : 'light',
      });
    }
  };

  const atualizarCampoBase = (campo, valor) => setFichaAtual(
    prev => ({
      ...prev, ficha: {
        ...prev.ficha, [campo]: valor
      }
    })
  );

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
            onClick={() => setModoEdicao(!modoEdicao)}
            className={`px-4 py-2 font-semibold rounded-md transition-colors duration-200 border ${modoEdicao
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

          <InfoPersonagem
            f={f} 
            modoEdicao={modoEdicao} 
            atualizarCampoBloco={atualizarCampoBloco}
          />

          {/* EXEMPLO 2: ATRIBUTOS */}
          <section className="bg-fd-background/80 p-6 rounded-xl border border-fd-primary/20 shadow-sm backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-4 border-b border-fd-primary/20 pb-2 data-[active=true]:text-fd-primary">Atributos</h2>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center bg-transparent p-3 rounded-md border border-fd-primary/20">
                <strong className="text-fd-primary/90 w-24">Corpo:</strong>
                {modoEdicao ? (
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Inicial"
                      className="bg-transparent border border-fd-primary/30 text-fd-primary data-[active=true]:text-fd-primary rounded-md px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={f.atributos.corpo.valorInicial}
                      onChange={(e) => atualizarAtributo('corpo', 'valorInicial', e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="Adic."
                      className="bg-transparent border border-fd-primary/30 text-fd-primary data-[active=true]:text-fd-primary rounded-md px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={f.atributos.corpo.valorAdicional}
                      onChange={(e) => atualizarAtributo('corpo', 'valorAdicional', e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="flex gap-4 text-fd-primary/70">
                    <span>Inicial: <strong className="text-fd-primary">{f.atributos.corpo.valorInicial || 0}</strong></span>
                    <span>Adic: <strong className="text-fd-primary">{f.atributos.corpo.valorAdicional || 0}</strong></span>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>

        {/* COLUNA DIREITA */}
        <div className="space-y-8">

          {/* EXEMPLO 3: ARRAY DE STRINGS (CARACTERÍSTICAS) */}
          <section className="bg-fd-background/80 p-6 rounded-xl border border-fd-primary/20 shadow-sm backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-4 border-b border-fd-primary/20 pb-2 data-[active=true]:text-fd-primary">Características</h2>

            {f.caracteristicas.length === 0 && !modoEdicao && (
              <p className="text-fd-primary/50 italic">Nenhuma característica adicionada.</p>
            )}

            <ul className="flex flex-col gap-2 mb-4">
              {f.caracteristicas.map((carac, index) => (
                <li key={index} className="flex items-center gap-2">
                  {modoEdicao ? (
                    <>
                      <input
                        className="flex-1 bg-transparent border border-fd-primary/30 text-fd-primary data-[active=true]:text-fd-primary rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={carac}
                        onChange={(e) => atualizarStringArray('caracteristicas', index, e.target.value)}
                      />
                      <button
                        onClick={() => removerStringArray('caracteristicas', index)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-500/10 p-1.5 rounded-md transition-colors"
                        title="Remover"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <span className="flex-1 bg-fd-background/80 text-fd-primary px-3 py-1.5 rounded-md border border-fd-primary/10">{carac}</span>
                  )}
                </li>
              ))}
            </ul>

            {modoEdicao && (
              <button
                onClick={() => adicionarStringArray('caracteristicas')}
                className="w-full py-2 border-2 border-dashed border-fd-primary/30 text-fd-primary/70 rounded-md hover:border-fd-primary/60 hover:text-fd-primary transition-colors font-medium"
              >
                + Adicionar Característica
              </button>
            )}
          </section>

          {/* EXEMPLO 4: ARRAY DE OBJETOS (INVENTÁRIO) */}
          <section className="bg-fd-background/80 p-6 rounded-xl border border-fd-primary/20 shadow-sm backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-4 border-b border-fd-primary/20 pb-2 data-[active=true]:text-fd-primary">Inventário</h2>

            {f.inventario.length === 0 && !modoEdicao && (
              <p className="text-fd-primary/50 italic">Inventário vazio.</p>
            )}

            <ul className="flex flex-col gap-3 mb-4">
              {f.inventario.map((inv, index) => (
                <li key={index} className="flex items-center gap-2">
                  {modoEdicao ? (
                    <>
                      <input
                        placeholder="Nome do Item"
                        className="flex-1 bg-transparent border border-fd-primary/30 text-fd-primary data-[active=true]:text-fd-primary rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={inv.item}
                        onChange={(e) => atualizarObjetoArray('inventario', index, 'item', e.target.value)}
                      />
                      <input
                        type="number"
                        placeholder="Vol."
                        className="w-20 bg-transparent border border-fd-primary/30 text-fd-primary data-[active=true]:text-fd-primary rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={inv.volume}
                        onChange={(e) => atualizarObjetoArray('inventario', index, 'volume', Number(e.target.value))}
                      />
                      <button
                        onClick={() => removerObjetoArray('inventario', index)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-500/10 p-1.5 rounded-md transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <div className="flex-1 flex justify-between bg-fd-background/80 px-3 py-1.5 rounded-md border border-fd-primary/10">
                      <span className="font-medium text-fd-primary">{inv.item || 'Item sem nome'}</span>
                      <span className="text-fd-primary/60 text-sm">Vol: {inv.volume}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {modoEdicao && (
              <button
                onClick={() => adicionarObjetoArray('inventario', { item: "", volume: 0 })}
                className="w-full py-2 border-2 border-dashed border-fd-primary/30 text-fd-primary/70 rounded-md hover:border-fd-primary/60 hover:text-fd-primary transition-colors font-medium"
              >
                + Adicionar Item
              </button>
            )}
          </section>

        </div>
      </div>

    </main>
  );
}