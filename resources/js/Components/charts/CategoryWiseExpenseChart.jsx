import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

// REGISTER CHART
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function CategoryWiseExpenseChart({ CategoryWiseExpense }) {
    const labels = CategoryWiseExpense.map((item) => item["name"]);
    const expenses = CategoryWiseExpense.map((item) => Number(item["total"]));

    const totalExpense = expenses.reduce((acc, curr) => acc + curr, 0);

    const data = {
        labels,
        datasets: [
            {
                label: "Category-wise Expenses",
                data: expenses,
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                    "#8D6E63",
                    "#4A148C",
                    "#1B5E20",
                    "#FF1744",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "right",
            },
            datalabels: {
                color: "#fff",
                font: { weight: "bold" },
                formatter: (value) =>
                    `${((value / totalExpense) * 100).toFixed(1)}%`,
            },
        },
        layout: {
            padding: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            },
        },
    };

    return (
        <div style={{ width: "100%", height: "280px", padding: "10px" }}>
            <Doughnut data={data} options={options} />
        </div>
    );
}
