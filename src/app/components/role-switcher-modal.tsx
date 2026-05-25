import { X, User, Car, Check } from 'lucide-react';
import { useLanguage } from '../context/language-context';

interface RoleSwitcherModalProps {
  currentRole: 'passenger' | 'driver';
  onSwitch: (role: 'passenger' | 'driver') => void;
  onClose: () => void;
}

export function RoleSwitcherModal({ currentRole, onSwitch, onClose }: RoleSwitcherModalProps) {
  const { t, direction } = useLanguage();

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-end" onClick={onClose} dir={direction}>
      <div
        className="bg-white rounded-t-3xl w-full p-6 animate-slide-up max-h-[80%] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h3>{t('switcher.title')}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {/* Passenger Mode */}
          <button
            onClick={() => {
              if (currentRole !== 'passenger') {
                onSwitch('passenger');
              }
              onClose();
            }}
            className={`w-full p-4 rounded-xl flex items-center justify-between transition ${
              currentRole === 'passenger'
                ? 'bg-[#0A84FF] text-white'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className={`flex items-center gap-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                currentRole === 'passenger' ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                <User className="w-6 h-6" />
              </div>
              <div className={direction === 'rtl' ? 'text-right' : 'text-left'}>
                <div className="font-medium">{t('profile.passengerMode')}</div>
                {currentRole === 'passenger' && (
                  <div className={`text-sm ${currentRole === 'passenger' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {t('switcher.current')}
                  </div>
                )}
              </div>
            </div>
            {currentRole === 'passenger' && <Check className="w-5 h-5" />}
          </button>

          {/* Driver Mode */}
          <button
            onClick={() => {
              if (currentRole !== 'driver') {
                onSwitch('driver');
              }
              onClose();
            }}
            className={`w-full p-4 rounded-xl flex items-center justify-between transition ${
              currentRole === 'driver'
                ? 'bg-[#0A84FF] text-white'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <div className={`flex items-center gap-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                currentRole === 'driver' ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                <Car className="w-6 h-6" />
              </div>
              <div className={direction === 'rtl' ? 'text-right' : 'text-left'}>
                <div className="font-medium">{t('profile.driverMode')}</div>
                {currentRole === 'driver' && (
                  <div className={`text-sm ${currentRole === 'driver' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {t('switcher.current')}
                  </div>
                )}
              </div>
            </div>
            {currentRole === 'driver' && <Check className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
