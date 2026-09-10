import React from 'react';
import KeywordEffectbox from '@/components/KeywordEffectbox'
import MarkdownContent from '@/components/MarkdownContent';

const HandleWeaponsLayout = ({ item }) => {

    const corBordas = item.corBordas? item.corBordas : '#ffffff'

    return (
        <div className='item-arma flex-col' id={item.nome}>
            <div className={'flex-col md:flex-row w-full flex border '} style={corBordas ? { borderColor: corBordas } : undefined}>
                <div className='flex flex-col flex-1 border-r '>
                    <div className='flex p-2 border-b md:flex-row flex-col'>
                        <div className='text-2xl'>
                            {item.nome}
                        </div>
                        <div className='flex'>
                            {item.tipoSecundario.map((tipo) => (
                                <div className='tag ml-2' key={item.nome + '-' + tipo}>
                                    {tipo}
                                </div>
                            ))}
                            {item.item.keywords.map((keyword) => (
                                <div className='tag ml-2'>
                                    {keyword}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-1 md:flex-row flex-col'>
                        <div className='flex flex-1'>
                            <div className='flex flex-col p-1 border-r md:w-auto w-1/3'>
                                <div className='font-light text-center'>
                                    Dado de Dano
                                </div>
                                <div className='flex font-medium text-2xl justify-center items-center flex-1 text-wrap text-center gap-1'>
                                    {item.item.dadoDano[0] !== "" && <div className='text-red-300'>{item.item.dadoDano[0]}</div>}
                                    {item.item.dadoDano[1] !== "" && <div className='text-orange-400'>{item.item.dadoDano[1]}</div>}
                                    {item.item.dadoDano[2] !== "" && <div className='text-lime-300'>{item.item.dadoDano[2]}</div>}
                                    {item.item.dadoDano[3] !== "" && <div className='text-teal-200'>{item.item.dadoDano[3]}</div>}
                                    {item.item.dadoDano[4] !== "" && <div className='text-purple-500'>{item.item.dadoDano[4]}</div>}
                                    {item.item.dadoDano.every(item => item.trim() === "") && "-"}
                                </div>
                            </div>
                            <div className='flex flex-col p-1 border-r md:w-auto w-1/3'>
                                <div className='font-light text-center'>
                                    Bônus de Dano
                                </div>
                                <div className='flex flex-col font-medium text-2xl justify-center items-center flex-1'>
                                    {item.item.bonusDano.map((bonus) => (
                                        <div>
                                            {bonus === "" ? '-' : bonus}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='flex flex-col justify-between border-r md:w-auto w-1/3'>
                                <div className='flex flex-1 border-b p-1 items-center'>
                                    <div className='font-light text-sm'>
                                        tipo
                                    </div>
                                    <div className='flex px-2 font-medium text-xl justify-center items-center flex-1'>
                                        {item.item.tipoDano === "" ? '-' : item.item.tipoDano}
                                    </div>
                                </div>
                                <div className='flex flex-1 p-1 items-center'>
                                    <div className='font-light text-sm'>
                                        area
                                    </div>
                                    <div className='flex px-2 font-medium text-md justify-center items-center flex-1'>
                                        {item.item.area === "" ? '-' : item.item.area}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-1'>
                            <div className='flex flex-col justify-between border-r border-t md:w-auto w-1/2'>
                                <div className='flex flex-1 border-b p-1 items-center'>
                                    <div className='font-light text-sm'>
                                        pericia
                                    </div>
                                    <div className='flex px-2 font-medium items-center flex-1'>
                                        {item.item.pericia === "" ? '-' : item.item.pericia}
                                    </div>
                                </div>
                                <div className='flex flex-1 border-b p-1 items-center'>
                                    <div className='font-light text-sm'>
                                        mãos
                                    </div>
                                    <div className='flex px-2 font-medium items-center flex-1'>
                                        {item.item.maos === "" ? '-' : item.item.maos}
                                    </div>
                                </div>
                                <div className='flex flex-1 p-1 items-center'>
                                    <div className='font-light text-sm'>
                                        Valor
                                    </div>
                                    <div className='flex px-2 font-medium items-center flex-1'>
                                        {item.valor === "" ? '-' : item.valor + '$'}
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col justify-between border-r border-t md:w-auto w-1/2 '>
                                <div className='flex flex-1 border-b p-1 items-center'>
                                    <div className='font-light text-sm'>
                                        distância
                                    </div>
                                    <div className='flex px-2 font-medium items-center flex-1'>
                                        {item.item.distancia === "" ? '-' : item.item.distancia + 'm'}
                                    </div>
                                </div>
                                <div className='flex flex-1 border-b p-1 items-center'>
                                    <div className='font-light text-sm'>
                                        carga
                                    </div>
                                    <div className='flex px-2 font-medium items-center flex-1'>
                                        {item.item.carga === "" ? '-' : item.item.carga}
                                    </div>
                                </div>
                                <div className='flex flex-1 p-1 items-center'>
                                    <div className='font-light text-sm'>
                                        munição
                                    </div>
                                    <div className='flex px-2 font-medium justify-center items-center flex-1'>
                                        {item.item.municao === "" ? '-' : item.item.municao}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='relative flex'>
                    <div className='flex items-center flex-1 min-w-[300px] bg-[#080808]'>
                        <img className='w-full' src={!item.imagem? 'https://placehold.co/300x160/080808/31343C': item.imagem }></img>
                    </div>
                    <div className='img-desc-hover'>
                        {item.descricao}
                    </div>
                </div>
            </div>
            {item.item.especial[0] != null || item.item.keywords[0] != null ? (
                <details className='details-box'>
                    <summary>Detalhes</summary>
                    <div className='sanfona'>
                        {item.item.keywords.map((keyword) => (
                            <KeywordEffectbox keyword={keyword} />
                        ))}
                        {item.item.especial.map((efeito) => (
                            
                                <div className='efeito-box prose dark:prose-invert'>
                                    <MarkdownContent>
                                        {efeito}
                                    </MarkdownContent>
                                </div>
                        ))}
                    </div>
                </details>
            ) : null}

        </div>

    )
}

export default HandleWeaponsLayout;