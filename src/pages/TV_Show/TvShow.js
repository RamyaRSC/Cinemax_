import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import './TvShow.css';
import { useNavigate } from "react-router-dom";
import { handleSlide } from "../Utils";

export default function TvShow(){
    const [tvShowList, setTvShowList] = useState([])
    const [mysteryTvShows, setMysteryTvShows] = useState ([])
    const [realityTvShows, setRealityTvShows] = useState([])
    const [dramaTvShows, setDramaTvShows] = useState([])
    const navigate = useNavigate()

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
        
        getTvShow(9648, setMysteryTvShows); // Mystery TvShows (Genre ID: 16)
        getTvShow(10764, setRealityTvShows); // Reality TvShows (Genre ID: 35)
        getTvShow(18, setDramaTvShows); // Drama TvShows (Genre ID: 28)
        // getTvShow();
    },[])

    console.log(tvShowList)

    const renderTvShowRow = (tvShows, genre) => (
        <div className={`tvShowPoster ${genre}`} key={genre}>
            <p>{genre}</p>
            <div className="sliderContainer">
                <i className="fa fa-chevron-left fa-2x" aria-hidden="true" onClick={() => handleSlide(genre, "left")}></i>
                <div className="slider">
                    {tvShows.map(tvShow => (
                        <img key={tvShow.id} className="poster" src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`} alt={tvShow.id} onClick={() => navigate(`/home/${tvShow.id}`)}/>
                    ))}
                </div>
                <i className="fa fa-chevron-right fa-2x" aria-hidden="true" onClick={() => handleSlide(genre, "right")}></i>
            </div>
        </div>
    );

    return(
        <>
            <Navbar />
            {renderTvShowRow(mysteryTvShows, "Animated")}
            {renderTvShowRow(realityTvShows, "Comedy")}
            {renderTvShowRow(dramaTvShows, "Action")}
        </>
    )
}