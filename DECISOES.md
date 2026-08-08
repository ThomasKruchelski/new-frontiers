Esse arquivo detalha os motivos da escolha da Stack utilizada nesse projeto e os aprendizados obtidos na conclusão desse projeto.

## Contexto do projeto

Boa parte das tecnologias (principalmente do back e front end) foram escolhidas por conta da pré-existencia desse projeto, adaptado para desenvolver as habilidades propostas pela disciplina.

A documentação é de um livro de TTRPG (Tabletop Role playing game) que retrata uma distopia futurista do planeta terra. Na documentação estão presentes regras, termos e histórias todos armazenados em arquivos .mdx que são coletados pela IA que sintetiza e responde as perguntas solicitadas pelo usuário.

## Tecnologias

Iniciei a aplicação com React biblioteca JavaScript robusta com enrome gama de ferramentas, possibilita a utilização do Next.js, framework utiliza arquivos como criação de rota, e tambem o Fumadocks que expande a funcionalidade das rotas para arquivos .mdx para criar a documentação.

Para a IA escolhi o modelo llama-3.3-70b-versatile da Groq, com custo acessivel capaz de receber grandes requisições, crucial para o funcionamento do projeto.

O DB foi feito com o firestore, banco NoSQL de facil implementação e rápido carregamento. Para os testes foi utilizado Jest junto ao GithubActions para validação e deploy.

## Considerações finais

Foi bem desafiador criar a função de leitura de documentos com a IA, mas graças ao 'fs' consegui capturar o conteúdo dos arquivos e enviar para a IA da groq que aceita requisições bem pesadas como essa. Ainda há bastante espaço para otimização da lógica de leitura dos documentos, mas já foi possivel criar uma demonstração funcional da solução do problema.