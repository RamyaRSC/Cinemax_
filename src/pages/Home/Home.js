import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './Home.css';
import Carousel from 'react-bootstrap/Carousel';
import Recommendation from './recommendation';
import { getMovie, getPopularMovie, renderMovieRow } from '../Utils';

export default function Home(){
    const [animatedMovies, setAnimatedMovies] = useState ([])
    const [actionMovies, setActionMovies] = useState([])
    const [comedyMovies, setComedyMovies] = useState([])
    const [westernMovies, setWesternMovies] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
     
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMovie = async () => {
            const animatedMoviesData = await getMovie(16);
            setAnimatedMovies(animatedMoviesData);
            const actionMoviesData = await getMovie(28);
            setActionMovies(actionMoviesData);
            const comedyMoviesData = await getMovie(35);
            setComedyMovies(comedyMoviesData);
            const westernMoviesData = await getMovie(37);
            setWesternMovies(westernMoviesData);
            const popularMoviesData = await getPopularMovie();
            setPopularMovies(popularMoviesData)
        };
        fetchMovie()
    }, []);

    const [isCollapsed, setIsCollapsed] = useState(true);

    const maxLength = 100;

    function DivCarousel() {
        const timePass = popularMovies.map((item, i) => (
                <Carousel.Item key={i}>
                    <div className="movie">
                        <div className="info">
                            <div className="title">
                                <h3>{item.title}</h3>
                            </div>
                            <div className="description">
                                {isCollapsed ? `${item.overview.slice(0, maxLength)}...` : item.overview}
                                {item.overview.length > maxLength && (
                                <button onClick={() => navigate(`/home/${item.id}`)} className='readMore'>
                                  {isCollapsed ? 'Read More' : 'Read Less'}
                                </button>
                                )}
                            </div>
                            <div className="controls">
                                <button onClick={() => navigate(`/home/${item.id}`)}>Play</button>
                            </div>
                        </div>
                        <img className="movieImg" src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`} alt="bighero6"/>
                    </div>
                </Carousel.Item>
            )
        )
        return (
            <Carousel pause="hover" touch={true} controls={false}>
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
            {renderMovieRow(animatedMovies, "Animated", navigate)}
            {renderMovieRow(comedyMovies, "Comedy", navigate)}
            {renderMovieRow(actionMovies, "Action", navigate)}
            {renderMovieRow(westernMovies, "Western", navigate)}
        </div>
      </div>
        </>
    )
}