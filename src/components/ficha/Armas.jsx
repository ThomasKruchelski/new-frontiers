// src/components/ficha/Armas.js
"use client";

import { useState } from "react";
import { useFicha } from "@/contexts/FichaContext";

const TIPOS_DANO = [
  { chave: "bruto", rotulo: "Bruto", indice: 0 },
  { chave: "igneo", rotulo: "Ígneo", indice: 1 },
  { chave: "toxico", rotulo: "Tóxico", indice: 2 },
  { chave: "pressão", rotulo: "Pressão", indice: 3 },
  { chave: "psiquico", rotulo: "Psíquico", indice: 4 },
];

const ARMA_INICIAL = {
  nome: "",
  tipoDano: [],
  maos: "",
  area: "",
  dadoDano: ["", "", "", "", ""],
  bonusDano: ["", "", "", "", ""],
  distancia: "",
  carga: "",
  municao: "",
  pericia: "",
  especial: "",
};

// Normaliza tipoDano para sempre trabalhar com array (suporta string ou array)
const normalizarTiposDano = (tipoDano) => {
  if (Array.isArray(tipoDano)) return tipoDano;
  if (typeof tipoDano === "string" && tipoDano.trim() !== "") return [tipoDano];
  return [];
};

export default function Armas() {
  const {
    fichaAtual,
    modoEdicao,
    adicionarArma,
    atualizarArma,
    atualizarArrayDanoArma,
    removerArma,
  } = useFicha();

  const [indiceAberto, setIndiceAberto] = useState(null);

  if (!fichaAtual) return null;

  const armas = Array.isArray(fichaAtual.ficha.armas) ? fichaAtual.ficha.armas : [];

  const toggleSanfona = (index) => {
    setIndiceAberto((prev) => (prev === index ? null : index));
  };

  const handleToggleTipoDano = (indexArma, arma, chaveTipo) => {
    const atuais = normalizarTiposDano(arma.tipoDano);
    const jaSelecionado = atuais.includes(chaveTipo);

    const novosTipos = jaSelecionado
      ? atuais.filter((item) => item !== chaveTipo)
      : [...atuais, chaveTipo];

    atualizarArma(indexArma, "tipoDano", novosTipos);
  };

  return (
    <section className="bg-fd-background/80 p-6 rounded-xl border border-fd-primary/20 shadow-sm backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4 border-b border-fd-primary/20 pb-2">
        <h2 className="text-xl font-bold data-[active=true]:text-fd-primary">
          Armas
        </h2>
        <span className="bg-fd-primary/10 text-fd-primary px-3 py-1 rounded-full text-xs font-semibold border border-fd-primary/20">
          Total: {armas.length}
        </span>
      </div>

      {armas.length === 0 && !modoEdicao && (
        <p className="text-fd-primary/50 italic">Nenhuma arma cadastrada.</p>
      )}

      <ul className="flex flex-col gap-3 mb-4">
        {armas.map((arma, index) => {
          const tiposSelecionados = normalizarTiposDano(arma.tipoDano);
          const dadosDano = Array.isArray(arma.dadoDano)
            ? arma.dadoDano
            : ["", "", "", "", ""];
          const bonusDano = Array.isArray(arma.bonusDano)
            ? arma.bonusDano
            : ["", "", "", "", ""];

          return (
            <li
              key={index}
              className="flex flex-col border border-fd-primary/20 rounded-md overflow-hidden"
            >
              {modoEdicao ? (
                /* ================= MODO EDIÇÃO ================= */
                <div className="p-4 flex flex-col gap-4 bg-fd-background/50">
                  {/* Cabeçalho da arma + botão remover */}
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Nome da Arma (opcional)"
                      className="flex-1 bg-transparent border border-fd-primary/30 text-fd-primary rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                      value={arma.nome || ""}
                      onChange={(e) => atualizarArma(index, "nome", e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removerArma(index)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-500/10 p-1.5 rounded-md transition-colors"
                      title="Remover arma"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Seleção de múltiplos Tipos de Dano */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-semibold text-fd-primary/70">
                      Tipos de Dano (pode selecionar mais de um)
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {TIPOS_DANO.map((tipo) => {
                        const ativo = tiposSelecionados.includes(tipo.chave);
                        return (
                          <button
                            key={tipo.chave}
                            type="button"
                            onClick={() => handleToggleTipoDano(index, arma, tipo.chave)}
                            className={`px-3 py-1 rounded-md text-xs font-semibold border transition-colors ${
                              ativo
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-transparent text-fd-primary/80 border-fd-primary/30 hover:bg-fd-primary/10"
                            }`}
                          >
                            {tipo.rotulo}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Inputs simples de Dado de Dano e Bônus de Dano por Tipo Selecionado */}
                  {tiposSelecionados.length > 0 && (
                    <div className="flex flex-col gap-2 bg-fd-primary/5 p-3 rounded-lg border border-fd-primary/15">
                      <span className="text-xs font-bold text-fd-primary/80">
                        Dano por Tipo Selecionado
                      </span>

                      {TIPOS_DANO.filter((t) => tiposSelecionados.includes(t.chave)).map(
                        (tipo) => (
                          <div
                            key={tipo.chave}
                            className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center"
                          >
                            <span className="text-xs font-semibold text-fd-primary capitalize">
                              {tipo.rotulo} (idx {tipo.indice})
                            </span>

                            <label className="flex flex-col text-[11px] text-fd-primary/60">
                              Dado de Dano
                              <input
                                type="text"
                                placeholder="Ex: 1d8"
                                className="bg-transparent border border-fd-primary/30 text-fd-primary rounded-md px-2.5 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={dadosDano[tipo.indice] ?? ""}
                                onChange={(e) =>
                                  atualizarArrayDanoArma(
                                    index,
                                    "dadoDano",
                                    tipo.indice,
                                    e.target.value
                                  )
                                }
                              />
                            </label>

                            <label className="flex flex-col text-[11px] text-fd-primary/60">
                              Bônus de Dano
                              <input
                                type="text"
                                placeholder="Ex: +3 ou 2"
                                className="bg-transparent border border-fd-primary/30 text-fd-primary rounded-md px-2.5 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={bonusDano[tipo.indice] ?? ""}
                                onChange={(e) =>
                                  atualizarArrayDanoArma(
                                    index,
                                    "bonusDano",
                                    tipo.indice,
                                    e.target.value
                                  )
                                }
                              />
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  )}

                  {/* Demais campos da arma */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <label className="flex flex-col text-xs text-fd-primary/70 gap-1">
                      Mãos
                      <input
                        type="text"
                        placeholder="Ex: 1 mão / 2 mãos"
                        className="bg-transparent border border-fd-primary/30 text-fd-primary rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={arma.maos || ""}
                        onChange={(e) => atualizarArma(index, "maos", e.target.value)}
                      />
                    </label>

                    <label className="flex flex-col text-xs text-fd-primary/70 gap-1">
                      Área
                      <input
                        type="text"
                        placeholder="Ex: Alvo único / Cone 3m"
                        className="bg-transparent border border-fd-primary/30 text-fd-primary rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={arma.area || ""}
                        onChange={(e) => atualizarArma(index, "area", e.target.value)}
                      />
                    </label>

                    <label className="flex flex-col text-xs text-fd-primary/70 gap-1">
                      Distância
                      <input
                        type="text"
                        placeholder="Ex: Corpo a corpo / 30m"
                        className="bg-transparent border border-fd-primary/30 text-fd-primary rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={arma.distancia || ""}
                        onChange={(e) => atualizarArma(index, "distancia", e.target.value)}
                      />
                    </label>

                    <label className="flex flex-col text-xs text-fd-primary/70 gap-1">
                      Carga
                      <input
                        type="text"
                        placeholder="Ex: 2"
                        className="bg-transparent border border-fd-primary/30 text-fd-primary rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={arma.carga || ""}
                        onChange={(e) => atualizarArma(index, "carga", e.target.value)}
                      />
                    </label>

                    <label className="flex flex-col text-xs text-fd-primary/70 gap-1">
                      Munição
                      <input
                        type="text"
                        placeholder="Ex: 12 / —"
                        className="bg-transparent border border-fd-primary/30 text-fd-primary rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={arma.municao || ""}
                        onChange={(e) => atualizarArma(index, "municao", e.target.value)}
                      />
                    </label>

                    <label className="flex flex-col text-xs text-fd-primary/70 gap-1">
                      Perícia
                      <input
                        type="text"
                        placeholder="Ex: Luta / Pontaria"
                        className="bg-transparent border border-fd-primary/30 text-fd-primary rounded-md px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={arma.pericia || ""}
                        onChange={(e) => atualizarArma(index, "pericia", e.target.value)}
                      />
                    </label>
                  </div>

                  <label className="flex flex-col text-xs text-fd-primary/70 gap-1">
                    Especial
                    <textarea
                      rows={2}
                      placeholder="Propriedades especiais, crítico, efeitos..."
                      className="w-full bg-transparent border border-fd-primary/30 text-fd-primary rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      value={arma.especial || ""}
                      onChange={(e) => atualizarArma(index, "especial", e.target.value)}
                    />
                  </label>
                </div>
              ) : (
                /* ================= MODO VISUALIZAÇÃO (SANFONA) ================= */
                <>
                  <button
                    type="button"
                    onClick={() => toggleSanfona(index)}
                    className="w-full text-left p-3 flex justify-between items-center bg-fd-background/80 hover:bg-fd-primary/5 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 flex-1 pr-4">
                      <span className="font-semibold text-fd-primary">
                        {arma.nome || `Arma #${index + 1}`}
                      </span>
                      <span className="text-xs text-fd-primary/60">
                        {tiposSelecionados.length > 0
                          ? tiposSelecionados.join(", ")
                          : "Sem tipo de dano"}
                      </span>
                      {arma.pericia && (
                        <span className="text-xs bg-fd-primary/10 text-fd-primary px-2 py-0.5 rounded w-fit">
                          {arma.pericia}
                        </span>
                      )}
                    </div>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 text-fd-primary/60 transform transition-transform duration-200 ${
                        indiceAberto === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {indiceAberto === index && (
                    <div className="p-3 border-t border-fd-primary/10 text-fd-primary/80 bg-fd-background/40 flex flex-col gap-3 text-sm">
                      {/* Danos configurados */}
                      {tiposSelecionados.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {TIPOS_DANO.filter((t) =>
                            tiposSelecionados.includes(t.chave)
                          ).map((tipo) => (
                            <div
                              key={tipo.chave}
                              className="bg-fd-primary/5 border border-fd-primary/20 rounded-md px-2.5 py-1 text-xs"
                            >
                              <span className="font-bold capitalize">{tipo.rotulo}: </span>
                              <span>{dadosDano[tipo.indice] || "—"}</span>
                              {bonusDano[tipo.indice] && (
                                <span className="text-fd-primary/70">
                                  {" "}
                                  (+{bonusDano[tipo.indice]})
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                        <div>
                          <span className="font-semibold text-fd-primary/60">Mãos: </span>
                          <span>{arma.maos || "—"}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-fd-primary/60">Área: </span>
                          <span>{arma.area || "—"}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-fd-primary/60">Distância: </span>
                          <span>{arma.distancia || "—"}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-fd-primary/60">Carga: </span>
                          <span>{arma.carga || "—"}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-fd-primary/60">Munição: </span>
                          <span>{arma.municao || "—"}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-fd-primary/60">Perícia: </span>
                          <span>{arma.pericia || "—"}</span>
                        </div>
                      </div>

                      {arma.especial && (
                        <div className="pt-2 border-t border-fd-primary/10">
                          <span className="font-semibold text-xs text-fd-primary/70 block mb-0.5">
                            Especial:
                          </span>
                          <p className="whitespace-pre-wrap">{arma.especial}</p>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ul>

      {modoEdicao && (
        <button
          type="button"
          onClick={() =>
            adicionarArma({
              ...ARMA_INICIAL,
              tipoDano: [],
              dadoDano: ["", "", "", "", ""],
              bonusDano: ["", "", "", "", ""],
            })
          }
          className="w-full py-2 border-2 border-dashed border-fd-primary/30 text-fd-primary/70 rounded-md hover:border-fd-primary/60 hover:text-fd-primary transition-colors font-medium"
        >
          + Adicionar Arma
        </button>
      )}
    </section>
  );
}