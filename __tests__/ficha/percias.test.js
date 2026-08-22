import { calcularPericiasFinais } from '@/utils/calcPericias';

describe('Cálculo de Perícias', () => {
  
  const mockAtributos = {
    destreza: 10,
    corpo: 15
  };

  const mockBasePericias = [
    { nome: "acrobacia", atributo: "destreza", multiplicador: 5 },
    { nome: "luta", atributo: ["destreza", "corpo"], multiplicador: 4 },
    { nome: "dirigir-automovel", valorFixo: 20 }
  ];

  test('deve calcular uma perícia normal baseada em um único atributo', () => {
    const periciasAtuais = [{ nome: "acrobacia", pontosInt: 5, pontosExp: 5 }]; // Investiu 10 pontos
    
    const resultado = calcularPericiasFinais({
      periciasAtuais,
      atributosFinais: mockAtributos,
      basePericias: mockBasePericias
    });

    expect(resultado.length).toBe(1);
    
    // Destreza(10) * Multiplicador(5) = Base 50
    // Base 50 + Pontos Investidos (10) = 60
    expect(resultado[0].nomeExibicao).toBe("acrobacia");
    expect(resultado[0].valorBase).toBe(50);

    expect(resultado[0].normal).toBe(60);
    expect(resultado[0].dificil).toBe(30); // 30 / 2
    expect(resultado[0].extremo).toBe(12);  // 30 / 5
  });

  test('deve calcular uma perícia com valor fixo corretamente', () => {
    const periciasAtuais = [{ nome: "dirigir-automovel", pontosEdu: 15 }];
    
    const resultado = calcularPericiasFinais({
      periciasAtuais,
      atributosFinais: mockAtributos,
      basePericias: mockBasePericias
    });

    // Fixo (20) + Investido (15) = 35
    expect(resultado[0].valorBase).toBe(20);
    expect(resultado[0].normal).toBe(35);
  });

  test('deve duplicar a perícia "luta" e calcular bases diferentes (Corpo e Destreza)', () => {
    const periciasAtuais = [{ nome: "luta", pontosInt: 5 }]; 
    
    const resultado = calcularPericiasFinais({
      periciasAtuais,
      atributosFinais: mockAtributos,
      basePericias: mockBasePericias
    });

    // Deve retornar 2 itens por causa do flatMap
    expect(resultado.length).toBe(2);

    // Testando a Luta (Destreza)
    expect(resultado[0].nomeExibicao).toBe("luta (destreza)");
    expect(resultado[0].chaveUnica).toBe("luta-destreza");
    // Base Destreza (10*4 = 40) + Investido (5) = 45
    expect(resultado[0].normal).toBe(45);
    expect(resultado[0].dificil).toBe(22); 
    expect(resultado[0].extremo).toBe(9);

    // Testando a Luta (Corpo)
    expect(resultado[1].nomeExibicao).toBe("luta (corpo)");
    expect(resultado[1].chaveUnica).toBe("luta-corpo");
    // Base Corpo (15*4 = 60) + Investido (5) = 65
    expect(resultado[1].normal).toBe(65);
    expect(resultado[1].dificil).toBe(32);
    expect(resultado[1].extremo).toBe(13);
  });

  test('deve retornar um array vazio se as dependências (config ou perícias) não existirem', () => {
    const resultadoSemFicha = calcularPericiasFinais({ basePericias: mockBasePericias });
    const resultadoSemJSON = calcularPericiasFinais({ periciasAtuais: [{ nome: "luta" }] });

    expect(resultadoSemFicha).toEqual([]);
    expect(resultadoSemJSON).toEqual([]);
  });

});