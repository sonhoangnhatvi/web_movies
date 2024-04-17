import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import classes from "./MovieList.module.css";

const MovieList = (props) => {
  // use State for movie list
  const [movieList, setMovieList] = useState([]);

  // Handle transform data from API
  const transformTasksMovies = (jsonResponse) => {
    const movieList = jsonResponse.results;
    const loadedMovie = [];
    for (const movie in movieList) {
      loadedMovie.push({
        id: movieList[movie].id,
        original_title: movieList[movie].original_title,
        overview: movieList[movie].overview,
        backdrop_path: movieList[movie].backdrop_path,
        poster_path: movieList[movie].poster_path,
      });
    }

    // Set movie list
    setMovieList(loadedMovie);
  };

  // use Http for fetching data
  const { sendRequest: fetchTasks } = useHttp();

  // Fetch data from API
  useEffect(() => {
    fetchTasks(
      {
        url: `${props.movieInfo.url}`,
      },
      transformTasksMovies
    );
  }, [fetchTasks, props.movieInfo]);

  // Check type of movie
  const isOriginal = props.movieInfo.type === "Original" ? true : false;

  return (
    <div className={classes.movie_list_container}>
      <h3 className={classes.movie_list_title}>{props.movieInfo.title}</h3>
      <div className={classes.movie_list}>
        {movieList.map((movie) => {
          return (
            <img
              className={`${classes.movie_poster} ${classes.img_zoom}`}
              key={movie.id}
              src={`https://image.tmdb.org/t/p/original${
                isOriginal ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.original_name}
              onClick={() => props.onClick(movie)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MovieList;
