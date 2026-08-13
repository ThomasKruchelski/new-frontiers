export default async function ProdutoDetalhe({ params }) {
  // Aguarda a resolução dos parâmetros da rota
  const { id } = await params;

  return (
    <main style={{ padding: '20px' }}>
      <h1>Ficha ID</h1>
      <p>O ID da ficha atual é: <strong>{id}</strong></p>
    </main>
  );
}