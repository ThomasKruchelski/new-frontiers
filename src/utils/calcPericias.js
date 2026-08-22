export function calcularPericiasFinais({ periciasAtuais = [], atributosFinais = {}, basePericias = [] }) {
  if (!periciasAtuais.length || !basePericias.length) return [];

  return periciasAtuais.flatMap((pericia, index) => {
    const regra = basePericias.find(b => b.nome.toLowerCase() === pericia.nome.toLowerCase()) || {};

    const int = Number(pericia.pontosInt) || 0;
    const edu = Number(pericia.pontosEdu) || 0;
    const exp = Number(pericia.pontosExp) || 0;
    const custom = Number(pericia.valorCustom) || 0;
    const vantagem = Number(pericia.vantagem) || 0;
    
    const pontosInvestidos = int + edu + exp + custom;

    if (Array.isArray(regra.atributo)) {
      return regra.atributo.map(attr => {
        const valorBase = (Number(atributosFinais[attr]) || 0) * (Number(regra.multiplicador) || 1);
        const total = valorBase + pontosInvestidos;
        
        return {
          ...pericia,
          nomeExibicao: `${pericia.nome} (${attr})`,
          chaveUnica: `${pericia.nome}-${attr}`,
          originalIndex: index,
          valorBase,
          vantagem,
          normal: total,
          dificil: Math.floor(total / 2),
          extremo: Math.floor(total / 5)
        };
      });
    } 
    else {
      let valorBase = 0;
      if (regra.atributo && atributosFinais[regra.atributo] !== undefined) {
        valorBase = (Number(atributosFinais[regra.atributo]) || 0) * (Number(regra.multiplicador) || 1);
      } else if (regra.valorFixo !== undefined) {
        valorBase = Number(regra.valorFixo);
      }

      const total = valorBase + pontosInvestidos;
      
      return [{
        ...pericia,
        nomeExibicao: pericia.nome,
        chaveUnica: pericia.nome,
        originalIndex: index,
        valorBase,
        vantagem,
        normal: total,
        dificil: Math.floor(total / 2),
        extremo: Math.floor(total / 5)
      }];
    }
  });
}