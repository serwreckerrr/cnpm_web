// import { useState } from 'react';
// import { LanguageProvider } from './contexts/LanguageContext';
// import { MobileHeader } from './components/MobileHeader';
// import { BottomNavigation } from './components/BottomNavigation';
// import { DashboardScreen } from './screens/DashboardScreen';
// import { ParkingScreen } from './screens/ParkingScreen';
// import { TransactionsScreen } from './screens/TransactionScreen';
// import { SettingsScreen } from './screens/SettingsScreen';

// function MobileApp() {
//   const [activeTab, setActiveTab] = useState('dashboard');

//   const renderScreen = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return <DashboardScreen />;
//       case 'parking':
//         return <ParkingScreen />;
//       case 'transactions':
//         return <TransactionsScreen />;
//       case 'settings':
//         return <SettingsScreen />;
//       default:
//         return <DashboardScreen />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <MobileHeader />
//       <main className="bg-background">
//         {renderScreen()}
//       </main>
//       <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <LanguageProvider>
//       <MobileApp />
//     </LanguageProvider>
//   );
// }

import { useState } from 'react';

import { LanguageProvider } from './contexts/LanguageContext';

import { MobileHeader } from './components/MobileHeader';
import { BottomNavigation } from './components/BottomNavigation';

import { DashboardScreen } from './screens/DashboardScreen';
import { ParkingScreen } from './screens/ParkingScreen';
import { TransactionsScreen } from './screens/TransactionScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { LoginScreen } from './screens/LoginScreen';

interface User {
  name: string;
  studentId: string;
  role: string;
  email: string;
  faculty: string;
  isGuest: boolean;
}

function MobileApp() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // current user
  const [currentUser, setCurrentUser] = useState<User>({
    name: '',
    studentId: '',
    role: '',
    email: '',
    faculty: '',
    isGuest: true,
  });

  // xử lý login
const handleLogin = (user: User) => {
  setCurrentUser(user);
  setIsLoggedIn(true);
};

  // xử lý guest login
  const handleGuestLogin = () => {
    setCurrentUser({
      name: 'Guest',
      studentId: 'N/A',
      role: 'guest',
      email: 'guest@hcmut.edu.vn',
      faculty: 'Guest User',
      isGuest: true,
    });

    setIsLoggedIn(true);
  };

  // xử lý logout
  const handleLogout = () => {
    setIsLoggedIn(false);

    setCurrentUser({
      name: '',
      studentId: '',
      role: '',
      email: '',
      faculty: '',
      isGuest: true,
    });

    setActiveTab('dashboard');
  };

  // nếu chưa login -> hiện LoginScreen
  if (!isLoggedIn) {
    return (
      <LoginScreen
        onLogin={handleLogin}
        onGuestLogin={handleGuestLogin}
      />
    );
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardScreen user={currentUser} />;

      case 'parking':
        return (
          <ParkingScreen
            user={currentUser}
          />
        );

      case 'transactions':
        return (
          <TransactionsScreen
            user={currentUser}
          />
        );

      case 'settings':
        return (
          <SettingsScreen
            onLogout={handleLogout}
            user={currentUser}
          />
        );

      default:
        return <DashboardScreen user={currentUser} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader />

      <main className="bg-background">
        {renderScreen()}
      </main>

      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MobileApp />
    </LanguageProvider>
  );
}