import React from 'react';

const efeitos = [
  { keyword: 'Vandalismo I', descricao: 'a arma causa +4 de dano a estruturas e objetos' },
  { keyword: 'Vandalismo II', descricao: 'a arma causa +8 de dano a estruturas e objetos' },
  { keyword: 'Vandalismo III', descricao: 'a arma causa +12 de dano a estruturas e objetos' },
  { keyword: 'Agil', descricao: 'O portador pode escolher usar o atributo de CORPO ou DESTREZA para somar ao Bônus de dano' },
  { keyword: 'Arremessável', descricao: 'Você pode fazer um ataque a distância arremessando a arma, faça um teste Luta(DEST) se passar você acerta o alvo.' },
  { keyword: 'Baixo recuo', descricao: 'Disparar uma segunda vez no turno com essa arma não gera desvantagem no teste' },
  { keyword: 'Recarga lenta I', descricao: 'Para recarregar essa arma é necessário usar uma ação bônus invés de uma ação livre' },
  { keyword: 'Recarga lenta II', descricao: 'Para recarregar essa arma é necessário usar uma ação padrão invés de uma ação livre' },
  { keyword: 'Disparo unico', descricao: 'Disparar com essa arma é uma ação padrão invés de uma ação bônus' },
  { keyword: 'Arma Pesada', descricao: 'Se o personagem se mover no mesmo turno que disparar com essa arma ele terá desvantagem no disparo' },
  { keyword: 'Marcial', descricao: 'Você pode usar bônus de artes marciais usando essa arma' },
  { keyword: 'Explosão', descricao: 'Alvos podem fazer um teste de reflexo para reduzir o dano a metade' },
  // Adicione mais efeitos conforme necessário
];

const KeywordEffectbox = ({ keyword }) => {
  const efeitoEncontrado = efeitos.find(efeito => efeito.keyword === keyword);

  if (!efeitoEncontrado) return null;

  return (
    <div className="efeito-box">
      {efeitoEncontrado.keyword}: {efeitoEncontrado.descricao}
    </div>
  );
};

export default KeywordEffectbox;