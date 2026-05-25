import { Home, Briefcase, MapPin, Plus, Star, Edit2, Trash2, Navigation } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/language-context';
import { LanguageSwitcher } from './language-switcher';

interface SavedPlace {
  id: number;
  type: 'home' | 'work' | 'favorite';
  nameKey?: string;
  customName?: string;
  address: string;
  icon: typeof Home | typeof Briefcase | typeof MapPin | typeof Star;
}

export function SavedPlacesScreen() {
  const { t, direction } = useLanguage();
  const [showAddPlace, setShowAddPlace] = useState(false);
  const [editingPlace, setEditingPlace] = useState<SavedPlace | null>(null);
  const [usePhoneLocation, setUsePhoneLocation] = useState(false);
  const [placeName, setPlaceName] = useState('');
  const [placeAddress, setPlaceAddress] = useState('');

  const [savedPlaces, setSavedPlaces] = useState<SavedPlace[]>([
    {
      id: 1,
      type: 'home',
      nameKey: 'saved.home',
      address: '123 Main St, Apartment 4B',
      icon: Home,
    },
    {
      id: 2,
      type: 'work',
      nameKey: 'saved.work',
      address: '456 Business Plaza, Suite 200',
      icon: Briefcase,
    },
    {
      id: 3,
      type: 'favorite',
      customName: 'Gym',
      address: '789 Fitness Center, Downtown',
      icon: Star,
    },
    {
      id: 4,
      type: 'favorite',
      customName: "Mom's House",
      address: '321 Oak Avenue',
      icon: MapPin,
    },
  ]);

  const handleEdit = (place: SavedPlace) => {
    setEditingPlace(place);
    setPlaceName(place.customName || '');
    setPlaceAddress(place.address);
    setShowAddPlace(true);
  };

  const handleDelete = (id: number) => {
    setSavedPlaces(savedPlaces.filter(p => p.id !== id));
  };

  const handleSave = () => {
    if (editingPlace) {
      // Update existing place
      setSavedPlaces(savedPlaces.map(p =>
        p.id === editingPlace.id
          ? { ...p, customName: placeName, address: placeAddress }
          : p
      ));
    } else {
      // Add new place
      const newPlace: SavedPlace = {
        id: Date.now(),
        type: 'favorite',
        customName: placeName,
        address: usePhoneLocation ? 'Current Location (GPS)' : placeAddress,
        icon: MapPin,
      };
      setSavedPlaces([...savedPlaces, newPlace]);
    }
    setShowAddPlace(false);
    setEditingPlace(null);
    setPlaceName('');
    setPlaceAddress('');
    setUsePhoneLocation(false);
  };

  const handleUseCurrentLocation = () => {
    setUsePhoneLocation(true);
    setPlaceAddress('Getting current location...');
    // Simulate getting GPS location
    setTimeout(() => {
      setPlaceAddress('Current Location (37.7749° N, 122.4194° W)');
    }, 1000);
  };

  return (
    <div className="h-full w-full bg-gray-50 overflow-auto pb-20" dir={direction}>
      {/* Header */}
      <div className="bg-white pt-14 pb-6 px-6 border-b border-gray-200 sticky top-0 z-10">
        <div className={`flex items-center justify-between mb-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
          <h2>{t('saved.title')}</h2>
          <LanguageSwitcher />
        </div>

        <p className={`text-sm text-gray-600 ${direction === 'rtl' ? 'text-right' : ''}`}>
          {t('saved.subtitle')}
        </p>
      </div>

      {/* Saved Places List */}
      <div className="p-4 space-y-3">
        {savedPlaces.map((place) => {
          const Icon = place.icon;
          return (
            <div
              key={place.id}
              className="bg-white rounded-2xl p-4 shadow-sm"
            >
              <div className={`flex items-start gap-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  place.type === 'home' ? 'bg-blue-50' :
                  place.type === 'work' ? 'bg-purple-50' :
                  'bg-gray-50'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    place.type === 'home' ? 'text-[#0A84FF]' :
                    place.type === 'work' ? 'text-purple-500' :
                    'text-gray-600'
                  }`} />
                </div>

                <div className={`flex-1 ${direction === 'rtl' ? 'text-right' : ''}`}>
                  <div className="font-medium mb-1">
                    {place.nameKey ? t(place.nameKey) : place.customName}
                  </div>
                  <div className="text-sm text-gray-600">{place.address}</div>
                </div>

                <div className={`flex gap-2 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
                  <button
                    onClick={() => handleEdit(place)}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition"
                    aria-label={t('saved.edit')}
                  >
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDelete(place.id)}
                    className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center hover:bg-red-100 transition"
                    aria-label={t('saved.delete')}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Place Button */}
        <button
          onClick={() => {
            setEditingPlace(null);
            setPlaceName('');
            setPlaceAddress('');
            setUsePhoneLocation(false);
            setShowAddPlace(true);
          }}
          className={`w-full bg-white border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-[#0A84FF] hover:bg-blue-50 transition ${
            direction === 'rtl' ? 'text-right' : 'text-left'
          }`}
        >
          <div className={`flex items-center gap-4 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}>
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <div className="font-medium text-gray-900">{t('saved.addNew')}</div>
              <div className="text-sm text-gray-600">{t('saved.addSubtitle')}</div>
            </div>
          </div>
        </button>
      </div>

      {/* Add Place Modal */}
      {showAddPlace && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end" onClick={() => setShowAddPlace(false)}>
          <div
            className="bg-white rounded-t-3xl w-full p-6 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
            dir={direction}
          >
            <h3 className="mb-4">{editingPlace ? t('common.edit') : t('saved.addNew')}</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className={`text-sm text-gray-600 ${direction === 'rtl' ? 'text-right block' : ''}`}>
                  {t('saved.placeName')}
                </label>
                <input
                  type="text"
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                  placeholder={t('saved.placeNamePlaceholder')}
                  className={`w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#0A84FF] ${
                    direction === 'rtl' ? 'text-right' : ''
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className={`text-sm text-gray-600 ${direction === 'rtl' ? 'text-right block' : ''}`}>
                  {t('saved.address')}
                </label>

                {/* Location Options */}
                <div className="flex gap-2 mb-2">
                  <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition ${
                      usePhoneLocation
                        ? 'bg-[#0A84FF] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Navigation className="w-4 h-4" />
                    <span className="text-sm">Use Current Location</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUsePhoneLocation(false);
                      setPlaceAddress('');
                    }}
                    className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition ${
                      !usePhoneLocation
                        ? 'bg-[#0A84FF] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Enter Address</span>
                  </button>
                </div>

                <input
                  type="text"
                  value={placeAddress}
                  onChange={(e) => setPlaceAddress(e.target.value)}
                  placeholder={t('saved.addressPlaceholder')}
                  disabled={usePhoneLocation}
                  className={`w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#0A84FF] ${
                    direction === 'rtl' ? 'text-right' : ''
                  } ${usePhoneLocation ? 'opacity-50' : ''}`}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowAddPlace(false);
                    setEditingPlace(null);
                    setPlaceName('');
                    setPlaceAddress('');
                    setUsePhoneLocation(false);
                  }}
                  className="flex-1 py-3 bg-gray-100 rounded-xl text-gray-700 hover:bg-gray-200 transition"
                >
                  {t('common.cancel')}
                </button>
                <button
                  onClick={handleSave}
                  disabled={!placeName || !placeAddress}
                  className={`flex-1 py-3 rounded-xl transition ${
                    placeName && placeAddress
                      ? 'bg-[#0A84FF] text-white hover:bg-[#0A84FF]/90'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {t('common.save')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
