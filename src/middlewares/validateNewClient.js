import { newClientSchema } from "../models/models.js";

export function validateNewClient (req, res, next) {
    const validation = newClientSchema.validate(req.body);

    if(validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    next();
}