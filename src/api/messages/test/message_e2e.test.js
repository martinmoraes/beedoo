require('dotenv').config();
const { messageGenerator, resultListE2E, manyMessages } = require('./message.mock');
const { httpResponseMock } = require('../../mock/httpResponseMock');
const { MessageModel } = require('../message.model');
const { connectMongo } = require('../../../infra/connect_mongodb');
const mongoose = require('mongoose');
const { CreateMessageService } = require('../create_message.service');
const { ListMessageService } = require('../list_message.service');
const { MessageRepository } = require('../message.repository');

describe('Message', () => {
  let createMessageService;
  let listMessageService;

  beforeAll(async () => {
    await connectMongo();

    await MessageModel.insertMany(manyMessages(10, 'a'));
    await MessageModel.insertMany(manyMessages(10, 'b'));
  });

  beforeEach(async () => {
    createMessageService = new CreateMessageService(httpResponseMock, new MessageRepository());
    listMessageService = new ListMessageService(httpResponseMock, new MessageRepository());

    jest.clearAllMocks();
  });

  afterAll(async () => {
    await MessageModel.deleteMany({});
    await mongoose.disconnect();
  });

  describe('create message', () => {
    it('successfully creating message', async () => {
      const spyHttpResponseMockOk = jest.spyOn(httpResponseMock, 'ok');
      const spyHttpResponseMockInternalError = jest.spyOn(httpResponseMock, 'internalError');

      const message = messageGenerator(300);
      await createMessageService.execute(message);

      expect(spyHttpResponseMockOk).toHaveBeenCalledWith({ affectedRows: 1 });
      expect(spyHttpResponseMockInternalError).not.toHaveBeenCalled();
    });
  });

  describe('list message', () => {
    it('with success list', async () => {
      const spyHttpResponseMockOk = jest.spyOn(httpResponseMock, 'ok');
      const spyHttpResponseMockInternalError = jest.spyOn(httpResponseMock, 'internalError');

      const receive = await listMessageService.execute({
        words: 'aaa',
        page: 1,
      });

      expect(receive).toBe(true);
      expect(spyHttpResponseMockOk).toHaveBeenCalledWith(resultListE2E);
      expect(spyHttpResponseMockInternalError).not.toHaveBeenCalled();
    });
  });
});
