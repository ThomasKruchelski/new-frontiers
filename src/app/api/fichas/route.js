import { NextResponse } from "next/server";
import { dbAdmin } from "@/lib/firebaseAdmin";

// MÉTODO GET: Retorna todas as fichas de um usuário específico
export async function GET(request) {
  try {
    // Pegamos o "userId" que o frontend vai mandar na URL (ex: /api/fichas?userId=123)
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "ID do usuário não fornecido." }, { status: 400 });
    }

    // Busca no Admin SDK filtrando pelo dono da ficha
    const snapshot = await dbAdmin.collection("fichas")
      .where("userId", "==", userId)
      // .orderBy("criadoEm", "desc") // Você pode descomentar isso se quiser ordenar pela mais nova
      .get();

    const listaFichas = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json(listaFichas, { status: 200 });

  } catch (error) {
    console.error("Erro ao listar fichas:", error);
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}

// MÉTODO POST: Cria uma ficha nova (Para o BtnCriarFicha)
export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, userEmail, tipo } = body;

    if (!userId) {
      return NextResponse.json({ error: "Usuário não autenticado." }, { status: 401 });
    }

    // O modelo base da ficha vazia
    const modeloFichaVazia = {
      infoPersonagem: { nome: "Novo Personagem", nivel: 0, vocacao: "", especie: "" },
      // Adicione aqui os outros objetos vazios (atributos, saude, pericias, etc)
    };

    // Cria o documento no banco
    const docRef = await dbAdmin.collection("fichas").add({
      ficha: modeloFichaVazia,
      userId: userId,
      userEmail: userEmail || "",
      criadoEm: new Date().toISOString()
    });

    return NextResponse.json({ id: docRef.id, sucesso: true }, { status: 201 });

  } catch (error) {
    console.error("Erro ao criar ficha:", error);
    return NextResponse.json({ error: "Erro interno ao criar ficha." }, { status: 500 });
  }
}