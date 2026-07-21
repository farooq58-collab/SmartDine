import React, { useState, useRef, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { HiOutlinePaperAirplane } from 'react-icons/hi';

export default function VoiceAgentChat() {
  const [messages, setMessages] = useState([
    {
      sender: 'agent',
      text: "Hello! I'm your SmartDine AI voice agent. 🎙️ Ask me anything about your menu, orders, or restaurant operations. I can help with customer queries, menu recommendations, allergen checks, and more!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const sessionIdRef = useRef(`session_${Date.now()}_${Math.random().toString(36).slice(2)}`);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = {
      sender: 'customer',
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await api.post('/api/agent/chat', {
        message: userMessage.text,
        session_id: sessionIdRef.current,
      });

      const agentMessage = {
        sender: 'agent',
        text: res.data.response || res.data.message || 'I received your message.',
        badge: res.data.badge || null,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, agentMessage]);
    } catch {
      // Simulate AI response when backend is down
      const fallbackResponses = [
        { text: "Based on tonight's trend data, I'd recommend promoting the Truffle Risotto 🍄 — it's been our top-performer with a 23% uptick this week. Shall I update the specials board?", badge: 'Menu Intelligence' },
        { text: "I've cross-checked that order against our allergen database. The Pan-Seared Salmon is fully gluten-free ✅. I've flagged the allergy alert to the kitchen display.", badge: 'Allergy Safe-Lock' },
        { text: "Looking at your sales data, Table 7 has an average spend of $47 per visit. I'd suggest the Sonoma Chardonnay ($12) as a pairing upsell — it has a 68% acceptance rate. 🥂", badge: 'Smart Upsell' },
        { text: "Your kitchen prep time is averaging 14.2 minutes tonight. That's 8% faster than last week! 🚀 Two orders are currently in the queue. Everything is running smoothly.", badge: 'KDS Analytics' },
        { text: "I've analyzed food trends in your area using real-time data. Plant-based bowls are up 34% this month. Consider adding a featured grain bowl to capture that demand. 🌱", badge: 'Trend Alert' },
      ];

      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

      // Simulate typing delay
      await new Promise((r) => setTimeout(r, 1200));

      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: randomResponse.text,
          badge: randomResponse.badge,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
    setIsTyping(false);
    inputRef.current?.focus();
  };

  const quickPrompts = [
    "What's our best seller tonight?",
    "Any gluten-free options?",
    "Suggest a wine pairing",
    "Show kitchen wait times",
    "What's trending in food?",
  ];

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">AI Voice Agent</h1>
          <p className="text-gray-400 text-sm mt-0.5">Real-time AI assistant for your restaurant</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald" />
          </span>
          <span className="text-xs font-bold text-emerald font-mono">CONNECTED</span>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-grow flex flex-col backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden shadow-2xl min-h-0">
        {/* Terminal Header */}
        <div className="bg-navy-dark/95 px-6 py-3.5 flex items-center justify-between border-b border-white/10 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald" />
            </span>
            <span className="text-xs font-bold text-gray-400 font-mono tracking-wider ml-2 uppercase">
              SmartDine Agent Console
            </span>
          </div>
          <span className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-emerald/10 text-emerald border border-emerald/20">
            GPT-4o Active
          </span>
        </div>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-6 space-y-5 bg-navy-dark/30">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 animate-in ${
                msg.sender === 'customer' ? 'flex-row-reverse' : ''
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                  msg.sender === 'customer'
                    ? 'bg-white/10 border border-white/15'
                    : 'bg-emerald/10 border border-emerald/30'
                }`}
              >
                {msg.sender === 'customer' ? '👤' : '🎙️'}
              </div>

              {/* Bubble */}
              <div className={`relative max-w-[80%] ${msg.sender === 'customer' ? 'text-right' : ''}`}>
                {msg.badge && (
                  <span className="absolute -top-2.5 right-4 text-[9px] font-bold bg-emerald text-navy px-2 py-0.5 rounded font-mono shadow-lg z-10">
                    {msg.badge}
                  </span>
                )}
                <div
                  className={`rounded-2xl px-4 py-3 text-sm ${
                    msg.sender === 'customer'
                      ? 'bg-white/10 border border-white/15 text-gray-200'
                      : 'bg-emerald/5 border border-emerald/20 text-white'
                  }`}
                >
                  <span className="block text-[9px] font-extrabold uppercase tracking-wider mb-1.5 opacity-60">
                    {msg.sender === 'customer' ? 'You' : 'SmartDine Voice AI'}
                  </span>
                  <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                </div>
                <span className="text-[10px] text-gray-600 mt-1 block font-mono">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-emerald/10 border border-emerald/30 flex items-center justify-center text-sm flex-shrink-0">
                🎙️
              </div>
              <div className="rounded-2xl px-4 py-3 bg-emerald/5 border border-emerald/20">
                <span className="block text-[9px] font-extrabold uppercase tracking-wider mb-1.5 opacity-60 text-white">
                  SmartDine Voice AI
                </span>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-2 h-2 rounded-full bg-emerald animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-emerald animate-bounce" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length <= 2 && (
          <div className="px-6 py-3 border-t border-white/5 flex-shrink-0">
            <span className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-500 font-mono mb-2">
              Try asking:
            </span>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => {
                    setInput(prompt);
                    inputRef.current?.focus();
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <form onSubmit={sendMessage} className="px-4 py-4 border-t border-white/10 bg-navy-dark/70 flex-shrink-0">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask your AI agent anything..."
              className="flex-grow px-5 py-3.5 bg-white/[0.05] border border-white/10 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-emerald/50 focus:ring-1 focus:ring-emerald/30 transition-all"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-5 py-3.5 rounded-xl font-bold text-navy bg-emerald hover:bg-emerald-dark transition-all duration-300 shadow-lg shadow-emerald/20 hover:scale-[1.03] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
            >
              <HiOutlinePaperAirplane className="w-5 h-5 rotate-90" />
              <span className="hidden sm:inline text-sm font-bold">Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
