import { Star, Check } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/language-context';
import { LanguageSwitcher } from './language-switcher';

interface RatingScreenProps {
  onComplete: () => void;
}

export function RatingScreen({ onComplete }: RatingScreenProps) {
  const { t, direction } = useLanguage();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  const getRatingText = () => {
    const texts = ['rating.sorry', 'rating.couldBeBetter', 'rating.good', 'rating.great', 'rating.excellent'];
    return rating > 0 ? t(texts[rating - 1]) : '';
  };

  if (submitted) {
    return (
      <div className="h-full w-full bg-white flex flex-col items-center justify-center p-6" dir={direction}>
        {/* Language Switcher */}
        <div className={`absolute top-14 ${direction === 'rtl' ? 'left-4' : 'right-4'}`}>
          <LanguageSwitcher />
        </div>

        <div className="w-24 h-24 bg-[#34C759] rounded-full flex items-center justify-center mb-6 animate-scale">
          <Check className="w-12 h-12 text-white" strokeWidth={3} />
        </div>
        <h2 className="mb-2">{t('rating.thankYou')}</h2>
        <p className="text-gray-600 text-center">
          {t('rating.helps')}
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-white flex flex-col relative" dir={direction}>
      {/* Language Switcher */}
      <div className={`absolute top-14 ${direction === 'rtl' ? 'left-4' : 'right-4'} z-10`}>
        <LanguageSwitcher />
      </div>
      {/* Header */}
      <div className="bg-gradient-to-b from-gray-50 to-white pt-14 pb-8 px-6 text-center">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
          DK
        </div>
        <h3 className="mb-1">{t('rating.howWasRide')} David?</h3>
        <p className="text-gray-600">{t('rating.feedback')}</p>
      </div>

      {/* Rating Stars */}
      <div className="px-6 py-8 flex-1">
        <div className="flex justify-center gap-4 mb-8">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`w-12 h-12 ${
                  star <= (hoveredRating || rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Feedback Text */}
        {rating > 0 && (
          <div className="text-center mb-6 text-gray-600">
            {getRatingText()}
          </div>
        )}

        {/* Optional Feedback */}
        <div className="space-y-2 mb-6">
          <label className={`text-sm text-gray-600 ${direction === 'rtl' ? 'text-right block' : ''}`}>
            {t('rating.additional')}
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder={t('rating.placeholder')}
            className={`w-full h-32 p-4 bg-gray-50 rounded-xl resize-none outline-none focus:ring-2 focus:ring-[#0A84FF] ${
              direction === 'rtl' ? 'text-right' : ''
            }`}
          />
        </div>

        {/* Quick Tags */}
        {rating > 0 && rating < 4 && (
          <div className="space-y-2 mb-6">
            <div className={`text-sm text-gray-600 ${direction === 'rtl' ? 'text-right' : ''}`}>
              {t('rating.improve')}
            </div>
            <div className={`flex flex-wrap gap-2 ${direction === 'rtl' ? 'justify-end' : ''}`}>
              {['cleanliness', 'route', 'driving', 'communication'].map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition"
                >
                  {t(`rating.${tag}`)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div className="p-6 border-t border-gray-100">
        <button
          onClick={handleSubmit}
          disabled={rating === 0}
          className={`w-full py-4 rounded-xl transition ${
            rating > 0
              ? 'bg-[#0A84FF] text-white hover:bg-[#0A84FF]/90'
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          {t('rating.submit')}
        </button>
      </div>
    </div>
  );
}
