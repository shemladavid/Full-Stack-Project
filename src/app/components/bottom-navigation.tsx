import { Home, Clock, MapPin, User, Map, DollarSign, List } from 'lucide-react';
import { useLanguage } from '../context/language-context';

interface BottomNavigationProps {
  mode: 'passenger' | 'driver';
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ mode, currentTab, onTabChange }: BottomNavigationProps) {
  const { t, direction } = useLanguage();

  const passengerTabs = [
    { id: 'home', icon: Home, labelKey: 'nav.home' },
    { id: 'activity', icon: Clock, labelKey: 'nav.activity' },
    { id: 'saved', icon: MapPin, labelKey: 'nav.saved' },
    { id: 'profile', icon: User, labelKey: 'nav.profile' },
  ];

  const driverTabs = [
    { id: 'requests', icon: List, labelKey: 'nav.requests' },
    { id: 'activity', icon: Clock, labelKey: 'nav.activity' },
    { id: 'earnings', icon: DollarSign, labelKey: 'nav.earnings' },
    { id: 'profile', icon: User, labelKey: 'nav.profile' },
  ];

  const tabs = mode === 'passenger' ? passengerTabs : driverTabs;

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50" dir={direction}>
      <div className="flex items-center justify-around px-4 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition ${
                isActive ? 'text-[#0A84FF]' : 'text-gray-500'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'fill-[#0A84FF]/10' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs">{t(tab.labelKey)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
