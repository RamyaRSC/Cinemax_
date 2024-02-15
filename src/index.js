import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Movie from './pages/Movie/Movie.js'
import Register from './pages/Register/Register.js'
import NoPage from './pages/NoPage'
import TvShow from './pages/TV_Show/TvShow.js'
import WatchParty from './pages/Watch_Party/WatchParty.js';
import PlayMovie from './pages/PlayMovie/PlayMovie.js';
// import { AuthProvider  } from './Contexts/AuthContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
      <Route path="/home/:id?" element={<PlayMovie/>}/>
      <Route path="/movie" element={<Movie />} />
      <Route path="/tvshow" element={<TvShow />} />
      <Route path="/watchparty" element={<WatchParty />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  </BrowserRouter>
);