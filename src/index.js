import express from "express";
import router from "./routes/routes.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(5000, () => console.log("Servidor rodando na porta 5000!"));