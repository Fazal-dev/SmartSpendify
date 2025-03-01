import { Card, CardContent } from "@/components/ui/card";

export default function SummaryCard({ children, text, total, id }) {
    return (
        <>
            <Card className="shadow-md rounded-xl bg-white">
                <CardContent className="p-4 flex items-center">
                    {/* Icon Section */}
                    <div className="p-3 bg-blue-300 text-white rounded-full">
                        {children}
                    </div>

                    {/* Text & Value Section */}
                    <div className="ml-4">
                        <h4 className="text-gray-500 text-sm">{text}</h4>
                        <p
                            id={id}
                            className="text-xl font-semibold text-gray-900"
                        >
                            {total}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
