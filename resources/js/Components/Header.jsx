import React from "react";
import { Button } from "@/Components/ui/button";
import { Link } from "@inertiajs/react";

export const Header = ({ auth }) => {
    return (
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
    );
};
