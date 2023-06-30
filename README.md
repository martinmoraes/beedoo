# Teste Dev Senior
<img src="./imgs/logo-beedoo.png" alt="Beedoo logo">

## Instruções:
  - Crie um repositório público em sua conta do github para este projeto;
  - Desenvolva o projeto com a stack de sua preferência (Nós utilizamos: NodeJS, PHP e Python);
  - O armazenamento dos dados pode ser feito com o banco de dados de sua preferência;
  - Utilize docker para facilitar a execução do projeto;
  - Descreva no README.md do projeto como executar o mesmo e os testes;
  - Justifique no README.md as decisões técnicas tomadas, como arquitetura, bibliotecas, etc;
  - Ao finalizar o teste, nos envie a URL do repositório e aguarde a avaliação;

## O projeto está dividido em 3 etapas:
  - Etapa 1: Código, boas práticas e testes
    - Criar uma rota POST, onde usuários (em anonimato) podem postar mensagens de texto de no máximo 300 caracteres;
    - Criar uma rota GET, que por padrão liste as últimas 10 mensagens, possibilite paginação, e pesquisa por palavras chave;
  - Etapa 2: Análise de requisitos e planejamento técnico
    - No futuro queremos permitir que os usuários possam adicionar comentários as mensagens;
    - Descreva o que precisa fazer para desenvolver essa nova funcionalidade e possíveis desafios técnicos;
    - Descreva quais perguntas gostaria de fazer para o product owner, para esclarecer as regras de negócio;
  - Etapa 3: Auto avaliação
    - Quais melhorias poderiam ser empregadas ao projeto se tivesse mais tempo;
    - Como podemos escalar esse projeto se tivermos um grande volume de acessos e dados;

## Notas
 - A realização do teste não garante contratação;
 - Ainda que o teste seja entregue sem a realização de todas as etapas, o teste será avaliado; 😊
 - As Etapas 2 e 3 devem estar no README.md do projeto;
 - Você tem total liberdade para utilizar e instalar quaisquer bibliotecas que desejar;
 - Se não puder entregar via URL do repositório, nos envie o projeto compactado, com o arquivo .git, para que possamos avaliar o histórico de commits;

### Boa sorte


## Relacional versus Dados NoSQL / O Teorema de CAP

A principal diferença entre o modelo de dados não relacional e o tradicional é que o modelo não relacional é projetado para processar grandes quantidades de dados em um segundo, com requisitos de consistência relativamente baixos. 


https://learn.microsoft.com/pt-br/dotnet/architecture/cloud-native/relational-vs-nosql-data

SQL vs NoSQL: A Performance Comparison
https://www.cs.rochester.edu/courses/261/fall2017/termpaper/submissions/06/Paper.pdf

SQL vs NoSQL: A Performance Comparison
https://restapp.io/blog/sql-vs-nosql-a-performance-comparison/



SQL databases are vertically scalable, while NoSQL databases are horizontally scalable. 


## Perguntas

- Qual payload (Json/ string) de request (POST) e response na rota de create message?
- Ao persistir a mensagem, além da mensagem, persister outros dados (Ex. createdAt)?
- Ao listar as mensagens ordenar por padrão de alguma forma?
- A busca por "palavras chave" seriam separadas por espaço? 

## Justificativa 

- noSQL: Tamanho da mensagem e performance 
