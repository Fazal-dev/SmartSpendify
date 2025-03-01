import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { CalendarIcon, HandCoins, WalletIcon } from "lucide-react";
import ExpenseTrendChart from "@/Components/charts/ExpenseTrendChart";
import SummaryCard from "@/Components/SummaryCard";
import CategoryWiseExpenseChart from "@/Components/charts/CategoryWiseExpenseChart";
import { CountUp } from "countup.js";
import { useEffect } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export default function Dashboard({
    totalTodayExpenses,
    totalMonthExpenses,
    expensesMonthlyTrend,
    categoryWiseExpenses,
    recentExpenses,
    topCategories,
}) {
    const data = [
        {
            text: "Month Expenses",
            total: totalMonthExpenses,
            icon: <CalendarIcon />,
            id: "month-expenses",
        },
        {
            text: "Today Expenses",
            total: totalTodayExpenses,
            icon: <WalletIcon />,
            id: "today-expenses",
        },
        {
            text: "Saving",
            total: "3,700",
            icon: <HandCoins />,
            id: "saving-expenses",
        },
    ];

    useEffect(() => {
        data.forEach((item) => {
            const options = {
                duration: 1,
                suffix: ".00",
            };
            const totalValue = String(item.total).replace(/[^0-9.]/g, "");

            const countUp = new CountUp(item.id, totalValue, options);

            if (!countUp.error) {
                countUp.start();
            } else {
                console.error(countUp.error);
            }
        });
    }, [data]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-1 gap-4">
                                {data.map((item, index) => (
                                    <SummaryCard
                                        key={index}
                                        text={item.text}
                                        total={item.total}
                                        id={item.id}
                                    >
                                        {item.icon}
                                    </SummaryCard>
                                ))}
                            </div>

                            {/* charts section */}
                            <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 py-4">
                                <div className="p-2 bg-white rounded-xl shadow-md">
                                    <h3 className="text-lg font-semibold">
                                        Expenses Trend
                                    </h3>
                                    <div className="mt-4 bg-gray-100 rounded-md flex items-center justify-center">
                                        <ExpenseTrendChart
                                            expenseData={expensesMonthlyTrend}
                                        />
                                    </div>
                                </div>
                                <div className="p-4 bg-white rounded-xl shadow-md col-span-1">
                                    <h3 className="text-lg font-semibold">
                                        Category Distribution
                                    </h3>
                                    <div className="mt-4  bg-gray-100 rounded-md flex items-center justify-center">
                                        <CategoryWiseExpenseChart
                                            CategoryWiseExpense={
                                                categoryWiseExpenses
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* charts section  end*/}

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="p-4 bg-white rounded-xl shadow-md">
                                    <h3 className="text-lg font-semibold">
                                        Recent Expenses
                                    </h3>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>#</TableHead>
                                                <TableHead>
                                                    Description
                                                </TableHead>
                                                <TableHead>Category</TableHead>
                                                <TableHead className=" text-right ">
                                                    Amount
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {recentExpenses.length != 0 ? (
                                                recentExpenses.map(
                                                    (expense, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell>
                                                                {index + 1}
                                                            </TableCell>
                                                            <TableCell>
                                                                {
                                                                    expense.description
                                                                }
                                                            </TableCell>
                                                            <TableCell>
                                                                <span
                                                                    className={
                                                                        "px-2 py-1 text-sm font-medium rounded-md bg-green-100 text-green-600"
                                                                    }
                                                                >
                                                                    {
                                                                        expense.category
                                                                    }
                                                                </span>
                                                            </TableCell>
                                                            <TableCell className=" text-right ">
                                                                {expense.amount}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )
                                            ) : (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan="4"
                                                        className="text-center font-medium text-gray-500"
                                                    >
                                                        <div className="py-4">
                                                            <p className="text-lg">
                                                                No expenses
                                                                found
                                                            </p>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                                <div className="p-4 bg-white rounded-xl shadow-md">
                                    <h3 className="text-lg font-semibold">
                                        Top spending category
                                    </h3>

                                    {topCategories &&
                                    topCategories.length != 0 ? (
                                        <ul className="mt-2 space-y-2">
                                            <li className="p-2 bg-gray-100 rounded-md">
                                                🥇{" "}
                                                {
                                                    topCategories[0]
                                                        ?.category_name
                                                }
                                            </li>
                                            <li className="p-2 bg-gray-200 rounded-md">
                                                🥈{" "}
                                                {
                                                    topCategories[1]
                                                        ?.category_name
                                                }
                                            </li>
                                            <li className="p-2 bg-gray-300 rounded-md">
                                                🥉{" "}
                                                {
                                                    topCategories[2]
                                                        ?.category_name
                                                }
                                            </li>
                                        </ul>
                                    ) : (
                                        <ul className="mt-2 space-y-2">
                                            <li className="p-2 bg-gray-300 rounded-md text-center">
                                                No top spending categories yet
                                            </li>
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
