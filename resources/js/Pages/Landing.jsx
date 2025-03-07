import { BarChart2, PiggyBank, Zap } from "lucide-react";
import { Head } from "@inertiajs/react";
import React from "react";
import { FeaturedCard } from "@/Components/FeaturedCard";
import { Header } from "@/Components/Header";
import Hero from "@/Components/Hero";

export default function Landing({ auth }) {
    const features = [
        {
            title: "Visual Insights",
            icon: <BarChart2 className="h-5 w-5 text-black dark:text-white" />,
            description:
                "See your spending patterns with beautiful charts and actionable insights",
        },
        {
            title: "Smart Budgeting",
            icon: <PiggyBank className="h-5 w-5 text-black dark:text-white" />,
            description:
                "Create personalized budgets and receive gentle reminders to stay on track.",
        },
        {
            title: "  Effortless Tracking",
            icon: <Zap className="h-5 w-5 text-black dark:text-white" />,
            description:
                "Quick expense entry with automatic categorization and receipt scanning.",
        },
    ];
    return (
        <>
            <Head title="Welcome" />
            <div className="min-h-screen flex flex-col bg-white dark:bg-black text-gray-900 dark:text-white">
                {/* Navbar */}
                <Header auth={auth} />

                {/* Main content */}
                <main className="flex-1">
                    <div className="relative min-h-screen flex flex-col">
                        {/* Background effects */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gray-100 dark:bg-gray-900 blur-3xl opacity-70"></div>
                            <div className="absolute top-1/4 -left-40 w-80 h-80 rounded-full bg-gray-200 dark:bg-gray-800 blur-3xl opacity-70"></div>
                            <div className="absolute bottom-10 right-1/4 w-64 h-64 rounded-full bg-gray-100 dark:bg-gray-900 blur-3xl opacity-70"></div>
                        </div>

                        {/* Hero content */}
                        <Hero />

                        {/* Features section */}
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {features.map((feature, index) => (
                                    <FeaturedCard
                                        key={index}
                                        feature={feature}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
