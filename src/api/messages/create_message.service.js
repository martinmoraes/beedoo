const { logger } = require('../../infra/logger');

class CreateMessageService {
  constructor(httpResponse, messageRepository) {
    this.httpResponse = httpResponse;
    this.messageRepository = messageRepository;
  }

  async execute(messageReceived) {
    if (!this.validateMessage(messageReceived)) {
      this.httpResponse.invalidFormat('Message longer than 300 characters');
      return false;
    }

    try {
      const savedMessage = await this.messageRepository.create(messageReceived);

      this.httpResponse.ok(savedMessage);
    } catch (error) {
      logger.error(error);
      this.httpResponse.internalError('Internal error, try again later');
    }
  }

  validateMessage(messageReceived) {
    if (messageReceived.length > 300) {
      logger.error('message longer than 300 characters');
      return false;
    }
    return true;
  }
}

module.exports = { CreateMessageService };
