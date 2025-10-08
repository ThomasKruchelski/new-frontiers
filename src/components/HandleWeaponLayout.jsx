import React from 'react';
import KeywordEffectbox from '@/components/KeywordEffectbox'

const HandleWeaponsLayout = ({ item }) => {

    return (
        <div className='item-arma flex-col' id={item.nome}>
            <div className='flex-col md:flex-row w-full flex border border-white'>
                <div className='flex flex-col flex-1 border-r '>
                    <div className='flex p-2 border-b'>
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
                    <div className='flex flex-1'>
                        <div className='flex flex-col p-1 border-r'>
                            <div className='font-light'>
                                Dado de Dano
                            </div>
                            <div className='flex font-medium text-2xl justify-center items-center flex-1 text-wrap text-center'>
                                {item.item.dadoDano === "" ? '-' : item.item.dadoDano}
                            </div>
                        </div>
                        <div className='flex flex-col p-1 border-r'>
                            <div className='font-light'>
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
                        <div className='flex flex-col justify-between border-r'>
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
                        <div className='flex flex-col justify-between border-r'>
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
                        <div className='flex flex-col justify-between border-r'>
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
                <div className='relative'>
                    <img src='https://placehold.co/300x160/080808/31343C'></img>
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
                            <div className='efeito-box'>
                                {efeito}
                            </div>
                        ))}
                    </div>
                </details>
            ) : null}

        </div>

    )
}

export default HandleWeaponsLayout;