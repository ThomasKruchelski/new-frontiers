import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

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

    // --- ALTERAÇÃO AQUI ---
    // Agora o caminho inicial aponta diretamente para "content/livro-base"
    const contentDirectory = path.join(process.cwd(), "content","docs","livro-base");
    const listaDeArquivos = await lerArquivosRecursivamente(contentDirectory);

    // 1. Extrai palavras importantes da pergunta (ignorando palavras curtas como "o", "a", "de")
    const palavrasChave = question
      .toLowerCase()
      .split(" ")
      .filter(palavra => palavra.length > 3);

    let arquivosComPontuacao = [];

    // 2. Lê os arquivos e dá uma pontuação baseada em quantas palavras-chave aparecem neles
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

    // 3. Ordena os arquivos pela pontuação (do maior para o menor)
    arquivosComPontuacao.sort((a, b) => b.pontuacao - a.pontuacao);

    // 4. Pega APENAS os 2 arquivos mais relevantes (que pontuaram mais de 0)
    const melhoresArquivos = arquivosComPontuacao
      .filter(arq => arq.pontuacao > 0)
      .slice(0, 2); // Limita a 2 arquivos no máximo!

    let contextString = "";
    for (const arq of melhoresArquivos) {
      contextString += `\n--- Início de ${arq.filename} ---\n${arq.fileContent}\n--- Fim de ${arq.filename} ---\n`;
    }

    // Se não achou nenhum arquivo relevante, manda vazio ou cancela a request para poupar tokens
    if (melhoresArquivos.length === 0) {
      return NextResponse.json({ answer: "Desculpe, não encontrei informações sobre isso nos meus documentos." });
    }

    // PASSO 3: Enviar APENAS o conteúdo filtrado para a Groq
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
        model: "llama-3.3-70b-versatile",
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Falha na Groq");

    return NextResponse.json({ answer: data.choices[0].message.content });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}