import './App.css';
import NavBar from './components/feature/NavBar';
import MainPage from "./components/pages/MainPage";
import Fridge from './components/pages/Fridge';
import ShoppingList from "./components/pages/ShoppingList";
import UserSettings from "./components/pages/UserSettings";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <Router>
      <NavBar onSettingsClick={() => setShowSettings(true)} />
      {showSettings && (
        <UserSettings closeModal={() => setShowSettings(false)} />
      )}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Fridge" element={<Fridge />} />
        <Route path="/ShoppingList" element={<ShoppingList />} />
      </Routes>
    </Router>
  );
}

export default App;
