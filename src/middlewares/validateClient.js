import { clientSchema } from "../models/models.js";

export function validateClient (req, res, next) {
    const validation = clientSchema.validate(req.body, {abortEarly: false});

    if(validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    }

    next();
}