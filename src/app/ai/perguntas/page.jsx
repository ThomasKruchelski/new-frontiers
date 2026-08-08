"use client"; // Necessário no Next.js App Router para usar hooks como useState e useEffect

import { useEffect, useState } from "react";

export default function HistoricoPerguntas() {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function carregarHistorico() {
      try {
        // Substitua "/api/historico" pelo caminho exato da sua rota GET
        const response = await fetch("/api/groq/respostas");
        
        if (!response.ok) {
          throw new Error("Não foi possível carregar o histórico.");
        }
        
        const json = await response.json();
        setHistorico(json.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    carregarHistorico();
  }, []);

  // Tela de Carregamento
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        <p className="animate-pulse">Buscando histórico de perguntas...</p>
      </div>
    );
  }

  // Tela de Erro
  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6 mt-10 bg-red-50 border-l-4 border-red-500 text-red-700">
        <p className="font-bold">Erro</p>
        <p>{error}</p>
      </div>
    );
  }

  // Tela de Sucesso
  return (
    <div className="max-w-4xl mx-auto p-6 mt-8">
      <h1 className="text-3xl font-bold text-gray-100 mb-2">Histórico com a IA</h1>
      <p className="text-gray-200 mb-8">Veja todas as perguntas já respondidas pelo sistema.</p>

      {historico.length === 0 ? (
        <div className="text-center p-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-200">Nenhuma pergunta foi feita ainda.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {historico.map((item) => (
            <div 
              key={item.id} 
              className="bg-white rounded-xl shadow-sm border border-gray-900 overflow-hidden"
            >
              {/* Cabeçalho do Card: Pergunta e Data */}
              <div className="bg-gray-900 p-5 border-b border-gray-900">
                <div className="flex justify-between items-start gap-4">
                  <h2 className="text-lg font-semibold text-gray-200">
                    <span className="text-blue-600 mr-2">Q:</span>
                    {item.question}
                  </h2>
                  <span className="text-xs font-medium text-gray-400 bg-gray-600/50 px-2 py-1 rounded-full whitespace-nowrap">
                    {item.createdAt 
                      ? new Date(item.createdAt).toLocaleString("pt-BR", { 
                          day: '2-digit', 
                          month: 'short', 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        }) 
                      : "Data desconhecida"}
                  </span>
                </div>
              </div>

              {/* Corpo do Card: Resposta da IA */}
              <div className="p-5 bg-gray-800">
                <div className="text-gray-200  whitespace-pre-wrap leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}