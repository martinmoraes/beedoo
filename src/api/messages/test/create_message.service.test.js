require('dotenv').config();
const { httpResponseMock } = require('../../mock/httpResponseMock');
const { messageRepositoryMock } = require('./message.mock');
const { messageGenerator } = require('./message.mock');
const { CreateMessageService } = require('../create_message.service');

describe('CreateMessageService', () => {
  let createMessageService;
  beforeEach(() => {
    createMessageService = new CreateMessageService(httpResponseMock, messageRepositoryMock);

    jest.clearAllMocks();
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
      const spyMessageRepositoryCreateMock = jest.spyOn(messageRepositoryMock, 'create');
      const spyHttpResponseMockOk = jest.spyOn(httpResponseMock, 'ok');
      const spyHttpResponseMockInternalError = jest.spyOn(httpResponseMock, 'internalError');
      const spyHttpResponseMockInvalidFormat = jest.spyOn(httpResponseMock, 'invalidFormat');

      const message = messageGenerator(301);
      const result = await createMessageService.execute(message);

      expect(result).toBe(false);
      expect(spyMessageRepositoryCreateMock).not.toHaveBeenCalled();
      expect(spyHttpResponseMockOk).not.toHaveBeenCalled();
      expect(spyHttpResponseMockInternalError).not.toHaveBeenCalled();
      expect(spyHttpResponseMockInvalidFormat).toHaveBeenCalled();
    });

    it('without message', async () => {
      const spyMessageRepositoryCreateMock = jest.spyOn(messageRepositoryMock, 'create');
      const spyHttpResponseMockOk = jest.spyOn(httpResponseMock, 'ok');
      const spyHttpResponseMockInternalError = jest.spyOn(httpResponseMock, 'internalError');
      const spyHttpResponseMockInvalidFormat = jest.spyOn(httpResponseMock, 'invalidFormat');

      const message = { message: '' };
      const result = await createMessageService.execute(message);

      expect(result).toBe(false);
      expect(spyMessageRepositoryCreateMock).not.toHaveBeenCalled();
      expect(spyHttpResponseMockOk).not.toHaveBeenCalled();
      expect(spyHttpResponseMockInternalError).not.toHaveBeenCalled();
      expect(spyHttpResponseMockInvalidFormat).toHaveBeenCalled();
    });

    it('with internal error', async () => {
      jest.spyOn(messageRepositoryMock, 'create').mockImplementation(() => {
        throw new Error('Error mock');
      });
      const spyHttpResponseMockOk = jest.spyOn(httpResponseMock, 'ok');
      const spyHttpResponseMockInternalError = jest.spyOn(httpResponseMock, 'internalError');
      const spyHttpResponseMockInvalidFormat = jest.spyOn(httpResponseMock, 'invalidFormat');

      await createMessageService.execute({ message: 'aaa' });

      expect(spyHttpResponseMockOk).not.toHaveBeenCalled();
      expect(spyHttpResponseMockInternalError).toHaveBeenCalledWith(
        'Invalid operation, please try again later',
      );
      expect(spyHttpResponseMockInvalidFormat).not.toHaveBeenCalled();
    });
  });

  describe('validate message size - validateMessage', () => {
    it('with validate message', () => {
      const result = createMessageService.validateMessage(messageGenerator(300));

      expect(result).toStrictEqual([]);
    });

    it('with more than 300 characters', () => {
      const result = createMessageService.validateMessage(messageGenerator(301));

      expect(result).toStrictEqual([
        { message: '"message" length must be less than or equal to 300 characters long' },
      ]);
    });

    it('without message', () => {
      const result = createMessageService.validateMessage('');

      expect(result).toStrictEqual([{ undefined: '"value" must be of type object' }]);
    });
  });
});
