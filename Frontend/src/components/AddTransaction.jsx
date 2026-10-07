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

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {
            const response = await api.post(
                "/transactions",
                {
                    ...formData,
                    amount: Number(formData.amount),
                }
            );

            setMessage(response.data.message);

            setFormData({
                type: "expense",
                amount: "",
                category: "",
                description: "",
                date: "",
            });

            if (onTransactionAdded) {
                onTransactionAdded();
            }
        } catch (error) {
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

            <h2>Add Transaction</h2>

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

            <form onSubmit={handleSubmit}>

                <label>Transaction Type</label>

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

                <label>Amount</label>

                <input
                    type="number"
                    name="amount"
                    placeholder="Enter amount"
                    value={formData.amount}
                    onChange={handleChange}
                    min="1"
                    required
                />

                <label>Category</label>

                <input
                    type="text"
                    name="category"
                    placeholder="e.g. Food, Salary, Travel"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />

                <label>Description</label>

                <input
                    type="text"
                    name="description"
                    placeholder="Enter description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <label>Date</label>

                <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />

                <button
                    type="submit"
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