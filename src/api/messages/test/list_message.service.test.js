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
    it('with all parameters paging success', async () => {
      const spyMessageRepositoryListMock = jest
        .spyOn(messageRepositoryMock, 'list')
        .mockResolvedValue(resultListMock);
      const spyHttpResponseMockOk = jest.spyOn(httpResponseMock, 'ok');
      const spyHttpResponseMockInternalError = jest.spyOn(httpResponseMock, 'internalError');
      const spyHttpResponseMockInvalidFormat = jest.spyOn(httpResponseMock, 'invalidFormat');

      const receive = await listMessageService.execute(queryMessageMock);

      expect(receive).toBe(true);
      expect(spyMessageRepositoryListMock).toHaveBeenCalledWith(resultListMock);
      expect(spyHttpResponseMockOk).toHaveBeenCalledWith(resultListMock);
      expect(spyHttpResponseMockInternalError).not.toHaveBeenCalled();
    });

    it('without valid parameters', async () => {
      const spyMessageRepositoryListMock = jest
        .spyOn(messageRepositoryMock, 'list')
        .mockResolvedValue(resultListMock);
      const spyHttpResponseMockOk = jest.spyOn(httpResponseMock, 'ok');
      const spyHttpResponseMockInternalError = jest.spyOn(httpResponseMock, 'internalError');
      const spyHttpResponseMockInvalidFormat = jest.spyOn(httpResponseMock, 'invalidFormat');

      const queryMessageMock = {
        sort: 'a',
        skip: 'a',
        limit: 'a',
      };
      const receive = await listMessageService.execute(queryMessageMock);

      expect(receive).toBe(false);
      expect(spyMessageRepositoryListMock).not.toHaveBeenCalled();
      expect(spyHttpResponseMockOk).not.toHaveBeenCalled();
      expect(spyHttpResponseMockInternalError).not.toHaveBeenCalled();
      expect(spyHttpResponseMockInvalidFormat).toHaveBeenCalledWith([
        { sort: '"sort" must be one of [1, -1]' },
        { sort: '"sort" must be a number' },
        { skip: '"skip" must be a number' },
        { limit: '"limit" must be a number' },
      ]);
    });
  });

  describe('checkQueryParams', () => {
    it('with valid query params', () => {
      const result = listMessageService.checkQueryParams(queryMessageMock);

      expect(result).toEqual(expect.objectContaining(queryMessageMock));
    });

    it('with invalid values', () => {
      const queryInvalid = {
        sort: 'a',
        skip: 'a',
        limit: 'a',
      };
      const result = listMessageService.checkQueryParams(queryInvalid);

      expect(result).toEqual(expect.objectContaining(queryMessageMock));
    });

    it('without properties', () => {
      const result = listMessageService.checkQueryParams({});

      expect(result).toEqual(expect.objectContaining(queryMessageMock));
    });

    it('without object', () => {
      const spyHttpResponseMockInvalidFormat = jest.spyOn(httpResponseMock, 'invalidFormat');

      const result = listMessageService.checkQueryParams(undefined);

      expect(result).toBe(false);
      expect(spyHttpResponseMockInvalidFormat).toHaveBeenCalledWith('Invalid query attributes');
    });
  });

  describe('isValidQuery', () => {
    it('with valid query', () => {
      const result = listMessageService.isValidQuery(queryMessageMock);

      expect(result).toStrictEqual([]);
    });

    it('without valid values', () => {
      const queryMessageMock = {
        sort: 'a',
        skip: 'a',
        limit: 'a',
      };
      const result = listMessageService.isValidQuery(queryMessageMock);
      console.log(result);
      expect(result).toEqual(
        expect.arrayContaining([
          { sort: '"sort" must be one of [1, -1]' },
          { sort: '"sort" must be a number' },
          { skip: '"skip" must be a number' },
          { limit: '"limit" must be a number' },
        ]),
      );
    });
  });
});
