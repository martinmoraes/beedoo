require('dotenv').config();
const { httpResponseMock } = require('../../mock/httpResponseMock');
const { SortingDirection } = require('../message.definitions');
const { messageRepositoryMock, resultListMock } = require('./message.mock');
const { ListMessageService } = require('../list_message.service');

describe('list message', () => {
  let listMessageService;
  beforeEach(() => {
    listMessageService = new ListMessageService(httpResponseMock, messageRepositoryMock);

    jest.resetAllMocks();
  });
  describe('list pagination', () => {
    it('with success list', async () => {
      const spyMessageRepositoryListMock = jest
        .spyOn(messageRepositoryMock, 'list')
        .mockResolvedValue(resultListMock);
      const spyHttpResponseMockOk = jest.spyOn(httpResponseMock, 'ok');
      const spyHttpResponseMockInvalidFormat = jest.spyOn(httpResponseMock, 'invalidFormat');
      const spyHttpResponseMockInternalError = jest.spyOn(httpResponseMock, 'internalError');

      const receive = await listMessageService.execute({
        words: 'word',
        page: 1,
      });

      const getProperties = {
        sort: SortingDirection.DESC,
        skip: 0,
        limit: 10,
        words: ['word'],
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

      const receive = await listMessageService.execute({
        words: 'word',
        page: 1,
      });

      const getProperties = {
        sort: SortingDirection.DESC,
        skip: 0,
        limit: 10,
        words: ['word'],
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
      const spyHttpResponseMockInternalError = jest.spyOn(httpResponseMock, 'internalError');

      const receive = await listMessageService.execute('invalid');

      expect(receive).toBe(true);
      expect(spyMessageRepositoryListMock).toHaveBeenCalled();
      expect(spyHttpResponseMockOk).toHaveBeenCalled();
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
      const result = listMessageService.getProperties({ page: '2' });

      expect(result).toEqual(
        expect.objectContaining({
          limit: 10,
          skip: 10,
          sort: -1,
        }),
      );
    });
  });

  describe('checkQueryParams', () => {
    it('with valid query params', () => {
      const listDto = {
        words: 'word',
        page: 1,
      };
      const result = listMessageService.getProperties(listDto);

      expect(result).toEqual(
        expect.objectContaining({
          limit: 10,
          skip: 0,
          sort: -1,
          words: ['word'],
        }),
      );
    });

    it('with page 2', () => {
      const listDto = {
        words: 'word',
        page: 2,
      };
      const result = listMessageService.getProperties(listDto);

      expect(result).toEqual(
        expect.objectContaining({
          limit: 10,
          skip: 10,
          sort: -1,
          words: ['word'],
        }),
      );
    });

    it('with two words', () => {
      const listDto = {
        words: 'word new',
        page: 1,
      };
      const result = listMessageService.getProperties(listDto);

      expect(result).toEqual(
        expect.objectContaining({
          limit: 10,
          skip: 0,
          sort: -1,
          words: ['word', 'new'],
        }),
      );
    });

    it('without words', () => {
      const listDto = {
        page: 2,
      };
      const result = listMessageService.getProperties(listDto);

      expect(result).toEqual(
        expect.objectContaining({
          limit: 10,
          skip: 10,
          sort: -1,
        }),
      );
    });

    it('with empty word', () => {
      const listDto = {
        page: 2,
        words: '',
      };
      const result = listMessageService.getProperties(listDto);

      expect(result).toEqual(
        expect.objectContaining({
          limit: 10,
          skip: 10,
          sort: -1,
        }),
      );
    });
  });
});
