"use client";
import Image from "next/image";
import Link from "next/link";
// import { toast } from "sonner";
// import { motion } from "framer-motion";
import BtnCriarFicha from "@/components/ficha/btnCriarFicha"

export default function CharacterSheet() {

  return (
    <main className="flex flex-1 flex-col items-center pb-10 w-full">

      <div className=" max-w-[500px] box-content border-b border-fd-foreground/10 transition-colors p-4 px-8 lg:mt-4 lg:w-[calc(100%-1rem)] lg:rounded-2xl lg:border shadow-sm bg-fd-background/80 backdrop-blur-lg">
        <b> Ficha Excel</b>

        <p>1. Acesse o arquivo no Google docs 
          <a className="hyperlink pl-2" target='_blank' href="https://docs.google.com/spreadsheets/d/1cZezQt8fyfF2wT1SN6AYVOKbV6HbRo4kANuCDSkdP7c/edit?gid=1362246236#gid=1362246236">
            Clicando aqui
          </a>
        </p>

        <p>2. Acesse o menu Arquivo: Fazer uma cópia</p>

        <p>3. Acesse e preencha a cópia criada</p>
      </div>

      <div className=" max-w-[500px] box-content border-b border-fd-foreground/10 transition-colors p-4 px-8 lg:mt-4 lg:w-[calc(100%-1rem)] lg:rounded-2xl lg:border shadow-sm bg-fd-background/80 backdrop-blur-lg">
        <b> Ficha no Site</b>

        <BtnCriarFicha tipo='personagem'/>
        
      </div>
    </main>
  );
}
