import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  const deleteMovieListHandler = (id) =>{
    props.onDeleteMovie(id);
  }
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          onDelete={deleteMovieListHandler}
        />
      ))}
    </ul>
  );
};

export default MovieList;
