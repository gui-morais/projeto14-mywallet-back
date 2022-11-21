import joi from "joi";

export const newClientSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).required()
});

export const clientSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(3).required()
});

export const transactionSchema = joi.object({
    _id: joi.string(),
    value: joi.number().required(),
    description: joi.string().min(3).required(),
    type: joi.string().valid("Entrada", "Saída").required()
});