'use client'
import { useEffect, useState } from 'react'

export default function MyJsonLoader() {
  const [itens, setItens] = useState(null)

  useEffect(() => {
    fetch('/json/itens.json')
      .then((res) => res.json())
      .then(setItens)
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    console.log('itens')
    console.log(itens)
  }, [itens])

  if (!itens) return <p> Carregando itens... </p>

  return (
    <div>
      {itens.map((item) => item.tipoPrincipal == "arma" ? (
        <div className='flex-col md:flex-row w-full item-arma'>
          <div className='flex flex-col flex-1 border-r '>
            <div className='flex p-2 border-b'>
              <div className='text-2xl'>
                {item.nome}
              </div>
              <div className='flex'>
                {item.tipoSecundario.map((tipo) => (
                  <div className='tag ml-2'>
                    {tipo}
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
                  <div className='flex px-2 font-medium text-2xl justify-center items-center flex-1'>
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
                      {item.valor === ""? '-': item.valor + '$'}
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
            <img src='https://placehold.co/300x150/080808/31343C'></img>
            <div className='img-desc-hover'>
              {item.descricao}
            </div>
          </div>
        </div>
      ) : (
        <div>
          TIPO "{item.tipoPrincipal}" NÃO IDENTIFICADO
        </div>
      )
      )}
    </div>
  )
}