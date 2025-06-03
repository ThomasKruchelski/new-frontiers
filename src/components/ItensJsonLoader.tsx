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

  if (!itens) return <p> Carregando itens... </p>

  return <pre>{JSON.stringify(itens, null, 2)}</pre>
}