import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon, SendIcon, Sparkles } from "lucide-react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const ThinkMateChat = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm ThinkMate, your personal note-taking assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to the bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Only send the most recent messages (up to 10) to avoid history issues
      const recentMessages = messages.slice(-10);
      
      const response = await api.post("/api/ai/chat", {
        message: input,
        history: recentMessages.map(m => ({ role: m.role, content: m.content }))
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response.data.response },
      ]);
    } catch (error) {
      console.error("Error getting response from ThinkMate:", error);
      toast.error("Sorry, I couldn't process your request right now.");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>
            <div className="flex items-center">
              <Sparkles className="text-primary size-5 mr-2" />
              <h1 className="text-2xl font-bold">ThinkMate</h1>
            </div>
          </div>          <div className="card bg-base-100 shadow-xl border border-primary/10">
            <div className="card-body">
              <div className="flex items-center gap-2 mb-4 p-2 bg-primary/5 rounded-lg">
                <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles className="size-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-primary">ThinkMate Assistant</h3>
                  <p className="text-xs text-base-content/70">
                    Get help with notes, writing, and organization
                  </p>
                </div>
              </div>              {/* Messages container */}
              <div className="bg-base-200 rounded-lg p-4 mb-4 h-[500px] overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`chat ${
                      message.role === "assistant" ? "chat-start" : "chat-end"
                    } animate-fade-in`}
                    style={{ 
                      animationDelay: `${0.1 * (index % 3)}s`,
                      opacity: 1
                    }}
                  >
                    {message.role === "assistant" && (
                      <div className="chat-image avatar">
                        <div className="w-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <Sparkles className="size-4 text-primary" />
                        </div>
                      </div>
                    )}
                    <div className={`chat-bubble ${message.role === "assistant" ? "chat-bubble-accent" : "chat-bubble-primary"}`}>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                    <div className="chat-footer opacity-70 text-xs mt-1">
                      {message.role === "assistant" ? "ThinkMate" : "You"}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="chat chat-start animate-pulse">
                    <div className="chat-image avatar">
                      <div className="w-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Sparkles className="size-4 text-primary animate-pulse-slow" />
                      </div>
                    </div>
                    <div className="chat-bubble chat-bubble-accent">
                      <span className="loading loading-dots loading-sm"></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>              {/* Input form */}
              <form onSubmit={handleSubmit} className="flex gap-2 relative">
                <input
                  type="text"
                  placeholder="Ask ThinkMate something..."
                  className="input input-bordered flex-grow pr-12 focus:border-primary focus:ring-1 focus:ring-primary"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="btn btn-circle btn-primary absolute right-1 top-1"
                  disabled={isLoading || !input.trim()}
                >
                  <SendIcon className="size-5" />
                </button>
              </form>
            </div>
          </div>
            <div className="bg-base-100 shadow-md rounded-lg mt-6 p-4">
            <h3 className="font-medium text-base-content mb-2">Sample prompts to try:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {["How can I organize my study notes?", 
                "Give me a template for meeting notes", 
                "Tips for writing concise summaries", 
                "How to format a research note",
                "Suggest a structure for book notes"
              ].map((prompt, i) => (
                <button 
                  key={i}
                  className="btn btn-sm btn-outline btn-ghost justify-start text-left normal-case overflow-hidden text-ellipsis"
                  onClick={() => setInput(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThinkMateChat;
