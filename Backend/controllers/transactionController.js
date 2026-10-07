const Transaction = require("../models/Transaction");

// ================= ADD TRANSACTION =================

const addTransaction = async (req, res) => {
    try {
        const { type, amount, category, description, date } = req.body;

        if (!type || !amount || !category) {
            return res.status(400).json({
                message: "Type, amount and category are required",
            });
        }

        const transaction = await Transaction.create({
            user: req.user._id,
            type,
            amount,
            category,
            description,
            date: date || new Date(),
        });

        res.status(201).json({
            message: "Transaction added successfully",
            transaction,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};


// ================= GET ALL TRANSACTIONS =================

const getTransaction = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            user: req.user._id,
        }).sort({ date: -1 });

        res.status(200).json({
            count: transactions.length,
            transactions,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};


// ================= GET DASHBOARD SUMMARY =================

const getSummary = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            user: req.user._id,
        });

        const totalIncome = transactions
            .filter((transaction) => transaction.type === "income")
            .reduce(
                (total, transaction) => total + transaction.amount,
                0
            );

        const totalExpense = transactions
            .filter((transaction) => transaction.type === "expense")
            .reduce(
                (total, transaction) => total + transaction.amount,
                0
            );

        const balance = totalIncome - totalExpense;

        res.status(200).json({
            totalIncome,
            totalExpense,
            balance,
            transactionCount: transactions.length,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};


// ================= UPDATE TRANSACTION =================

const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        const transaction = await Transaction.findOne({
            _id: id,
            user: req.user._id,
        });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found",
            });
        }

        const {
            type,
            amount,
            category,
            description,
            date,
        } = req.body;

        if (type !== undefined) {
            transaction.type = type;
        }

        if (amount !== undefined) {
            transaction.amount = amount;
        }

        if (category !== undefined) {
            transaction.category = category;
        }

        if (description !== undefined) {
            transaction.description = description;
        }

        if (date !== undefined) {
            transaction.date = date;
        }

        const updatedTransaction = await transaction.save();

        res.status(200).json({
            message: "Transaction updated successfully",
            transaction: updatedTransaction,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};


// ================= DELETE TRANSACTION =================

const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        const transaction = await Transaction.findOneAndDelete({
            _id: id,
            user: req.user._id,
        });

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found",
            });
        }

        res.status(200).json({
            message: "Transaction deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

// ================= GET / SEARCH / FILTER TRANSACTIONS =================

const getTransactions = async (req, res) => {
    try {
        const {
            search,
            type,
            category,
            startDate,
            endDate,
        } = req.query;

        const filter = {
            user: req.user._id,
        };

        // Income / Expense filter
        if (type) {
            filter.type = type;
        }

        // Category filter
        if (category) {
            filter.category = category;
        }

        // Search by category or description
        if (search) {
            filter.$or = [
                {
                    category: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    description: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        // Date filter
        if (startDate || endDate) {
            filter.date = {};

            if (startDate) {
                filter.date.$gte = new Date(`${startDate}T00:00:00.000Z`);
            }

            if (endDate) {
                filter.date.$lte = new Date(`${endDate}T23:59:59.999Z`);
            }
        }

        const transactions = await Transaction.find(filter).sort({
            date: -1,
        });

        res.status(200).json({
            count: transactions.length,
            transactions,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};
// ================= EXPORT =================

module.exports = {
    addTransaction,
    getTransactions,
    getSummary,
    updateTransaction,
    deleteTransaction,
};