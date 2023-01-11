const Joi = require("joi");

const middleware = (schema, property) => {
  return (req, res, next) => {
    const { body, query, params } = req;

    const reqObject = {};

    if (Object.keys(body).length != 0) {
      reqObject.body = body;
    }
    if (Object.keys(query).length != 0) {
      reqObject.query = query;
    }
    if (Object.keys(params).length != 0) {
      reqObject.params = params;
    }

    const { error } = schema.validate(reqObject);
    if (error) {
      let message = error.details[0].message;
      return res.status(422).json({ error: { message } });
    } else {
      next();
    }
  };
};
module.exports = middleware;
