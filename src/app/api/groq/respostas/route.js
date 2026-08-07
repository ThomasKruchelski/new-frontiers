import { NextResponse } from "next/server";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// --- INICIALIZAÇÃO DO FIREBASE ADMIN ---
// Como estamos em um arquivo separado, precisamos garantir que o Firebase está conectado aqui também.
if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export async function GET() {
  try {
    const db = getFirestore(); // Conecta ao banco usando a instância já inicializada no topo do arquivo

    // Busca todos os documentos da coleção "groq-answers"
    // Usamos orderBy para trazer os mais recentes primeiro (requer que o campo createdAt exista)
    const snapshot = await db.collection("groq-answers").orderBy("createdAt", "desc").get();

    // Mapeia os documentos do formato do Firestore para um array de objetos limpo
    const historico = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id, // ID único gerado pelo Firebase
        question: data.question,
        answer: data.answer,
        // Converte o timestamp do Firestore para uma data legível, se existir
        createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null
      };
    });

    return NextResponse.json({ data: historico }, { status: 200 });

  } catch (error) {
    console.error("Erro ao buscar histórico no Firebase:", error);
    return NextResponse.json({ error: "Falha ao buscar o histórico de perguntas." }, { status: 500 });
  }
}