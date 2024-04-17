import { useEffect, useRef, useState } from "react";
import SearchIcon from "../Navbar/SearchIcon";
import classes from "./SearchForm.module.css";
import useHttp from "../../hooks/use-http";
import { MOVIE_API_KEY } from "../../constants/api";

const SearchForm = (props) => {
  // Define state
  // State for input value
  const [inputValue, setInputValue] = useState("");
  // State for loaded movie
  const [loadedSearchMovie, setLoadedSearchMovie] = useState([]);
  // State for from ref
  const formRef = useRef(null);

  // Handle transform data from API
  const transformTasksMovies = (jsonResponse) => {
    const movieList = jsonResponse.results;
    const loadedMovie = [];
    for (const movie in movieList) {
      console.log("movie", movie);
      loadedMovie.push({
        id: movieList[movie].id,
        original_title: movieList[movie].original_title,
        overview: movieList[movie].overview,
        backdrop_path: movieList[movie].backdrop_path,
        poster_path: movieList[movie].poster_path,
      });
    }

    // Set loaded movie
    setLoadedSearchMovie(loadedMovie);
  };

  // Handle form submit
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Send data to search page
    props.sendDataToSearchPage(loadedSearchMovie);
  };

  // Use Http for fetching data
  const { sendRequest: fetchTasks } = useHttp();

  // Fetch data from API
  useEffect(() => {
    const typingTimer = setTimeout(() => {
      fetchTasks(
        {
          url: `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&language=en-US&query=${inputValue}`,
        },
        transformTasksMovies
      );
    }, 1000);

    return () => {
      clearTimeout(typingTimer);
    };
  }, [fetchTasks, inputValue]);

  // Handle form reset
  useEffect(() => {
    const handleFormReset = () => {
      // Perform desired actions after form reset
      props.sendDataToSearchPage([]);
      setInputValue("");
    };

    if (formRef.current) {
      formRef.current.addEventListener("reset", handleFormReset);
    }

    return () => {
      if (formRef.current) {
        formRef.current.removeEventListener("reset", handleFormReset);
      }
    };
  }, [props]);

  // Handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <form
      className={classes.search_form_container}
      onSubmit={handleFormSubmit}
      ref={formRef}
    >
      <div className={classes.search_form}>
        <div className={classes.search_area}>
          <input
            className={classes.input}
            onChange={handleInputChange}
            value={inputValue}
          ></input>
          <SearchIcon type="search_form" />
        </div>
        <div className={classes.button_area}>
          <button type="reset" className={classes.btn_reset}>
            RESET
          </button>
          <button type="submit" className={classes.btn_search}>
            SEARCH
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
