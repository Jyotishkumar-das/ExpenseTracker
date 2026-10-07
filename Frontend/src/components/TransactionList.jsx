import { useEffect, useState } from "react";
import api from "../services/api";

const TransactionList = ({
    refresh,
    onTransactionUpdated,
    filters,
}) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editingTransaction, setEditingTransaction] =
        useState(null);

    // ================= GET TRANSACTIONS =================

    const getTransactions = async () => {
        try {
            setLoading(true);
            setError("");

            const params = {};

            if (filters?.search) {
                params.search = filters.search;
            }

            if (filters?.type) {
                params.type = filters.type;
            }

            if (filters?.category) {
                params.category = filters.category;
            }

            if (filters?.startDate) {
                params.startDate = filters.startDate;
            }

            if (filters?.endDate) {
                params.endDate = filters.endDate;
            }

            const response = await api.get(
                "/transactions",
                {
                    params,
                }
            );

            setTransactions(
                response.data.transactions
            );
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to load transactions"
            );
        } finally {
            setLoading(false);
        }
    };

    // ================= LOAD =================

    useEffect(() => {
        getTransactions();
    }, [refresh, filters]);

    // ================= DELETE =================

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(
                `/transactions/${id}`
            );

            setTransactions(
                (previousTransactions) =>
                    previousTransactions.filter(
                        (transaction) =>
                            transaction._id !== id
                    )
            );

            if (onTransactionUpdated) {
                onTransactionUpdated();
            }
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to delete transaction"
            );
        }
    };

    // ================= EDIT =================

    const handleEdit = (transaction) => {
        setEditingTransaction({
            ...transaction,
            date: transaction.date
                ? transaction.date.substring(0, 10)
                : "",
        });
    };

    // ================= EDIT CHANGE =================

    const handleEditChange = (e) => {
        setEditingTransaction({
            ...editingTransaction,
            [e.target.name]: e.target.value,
        });
    };

    // ================= UPDATE =================

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await api.put(
                `/transactions/${editingTransaction._id}`,
                {
                    type: editingTransaction.type,

                    amount: Number(
                        editingTransaction.amount
                    ),

                    category:
                        editingTransaction.category,

                    description:
                        editingTransaction.description,

                    date: editingTransaction.date,
                }
            );

            setTransactions(
                (previousTransactions) =>
                    previousTransactions.map(
                        (transaction) =>
                            transaction._id ===
                                editingTransaction._id
                                ? response.data.transaction
                                : transaction
                    )
            );

            setEditingTransaction(null);

            if (onTransactionUpdated) {
                onTransactionUpdated();
            }
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to update transaction"
            );
        }
    };

    // ================= LOADING =================

    if (loading) {
        return (
            <div className="transaction-list-card">
                <p>
                    Loading transactions...
                </p>
            </div>
        );
    }

    // ================= UI =================

    return (
        <div className="transaction-list-card">

            {/* HEADER */}

            <div className="transaction-list-header">

                <div>
                    <h2>
                        Transactions
                    </h2>

                    <p>
                        Your income and expense history
                    </p>
                </div>

                <div className="transaction-count">
                    {transactions.length}
                </div>

            </div>

            {/* ERROR */}

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {/* EMPTY */}

            {transactions.length === 0 ? (
                <div className="no-transactions">
                    <div className="empty-icon">
                        📭
                    </div>

                    <h3>
                        No transactions found
                    </h3>

                    <p>
                        Try changing your filters
                        or add a new transaction.
                    </p>
                </div>
            ) : (
                <div className="table-container">

                    <table>

                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {transactions.map(
                                (transaction) => (
                                    <tr
                                        key={
                                            transaction._id
                                        }
                                    >

                                        {/* TYPE */}

                                        <td>
                                            <span
                                                className={
                                                    transaction.type ===
                                                        "income"
                                                        ? "transaction-type income"
                                                        : "transaction-type expense"
                                                }
                                            >
                                                {transaction.type ===
                                                    "income"
                                                    ? "Income"
                                                    : "Expense"}
                                            </span>
                                        </td>

                                        {/* AMOUNT */}

                                        <td>
                                            <strong
                                                className={
                                                    transaction.type ===
                                                        "income"
                                                        ? "income-amount"
                                                        : "expense-amount"
                                                }
                                            >
                                                {transaction.type ===
                                                    "income"
                                                    ? "+"
                                                    : "-"}{" "}
                                                ₹{" "}
                                                {
                                                    transaction.amount
                                                }
                                            </strong>
                                        </td>

                                        {/* CATEGORY */}

                                        <td>
                                            <span className="category-badge">
                                                {
                                                    transaction.category
                                                }
                                            </span>
                                        </td>

                                        {/* DESCRIPTION */}

                                        <td>
                                            {
                                                transaction.description ||
                                                "-"
                                            }
                                        </td>

                                        {/* DATE */}

                                        <td>
                                            {new Date(
                                                transaction.date
                                            ).toLocaleDateString(
                                                "en-IN"
                                            )}
                                        </td>

                                        {/* ACTION */}

                                        <td>
                                            <div className="action-buttons">

                                                <button
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        handleEdit(
                                                            transaction
                                                        )
                                                    }
                                                >
                                                    ✏️ Edit
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        handleDelete(
                                                            transaction._id
                                                        )
                                                    }
                                                >
                                                    🗑️ Delete
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                )
                            )}

                        </tbody>

                    </table>

                </div>
            )}

            {/* ================= EDIT FORM ================= */}

            {editingTransaction && (
                <div className="edit-form-card">

                    <div className="edit-form-header">
                        <h2>
                            Edit Transaction
                        </h2>

                        <button
                            type="button"
                            className="close-edit-btn"
                            onClick={() =>
                                setEditingTransaction(
                                    null
                                )
                            }
                        >
                            ✕
                        </button>
                    </div>

                    <form
                        onSubmit={handleUpdate}
                        className="edit-transaction-form"
                    >

                        <div className="form-group">
                            <label>
                                Transaction Type
                            </label>

                            <select
                                name="type"
                                value={
                                    editingTransaction.type
                                }
                                onChange={
                                    handleEditChange
                                }
                            >
                                <option value="expense">
                                    Expense
                                </option>

                                <option value="income">
                                    Income
                                </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>
                                Amount
                            </label>

                            <input
                                type="number"
                                name="amount"
                                value={
                                    editingTransaction.amount
                                }
                                onChange={
                                    handleEditChange
                                }
                                min="1"
                                step="0.01"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Category
                            </label>

                            <input
                                type="text"
                                name="category"
                                value={
                                    editingTransaction.category
                                }
                                onChange={
                                    handleEditChange
                                }
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Description
                            </label>

                            <input
                                type="text"
                                name="description"
                                value={
                                    editingTransaction.description ||
                                    ""
                                }
                                onChange={
                                    handleEditChange
                                }
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                Date
                            </label>

                            <input
                                type="date"
                                name="date"
                                value={
                                    editingTransaction.date
                                }
                                onChange={
                                    handleEditChange
                                }
                            />
                        </div>

                        <div className="edit-actions">

                            <button
                                type="submit"
                                className="update-btn"
                            >
                                ✓ Update
                            </button>

                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={() =>
                                    setEditingTransaction(
                                        null
                                    )
                                }
                            >
                                Cancel
                            </button>

                        </div>

                    </form>

                </div>
            )}

        </div>
    );
};

export default TransactionList;