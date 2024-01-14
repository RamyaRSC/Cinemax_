import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import {data} from "./poster";
import './Home.css';

export default function Home(){
    const slideLeft = () => {
        var slider = document.querySelector('.slider');
        slider.scrollLeft = slider.scrollLeft - 500;
    };
    
    const slideRight = () => {
        var slider = document.querySelector('.slider');
        slider.scrollLeft = slider.scrollLeft + 500;
      };

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
                    <div className="moviePoster">
                        <p>More Like This</p>
                        <div className="sliderContainer">
                            <i className="fa fa-chevron-left fa-2x" aria-hidden="true" onClick={slideLeft}></i>
                            <div className="slider">
                                {data.map(item => (
                                    <img key={item.id} className="poster" src={item.img} alt={item.id}></img>
                                ))}
                            </div>
                            <i className="fa fa-chevron-right fa-2x" aria-hidden="true" onClick={slideRight}></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}