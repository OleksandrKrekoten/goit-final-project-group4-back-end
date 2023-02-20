const Joi = require("joi");
const mothsResultsSchema = Joi.object({
  year: Joi.number().required(),
  currentMonth: Joi.number().min(1).max(12).required(),
});
module.exports = {
  mothsResultsSchema,
};
