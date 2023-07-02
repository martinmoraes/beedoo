const { SortingDirection } = require('../message.definitions');

const messageRepositoryMock = {
  create: jest.fn(),
  list: jest.fn(),
};

// const manyMessages = (qtdeMessages, character) => {
//   const messages = [];
//   for (let x = 1; x <= qtdeMessages; x++) {
//     messages.push(messageGenerator(20, character));
//   }
//   return messages;
// };

const messageGenerator = (qtdeCaracteres, character = 'k') => {
  let message = '';
  for (let x = 1; x <= qtdeCaracteres; x++) {
    message += character;
  }
  return { message };
};

const queryMessageMock = {
  sort: SortingDirection.DESC,
  skip: 1,
  limit: 10,
};

const resultListMock = [{ message: 'aaaa' }, { message: 'bbbb' }];

module.exports = {
  messageRepositoryMock,
  messageGenerator,
  queryMessageMock,
  resultListMock,
};
