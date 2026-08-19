"use client"
import { useRouter } from 'next/navigation';
import { criarFicha } from '@/lib/fichas';

export default function BtnCriarFicha({ tipo }) {
  const router = useRouter();

  const handleCriar = async () => {
    const novaFicha = await criarFicha(tipo); 
    
    if (novaFicha && novaFicha.id) {
      router.push(`/fichas/${novaFicha.id}`);
    } else {
      alert("Houve um problema ao criar a ficha.");
    }
  };

  return (
    <button onClick={handleCriar}>
      Criar {tipo}
    </button>
  );
}