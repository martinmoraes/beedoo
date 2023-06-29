require('dotenv').config();
const { httpResponseMock } = require('../../mock/httpResponseMock');
const { messageRepositoryMock, resultListMock } = require('./message.mock');
const { ListMessageService } = require('../list_message.service');

describe('list message', () => {
  let listMessageService;
  beforeEach(() => {
    listMessageService = new ListMessageService(httpResponseMock, messageRepositoryMock);
  });
  describe('list pagination', () => {
    it('with success list', async () => {
      const spyMessageRepositoryListMock = jest
        .spyOn(messageRepositoryMock, 'list')
        .mockResolvedValue(resultListMock);
      const spyHttpResponseMockOk = jest.spyOn(httpResponseMock, 'ok');
      const spyHttpResponseMockInvalidFormat = jest.spyOn(httpResponseMock, 'invalidFormat');
      const spyHttpResponseMockInternalError = jest.spyOn(httpResponseMock, 'internalError');

      const receive = await listMessageService.execute(2);

      const getProperties = {
        sort: -1,
        skip: 10,
        limit: 10,
      };

      expect(receive).toBe(true);
      expect(spyMessageRepositoryListMock).toHaveBeenCalledWith(getProperties);
      expect(spyHttpResponseMockOk).toHaveBeenCalledWith(resultListMock);
      expect(spyHttpResponseMockInvalidFormat).not.toHaveBeenCalled();
      expect(spyHttpResponseMockInternalError).not.toHaveBeenCalled();
    });

    it('with internal error', async () => {
      const spyMessageRepositoryListMock = jest
        .spyOn(messageRepositoryMock, 'list')
        .mockImplementation(() => {
          throw new Error('Mock error');
        });
      const spyHttpResponseMockOk = jest.spyOn(httpResponseMock, 'ok');
      const spyHttpResponseMockInvalidFormat = jest.spyOn(httpResponseMock, 'invalidFormat');
      const spyHttpResponseMockInternalError = jest.spyOn(httpResponseMock, 'internalError');

      const receive = await listMessageService.execute(3);

      const getProperties = {
        sort: -1,
        skip: 20,
        limit: 10,
      };

      expect(receive).toBe(false);
      expect(spyMessageRepositoryListMock).toHaveBeenCalledWith(getProperties);
      expect(spyHttpResponseMockOk).not.toHaveBeenCalled();
      expect(spyHttpResponseMockInvalidFormat).not.toHaveBeenCalled();
      expect(spyHttpResponseMockInternalError).toHaveBeenCalledWith(
        'Invalid operation, please try again later',
      );
    });

    it('with invalid parameter', async () => {
      const spyMessageRepositoryListMock = jest.spyOn(messageRepositoryMock, 'list');
      const spyHttpResponseMockOk = jest.spyOn(httpResponseMock, 'ok');
      const spyHttpResponseMockInvalidFormat = jest.spyOn(httpResponseMock, 'invalidFormat');
      const spyHttpResponseMockInternalError = jest.spyOn(httpResponseMock, 'internalError');

      const receive = await listMessageService.execute('a');

      expect(receive).toBe(false);
      expect(spyMessageRepositoryListMock).not.toHaveBeenCalled();
      expect(spyHttpResponseMockOk).not.toHaveBeenCalled();
      expect(spyHttpResponseMockInvalidFormat).toHaveBeenCalledWith('The page must be a valid number');
      expect(spyHttpResponseMockInternalError).not.toHaveBeenCalled();
    });
  });

  describe('getProperties', () => {
    it('with valid page', () => {
      const result = listMessageService.getProperties(1);

      expect(result).toEqual(
        expect.objectContaining({
          limit: 10,
          skip: 0,
          sort: -1,
        }),
      );
    });

    it('with page in string', () => {
      const result = listMessageService.getProperties('2');

      expect(result).toEqual(
        expect.objectContaining({
          limit: 10,
          skip: 10,
          sort: -1,
        }),
      );
    });
  });

  describe('validatePage', () => {
    it('with valid number', () => {
      const result = listMessageService.validatePageMumber(2);

      expect(result).toBe(false);
    });

    it('with string number', () => {
      const result = listMessageService.validatePageMumber('1');

      expect(result).toBe(false);
    });

    it('with invalid number', () => {
      const result = listMessageService.validatePageMumber('a');

      expect(result).toBe(true);
    });
  });
});
