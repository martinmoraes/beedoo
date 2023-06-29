const { logger } = require('../../infra/logger');
const { SortingDirection } = require('./definitions');

class ListMessageService {
  constructor(httpResponse, messageRepository) {
    this.httpResponse = httpResponse;
    this.messageRepository = messageRepository;
  }

  async execute(page) {
    if (this.validatePageNumber(page)) {
      this.httpResponse.invalidFormat('The page must be a valid number');
      return false;
    }

    try {
      const resultingList = await this.messageRepository.list(this.getProperties(page));

      this.httpResponse.ok(resultingList);

      return true;
    } catch (error) {
      logger.error(error);
      this.httpResponse.internalError('Invalid operation, please try again later');

      return false;
    }
  }

  getProperties(page) {
    const limit = 10;
    const skip = limit * (Number(page) - 1);
    return {
      sort: SortingDirection.DESC,
      skip,
      limit,
    };
  }

  validatePageNumber(page) {
    return isNaN(page);
  }
}

module.exports = { ListMessageService };
