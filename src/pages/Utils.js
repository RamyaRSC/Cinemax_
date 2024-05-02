// import "./Utils.css";

export const API_KEY = '55eeda8279baa495342e20191faf8cf7';

//for fetching api key
export const getMovie = async (genre) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};

//for popular movies
export const getPopularMovie = async() => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
        const data = await response.json();
        // console.log(data.results)
        return data.results;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

//for handleslide
export const handleSlide = (genre, direction, setScrollPositions) => {
    const container = document.querySelector(`.${genre} .slider`); // Select the slider container using the provided genre class
    const scrollAmount = 500; //amount by which to scroll

    container?.scrollTo({
        left: (container.scrollLeft + (direction === "left" ? -1 : 1) * scrollAmount), // Calculate the new scrollLeft position based on the direction
        behavior: "smooth"
    });

    if (setScrollPositions) {
    container && setScrollPositions(prevScrollPositions => ({
        // Update the scroll position in the state based on the current genre
        ...prevScrollPositions,
        [genre]: container.scrollLeft
    }));
}
};

//for renderMovieRow
export const renderMovieRow = (movies, genre, navigate) => (
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