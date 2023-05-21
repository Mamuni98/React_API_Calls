import React, {useRef} from "react";
import classes from "./AddMovie.module.css";


const AddMovie = (props) => {
    const titleRef = useRef();
    const openingTextRef = useRef();
    const dateRef = useRef()

    const formSubmitHandler =(event) => {
        event.preventDefault();
        const newMovie = {
            title:titleRef.current.value,
            openingText:openingTextRef.current.value,
            releaseDate:dateRef.current.value
        }

        props.onAddMovie(newMovie);
        event.target.reset();
    }
  return (
    <form onSubmit={formSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" ref={titleRef}/>
      </div>

      <div className={classes.control}>
        <label htmlFor="opening-text">Opening Text</label>
        <textarea rows="5" id="opening-text" ref={openingTextRef}></textarea>
      </div>

      <div className={classes.control}>
        <label htmlFor="date">Release Date</label>
        <input type="date" id="date" ref={dateRef}/>
      </div>

      <button type="submit">AddMovie</button>
    </form>
  );
};
export default AddMovie;
