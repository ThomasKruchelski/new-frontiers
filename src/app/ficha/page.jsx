"use client";
import Image from "next/image";
import Link from "next/link";
// import { toast } from "sonner";
// import { motion } from "framer-motion";

import React, { useState, useEffect, useCallback, useRef } from "react";

const DEFAULT_SHEET = {
  name: "",
  handle: "",
  role: "",
  level: 1,
  humanity: 40,
  reputation: 0,
  hit_points: 40,
  max_hit_points: 40,
  armor: 0,
  eurodollars: 2000,
  stats: {
    intelligence: 5,
    reflexes: 5,
    dexterity: 5,
    technology: 5,
    cool: 5,
    willpower: 5,
    luck: 5,
    move: 5,
    body: 5,
    empathy: 5,
  },
  skills: [],
  cyberware: [],
  weapons: [],
  gear: [],
  backstory: "",
  appearance: "",
  lifepath_notes: "",
  portrait_url: "",
};

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

        <p>Em construção...</p>
        
      </div>
    </main>
    //     <SheetToolbar
    //       characters={characters}
    //       activeId={activeId}
    //       onSelect={selectCharacter}
    //       onNew={newCharacter}
    //       onSave={() => saveMutation.mutate()}
    //       onDownload={handleDownload}
    //       saving={saveMutation.isPending}
    //       hasChanges={hasChanges}
    //     />

    //     <motion.div
    //       className="max-w-6xl mx-auto px-4 py-8 space-y-8 relative z-10"
    //       initial={{ opacity: 0, y: 20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.4 }}
    //     >
    //       <CharacterHeader data={formData} onChange={updateForm} />

    //       <StatsBlock
    //         stats={formData.stats}
    //         onChange={(stats) => updateForm({ stats })}
    //       />

    //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    //         <SkillsBlock
    //           skills={formData.skills}
    //           onChange={(skills) => updateForm({ skills })}
    //         />
    //         <CyberwareBlock
    //           cyberware={formData.cyberware}
    //           onChange={(cyberware) => updateForm({ cyberware })}
    //         />
    //       </div>

    //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    //         <WeaponsBlock
    //           weapons={formData.weapons}
    //           onChange={(weapons) => updateForm({ weapons })}
    //         />
    //         <GearBlock
    //           gear={formData.gear}
    //           onChange={(gear) => updateForm({ gear })}
    //         />
    //       </div>

    //       <BackstoryBlock
    //         backstory={formData.backstory}
    //         appearance={formData.appearance}
    //         lifepath_notes={formData.lifepath_notes}
    //         onChange={(field, value) => updateForm({ [field]: value })}
    //       />

    //       {/* Bottom spacer */}
    //       <div className="h-12" />
    //     </motion.div>
    //   </div>
  );
}
