import { sessionsCollection, transactionCollection } from "../../database/db.js";

export async function getTransactions(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    try{
        const session = await sessionsCollection.findOne({token});
        const transactions = await transactionCollection.find({_id: session.userID}).toArray();
        transactions.forEach(e => delete e.userID);
        return res.send(transactions).status(200);
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
}