const Joi = require("joi");

const addTransactionValitation = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.string().min(24).max(24).required(),
    dateTransaction: Joi.date().required(),
    income: req.originalUrl.includes("income")
      ? Joi.boolean().valid(true).required()
      : Joi.boolean().valid(false).required(),
    sum: Joi.number().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error)
    return res.status(400).json({ message: validationResult.error.message });
  next();
};

const addIdValitation = (req, res, next) => {
  const schema = Joi.string().min(24).max(24);
  const validationResult = schema.validate(req.params.transactionId);
  if (validationResult.error)
    return res.status(400).json({ message: validationResult.error.message });
  next();
};

module.exports = {
  addTransactionValitation,
  addIdValitation,
};
