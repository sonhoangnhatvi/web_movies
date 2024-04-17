import classes from "./Banner.module.css";

// This component is used to display the banner of the movie
const Banner = (props) => {
  return (
    <div
      className={classes.banner}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${props.movieForBanner.backdrop_path})`,
      }}
    >
      <h1 className={classes.movie_title}>
        {props.movieForBanner.original_name}
      </h1>
      <div className={classes.button_group}>
        <button className={classes.button}>Play</button>
        <button className={classes.button}>My List</button>
      </div>
      <h4 className={classes.overview}>{props.movieForBanner.overview}</h4>
    </div>
  );
};

export default Banner;
