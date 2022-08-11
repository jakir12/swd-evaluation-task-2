import express from "express";
import {
    getIndex, 
    getCustomers,
    getCustomerById,
    saveCustomer,
    updateCustomer,
    deleteCustomer
} from "../controllers/CustomerController.js";

const router = express.Router();


router.get('/api/customers', getCustomers);
router.get('/api/customers/:id', getCustomerById);
router.post('/api/customers', saveCustomer);
router.patch('/api/customers/:id', updateCustomer); // Patch is uses for update in node js
router.delete('/api/customers/:id', deleteCustomer);

export default router;