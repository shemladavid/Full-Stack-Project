import { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/language-context';
import { HomeScreen } from './components/home-screen';
import { DriverHomeScreen } from './components/driver-home-screen';
import { DriverMatchingScreen } from './components/driver-matching-screen';
import { RideProgressScreen } from './components/ride-progress-screen';
import { RatingScreen } from './components/rating-screen';
import { DriverDashboardScreen } from './components/driver-dashboard-screen';
import { RideHistoryScreen } from './components/ride-history-screen';
import { WelcomeScreen } from './components/welcome-screen';
import { SignUpScreen } from './components/sign-up-screen';
import { LogInScreen } from './components/log-in-screen';
import { DriverOnboardingScreen } from './components/driver-onboarding-screen';
import { ProfileScreen } from './components/profile-screen';
import { RoleSwitcherModal } from './components/role-switcher-modal';
import { BottomNavigation } from './components/bottom-navigation';
import { ActivityScreen } from './components/activity-screen';
import { SavedPlacesScreen } from './components/saved-places-screen';
import { SettingsScreen } from './components/settings-screen';
import { ForgotPasswordScreen } from './components/forgot-password-screen';

type Screen =
  | 'welcome'
  | 'signup'
  | 'login'
  | 'forgot-password'
  | 'driver-onboarding'
  | 'passenger-home'
  | 'driver-home'
  | 'matching'
  | 'progress'
  | 'rating'
  | 'driver-dashboard'
  | 'history'
  | 'profile'
  | 'activity'
  | 'saved'
  | 'settings'
  | 'earnings';

function AppContent() {
  const { direction } = useLanguage();
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'passenger' | 'driver' | 'both'>('passenger');
  const [currentMode, setCurrentMode] = useState<'passenger' | 'driver'>('passenger');
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  const [signUpDefaultRole, setSignUpDefaultRole] = useState<'passenger' | 'driver' | 'both'>('passenger');
  const [currentTab, setCurrentTab] = useState('home');

  const handleSignUp = (role: 'passenger' | 'driver' | 'both') => {
    setUserRole(role);
    if (role === 'driver' || role === 'both') {
      setCurrentScreen('driver-onboarding');
    } else {
      setIsAuthenticated(true);
      setCurrentMode('passenger');
      setCurrentScreen('passenger-home');
      setCurrentTab('home');
    }
  };

  const handleLogin = (role?: 'passenger' | 'driver') => {
    setIsAuthenticated(true);
    const selectedMode = role || (userRole === 'driver' ? 'driver' : 'passenger');
    setCurrentMode(selectedMode);

    if (selectedMode === 'driver') {
      setCurrentScreen('driver-home');
      setCurrentTab('requests');
    } else {
      setCurrentScreen('passenger-home');
      setCurrentTab('home');
    }
  };

  const handleDriverOnboardingComplete = () => {
    setIsAuthenticated(true);
    const mode = userRole === 'driver' ? 'driver' : 'passenger';
    setCurrentMode(mode);

    if (mode === 'driver') {
      setCurrentScreen('driver-home');
      setCurrentTab('requests');
    } else {
      setCurrentScreen('passenger-home');
      setCurrentTab('home');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentScreen('welcome');
  };

  const handleRoleSwitch = (newRole: 'passenger' | 'driver') => {
    setCurrentMode(newRole);
    if (newRole === 'driver') {
      setCurrentScreen('driver-home');
      setCurrentTab('requests');
    } else {
      setCurrentScreen('passenger-home');
      setCurrentTab('home');
    }
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);

    if (currentMode === 'passenger') {
      if (tab === 'home') setCurrentScreen('passenger-home');
      else if (tab === 'activity') setCurrentScreen('activity');
      else if (tab === 'saved') setCurrentScreen('saved');
      else if (tab === 'profile') setCurrentScreen('profile');
    } else {
      if (tab === 'requests') setCurrentScreen('driver-home');
      else if (tab === 'activity') setCurrentScreen('activity');
      else if (tab === 'earnings') setCurrentScreen('earnings');
      else if (tab === 'profile') setCurrentScreen('profile');
    }
  };

  const renderScreen = () => {
    if (!isAuthenticated) {
      switch (currentScreen) {
        case 'welcome':
          return (
            <WelcomeScreen
              onLogin={() => setCurrentScreen('login')}
              onSignUp={() => setCurrentScreen('signup')}
            />
          );
        case 'signup':
          return (
            <SignUpScreen
              defaultRole={signUpDefaultRole}
              onSignUp={handleSignUp}
              onBack={() => setCurrentScreen('welcome')}
              onLoginClick={() => setCurrentScreen('login')}
            />
          );
        case 'login':
          return (
            <LogInScreen
              onLogin={handleLogin}
              onBack={() => setCurrentScreen('welcome')}
              onSignUpClick={() => setCurrentScreen('signup')}
              onForgotPassword={() => setCurrentScreen('forgot-password')}
              userHasBothRoles={userRole === 'both'}
            />
          );
        case 'forgot-password':
          return (
            <ForgotPasswordScreen
              onBack={() => setCurrentScreen('login')}
            />
          );
        case 'driver-onboarding':
          return (
            <DriverOnboardingScreen
              onComplete={handleDriverOnboardingComplete}
              onBack={() => setCurrentScreen('signup')}
            />
          );
        default:
          return (
            <WelcomeScreen
              onLogin={() => setCurrentScreen('login')}
              onSignUp={() => setCurrentScreen('signup')}
            />
          );
      }
    }

    switch (currentScreen) {
      case 'passenger-home':
        return <HomeScreen onRequestRide={() => setCurrentScreen('matching')} />;
      case 'driver-home':
        return <DriverHomeScreen onAcceptRide={() => setCurrentScreen('progress')} />;
      case 'matching':
        return (
          <DriverMatchingScreen
            onCancel={() => setCurrentScreen('passenger-home')}
            onMatched={() => setCurrentScreen('progress')}
          />
        );
      case 'progress':
        return (
          <RideProgressScreen
            onComplete={() => setCurrentScreen('rating')}
            onCancel={() => {
              if (currentMode === 'driver') {
                setCurrentScreen('driver-home');
                setCurrentTab('requests');
              } else {
                setCurrentScreen('passenger-home');
                setCurrentTab('home');
              }
            }}
            mode={currentMode}
          />
        );
      case 'rating':
        return <RatingScreen onComplete={() => {
          if (currentMode === 'driver') {
            setCurrentScreen('driver-home');
            setCurrentTab('requests');
          } else {
            setCurrentScreen('passenger-home');
            setCurrentTab('home');
          }
        }} />;
      case 'earnings':
        return <DriverDashboardScreen onBack={() => {
          setCurrentScreen('driver-home');
          setCurrentTab('requests');
        }} />;
      case 'activity':
        return <ActivityScreen mode={currentMode} />;
      case 'saved':
        return <SavedPlacesScreen />;
      case 'settings':
        return <SettingsScreen mode={currentMode} />;
      case 'history':
        return <RideHistoryScreen onBack={() => {
          if (currentMode === 'driver') {
            setCurrentScreen('driver-home');
            setCurrentTab('requests');
          } else {
            setCurrentScreen('passenger-home');
            setCurrentTab('home');
          }
        }} />;
      case 'profile':
        return (
          <ProfileScreen
            onBack={() => {
              if (currentMode === 'driver') {
                setCurrentScreen('driver-home');
                setCurrentTab('requests');
              } else {
                setCurrentScreen('passenger-home');
                setCurrentTab('home');
              }
            }}
            onSwitchMode={() => setShowRoleSwitcher(true)}
            onLogout={handleLogout}
            userRole={userRole}
            currentMode={currentMode}
            driverLanguages={['en', 'he']}
            onSettings={() => {
              setCurrentScreen('settings');
              setCurrentTab('profile');
            }}
          />
        );
      default:
        return currentMode === 'driver'
          ? <DriverHomeScreen onAcceptRide={() => setCurrentScreen('progress')} />
          : <HomeScreen onRequestRide={() => setCurrentScreen('matching')} />;
    }
  };

  const showBottomNav = isAuthenticated && !['matching', 'progress', 'rating'].includes(currentScreen);

  return (
    <div className="size-full flex items-center justify-center bg-gray-900">
      {/* Mobile Frame */}
      <div className="relative w-[390px] h-[844px] bg-white rounded-[3rem] shadow-2xl overflow-hidden border-8 border-gray-800">
        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 h-14 bg-white z-50 flex items-center justify-between px-8 pt-2">
          <div className="text-sm">9:41</div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-3 border border-gray-900 rounded-sm" />
            <div className="w-1 h-3 bg-gray-900 rounded-sm" />
          </div>
        </div>

        {/* Role Switcher Modal */}
        {showRoleSwitcher && userRole === 'both' && (
          <RoleSwitcherModal
            currentRole={currentMode}
            onSwitch={handleRoleSwitch}
            onClose={() => setShowRoleSwitcher(false)}
          />
        )}

        {/* Screen Content */}
        <div className="relative h-full w-full overflow-hidden">
          {renderScreen()}
        </div>

        {/* Bottom Navigation */}
        {showBottomNav && (
          <BottomNavigation
            mode={currentMode}
            currentTab={currentTab}
            onTabChange={handleTabChange}
          />
        )}

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-900 rounded-full z-50" />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}