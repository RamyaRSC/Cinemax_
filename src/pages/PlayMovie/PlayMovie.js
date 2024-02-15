import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from "../../components/Navbar/Navbar";
import './PlayMovie.css'

import firebase from 'firebase/app';
import { db } from '../../firebase'; 

export default function PlayMovie() {
    const [movieDetail, setMovieDetail] = useState();
    const {id} = useParams()
    console.log(id)
    const [videoUrl, setVideoUrl] = useState([]);  //hellll
    //helllll
    useEffect(() => {
        const fetchVideoIds = async () => {
          try {
            // Access Firestore database
            // const db = firebase.firestore();
            // Query the "videos" collection
            const videosCollection = await db.collection('videos').get();
            // Extract video IDs from video documents
            const ids = videosCollection.docs.map(doc => doc.id);
            // Update component state with video IDs
            setVideoUrl(ids);
          } catch (error) {
            console.error('Error fetching video IDs:', error);
          }
        };
    
        fetchVideoIds();
      }, []);

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

    if (!movieDetail) {
        return <div>Loading...</div>; // Show loading indicator while fetching data
    } else {
        return (
            <>
            <Navbar />
            <div>
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
                        <p>Duration: {movieDetail.runtime} mins</p>
                        <p>Release Date: {movieDetail.release_date}</p>
                        <p>Popularity: {movieDetail.popularity}</p>
                        <p>Status: {movieDetail.status}</p>
                        <p>Genres: {movieDetail.genres.map(genre => genre.name).join(', ')}</p>
                    </div>
                </div>

                <h2>Video IDs:</h2>
                <ul>
                    {/* {videoIds.map(videoId => (
                        <li key={videoId}>{videoId}</li>
                    ))} */}
                </ul>

                <video className="videoPlayer" controls poster={`https://image.tmdb.org/t/p/w500${movieDetail.backdrop_path}`}>
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                </video>

            </div>
            </>
        )
    }
}