import React, { useEffect, useState, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const stopRetrying = () => {
    setError(null);
    setIsLoading(false);
    setMovies([]);
  };
  const fetchMoviesHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        "https://react-http-movie-91bc3-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong...");
      }
      const data = await response.json();
      const loadedMovies = [];
      for (let key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const addNewMovieHandler = async (newMovie) => {
    //console.log(newMovie);
    try {
      const response = await fetch(
        "https://react-http-movie-91bc3-default-rtdb.firebaseio.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(newMovie),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      //console.log(data);
      const addMovie = { id: data.name, ...newMovie };
      setMovies((prev) => {
        return [addMovie, ...prev];
      });
    } catch (error) {
      console.log(error);
    }
  };
  const deleteMovieFromListHandler = async (id) => {
    try {
      //console.log(id);
      await fetch(
        `https://react-http-movie-91bc3-default-rtdb.firebaseio.com/movies/${id}.json`,
        { method: "DELETE" }
      );
      setMovies((prevMovies) => {
        const filteredMovies = prevMovies.filter((movie) => movie.id !== id);
        return [...filteredMovies];
      });
    } catch (error) {
      console.log(error);
    }
  };

  let content = <p>Found no movies in the list.</p>;
  if (movies.length > 0) {
    content = (
      <MoviesList movies={movies} onDeleteMovie={deleteMovieFromListHandler} />
    );
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (error) {
    content = (
      <p style={{ color: "red" }}>
        {error}Retrying...<button onClick={stopRetrying}>Cancel</button>
      </p>
    );
  }
  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addNewMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
