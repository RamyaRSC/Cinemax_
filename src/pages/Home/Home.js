import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import './Home.css';
import { useEffect, useState } from "react";
// import { checkUser } from "../../firebase";

export default function Home(){
    const [animatedMovies, setAnimatedMovies] = useState ([])
    const [actionMovies, setActionMovies] = useState([])
    const [comedyMovies, setComedyMovies] = useState([])
    const [currentSlide, setCurrentSlide] = useState(0)

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

        getMovie(16, setAnimatedMovies); // Animated Movies (Genre ID: 16)
        getMovie(28, setActionMovies); // Action Movies (Genre ID: 28)
        getMovie(35, setComedyMovies); // Comedy Movies (Genre ID: 35)
    },[])

    const renderMovieRow = (movies, genre) => (
        <div className={`moviePosterHome ${genre}`} key={genre}>
            <p>{genre}</p>
            <div className="sliderContainer">
                <i className="fa fa-chevron-left fa-2x" aria-hidden="true" onClick={() => handleSlide (genre, "left")}></i>
                <div className="slider">
                    {movies.map(movie => (
                        <img key={movie.id} className="poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.id} />
                    ))}
                </div>
                <i className="fa fa-chevron-right fa-2x" aria-hidden="true" onClick={() => handleSlide(genre, "right")}></i>
            </div>
        </div>
    );

    // const sliderMovie = ({image}) => {
    //     const [currentIndex, setCurrentIndex] = useState(0);

    //     useEffect(() => {
    //         // Function to handle automatic sliding
    //         const slideAutomatically = () => {
    //             setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    //         };

    //         // Start automatic sliding every 3 seconds (adjust as needed)
    //         const interval = setInterval(slideAutomatically, 3000);

    //         // Cleanup function to clear the interval when component unmounts
    //             return () => clearInterval(interval);
    //     }, [images]); // Re-run effect whenever images change
    // }


    return(
        <>
            <Navbar />
            <div className="home">
                <div className="homeContainer">
                    <div className="movie">
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
                            <button>Add to Watch Party</button>
                            </div>
                        </div>
                    </div>
                    {renderMovieRow(animatedMovies, "Animated")}
                    {renderMovieRow(comedyMovies, "Comedy")}
                    {renderMovieRow(actionMovies, "Action")}
                    {/* {sliderMovie} */}

                    <div className="slider">
                    <i className="arrowprev"/>
                    <i className="arrownext"/>
                        {/* {movie.map((slide, movie) => {
                            return(
                                <div className={index ===currentSlide ? "slide current" : "slide"} key={index}>
                                    {index === currentSlide && (
                                        <>
                                        <img src={`https://image.tmdb.org/t/p/w500} alt="slide"`}/>
                                        <div className="content">
                                            <h2>{slide.heading}</h2>
                                            <p>{slide.desc}</p>
                                            <hr />
                                            <button>play</button>
                                        </div>
                                        </>
                                    )}
                                </div>
                            )
                        })} */}
                    </div>
                </div>
            </div>
        </>
    )
}