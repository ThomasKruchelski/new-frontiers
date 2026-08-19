"use client"

import { useFicha } from '@/contexts/FichaContext';

export default function ResistenciasEPrecursores() {
    const { modoEdicao, resistsEPrecursFinais, atualizarResistencia, atualizarPrecursor } = useFicha();

    // Se os testes ainda não foram calculados, não renderiza nada
    if (!resistsEPrecursFinais) return null;

    // Função auxiliar para renderizar cada linha (evita repetição de código)
    const renderizarLinha = (titulo, chave, dados, funcaoAtualizar) => (
        <div key={chave} className="flex flex-col justify-between items-start p-3 bg-fd-background/50 rounded-lg border border-fd-primary/10 gap-3">
            <div className='flex items-baseline gap-4'>
                <span className="font-semibold text-fd-primary capitalize pl-1">{titulo}</span>
                {dados.vantagem > 0 ?<span className="text-sm text-fd-primary/60">vantagens: {dados.vantagem}</span> : null}
            </div>

            {modoEdicao ? (
                // MODO EDIÇÃO: Inputs para os modificadores base
                <div className="flex gap-2 w-full sm:w-auto">
                    <label className="flex flex-col text-xs text-fd-primary/60">
                        Vantagens
                        <input
                            type="number"
                            className="w-16 bg-transparent border border-fd-primary/30 text-fd-primary rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={dados.vantagem}
                            onChange={(e) => funcaoAtualizar(chave, 'vantagem', e.target.value)}
                        />
                    </label>
                    <label className="flex flex-col text-xs text-fd-primary/60">
                        Adicional
                        <input
                            type="number"
                            className="w-16 bg-transparent border border-fd-primary/30 text-fd-primary rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={dados.adicional}
                            onChange={(e) => funcaoAtualizar(chave, 'valorAdicional', e.target.value)}
                        />
                    </label>
                </div>
            ) : (
                // MODO VISUALIZAÇÃO: Mostra os testes calculados
                <div className="flex gap-2 w-full justify-end">
                    <div className="flex flex-1 flex-col items-center bg-red-500/10 border border-red-500/30 px-3 py-1 rounded-md min-w-[70px]">
                        <span className="text-[10px] uppercase font-bold text-red-500/80">Extremo</span>
                        <span className="font-bold text-red-600 dark:text-red-400">{dados.extremo} %</span>
                    </div>
                    <div className="flex flex-1 flex-col items-center bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-md min-w-[70px]">
                        <span className="text-[10px] uppercase font-bold text-blue-500/80">Difícil</span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">{dados.dificil} %</span>
                    </div>
                    <div className="flex flex-1 flex-col items-center bg-fd-primary/5 border border-fd-primary/20 px-3 py-1 rounded-md min-w-[70px]">
                        <span className="text-[10px] uppercase font-bold text-fd-primary/60">Normal</span>
                        <span className="font-bold text-fd-primary">{dados.normal} %</span>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="space-y-6">

            {/* SEÇÃO: RESISTÊNCIAS */}
            <section className="bg-fd-background/80 p-6 rounded-xl border border-fd-primary/20 shadow-sm backdrop-blur-sm">
                <h2 className="text-xl font-bold mb-4 border-b border-fd-primary/20 pb-2 data-[active=true]:text-fd-primary">
                    Resistências
                </h2>
                <div className="flex flex-col gap-2">
                    {renderizarLinha("Fortitude", "fortitude", resistsEPrecursFinais.fortitude, atualizarResistencia)}
                    {renderizarLinha("Reflexo", "reflexo", resistsEPrecursFinais.reflexo, atualizarResistencia)}
                    {renderizarLinha("Vontade", "vontade", resistsEPrecursFinais.vontade, atualizarResistencia)}
                </div>
            </section>

            {/* SEÇÃO: PRECURSORES */}
            <section className="bg-fd-background/80 p-6 rounded-xl border border-fd-primary/20 shadow-sm backdrop-blur-sm">
                <h2 className="text-xl font-bold mb-4 border-b border-fd-primary/20 pb-2 data-[active=true]:text-fd-primary">
                    Precursores
                </h2>
                <div className="flex flex-col gap-2">
                    {renderizarLinha("Ideia", "ideia", resistsEPrecursFinais.ideia, atualizarPrecursor)}
                    {renderizarLinha("Saber", "saber", resistsEPrecursFinais.saber, atualizarPrecursor)}
                    {renderizarLinha("Sorte", "sorte", resistsEPrecursFinais.sorte, atualizarPrecursor)}
                </div>
            </section>

        </div>
    );
}