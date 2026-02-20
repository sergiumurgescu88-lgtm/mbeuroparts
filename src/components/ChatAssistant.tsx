import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your MBeuroparts AI Assistant. Tell me your Mercedes-Benz model (e.g., 'S-Class W223'), and I'll recommend the best upgrades and parts for it.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are an expert Mercedes-Benz parts advisor for MBeuroparts. 
        The user is asking: "${userMessage.content}".
        Provide a concise, helpful recommendation for parts or upgrades that fit their model. 
        Keep the tone professional, futuristic, and focused on high-end car parts. Do not use markdown, just plain text.`,
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.text || "I'm sorry, I couldn't process that request at the moment.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: "I'm experiencing a technical issue connecting to the database. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-[#12121c] border-t border-white/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#3D5AFE]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-[#3D5AFE]/10 rounded-2xl mb-4 border border-[#3D5AFE]/20">
            <Sparkles className="w-8 h-8 text-[#3D5AFE]" />
          </div>
          <h2 className="text-4xl font-display font-bold text-white mb-4">
            AI Parts Advisor
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Not sure what fits your Mercedes? Chat with our AI assistant to find the perfect upgrades for your specific chassis code.
          </p>
        </div>

        <div className="bg-[#080810] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col h-[500px]">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      msg.role === 'user' ? 'bg-[#3D5AFE]' : 'bg-[#12121c] border border-white/10'
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-[#3D5AFE]" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      msg.role === 'user'
                        ? 'bg-[#3D5AFE] text-white rounded-tr-none'
                        : 'bg-[#12121c] text-gray-300 border border-white/5 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#12121c] border border-white/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-[#3D5AFE]" />
                </div>
                <div className="bg-[#12121c] border border-white/5 rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#3D5AFE] rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-[#3D5AFE] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 bg-[#3D5AFE] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-[#12121c] border-t border-white/5">
            <form onSubmit={handleSubmit} className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="E.g., I have an S-Class W223, what upgrades fit?"
                className="w-full bg-[#080810] text-white placeholder-gray-500 rounded-full pl-6 pr-14 py-4 border border-white/10 focus:outline-none focus:border-[#3D5AFE] focus:ring-1 focus:ring-[#3D5AFE] transition-all"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-2 bg-[#3D5AFE] hover:bg-[#5c74ff] disabled:bg-gray-700 disabled:text-gray-400 text-white rounded-full transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
