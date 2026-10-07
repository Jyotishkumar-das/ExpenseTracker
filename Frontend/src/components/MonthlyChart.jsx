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

const MonthlyChart = ({
    transactions,
}) => {

    const monthlyData = {};

    transactions.forEach(
        (transaction) => {

            const date = new Date(
                transaction.date
            );

            const month =
                date.toLocaleString(
                    "default",
                    {
                        month: "short",
                    }
                );

            if (!monthlyData[month]) {
                monthlyData[month] = {
                    name: month,
                    Income: 0,
                    Expense: 0,
                };
            }

            if (
                transaction.type ===
                "income"
            ) {
                monthlyData[month].Income +=
                    transaction.amount;
            }

            if (
                transaction.type ===
                "expense"
            ) {
                monthlyData[month].Expense +=
                    transaction.amount;
            }
        }
    );

    const chartData =
        Object.values(monthlyData);

    return (
        <div className="chart-card monthly-chart-card">

            <div className="chart-header">

                <div>
                    <h2>
                        Monthly Income & Expense
                    </h2>

                    <p>
                        Track your financial activity by month
                    </p>
                </div>

                <div className="chart-icon">
                    📅
                </div>

            </div>

            {chartData.length === 0 ? (
                <div className="chart-empty">

                    <div>📅</div>

                    <p>
                        No monthly transaction
                        data available.
                    </p>

                </div>
            ) : (
                <ResponsiveContainer
                    width="100%"
                    height={350}
                >
                    <BarChart
                        data={chartData}
                    >

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

export default MonthlyChart;