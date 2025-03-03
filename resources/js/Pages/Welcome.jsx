import { Head, Link } from "@inertiajs/react";
import logo from "../../../public/images/app_logo.png";

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 min-h-screen flex flex-col items-center justify-center">
                <img
                    src={logo}
                    alt="App Logo"
                    className="h-48 w-auto rounded-full"
                />

                {/* Catchy Tagline */}
                <h1 className="text-3xl mt-5 font-bold text-center mb-8 text-black dark:text-white">
                    Smart Spending, Smarter Living!
                </h1>

                {/* Authentication Buttons */}
                <div className="flex space-x-4">
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="px-6 py-3 rounded-md bg-black text-white text-lg font-semibold transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="px-6 py-3 rounded-md bg-black text-white text-lg font-semibold transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route("register")}
                                className="px-6 py-3 rounded-md bg-black text-white text-lg font-semibold transition hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
