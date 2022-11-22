import dayjs from "dayjs";
import { sessionsCollection, transactionCollection } from "../../database/db.js";

export async function postTransactions(req, res) {
    const { value, description, type} = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    try{
        const session = await sessionsCollection.findOne({token});
        const day = new Date();
        const date = {day: day.getDate(), month: day.getMonth()+1};
        await transactionCollection.insertOne({userID: session.userID, value: Number(value), description, type, date});
        return res.sendStatus(201);
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
}