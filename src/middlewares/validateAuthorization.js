import { sessionsCollection } from "../database/db.js";

export async function validateAuthorization(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    if(!token) {
        res.send("Token inválido").status(401);
    }

    try {
        const session = await sessionsCollection.findOne({token});
        if(!session) {
            return res.send("Token inválido").status(401);
        }
    } catch(err) {
        console.log(err);
        return res.sendStatus(500);
    }

    next();
}