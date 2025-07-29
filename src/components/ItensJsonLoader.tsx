'use client'
import { useEffect, useState } from 'react'
import KeywordEffectbox from '@/components/KeywordEffectbox'
import HandleWeaponLayout from '@/components/HandleWeaponLayout'

export default function MyJsonLoader() {
  const [itens, setItens] = useState<any[]>([])

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
        <HandleWeaponLayout item={item} />
        // 
      ) : (
        <div>
          TIPO "{item.tipoPrincipal}" NÃO IDENTIFICADO
        </div>
      )
      )}
    </div>
  )
}