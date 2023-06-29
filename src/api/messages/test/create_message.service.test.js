require('dotenv').config();
const { httpResponseMock } = require('../../mock/httpResponseMock');
const { messageRepositoryMock } = require('./message.mock');
const { messageGenerator } = require('./message.mock');
const { CreateMessageService } = require('../create_message.service');

describe('CreateMessageService', () => {
  let createMessageService;
  beforeEach(() => {
    createMessageService = new CreateMessageService(httpResponseMock, messageRepositoryMock);
  });

  describe('creating message', () => {
    it('successfully creating message', async () => {
      const spyMessageRepositoryCreateMock = jest
        .spyOn(messageRepositoryMock, 'create')
        .mockResolvedValue({ affectedRows: 1 });
      const spyHttpResponseMockOk = jest.spyOn(httpResponseMock, 'ok');
      const spyHttpResponseMockInternalError = jest.spyOn(httpResponseMock, 'internalError');

      const message = messageGenerator(300);
      await createMessageService.execute(message);

      expect(spyMessageRepositoryCreateMock).toHaveBeenCalledWith(message);
      expect(spyHttpResponseMockOk).toHaveBeenCalledWith({ affectedRows: 1 });
      expect(spyHttpResponseMockInternalError).not.toHaveBeenCalled();
    });

    it('with more than 300 characters', async () => {
      const spyMessageRepositoryCreateMock = jest
        .spyOn(messageRepositoryMock, 'create')
        .mockResolvedValue({ affectedRows: 1 });
      const spyHttpResponseMockInvalidFormat = jest.spyOn(httpResponseMock, 'invalidFormat');

      const message = messageGenerator(301);
      const result = await createMessageService.execute(message);

      expect(result).toBe(false);
      expect(spyMessageRepositoryCreateMock).not.toHaveBeenCalled();
      expect(spyHttpResponseMockInvalidFormat).toHaveBeenCalledWith('Message longer than 300 characters');
    });

    it('with internal error', async () => {
      jest.spyOn(messageRepositoryMock, 'create').mockImplementation(() => {
        throw new Error('Error mock');
      });
      const spyHttpResponseMockOk = jest.spyOn(httpResponseMock, 'ok');
      const spyHttpResponseMockInternalError = jest.spyOn(httpResponseMock, 'internalError');

      await createMessageService.execute('message');

      expect(spyHttpResponseMockOk).not.toHaveBeenCalled();
      expect(spyHttpResponseMockInternalError).toHaveBeenCalledWith('Internal error, try again later');
    });
  });

  describe('validate message size', () => {
    it('success validate message', () => {
      const result = createMessageService.validateMessage(messageGenerator(300));
      expect(result).toBe(true);
    });

    it('with more than 300 characters', () => {
      const result = createMessageService.validateMessage(messageGenerator(301));
      expect(result).toBe(false);
    });
  });
});
