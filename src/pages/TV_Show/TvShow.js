import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import './TvShow.css';

export default function TvShow(){
    const [tvShowList, setTvShowList] = useState([])
    const [animatedTvShows, setAnimatedTvShows] = useState ([])
    const [comedyTvShows, setComedyTvShows] = useState([])
    const [crimeTvShows, setCrimeTvShows] = useState([])

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
        const getTvShow = async (genre, setTvShowList) => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=55eeda8279baa495342e20191faf8cf7&with_genres=${genre}`);
                const data = await response.json();
                setTvShowList(data.results);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // Mystery TvShows (Genre ID: 16)
        getTvShow(9648, setAnimatedTvShows);

        // Reakity TvShows (Genre ID: 35)
        getTvShow(10764, setComedyTvShows);

        // Drama TvShows (Genre ID: 28)
        getTvShow(18, setCrimeTvShows);

        // getTvShow();
    },[])

    console.log(tvShowList)

    const renderTvShowRow = (tvShows, genre) => (
        <div className={`tvShowPoster ${genre}`} key={genre}>
            <p>{genre}</p>
            <div className="sliderContainer">
                <i className="fa fa-chevron-left fa-2x" aria-hidden="true" onClick={() => handleSlide(genre, "left")}></i>
                <div className="slider" style={{ scrollLeft: scrollPositions[genre] }}>
                    {tvShows.map(tvShow => (
                        <img key={tvShow.id} className="poster" src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`} alt={tvShow.id} />
                    ))}
                </div>
                <i className="fa fa-chevron-right fa-2x" aria-hidden="true" onClick={() => handleSlide(genre, "right")}></i>
            </div>
        </div>
    );

    return(
        <>
            <Navbar />
            {renderTvShowRow(animatedTvShows, "Animated")}
            {renderTvShowRow(comedyTvShows, "Comedy")}
            {renderTvShowRow(crimeTvShows, "Action")}
        </>
    )
}