import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from "../../components/Navbar/Navbar";
import './PlayMovie.css'
import { RingLoader } from 'react-spinners/RingLoader';
// import 'react-spinners/RingLoader.css';

export default function PlayMovie() {
    const [movieDetail, setMovieDetail] = useState();
    const [recommendationDetail, setRecommendationDetail] = useState([]);
    const navigate = useNavigate()
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [credits, setCredits] = useState(null);

    useEffect(() => {
        const getMovie = async (movieID) => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=55eeda8279baa495342e20191faf8cf7`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();  
                console.log(data)
                setMovieDetail(data)
                console.log('Genres:', data.genres.map(genre => genre.name).join(', '));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getMovie(id)
    },[id])

    useEffect(() => {
        const getRecommendations = async (movieID) => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=55eeda8279baa495342e20191faf8cf7`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();  
                // console.log(data)
                setRecommendationDetail(data.results)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getRecommendations(id)
    })

    useEffect(() => {
        const fetchCredits = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=55eeda8279baa495342e20191faf8cf7`);
                const data = await response.json();
                setCredits(data);
                setLoading(false);
                console.log(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };
        fetchCredits()
    },[id]  )

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };


    if (!movieDetail) {
        return <div>Loading...{RingLoader}</div>; // Show loading indicator while fetching data
    } else {
        return (
            <>
            <Navbar />
                <div className="videoPlayerContainer">
                    <div className="videoPlayerBG" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path})`}}/>
                    <video className="videoPlayer" controls poster={`https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}`}>
                        <source src="" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                <div className='videoInfoContainer'>
                    <img className='videoPoster' src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`} />
                    <div className='videoInfo'>
                        <h1>{movieDetail.title}</h1>
                        <p>{movieDetail.overview}</p>
                        
                        <p>"{movieDetail.tagline}"</p>
                        <p>Runtime: {toHoursAndMinutes(movieDetail.runtime)}</p>
                        <p>Release Date: {movieDetail.release_date}</p>
                        <p>Popularity: {movieDetail.popularity}</p>
                        <p>Status: {movieDetail.status}</p>
                        <p>Genres: {movieDetail.genres.map(genre => genre.name).join(', ')}</p>
                    </div>
                </div>
                

                <div className="credits">
                {credits && (
                    <div className="creditsList">
                        <h2>Cast</h2>
                        <div className="castList">
                        {credits.cast && credits.cast.map((castMember) => (
                            <div key={castMember.id} className="castItem">
                            <img src={`https://image.tmdb.org/t/p/w500/${castMember.profile_path}`} alt={castMember.name} className='castImg'/>
                            <div className="castName">{castMember.name}</div>
                            <div className="character">{castMember.character}</div>
                            </div>
                        ))}
                        </div>
                    </div>
                )}
                </div>

                <div className="recommendation">
                    <h1>More Like This</h1>
                    <div className="recommendationContainer">
                    {recommendationDetail.map(movie => (
                        <React.Fragment key={movie.id}>
                            {movie.poster_path && (
                                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className='recommendationImg' onClick={() => navigate(`/home/${movie.id}`)}/>
                            )}
                        </React.Fragment>
                    ))}
                    </div>
                </div>
            </>
        )
    }
}