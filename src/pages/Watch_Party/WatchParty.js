import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './WatchParty.css'

export default function WatchTogether() {
    const [animatedMovies, setAnimatedMovies] = useState ([])
    const [actionMovies, setActionMovies] = useState([])
    const [comedyMovies, setComedyMovies] = useState([])
    const [adventureMovies, setAdventureMovies] = useState([])
    const [horrorMovies, setHorrorMovies] = useState([])
    const [dramaMovies, setDramaMovies] = useState([])
    const [scienceFictionMovies, setScienceFictionMovies] = useState([])

    const watchRoom = (movies) => ( 
            <div className='watchParty'>
                <div className='img'>
                    {movies && movies.map(movie => (
                        <img key={movie.id} className="poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.id} />
                    ))}
                </div>
                <div className='movieTitle'>
                    Elemental
                </div>
            </div>
    )

    useEffect(() => {
        const getMovie = async (genre, setMovieList) => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=55eeda8279baa495342e20191faf8cf7&with_genres=${genre}`);
                const data = await response.json();
                setMovieList(data.results);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        
        getMovie(16, setAnimatedMovies); // Animated Movies (Genre ID: 16)
        getMovie(28, setActionMovies);   // Action Movies (Genre ID: 28)
        getMovie(35, setComedyMovies);   // Comedy Movies (Genre ID: 35)
        getMovie(12, setAdventureMovies); // Adventure Movies (Genre ID: 12)
        getMovie(27, setHorrorMovies);
        getMovie(18, setDramaMovies);
        getMovie(878, setScienceFictionMovies);

    },[])

    return (
    <div>
        <Navbar />
        <div className='watchPartyContainer'>
            {watchRoom(animatedMovies)}
            {watchRoom(actionMovies)}
            {watchRoom(comedyMovies)}
            {watchRoom(adventureMovies)}
            {watchRoom(horrorMovies)}
            {watchRoom(dramaMovies)}
            {watchRoom(scienceFictionMovies)}
        </div>
    </div>
    )
}
