import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try{
    await mongoClient.connect();
    console.log("MongoDB conectado");
} catch (error) {
    console.log(error);
}

const db = mongoClient.db("mywallet");
export const clientsCollection = db.collection("clients");
export const transactionCollection = db.collection("transactions");
export const sessionsCollection = db.collection("sessions")