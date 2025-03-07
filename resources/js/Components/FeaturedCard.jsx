import React from "react";

export const FeaturedCard = ({ feature }) => {
    return (
        <div className="group relative bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-900 mb-4">
                {feature.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
            </p>
            <div className="absolute inset-0 border border-black/0 dark:border-white/0 rounded-xl group-hover:border-black/10 dark:group-hover:border-white/10 group-hover:scale-[1.02] transition-all duration-300"></div>
        </div>
    );
};
