import React, {useEffect, useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import './Home.css';
import { useNavigate } from "react-router-dom";
import { handleSlide, getMovie, getPopularMovie } from "../Utils";
import Carousel from 'react-bootstrap/Carousel';
import Recommendation from "./recommendation.js";

export default function Home(){
    const [animatedMovies, setAnimatedMovies] = useState ([])
    const [actionMovies, setActionMovies] = useState([])
    const [comedyMovies, setComedyMovies] = useState([])
    const [popularMovies, setPopularMovies] = useState([])

    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const navigate = useNavigate()

    useEffect(() => {
        const fetchGenres = async () => {
          try {
            const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=55eeda8279baa495342e20191faf8cf7');
            const data = await response.json();
            setGenres(data.genres); // Update genres state with fetched data
          } catch (error) {
            console.error("Error fetching genres:", error);
          }
        };
        fetchGenres();

        const fetchMovie = async () => {
            const animatedMoviesData = await getMovie(16);
            setAnimatedMovies(animatedMoviesData);
            const actionMoviesData = await getMovie(28);
            setActionMovies(actionMoviesData);
            const comedyMoviesData = await getMovie(35);
            setComedyMovies(comedyMoviesData);
            const popularMoviesData = await getPopularMovie();
            setPopularMovies(popularMoviesData)
            const selectedGenreeee = await getMovie(selectedGenre);
            setSelectedGenre(selectedGenreeee);
        };
        fetchMovie()
    }, []);

    const renderMovieRow = (movies, genre) => (
        <div className={`moviePosterHome ${genre}`} key={genre}>
            <p>{genre}</p>
            <div className="sliderContainer">
                <i className="fa fa-chevron-left fa-2x" aria-hidden="true" onClick={() => handleSlide (genre, "left")}></i>
                <div className="slider">
                    {movies.map(movie => (
                        <img key={movie.id} className="poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.id} onClick={() => navigate(`/home/${movie.id}`)}/>
                    ))}
                </div>
                <i className="fa fa-chevron-right fa-2x" aria-hidden="true" onClick={() => handleSlide(genre, "right")}></i>
            </div>
        </div>
    );

    function DivCarousel() {
        const timePass = popularMovies.map((item, i) => (
                <Carousel.Item key={i}>
                    <div className="movie">
                        <img className="movieImg" src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`} alt="bighero6"/>
                        <div className="info">
                            <div className="title">
                                <h3>{item.title}</h3>
                            </div>
                            <div className="description">
                                <p>{item.overview}</p>
                            </div>
                            <div className="controls">
                                <button onClick={() => navigate(`/home/${item.id}`)}>Play</button>
                            </div>
                        </div>
                    </div>
                </Carousel.Item>
            )
        )
        return (
            <Carousel>
                {timePass}
            </Carousel>
        )
    }

    return(
        <>
        <Navbar />
        <div className="home">
            <div className="homeContainer">
                <DivCarousel/>
                <Recommendation/>
                {renderMovieRow(animatedMovies, "Animated")}
                {renderMovieRow(comedyMovies, "Comedy")}
                {renderMovieRow(actionMovies, "Action")}
            </div>
        </div>
        </>
    )
}