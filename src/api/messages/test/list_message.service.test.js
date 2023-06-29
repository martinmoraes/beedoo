require('dotenv').config();
const { httpResponseMock } = require('../../mock/httpResponseMock');
const { messageRepositoryMock, queryMessageMock, resultListMock } = require('./message.mock');
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
      const spyHttpResponseMockInternalError = jest.spyOn(httpResponseMock, 'internalError');

      const receive = await listMessageService.execute();

      const getProperties = {
        sort: -1,
        skip: 1,
        limit: 10,
      };

      expect(receive).toBe(true);
      expect(spyMessageRepositoryListMock).toHaveBeenCalledWith(getProperties);
      expect(spyHttpResponseMockOk).toHaveBeenCalledWith(resultListMock);
      expect(spyHttpResponseMockInternalError).not.toHaveBeenCalled();
    });

    it('with internal error', async () => {
      const spyMessageRepositoryListMock = jest
        .spyOn(messageRepositoryMock, 'list')
        .mockImplementation(() => {
          throw new Error('Mock error');
        });
      const spyHttpResponseMockOk = jest.spyOn(httpResponseMock, 'ok');
      const spyHttpResponseMockInternalError = jest.spyOn(httpResponseMock, 'internalError');

      const receive = await listMessageService.execute();

      const getProperties = {
        sort: -1,
        skip: 1,
        limit: 10,
      };

      expect(receive).toBe(false);
      expect(spyMessageRepositoryListMock).toHaveBeenCalledWith(getProperties);
      expect(spyHttpResponseMockOk).not.toHaveBeenCalled();
      expect(spyHttpResponseMockInternalError).toHaveBeenCalledWith(
        'Invalid operation, please try again later',
      );
    });
  });

  describe('checkQueryParams', () => {
    it('with valid query params', () => {
      const result = listMessageService.getProperties(queryMessageMock);

      expect(result).toEqual(expect.objectContaining(queryMessageMock));
    });
  });
});
