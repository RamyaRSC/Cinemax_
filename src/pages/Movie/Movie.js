import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import './Movie.css';

export default function Movie(){
    const [animatedMovies, setAnimatedMovies] = useState ([])
    const [actionMovies, setActionMovies] = useState([])
    const [comedyMovies, setComedyMovies] = useState([])

    const [scrollPositions, setScrollPositions] = useState({
        Animated: 0,
        Comedy: 0,
        Action: 0
    });

    const handleSlide = (genre, direction) => {
        const container = document.querySelector(`.${genre} .slider`); // Select the slider container using the provided genre class
        const scrollAmount = 500; //amount by which to scroll
    
        container?.scrollTo({
            left: (container.scrollLeft + (direction === "left" ? -1 : 1) * scrollAmount), // Calculate the new scrollLeft position based on the direction
            behavior: "smooth"
        });
    
        container && setScrollPositions(prevScrollPositions => ({
            // Update the scroll position in the state based on the current genre
            ...prevScrollPositions,
            [genre]: container.scrollLeft
        }));
    };

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
        getMovie(12, setAnimatedMovies); // Adventure Movies (Genre ID: 12)
        getMovie(27, setComedyMovies);  // Horror Movies (Genre ID: 27)
        getMovie(99, setActionMovies); // Documentry Movies (Genre ID: 99)

        getMovie();
    },[])

    const renderMovieRow = (movies, genre) => (
        <div className={`moviePoster ${genre}`} key={genre}>
            <p>{genre}</p>
            <div className="sliderContainer">
                <i className="fa fa-chevron-left fa-2x" aria-hidden="true" onClick={() => handleSlide (genre, "left")}></i>
                <div className="slider">
                    {movies.map(movie => (
                        <img key={movie.id} className="poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.id} />
                    ))}
                </div>
                <i className="fa fa-chevron-right fa-2x" aria-hidden="true" onClick={() => handleSlide(genre, "right")} />
            </div>
        </div>
    );

    return (
        <>
            <Navbar />
            {renderMovieRow(animatedMovies, "Adventure")}
            {renderMovieRow(comedyMovies, "Horror")}
            {renderMovieRow(actionMovies, "Documentry")}
        </>
    )
}