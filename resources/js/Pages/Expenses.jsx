import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import PrimaryButton from "@/Components/PrimaryButton";
import { Button } from "@/components/ui/button";

import { Head, router } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from "@/components/ui/table";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    FileDown,
    Filter,
    FilterX,
    Plus,
    SquarePen,
    Trash2,
} from "lucide-react";

import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import ExpenseModal from "@/Components/ExpenseModal";
import BudgetModal from "@/Components/BudgetModal";

export default function Expenses({ expenses, totalAmount, categories, flash }) {
    const [isModalVisible, setModalVisible] = useState(false);
    // budget modal
    const [isPopupVisible, setisPopupVisible] = useState(false);
    const [budget, setBudget] = useState(0);
    const [modalMode, setModalMode] = useState("add");
    const [editRecord, setEditRecord] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [category_id, setCategory] = useState(null);
    const [isFilterReset, setIsFilterReset] = useState(false);

    const handleExport = () => {
        axios
            .get(route("expenses.export"), {
                params: {
                    start_date: startDate,
                    end_date: endDate,
                    category: category_id,
                },
                responseType: "blob",
            })
            .then((response) => {
                const blob = new Blob([response.data], {
                    type: "application/pdf",
                });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "filtered_expenses.pdf");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            })
            .catch((error) => {
                console.error("Error downloading PDF:", error);
            });
    };

    const fetchFilterExpenses = () => {
        router.get(
            route("expenses.index"),
            {
                start_date: startDate,
                end_date: endDate,
                category: category_id,
            },
            {
                preserveState: true,
                replace: true,
            }
        );
    };

    const handleFilter = () => {
        if (category_id || startDate || endDate) {
            fetchFilterExpenses();
        }
    };

    const handleFilterCancel = () => {
        setCategory(null);
        setEndDate(null);
        setStartDate(null);
        setIsFilterReset(true);
    };

    const openAddModal = () => {
        setModalMode("add");
        setEditRecord(null);
        setModalVisible(true);
    };

    const openEditModal = (expense) => {
        setModalMode("edit");
        setEditRecord(expense);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalMode("add");
    };

    const closeBudgetModal = () => {
        setisPopupVisible(false);
        fetchBudget();
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this expense?")) {
            router.delete(route("expenses.destroy", id));
        }
    };

    const notify = () => {
        toast.success(flash.success, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };
    // start date
    const handleDateChange = (selectedDate) => {
        if (selectedDate) {
            const formattedDate = format(selectedDate, "yyyy-MM-dd");
            setStartDate(formattedDate);
        }
    };

    const handleEndDateChange = (selectedDate) => {
        if (selectedDate) {
            const formattedDate = format(selectedDate, "yyyy-MM-dd");
            setEndDate(formattedDate);
        }
    };

    const fetchBudget = () => {
        axios
            .get("/checkBudget", {})
            .then((response) => {
                if (response.data.budget == null) {
                    setisPopupVisible(true);
                } else {
                    setisPopupVisible(false);
                    setBudget(response.data.budget);
                }
            })
            .catch((error) => {
                console.error("Error get  budget:", error);
            });
    };

    useEffect(() => {
        notify();

        fetchBudget();
    }, [totalAmount, flash.success]);

    useEffect(() => {
        if (isFilterReset) {
            fetchFilterExpenses();
            setIsFilterReset(false);
        }
    }, [isFilterReset]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Expenses
                </h2>
            }
        >
            <Head title="Expenses" />

            <ExpenseModal
                isModalVisible={isModalVisible}
                closeModal={closeModal}
                mode={modalMode}
                record={editRecord}
                categories={categories}
            />

            {/* filter section start */}
            <div className="px-0 sm:px-12  my-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-20 ">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-3 pt-3">
                        <div className="p-4 ">
                            {" "}
                            {/* start date */}
                            <Popover className="w-full">
                                <PopoverTrigger asChild className="w-full">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                    >
                                        {startDate
                                            ? format(startDate, "PPP")
                                            : "Start date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-full min-w-[var(--radix-popper-anchor-width)] p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={new Date(startDate)}
                                        onSelect={handleDateChange}
                                        className="rounded-md border w-full"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className=" p-4 ">
                            {" "}
                            {/* end date */}
                            <Popover className="w-full">
                                <PopoverTrigger asChild className="w-full">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                    >
                                        {endDate
                                            ? format(endDate, "PPP")
                                            : "End date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-full min-w-[var(--radix-popper-anchor-width)] p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={new Date(endDate)}
                                        onSelect={handleEndDateChange}
                                        className="rounded-md border w-full"
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        {/* category selection start*/}
                        <div className=" p-4 ">
                            <Select
                                value={
                                    categories.find(
                                        (cat) => cat.id === category_id
                                    )?.name || ""
                                }
                                onValueChange={(categoryName) => {
                                    const selectedCategory = categories.find(
                                        (cat) => cat.name === categoryName
                                    );
                                    if (selectedCategory) {
                                        setCategory(selectedCategory.id);
                                    }
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories &&
                                        categories.map((category, index) => (
                                            <SelectItem
                                                key={index}
                                                value={category.name}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {/* category selection end*/}
                        <div className="p-4  px-1">
                            {" "}
                            <PrimaryButton
                                className="mx-1"
                                onClick={handleFilter}
                                title="Filter Expenses"
                            >
                                <Filter size={20} />
                            </PrimaryButton>{" "}
                            <PrimaryButton
                                onClick={() => handleFilterCancel()}
                                className="mx-1"
                                title="Reset Filter"
                            >
                                <FilterX size={20} />
                            </PrimaryButton>
                            <Button
                                onClick={handleExport}
                                className="mx-1"
                                title="Export Expenses"
                                variant={"outline"}
                            >
                                <FileDown size={20} />
                            </Button>
                        </div>

                        <div className=" p-4 ">
                            <PrimaryButton onClick={openAddModal}>
                                <Plus className="mr-2" />
                                Add Expenses
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
            {/* filter section end */}

            <div className="py-3">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-20">
                    <div className="w-full overflow-x-auto rounded-lg shadow-md bg-white">
                        <div className="flex justify-end p-4">
                            <h3 className="text-lg font-semibold text-red-400">
                                <span className="text-black">
                                    Total Budget:{" "}
                                </span>
                                {budget}
                            </h3>
                        </div>

                        <div className="p-8 text-gray-900">
                            <Table className="w-full min-w-[600px] border border-gray-200">
                                {expenses.length !== 0 ? (
                                    <TableCaption>
                                        A list of your recent Expenses
                                    </TableCaption>
                                ) : (
                                    ""
                                )}

                                <TableHeader>
                                    <TableRow>
                                        <TableHead className=" text-right ">
                                            #
                                        </TableHead>
                                        <TableHead className="text-right">
                                            Date
                                        </TableHead>
                                        <TableHead className="text-center">
                                            Description
                                        </TableHead>
                                        <TableHead className="text-right">
                                            Category
                                        </TableHead>
                                        <TableHead className="text-right">
                                            Amount
                                        </TableHead>

                                        <TableHead className="text-center">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {expenses.length !== 0 ? (
                                        expenses.map((expense, i) => (
                                            <TableRow key={i}>
                                                <TableCell className="font-medium text-right">
                                                    {i + 1}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {expense.date}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    {" "}
                                                    {expense.description}
                                                </TableCell>

                                                <TableCell className="text-right">
                                                    {" "}
                                                    <span
                                                        className={
                                                            "px-2 py-1 text-sm font-medium rounded-md bg-green-100 text-green-600"
                                                        }
                                                    >
                                                        {expense.category.name}
                                                    </span>
                                                </TableCell>

                                                <TableCell className="text-right">
                                                    {expense.amount}
                                                </TableCell>

                                                <TableCell className="text-center">
                                                    <Button
                                                        variant={"link"}
                                                        title="Edit"
                                                        onClick={() =>
                                                            openEditModal(
                                                                expense
                                                            )
                                                        }
                                                    >
                                                        <SquarePen />
                                                    </Button>
                                                    <Button
                                                        variant={"link"}
                                                        className="text-red-500"
                                                        title="Delete"
                                                        onClick={() =>
                                                            handleDelete(
                                                                expense.id
                                                            )
                                                        }
                                                        type="button"
                                                    >
                                                        <Trash2 />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan="6"
                                                className="text-center font-medium text-gray-500"
                                            >
                                                <div className="py-4">
                                                    <p className="text-lg">
                                                        No expenses found
                                                    </p>
                                                    <p className="text-sm text-gray-400">
                                                        Start by adding a new
                                                        expense!
                                                    </p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                                {totalAmount !== 0 ? (
                                    <TableFooter className="bg-red-100">
                                        <TableRow className="bg-red-200/50">
                                            <TableCell className="text-center"></TableCell>
                                            <TableCell className="text-center"></TableCell>
                                            <TableCell className="text-center"></TableCell>
                                            <TableCell className="text-right font-bold text-red-700">
                                                Total
                                            </TableCell>
                                            <TableCell className="text-right text-red-700">
                                                <span id="target">
                                                    {totalAmount}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center"></TableCell>
                                        </TableRow>
                                    </TableFooter>
                                ) : (
                                    ""
                                )}
                            </Table>
                        </div>
                    </div>
                </div>
            </div>

            <BudgetModal
                setisPopupVisible={setisPopupVisible}
                closeBudgetModal={closeBudgetModal}
                isPopupVisible={isPopupVisible}
            />
        </AuthenticatedLayout>
    );
}
