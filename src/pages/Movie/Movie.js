import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './Movie.css';
import FadeLoader from 'react-spinners/FadeLoader';
import { getMovie, renderMovieRow } from '../Utils';

export default function Movie(){
    const [adventureMovies, setAdventureMovies] = useState ([]);
    const [horrorMovies, setHorrorMovies] = useState([]);
    const [documentryMovies, setDocumentryMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const adventureMoviesData = await getMovie(12);
                setAdventureMovies(adventureMoviesData);
                const horrorMoviesData = await getMovie(27);
                setHorrorMovies(horrorMoviesData);
                const documentryMoviesData = await getMovie(99);
                setDocumentryMovies(documentryMoviesData);
                setLoading(false); // Set loading to false after fetching data
            } catch (error) {
                console.error("Error fetching movies:", error);
                setLoading(false); // Set loading to false in case of error
            }    
        };
        fetchMovie();
    },[]);
    

    return (
        <>
            <Navbar />
            {loading ? ( // Display loader if loading is true
                <div className="loader-container">
                    <FadeLoader color="#fff" size={80}/>
                </div>
            ) : (
            <>
            {renderMovieRow(adventureMovies, "Adventure", navigate)}
            {renderMovieRow(horrorMovies, "Horror", navigate)}
            {renderMovieRow(documentryMovies, "Documentry", navigate)}
            </>
            )}
        </>
    )
}