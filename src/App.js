import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home/Home'
import Movie from './pages/Movie/Movie.js'
import Register from './pages/Register/Register.js'
import NoPage from './pages/NoPage'
import TvShow from './pages/TV_Show/TvShow.js'
import WatchParty from './pages/Watch_Party/WatchParty.js';
import PlayMovie from './pages/PlayMovie/PlayMovie.js';
import SearchResult from './pages/SearchResult/SearchResult.js';
import { AuthContextProvider } from './Context/AuthContext.js';

export default function App(){
  return(
    <>
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/:id?" element={<PlayMovie/>}/>
          <Route path="/movie" element={<Movie />} />
          <Route path="/tvshow" element={<TvShow />} />
          <Route path="/register" element={<Register />} />
          <Route path="/searchResult/:query?" element={<SearchResult />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
    </>
  )
}

