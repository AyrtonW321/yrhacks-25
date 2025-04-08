import './App.css'
import NavBar from './components/feature/NavBar';
import MainPage from "./components/pages/MainPage";
// import Recipe from './components/pages/Recipe';
// import Fridge from './components/pages/Fridge';
// import ShoppingList from './Components/pages/ShoppingList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        {/* <Route path="/recipe" element={<Recipe/>}/>
        <Route path="/fridge" element={<Fridge/>}/>
        <Route path="/shoppinglist" element={<ShoppingList/>}/> */}
      </Routes>
    </Router>
  )
}

export default App
