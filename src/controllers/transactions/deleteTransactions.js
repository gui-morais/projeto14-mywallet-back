import { ObjectId } from "mongodb";
import { transactionCollection } from "../../database/db.js";

export async function deleteTransactions(req, res) {
    try{
        const _id = req.body._id;
        const transaction = await transactionCollection.findOne({_id: new ObjectId(_id)});
        if(!transaction) {
            return res.sendStatus(404);
        }
        await transactionCollection.deleteOne({_id: new ObjectId(_id)});
        return res.sendStatus(200);
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
}