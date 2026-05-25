import { Phone, MessageCircle, Share2, Star, ChevronDown, X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/language-context';
import { LanguageSwitcher } from './language-switcher';
import { CancelRideModal } from './cancel-ride-modal';
import { ChatModal } from './chat-modal';
import { ShareRideModal } from './share-ride-modal';

interface RideProgressScreenProps {
  onComplete: () => void;
  onCancel?: () => void;
  mode?: 'passenger' | 'driver';
}

export function RideProgressScreen({ onComplete, onCancel, mode = 'passenger' }: RideProgressScreenProps) {
  const { t, direction } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [rideStatus, setRideStatus] = useState<'on_way_to_pickup' | 'passenger_on_board'>('on_way_to_pickup');

  return (
    <div className="relative h-full w-full bg-gray-100" dir={direction}>
      {/* Language Switcher */}
      <div className={`absolute top-14 z-30 ${direction === 'rtl' ? 'left-4' : 'right-4'}`}>
        <LanguageSwitcher />
      </div>
      {/* Map Background with Moving Car */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-gray-100 to-green-50">
        <svg className="absolute inset-0 w-full h-full">
          <path
            d="M 100 200 Q 200 150, 300 400"
            stroke="#0A84FF"
            strokeWidth="6"
            fill="none"
            className="drop-shadow-lg"
          />
          <path
            d="M 100 200 Q 200 150, 250 300"
            stroke="#34C759"
            strokeWidth="6"
            fill="none"
            className="drop-shadow-lg"
          />
        </svg>

        {/* Pickup Point */}
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-gray-400 rounded-full border-4 border-white shadow-lg" />

        {/* Current Position (Car) */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="text-4xl drop-shadow-lg animate-pulse">🚗</div>
        </div>

        {/* Destination Point */}
        <div className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-[#34C759] rounded-full border-4 border-white shadow-lg animate-pulse" />
      </div>

      {/* Status Bar */}
      <div className="absolute top-14 left-4 right-4 bg-white rounded-2xl shadow-lg p-4 z-20">
        <div className="text-center">
          <div className="text-sm text-gray-600 mb-1">{t('progress.inProgress')}</div>
          <div className="text-xl">8 {t('progress.toDestination')}</div>
        </div>
      </div>

      {/* Driver Info Card */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl pb-4 z-20">
        <div
          className="p-6 pb-2 cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

          <div className={`flex items-center justify-between mb-6 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex items-center gap-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white">
                DK
              </div>
              <div className={direction === 'rtl' ? 'text-right' : ''}>
                <div className="font-medium">David Kim</div>
                <div className="text-sm text-gray-600">Toyota Camry • ABC-1234</div>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isCollapsed ? 'rotate-180' : ''} ${
              direction === 'rtl' ? 'scale-x-[-1]' : ''
            }`} />
          </div>

          {!isCollapsed && (
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => {
                    // Simulate opening phone dialer
                    window.location.href = 'tel:+15551234567';
                  }}
                  className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                >
                  <div className="w-12 h-12 bg-[#0A84FF] rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm">{t('progress.call')}</span>
                </button>

                <button
                  onClick={() => setShowChatModal(true)}
                  className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                >
                  <div className="w-12 h-12 bg-[#34C759] rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm">{t('progress.chat')}</span>
                </button>

                <button
                  onClick={() => setShowShareModal(true)}
                  className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
                >
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                    <Share2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm">{t('progress.share')}</span>
                </button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className={`text-sm text-blue-900 ${direction === 'rtl' ? 'text-right' : ''}`}>
                  {t('progress.safety')}
                </div>
              </div>

              {/* Cancel button - only visible before passenger pickup */}
              {rideStatus === 'on_way_to_pickup' && onCancel && (
                <button
                  onClick={() => setShowCancelModal(true)}
                  className={`w-full bg-red-50 text-red-600 py-3 rounded-xl text-sm hover:bg-red-100 transition flex items-center justify-center gap-2 ${
                    direction === 'rtl' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <X className="w-5 h-5" />
                  {t('matching.cancel')}
                </button>
              )}

              <button
                onClick={onComplete}
                className="w-full bg-[#34C759] text-white py-3 rounded-xl text-sm opacity-50"
                disabled
              >
                Arrive at Destination (Demo)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Ride Modal */}
      {showCancelModal && (
        <CancelRideModal
          mode={mode}
          onClose={() => setShowCancelModal(false)}
          onConfirm={(reason) => {
            console.log('Ride cancelled by', mode, '. Reason:', reason);
            setShowCancelModal(false);
            if (onCancel) {
              onCancel();
            }
          }}
        />
      )}

      {/* Chat Modal */}
      {showChatModal && (
        <ChatModal
          onClose={() => setShowChatModal(false)}
          driverName="David Kim"
          mode={mode}
        />
      )}

      {/* Share Ride Modal */}
      {showShareModal && (
        <ShareRideModal
          onClose={() => setShowShareModal(false)}
          onShareEmergencyContact={() => {
            // Simulate sharing with emergency contact
            alert('Live location shared with your emergency contact!');
            setShowShareModal(false);
          }}
        />
      )}
    </div>
  );
}
