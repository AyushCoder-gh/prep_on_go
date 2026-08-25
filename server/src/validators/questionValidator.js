const Joi = require("joi");

const createQuestionSchema = Joi.object({
    question: Joi.string().trim().required(),

    option_a: Joi.string().trim().required(),

    option_b: Joi.string().trim().required(),

    option_c: Joi.string().trim().required(),

    option_d: Joi.string().trim().required(),

    correct_option: Joi.string().valid("A", "B", "C", "D").required(),

    category: Joi.string().trim().required(),

    difficulty: Joi.string().valid("Easy", "Medium", "Hard").required(),
});

const updateQuestionSchema = Joi.object({
    question: Joi.string().trim().required(),

    option_a: Joi.string().trim().required(),

    option_b: Joi.string().trim().required(),

    option_c: Joi.string().trim().required(),

    option_d: Joi.string().trim().required(),

    correct_option: Joi.string().valid("A", "B", "C", "D").required(),

    category: Joi.string().trim().required(),

    difficulty: Joi.string().valid("Easy", "Medium", "Hard").required(),
});

module.exports = {
    createQuestionSchema,
    updateQuestionSchema,
};