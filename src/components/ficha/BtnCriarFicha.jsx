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
    <button onClick={handleCriar} className='cursor-pointer max-w-[200px] px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition-colors duration-200 shadow-sm border border-transparent'>
      Criar {tipo}
    </button>
  );
}