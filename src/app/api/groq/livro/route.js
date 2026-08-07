import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

// If só pra não iniciar duas vezes
if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

// Conectando ao banco de dados Firestore
const db = getFirestore();
// models podem ser encontrados no site da groq https://console.groq.com/docs/rate-limits
const aiModel = "llama-3.3-70b-versatile"

// junta a listade arquivos para a leitura da IA
async function lerArquivosRecursivamente(diretorio) {
  let arquivosEncontrados = [];
  try {
    const itens = await fs.readdir(diretorio);
    for (const item of itens) {
      const caminhoCompleto = path.join(diretorio, item);
      const stat = await fs.stat(caminhoCompleto);
      if (stat.isDirectory()) {
        const arquivosDaSubpasta = await lerArquivosRecursivamente(caminhoCompleto);
        arquivosEncontrados = arquivosEncontrados.concat(arquivosDaSubpasta);
      } else if (item.endsWith('.mdx') || item.endsWith('.md')) {
        arquivosEncontrados.push(caminhoCompleto);
      }
    }
  } catch (error) {
    console.error("Erro ao ler diretório", error);
  }
  return arquivosEncontrados;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { question } = body;

    if (!question) return NextResponse.json({ error: "Pergunta obrigatória." }, { status: 400 });

    const apiKey = process.env.GROQCLOUD_API_KEY;

    //Cwd passa o mapa de qual sequencia de arquivos acessar para a função de ler arquivos recursivamente.
    const contentDirectory = path.join(process.cwd(), "content", "docs", "livro-base");
    const listaDeArquivos = await lerArquivosRecursivamente(contentDirectory);

    const palavrasChave = question
      .toLowerCase()
      .split(" ")
      .filter(palavra => palavra.length > 3);

    let arquivosComPontuacao = [];

    for (const filePath of listaDeArquivos) {
      const fileContent = await fs.readFile(filePath, "utf8");
      const filename = path.basename(filePath);
      
      const conteudoMinusculo = fileContent.toLowerCase();
      let pontuacao = 0;

      palavrasChave.forEach(palavra => {
        if (conteudoMinusculo.includes(palavra)) {
          pontuacao += 1;
        }
      });

      arquivosComPontuacao.push({ filename, fileContent, pontuacao });
    }

    arquivosComPontuacao.sort((a, b) => b.pontuacao - a.pontuacao);

    const melhoresArquivos = arquivosComPontuacao
      .filter(arq => arq.pontuacao > 0)
      .slice(0, 2);

    let contextString = "";
    for (const arq of melhoresArquivos) {
      contextString += `\n--- Início de ${arq.filename} ---\n${arq.fileContent}\n--- Fim de ${arq.filename} ---\n`;
    }

    if (melhoresArquivos.length === 0) {
      return NextResponse.json({ answer: "Desculpe, não encontrei informações sobre isso nos meus documentos." });
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
            content: `Use os documentos abaixo como contexto para responder. Se a resposta não estiver nos documentos, diga que não sabe.\n\nCONTEXTO:${contextString}`,
          },
          { role: "user", content: question },
        ],
        model: aiModel,
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Falha na Groq");

    // Resposta final
    const finalAnswer = data.choices[0].message.content;

    // Salvando no Firestore
    try {
      await db.collection("groq-answers").add({
        question: question,
        answer: finalAnswer,
        createdAt: FieldValue.serverTimestamp(),
        model: aiModel
        
      });
      console.log("#####Pergunta e resposta salvas no Firestore!");
    } catch (dbError) {
      console.error("Erro ao salvar no banco de dados:", dbError);
    }

    return NextResponse.json({ answer: finalAnswer });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}