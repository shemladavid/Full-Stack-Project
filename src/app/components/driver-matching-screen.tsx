import { Star, X, Languages } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/language-context';
import { LanguageSwitcher } from './language-switcher';
import { CancelRideModal } from './cancel-ride-modal';

interface DriverMatchingScreenProps {
  onCancel: () => void;
  onMatched: () => void;
}

export function DriverMatchingScreen({ onCancel, onMatched }: DriverMatchingScreenProps) {
  const { t, direction } = useLanguage();
  const [isSearching, setIsSearching] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSearching(false);
      onMatched();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onMatched]);

  return (
    <div className="relative h-full w-full bg-gray-100" dir={direction}>
      {/* Language Switcher */}
      <div className={`absolute top-14 z-30 ${direction === 'rtl' ? 'left-4' : 'right-4'}`}>
        <LanguageSwitcher />
      </div>
      {/* Map with Route */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-gray-100 to-green-50">
        <svg className="absolute inset-0 w-full h-full">
          <path
            d="M 100 200 Q 200 150, 300 400"
            stroke="#0A84FF"
            strokeWidth="4"
            fill="none"
            strokeDasharray="10,5"
            className="drop-shadow-lg"
          />
        </svg>

        {/* Pickup Point */}
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-[#0A84FF] rounded-full border-4 border-white shadow-lg" />

        {/* Destination Point */}
        <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-[#34C759] rounded-full border-4 border-white shadow-lg" />
      </div>

      {/* Status Card */}
      {isSearching ? (
        <div className="absolute top-20 left-4 right-4 bg-white rounded-2xl shadow-lg p-6 z-20">
          <div className={`flex items-center gap-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 border-4 border-[#0A84FF] border-t-transparent rounded-full animate-spin" />
            </div>
            <div className={direction === 'rtl' ? 'text-right' : ''}>
              <div className="font-medium">{t('matching.searching')}</div>
              <div className="text-sm text-gray-600">{t('matching.usually')}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl p-6 pb-8 z-20">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />

          <div className="text-center mb-6">
            <div className="text-[#34C759] mb-2">{t('matching.found')}</div>
            <div className="text-2xl mb-1">2 {t('matching.away')}</div>
          </div>

          {/* Driver Card */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <div className={`flex items-center gap-4 mb-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                DK
              </div>
              <div className={`flex-1 ${direction === 'rtl' ? 'text-right' : ''}`}>
                <div className="font-medium">David Kim</div>
                <div className={`flex items-center gap-1 text-sm ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>4.9</span>
                  <span className="text-gray-500">(328 {t('matching.trips')})</span>
                </div>
                <div className={`flex items-center gap-1 text-sm mt-1 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <Languages className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-500">{t('filter.speaks')}: EN, HE</span>
                </div>
              </div>
            </div>

            <div className={`flex items-center justify-between pt-4 border-t border-gray-200 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <div className={direction === 'rtl' ? 'text-right' : ''}>
                <div className="text-sm text-gray-600">Toyota Camry</div>
                <div className="font-medium">ABC-1234</div>
              </div>
              <div className="text-4xl">🚗</div>
            </div>
          </div>

          <button
            onClick={() => setShowCancelModal(true)}
            className={`w-full bg-gray-100 text-gray-700 py-4 rounded-xl hover:bg-gray-200 transition flex items-center justify-center gap-2 ${
              direction === 'rtl' ? 'flex-row-reverse' : ''
            }`}
          >
            <X className="w-5 h-5" />
            {t('matching.cancel')}
          </button>
        </div>
      )}

      {/* Cancel Ride Modal */}
      {showCancelModal && (
        <CancelRideModal
          mode="passenger"
          onClose={() => setShowCancelModal(false)}
          onConfirm={(reason) => {
            console.log('Ride cancelled. Reason:', reason);
            setShowCancelModal(false);
            onCancel();
          }}
        />
      )}
    </div>
  );
}
