const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const createChatValidation = Joi.object().keys({
  body: Joi.object().keys({
    senderId: Joi.objectId().required(),
    recieverId: Joi.objectId().required(),
    message: Joi.string().required(),
  }),
});

const getChatValidation = Joi.object().keys({
  params: Joi.object().keys({
    senderId: Joi.objectId().required(),
    recieverId: Joi.objectId().required(),
  }),
});

module.exports = { createChatValidation, getChatValidation };
