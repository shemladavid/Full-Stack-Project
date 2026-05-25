import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/language-context';
import { LanguageSwitcher } from './language-switcher';

interface LogInScreenProps {
  onLogin: (role?: 'passenger' | 'driver') => void;
  onBack: () => void;
  onSignUpClick: () => void;
  onForgotPassword: () => void;
  userHasBothRoles?: boolean;
}

export function LogInScreen({ onLogin, onBack, onSignUpClick, onForgotPassword, userHasBothRoles = false }: LogInScreenProps) {
  const { t, direction } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'passenger' | 'driver'>('passenger');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(userHasBothRoles ? selectedRole : undefined);
  };

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
        <h2 className="text-white mb-2">{t('login.title')}</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex-1 p-6 space-y-6">
        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">{t('login.email')}</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#0A84FF]"
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-sm text-gray-600">{t('login.password')}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#0A84FF]"
            required
          />
        </div>

        <button
          type="button"
          onClick={onForgotPassword}
          className={`w-full text-${direction === 'rtl' ? 'left' : 'right'} text-[#0A84FF] text-sm`}
        >
          {t('login.forgot')}
        </button>

        {/* Role Selection (if user has both roles) */}
        {userHasBothRoles && (
          <div className="space-y-2">
            <label className="text-sm text-gray-600">{t('signup.role')}</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedRole('passenger')}
                className={`py-3 rounded-xl transition ${
                  selectedRole === 'passenger'
                    ? 'bg-[#0A84FF] text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {t('signup.passenger')}
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('driver')}
                className={`py-3 rounded-xl transition ${
                  selectedRole === 'driver'
                    ? 'bg-[#0A84FF] text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {t('signup.driver')}
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-[#0A84FF] text-white py-4 rounded-xl hover:bg-[#0A84FF]/90 transition"
        >
          {t('login.button')}
        </button>

        <div className="text-center">
          <span className="text-gray-600 text-sm">{t('login.noAccount')} </span>
          <button
            type="button"
            onClick={onSignUpClick}
            className="text-[#0A84FF] text-sm"
          >
            {t('login.signupLink')}
          </button>
        </div>
      </form>
    </div>
  );
}
