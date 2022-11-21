import express from "express";
import { signIn } from "../controllers/clients/signIn.js";
import { signUp } from "../controllers/clients/signUp.js";
import { deleteTransactions } from "../controllers/transactions/deleteTransactions.js";
import { getTransactions } from "../controllers/transactions/getTransactions.js";
import { postTransactions } from "../controllers/transactions/postTransactions.js";
import { putTransactions } from "../controllers/transactions/putTransactions.js";
import { validateAuthorization } from "../middlewares/validateAuthorization.js";
import { validateClient } from "../middlewares/validateClient.js";
import { validateID } from "../middlewares/validateID.js";
import { validateNewClient } from "../middlewares/validateNewClient.js";
import { validateTransaction } from "../middlewares/validateTransaction.js";

const router = express.Router();
router.post("/sign-up", validateNewClient, signUp);
router.post("/sign-in", validateClient, signIn);
router.post("/transactions", validateAuthorization, validateTransaction, postTransactions);
router.put("/transactions", validateAuthorization, validateID, validateTransaction, putTransactions);
router.delete("/transactions", validateAuthorization, validateID, deleteTransactions);
router.get("/transactions", validateAuthorization, getTransactions);

export default router;