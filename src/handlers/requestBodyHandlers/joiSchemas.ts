import Joi from 'joi';

export const UserRegistrationBodyRequest = Joi.object({
    username: Joi.string().min(2).required(),
    password: Joi.string().min(4).required(),
    name: Joi.string().min(3).required(),
    birth: Joi.date().required(),
    email: Joi.string().email({ tlds: { allow: false } }),
})

