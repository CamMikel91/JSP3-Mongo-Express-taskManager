const Joi = require('joi');

// Joi Schema
const joiSchema = Joi.object({
    Title: Joi.string().required(),
    Task: Joi.string().max(25).required(),
    AdditionalInfo: Joi.string().max(250),
    Category: Joi.string().min(3).required(),
    Tags: Joi.array().required().items(Joi.string().min(1)),
    Severity: Joi.string().valid('Normal', 'Important', 'Critical').required(),
    Completed: Joi.boolean().default(false).required()
});

module.exports = joiSchema;