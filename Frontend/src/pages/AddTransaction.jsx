import { useState } from "react";
import api from "../services/api";

const AddTransaction = ({ onTransactionAdded }) => {
    const [formData, setFormData] = useState({
        type: "expense",
        amount: "",
        category: "",
        description: "",
        date: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // ================= HANDLE CHANGE =================

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setMessage("");
        setError("");
    };

    // ================= SUBMIT =================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!formData.amount) {
            setError("Please enter an amount");
            return;
        }

        if (Number(formData.amount) <= 0) {
            setError("Amount must be greater than 0");
            return;
        }

        if (!formData.category.trim()) {
            setError("Please enter a category");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post(
                "/transactions",
                {
                    type: formData.type,
                    amount: Number(formData.amount),
                    category: formData.category.trim(),
                    description:
                        formData.description.trim(),
                    date: formData.date || undefined,
                }
            );

            setMessage(
                response.data.message
            );

            // Reset form

            setFormData({
                type: "expense",
                amount: "",
                category: "",
                description: "",
                date: "",
            });

            // Refresh dashboard

            if (onTransactionAdded) {
                onTransactionAdded();
            }
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to add transaction"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="transaction-form-card">

            {/* HEADER */}

            <div className="transaction-form-header">

                <div>
                    <h2>
                        Add Transaction
                    </h2>

                    <p>
                        Record your income or expense
                    </p>
                </div>

                <div className="transaction-form-icon">
                    ➕
                </div>

            </div>

            {/* MESSAGES */}

            {message && (
                <p className="success-message">
                    {message}
                </p>
            )}

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {/* FORM */}

            <form
                className="transaction-form"
                onSubmit={handleSubmit}
            >

                {/* TYPE */}

                <div className="form-group">

                    <label>
                        Transaction Type
                    </label>

                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option value="expense">
                            Expense
                        </option>

                        <option value="income">
                            Income
                        </option>
                    </select>

                </div>

                {/* AMOUNT */}

                <div className="form-group">

                    <label>
                        Amount
                    </label>

                    <input
                        type="number"
                        name="amount"
                        placeholder="Enter amount"
                        value={formData.amount}
                        onChange={handleChange}
                        min="1"
                        step="0.01"
                        required
                    />

                </div>

                {/* CATEGORY */}

                <div className="form-group">

                    <label>
                        Category
                    </label>

                    <input
                        type="text"
                        name="category"
                        placeholder="e.g. Food, Salary, Travel"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />

                </div>

                {/* DESCRIPTION */}

                <div className="form-group">

                    <label>
                        Description
                    </label>

                    <input
                        type="text"
                        name="description"
                        placeholder="Enter description"
                        value={
                            formData.description
                        }
                        onChange={handleChange}
                    />

                </div>

                {/* DATE */}

                <div className="form-group">

                    <label>
                        Date
                    </label>

                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />

                </div>

                {/* BUTTON */}

                <button
                    type="submit"
                    className="add-transaction-btn"
                    disabled={loading}
                >
                    {loading
                        ? "Adding..."
                        : "Add Transaction"}
                </button>

            </form>
        </div>
    );
};

export default AddTransaction;