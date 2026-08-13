export async function criarFicha() {
  try {
    const resposta = await fetch('/json/ficha.json'); 
    
    if (!resposta.ok) {
      throw new Error('Falha ao carregar o template da ficha.');
    }

    const novaFicha = await resposta.json();

    // 3. Atribui o ID único na nova ficha
    novaFicha.id = crypto.randomUUID();

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