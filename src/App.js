import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Movies from "./Pages/Movies/Movies";
import Profile from "./Pages/Profile/Profile"

function App() {
  // starting off with my personal fave movies
  const [movieTitles, setMovieTitles] = useState(["Mona Lisa", "The Stolen Children", "Gaslight", "Truly, Madly, Deeply", "Barbie", "Seabiscuit", "Leon: The Professional", "Noises Off"]);

  const [movies, setMovies]= useState([]);

  const getMovieObj = async (title) => {
    const url = `http://www.omdbapi.com/?i=tt3896198&t=${title}&apikey=96ae0748`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("this is what is coming back as JSON: ", data);
    return data;
    };

  const getMovies = async (titlesArr) => {
    const storeReturn = await Promise.all(titlesArr.map(title => {
      let obj = getMovieObj(title);
      return obj;
      }))
      setMovies(storeReturn);
      return storeReturn;
    };

  // THIS IS THE CALLBACK FUNCTION BEING DECLARED AND DEFINED, AND WILL BE EXECUTED (AT DAWN) IN THE CHILD!!!!!!!!!!!!
  const updateMovieTitles = (arr) => {
    setMovieTitles(arr);
  }

  useEffect(() => {
    getMovies(movieTitles);
    }, [movieTitles]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Movies movies={movies} />} />
        <Route path="Profile" element={<Profile beginningMovies = {movieTitles} getNewTitles = {arr => updateMovieTitles(arr)} />} />
      </Routes>
    </div>
  );
}

export default App;
