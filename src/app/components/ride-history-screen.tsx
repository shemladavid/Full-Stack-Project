import { MapPin, Calendar, ChevronRight, Search } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/language-context';
import { LanguageSwitcher } from './language-switcher';

interface RideHistoryScreenProps {
  onBack: () => void;
}

export function RideHistoryScreen({ onBack }: RideHistoryScreenProps) {
  const { t, direction } = useLanguage();
  const [selectedRide, setSelectedRide] = useState<number | null>(null);

  const rides = [
    {
      id: 1,
      date: 'May 3, 2026',
      time: '2:45 PM',
      from: '123 Main St',
      to: 'SFO Airport',
      price: '$32.50',
      driver: 'David Kim',
      rating: 5,
      car: 'Toyota Camry',
    },
    {
      id: 2,
      date: 'May 2, 2026',
      time: '6:30 PM',
      from: 'Office Building',
      to: '456 Oak Avenue',
      price: '$18.00',
      driver: 'Sarah Chen',
      rating: 5,
      car: 'Honda Accord',
    },
    {
      id: 3,
      date: 'May 1, 2026',
      time: '9:15 AM',
      from: 'Home',
      to: 'Downtown Mall',
      price: '$12.50',
      driver: 'Mike Johnson',
      rating: 4,
      car: 'Tesla Model 3',
    },
    {
      id: 4,
      date: 'April 30, 2026',
      time: '5:20 PM',
      from: 'Coffee Shop',
      to: 'Gym',
      price: '$8.75',
      driver: 'Emily Wang',
      rating: 5,
      car: 'Nissan Altima',
    },
    {
      id: 5,
      date: 'April 29, 2026',
      time: '11:00 AM',
      from: 'Restaurant',
      to: 'Home',
      price: '$15.25',
      driver: 'Alex Martinez',
      rating: 5,
      car: 'Hyundai Sonata',
    },
  ];

  return (
    <div className="h-full w-full bg-gray-50 overflow-auto" dir={direction}>
      {/* Header */}
      <div className="bg-white pt-14 pb-6 px-6 border-b border-gray-200 sticky top-0 z-10">
        <div className={`flex items-center justify-between mb-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <h2>{t('history.title')}</h2>
          <LanguageSwitcher />
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 ${
            direction === 'rtl' ? 'right-4' : 'left-4'
          }`} />
          <input
            type="text"
            placeholder={t('history.search')}
            className={`w-full py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#0A84FF] ${
              direction === 'rtl' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4'
            }`}
          />
        </div>
      </div>

      {/* Rides List */}
      <div className="p-4 space-y-3">
        {rides.map((ride) => (
          <div key={ride.id}>
            <button
              onClick={() => setSelectedRide(selectedRide === ride.id ? null : ride.id)}
              className={`w-full bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition ${
                direction === 'rtl' ? 'text-right' : 'text-left'
              }`}
            >
              <div className={`flex items-start justify-between mb-3 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className={`flex items-center gap-2 text-gray-600 mb-2 ${
                    direction === 'rtl' ? 'flex-row-reverse' : ''
                  }`}>
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{ride.date} • {ride.time}</span>
                  </div>

                  <div className="space-y-2">
                    <div className={`flex items-start gap-3 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                      <div className="w-3 h-3 rounded-full bg-[#0A84FF] mt-1" />
                      <div className="flex-1">
                        <div className="text-sm text-gray-600">{t('history.pickup')}</div>
                        <div>{ride.from}</div>
                      </div>
                    </div>

                    <div className={`flex items-start gap-3 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                      <div className="w-3 h-3 rounded-full bg-[#34C759] mt-1" />
                      <div className="flex-1">
                        <div className="text-sm text-gray-600">{t('history.dropoff')}</div>
                        <div>{ride.to}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`ml-4 ${direction === 'rtl' ? 'text-left mr-4 ml-0' : 'text-right'}`}>
                  <div className="font-medium mb-1">{ride.price}</div>
                  <ChevronRight
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      selectedRide === ride.id ? 'rotate-90' : ''
                    } ${direction === 'rtl' ? 'rotate-180' : ''}`}
                  />
                </div>
              </div>

              {selectedRide === ride.id && (
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className={`flex items-center justify-between mb-2 ${
                      direction === 'rtl' ? 'flex-row-reverse' : ''
                    }`}>
                      <span className="text-sm text-gray-600">{t('history.driver')}</span>
                      <span className="font-medium">{ride.driver}</span>
                    </div>
                    <div className={`flex items-center justify-between mb-2 ${
                      direction === 'rtl' ? 'flex-row-reverse' : ''
                    }`}>
                      <span className="text-sm text-gray-600">{t('history.vehicle')}</span>
                      <span className="font-medium">{ride.car}</span>
                    </div>
                    <div className={`flex items-center justify-between ${
                      direction === 'rtl' ? 'flex-row-reverse' : ''
                    }`}>
                      <span className="text-sm text-gray-600">{t('history.yourRating')}</span>
                      <span className="font-medium">{'⭐'.repeat(ride.rating)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition">
                      {t('history.receipt')}
                    </button>
                    <button className="flex-1 py-2 bg-[#0A84FF] text-white rounded-lg text-sm hover:bg-[#0A84FF]/90 transition">
                      {t('history.rebook')}
                    </button>
                  </div>
                </div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Back Button - Hidden when bottom nav is present */}
      <div className="p-6 pb-20">
        <button
          onClick={onBack}
          className="w-full bg-gray-200 text-gray-700 py-4 rounded-xl hover:bg-gray-300 transition"
        >
          {t('history.back')}
        </button>
      </div>
    </div>
  );
}
