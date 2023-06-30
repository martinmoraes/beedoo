const Joi = require('joi');

const messageSchema = Joi.object({
  message: Joi.string().min(1).max(300).required(),
}).options({ allowUnknown: false });

module.exports = { messageSchema };
