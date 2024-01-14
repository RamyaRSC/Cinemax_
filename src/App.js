// import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
// import About from './pages/About'
// import Movie from './pages/Movie'
// import SignIn from './pages/SignIn/SignIn'
// import NoPage from './pages/NoPage'

export default function App(){
  return(
    <div>
      {/* <Navbar /> */}
      <Home />

      {/* <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter> */}
    </div>
  )
}