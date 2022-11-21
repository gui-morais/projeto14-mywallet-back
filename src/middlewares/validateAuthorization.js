import { sessionsCollection } from "../database/db.js";

export async function validateAuthorization(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if(!token) {
        return res.status(401).send("Token inválido");
    }

    try {
        const session = await sessionsCollection.findOne({token});
        if(!session) {
            return res.status(401).send("Token inválido");
        }
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }

    next();
}