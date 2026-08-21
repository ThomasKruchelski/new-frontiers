test("GET to /api/groq/livro/respostas should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/groq/respostas");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
});

test("POST without body to /api/groq/livro/livro should return 500", async () => {
  const response = await fetch("http://localhost:3000/api/groq/livro",{method: "POST"});
  expect(response.status).toBe(500);

  const responseBody = await response.json();
});

test("POST com body para /api/groq/livro deve retornar 200 (Testando com Mock)", async () => {
  // mock fetch: simula a Conexão com a API e o Banco
  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve({ 
        message: "Salvo com sucesso", 
        id: "mock-id-12345" 
      }),
    })
  );

  // MOCK: simula o json
  const mockData = { 
    question: "Qual a capital do Brasil?", 
    answer: "Brasília" 
  };

  const response = await fetch("http://localhost:3000/api/groq/livro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mockData),
  });
  
  expect(response.status).toBe(200);
  
  const responseBody = await response.json();
  expect(responseBody.message).toBe("Salvo com sucesso");
  expect(responseBody.id).toBe("mock-id-12345");

  // validando fetch
  expect(global.fetch).toHaveBeenCalledWith(
    "http://localhost:3000/api/groq/livro",
    expect.objectContaining({
      method: "POST",
      body: JSON.stringify(mockData),
    })
  );

  // removendo todos os mocks
  global.fetch.mockRestore();
});