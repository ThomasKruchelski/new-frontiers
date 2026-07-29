"use client";
import Image from "next/image";
import Link from "next/link";


import React, { useState, useEffect, useCallback, useRef } from "react";


export default function Chatbot() {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question) return;
    
    setLoading(true);
    setAnswer("");
    
    try {
      const res = await fetch("/api/groq/livro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      
      if (res.ok) {
        setAnswer(data.answer);
      } else {
        setAnswer(`Erro: ${data.error}`);
      }
    } catch (error) {
      setAnswer("Falha na conexão com a API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-[80vh] pb-10 w-full">

      <h1 className="text-3xl font-bold pb-20">Como posso te ajudar?</h1>


        {answer && (
          <div className="lg:max-w-[1080px] box-content border-b border-fd-foreground/10 transition-colors p-4 px-8 lg:mt-4 lg:rounded-2xl lg:border shadow-sm bg-fd-background/80 backdrop-blur-lg">
            <p>{answer}</p>
          </div>
        )}

      <div className="flex">
        <input type="text" 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)} 
          placeholder="Faça uma pergunta..." 
          className="max-w-[400px] border-b border-fd-foreground/10 transition-colors p-2 px-4 lg:mt-4 lg:w-[calc(100%-1rem)] rounded-xl lg:border shadow-sm bg-fd-background/80 backdrop-blur-lg">
        </input>

        <button onClick={handleAsk} disabled={loading} className="cursor-pointer rounded-xl lg:mt-4 bg-fd-background/80 backdrop-blur-lg p-2 px-4">
          {loading ? "Pensando..." : "Enviar"}
        </button>
      </div>
    
    </main>
    
  );
}
