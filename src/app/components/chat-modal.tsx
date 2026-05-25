import { X, Send } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/language-context';

interface ChatModalProps {
  onClose: () => void;
  driverName: string;
  mode: 'passenger' | 'driver';
}

export function ChatModal({ onClose, driverName, mode }: ChatModalProps) {
  const { t, direction } = useLanguage();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; sender: 'me' | 'other'; time: string }[]>([
    { text: "I'm on my way!", sender: 'other', time: '2:41 PM' },
    { text: "Great, see you soon!", sender: 'me', time: '2:42 PM' },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    setMessages([...messages, { text: message, sender: 'me', time: timeStr }]);
    setMessage('');
  };

  const otherPersonName = mode === 'passenger' ? driverName : 'Passenger';

  return (
    <div className="fixed inset-0 bg-white z-[60] flex flex-col" dir={direction}>
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A84FF] to-blue-600 pt-14 pb-6 px-6">
        <div className={`flex items-center gap-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-white/20 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className={direction === 'rtl' ? 'text-right' : ''}>
            <h3 className="text-white">{otherPersonName}</h3>
            <div className="text-sm text-blue-100">Online</div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.sender === 'me' ? (direction === 'rtl' ? 'justify-start' : 'justify-end') : (direction === 'rtl' ? 'justify-end' : 'justify-start')}`}
          >
            <div
              className={`max-w-[75%] ${
                msg.sender === 'me'
                  ? 'bg-[#0A84FF] text-white'
                  : 'bg-white text-gray-900'
              } rounded-2xl px-4 py-3 shadow-sm`}
            >
              <div className={direction === 'rtl' ? 'text-right' : ''}>{msg.text}</div>
              <div className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'} ${direction === 'rtl' ? 'text-right' : ''}`}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className={`flex items-center gap-3 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className={`flex-1 p-3 bg-gray-100 rounded-full outline-none focus:ring-2 focus:ring-[#0A84FF] ${
              direction === 'rtl' ? 'text-right' : ''
            }`}
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`w-12 h-12 bg-[#0A84FF] rounded-full flex items-center justify-center transition ${
              message.trim() ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
