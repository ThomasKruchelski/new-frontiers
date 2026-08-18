"use client"
import { useFicha } from '@/contexts/FichaContext';

export default function Atributos() {

    const { fichaAtual, modoEdicao, atualizarAtributo, atributosFinais } = useFicha();

    if (!fichaAtual) return null; // Prevenção enquanto carrega

    const f = fichaAtual.ficha;

    return (
        <section className="bg-fd-background/80 p-6 rounded-xl border border-fd-primary/20 shadow-sm backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-4 border-b border-fd-primary/20 pb-2 data-[active=true]:text-fd-primary">Atributos</h2>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center bg-transparent p-3 rounded-md border border-fd-primary/20">
                    <strong className="text-fd-primary/90 w-28">Corpo: {atributosFinais.corpo}</strong>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="Inicial"
                            className="bg-transparent border border-fd-primary/30 text-fd-primary data-[active=true]:text-fd-primary rounded-md px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={f.atributos.corpo.valorInicial}
                            maxLength={2}
                            onChange={(e) => atualizarAtributo('corpo', 'valorInicial', e.target.value)}
                            disabled={!modoEdicao}
                        />
                        <input
                            type="number"
                            placeholder="Adic."
                            className="bg-transparent border border-fd-primary/30 text-fd-primary data-[active=true]:text-fd-primary rounded-md px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={f.atributos.corpo.valorAdicional}
                            maxLength={2}
                            onChange={(e) => atualizarAtributo('corpo', 'valorAdicional', e.target.value)}
                            disabled={!modoEdicao}
                        />
                    </div>

                </div>
                <div className="flex justify-between items-center bg-transparent p-3 rounded-md border border-fd-primary/20">
                    <strong className="text-fd-primary/90 w-28">Destreza: {atributosFinais.destreza}</strong>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="Inicial"
                            className="bg-transparent border border-fd-primary/30 text-fd-primary data-[active=true]:text-fd-primary rounded-md px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={f.atributos.destreza.valorInicial}
                            maxLength={2}
                            onChange={(e) => atualizarAtributo('destreza', 'valorInicial', e.target.value)}
                            disabled={!modoEdicao}
                        />
                        <input
                            type="number"
                            placeholder="Adic."
                            className="bg-transparent border border-fd-primary/30 text-fd-primary data-[active=true]:text-fd-primary rounded-md px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={f.atributos.destreza.valorAdicional}
                            maxLength={2}
                            onChange={(e) => atualizarAtributo('destreza', 'valorAdicional', e.target.value)}
                            disabled={!modoEdicao}
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center bg-transparent p-3 rounded-md border border-fd-primary/20">
                    <strong className="text-fd-primary/90 w-28">Persona: {atributosFinais.persona}</strong>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="Inicial"
                            className="bg-transparent border border-fd-primary/30 text-fd-primary data-[active=true]:text-fd-primary rounded-md px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={f.atributos.persona.valorInicial}
                            maxLength={2}
                            onChange={(e) => atualizarAtributo('persona', 'valorInicial', e.target.value)}
                            disabled={!modoEdicao}
                        />
                        <input
                            type="number"
                            placeholder="Adic."
                            className="bg-transparent border border-fd-primary/30 text-fd-primary data-[active=true]:text-fd-primary rounded-md px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={f.atributos.persona.valorAdicional}
                            maxLength={2}
                            onChange={(e) => atualizarAtributo('persona', 'valorAdicional', e.target.value)}
                            disabled={!modoEdicao}
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center bg-transparent p-3 rounded-md border border-fd-primary/20">
                    <strong className="text-fd-primary/90 w-28">Inteligência: {atributosFinais.inteligencia}</strong>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="Inicial"
                            className="bg-transparent border border-fd-primary/30 text-fd-primary data-[active=true]:text-fd-primary rounded-md px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={f.atributos.inteligencia.valorInicial}
                            maxLength={2}
                            onChange={(e) => atualizarAtributo('inteligencia', 'valorInicial', e.target.value)}
                            disabled={!modoEdicao}
                        />
                        <input
                            type="number"
                            placeholder="Adic."
                            className="bg-transparent border border-fd-primary/30 text-fd-primary data-[active=true]:text-fd-primary rounded-md px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={f.atributos.inteligencia.valorAdicional}
                            maxLength={2}
                            onChange={(e) => atualizarAtributo('inteligencia', 'valorAdicional', e.target.value)}
                            disabled={!modoEdicao}
                        />
                    </div>
                </div>
                <div className="flex justify-between items-center bg-transparent p-3 rounded-md border border-fd-primary/20">
                    <strong className="text-fd-primary/90 w-28">Educação: {atributosFinais.educacao}</strong>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            placeholder="Inicial"
                            className="bg-transparent border border-fd-primary/30 text-fd-primary data-[active=true]:text-fd-primary rounded-md px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={f.atributos.educacao.valorInicial}
                            maxLength={2}
                            onChange={(e) => atualizarAtributo('educacao', 'valorInicial', e.target.value)}
                            disabled={!modoEdicao}
                        />
                        <input
                            type="number"
                            placeholder="Adic."
                            className="bg-transparent border border-fd-primary/30 text-fd-primary data-[active=true]:text-fd-primary rounded-md px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={f.atributos.educacao.valorAdicional}
                            maxLength={2}
                            onChange={(e) => atualizarAtributo('educacao', 'valorAdicional', e.target.value)}
                            disabled={!modoEdicao}
                        />
                    </div>
                </div>

            </div>
        </section>
    )
}