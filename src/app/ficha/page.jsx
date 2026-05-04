"use client";
import Image from "next/image";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();
  const [activeId, setActiveId] = useState(null);
  const [formData, setFormData] = useState({ ...DEFAULT_SHEET });
  const [hasChanges, setHasChanges] = useState(false);
  const initialLoad = useRef(true);

  const { data: characters = [], isLoading } = useQuery({
    queryKey: ["characters"],
    queryFn: () => base44.entities.CharacterSheet.list("-updated_date"),
    initialData: [],
  });

  // Load first character or set new
  useEffect(() => {
    if (!initialLoad.current) return;
    if (characters.length > 0) {
      setActiveId(characters[0].id);
      setFormData(mergeWithDefaults(characters[0]));
      initialLoad.current = false;
    }
  }, [characters]);

  const mergeWithDefaults = (data) => ({
    ...DEFAULT_SHEET,
    ...data,
    stats: { ...DEFAULT_SHEET.stats, ...(data.stats || {}) },
    skills: data.skills || [],
    cyberware: data.cyberware || [],
    weapons: data.weapons || [],
    gear: data.gear || [],
  });

  const selectCharacter = (id) => {
    const char = characters.find((c) => c.id === id);
    if (char) {
      setActiveId(id);
      setFormData(mergeWithDefaults(char));
      setHasChanges(false);
    }
  };

  const newCharacter = () => {
    setActiveId(null);
    setFormData({ ...DEFAULT_SHEET });
    setHasChanges(true);
  };

  const updateForm = useCallback((updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
    setHasChanges(true);
  }, []);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const { id, created_date, updated_date, created_by, ...saveData } =
        formData;
      if (activeId) {
        return base44.entities.CharacterSheet.update(activeId, saveData);
      } else {
        return base44.entities.CharacterSheet.create(saveData);
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["characters"] });
      if (!activeId && result?.id) setActiveId(result.id);
      setHasChanges(false);
      toast.success("Character saved");
    },
  });

  const handleDownload = () => {
    generateCharacterPDF(formData);
    toast.success("PDF downloaded");
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="font-display text-primary neon-text text-xl tracking-widest animate-pulse">
          LOADING...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative scanlines">
      <SheetToolbar
        characters={characters}
        activeId={activeId}
        onSelect={selectCharacter}
        onNew={newCharacter}
        onSave={() => saveMutation.mutate()}
        onDownload={handleDownload}
        saving={saveMutation.isPending}
        hasChanges={hasChanges}
      />

      <motion.div
        className="max-w-6xl mx-auto px-4 py-8 space-y-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <CharacterHeader data={formData} onChange={updateForm} />

        <StatsBlock
          stats={formData.stats}
          onChange={(stats) => updateForm({ stats })}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SkillsBlock
            skills={formData.skills}
            onChange={(skills) => updateForm({ skills })}
          />
          <CyberwareBlock
            cyberware={formData.cyberware}
            onChange={(cyberware) => updateForm({ cyberware })}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <WeaponsBlock
            weapons={formData.weapons}
            onChange={(weapons) => updateForm({ weapons })}
          />
          <GearBlock
            gear={formData.gear}
            onChange={(gear) => updateForm({ gear })}
          />
        </div>

        <BackstoryBlock
          backstory={formData.backstory}
          appearance={formData.appearance}
          lifepath_notes={formData.lifepath_notes}
          onChange={(field, value) => updateForm({ [field]: value })}
        />

        {/* Bottom spacer */}
        <div className="h-12" />
      </motion.div>
    </div>
  );
}
