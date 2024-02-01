import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import About from './pages/About'
import Movie from './pages/Movie'
import Register from './pages/Register/Register.js'
import NoPage from './pages/NoPage'
import Contact from './pages/Contact/Contact.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-s0emoqiwd2aaxvxe.us.auth0.com"
    clientId="UIHytc0sJWSmXLexuEyWhakGjFBgsNAY"
    authorizationParams={{
      redirect_uri: window.location.origin}}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/movie" element={<Movie />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
    </BrowserRouter>
  </Auth0Provider>,
);