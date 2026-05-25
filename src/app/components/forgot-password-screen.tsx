import { ArrowLeft, Mail, Check } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/language-context';
import { LanguageSwitcher } from './language-switcher';

interface ForgotPasswordScreenProps {
  onBack: () => void;
}

export function ForgotPasswordScreen({ onBack }: ForgotPasswordScreenProps) {
  const { t, direction } = useLanguage();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending email
    setSent(true);
  };

  if (sent) {
    return (
      <div className="h-full w-full bg-white flex flex-col items-center justify-center p-6" dir={direction}>
        <div className="w-24 h-24 bg-[#34C759] rounded-full flex items-center justify-center mb-6 animate-scale">
          <Check className="w-12 h-12 text-white" strokeWidth={3} />
        </div>
        <h2 className="mb-2">{t('forgot.sent')}</h2>
        <p className="text-gray-600 text-center mb-6">
          {t('forgot.checkEmail')}
        </p>
        <button
          onClick={onBack}
          className="px-8 py-3 bg-[#0A84FF] text-white rounded-xl hover:bg-[#0A84FF]/90 transition"
        >
          {t('forgot.backToLogin')}
        </button>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-white flex flex-col overflow-auto" dir={direction}>
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A84FF] to-blue-600 pt-14 pb-8 px-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white"
          >
            <ArrowLeft className={`w-5 h-5 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
          </button>
          <LanguageSwitcher />
        </div>
        <h2 className="text-white mb-2">{t('forgot.title')}</h2>
        <p className="text-blue-100 text-sm">{t('forgot.subtitle')}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-6">
        <div className="space-y-2">
          <label className="text-sm text-gray-600">{t('login.email')}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className={`w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#0A84FF] ${
              direction === 'rtl' ? 'text-right' : ''
            }`}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#0A84FF] text-white py-4 rounded-xl hover:bg-[#0A84FF]/90 transition"
        >
          {t('forgot.sendReset')}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={onBack}
            className="text-[#0A84FF] text-sm"
          >
            {t('forgot.backToLogin')}
          </button>
        </div>
      </form>
    </div>
  );
}
