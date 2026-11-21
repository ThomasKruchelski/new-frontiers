"use client"

import { useFicha } from '@/contexts/FichaContext';

export default function ResistenciasEPrecursores() {
    // Atualizado com o novo nome da variável que você definiu no contexto
    const { modoEdicao, resistsEPrecursFinais, atualizarResistencia, atualizarPrecursor } = useFicha();

    if (!resistsEPrecursFinais) return null;

    // Função auxiliar com o mesmo layout dos cards de Perícias
    const renderizarLinha = (titulo, chave, dados, funcaoAtualizar) => (
        <div key={chave} className="flex flex-col justify-between items-start p-2 bg-fd-background/50 rounded-lg border border-fd-primary/10 gap-2">

            <div className="flex flex-col w-full">
                <span className="font-semibold text-fd-primary capitalize">
                    {titulo}
                </span>
                {!modoEdicao && (
                    <div className='flex gap-2'>
                        {/* Como removemos o valor inicial, podemos mostrar apenas a vantagem se for maior que 0 */}
                        {dados.vantagem > 0 && <span className="text-[10px] text-fd-primary/50">Vantagem: {dados.vantagem}</span>}
                    </div>
                )}
            </div>

            {modoEdicao ? (
                // MODO EDIÇÃO
                <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 flex-wrap justify-around">
                    <label className="flex flex-col text-[10px] text-fd-primary/60 w-4/10 wrap">
                        Adic
                        <input
                            type="number"
                            className="bg-transparent border border-fd-primary/30 text-fd-primary rounded px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={dados.adicional}
                            onChange={(e) => funcaoAtualizar(chave, 'valorAdicional', e.target.value)}
                        />
                    </label>
                    <label className="flex flex-col text-[10px] text-fd-primary/60 w-4/10 wrap">
                        Vant
                        <input
                            type="number"
                            className="bg-transparent border border-fd-primary/30 text-fd-primary rounded px-1 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={dados.vantagem}
                            onChange={(e) => funcaoAtualizar(chave, 'vantagem', e.target.value)}
                        />
                    </label>
                </div>
            ) : (
                // MODO VISUALIZAÇÃO: Extremo, Difícil e Normal (Cores e ordem das suas Perícias)
                <div className="flex gap-1 w-full justify-end">
                    <div className="flex flex-col items-center bg-red-500/10 border border-red-500/30 px-1 py-1 rounded-md min-w-[50px] max-w-[60px]">
                        <span className="text-[10px] uppercase font-bold text-red-500/80">Ext</span>
                        <span className="font-bold text-red-600 dark:text-red-400">{dados.extremo}</span>
                    </div>
                    <div className="flex flex-col items-center bg-yellow-300/10 border border-yellow-500/30 px-1 py-1 rounded-md min-w-[50px] max-w-[60px]">
                        <span className="text-[10px] uppercase font-bold text-yellow-500/80">Dif</span>
                        <span className="font-bold text-yellow-600 dark:text-yellow-200/90">{dados.dificil}</span>
                    </div>
                    <div className="flex flex-col items-center bg-fd-primary/5 border border-fd-primary/20 px-1 py-1 rounded-md min-w-[50px] max-w-[60px]">
                        <span className="text-[10px] uppercase font-bold text-fd-primary/60">Nor</span>
                        <span className="font-bold text-fd-primary">{dados.normal}</span>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <div className="space-y-6">

            {/* SEÇÃO: RESISTÊNCIAS */}
            <section className="bg-fd-background/80 p-6 rounded-xl border border-fd-primary/20 shadow-sm backdrop-blur-sm">
                <div className='flex place-content-around pb-2 mb-4 border-b border-fd-primary/20'>
                    <h2 className="text-xl font-bold data-[active=true]:text-fd-primary">
                        Resistências
                    </h2>
                    <h2 className="text-xl font-bold data-[active=true]:text-fd-primary">
                        Precursores
                    </h2>
                </div>

                {/* Grid de 3 colunas para acomodar Fortitude, Reflexo e Vontade lado a lado */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {renderizarLinha("Fortitude", "fortitude", resistsEPrecursFinais.fortitude, atualizarResistencia)}
                    {renderizarLinha("Ideia", "ideia", resistsEPrecursFinais.ideia, atualizarPrecursor)}
                    {renderizarLinha("Reflexo", "reflexo", resistsEPrecursFinais.reflexo, atualizarResistencia)}
                    {renderizarLinha("Saber", "saber", resistsEPrecursFinais.saber, atualizarPrecursor)}
                    {renderizarLinha("Vontade", "vontade", resistsEPrecursFinais.vontade, atualizarResistencia)}
                    {renderizarLinha("Sorte", "sorte", resistsEPrecursFinais.sorte, atualizarPrecursor)}
                </div>
            </section>

        </div>
    );
}