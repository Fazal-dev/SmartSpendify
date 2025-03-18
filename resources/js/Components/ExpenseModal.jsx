import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { X } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useEffect } from "react";

export default function ExpenseModal({
    isModalVisible,
    closeModal,
    mode,
    record,
    categories,
}) {
    const { data, setData, post, put, processing, errors, clearErrors } =
        useForm({
            date: format(new Date(), "yyyy-MM-dd"),
            description: "",
            amount: "",
            category_id: "",
        });

    const clearForm = () => {
        setData({
            date: format(new Date(), "yyyy-MM-dd"),
            description: "",
            amount: "",
            category_id: "",
        });

        clearErrors();
    };

    useEffect(() => {
        if (mode === "add") {
            clearForm();
        }

        if (mode === "edit" && record) {
            clearForm();
            setData({
                date: record?.date || format(new Date(), "yyyy-MM-dd"),
                description: record?.description || "",
                amount: record?.amount || "",
                category_id: record?.category_id || "",
            });
        }
    }, [mode]);

    const handleClose = () => {
        clearForm();
        closeModal();
    };

    const handleDateChange = (selectedDate) => {
        if (selectedDate) {
            const formattedDate = format(selectedDate, "yyyy-MM-dd");
            setData("date", formattedDate);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        if (mode === "add") {
            post(route("expenses.store"), {
                onSuccess: () => {
                    clearForm();
                    closeModal();
                },
            });
        } else {
            put(route("expenses.update", { id: record.id }), {
                onSuccess: () => {
                    clearForm();
                    closeModal();
                },
            });
        }
    };

    return (
        <>
            <Modal
                show={isModalVisible}
                maxWidth="lg"
                closeable={true}
                onClose={handleClose}
            >
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-3 mt-6">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                        {mode == "add" ? "Add New Expense" : "Update Expense"}
                    </span>
                </h1>

                <form id="expenseForm" className="p-4" onSubmit={submit}>
                    <div className=" p-4 sm:p-6 lg:p-4">
                        <div className="grid grid-cols-2  lg:grid-cols-2 gap-4">
                            <div className="">
                                <TextInput
                                    className="w-full"
                                    value={data.description}
                                    name="description"
                                    placeholder="Enter a Desctiption "
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>
                            <div className="">
                                <TextInput
                                    value={data.amount}
                                    className="w-full"
                                    type="number"
                                    name="amount"
                                    placeholder="Enter a Amount "
                                    onChange={(e) =>
                                        setData("amount", e.target.value)
                                    }
                                />
                                <InputError
                                    message={errors.amount}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className=" p-4 sm:p-6 lg:p-4">
                        <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
                            <div className="relative w-full">
                                <Popover className="w-full">
                                    <PopoverTrigger asChild className="w-full">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full"
                                        >
                                            {data.date
                                                ? format(data.date, "PPP")
                                                : "Pick a date"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-full min-w-[var(--radix-popper-anchor-width)] p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            selected={new Date(data.date)}
                                            onSelect={handleDateChange}
                                            className="rounded-md border w-full"
                                        />
                                    </PopoverContent>
                                </Popover>
                                <InputError
                                    message={errors.date}
                                    className="mt-2"
                                />
                            </div>
                            <div className="">
                                <Select
                                    value={
                                        categories.find(
                                            (cat) => cat.id === data.category_id
                                        )?.name || ""
                                    }
                                    onValueChange={(categoryName) => {
                                        const selectedCategory =
                                            categories.find(
                                                (cat) =>
                                                    cat.name === categoryName
                                            );
                                        if (selectedCategory) {
                                            setData(
                                                "category_id",
                                                selectedCategory.id
                                            );
                                        }
                                    }}
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories &&
                                            categories.map(
                                                (category, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={category.name}
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                )
                                            )}
                                    </SelectContent>
                                </Select>

                                <InputError
                                    message={
                                        errors.category_id
                                            ? "Please select a category before proceeding."
                                            : ""
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6 lg:p-4">
                        <div className="grid grid-cols-2">
                            <div className="">
                                <DangerButton
                                    type="button"
                                    aschild="true"
                                    onClick={handleClose}
                                    className="mt-4"
                                >
                                    <X size={16} className="mr-3" />
                                    Cancel
                                </DangerButton>
                            </div>
                            <div className="text-right">
                                <PrimaryButton
                                    type="submit"
                                    aschild="true"
                                    className="mt-4"
                                    disabled={processing}
                                >
                                    {mode === "add" ? "New Expense" : "Update"}
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
}
