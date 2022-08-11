import express from "express";
import {
    getBanks,
    getBankById,
    saveBank,
    updateBank,
    deleteBank
} from "../controllers/BankController.js";

const router = express.Router();

router.get('/api/banks', getBanks);
router.get('/api/banks/:id', getBankById);
router.post('/api/banks', saveBank);
router.patch('/api/banks/:id', updateBank); // Patch is uses for update in node js
router.delete('/api/banks/:id', deleteBank);

export default router;