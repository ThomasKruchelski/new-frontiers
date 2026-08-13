"use client"
import { useRouter } from 'next/navigation';
import { criarFicha } from '@/lib/fichas.js'; // Ajuste o caminho se necessário

export function BotaoCriarFicha() {
  const router = useRouter();

  const handleCriar = async () => {
    // Agora usamos o 'await' porque o fetch leva alguns milissegundos
    const novaFicha = await criarFicha(); 
    
    // Verifica se deu tudo certo antes de redirecionar
    if (novaFicha && novaFicha.id) {
      router.push(`/fichas/${novaFicha.id}`);
    } else {
      alert("Houve um problema ao criar a ficha.");
    }
  };

  return (
    <button onClick={handleCriar}>
      Criar Personagem
    </button>
  );
}