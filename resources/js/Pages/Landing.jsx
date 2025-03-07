import { Button } from "@/Components/ui/button";
import { ArrowRight, BarChart2, PiggyBank, Zap } from "lucide-react";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import { FeaturedCard } from "@/Components/FeaturedCard";

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
                <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-black/90 border-b border-gray-200 dark:border-gray-800 backdrop-blur-md">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            {/* Logo */}
                            <div className="flex items-center gap-2">
                                <div className="relative w-8 h-8 rounded-lg bg-black dark:bg-white flex items-center justify-center overflow-hidden shadow-lg">
                                    <div className="absolute inset-0 bg-white dark:bg-black opacity-10"></div>
                                    <span className="text-white dark:text-black font-bold text-xl relative z-10">
                                        $
                                    </span>
                                </div>
                                <span className="font-semibold text-xl text-gray-900 dark:text-white">
                                    Trackit
                                </span>
                            </div>

                            {/* Nav buttons */}
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link href={route("dashboard")}>
                                        <Button
                                            variant="ghost"
                                            className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                                        >
                                            Dashboard
                                        </Button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route("login")}>
                                            <Button
                                                variant="ghost"
                                                className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors"
                                            >
                                                Login
                                            </Button>
                                        </Link>
                                        <Link href={route("register")}>
                                            <Button className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black transition-all shadow-md hover:shadow-lg">
                                                Sign Up
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

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
                        <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 flex flex-col items-center justify-center text-center z-10">
                            <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 px-3 py-1 text-sm shadow-sm backdrop-blur mb-8">
                                <span className="text-gray-600 dark:text-gray-400 font-medium">
                                    Simplify your finances
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-3xl text-gray-900 dark:text-white">
                                Your expenses,{" "}
                                <span className="text-black dark:text-white  decoration-4 underline-offset-4">
                                    beautifully tracked
                                </span>
                            </h1>

                            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                                Take control of your financial journey with an
                                elegantly simple expense tracker that helps you
                                understand and optimize your spending habits.
                            </p>

                            <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
                                <Button
                                    size="lg"
                                    className="bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black shadow-lg hover:shadow-xl transition-all group"
                                >
                                    Start tracking for free
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                                >
                                    Learn more
                                </Button>
                            </div>
                        </div>

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
