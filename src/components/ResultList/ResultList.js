import classes from "./ResultList.module.css";

// ResultList component
const ResultList = (props) => {
  return (
    <div>
      {props.movieList.map((movie) => {
        return (
          <img
            className={`${classes.movie_poster} ${classes.img_zoom}`}
            key={movie.id}
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={movie.original_name}
            onClick={() => props.onClick(movie)}
          />
        );
      })}
    </div>
  );
};

export default ResultList;
