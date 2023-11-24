import Joi from "joi";
import joi from "joi";

export const userRegisterValidationSchema = joi.object({
  userName: joi.string().required().min(2).max(30),
  email: Joi.string()
    .email()
    .regex(/^[a-zA-Z]+.[a-zA-Z]+@thejitu.com$/)
    .required(),
  cohortNumber: Joi.number().integer().min(1).required(),
  password: joi
    .string()
    .required()
    .pattern(new RegExp("^[a-zA-Z0-9!@#%$&*()]{0,30}$")),
});


