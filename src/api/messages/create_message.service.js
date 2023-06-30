const { logger } = require('../../infra/logger');
const { messageSchema } = require('./message_validate.schema');

class CreateMessageService {
  constructor(httpResponse, messageRepository) {
    this.httpResponse = httpResponse;
    this.messageRepository = messageRepository;
  }

  async execute(messageDto) {
    const resultValidation = this.validateMessage(messageDto);
    console.log(resultValidation);
    if (resultValidation.length > 0) {
      this.httpResponse.invalidFormat(resultValidation);
      return false;
    }

    try {
      const messageSaved = await this.messageRepository.create(messageDto);

      this.httpResponse.ok(messageSaved);
      return messageSaved;
    } catch (error) {
      logger.error(error);
      this.httpResponse.internalError('Invalid operation, please try again later');
      return false;
    }
  }

  validateMessage(messageDto) {
    const validation = messageSchema.validate(messageDto, { abortEarly: false });

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

module.exports = { CreateMessageService };
