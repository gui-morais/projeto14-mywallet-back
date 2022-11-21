import { ObjectID } from "bson";
import { transactionCollection } from "../../database/db.js";

export async function putTransactions(req, res) {
    try{
        const { _id, value, description, type } = req.body;
        const transaction = await transactionCollection.findOne({_id: new ObjectID(_id)});
        if(!transaction) {
            return res.sendStatus(404);
        }
        await transactionCollection.updateOne({_id: new ObjectID(_id)}, {$set: {value, description, type}});
        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
}