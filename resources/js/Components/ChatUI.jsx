import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendIcon, Rocket, Sparkles, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

const ChatUI = ({
    onSendMessage,
    initialMessages = [],
    placeholder = "Type your message...",
    className,
}) => {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const scrollAreaRef = useRef(null);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async () => {
        if (input.trim() === "" || isLoading) return;

        const userMessage = {
            id: Date.now().toString(),
            content: input,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        // Focus back on input after sending
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);

        try {
            if (onSendMessage) {
                const response = await onSendMessage(input);

                const botMessage = {
                    id: (Date.now() + 1).toString(),
                    content: response,
                    sender: "bot",
                    timestamp: new Date(),
                };

                setMessages((prev) => [...prev, botMessage]);
            }
        } catch (error) {
            console.error("Error sending message:", error);

            // Add error message
            const errorMessage = {
                id: (Date.now() + 1).toString(),
                content: "Sorry, there was an error processing your request.",
                sender: "bot",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div
            className={cn(
                "flex flex-col w-full h-[500px] rounded-xl border border-zinc-800 bg-zinc-900 shadow-[0_4px_24px_rgba(0,0,0,0.4)] overflow-hidden backdrop-blur-sm",
                className
            )}
        >
            {/* Chat Header */}
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/80 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <h3 className="font-semibold text-zinc-100 text-lg">
                        AI Assistant
                    </h3>
                </div>
                {/* <div className="text-sm px-2 py-1 rounded-full bg-zinc-800 text-zinc-400">
                    {messages.length} messages
                </div> */}
            </div>

            {/* Chat Messages */}
            <ScrollArea
                className="flex-grow px-4 py-6 bg-zinc-950/40"
                ref={scrollAreaRef}
            >
                <div className="flex flex-col space-y-6 pb-4 pr-2">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={cn(
                                "flex",
                                message.sender === "user"
                                    ? "justify-end"
                                    : "justify-start"
                            )}
                        >
                            <div
                                className={cn(
                                    "flex max-w-[80%] animate-fade-in",
                                    message.sender === "user"
                                        ? "items-end"
                                        : "items-start"
                                )}
                            >
                                {message.sender === "bot" && (
                                    <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                                        <Bot className="h-4 w-4 text-white" />
                                    </div>
                                )}

                                <div
                                    className={cn(
                                        "flex flex-col rounded-xl p-4",
                                        message.sender === "user"
                                            ? "bg-zinc-800 text-zinc-100 rounded-br-none"
                                            : "bg-zinc-800/40 border border-zinc-700/50 text-zinc-100 rounded-bl-none"
                                    )}
                                >
                                    <div className="break-words leading-relaxed">
                                        {message.content}
                                    </div>
                                    <span
                                        className={cn(
                                            "text-xs mt-2 self-end",
                                            message.sender === "user"
                                                ? "text-zinc-400"
                                                : "text-zinc-500"
                                        )}
                                    >
                                        {formatTime(message.timestamp)}
                                    </span>
                                </div>

                                {message.sender === "user" && (
                                    <div className="h-8 w-8 rounded-full bg-zinc-700 flex items-center justify-center ml-2 mt-1 flex-shrink-0">
                                        <User className="h-4 w-4 text-white" />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}

                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="flex items-start">
                                <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center mr-2 mt-1">
                                    <Bot className="h-4 w-4 text-white" />
                                </div>

                                <div className="flex rounded-xl p-4 bg-zinc-800/40 border border-zinc-700/50 text-zinc-100 rounded-bl-none">
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce delay-0"></div>
                                        <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce delay-150"></div>
                                        <div className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce delay-300"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </ScrollArea>

            {/* Chat Input */}
            <div className="p-4 bg-zinc-900 border-t border-zinc-800">
                <div className="flex items-center space-x-2 relative">
                    <Input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        disabled={isLoading}
                        className="flex-grow py-6 bg-zinc-800 border-zinc-700 text-zinc-100 focus-visible:ring-zinc-600 placeholder:text-zinc-500 rounded-xl"
                    />
                    <Button
                        onClick={handleSendMessage}
                        disabled={isLoading || input.trim() === ""}
                        size="icon"
                        className="shrink-0 bg-zinc-700 hover:bg-zinc-600 text-white transition-all duration-200 h-12 w-12 rounded-xl"
                    >
                        {isLoading ? (
                            <div className="animate-spin">
                                <Rocket className="h-5 w-5 rotate-45" />
                            </div>
                        ) : (
                            <SendIcon className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChatUI;
