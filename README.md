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


<br>

# Arquitetura

A parte central do sistema é composta por: Controller, Services, Repository e HTTP Response.

- **Controller** - Implementa duas (2) rotas para os respectivos endpoint, sendo um POST e um GET. Quando o HTTP server é inicializado as rotas que estão no(s) controlle(s) são incorporadas.
- **Services** - Implementa as regras de negócio para cada rota. Recebe por injeção de dependência o repository e o HTTP Response.
- **Repository** - Implementa as operações com o banco de dados e utiliza model para cada coleção. É passado do controller para os services fazendo injeção de dependência.
- **HTTP Response** - É responsável por responder as requisições HTTP dos usuários. É passado do controller para os services fazendo injeção de dependência.

A imagem a seguir exemplifica as relações entre as respectivas partes do sistema.

![APP Message](./imgs/arquitetura.png)

## Containers

Adotou-se constainer visando portabilidade, consistência, escalabilidade, isolamento e outros benefícios. 
Eles fornecem um ambiente em que o aplicativo funcione da mesma forma, independentemente de onde esteja sendo executado.
O projeto é apresentado em dois containers Docker e gerenciado pelo Docker-compose:

- Container 1: Contem o MongoDB.
- Container 2: A aplicação implementada em NodeJS.

## Descrição dos EndPoints


### POST /message

Insere uma menssagem. O payload a ser enviado no body é um objeto JSON com a propriedade "message". Exemplo asseguir.

```
{
    "message": "new message"
}
```

### GET /message
Nesta solicitação, recebe uma lista das dez (10) últimas mensagens.
Utilizando query string pode paginar e filtrar por palavras.

- **page**: É um valor inteiro que indica o número da página de menssagens desejada. Este parâmetro não é obrigatório.
- **words**: Indica a(s) palavra(s) de busca. Pode ser informado uma ou mais palavras. Este parâmetro não é obrigatório. Ao informar uma ou mais palavras o retorno será com as mensagens que contenham no mínimo uma das palavras fornecidas.

No exemplo a seguir temos uma query string com **page** e **words**

```
/message?page=1&words=message
```


<br>

# Tecnologias utilizadas

## Qualidade de Código

- **prettier**: Adotamos para a formatação de código que ajuda a manter a consistência e a legibilidade do código-fonte.
- **eslint**: Adotamos para fazer a análise estática de código. Ela ajuda a identificar problemas e erros comuns no código, além de aplicar regras de estilo e boas práticas de programação.
- **husky**: Adotamos para que no pre-commit execute os scripts:
  - Neste projeto, antes do commit, está sendo checado:
    - O lint para o arquivos que estão em stage.
    - E roda todos os testes.
- **lint-stageg**: Permite executar linters de código apenas nos arquivos modificados em um determinado commit.
- **test coverage**: É uma métrica usada para medir a extensão em que o código de um programa é testado pelos casos de teste. Ele indica a porcentagem de código que é executado durante a execução dos testes automatizados. Neste projeto a cobertura de testes está em 100%.

## Regra de negocio

- **decimal.js**: Biblioteca JavaScript que oferece suporte a operações matemáticas precisas e manipulação de números decimais. Ela foi projetada para superar as limitações de aritmética de ponto flutuante do JavaScript padrão, que pode resultar em imprecisões em cálculos envolvendo números decimais.
- **node-input-validator**: Biblioteca para validação de entrada de dados em aplicativos Node.js. Ela fornece uma maneira simples e flexível de validar e sanitizar dados.

## Outras tecnologias

- **Express**: Framework para desenvolvimento de aplicações web em Node.js. Ele fornece uma camada de abstração sobre o servidor HTTP do Node.js.
- **MongoDB**: Banco de dados orientado a documentos, classificado como um banco de dados NoSQL (não relacional). Ele foi projetado para armazenar e gerenciar grandes volumes de dados de forma eficiente, fornecendo alta escalabilidade e desempenho.
- **Mongoose**: Biblioteca de modelagem de objetos do MongoDB para aplicativos Node.js. Ela fornece uma camada de abstração sobre o driver nativo do MongoDB, facilitando a interação com o banco de dados e a definição de esquemas de dados.
- **Docker-compose**: Ferramenta que permite definir e gerenciar vários contêineres Docker como uma única aplicação. Com ele, você pode criar, configurar e executar aplicativos multi-container.
- **NodeJS**: Ambiente de tempo de execução de código aberto baseado no motor JavaScript V8 do Google Chrome. Ele permite que você execute JavaScript no lado do servidor.
- **NPM**: Node Package Manager é o gerenciador de pacotes padrão para o ecossistema do Node.js. Ele permite que os desenvolvedores instalem, gerenciem e compartilhem pacotes de código reutilizáveis ​​(módulos) para seus projetos.
- **Jest**: Framework de teste de código aberto para JavaScript, projetado principalmente para testar aplicativos e bibliotecas do Node.js.
- **winston**: Biblioteca de registro (logging) para o Node.js. Ela fornece uma interface flexível e extensível para registrar mensagens e eventos nos aplicativos Node.js.
- **Nodemon**: É uma ferramenta muito que agiliza o desenvolvimento, pois economiza tempo e esforço ao automatizar o processo de reinicialização do servidor sempre que necessário.

<br>

# Instalação

Passo 1: Clone o projeto. Na sua pasta de projetos execute o seguinte comando.

```
git clone https://github.com/martinmoraes/sfc.git
```

Passo 2: Instale as dependências. Na pasta raiz do projeto, execute os seguintes comando.

```
cd sfc
npm install
```

## Execução em modo de produção

Passo 1: Iniciar a aplicação - Ainda na pasta raiz do projeto execute o comando abaixo.

Obs.:

- É necessário ter instalado o Docker e Docker-compose.
- Certifique-se que nenhum serviço ou container esteja utilizando as portas 3001 e 27017.
- Se estiver executando o Docker da seção "Execução em modo desenvolvimento", execute o passo 5 da referida seção.

```
docker-compose up -d
```

Passo 2: Parar a aplicação - Para parar a aplicação, estando na pasta raiz do projeto execute o seguinte comando.

```
docker-compose stop
```

## Execução em modo desenvolvimento

Passo 1: Criar o arquivo .env, na raiz do projeto, com o seguinte conteudo

P.S.: A variável de ambiente "LOG_DIR" deve conter o path completo para a pasta "log".

```
APP_PORT=3001

MONGO_HOST=mongodb://admin:admin@localhost:27017/?authMechanism=DEFAULT
MONGO_DATABASE=mttechne
MONGO_POOLSIZE=5

LOG_DIR=~/log
```

Passo 2: MongoDB em Docker - Para executar o MongoDB em um Docker, execute o comando abaixo.

Obs.:

- É necessário ter instalado o Docker e Docker-compose.
- Certifique-se que nenhum serviço ou container esteja utilizando as portas 3001 e 27017.
- Se estiver executando o Docker-compose da seção "Execução em modo de produção" execute o "Passo 2: Parar a aplicação", da referida seção.

```
docker run -d --rm --name mongodb \
	-p 27017:27017 \
	-v data:/data/db \
	-e MONGO_INITDB_ROOT_USERNAME=admin \
	-e MONGO_INITDB_ROOT_PASSWORD=admin \
	mongo:6.0.6
```

Passo 3: Rodar o projeto - Certifique-se de estar na pasta raiz do projeto e execute o seguinte comando.

```
npm run start:dev
```

Passo 4: Parar a aplicação - Para parar a aplicação execute o seguinte comando no console em que estiver rodando a aplicação (nodemon).

```
Ctrl + C

ou

Command + C
```

Passo 5: Parar o container - Para parar o container do MongoDB execute o seguinte comando.

```
docker stop mongodb
```

## Postman: Testar os endpoint

Pode ser utilizado o aplicativo [Postman](https://www.postman.com/) para fazer requisições nos endpoints.
Na raiz do projeto, na pasta "postman" tem os arquivos que podem ser importados no Postman. Importe o environment e collection.

<br>

# Testes

Os testes de unidade são uma prática de desenvolvimento de software em que unidades individuais de código são testadas para verificar se funcionam conforme o esperado.

- Para rodar todos os teste, certifique-se de estar na raiz do projeto e execute o seguinte comando:

```
npm run test
```

<br>

# Comandos

## Linter

Executa o ESLint e faz alterações nos arquivos. Estando na raiz do projeto execute o seguinte comando:

```
npm run lint:fix
```

## Prettier

Formata os arquivos JavaScript (com extensão .js) no diretório 'src' e em todos dentro dele. Estando na raiz do projeto execute o seguinte comando:

```
npm run format
```

## Coverage

Verifica a cobertura de teste, Estando na raiz do projeto execute o seguinte comando:

```
npm run test:coverage
```










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
