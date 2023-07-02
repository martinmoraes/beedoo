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

# Etapa 1: Código, boas práticas e testes

# 1.1 - Arquitetura

A parte central do sistema é composta por: Controller, Services, Repository e HTTP Response.

- **Controller** - Implementa duas (2) rotas para os respectivos endpoint, sendo um POST e um GET. Quando o HTTP server é inicializado as rotas que estão no(s) controlle(s) são incorporadas.
- **Services** - Implementa as regras de negócio para cada rota. Recebe por injeção de dependência o repository e o HTTP Response.
- **Repository** - Implementa as operações com o banco de dados e utiliza model para cada coleção. É passado do controller para os services fazendo injeção de dependência.
- **HTTP Response** - É responsável por responder as requisições HTTP dos usuários. É passado do controller para os services fazendo injeção de dependência.

<br>

## Práticas adotadas
- Aplicamos a inversão de dependência para facilitar aplicação de testes bem como permitir uma maior flexibilidade em fazer substituições de tecnologias da camadas mais externa do sistema. "HTTP response" e "message repository" são instanciados pelo controller que os injeta nos services ao instancia-los.
- Separamos os recursos referentes a "infra" da regra de negócio. Com esta prática flexibilizasse a substituição dos recursos de infra com baixo ou nenhum impacto na regra de negócio. Ganhando com isso mais segurança em fazer substituições de tecnologias.
- Adotamos a validação do payload no service, por entender que essa parte do processo diz respeito a regra de negócio. Por isso não foi colocado como "middleware", pois com isso uma parte importante do processo ficaria a encardo de um recurso da camada externa.


A imagem a seguir exemplifica as relações entre as respectivas partes do sistema.

![APP Message](./imgs/arquitetura.png)

## Containers

Adotou-se container visando portabilidade, consistência, escalabilidade, isolamento e outros benefícios. 
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

# 1.2 - Tecnologias utilizadas

## Qualidade de Código

- **prettier**: Adotamos para a formatação de código que ajuda a manter a consistência e a legibilidade do código-fonte.
- **eslint**: Adotamos para fazer a análise estática de código. Ela ajuda a identificar problemas e erros comuns no código, além de aplicar regras de estilo e boas práticas de programação.
- **husky**: Adotamos para que no pre-commit execute os scripts:
    - O lint para o arquivos que estão em stage.
    - E test unitário.
- **lint-stageg**: Permite executar linters de código apenas nos arquivos modificados em um determinado commit.
- **test coverage**: Buscamos uma cobertura de teste acima de 90%.

## Regra de negocio

- **Joi**: Validamos a string da mensagem para que tenha um valor e que não seja superior a 300 caracteres.

## Outras tecnologias

- **Express**: Foi adotado como servidor HTTP por estar consolidado e por ter uma quantidade signifiativa de desenvolvedores familiarizados com a tecnologi.
- **MongoDB**: Foi escolhido por armazenar e gerenciar grandes volumes de dados de forma eficiente, fornecendo alta escalabilidade e desempenho. Nos bancos de dados relacionais o armazenamento de dados em campos com mais de 255 caracteres tem uma degradação de performance.
- **Mongoose**: Foi escolhido por ser conhecido entre a comunidade de desenvolvedores e por fornece uma camada de abstração sobre o driver nativo do MongoDB, facilitando a interação com o banco de dados e a definição de esquemas de dados.
- **Docker-compose**: Facilita a criação, configurar e execução de aplicativos multi-container.
- **NodeJS**: Foi escolhido para atender as especificações do projeto.
- **NPM**: Foi adotado por sua maturidade, adoção e por ser integrado diretamente ao NodeJS, o que significa que não requer instalação adicional.
- **Jest**: Foi adotado como ferramenta de teste por ter uma configuração simplificada, uma suíte completa de resursos e uma ótima integração com o ecossistema JavaScript. Seu tempo de execução é muito bom por executar testes em paralelo.
- **winston**: Foi adotado por fornece uma interface flexível e extensível para registrar mensagens e eventos nos aplicativos Node.js.
- **Nodemon**: Foi adotada para economiza tempo e esforço ao automatizar o processo de reinicialização do servidor sempre que necessário.

<br>

# 1.3 - Instalação

Passo 1: Clone o projeto. Na sua pasta de projetos execute o seguinte comando.

```
git clone https://github.com/martinmoraes/beedoo.git

ou

git clone git@github.com:martinmoraes/beedoo.git
```

Passo 2: Instale as dependências. Na pasta raiz do projeto, execute os seguintes comando.

```
cd beedoo
npm install
```

## Execução em modo desenvolvimento

Passo 1: Criar o arquivo .env, na raiz do projeto, com o seguinte conteudo

P.S.: 
- A variável de ambiente "LOG_DIR" deve conter o path completo para a pasta "log".
- A aplicação vai utilizar a porta 3001, conforme definido em APP_PORT.

```
MONGO_POOLSIZE=5
MONGO_DATABASE=beedoo_test
MONGO_HOST=mongodb://admin:password@localhost:27017/?authMechanism=DEFAULT

LOG_DIR=./log
NODE_ENV='development'
APP_PORT=3001
```

Passo 2: MongoDB em Docker - Para executar o MongoDB em um Docker, execute o comando abaixo.

Obs.:

- É necessário ter instalado o Docker e Docker-compose.
- Certifique-se que nenhum serviço ou container esteja utilizando as portas 3000 e 27017.
- Quando rodar o docker a aplicação estará rodando na porta 3000.
- Execute o seguinte comando da raiz do projeto para executar os containers.

```
docker-compose up -d
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
docker-compose down
```

## Postman: Testar os endpoint

Pode ser utilizado o aplicativo [Postman](https://www.postman.com/) para fazer requisições nos endpoints.
Na raiz do projeto, na pasta "postman" tem os arquivos que podem ser importados no Postman. Importe o environment e collection. A seguir descrição dos três arquivos:
- **beedoo containner.postman_environment.json**: Contem a(s) variávei(s) de ambientes direcionada a aplicação que roda no **container**.
- **beedoo local.postman_environment.json**: Contem a(s) variávei(s) de ambientes direcionada a aplicação que roda em modo de **desenvolvimento**.
- **message.postman_collection.json**: Contem as coleções para as chamadas POST e GET.

<br>

# 1.4 - Testes

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

Formata os arquivos JavaScript (com extensão .js) no diretório 'src' e em todos sub diretórios. Estando na raiz do projeto execute o seguinte comando:

```
npm run format
```

## Coverage

Verifica a cobertura de teste, Estando na raiz do projeto execute o seguinte comando:

```
npm run test:coverage
```

<br>

# Etapa 2: Análise de requisitos e planejamento técnico

No futuro queremos permitir que os usuários possam adicionar comentários as mensagens.

## Perguntas para o PO

- Os comentários tem limitação de caracteres?
- Os comentários poderão receber comentários?
- Os comentários recebe o mesmo tratamento que uma mensagem?
- O tempo de resposta para as **consultas/lista** se degradam conforme o volume de dados e a quantidade de requisições simultâneas. Temos de estar preparados para um volúme da dados e requisições exprecivos? 

## Implementações

Em linhas gerais as implementações necessárias, no back-end, para adicionar a funcionalidade de comentários são:
- Colocar no payload de resposta, de cada mensagem, o identificador da mensagem (_id);
- No payload de cada comentário (request) tem de ser fornecido o comentário e o identificador (_id) da mensagem.
- Criar um controler com uma rota POST para criar o usuário;
- Criar um service que sanitize os dados e que faça a chamada para persistência;

  - Para definir a forma de persistência será necessário conversar com o PO para enteder se os comentários serão como novas mensagens, ou seja, se também podem receber comentário. Se sim os comentários serão armazenados na tabela das mensagens. Se não os comentários serão armazenados em uma tabela específica.


## Desafios Técnicos

Um dos desafios é dimencinar a quantidade de requisições simultâneas que o sistema irá receber. O processo de consultas/listar é o mais crítico para o tempo de resposta.
Pensando nessa situação, tem-se algumas alternativas, todas elas carecem de uma análise mais detalhada com auxilio de métricas, principalmente para identificar se o gargalo é a aplicação, qual rota da aplicação e/ou se é o banco de dados. 


<br>

# Etapa 3: Auto avaliação

## Melhorias

<br>

### Cache para paginação

Uma das melhorias que implementaria, visando uma melhor performance em recuperar os dados, seria no processo de paginação. Guardaria em um cache a chave do último registro (primeiro por estar ordenado decrescente) para que na solicitação da próxima pagina a busca no banco de dados ocoreria apartir do último registro. Evitaria com isso que o processo de filtro tivesse que passar por todos os registros a cada paginação.

Por não ter a identificação do usuário que está fazendo a requisição, utilizaria como chave no cache, o IP com a porta da requisição de origem. Usaria a porta porque em uma rede de origem que utiliza NAT diferentes usuários estão com o mesmo IP na requisição.

<br>

### Observabilidade e Métricas

Implementando observabilidade e métricas teriamos informações para acompanhar o perfil de utilização do sistema, os gargalos, alertas para os erros que ocorreriam.

<br>

## Escalabilidade

Alternativas:
- SAGA: Consiste em separar os serviços de consulta, em outra aplicação, dos demais serviços. Criar dois banco de dados um para atender a presistência de novas mensagens e comentários e outro banco de dados para as consultas/listas. A integração dos dados pode ser feita:
  
  - O serviço de criar mensagem persiste nas duas bases;
  - O serviço de criar mensagem coloca em uma fila e o serviço de consultas/listas pega da fila e persiste na base.

- Levantar mais instâncias da aplicação e utilizar um balanceador de carga.
- Fazer um cluster do banco de dados MongoDB, que possibilita o balanceamento de carga. 
- Utilizar o Elasticsearch para otimizar a busca por palavras no serviço de consultas/listar.

<br>
Outras possibilidades podem surgir durante a análise das métricas bem como a troca de idéias com a equipe.
Ao considerar uma tecnologia é importante levar em conta os recursos e custos envolvidos.
