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

    // 3. Atribui o ID único na nova ficha
    // novaFicha.id = crypto.randomUUID();
    // novaFicha.tipo = tipo

    const docRef = await addDoc(collection(db, "fichas"), {
      ficha: novaFicha.ficha,
      userId: usuario.uid,          // <-- Vincula ao ID do usuário!
      userEmail: usuario.email,     // <-- Salva o e-mail para referência
    });

    return { id: docRef.id };

    // 4. Recupera as fichas antigas do localStorage
    const fichasSalvas = localStorage.getItem('fichas');
    let arrayDeFichas = [];

    if (fichasSalvas) {
      arrayDeFichas = JSON.parse(fichasSalvas);
    }

    // 5. Salva a nova ficha no array e devolve pro localStorage
    arrayDeFichas.push(novaFicha);
    localStorage.setItem('fichas', JSON.stringify(arrayDeFichas));

    return novaFicha;

  } catch (erro) {
    console.error("Erro ao criar a ficha:", erro);
    return null;
  }
}