import { DollarSign, Car, Star, TrendingUp, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/language-context';
import { LanguageSwitcher } from './language-switcher';

interface DriverDashboardScreenProps {
  onBack: () => void;
}

export function DriverDashboardScreen({ onBack }: DriverDashboardScreenProps) {
  const { t, direction } = useLanguage();
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="h-full w-full bg-gray-50 overflow-auto" dir={direction}>
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A84FF] to-blue-600 pt-14 pb-8 px-6 text-white">
        <div className={`flex items-center justify-between mb-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <div className={direction === 'rtl' ? 'text-right' : ''}>
            <h2 className="text-white mb-1">{t('dashboard.welcome')}, David</h2>
            <p className="text-blue-100 text-sm">{t('dashboard.ready')}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-2xl">
              DK
            </div>
          </div>
        </div>

        <div className={`mb-6 ${direction === 'rtl' ? 'text-left' : 'text-right'}`}>
          <LanguageSwitcher />
        </div>

        {/* Online Toggle */}
        <div className={`bg-white/10 backdrop-blur rounded-2xl p-4 flex items-center justify-between ${
          direction === 'rtl' ? 'flex-row-reverse' : ''
        }`}>
          <div className={direction === 'rtl' ? 'text-right' : ''}>
            <div className="font-medium mb-1">
              {isOnline ? t('dashboard.online') : t('dashboard.offline')}
            </div>
            <div className="text-sm text-blue-100">
              {isOnline ? t('dashboard.available') : t('dashboard.tapOnline')}
            </div>
          </div>
          <button
            onClick={() => setIsOnline(!isOnline)}
            className={`w-16 h-9 rounded-full transition-all relative ${
              isOnline ? 'bg-[#34C759]' : 'bg-white/20'
            }`}
          >
            <div
              className={`absolute top-1 w-7 h-7 bg-white rounded-full shadow-lg transition-transform ${
                isOnline
                  ? direction === 'rtl'
                    ? '-translate-x-8'
                    : 'translate-x-8'
                  : direction === 'rtl'
                  ? '-translate-x-1'
                  : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Earnings Summary */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="mb-4">{t('dashboard.todayEarnings')}</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gradient-to-br from-[#34C759] to-green-600 rounded-xl p-4 text-white">
              <div className={`flex items-center gap-2 mb-2 text-green-100 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <DollarSign className="w-4 h-4" />
                <span className="text-sm">{t('dashboard.today')}</span>
              </div>
              <div className="text-2xl">$247.50</div>
              <div className="text-sm text-green-100 mt-1">18 {t('matching.trips')}</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <div className={`flex items-center gap-2 mb-2 text-gray-600 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">{t('dashboard.thisWeek')}</span>
              </div>
              <div className="text-2xl">$1,248</div>
              <div className="text-sm text-gray-600 mt-1">87 {t('matching.trips')}</div>
            </div>
          </div>

          <div className={`flex items-center justify-between pt-4 border-t border-gray-100 ${
            direction === 'rtl' ? 'flex-row-reverse' : ''
          }`}>
            <div className={`flex items-center gap-2 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600">{t('dashboard.rating')}</span>
            </div>
            <span className="font-medium">4.9</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <Car className="w-6 h-6 text-[#0A84FF] mx-auto mb-2" />
            <div className="text-xl">328</div>
            <div className="text-xs text-gray-600">{t('dashboard.totalTrips')}</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <Clock className="w-6 h-6 text-[#34C759] mx-auto mb-2" />
            <div className="text-xl">32h</div>
            <div className="text-xs text-gray-600">{t('dashboard.thisWeek')}</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm text-center">
            <TrendingUp className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <div className="text-xl">+15%</div>
            <div className="text-xs text-gray-600">vs Last Week</div>
          </div>
        </div>

        {/* Recent Rides */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="mb-4">{t('dashboard.recentRides')}</h3>

          <div className="space-y-3">
            {[
              { time: '2:45 PM', route: 'Downtown → Airport', amount: '$32.50', rating: 5 },
              { time: '1:20 PM', route: 'Marina Bay → Hotel', amount: '$18.00', rating: 5 },
              { time: '11:30 AM', route: 'Subway → Office Park', amount: '$12.50', rating: 4 },
              { time: '10:15 AM', route: 'Residential → Mall', amount: '$15.75', rating: 5 },
            ].map((ride, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{ride.route}</span>
                  </div>
                  <div className="text-xs text-gray-500">{ride.time}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium mb-1">{ride.amount}</div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600">{ride.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onBack}
          className="w-full bg-gray-200 text-gray-700 py-4 rounded-xl hover:bg-gray-300 transition mb-20"
        >
          {t('dashboard.backPassenger')}
        </button>
      </div>
    </div>
  );
}
