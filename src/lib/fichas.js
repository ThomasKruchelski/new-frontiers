export async function criarFicha(tipo) {
  try {

    let fetchURL = ""

    if (tipo === 'personagem') {
      fetchURL = "json/ficha-personagem.json"
    } else if (tipo === 'npc') {
      fetchURL = "json/ficha-npc.json"
    }

    const resposta = await fetch(fetchURL);

    if (!resposta.ok) {
      throw new Error('Falha ao carregar o template da ficha.');
    }

    const novaFicha = await resposta.json();

    // 3. Atribui o ID único na nova ficha
    novaFicha.id = crypto.randomUUID();
    novaFicha.tipo = tipo

    // 4. Recupera as fichas antigas do localStorage
    const fichasSalvas = localStorage.getItem('fichas');
    let arrayDeFichas = [];

    if (fichasSalvas) {
      arrayDeFichas = JSON.parse(fichasSalvas);
    }

    // 5. Salva a nova ficha no array e devolve pro localStorage
    arrayDeFichas.push(novaFicha);
    localStorage.setItem('fichas', JSON.stringify(arrayDeFichas));

    return novaFicha;

  } catch (erro) {
    console.error("Erro ao criar a ficha:", erro);
    return null;
  }
}