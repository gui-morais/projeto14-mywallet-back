import bcrypt from 'bcrypt';
import { clientsCollection } from '../database/db.js';

export async function signUp(req, res) {
    const { name, email, password } = req.body;

    const encryptedPassword = bcrypt.hashSync(password, 10);
    const newClient = {
        name,
        email,
        password:encryptedPassword
    };

    try{
        const user = await clientsCollection.findOne({$or: [
            {email}
        ]});
        if(user) {
            return res.send("Usuário já cadastrado").status(409);
        }

        await clientsCollection.insertOne(newClient);
        return res.sendStatus(201);

    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
}