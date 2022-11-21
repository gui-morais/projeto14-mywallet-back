import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { clientsCollection, sessionsCollection } from '../database/db.js';

export async function signIn(req, res) {
    const { email, password } = req.body;

    try{
        const user = await clientsCollection.findOne({email});
        if(!user) {
            return res.send("Usuário não encontrado").status(404);
        }

        if(!bcrypt.compareSync(user.password, password)) {
            return res.send("Senha inválida").status(401);
        }

        const token = uuid();
        const session = await sessionsCollection.findOne({email});
        if(session) {
            session.token = token;
            await sessionsCollection.updateOne({_id: session._id}, {$set: session});
        } else {
            await sessionsCollection.insertOne({token, userID:user._id});
        }

        return res.send(token).status(202);
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
}