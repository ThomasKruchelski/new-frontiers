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


