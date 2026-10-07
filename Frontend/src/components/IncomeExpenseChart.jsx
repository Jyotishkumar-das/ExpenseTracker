import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const IncomeExpenseChart = ({
    totalIncome,
    totalExpense,
}) => {
    const data = [
        {
            name: "Money",
            Income: totalIncome,
            Expense: totalExpense,
        },
    ];

    return (
        <div className="chart-card">

            <div className="chart-header">

                <div>
                    <h2>
                        Income vs Expense
                    </h2>

                    <p>
                        Compare your total income and expenses
                    </p>
                </div>

                <div className="chart-icon">
                    📊
                </div>

            </div>

            {totalIncome === 0 &&
                totalExpense === 0 ? (
                <div className="chart-empty">
                    <div>📊</div>

                    <p>
                        No income or expense data
                        available.
                    </p>
                </div>
            ) : (
                <ResponsiveContainer
                    width="100%"
                    height={350}
                >
                    <BarChart data={data}>
                        <CartesianGrid />

                        <XAxis
                            dataKey="name"
                        />

                        <YAxis />

                        <Tooltip
                            formatter={(value) =>
                                `₹ ${value}`
                            }
                        />

                        <Legend />

                        <Bar
                            dataKey="Income"
                            fill="#16a34a"
                            radius={[
                                6,
                                6,
                                0,
                                0,
                            ]}
                        />

                        <Bar
                            dataKey="Expense"
                            fill="#dc2626"
                            radius={[
                                6,
                                6,
                                0,
                                0,
                            ]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            )}

        </div>
    );
};

export default IncomeExpenseChart;