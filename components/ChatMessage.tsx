import React, { useState } from 'react';
import { Message, Role, Product } from '../types';
import { User, Gem, Mail, CheckCircle, ArrowRight } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  onTryOn: (product: Product) => void;
  onSubmitEmail: (messageId: string, email: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onTryOn, onSubmitEmail }) => {
  const isUser = message.role === Role.USER;
  const [emailInput, setEmailInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput && emailInput.includes('@')) {
      onSubmitEmail(message.id, emailInput);
    }
  };

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[90%] md:max-w-[75%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mx-2 shadow-sm ${isUser ? 'bg-stone-200' : 'bg-gold-500 text-white'}`}>
          {isUser ? <User size={20} className="text-stone-600" /> : <Gem size={20} />}
        </div>

        {/* Content Bubble */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} w-full`}>
          <div className={`p-4 rounded-2xl shadow-sm text-sm md:text-base leading-relaxed whitespace-pre-wrap ${
            isUser 
              ? 'bg-stone-800 text-stone-50 rounded-tr-none' 
              : 'bg-white text-stone-800 border border-stone-100 rounded-tl-none'
          }`}>
            {message.text}
          </div>

          {/* Email Collection Form (Only for Model messages that flag it) */}
          {!isUser && message.showEmailRequest && (
            <div className="mt-3 w-full max-w-sm bg-stone-50 border border-gold-200 rounded-xl p-4 shadow-sm">
              {!message.emailSubmitted ? (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-gold-600 font-bold text-sm mb-1">
                    <Mail size={16} />
                    <span>Đăng ký nhận báo giá chi tiết</span>
                  </div>
                  <p className="text-xs text-stone-500 mb-2">Để lại email để nhận catalog và chính sách hợp tác mới nhất.</p>
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <input 
                      type="email" 
                      required
                      placeholder="email@example.com"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      className="flex-1 bg-white border border-stone-200 rounded-lg px-3 py-2 text-sm focus:border-gold-500 outline-none"
                    />
                    <button 
                      type="submit"
                      className="bg-stone-900 text-white p-2 rounded-lg hover:bg-gold-600 transition-colors"
                    >
                      <ArrowRight size={18} />
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-green-700 bg-green-50 p-2 rounded-lg border border-green-100">
                   <CheckCircle size={20} />
                   <div className="flex flex-col">
                      <span className="font-bold text-sm">Đã đăng ký thành công!</span>
                      <span className="text-xs text-green-600">Email báo giá đang được gửi đến bạn...</span>
                   </div>
                </div>
              )}
            </div>
          )}

          {/* Product Cards Grid if products are recommended */}
          {!isUser && message.relatedProducts && message.relatedProducts.length > 0 && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {message.relatedProducts.map((product) => (
                <div key={product.id} className="bg-white p-3 rounded-lg border border-gold-300 shadow-sm flex flex-col hover:shadow-md transition-shadow relative overflow-hidden">
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10">
                      {product.badge}
                    </div>
                  )}

                  <div className="relative aspect-square w-full bg-stone-100 rounded-md overflow-hidden mb-2 group">
                    <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  
                  <h4 className="font-serif font-bold text-stone-900 truncate mb-2">{product.name}</h4>
                  
                  {/* Price Section REMOVED as per request to only ask for email */}
                  
                  <button 
                    onClick={() => onTryOn(product)}
                    className="mt-auto w-full py-2 bg-stone-900 text-white text-xs uppercase tracking-wider font-bold rounded hover:bg-gold-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Gem size={14} />
                    Thử AR
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <span className="text-xs text-stone-400 mt-1 mx-1">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;