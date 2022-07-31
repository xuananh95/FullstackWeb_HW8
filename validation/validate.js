const Joi = require("joi");

const loginValidation = function (data) {
    const schema = Joi.object({
        email: Joi.string().email().min(6).required(),
        password: Joi.string().min(6).required(),
    });
    return schema.validate(data);
};

module.exports.loginValidation = loginValidation;
