import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'he';
export type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Welcome Screen
    'welcome.tagline': 'Your ride, on demand',
    'welcome.passenger': 'Continue as Passenger',
    'welcome.driver': 'Continue as Driver',
    'welcome.login': 'Already have an account? Log in',

    // Sign Up
    'signup.title': 'Create Account',
    'signup.name': 'Full Name',
    'signup.email': 'Email',
    'signup.password': 'Password',
    'signup.role': 'Register as',
    'signup.passenger': 'Passenger',
    'signup.driver': 'Driver',
    'signup.both': 'Both',
    'signup.create': 'Create Account',
    'signup.hasAccount': 'Already have an account?',
    'signup.loginLink': 'Log In',
    'signup.switchNote': 'You can switch roles anytime',

    // Log In
    'login.title': 'Welcome Back',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.forgot': 'Forgot password?',
    'login.button': 'Log In',
    'login.noAccount': "Don't have an account?",
    'login.signupLink': 'Sign Up',

    // Home Screen
    'home.whereTo': 'Where to?',
    'home.chooseRide': 'Choose a ride',
    'home.requestRide': 'Request Ride',
    'home.economy': 'Economy',
    'home.premium': 'Premium',
    'home.xl': 'XL',
    'home.minAway': 'min away',

    // Driver Matching
    'matching.searching': 'Searching for driver...',
    'matching.usually': 'This usually takes a few seconds',
    'matching.found': 'Driver Found!',
    'matching.away': 'min away',
    'matching.trips': 'trips',
    'matching.cancel': 'Cancel Ride',

    // Ride Progress
    'progress.inProgress': 'Trip in progress',
    'progress.toDestination': 'min to destination',
    'progress.call': 'Call',
    'progress.chat': 'Chat',
    'progress.share': 'Share',
    'progress.safety': 'Your safety is our priority. Share your trip details with friends and family.',

    // Rating
    'rating.howWasRide': 'How was your ride with',
    'rating.feedback': 'Your feedback helps improve the experience',
    'rating.excellent': 'Excellent! 🌟',
    'rating.great': 'Great! 😊',
    'rating.good': 'Good 👍',
    'rating.couldBeBetter': 'Could be better',
    'rating.sorry': "We're sorry to hear that",
    'rating.additional': 'Additional feedback (optional)',
    'rating.placeholder': 'Share more about your experience...',
    'rating.improve': 'What could be improved?',
    'rating.cleanliness': 'Cleanliness',
    'rating.route': 'Route taken',
    'rating.driving': 'Driving',
    'rating.communication': 'Communication',
    'rating.submit': 'Submit Rating',
    'rating.thankYou': 'Thank you!',
    'rating.helps': 'Your feedback helps us improve',

    // Driver Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.ready': 'Ready to earn?',
    'dashboard.online': "You're online",
    'dashboard.offline': "You're offline",
    'dashboard.available': 'Available for rides',
    'dashboard.tapOnline': 'Tap to go online',
    'dashboard.todayEarnings': "Today's Earnings",
    'dashboard.today': 'Today',
    'dashboard.thisWeek': 'This Week',
    'dashboard.rating': 'Rating',
    'dashboard.totalTrips': 'Total Trips',
    'dashboard.recentRides': 'Recent Rides',
    'dashboard.backPassenger': 'Back to Passenger View',

    // Ride History
    'history.title': 'Ride History',
    'history.search': 'Search trips...',
    'history.pickup': 'Pickup',
    'history.dropoff': 'Dropoff',
    'history.driver': 'Driver',
    'history.vehicle': 'Vehicle',
    'history.yourRating': 'Your Rating',
    'history.receipt': 'Get Receipt',
    'history.rebook': 'Rebook',
    'history.back': 'Back to Home',

    // Profile
    'profile.title': 'Profile',
    'profile.account': 'Account Information',
    'profile.roles': 'Your Roles',
    'profile.passengerMode': 'Passenger Mode',
    'profile.driverMode': 'Driver Mode',
    'profile.switchMode': 'Switch Mode',
    'profile.settings': 'Settings',
    'profile.logout': 'Log Out',
    'profile.languages': 'Languages Spoken',
    'profile.editProfile': 'Edit Profile',

    // Driver Onboarding
    'onboarding.welcome': 'Welcome, Driver!',
    'onboarding.step': 'Step',
    'onboarding.of': 'of',
    'onboarding.license': 'Driver License',
    'onboarding.uploadLicense': 'Upload your driver license',
    'onboarding.upload': 'Upload Document',
    'onboarding.vehicleDetails': 'Vehicle Details',
    'onboarding.carModel': 'Car Model',
    'onboarding.licensePlate': 'License Plate',
    'onboarding.vehicleType': 'Vehicle Type',
    'onboarding.readyToDrive': "You're ready to drive!",
    'onboarding.approved': 'Your application has been approved',
    'onboarding.startEarning': 'Start Earning',
    'onboarding.next': 'Next',
    'onboarding.back': 'Back',

    // Role Switcher
    'switcher.title': 'Switch Mode',
    'switcher.current': 'Current',
    'switcher.switch': 'Switch',

    // Language Filter
    'filter.language': 'Driver language',
    'filter.english': 'English',
    'filter.hebrew': 'Hebrew',
    'filter.both': 'Both',
    'filter.en': 'English speakers',
    'filter.he': 'Hebrew speakers',
    'filter.speaks': 'Speaks',
    'filter.noDrivers': 'No drivers available',
    'filter.noMatch': 'No drivers match your language preference',
    'filter.tryRemoving': 'Try removing the language filter',
    'filter.gender': 'Driver gender',
    'filter.male': 'Male',
    'filter.female': 'Female',
    'filter.any': 'Any',

    // Menu
    'menu.myRides': 'My Rides',
    'menu.history': 'Ride History',
    'menu.dashboard': 'Driver Dashboard',

    // Bottom Navigation
    'nav.home': 'Home',
    'nav.activity': 'Activity',
    'nav.saved': 'Saved',
    'nav.profile': 'Profile',
    'nav.requests': 'Requests',
    'nav.map': 'Map',
    'nav.earnings': 'Earnings',
    'nav.history': 'History',

    // Activity Screen
    'activity.title': 'Activity',
    'activity.all': 'All',
    'activity.completed': 'Completed',
    'activity.cancelled': 'Cancelled',
    'activity.noRides': 'No rides found',
    'activity.tryFilter': 'Try changing the filter',
    'activity.cancelled.status': 'Cancelled',

    // Saved Places
    'saved.title': 'Saved Places',
    'saved.subtitle': 'Quick access to your frequent destinations',
    'saved.home': 'Home',
    'saved.work': 'Work',
    'saved.addNew': 'Add New Place',
    'saved.addSubtitle': 'Save a frequent destination',
    'saved.placeName': 'Place Name',
    'saved.address': 'Address',
    'saved.placeNamePlaceholder': "e.g., Gym, Mom's House",
    'saved.addressPlaceholder': 'Enter full address',
    'saved.cancel': 'Cancel',
    'saved.save': 'Save Place',
    'saved.edit': 'Edit',
    'saved.delete': 'Delete',

    // Settings
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.notifications': 'Push Notifications',
    'settings.ridePreferences': 'Ride Preferences',
    'settings.vehicleSettings': 'Vehicle Settings',
    'settings.account': 'Account',
    'settings.preferredVehicle': 'Preferred Vehicle Type',
    'settings.languagePreference': 'Driver Language Preference',
    'settings.editProfile': 'Edit Profile',
    'settings.privacy': 'Privacy & Security',
    'settings.payment': 'Payment Methods',
    'settings.help': 'Help & Support',
    'settings.terms': 'Terms & Conditions',
    'settings.version': 'Version',
    'settings.addVehicle': 'Add Another Vehicle',
    'settings.editVehicle': 'Edit',
    'settings.documents': 'Documents',
    'settings.carModel': 'Car Model',
    'settings.licensePlate': 'License Plate',
    'settings.vehicleType': 'Vehicle Type',
    'settings.carModelPlaceholder': 'e.g., Toyota Camry',
    'settings.addVehicleTitle': 'Add Vehicle',
    'settings.emergency': 'Emergency Contacts',
    'settings.primaryContact': 'Primary Contact',
    'settings.secondaryContact': 'Secondary Contact',
    'settings.contactName': 'Contact Name',
    'settings.contactPhone': 'Phone Number',
    'settings.addContact': 'Add Contact',
    'settings.editContact': 'Edit Contact',

    // Forgot Password
    'forgot.title': 'Forgot Password',
    'forgot.subtitle': 'Enter your email to reset your password',
    'forgot.sendReset': 'Send Reset Link',
    'forgot.backToLogin': 'Back to Log In',
    'forgot.sent': 'Email Sent!',
    'forgot.checkEmail': 'Check your email for password reset instructions',

    // Cancel Ride
    'cancel.title': 'Cancel Ride',
    'cancel.subtitle': 'Please tell us why you want to cancel',
    'cancel.confirm': 'Confirm Cancellation',
    'cancel.customPlaceholder': 'Tell us more...',
    'cancel.passengerReasons.wrong': 'Wrong destination',
    'cancel.passengerReasons.wait': 'Wait time too long',
    'cancel.passengerReasons.price': 'Found a better price',
    'cancel.passengerReasons.other': 'Other reason',
    'cancel.driverReasons.far': 'Pickup too far',
    'cancel.driverReasons.unsafe': 'Safety concern',
    'cancel.driverReasons.busy': 'Too busy right now',
    'cancel.driverReasons.other': 'Other reason',

    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.add': 'Add',
    'common.close': 'Close',
    'common.done': 'Done',
  },
  he: {
    // Welcome Screen
    'welcome.tagline': 'הנסיעה שלך, לפי דרישה',
    'welcome.passenger': 'המשך כנוסע',
    'welcome.driver': 'המשך כנהג',
    'welcome.login': 'כבר יש לך חשבון? התחבר',

    // Sign Up
    'signup.title': 'יצירת חשבון',
    'signup.name': 'שם מלא',
    'signup.email': 'אימייל',
    'signup.password': 'סיסמה',
    'signup.role': 'הרשם כ',
    'signup.passenger': 'נוסע',
    'signup.driver': 'נהג',
    'signup.both': 'שניהם',
    'signup.create': 'יצירת חשבון',
    'signup.hasAccount': 'כבר יש לך חשבון?',
    'signup.loginLink': 'התחבר',
    'signup.switchNote': 'ניתן להחליף תפקידים בכל עת',

    // Log In
    'login.title': 'ברוך שובך',
    'login.email': 'אימייל',
    'login.password': 'סיסמה',
    'login.forgot': 'שכחת סיסמה?',
    'login.button': 'התחבר',
    'login.noAccount': 'אין לך חשבון?',
    'login.signupLink': 'הרשם',

    // Home Screen
    'home.whereTo': 'לאן?',
    'home.chooseRide': 'בחר נסיעה',
    'home.requestRide': 'הזמן נסיעה',
    'home.economy': 'חסכונית',
    'home.premium': 'פרמיום',
    'home.xl': 'XL',
    'home.minAway': 'דקות',

    // Driver Matching
    'matching.searching': 'מחפש נהג...',
    'matching.usually': 'זה בדרך כלל לוקח כמה שניות',
    'matching.found': 'נהג נמצא!',
    'matching.away': 'דקות',
    'matching.trips': 'נסיעות',
    'matching.cancel': 'בטל נסיעה',

    // Ride Progress
    'progress.inProgress': 'נסיעה בתהליך',
    'progress.toDestination': 'דקות ליעד',
    'progress.call': 'התקשר',
    'progress.chat': 'צ׳אט',
    'progress.share': 'שתף',
    'progress.safety': 'הבטיחות שלך היא בראש סדר העדיפויות שלנו. שתף את פרטי הנסיעה עם חברים ובני משפחה.',

    // Rating
    'rating.howWasRide': 'איך הייתה הנסיעה עם',
    'rating.feedback': 'המשוב שלך עוזר לשפר את החוויה',
    'rating.excellent': 'מצוין! 🌟',
    'rating.great': 'נהדר! 😊',
    'rating.good': 'טוב 👍',
    'rating.couldBeBetter': 'יכול להיות יותר טוב',
    'rating.sorry': 'אנחנו מצטערים לשמוע את זה',
    'rating.additional': 'משוב נוסף (אופציונלי)',
    'rating.placeholder': 'שתף עוד על החוויה שלך...',
    'rating.improve': 'מה ניתן לשפר?',
    'rating.cleanliness': 'ניקיון',
    'rating.route': 'המסלול',
    'rating.driving': 'נהיגה',
    'rating.communication': 'תקשורת',
    'rating.submit': 'שלח דירוג',
    'rating.thankYou': 'תודה!',
    'rating.helps': 'המשוב שלך עוזר לנו להשתפר',

    // Driver Dashboard
    'dashboard.welcome': 'ברוך שובך',
    'dashboard.ready': 'מוכן להרוויח?',
    'dashboard.online': 'אתה מחובר',
    'dashboard.offline': 'אתה לא מחובר',
    'dashboard.available': 'זמין לנסיעות',
    'dashboard.tapOnline': 'לחץ כדי להתחבר',
    'dashboard.todayEarnings': 'הרווחים של היום',
    'dashboard.today': 'היום',
    'dashboard.thisWeek': 'השבוע',
    'dashboard.rating': 'דירוג',
    'dashboard.totalTrips': 'סה״כ נסיעות',
    'dashboard.recentRides': 'נסיעות אחרונות',
    'dashboard.backPassenger': 'חזור לתצוגת נוסע',

    // Ride History
    'history.title': 'היסטוריית נסיעות',
    'history.search': 'חפש נסיעות...',
    'history.pickup': 'איסוף',
    'history.dropoff': 'הורדה',
    'history.driver': 'נהג',
    'history.vehicle': 'רכב',
    'history.yourRating': 'הדירוג שלך',
    'history.receipt': 'קבל קבלה',
    'history.rebook': 'הזמן שוב',
    'history.back': 'חזור לבית',

    // Profile
    'profile.title': 'פרופיל',
    'profile.account': 'מידע על החשבון',
    'profile.roles': 'התפקידים שלך',
    'profile.passengerMode': 'מצב נוסע',
    'profile.driverMode': 'מצב נהג',
    'profile.switchMode': 'החלף מצב',
    'profile.settings': 'הגדרות',
    'profile.logout': 'התנתק',
    'profile.languages': 'שפות מדוברות',
    'profile.editProfile': 'ערוך פרופיל',

    // Driver Onboarding
    'onboarding.welcome': 'ברוך הבא, נהג!',
    'onboarding.step': 'שלב',
    'onboarding.of': 'מתוך',
    'onboarding.license': 'רישיון נהיגה',
    'onboarding.uploadLicense': 'העלה את רישיון הנהיגה שלך',
    'onboarding.upload': 'העלה מסמך',
    'onboarding.vehicleDetails': 'פרטי רכב',
    'onboarding.carModel': 'דגם רכב',
    'onboarding.licensePlate': 'מספר רישוי',
    'onboarding.vehicleType': 'סוג רכב',
    'onboarding.readyToDrive': 'אתה מוכן לנהוג!',
    'onboarding.approved': 'הבקשה שלך אושרה',
    'onboarding.startEarning': 'התחל להרוויח',
    'onboarding.next': 'הבא',
    'onboarding.back': 'חזור',

    // Role Switcher
    'switcher.title': 'החלף מצב',
    'switcher.current': 'נוכחי',
    'switcher.switch': 'החלף',

    // Language Filter
    'filter.language': 'שפת נהג',
    'filter.english': 'אנגלית',
    'filter.hebrew': 'עברית',
    'filter.both': 'שניהם',
    'filter.en': 'דוברי אנגלית',
    'filter.he': 'דוברי עברית',
    'filter.speaks': 'מדבר',
    'filter.noDrivers': 'אין נהגים זמינים',
    'filter.noMatch': 'אין נהגים התואמים להעדפת השפה שלך',
    'filter.tryRemoving': 'נסה להסיר את מסנן השפה',
    'filter.gender': 'מגדר נהג',
    'filter.male': 'זכר',
    'filter.female': 'נקבה',
    'filter.any': 'הכל',

    // Menu
    'menu.myRides': 'הנסיעות שלי',
    'menu.history': 'היסטוריית נסיעות',
    'menu.dashboard': 'לוח נהג',

    // Bottom Navigation
    'nav.home': 'בית',
    'nav.activity': 'פעילות',
    'nav.saved': 'שמורים',
    'nav.profile': 'פרופיל',
    'nav.requests': 'בקשות',
    'nav.map': 'מפה',
    'nav.earnings': 'הכנסות',
    'nav.history': 'היסטוריה',

    // Activity Screen
    'activity.title': 'פעילות',
    'activity.all': 'הכל',
    'activity.completed': 'הושלם',
    'activity.cancelled': 'בוטל',
    'activity.noRides': 'לא נמצאו נסיעות',
    'activity.tryFilter': 'נסה לשנות את הסינון',
    'activity.cancelled.status': 'בוטל',

    // Saved Places
    'saved.title': 'מקומות שמורים',
    'saved.subtitle': 'גישה מהירה ליעדים המועדפים שלך',
    'saved.home': 'בית',
    'saved.work': 'עבודה',
    'saved.addNew': 'הוסף מקום חדש',
    'saved.addSubtitle': 'שמור יעד תדיר',
    'saved.placeName': 'שם המקום',
    'saved.address': 'כתובת',
    'saved.placeNamePlaceholder': 'למשל, חדר כושר, בית של אמא',
    'saved.addressPlaceholder': 'הזן כתובת מלאה',
    'saved.cancel': 'ביטול',
    'saved.save': 'שמור מקום',
    'saved.edit': 'ערוך',
    'saved.delete': 'מחק',

    // Settings
    'settings.title': 'הגדרות',
    'settings.language': 'שפה',
    'settings.notifications': 'התראות דחיפה',
    'settings.ridePreferences': 'העדפות נסיעה',
    'settings.vehicleSettings': 'הגדרות רכב',
    'settings.account': 'חשבון',
    'settings.preferredVehicle': 'סוג רכב מועדף',
    'settings.languagePreference': 'העדפת שפת נהג',
    'settings.editProfile': 'ערוך פרופיל',
    'settings.privacy': 'פרטיות ואבטחה',
    'settings.payment': 'אמצעי תשלום',
    'settings.help': 'עזרה ותמיכה',
    'settings.terms': 'תנאים והגבלות',
    'settings.version': 'גרסה',
    'settings.addVehicle': 'הוסף רכב נוסף',
    'settings.editVehicle': 'ערוך',
    'settings.documents': 'מסמכים',
    'settings.carModel': 'דגם רכב',
    'settings.licensePlate': 'מספר רישוי',
    'settings.vehicleType': 'סוג רכב',
    'settings.carModelPlaceholder': 'למשל, טויוטה קאמרי',
    'settings.addVehicleTitle': 'הוסף רכב',
    'settings.emergency': 'אנשי קשר לחירום',
    'settings.primaryContact': 'איש קשר ראשי',
    'settings.secondaryContact': 'איש קשר משני',
    'settings.contactName': 'שם איש קשר',
    'settings.contactPhone': 'מספר טלפון',
    'settings.addContact': 'הוסף איש קשר',
    'settings.editContact': 'ערוך איש קשר',

    // Forgot Password
    'forgot.title': 'שכחתי סיסמה',
    'forgot.subtitle': 'הזן את האימייל שלך לאיפוס הסיסמה',
    'forgot.sendReset': 'שלח קישור לאיפוס',
    'forgot.backToLogin': 'חזור להתחברות',
    'forgot.sent': 'אימייל נשלח!',
    'forgot.checkEmail': 'בדוק את האימייל שלך להוראות איפוס סיסמה',

    // Cancel Ride
    'cancel.title': 'ביטול נסיעה',
    'cancel.subtitle': 'אנא ספר לנו מדוע ברצונך לבטל',
    'cancel.confirm': 'אשר ביטול',
    'cancel.customPlaceholder': 'ספר לנו עוד...',
    'cancel.passengerReasons.wrong': 'יעד שגוי',
    'cancel.passengerReasons.wait': 'זמן המתנה ארוך מדי',
    'cancel.passengerReasons.price': 'מצאתי מחיר טוב יותר',
    'cancel.passengerReasons.other': 'סיבה אחרת',
    'cancel.driverReasons.far': 'איסוף רחוק מדי',
    'cancel.driverReasons.unsafe': 'דאגה לבטיחות',
    'cancel.driverReasons.busy': 'עסוק מדי כרגע',
    'cancel.driverReasons.other': 'סיבה אחרת',

    // Common
    'common.save': 'שמור',
    'common.cancel': 'ביטול',
    'common.edit': 'ערוך',
    'common.delete': 'מחק',
    'common.add': 'הוסף',
    'common.close': 'סגור',
    'common.done': 'סיום',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  const direction: Direction = language === 'he' ? 'rtl' : 'ltr';

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
