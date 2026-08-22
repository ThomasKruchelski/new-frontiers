import { calcularVida, calcularMente } from '@/utils/calculosSaude';

describe('Cálculo de Pontos de Vida (HP)', () => {

  test('deve calcular a vida total corretamente com base no corpo, nível e bônus adicional', () => {
    const resultado = calcularVida({
      corpo: 15,
      nivel: 2,
      vidaAdicional: 5,
      danos: {}
    });

    // 15 (corpo) + (2 * 10) + 5 (adicional) = 40
    expect(resultado.vidaTotal).toBe(40);
    expect(resultado.vidaAtual).toBe(40);
    expect(resultado.isMorto).toBe(false);
    expect(resultado.isVidaVermelha).toBe(false);
  });

  test('deve abater os danos físicos corretamente da vida atual', () => {
    const resultado = calcularVida({
      corpo: 10,
      nivel: 1,
      vidaAdicional: 0,
      danos: {
        bruto: 5,
        termico: 3,
        toxico: 2,
        respiratorio: 0
      }
    });

    // Vida total: 10 + 10 = 20
    // Danos: 5 + 3 + 2 = 10
    expect(resultado.vidaTotal).toBe(20);
    expect(resultado.danoFisicoTotal).toBe(10);
    expect(resultado.vidaAtual).toBe(10);
  });

  test('deve ativar isVidaVermelha quando a vida for negativa, mas acima do limite de morte', () => {
    const resultado = calcularVida({
      corpo: 10,
      nivel: 1, // Vida total = 20
      danos: { bruto: 29 } // Vida atual = -5 (Limite de morte é -10)
    });

    expect(resultado.vidaAtual).toBe(-9);
    expect(resultado.isVidaVermelha).toBe(true);
    expect(resultado.isMorto).toBe(false);
  });

  test('deve ativar isMorto quando a vida atingir ou ultrapassar -150% da vida total', () => {
    const resultado = calcularVida({
      corpo: 10,
      nivel: 1, // Vida total = 20 | Limite de morte: -(20 * 1.5) = -30
      danos: { bruto: 30 } // Vida atual = -30
    });

    expect(resultado.vidaAtual).toBe(-10);
    expect(resultado.isMorto).toBe(true);
    expect(resultado.isVidaVermelha).toBe(false);
  });

  test('deve tratar entradas ausentes ou strings numéricas sem quebrar', () => {
    const resultado = calcularVida({
      corpo: "12",
      nivel: "1",
      vidaAdicional: "7",
      danos: { bruto: "5" }
    });

    // 12 + 10 + 7 = 22; Dano = 5; Atual = 24
    expect(resultado.vidaTotal).toBe(29);
    expect(resultado.vidaAtual).toBe(24);
  });

});

describe('Cálculo de Pontos de Mente (SAN)', () => {

  test('deve calcular a mente total e atual corretamente com a regra do + 5', () => {
    const resultado = calcularMente({
      persona: 10,
      menteAdicional: 2,
      danoPsiquico: 4
    });

    // Mente Total: 10 (persona) + 2 (adicional) + 5 (bônus fixo) = 17
    expect(resultado.menteTotal).toBe(17);
    // Mente Atual: 17 - 4 (dano psíquico) = 13
    expect(resultado.menteAtual).toBe(13);
    expect(resultado.isColapso).toBe(false);
  });

  test('deve ativar isColapso quando a mente atingir o limite exato negativo (-menteTotal)', () => {
    const resultado = calcularMente({
      persona: 10,
      menteAdicional: 0,
      danoPsiquico: 30
      // Total: 10 + 5 = 15. Limite de Colapso = -15
      // Atual: 15 - 30 = -15
    });

    expect(resultado.menteAtual).toBe(-15);
    expect(resultado.limiteColapso).toBe(-15);
    expect(resultado.isColapso).toBe(true);
  });

  test('deve tratar entradas em formato de string ou ausentes sem quebrar', () => {
    const resultado = calcularMente({
      persona: "8",
      menteAdicional: "",
      danoPsiquico: "3"
    });

    // Total: 8 + 0 + 5 = 13
    // Atual: 13 - 3 = 10
    expect(resultado.menteTotal).toBe(13);
    expect(resultado.menteAtual).toBe(10);
  });

});