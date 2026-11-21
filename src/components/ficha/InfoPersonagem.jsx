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
            maxLength={60}
            onChange={(e) => atualizarCampoBloco('infoPersonagem', 'nome', e.target.value)}
            placeholder='Não Definido'
            disabled={!modoEdicao}
          />
        </label>


        <label className="flex flex-col gap-1 flex-1">
          <span className="font-semibold text-fd-primary/80">Espécie</span>
          <input
            className="bg-transparent border border-fd-primary/30 text-fd-primary rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={f.infoPersonagem.especie}
            maxLength={36}
            onChange={(e) => atualizarCampoBloco('infoPersonagem', 'especie', e.target.value)}
            placeholder='Não Definido'
            disabled={!modoEdicao}
          />
        </label>

        <label className="flex flex-col gap-1 flex-1">
          <span className="font-semibold text-fd-primary/80">Âncora</span>
          <input
            className="bg-transparent border border-fd-primary/30 text-fd-primary rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={f.infoPersonagem.ancora}
            maxLength={36}
            onChange={(e) => atualizarCampoBloco('infoPersonagem', 'ancora', e.target.value)}
            placeholder='Não Definido'
            disabled={!modoEdicao}
          />
        </label>


        <div className='flex gap-4'>
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-fd-primary/80">Vocação</span>
            <input
              className="bg-transparent border border-fd-primary/30 text-fd-primary rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={f.infoPersonagem.vocacao}
              maxLength={36}
              onChange={(e) => atualizarCampoBloco('infoPersonagem', 'vocacao', e.target.value)}
              placeholder='Não Definido'
              disabled={!modoEdicao}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-semibold text-fd-primary/80">Nível</span>
            <input
              className="bg-transparent border border-fd-primary/30 w-full text-fd-primary rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={f.infoPersonagem.nivel}
              maxLength={36}
              min="0"
              max="3"
              type='number'
              onChange={(e) => atualizarCampoBloco('infoPersonagem', 'nivel', e.target.value)}
              disabled={!modoEdicao}
            />
          </label>

        </div>

        <div className='flex gap-4'>
          <label className="flex flex-col gap-1">
            <span className="font-semibold text-fd-primary/80">Jogador</span>
            <input
              className="bg-transparent border border-fd-primary/30 text-fd-primary rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={f.infoPersonagem.jogador}
              maxLength={36}
              onChange={(e) => atualizarCampoBloco('infoPersonagem', 'jogador', e.target.value)}
              placeholder='Não Definido'
              disabled={!modoEdicao}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="font-semibold text-fd-primary/80 ">Experiencia</span>
            <input
              className="bg-transparent border border-fd-primary/30 w-full text-fd-primary rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={f.infoPersonagem.experiencia}
              min="0"
              max='999'
              maxLength={3}
              type='number'
              onChange={(e) => atualizarCampoBloco('infoPersonagem', 'experiencia', e.target.value)}
              disabled={!modoEdicao}
            />
          </label>

        </div>

      </div>
    </section>
  );
}