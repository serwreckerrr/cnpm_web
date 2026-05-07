import { useState } from "react";

import { DashboardScreen } from "./screens/DashboardScreen";
import { ParkingScreen } from "./screens/ParkingScreen";
import { TransactionsScreen } from "./screens/TransactionScreen";
import { SettingsScreen } from "./screens/SettingsScreen";

function App() {
  const [currentScreen, setCurrentScreen] = useState("dashboard");

  const renderScreen = () => {
    switch (currentScreen) {
      case "parking":
        return <ParkingScreen />;

      case "transactions":
        return <TransactionsScreen />;

      case "settings":
        return <SettingsScreen />;

      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Temporary Navigation */}
      <div className="flex gap-2 p-4 border-b bg-white sticky top-0 z-50">
        <button
          onClick={() => setCurrentScreen("dashboard")}
          className="px-4 py-2 rounded bg-primary text-white"
        >
          Dashboard
        </button>

        <button
          onClick={() => setCurrentScreen("parking")}
          className="px-4 py-2 rounded bg-primary text-white"
        >
          Parking
        </button>

        <button
          onClick={() => setCurrentScreen("transactions")}
          className="px-4 py-2 rounded bg-primary text-white"
        >
          Transactions
        </button>

        <button
          onClick={() => setCurrentScreen("settings")}
          className="px-4 py-2 rounded bg-primary text-white"
        >
          Settings
        </button>
      </div>

      {renderScreen()}
    </div>
  );
}

export default App;