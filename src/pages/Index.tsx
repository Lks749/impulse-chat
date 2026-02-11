import { useCallback, useEffect, useRef, useState } from "react";
import ChatHeader from "@/components/ChatHeader";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { getAIResponse, type Message } from "@/lib/chat";

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", content: "Olá! Eu sou o Impulse AI. Como posso ajudar?", role: "ai" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(async (text: string) => {
    const userMsg: Message = { id: crypto.randomUUID(), content: text, role: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const reply = await getAIResponse(text);
      const aiMsg: Message = { id: crypto.randomUUID(), content: reply, role: "ai" };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-secondary">
      <ChatHeader />

      <main className="flex flex-1 items-start justify-center p-4 md:p-8">
        <div className="flex w-full max-w-2xl flex-col rounded-xl border border-border bg-card shadow-sm"
             style={{ height: "calc(100vh - 120px)" }}>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} content={msg.content} isUser={msg.role === "user"} />
            ))}
            {isLoading && (
              <div className="flex justify-start mb-3">
                <div className="bg-secondary text-muted-foreground rounded-2xl rounded-bl-md px-4 py-2.5 text-sm">
                  Digitando...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default Index;
