import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import WomenPage from './pages/WomenPage';
import MenPage from './pages/MenPage';
import NewArrivalPage from './pages/NewArrivalPage';
import LongDressPage from './pages/LongDressPage';
import MidiDressPage from './pages/MidiDressPage';


const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="women" element={<WomenPage />} />
          <Route path="men" element={<MenPage />} />
          <Route path="new-arrivals" element={<NewArrivalPage />} />
          <Route path="dresses/long-dress" element={<LongDressPage />} />
          <Route path="dresses/midi-dress" element={<MidiDressPage />} />
          
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;