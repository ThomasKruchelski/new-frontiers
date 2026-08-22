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

export function calcularMente({ persona = 0, menteAdicional = 0, danoPsiquico = 0 }) {
  const numPersona = Number(persona) || 0;
  const numAdicional = Number(menteAdicional) || 0;
  const numDano = Number(danoPsiquico) || 0;

  // Matemática exata que você pediu (com o + 5 fixo)
  const menteTotal = numPersona + numAdicional + 5;
  const menteAtual = menteTotal - numDano;

  const limiteColapso = -menteTotal;
  const isColapso = menteAtual <= limiteColapso;

  return {
    menteTotal,
    menteAtual,
    limiteColapso,
    isColapso
  };
}