import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import { RingLoader } from 'react-spinners/RingLoader';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Rating from 'react-rating';
import { userMovieData } from '../../firebase';
import { API_KEY } from '../Utils';

import './PlayMovie.css';

export default function PlayMovie() {
    const [movieDetail, setMovieDetail] = useState();
    const [similarRecommendationDetail, setSimilarRecommendationDetail] = useState([]);
    const [recommendationDetail, setRecommendationDetail] = useState([]);
    const navigate = useNavigate()
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [credits, setCredits] = useState(null);
    const [ratingStatement, setRatingStatement] = useState('What do you think?');
    const [selectedRating, setSelectedRating] = useState(0);

    useEffect(() => {
        const getMovie = async (movieID) => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();  
                // console.log(data)
                setMovieDetail(data)
                console.log('Genres:', data.genres.map(genre => genre.name).join(', '));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getMovie(id)
    },[id])

    useEffect(() => {
        const getSimilarRecommendations = async (movieID) => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=${API_KEY}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();  
                // console.log(data)
                setSimilarRecommendationDetail(data.results)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getSimilarRecommendations(id)

        const getRecommendations = async (movieID) => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=${API_KEY}`);
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
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
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
    
    const handleRating = (value) => {
        // console.log("randome");
        // setSelectedRating(value);
        switch (value) {
            case 0.5:
                setRatingStatement("Appalling");
                break;
            case 1:
                setRatingStatement("Horrible");
                break;
            case 1.5:
                setRatingStatement("Very Bad");
                break;
            case 2:
                setRatingStatement("Bad");
                break;
            case 2.5:
                setRatingStatement("Average");
                break;
            case 3:
                setRatingStatement("Fine");
                break;
            case 3.5:
                setRatingStatement("Good");
                break;
            case 4:
                setRatingStatement("Very Good");
                break;
            case 4.5:
                setRatingStatement("Great");
                break;
            case 5:
                setRatingStatement("Masterpiece");
                break;
            default:
                setRatingStatement("What do you think?");
                break;
        }
    };
    
    function handleUserRating(value) {
        setSelectedRating(value);
        let obj = {
            // "Rating": value,
            "Genre": movieDetail.genres.map(genre => genre.name).join(', '),
            // "MovieName": movieDetail.title,
            // "MovieID": id,
            "MovieDetails": {"id": id, "title": movieDetail.title, "rating": value}
        }
        // console.log(obj)
        userMovieData(obj)
    }

    if (!movieDetail) {
        return <div>Loading...{RingLoader}</div>; // Show loading indicator while fetching data
    } else {
        return (
            <>
            <Navbar />
            <div className="playMovieContainer">
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
                        <div className='videoInfoGridContainer'>
                            <div className='videoInfoGrid'>
                                <p>Runtime: {toHoursAndMinutes(movieDetail.runtime)}</p>
                                <p>Release Date: {movieDetail.release_date}</p>
                                <p>Popularity: {movieDetail.popularity}</p>
                                <p>Status: {movieDetail.status}</p>
                            </div>
                            <div className='rating'>
                                <Rating
                                    stop={5}
                                    emptySymbol={[
                                    <i key={1} className="far fa-star fa-2x low"></i>,
                                    <i key={2} className="far fa-star fa-2x low"></i>,
                                    <i key={3} className="far fa-star fa-2x medium"></i>,
                                    <i key={4} className="far fa-star fa-2x medium"></i>,
                                    <i key={5} className="far fa-star fa-2x high"></i>
                                    ]}
                                    fullSymbol={[
                                    <i key={1} className="fas fa-star fa-2x low"></i>,
                                    <i key={2} className="fas fa-star fa-2x low"></i>,
                                    <i key={3} className="fas fa-star fa-2x medium"></i>,
                                    <i key={4} className="fas fa-star fa-2x medium"></i>,
                                    <i key={5} className="fas fa-star fa-2x high"></i>,
                                    ]}
                                    fractions={2}
                                    initialRating={selectedRating} // Pass the initial selected rating
                                    onHover={(value) => {if (selectedRating === 0) {handleRating(value)}}}
                                    onClick={(value) => handleUserRating(value)} // Handle rating change on click
                                    readonly={selectedRating !== 0} //Set readonly based on whether a rating is selected
                                />
                                <p>{ratingStatement}</p>
                            </div>
                        </div>
                        
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
                    <h1>Recommendations</h1>
                    <div className='recommendationContainer'>
                    {recommendationDetail.map(movie => (
                        <React.Fragment key={movie.id}>
                            {movie.poster_path && (
                                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className='recommendationImg' onClick={() => { 
                                    navigate(`/home/${movie.id}`); 
                                    setSelectedRating(0);
                                    setRatingStatement('What do you think?')
                                }}/>
                            )}
                        </React.Fragment>
                    ))}
                    </div>
                    <h1>Similar movies</h1>
                    <div className="recommendationContainer">
                    {similarRecommendationDetail.map(movie => (
                        <React.Fragment key={movie.id}>
                            {movie.poster_path && (
                                <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className='recommendationImg' onClick={() => navigate(`/home/${movie.id}`)}/>
                            )}
                        </React.Fragment>
                    ))}
                    </div>
                </div>
            </div>
            </>
        )
    }
}