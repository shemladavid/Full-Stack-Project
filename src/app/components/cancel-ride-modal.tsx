import { X } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/language-context';

interface CancelRideModalProps {
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  mode: 'passenger' | 'driver';
}

export function CancelRideModal({ onClose, onConfirm, mode }: CancelRideModalProps) {
  const { t, direction } = useLanguage();
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [customReason, setCustomReason] = useState('');

  const passengerReasons = [
    t('cancel.passengerReasons.wrong'),
    t('cancel.passengerReasons.wait'),
    t('cancel.passengerReasons.price'),
    t('cancel.passengerReasons.other'),
  ];

  const driverReasons = [
    t('cancel.driverReasons.far'),
    t('cancel.driverReasons.unsafe'),
    t('cancel.driverReasons.busy'),
    t('cancel.driverReasons.other'),
  ];

  const reasons = mode === 'passenger' ? passengerReasons : driverReasons;

  const handleConfirm = () => {
    const reason = selectedReason === (mode === 'passenger' ? t('cancel.passengerReasons.other') : t('cancel.driverReasons.other'))
      ? customReason
      : selectedReason;
    onConfirm(reason);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-end" onClick={onClose}>
      <div
        className="bg-white rounded-t-3xl w-full p-6 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        dir={direction}
      >
        <div className={`flex items-center justify-between mb-6 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <h3>{t('cancel.title')}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <p className={`text-sm text-gray-600 mb-6 ${direction === 'rtl' ? 'text-right' : ''}`}>
          {t('cancel.subtitle')}
        </p>

        <div className="space-y-3 mb-6">
          {reasons.map((reason) => (
            <button
              key={reason}
              onClick={() => setSelectedReason(reason)}
              className={`w-full p-4 rounded-xl text-left transition ${
                selectedReason === reason
                  ? 'bg-[#0A84FF]/10 border-2 border-[#0A84FF]'
                  : 'bg-gray-50 hover:bg-gray-100'
              } ${direction === 'rtl' ? 'text-right' : ''}`}
            >
              {reason}
            </button>
          ))}
        </div>

        {selectedReason === (mode === 'passenger' ? t('cancel.passengerReasons.other') : t('cancel.driverReasons.other')) && (
          <div className="mb-6">
            <textarea
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder={t('cancel.customPlaceholder')}
              className={`w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#0A84FF] resize-none ${
                direction === 'rtl' ? 'text-right' : ''
              }`}
              rows={3}
            />
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200 transition"
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedReason || (selectedReason === (mode === 'passenger' ? t('cancel.passengerReasons.other') : t('cancel.driverReasons.other')) && !customReason)}
            className={`flex-1 py-3 rounded-xl transition ${
              selectedReason && (selectedReason !== (mode === 'passenger' ? t('cancel.passengerReasons.other') : t('cancel.driverReasons.other')) || customReason)
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            {t('cancel.confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}
