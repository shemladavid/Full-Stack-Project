import { ArrowLeft, User, Car, Settings, LogOut, ChevronRight, Languages } from 'lucide-react';
import { useLanguage } from '../context/language-context';
import { LanguageSwitcher } from './language-switcher';

interface ProfileScreenProps {
  onBack: () => void;
  onSwitchMode: () => void;
  onLogout: () => void;
  onSettings: () => void;
  userRole: 'passenger' | 'driver' | 'both';
  currentMode: 'passenger' | 'driver';
  driverLanguages?: ('en' | 'he')[];
}

export function ProfileScreen({
  onBack,
  onSwitchMode,
  onLogout,
  onSettings,
  userRole,
  currentMode,
  driverLanguages = ['en'],
}: ProfileScreenProps) {
  const { t, direction } = useLanguage();

  return (
    <div className="h-full w-full bg-gray-50 overflow-auto" dir={direction}>
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

        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white text-2xl">
            JD
          </div>
          <div>
            <h2 className="text-white mb-1">John Doe</h2>
            <p className="text-blue-100 text-sm">john.doe@email.com</p>
          </div>
        </div>
      </div>

      <div className="p-6 pb-24 space-y-6">
        {/* Current Mode Section */}
        <div className="bg-gradient-to-br from-[#0A84FF] to-blue-600 rounded-2xl p-6 shadow-sm text-white">
          <div className="text-sm text-blue-100 mb-2">Current Mode</div>
          <div className={`flex items-center gap-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
              {currentMode === 'passenger' ? (
                <User className="w-6 h-6 text-white" />
              ) : (
                <Car className="w-6 h-6 text-white" />
              )}
            </div>
            <div className={direction === 'rtl' ? 'text-right' : ''}>
              <h3 className="text-white">
                {currentMode === 'passenger' ? t('profile.passengerMode') : t('profile.driverMode')}
              </h3>
              <p className="text-blue-100 text-sm">{t('switcher.current')}</p>
            </div>
          </div>

          {userRole === 'both' && (
            <button
              onClick={onSwitchMode}
              className="w-full mt-4 bg-white/20 backdrop-blur text-white py-3 rounded-xl hover:bg-white/30 transition"
            >
              {t('profile.switchMode')}
            </button>
          )}
        </div>

        {/* Available Roles Section */}
        {userRole === 'both' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="mb-4">{t('profile.roles')}</h3>

            <div className="space-y-3">
              <div className={`flex items-center gap-4 p-3 rounded-xl bg-gray-50 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{t('profile.passengerMode')}</div>
                </div>
              </div>

              <div className={`flex items-center gap-4 p-3 rounded-xl bg-gray-50 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200">
                  <Car className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{t('profile.driverMode')}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Driver Languages (if driver) */}
        {(userRole === 'driver' || userRole === 'both') && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="mb-4">{t('profile.languages')}</h3>
            <div className={`flex items-center gap-3 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <Languages className="w-5 h-5 text-gray-400" />
              <div className="flex gap-2">
                {driverLanguages.includes('en') && (
                  <span className="px-3 py-1 bg-blue-50 text-[#0A84FF] rounded-full text-sm">
                    {t('filter.english')}
                  </span>
                )}
                {driverLanguages.includes('he') && (
                  <span className="px-3 py-1 bg-blue-50 text-[#0A84FF] rounded-full text-sm">
                    {t('filter.hebrew')}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Settings */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <button
            onClick={onSettings}
            className={`w-full p-4 flex items-center justify-between hover:bg-gray-50 transition ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`flex items-center gap-3 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <Settings className="w-5 h-5 text-gray-600" />
              <span>{t('profile.settings')}</span>
            </div>
            <ChevronRight className={`w-5 h-5 text-gray-400 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
          </button>

          <div className="h-px bg-gray-100" />

          <button
            onClick={onLogout}
            className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition text-red-500 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}
          >
            <LogOut className="w-5 h-5" />
            <span>{t('profile.logout')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
