import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const ExpenseChart = ({
    transactions,
}) => {

    const categoryData = {};

    transactions
        .filter(
            (transaction) =>
                transaction.type === "expense"
        )
        .forEach((transaction) => {

            const category =
                transaction.category;

            if (!categoryData[category]) {
                categoryData[category] = 0;
            }

            categoryData[category] +=
                transaction.amount;
        });

    const chartData = Object.entries(
        categoryData
    ).map(
        ([name, value]) => ({
            name,
            value,
        })
    );

    return (
        <div className="chart-card">

            <div className="chart-header">

                <div>
                    <h2>
                        Expenses by Category
                    </h2>

                    <p>
                        See where your money is going
                    </p>
                </div>

                <div className="chart-icon">
                    💸
                </div>

            </div>

            {chartData.length === 0 ? (
                <div className="chart-empty">

                    <div>💸</div>

                    <p>
                        No expense data available.
                    </p>

                </div>
            ) : (
                <ResponsiveContainer
                    width="100%"
                    height={350}
                >
                    <PieChart>

                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={110}
                            label
                        >

                            {chartData.map(
                                (entry, index) => (
                                    <Cell
                                        key={
                                            `cell-${index}`
                                        }
                                        fill={[
                                            "#2563eb",
                                            "#16a34a",
                                            "#dc2626",
                                            "#9333ea",
                                            "#ea580c",
                                            "#0891b2",
                                        ][
                                            index %
                                            6
                                        ]}
                                    />
                                )
                            )}

                        </Pie>

                        <Tooltip
                            formatter={(value) =>
                                `₹ ${value}`
                            }
                        />

                        <Legend />

                    </PieChart>
                </ResponsiveContainer>
            )}

        </div>
    );
};

export default ExpenseChart;