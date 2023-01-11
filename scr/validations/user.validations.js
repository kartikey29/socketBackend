const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const loginSignUp = Joi.object().keys({
  body: Joi.object().keys({
    userName: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

const userById = Joi.object().keys({
  params: Joi.object().keys({
    id: Joi.objectId().required(),
  }),
});

module.exports = { loginSignUp, userById };
