"use client"

import { useRouter } from 'next/navigation';
import { criarFicha } from '@/lib/fichas';
import { useAuth } from '@/contexts/AuthContext'; 

export default function BtnCriarFicha({ tipo }) {
  const router = useRouter();
  const { usuarioLogado } = useAuth(); 

  const handleCriar = async () => {
    const novaFicha = await criarFicha(tipo, usuarioLogado); 
    
    if (novaFicha && novaFicha.id) {
      router.push(`/fichas/${novaFicha.id}`);
    } else {
      alert("Houve um problema ao criar a ficha.");
    }
  };

  return (
    <button onClick={handleCriar} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold shadow-sm transition-colors">
      Criar Personagem
    </button>
  );
}