import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ChatUI from "@/Components/ChatUI";
import axios from "axios";

export default function Chat() {
    const getResponse = async (userMessage) => {
        try {
            const response = await axios.post("/chat", {
                message: userMessage,
            });

            // Assuming API returns { reply: "some text" }
            return response.data.reply;
        } catch (error) {
            console.error("API error:", error);
            return "Sorry, something went wrong. Please try again.";
        }
    };
    const handleSendMessage = async (message) => {
        let response = await getResponse(message);
        return response;
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
