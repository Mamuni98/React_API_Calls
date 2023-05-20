import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchMoviesHandler = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://swapi.dev/api/films/");

      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
        };
      });
      setIsLoading(false);
      setMovies(transformedMovies);
    } catch (error) {
      console.log(error);
    }
    // setIsLoading(false);
  };
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      {isLoading ? (
        <h4>...Loading</h4>
      ) : (
        <section>
          <MoviesList movies={movies} />
        </section>
      )}
    </React.Fragment>
  );
}

export default App;
