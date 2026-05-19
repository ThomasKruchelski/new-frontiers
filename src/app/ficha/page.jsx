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
    <div className="max-h-screen bg-background relative flex flex-1  justify-center">
      <h1 className="pt-10">Em construção...</h1>
    </div>
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
