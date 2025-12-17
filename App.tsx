import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2, Menu } from 'lucide-react';
import { Message, Role, ChatState, Product } from './types';
import { INITIAL_GREETING } from './constants';
import { sendMessageToGemini } from './services/geminiService';
import ChatMessage from './components/ChatMessage';
import ARView from './components/ARView';

const App: React.FC = () => {
  const [state, setState] = useState<ChatState>({
    messages: [
      {
        id: '1',
        role: Role.MODEL,
        text: INITIAL_GREETING,
        timestamp: Date.now(),
      },
    ],
    isLoading: false,
    isAROpen: false,
    activeProduct: null,
  });

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || state.isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      text: input,
      timestamp: Date.now(),
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));
    setInput('');

    // Call Gemini Service
    const response = await sendMessageToGemini(input);

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: Role.MODEL,
      text: response.text,
      relatedProducts: response.relatedProducts,
      showEmailRequest: response.requestEmailCollection, // Pass the flag from service
      emailSubmitted: false,
      timestamp: Date.now(),
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
      isLoading: false,
    }));
  };

  const openAR = (product: Product) => {
    setState((prev) => ({
      ...prev,
      isAROpen: true,
      activeProduct: product,
    }));
  };

  const closeAR = () => {
    setState((prev) => ({
      ...prev,
      isAROpen: false,
      activeProduct: null,
    }));
  };

  const handleEmailSubmit = (messageId: string, email: string) => {
    // 1. Mark the form as submitted immediately to give UI feedback
    setState((prev) => ({
      ...prev,
      messages: prev.messages.map(msg => 
        msg.id === messageId ? { ...msg, emailSubmitted: true } : msg
      )
    }));

    // Save email to localStorage
    try {
      const STORAGE_KEY = 'lumina_leads';
      const existingLeadsStr = localStorage.getItem(STORAGE_KEY);
      const existingLeads = existingLeadsStr ? JSON.parse(existingLeadsStr) : [];
      
      const newLead = {
        email,
        timestamp: new Date().toISOString(),
        id: messageId
      };
      
      const updatedLeads = [...existingLeads, newLead];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLeads));
      console.log('Lead saved to local storage:', newLead);
    } catch (error) {
      console.error('Error saving lead to local storage:', error);
    }

    // 2. Simulate the automated email sending process (Backend delay)
    // In a real app, you would call your API here: await api.sendQuote({ email });
    setTimeout(() => {
      const autoReply: Message = {
        id: Date.now().toString(),
        role: Role.MODEL,
        text: `✅ Đã gửi thành công!\n\nHệ thống vừa tự động gửi một email chứa:\n- Hồ sơ năng lực (Portfolio) WebAR.\n- Bảng báo giá chi tiết các gói dịch vụ.\n\nĐến địa chỉ: ${email}\n\nBạn vui lòng kiểm tra hộp thư (bao gồm cả mục Spam) nhé!`,
        timestamp: Date.now(),
      };
      
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, autoReply]
      }));
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-stone-50 overflow-hidden font-sans">
      {/* Header */}
      <header className="flex-none h-16 bg-white border-b border-stone-200 flex items-center justify-between px-4 md:px-8 shadow-sm z-20">
        <div className="flex items-center gap-2">
          <div className="bg-gold-600 p-1.5 rounded-lg">
             <Sparkles className="text-white" size={20} />
          </div>
          <h1 className="text-xl font-serif font-bold text-stone-900 tracking-wide">Lumina <span className="text-gold-600">WebAR</span> Solutions</h1>
        </div>
        <button className="p-2 text-stone-500 hover:text-stone-800 transition">
          <Menu size={24} />
        </button>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
        <div className="max-w-4xl mx-auto">
          {state.messages.map((msg) => (
            <ChatMessage 
              key={msg.id} 
              message={msg} 
              onTryOn={openAR} 
              onSubmitEmail={handleEmailSubmit}
            />
          ))}
          
          {state.isLoading && (
             <div className="flex justify-start w-full mb-6">
                <div className="flex flex-row items-center gap-3">
                   <div className="h-10 w-10 rounded-full bg-gold-500 flex items-center justify-center text-white shadow-sm">
                      <Sparkles size={20} />
                   </div>
                   <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-stone-100 shadow-sm flex items-center gap-2 text-stone-500">
                      <Loader2 className="animate-spin" size={16} />
                      <span className="text-sm">Chuyên gia AR đang soạn tin...</span>
                   </div>
                </div>
             </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="flex-none bg-white border-t border-stone-200 p-4 pb-6 md:pb-6 z-20">
        <div className="max-w-4xl mx-auto relative">
          <div className="flex gap-2">
             <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Hỏi về chi phí, quy trình tích hợp hoặc xem demo..."
              className="flex-1 bg-stone-100 border-transparent focus:border-gold-500 focus:bg-white focus:ring-0 rounded-xl px-4 py-3 text-stone-800 placeholder-stone-400 transition-all outline-none"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || state.isLoading}
              className="bg-stone-900 text-white rounded-xl px-5 hover:bg-gold-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center shadow-lg"
            >
              <Send size={20} />
            </button>
          </div>
          
          {/* Quick suggestions */}
          {state.messages.length < 3 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
              {['Xem demo nhẫn', 'Chi phí tích hợp?', 'Tôi cần tư vấn WebAR'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInput(suggestion);
                  }}
                  className="whitespace-nowrap px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-full text-xs text-stone-600 hover:border-gold-500 hover:text-gold-600 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      </footer>

      {/* AR Overlay Modal */}
      {state.isAROpen && state.activeProduct && (
        <ARView product={state.activeProduct} onClose={closeAR} />
      )}
    </div>
  );
};

export default App;