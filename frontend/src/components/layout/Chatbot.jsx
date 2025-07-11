import React, { useRef, useState, useEffect } from 'react';
import { FaHeadset, FaRobot, FaChevronDown, FaArrowUp } from "react-icons/fa6";
import ChatMessage from "../ChatMessage";

const Chatbot = () => {
    const inputRef = useRef();
    const chatContainerRef = useRef();
    const [chatHistory, setChatHistory] = useState([
        { role: "model", text: "Hey there 👋\nHow can I help you today?" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isThinking, setIsThinking] = useState(false);

    // Auto-scroll to bottom when new messages are added
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputValue.trim();
        if (!userMessage || isThinking) return;
        
        // Clear input field
        setInputValue("");
        
        // Update chat history with the user's message 
        setChatHistory(history => [...history, { role: "user", text: userMessage }]);
        
        // Add thinking state
        setIsThinking(true);
        
        // Generate bot response after a slight delay
        setTimeout(() => {
            generateBotResponse(userMessage);
        }, 1000);
    };

    const generateBotResponse = (userMessage) => {
        // Simulated bot response logic - in a real app, this would likely be an API call
        let botResponse = "";
        
        // Simple pattern matching for FAQ responses
        const lowercaseMessage = userMessage.toLowerCase();
        
        if (lowercaseMessage.includes("hello") || lowercaseMessage.includes("hi") || lowercaseMessage.includes("hey")) {
            botResponse = "Hello! How can I assist you today?";
        } 
        else if (lowercaseMessage.includes("refund") || lowercaseMessage.includes("money back")) {
            botResponse = "Our refund policy allows returns within 30 days of purchase. Would you like me to guide you through the refund process?";
        }
        else if (lowercaseMessage.includes("shipping") || lowercaseMessage.includes("delivery")) {
            botResponse = "We typically ship orders within 1-2 business days. Standard shipping takes 3-5 business days to arrive. For more specific information about your order, please provide your order number.";
        }
        else if (lowercaseMessage.includes("contact") || lowercaseMessage.includes("speak to agent") || lowercaseMessage.includes("human")) {
            botResponse = "You can reach our customer service team at support@example.com or call us at (555) 123-4567 during business hours (Mon-Fri, 9am-5pm EST).";
        }
        else if (lowercaseMessage.includes("password") || lowercaseMessage.includes("forgot password") || lowercaseMessage.includes("reset password")) {
            botResponse = "To reset your password, please go to the login page and click on 'Forgot Password'. You'll receive an email with instructions to create a new password.";
        }
        else if (lowercaseMessage.includes("account") || lowercaseMessage.includes("sign up") || lowercaseMessage.includes("login")) {
            botResponse = "You can create an account or login by clicking the 'Account' button in the top right corner of our website. Is there something specific about your account that you need help with?";
        }
        else if (lowercaseMessage.includes("price") || lowercaseMessage.includes("cost") || lowercaseMessage.includes("discount")) {
            botResponse = "Our pricing is available on our website. We also offer occasional discounts for seasonal sales and to newsletter subscribers. Would you like information about a specific product's price?";
        }
        else if (lowercaseMessage.includes("thank")) {
            botResponse = "You're welcome! Is there anything else I can help you with today?";
        }
        else {
            botResponse = "I'm not sure I understand your question. Could you rephrase it or provide more details? Alternatively, you can contact our support team directly at support@example.com.";
        }

        // Add bot response to chat history
        setChatHistory(history => [...history, { role: "model", text: botResponse }]);
        setIsThinking(false);
    };

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    return (
        <div className="flex justify-center">
            {/* Support Tab */} 
            <div 
                onClick={toggleChat}
                className="w-12 h-12 fixed bottom-5 md:bottom-10 right-5 md:right-10 z-50 flex bg-blue-600 hover:bg-blue-700 rounded-full shadow-xl p-3 transition-all duration-300 cursor-pointer"
            >
                <FaHeadset size={24} className="text-white" />
            </div>

            {/* Chat Frame */}
            <div className={`w-[320px] md:w-[380px] h-[540px] fixed bottom-20 right-5 md:right-10 z-40 overflow-hidden bg-white rounded-xl shadow-xl transition-all duration-300 ${isChatOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                {/* Header */}
                <div className="chat-header flex justify-between px-4 py-4 bg-blue-600 shrink-0">
                    <div className="flex gap-3 justify-center items-center">
                        <FaHeadset size={24} className="text-white" />
                        <h2 className="text-white text-xl font-semibold">Support Chat</h2>
                    </div>

                    <button 
                        onClick={toggleChat}
                        className="pr-2 w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-300 cursor-pointer"
                    >
                        <FaChevronDown size={18} className="text-white" />
                    </button>
                </div>

                {/* Chat Body */}
                <div 
                    ref={chatContainerRef}
                    className="flex flex-col gap-4 px-4 py-5 h-[400px] overflow-y-auto scroll-smooth"
                >
                    {chatHistory.map((chat, index) => (
                        <ChatMessage key={index} chat={chat} />
                    ))}
                    
                    {isThinking && (
                        <div className="message bot-message flex gap-3 items-center shrink-0">
                            <FaRobot size={18} className='text-white bg-blue-600 w-10 h-10 items-center p-2 rounded-full'/>
                            <div className="message-text max-w-[75%] bg-blue-100 text-sm text-black px-4 py-3 rounded-xl wrap-break-word">
                                <div className="typing-indicator flex gap-1">
                                    <div className="dot animate-bounce bg-gray-600 h-2 w-2 rounded-full"></div>
                                    <div className="dot animate-bounce bg-gray-600 h-2 w-2 rounded-full" style={{ animationDelay: "0.2s" }}></div>
                                    <div className="dot animate-bounce bg-gray-600 h-2 w-2 rounded-full" style={{ animationDelay: "0.4s" }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Message Input */}
                <div className="px-4 py-3 absolute bottom-0 w-full bg-white border-t border-gray-200">
                    <form onSubmit={handleFormSubmit} className="flex gap-3 p-1 items-center bg-white outline outline-gray-300 rounded-3xl shrink-0">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Message..."
                            className="rounded-3xl py-3 border-none outline-none w-full bg-none h-10 px-4 text-black"
                        />
                        {inputValue.trim() && (
                            <button 
                                type="submit"
                                className='bg-blue-600 w-10 h-10 flex items-center justify-center p-2 rounded-full cursor-pointer shrink-0 transition-all duration-300'
                            >
                                <FaArrowUp size={16} className="text-white" />
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;