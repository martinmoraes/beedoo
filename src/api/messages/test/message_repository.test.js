require('dotenv').config();
const { MessageRepository } = require('../message.repository');
const { messageGenerator } = require('./message.mock');
const { connectMongo } = require('../../../infra/connect_mongodb');
const mongoose = require('mongoose');
const { manyMessages } = require('./message.mock');
const { MessageModel } = require('../message.model');

describe('MessageRepository', () => {
  let messageRepository;

  beforeAll(async () => {
    await connectMongo();

    await MessageModel.insertMany(manyMessages(10, 'a'));
    await MessageModel.insertMany(manyMessages(10, 'b'));
  });

  beforeEach(async () => {
    messageRepository = new MessageRepository();

    jest.clearAllMocks();
  });

  afterAll(async () => {
    await MessageModel.deleteMany({});
    await mongoose.disconnect();
  });

  describe('create message', () => {
    it('create message', async () => {
      const newMessage = messageGenerator(80);
      const result = await messageRepository.create(newMessage);

      expect(result).toStrictEqual(expect.objectContaining({ affectedRows: 1 }));
    });
  });

  describe('list', () => {
    it('with page list', async () => {
      const queryListMock = {
        sort: -1,
        skip: 0,
        limit: 10,
      };
      const result = await messageRepository.list(queryListMock);

      expect(result.length).toStrictEqual(10);
      expect(result).toStrictEqual(expect.arrayContaining([expect.any(String)]));
    });

    it('with word', async () => {
      const words = 'aaaa'.split(' ');

      const queryListMock = {
        sort: -1,
        skip: 0,
        limit: 10,
        words,
      };
      const result = await messageRepository.list(queryListMock);

      expect(result.length).toStrictEqual(10);
    });
  });
});
