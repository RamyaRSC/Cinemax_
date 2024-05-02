import React, { useEffect, useState } from 'react'
import { fetchUserData } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { API_KEY } from '../Utils';

function Recommendation() {
    const [userData, setUserData] = useState(null);
    const [movieData, setMovieData] = useState(null);
    const [genres, setGenres] = useState([]);
    const navigate = useNavigate()

    // Define a function to fetch movie details from a specific page
    async function fetchMovieDetails(page) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=${page}`);
        const data = await response.json();
        return data.results;
    }
    
    // Define a function to fetch top rated 100 movie details
    async function fetchTopRatedMovies() {
        let topRatedMovies = [];
    
        // Fetch data from 5 pages (total of 100 movies)
        for (let page = 1; page <= 35; page++) {
        const results = await fetchMovieDetails(page);
        topRatedMovies = topRatedMovies.concat(results);
        }
        return topRatedMovies;
    }
      

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
                const data = await response.json();
                setGenres(data.genres); // Update genres state with fetched data

            } catch (error) {
              console.error("Error fetching genres:", error);
            }
        };
        fetchGenres();
        
        // Call the function to fetch top rated 100 movie details
        fetchTopRatedMovies()
        .then(topRatedMovies => {
        setMovieData(topRatedMovies);
        })
        .catch(error => {
        console.error('Error fetching top rated movies:', error);
        });
        
        fetchUserData(setUserData);
    },[])

    let topGenres = []
    if (userData  !== null && userData !== undefined) {
        // console.log("User data:", userData); // Output: { Genre: { Adventure: 5, Action: 3, Comedy: 2 } }
        let myGenres = Object.keys(userData.Genre); // Get the keys (genre names) from the userData.Genre object
        myGenres.sort((a, b) => userData.Genre[b] - userData.Genre[a]);  // Sort the genres array based on the values in descending order
        topGenres = myGenres.slice(0, 2); // Get the names of the 2 elements with maximum values
        // console.log("Top genres:", topGenres); // Output: ["Adventure", "Action"]   
    }
    
    function convertPreferencesToIds(preferences) {
        return preferences.map(preference => {
          const genre = genres.find(item => item.name === preference);
          return genre ? genre.id : null;
        });
      }
    // console.log(topGenres)
    const preferenceIds = convertPreferencesToIds(topGenres);
    // console.log("finaly",preferenceIds);


    function filterMoviesByGenreIds(movies, genreIds) {
        return movies.filter(movie =>
            movie.genre_ids !== undefined && genreIds.every(genreId => movie.genre_ids.includes(genreId))

        );
    }
      
    let filteredMovies = [];
    if (movieData !== null && typeof movieData === 'object' && Array.isArray(movieData)) {
        filteredMovies = filterMoviesByGenreIds(movieData, preferenceIds); // Call the filterMoviesByGenreIds function
        // console.log(filteredMovies);
    } else {
        console.log("movieData is null or not an array");
    } 

    const [sliderPosition, setSliderPosition] = useState(0);
      
    const handleSlide = (direction, setSliderPosition) => {
        const sliderContainer = document.querySelector('.slider'); // Select the slider container
        const scrollAmount = 500; // Amount by which to scroll
    
        sliderContainer?.scrollTo({
            left: (sliderContainer.scrollLeft + (direction === "left" ? -1 : 1) * scrollAmount), // Calculate the new scrollLeft position based on the direction
            behavior: "smooth"
        });
        // Note: If you need to update scroll position in state, you can do it here
    };
    
    
    const renderMovieRow = (filteredMovies) => (
        <div className={`moviePosterHome`}>
            <p>Recommended Movies</p>
            <div className="sliderContainer">
                <i className="fa fa-chevron-left fa-2x" aria-hidden="true" onClick={() => handleSlide ('left')}></i>
                <div className="slider" style={{ transform: `translateX(-${sliderPosition}px)` }}>
                    {filteredMovies.map(movie => (
                        <img key={movie.id} className="poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.id} onClick={() => navigate (`/home/${movie.id}`)}/>
                    ))}
                </div>
                <i className="fa fa-chevron-right fa-2x" aria-hidden="true" onClick={() => handleSlide('right')}></i>
            </div>
        </div>
    );
    

    return (
        <>
            {renderMovieRow(filteredMovies, sliderPosition)}
        </>
    )
}

export default Recommendation;