import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseClient';

export async function criarFicha(tipo, usuario) {
  try {

    let fetchURL = ""

    if (tipo === 'personagem') {
      fetchURL = "json/ficha-personagem.json"
    } else if (tipo === 'npc') {
      fetchURL = "json/ficha-npc.json"
    }

    const resposta = await fetch(fetchURL);

    if (!resposta.ok) {
      throw new Error('Falha ao carregar o template da ficha.');
    }

    const novaFicha = await resposta.json();

    const docRef = await addDoc(collection(db, "fichas"), {
      ficha: novaFicha.ficha,
      userId: usuario.uid,          
      userEmail: usuario.email,    
    });

    return { id: docRef.id };

  } catch (erro) {
    console.error("Erro ao criar a ficha:", erro);
    return null;
  }
}