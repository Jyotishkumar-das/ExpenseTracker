import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

import Sidebar from "../components/Sidebar";

import AddTransaction from "../components/AddTransaction";
import TransactionList from "../components/TransactionList";
import TransactionFilters from "../components/TransactionFilters";
import ExpenseChart from "../components/ExpenseChart";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import MonthlyChart from "../components/MonthlyChart";

const Dashboard = () => {
    const { user } = useAuth();

    const [summary, setSummary] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        transactionCount: 0,
    });

    const [transactions, setTransactions] = useState([]);

    const [filters, setFilters] = useState({});

    const [refresh, setRefresh] = useState(0);

    const [loading, setLoading] = useState(true);

    // ================= GET DASHBOARD DATA =================

    const getDashboardData = async () => {
        try {
            setLoading(true);

            // Get summary
            const summaryResponse = await api.get(
                "/transactions/summary"
            );

            setSummary(summaryResponse.data);

            // Get transactions
            const transactionResponse = await api.get(
                "/transactions"
            );

            setTransactions(
                transactionResponse.data.transactions
            );
        } catch (error) {
            console.error(
                "Error fetching dashboard data:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    // ================= LOAD DATA =================

    useEffect(() => {
        getDashboardData();
    }, [refresh]);

    // ================= REFRESH =================

    const handleTransactionUpdated = () => {
        setRefresh(
            (previous) => previous + 1
        );
    };

    // ================= LOADING =================

    if (loading) {
        return (
            <div className="dashboard-loading">
                Loading Dashboard...
            </div>
        );
    }

    // ================= UI =================

    return (
        <div className="dashboard-layout">

            {/* ================= SIDEBAR ================= */}

            <Sidebar />

            {/* ================= MAIN CONTENT ================= */}

            <main className="dashboard-main">

                <div className="dashboard-content">

                    {/* ================= HEADER ================= */}

                    <div className="dashboard-header">
                        <div>
                            <h1>
                                Dashboard
                            </h1>

                            <p className="dashboard-welcome">
                                Welcome back,{" "}
                                <strong>
                                    {user?.name}
                                </strong>{" "}
                                👋
                            </p>
                        </div>
                    </div>

                    {/* ================= BALANCE STATUS ================= */}

                    <div className="balance-status">
                        {summary.balance >= 0 ? (
                            <p className="positive-balance">
                                🎉 Your current balance
                                is positive.
                            </p>
                        ) : (
                            <p className="negative-balance">
                                ⚠️ Your expenses are
                                higher than your income.
                            </p>
                        )}
                    </div>

                    {/* ================= SUMMARY CARDS ================= */}

                    <div className="summary-container">

                        {/* TOTAL INCOME */}

                        <div className="summary-card income-card">

                            <div className="summary-icon">
                                💰
                            </div>

                            <div className="summary-info">
                                <h3>
                                    Total Income
                                </h3>

                                <p>
                                    ₹{" "}
                                    {summary.totalIncome}
                                </p>
                            </div>

                        </div>

                        {/* TOTAL EXPENSE */}

                        <div className="summary-card expense-card">

                            <div className="summary-icon">
                                💸
                            </div>

                            <div className="summary-info">
                                <h3>
                                    Total Expense
                                </h3>

                                <p>
                                    ₹{" "}
                                    {summary.totalExpense}
                                </p>
                            </div>

                        </div>

                        {/* BALANCE */}

                        <div
                            className={`summary-card ${summary.balance >= 0
                                    ? "balance-positive"
                                    : "balance-negative"
                                }`}
                        >

                            <div className="summary-icon">
                                💵
                            </div>

                            <div className="summary-info">
                                <h3>
                                    Balance
                                </h3>

                                <p>
                                    ₹{" "}
                                    {summary.balance}
                                </p>
                            </div>

                        </div>

                        {/* TRANSACTIONS */}

                        <div className="summary-card transaction-card">

                            <div className="summary-icon">
                                📊
                            </div>

                            <div className="summary-info">
                                <h3>
                                    Transactions
                                </h3>

                                <p>
                                    {
                                        summary.transactionCount
                                    }
                                </p>
                            </div>

                        </div>

                    </div>

                    {/* ================= ADD TRANSACTION ================= */}

                    <AddTransaction
                        onTransactionAdded={
                            handleTransactionUpdated
                        }
                    />

                    {/* ================= FILTER ================= */}

                    <TransactionFilters
                        onFilter={setFilters}
                    />

                    {/* ================= TRANSACTIONS ================= */}

                    <TransactionList
                        refresh={refresh}
                        onTransactionUpdated={
                            handleTransactionUpdated
                        }
                        filters={filters}
                    />

                    {/* ================= CHARTS ================= */}

                    <div className="charts-container">

                        {/* INCOME VS EXPENSE */}

                        <IncomeExpenseChart
                            totalIncome={
                                summary.totalIncome
                            }
                            totalExpense={
                                summary.totalExpense
                            }
                        />

                        {/* EXPENSE BY CATEGORY */}

                        <ExpenseChart
                            transactions={
                                transactions
                            }
                        />

                        {/* MONTHLY CHART */}

                        <MonthlyChart
                            transactions={
                                transactions
                            }
                        />

                    </div>

                </div>

            </main>

        </div>
    );
};

export default Dashboard;