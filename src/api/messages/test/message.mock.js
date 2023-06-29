const { SortingDirection } = require('../definitions');

const messageRepositoryMock = {
  create: jest.fn(),
  list: jest.fn(),
};

const messageGenerator = (qtdeCaracteres) => {
  let message = '';
  for (let x = 1; x <= qtdeCaracteres; x++) {
    message += 'k';
  }
  return message;
};

const queryMessageMock = {
  sort: SortingDirection.DESC,
  skip: 1,
  limit: 10,
};

const resultListMock = [{ message: 'aaaa' }, { message: 'bbbb' }];

module.exports = { messageRepositoryMock, messageGenerator, queryMessageMock, resultListMock };
