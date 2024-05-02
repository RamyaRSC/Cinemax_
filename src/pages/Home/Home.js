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
    //     const fetchGenres = async () => {
    //       try {
    //         const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=55eeda8279baa495342e20191faf8cf7');
    //         const data = await response.json();
    //         // setGenres(data.genres); // Update genres state with fetched data
    //       } catch (error) {
    //         console.error("Error fetching genres:", error);
    //       }
    //     };
    //     fetchGenres();

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
            // const selectedGenresData = await fetchMovies(selectedGenres);
            // setSelectedGenres(selectedGenresData)
        };
        fetchMovie()
    }, []);

    // const fetchMovie = async () => {
    //   try {
    //     const fetchedMovies = await Promise.all(selectedGenres.map(async (genreId) => {
    //       const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=55eeda8279baa495342e20191faf8cf7&with_genres=${genreId}`);
    //       const data = await response.json();
    //       return data.results;
    //     }));
    //     setComedyMovies(fetchedMovies.find((movies) => movies[0]?.genre_ids.includes(35)) || []);
    //   } catch (error) {
    //     console.error('Error fetching movies:', error);
    //   }
    // };
  
    // const handleGenreChange = (event) => {
    //   const selectedGenres = Array.from(event.target.selectedOptions, (option) => parseInt(option.value));
    //   setSelectedGenres(selectedGenres);
    // };
  
    // useEffect(() => {
    //   if (selectedGenres.length > 0) {
    //     fetchMovie();
    //   }
    // }, [selectedGenres]);

    // const renderMovieRow = (movies, genre) => (
    //     <div className={`moviePosterHome ${genre}`} key={genre}>
    //         <p>{genre}</p>
    //         <div className="sliderContainer">
    //             <i className="fa fa-chevron-left fa-2x" aria-hidden="true" onClick={() => handleSlide (genre, "left")}></i>
    //             <div className="slider">
    //                 {movies.map(movie => (
    //                     <img key={movie.id} className="poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.id} onClick={() => navigate(`/home/${movie.id}`)}/>
    //                 ))}
    //             </div>
    //             <i className="fa fa-chevron-right fa-2x" aria-hidden="true" onClick={() => handleSlide(genre, "right")}></i>
    //         </div>
    //     </div>
    // );
    const [isCollapsed, setIsCollapsed] = useState(true);

//   const toggleCollapsed = () => {
//     setIsCollapsed(!isCollapsed);
//   };

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
                                {/* <p>{item.overview }</p> */}
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
            {/* <h2>Select Genres:</h2>
        <select
          multiple
          value={selectedGenres}
          onChange={handleGenreChange}
        >
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select> */}
      </div>
      {/* <button onClick={fetchMovie}>Get Recommendations</button> */}
      {/* {console.log("fetchMovesss", fetchMovies)} */}
        </>
    )
}