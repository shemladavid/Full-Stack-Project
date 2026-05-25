import { Car } from 'lucide-react';
import { useLanguage } from '../context/language-context';
import { LanguageSwitcher } from './language-switcher';

interface WelcomeScreenProps {
  onLogin: () => void;
  onSignUp: () => void;
}

export function WelcomeScreen({ onLogin, onSignUp }: WelcomeScreenProps) {
  const { t, direction } = useLanguage();

  return (
    <div className="h-full w-full bg-gradient-to-br from-[#0A84FF] to-blue-600 flex flex-col" dir={direction}>
      {/* Language Switcher */}
      <div className={`absolute top-14 ${direction === 'rtl' ? 'left-4' : 'right-4'} z-10`}>
        <LanguageSwitcher />
      </div>

      {/* Logo and Tagline */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-xl">
          <Car className="w-12 h-12 text-[#0A84FF]" />
        </div>

        <h1 className="text-white text-3xl text-center mb-3">RideNow</h1>
        <p className="text-blue-100 text-center text-lg">{t('welcome.tagline')}</p>
      </div>

      {/* Actions */}
      <div className="p-8 space-y-4">
        <button
          onClick={onLogin}
          className="w-full bg-white text-[#0A84FF] py-4 rounded-xl shadow-lg hover:bg-gray-50 transition"
        >
          {t('login.button')}
        </button>

        <div className="text-center">
          <span className="text-white text-sm">{t('login.noAccount')} </span>
          <button
            onClick={onSignUp}
            className="text-white text-sm font-medium underline"
          >
            {t('login.signupLink')}
          </button>
        </div>
      </div>
    </div>
  );
}
