const { logger } = require('../../infra/logger');
const { SortingDirection } = require('./message.definitions');

class ListMessageService {
  constructor(httpResponse, messageRepository) {
    this.httpResponse = httpResponse;
    this.messageRepository = messageRepository;
  }

  async execute(listDto) {
    try {
      const queryProperties = this.getProperties(listDto);
      const resultingList = await this.messageRepository.list(queryProperties);

      this.httpResponse.ok(resultingList);
      return true;
    } catch (error) {
      logger.error(error);
      this.httpResponse.internalError('Invalid operation, please try again later');
      return false;
    }
  }

  getProperties(listDto) {
    const limit = 10;
    const page = listDto?.page ? listDto.page : 1;
    const skip = (page - 1) * limit;
    const queryProperties = {
      sort: SortingDirection.DESC,
      skip,
      limit,
    };

    if (listDto?.words) {
      console.log('PASSOU');
      queryProperties.words = listDto.words.split(' ');
    }

    return queryProperties;
  }
}

module.exports = { ListMessageService };
