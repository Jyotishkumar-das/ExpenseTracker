const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
    addTransaction,
    getTransactions,
    getSummary,
    updateTransaction,
    deleteTransaction,
} = require("../controllers/transactionController");

const router = express.Router();


// ================= ADD TRANSACTION =================

router.post("/", protect, addTransaction);


// ================= GET ALL TRANSACTIONS =================

router.get("/", protect, getTransactions);


// ================= GET DASHBOARD SUMMARY =================

router.get("/summary", protect, getSummary);


// ================= UPDATE TRANSACTION =================

router.put("/:id", protect, updateTransaction);


// ================= DELETE TRANSACTION =================

router.delete("/:id", protect, deleteTransaction);


module.exports = router;