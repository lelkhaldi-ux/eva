
import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, MessageSquare, ShieldAlert, Cpu } from 'lucide-react';
import { magiService } from '../services/geminiService';
import { Message } from '../types';

const MagiFloatingBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'MAGI-CASPER: Monitoring active. State your query, Pilot Lyes.', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg: Message = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const response = await magiService.queryMagi(input);
    setMessages(prev => [...prev, { role: 'model', text: response, timestamp: new Date() }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-mono">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative w-16 h-16 bg-eva-orange flex items-center justify-center rounded-sm transform rotate-45 shadow-[0_0_20px_rgba(255,107,0,0.4)] hover:scale-110 transition-all duration-300"
        >
          <div className="transform -rotate-45 flex flex-col items-center">
             <Cpu className="w-6 h-6 text-black" />
             <span className="text-[8px] font-bold text-black mt-1">MAGI</span>
          </div>
          {/* Pulsing ring */}
          <div className="absolute inset-0 border border-eva-orange rounded-sm animate-ping opacity-50"></div>
        </button>
      ) : (
        <div className="w-80 md:w-96 bg-black border-2 border-eva-orange shadow-[0_0_40px_rgba(255,107,0,0.2)] rounded-sm overflow-hidden flex flex-col h-[500px]">
          {/* Header */}
          <div className="bg-eva-orange p-3 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-black animate-pulse" />
              <span className="text-xs font-bold text-black tracking-widest uppercase">Magi Portable Interface</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-black hover:scale-125 transition-transform">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/90">
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-3 max-w-[90%] text-xs leading-relaxed border ${
                  m.role === 'user' 
                  ? 'border-eva-green/30 text-eva-green bg-eva-green/5' 
                  : 'border-eva-orange/30 text-eva-orange bg-eva-orange/5'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && <div className="text-[10px] text-eva-orange animate-pulse">CONSULTING MAGI CORE...</div>}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-eva-orange/20 bg-black">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="INPUT COMMAND..."
                className="flex-1 bg-transparent border border-eva-orange/30 p-2 text-xs text-eva-orange outline-none focus:border-eva-orange"
              />
              <button 
                onClick={handleSend}
                className="bg-eva-orange text-black px-3 py-1 text-xs font-bold hover:bg-white transition-colors"
              >
                GO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MagiFloatingBot;
