import { sessionsCollection, transactionCollection } from "../../database/db.js";

export async function postTransactions(req, res) {
    const { value, description, type} = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    try{
        const session = await sessionsCollection.findOne({token});
        await transactionCollection.insertOne({userID: session.userID, value, description, type});
        return res.sendStatus(201);
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
}