import { useLanguage } from '../context/language-context';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center bg-gray-100 rounded-full p-1">
      <button
        onClick={() => setLanguage('en')}
        className={`px-3 py-1 rounded-full text-sm transition ${
          language === 'en'
            ? 'bg-white shadow-sm'
            : 'text-gray-600'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage('he')}
        className={`px-3 py-1 rounded-full text-sm transition ${
          language === 'he'
            ? 'bg-white shadow-sm'
            : 'text-gray-600'
        }`}
      >
        HE
      </button>
    </div>
  );
}
