import { Button } from "@/Components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
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
                Take control of your financial journey with an elegantly simple
                expense tracker that helps you understand and optimize your
                spending habits.
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
    );
}
