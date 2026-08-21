import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { question } = body;

    if (!question) {
      return NextResponse.json(
        { error: "A pergunta é obrigatória." },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQCLOUD_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "A chave da API (GROQCLOUD_API_KEY) não está configurada." },
        { status: 500 }
      );
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "Você é um assistente útil e direto.",
          },
          {
            role: "user",
            content: question,
          },
        ],
        model: "llama-3.3-70b-versatile", 
        temperature: 0.7,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Falha ao comunicar com a API da Groq.");
    }

    const data = await response.json();
    const answer = data.choices[0].message.content;

    return NextResponse.json({ answer });

  } catch (error) {
    console.error("Erro na rota /api/groq:", error);
    return NextResponse.json(
      { error: error.message || "Erro interno no servidor." },
      { status: 500 }
    );
  }
}