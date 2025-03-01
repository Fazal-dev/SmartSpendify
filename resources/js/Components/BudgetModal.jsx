import React from "react";
import Modal from "./Modal";
import TextInput from "./TextInput";
import { Button } from "./ui/button";
import InputError from "./InputError";
import { useForm } from "@inertiajs/react";
import DangerButton from "./DangerButton";
import { X } from "lucide-react";

export default function BudgetModal({ isPopupVisible, closeBudgetModal }) {
    const { data, setData, post, processing, reset, errors, clearErrors } =
        useForm({
            budget: "",
        });

    const submit = (e) => {
        e.preventDefault();

        post(route("budget.store"), {
            onSuccess: () => {
                clearForm();
                closeBudgetModal();
            },
        });
    };

    const clearForm = () => {
        setData({
            budget: "",
        });

        clearErrors();
    };

    return (
        <>
            <Modal
                show={isPopupVisible}
                maxWidth="sm"
                onClose={() => closeBudgetModal()}
                closeable={true}
            >
                <h1 className=" font-bold text-gray-800 dark:text-white text-center mb-3 mt-6">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
                        Smart Budgeting Starts Here
                    </span>
                </h1>
                <form onSubmit={submit} className="p-5">
                    <div className="p-4 sm:p-6 lg:p-4">
                        <TextInput
                            className="w-full"
                            label="Budget"
                            type="number"
                            onChange={(e) => setData("budget", e.target.value)}
                            name="budget"
                            placeholder="Enter your budget here"
                        />
                        <InputError message={errors.budget} className="mt-2" />
                    </div>
                    <div className="p-4 sm:p-6 lg:p-4  w-full">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="">
                                <Button
                                    type="submit"
                                    className="w-full text-center"
                                    disabled={processing}
                                >
                                    ADD
                                </Button>
                            </div>
                            <div className="">
                                <a href={route("dashboard")}>
                                    <DangerButton
                                        type="button"
                                        aschild="true"
                                        className="w-full h-10 text-center"
                                    >
                                        <X size={16} className="mr-3" />
                                        Cancel
                                    </DangerButton>
                                </a>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
}
