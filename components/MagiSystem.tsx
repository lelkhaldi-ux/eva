
import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Send, Cpu, MessageSquare } from 'lucide-react';
import { magiService } from '../services/geminiService.ts';
import { Message } from '../types.ts';

const MagiSystem: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: 'MAGI SYSTEM INITIALIZED. LOCAL CORE ACTIVE. STANDING BY FOR INTERNAL COMMANDS, PILOT LYES.', 
      timestamp: new Date() 
    }
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

    const userMessage: Message = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const response = await magiService.queryMagi(input);
    
    setMessages(prev => [...prev, { role: 'model', text: response, timestamp: new Date() }]);
    setIsTyping(false);
  };

  return (
    <section id="magi" className="py-20 px-6 bg-black relative">
      <div className="max-w-4xl mx-auto border-2 border-eva-purple/40 bg-black/50 overflow-hidden rounded-lg shadow-[0_0_30px_rgba(127,0,255,0.2)]">
        {/* Header UI */}
        <div className="bg-eva-purple/20 p-4 border-b border-eva-purple/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-eva-purple" />
            <span className="mono text-eva-purple font-bold tracking-widest text-sm uppercase font-mono">Magi System — Local Simulation</span>
          </div>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500/50 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#39ff14]"></div>
          </div>
        </div>

        {/* Chat Area */}
        <div 
          ref={scrollRef}
          className="h-[500px] overflow-y-auto p-6 space-y-6 font-mono scrollbar-hide"
        >
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-sm border ${
                msg.role === 'user' 
                ? 'bg-eva-green/5 border-eva-green/30 text-eva-green' 
                : 'bg-eva-purple/5 border-eva-purple/30 text-eva-purple'
              }`}>
                <div className="flex items-center gap-2 mb-2 opacity-50 text-[10px] uppercase tracking-tighter font-bold">
                  {msg.role === 'user' ? <MessageSquare className="w-3 h-3" /> : <Terminal className="w-3 h-3" />}
                  {msg.role === 'user' ? 'Pilot Input' : 'MAGI Core'} — {msg.timestamp.toLocaleTimeString()}
                </div>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start">
              <div className="bg-eva-purple/5 border border-eva-purple/30 text-eva-purple p-4 rounded-sm">
                <p className="text-xs animate-pulse">INTERNAL CALCULATION (MELCHIOR-1)...</p>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-eva-purple/5 border-t border-eva-purple/40">
          <div className="relative flex items-center">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="ENTER LOCAL COMMAND..."
              className="w-full bg-black border border-eva-purple/30 text-eva-purple p-3 pr-12 rounded-sm focus:outline-none focus:border-eva-green font-mono placeholder:opacity-30"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 p-2 text-eva-purple hover:text-eva-green transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2 flex justify-between px-1">
             <span className="text-[10px] font-mono text-eva-green font-bold uppercase">Status: Offline Stable</span>
             <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Local Buffer Mode</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MagiSystem;
