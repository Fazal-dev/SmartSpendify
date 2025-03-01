import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    PointElement,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// REGISTER CHART
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    PointElement
);

export default function ExpenseTrendChart({ expenseData }) {
    const labels = expenseData.map((item) => item["month"]);
    const expenses = expenseData.map((item) => item["expenses"]);

    const data = {
        labels,
        datasets: [
            {
                label: "Monthly Expenses",
                data: expenses,
                fill: false,
                borderColor: "rgba(75, 192, 192, 1)",
                tension: 0.1,
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                ticks: {
                    precision: 0,
                },
            },
        },
    };
    return <Line data={data} options={options} />;
}
