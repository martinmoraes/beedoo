const { Logger } = require('winston');
const { MessageModel } = require('./message.model');

class MessageRepository {
  async create(MessageDto) {
    const messageModel = new MessageModel(MessageDto);
    const resultSaved = await messageModel.save();
    return resultSaved?.message ? { affectedRows: 1 } : { affectedRows: 0 };
  }

  async list(queryProperties) {
    if (queryProperties?.words) {
      return this.listByWords(queryProperties);
    } else {
      return this.simpleList(queryProperties);
    }
  }

  async simpleList(queryProperties) {
    let resultFindModel;
    try {
      resultFindModel = await MessageModel.find()
        .sort({ ['_id']: queryProperties.sort })
        .skip(queryProperties.skip)
        .limit(queryProperties.limit)
        .exec();
    } catch (error) {
      Logger.error(error);
      return [];
    }

    return resultFindModel.map(({ message }) => {
      return message;
    });
  }

  async listByWords(queryProperties) {
    let resultFindModel;
    try {
      const regex = new RegExp(queryProperties.words.join('|'), 'i');
      resultFindModel = await MessageModel.find({ message: { $regex: regex } })
        .sort({ ['_id']: queryProperties.sort })
        .skip(queryProperties.skip)
        .limit(queryProperties.limit)
        .exec();
    } catch (error) {
      Logger.error(error);
      return [];
    }

    return resultFindModel.map(({ message }) => {
      return message;
    });
  }
}

module.exports = { MessageRepository };
