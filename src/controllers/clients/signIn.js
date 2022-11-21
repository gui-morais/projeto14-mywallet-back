import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { clientsCollection, sessionsCollection } from '../../database/db.js';

export async function signIn(req, res) {
    const { email, password } = req.body;

    try{
        const user = await clientsCollection.findOne({email});
        if(!user) {
            return res.status(404).send("Usuário não encontrado");
        }

        if(!bcrypt.compareSync(password, user.password)) {
            return res.status(401).send("Senha inválida");
        }

        const token = uuid();
        const session = await sessionsCollection.findOne({userID: user._id});
        if(session) {
            session.token = token;
            await sessionsCollection.updateOne({_id: session._id}, {$set: session});
        } else {
            await sessionsCollection.insertOne({token, userID:user._id});
        }

        return res.status(202).send(token);
    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
}