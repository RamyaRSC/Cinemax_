import React, {useEffect, useState} from "react";
import Navbar from "../../components/Navbar/Navbar";
import './Home.css';
import bigHero6Img from '../../assets/big hero 6.jpg'
import { useNavigate } from "react-router-dom";
import { handleSlide, getMovie } from "../Utils";

export default function Home(){
    const [animatedMovies, setAnimatedMovies] = useState ([])
    const [actionMovies, setActionMovies] = useState([])
    const [comedyMovies, setComedyMovies] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMovie = async () => {
            const animatedMoviesData = await getMovie(16);
            setAnimatedMovies(animatedMoviesData);
            const actionMoviesData = await getMovie(28);
            setActionMovies(actionMoviesData);
            const comedyMoviesData = await getMovie(35);
            setComedyMovies(comedyMoviesData);
        };
        fetchMovie()
    },[])

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

    return(
        <>
        <Navbar />
        <div className="home">
            <div className="homeContainer">
                <div className="movie">
                    <img className="movieImg" src={bigHero6Img} alt="bighero6"/>
                    <div className="info">
                        <div className="title">
                            <h3>WALL-E</h3>
                        </div>
                        <div className="description">
                            <p>In 2007 AD, the earth was already a huge garbage dump by human beings. It has reached the point of being uninhabitable. Humans can only migrate to other planets, and then commission a robot waste cleaning company to rehabilitate the earth’s environmental system. Achieve ecological balance.</p>
                        </div>
                        <div className="controls">
                        <button>Play</button>
                        <button>Add to Watch Later</button>
                        </div>
                    </div>
                </div>
                {renderMovieRow(animatedMovies, "Animated")}
                {renderMovieRow(comedyMovies, "Comedy")}
                {renderMovieRow(actionMovies, "Action")}
            </div>
        </div>
        </>
    )
}