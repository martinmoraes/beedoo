const { SortingDirection } = require('./definitions');
const { queryMessageSchema } = require('./message_validate.schema');

class ListMessageService {
  constructor(httpResponse, messageRepository) {
    this.httpResponse = httpResponse;
    this.messageRepository = messageRepository;
  }

  execute(queryParams) {
    const validated = this.isValidQuery(queryParams);
    if (validated.length > 0) {
      this.httpResponse.invalidFormat(validated);
      return false;
    }
  }

  checkQueryParams(queryParams) {
    if (!queryParams) {
      this.httpResponse.invalidFormat('Invalid query attributes');
      return false;
    }

    return {
      sort: Number(queryParams.sort) || SortingDirection.DESC,
      skip: Number(queryParams.skip) || 1,
      limit: Number(queryParams.limit) || 10,
    };
  }

  isValidQuery(queryDTO) {
    const validation = queryMessageSchema.validate(queryDTO, { abortEarly: false });

    if (validation.error) {
      const errorMessage = validation.error.details.map((error) => {
        return {
          [error.path[0]]: error.message,
        };
      });

      return errorMessage;
    }

    return [];
  }
}

module.exports = { ListMessageService };
