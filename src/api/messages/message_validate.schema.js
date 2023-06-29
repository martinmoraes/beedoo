const { SortingDirection } = require('./definitions');

const Joi = require('joi');

const queryMessageSchema = Joi.object({
  sort: Joi.number().optional().valid(SortingDirection.ASC, SortingDirection.DESC),
  skip: Joi.number().optional(),
  limit: Joi.number().optional(),
}).options({ allowUnknown: false });

module.exports = { queryMessageSchema };
