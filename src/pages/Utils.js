// import React, { useEffect } from 'react'

export const getMovie = async (genre) => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=55eeda8279baa495342e20191faf8cf7&with_genres=${genre}`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};

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

