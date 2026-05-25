import { ArrowLeft, Upload, Check } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/language-context';

interface DriverOnboardingScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

export function DriverOnboardingScreen({ onComplete, onBack }: DriverOnboardingScreenProps) {
  const { t, direction } = useLanguage();
  const [step, setStep] = useState(1);
  const [carModel, setCarModel] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [vehicleType, setVehicleType] = useState<'economy' | 'premium' | 'xl'>('economy');
  const [licenseUploaded, setLicenseUploaded] = useState(false);

  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="h-full w-full bg-white flex flex-col overflow-auto" dir={direction}>
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A84FF] to-blue-600 pt-14 pb-8 px-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => step === 1 ? onBack() : setStep(step - 1)}
            className="w-10 h-10 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white"
          >
            <ArrowLeft className={`w-5 h-5 ${direction === 'rtl' ? 'rotate-180' : ''}`} />
          </button>
          <div className="text-white text-sm">
            {t('onboarding.step')} {step} {t('onboarding.of')} {totalSteps}
          </div>
        </div>
        <h2 className="text-white mb-2">{t('onboarding.welcome')}</h2>

        {/* Progress Indicator */}
        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition ${
                s <= step ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 p-6">
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">{t('onboarding.license')}</h3>
              <p className="text-gray-600 text-sm">{t('onboarding.uploadLicense')}</p>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
              {licenseUploaded ? (
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-[#34C759] rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm text-gray-600">License uploaded</div>
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  <button
                    onClick={() => setLicenseUploaded(true)}
                    className="px-6 py-3 bg-[#0A84FF] text-white rounded-xl hover:bg-[#0A84FF]/90 transition"
                  >
                    {t('onboarding.upload')}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="mb-2">{t('onboarding.vehicleDetails')}</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-600">{t('onboarding.carModel')}</label>
                <input
                  type="text"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  placeholder="Toyota Camry"
                  className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#0A84FF]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-600">{t('onboarding.licensePlate')}</label>
                <input
                  type="text"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  placeholder="ABC-1234"
                  className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-[#0A84FF]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-600">{t('onboarding.vehicleType')}</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setVehicleType('economy')}
                    className={`py-3 rounded-xl transition ${
                      vehicleType === 'economy'
                        ? 'bg-[#0A84FF] text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {t('home.economy')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setVehicleType('premium')}
                    className={`py-3 rounded-xl transition ${
                      vehicleType === 'premium'
                        ? 'bg-[#0A84FF] text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {t('home.premium')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setVehicleType('xl')}
                    className={`py-3 rounded-xl transition ${
                      vehicleType === 'xl'
                        ? 'bg-[#0A84FF] text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {t('home.xl')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
            <div className="w-24 h-24 bg-[#34C759] rounded-full flex items-center justify-center">
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
            <div>
              <h3 className="mb-2">{t('onboarding.readyToDrive')}</h3>
              <p className="text-gray-600">{t('onboarding.approved')}</p>
            </div>
          </div>
        )}
      </div>

      {/* Next Button */}
      <div className="p-6 border-t border-gray-100">
        <button
          onClick={handleNext}
          disabled={step === 1 && !licenseUploaded}
          className={`w-full py-4 rounded-xl transition ${
            (step === 1 && !licenseUploaded)
              ? 'bg-gray-100 text-gray-400'
              : 'bg-[#0A84FF] text-white hover:bg-[#0A84FF]/90'
          }`}
        >
          {step === totalSteps ? t('onboarding.startEarning') : t('onboarding.next')}
        </button>
      </div>
    </div>
  );
}
