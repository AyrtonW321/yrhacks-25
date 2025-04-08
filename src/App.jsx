import './App.css'
import NavBar from './components/feature/NavBar';
import MainPage from "./components/pages/MainPage";
// import Recipe from './components/pages/Recipe';
import Fridge from './components/pages/Fridge';
import ShoppingList from "./components/pages/ShoppingList";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        {/* <Route path="/recipe" element={<Recipe/>}/> */}
        <Route path="/Fridge" element={<Fridge/>}/>
        {/* <Route path="/UserSettings" element={<Fridge/>}/> */}
        <Route path="/ShoppingList" element={<ShoppingList/>}/>
      </Routes>
    </Router>
  )
}

export default App
