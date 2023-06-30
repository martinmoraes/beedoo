const { SortingDirection } = require('../message.definitions');

const messageRepositoryMock = {
  create: jest.fn(),
  list: jest.fn(),
};

const manyMessages = (qtdeMessages) => {
  const messages = [];
  for (let x = 1; x <= qtdeMessages; x++) {
    messages.push(messageGenerator(20));
  }
  return messages;
};

const messageGenerator = (qtdeCaracteres) => {
  let message = '';
  for (let x = 1; x <= qtdeCaracteres; x++) {
    message += 'k';
  }
  return { message };
};

const queryMessageMock = {
  sort: SortingDirection.DESC,
  skip: 1,
  limit: 10,
};

const resultListMock = [{ message: 'aaaa' }, { message: 'bbbb' }];

module.exports = { messageRepositoryMock, messageGenerator, queryMessageMock, resultListMock, manyMessages };
