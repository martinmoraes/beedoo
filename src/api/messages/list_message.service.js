const { logger } = require('../../infra/logger');
const { SortingDirection } = require('./definitions');

class ListMessageService {
  constructor(httpResponse, messageRepository) {
    this.httpResponse = httpResponse;
    this.messageRepository = messageRepository;
  }

  async execute() {
    try {
      const resultingList = await this.messageRepository.list(this.getProperties());

      this.httpResponse.ok(resultingList);
      return true;
    } catch (error) {
      logger.error(error);
      this.httpResponse.internalError('Invalid operation, please try again later');
      return false;
    }
  }

  getProperties() {
    return {
      sort: SortingDirection.DESC,
      skip: 1,
      limit: 10,
    };
  }
}

module.exports = { ListMessageService };
