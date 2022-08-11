import express from "express";
import {
    getMoneyRecipts,
    getMoneyReciptById,
    saveMoneyRecipt,
    updateMoneyRecipt,
    deleteMoneyRecipt
} from "../controllers/MoneyReceiptController.js";

const router = express.Router();

router.get('/api/money-receipts', getMoneyRecipts);
router.get('/api/money-receipts/:id', getMoneyReciptById);
router.post('/api/money-receipts', saveMoneyRecipt);
router.patch('/api/money-receipts/:id', updateMoneyRecipt); // Patch is uses for update in node js
router.delete('/api/money-receipts/:id', deleteMoneyRecipt);

export default router;