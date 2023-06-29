// const Post = require('./models/Post');

// const page = 1; // Página atual
// const perPage = 10; // Número de documentos por página
// const sortBy = 'createdAt'; // Campo usado para ordenação (exemplo: createdAt)

// // Calcula o número de documentos a serem pulados
// const skip = (page - 1) * perPage;

// // Executa a consulta
// Post.find()
//   .sort({ [sortBy]: 1 }) // 1 para ordenação ascendente, -1 para ordenação descendente
//   .skip(skip)
//   .limit(perPage)
//   .exec((err, posts) => {
//     if (err) {
//       // Lida com o erro
//     } else {
//       // Faz algo com os documentos retornados
//       console.log(posts);
//     }
//   });
// Neste exemplo, estamos usando o modelo Post para realizar a consulta. O método find() é usado para buscar todos os documentos. Em seguida, utilizamos o método sort() para definir a ordenação com base no campo especificado (sortBy). O valor 1 é usado para ordenação ascendente, e -1 é usado para ordenação descendente.

// Após definir a ordenação, utilizamos os métodos skip() e limit() para aplicar a paginação, da mesma forma que no exemplo anterior. O número de documentos a serem pulados é calculado multiplicando o número da página atual (page) pelo número de documentos por página (perPage).

// Ao executar a consulta com exec(), você pode lidar com os resultados no callback, assim como mencionado anteriormente.

// Lembre-se de que você deve substituir './models/Post' pelo caminho correto para o seu modelo e garantir que a conexão com o banco de dados esteja estabelecida antes de executar a consulta.

// Você pode ajustar os valores de page, perPage e sortBy de acordo com os requisitos específicos da sua paginação e ordenação.
