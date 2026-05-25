import { X, MessageCircle, Mail, Share2, Phone } from 'lucide-react';
import { useLanguage } from '../context/language-context';

interface ShareRideModalProps {
  onClose: () => void;
  onShareEmergencyContact: () => void;
}

export function ShareRideModal({ onClose, onShareEmergencyContact }: ShareRideModalProps) {
  const { t, direction } = useLanguage();

  const shareOptions = [
    { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, color: 'bg-green-500' },
    { id: 'messages', name: 'Messages', icon: MessageCircle, color: 'bg-blue-500' },
    { id: 'email', name: 'Email', icon: Mail, color: 'bg-gray-600' },
    { id: 'emergency', name: 'Emergency Contact', icon: Phone, color: 'bg-red-500' },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-end" onClick={onClose}>
      <div
        className="bg-white rounded-t-3xl w-full p-6 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        dir={direction}
      >
        <div className={`flex items-center justify-between mb-6 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <h3>Share Live Location</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <p className={`text-sm text-gray-600 mb-6 ${direction === 'rtl' ? 'text-right' : ''}`}>
          Share your live location and ride details with friends and family for safety.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-4">
          {shareOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => {
                  if (option.id === 'emergency') {
                    onShareEmergencyContact();
                  } else {
                    // Simulate sharing
                    console.log(`Sharing via ${option.name}`);
                    onClose();
                  }
                }}
                className="flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
              >
                <div className={`w-12 h-12 ${option.color} rounded-full flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium">{option.name}</span>
              </button>
            );
          })}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className={`text-sm text-blue-900 ${direction === 'rtl' ? 'text-right' : ''}`}>
            Your location will be shared until the ride ends or you manually stop sharing.
          </div>
        </div>
      </div>
    </div>
  );
}
