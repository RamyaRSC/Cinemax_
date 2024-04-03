import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import './Movie.css';
import { useNavigate } from "react-router-dom";
import { handleSlide, getMovie } from "../Utils";
import FadeLoader from 'react-spinners/FadeLoader';

export default function Movie(){
    const [adventureMovies, setAdventureMovies] = useState ([]);
    const [horrorMovies, setHorrorMovies] = useState([]);
    const [documentryMovies, setDocumentryMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const adventureMoviesData = await getMovie(12);
                setAdventureMovies(adventureMoviesData);
                const horrorMoviesData = await getMovie(27);
                setHorrorMovies(horrorMoviesData);
                const documentryMoviesData = await getMovie(99);
                setDocumentryMovies(documentryMoviesData);
                setLoading(false); // Set loading to false after fetching data
            } catch (error) {
                console.error("Error fetching movies:", error);
                setLoading(false); // Set loading to false in case of error
            }
            
        };
        fetchMovie();
    },[]);

    const renderMovieRow = (movies, genre) => (
        <div className={`moviePoster ${genre}`} key={genre}>
            <p>{genre}</p>
            <div className="sliderContainer">
                <i className="fa fa-chevron-left fa-2x" aria-hidden="true" onClick={() => handleSlide (genre, "left")}></i>
                <div className="slider">
                    {movies.map(movie => (
                        <img key={movie.id} className="poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.id} onClick={() => navigate(`/home/${movie.id}`)}/>
                    ))}
                </div>
                <i className="fa fa-chevron-right fa-2x" aria-hidden="true" onClick={() => handleSlide(genre, "right")} />
            </div>
        </div>
    );

    return (
        <>
            <Navbar />
            {loading ? ( // Display loader if loading is true
                <div className="loader-container">
                    <FadeLoader color="#fff" size={80}/>
                </div>
            ) : (
            <>
            {renderMovieRow(adventureMovies, "Adventure")}
            {renderMovieRow(horrorMovies, "Horror")}
            {renderMovieRow(documentryMovies, "Documentry")}
            </>
            )}
        </>
    )
}