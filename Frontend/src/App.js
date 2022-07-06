import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes } from 'react-router-dom'

import HomeComponent from './Components/HomeComp'
import FavoritesComp from './Components/FavoritesComp'
import NavBar from './Components/NavBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/favorites" element={<FavoritesComp />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
