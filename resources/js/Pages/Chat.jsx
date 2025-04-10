import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ChatUI from "@/Components/ChatUI";

export default function Chat() {
    const handleSendMessage = async (message) => {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Example responses based on user input
        if (
            message.toLowerCase().includes("hello") ||
            message.toLowerCase().includes("hi")
        ) {
            return "Hello there! How can I help you today?";
        } else if (message.toLowerCase().includes("help")) {
            return "I'm here to help! You can ask me about various topics.";
        } else if (
            message.toLowerCase().includes("thanks") ||
            message.toLowerCase().includes("thank you")
        ) {
            return "You're welcome! Is there anything else you need?";
        } else {
            return `I received your message: "${message}". How can I assist you further?`;
        }
    };
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Aiva
                </h2>
            }
        >
            <Head title="Aiva" />;
            <div className="h-[500px]  flex flex-col items-center justify-center p-2 md:p-0">
                <div className="w-full max-w-4xl mx-auto">
                    <ChatUI
                        onSendMessage={handleSendMessage}
                        initialMessages={[
                            {
                                id: "1",
                                content:
                                    "Hello! How can I help you today? I'm your AI assistant designed to answer your questions and provide information on a wide range of topics.",
                                sender: "bot",
                                timestamp: new Date(),
                            },
                        ]}
                        placeholder="Chat with Aiva about your budget goals"
                        className="shadow-2xl border-zinc-800"
                    />
                    <p className="text-center text-sm text-zinc-400 mt-4">
                        Type your message and press Enter or click the send
                        button to chat.
                    </p>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
