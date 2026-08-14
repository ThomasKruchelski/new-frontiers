"use client"
import { useFicha } from '@/contexts/FichaContext';

export default function InformacoesBasicas() {

  const { fichaAtual, modoEdicao, atualizarCampoBloco } = useFicha();

  if (!fichaAtual) return null; // Prevenção enquanto carrega

  const f = fichaAtual.ficha;

  return (
    <section className="bg-fd-background/80 p-6 rounded-xl border border-fd-primary/20 shadow-sm backdrop-blur-sm">
      <h2 className="text-xl font-bold mb-4 border-b border-fd-primary/20 pb-2 data-[active=true]:text-fd-primary">
        Informações Básicas
      </h2>
      <div className="flex flex-col gap-4">

        <label className="flex flex-col gap-1">
          <span className="font-semibold text-fd-primary/80">Nome</span>
          <input
            className="bg-transparent border border-fd-primary/30 text-fd-primary rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={f.infoPersonagem.nome}
            onChange={(e) => atualizarCampoBloco('infoPersonagem', 'nome', e.target.value)}
            disabled={!modoEdicao}
          />
        </label>

        {/* Repete para Vocação, Espécie, Idade, etc... */}

      </div>
    </section>
  );
}