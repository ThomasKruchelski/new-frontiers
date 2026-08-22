export function calcularVida({ corpo = 0, nivel = 0, vidaAdicional = 0, danos = {} }) {
  const numCorpo = Number(corpo) || 0;
  const numNivel = Number(nivel) || 0;
  const numAdicional = Number(vidaAdicional) || 0;

  const vidaTotal = numCorpo + (numNivel * 10) + numAdicional;

  const danoFisicoTotal = 
    (Number(danos.bruto) || 0) +
    (Number(danos.termico) || 0) +
    (Number(danos.toxico) || 0) +
    (Number(danos.respiratorio) || 0);

  const vidaAtual = vidaTotal - danoFisicoTotal;

  // Regras de estados críticos
  const limiteMorto = -(vidaTotal * 0.5);
  const isMorto = vidaAtual <= limiteMorto;
  const isVidaVermelha = vidaAtual < 0 && !isMorto;

  return {
    vidaTotal,
    danoFisicoTotal,
    vidaAtual,
    limiteMorto,
    isMorto,
    isVidaVermelha
  };
}