import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import Modal from "../UI/Modal";
import classes from "./MovieDetail.module.css";
import { MOVIE_API_KEY } from "../../constants/api";

const MovieDetail = (props) => {
  // Define state
  // State for movie detail
  const [movieDetail, setMovieDetail] = useState({});
  // State for hide/show Video trailer
  const [isShowiframe, setIsShowiframe] = useState(true);
  // State for hide/show Backdrop image
  const [isShowBackdrop, setIsShowBackdrop] = useState(false);

  // Handle transform data from API
  const transformTasksMovies = (jsonResponse) => {
    const movieDetailResults = jsonResponse.results;
    const loadedMovieDetailResults = [];
    // if movieDetailResults is empty, set movieDetail default value
    if (movieDetailResults.length === 0) {
      setMovieDetail({
        id: props.movieDetail.id,
        original_title: "",
        overview: "",
        backdrop_path: "",
        poster_path: "",
        key: "",
        site: "",
        published_at: "0000-00-00",
        vote_average: "",
        type: "",
        typeOrd: 0,
      });
      // if movieDetailResults is not empty, set movieDetail value
    } else {
      for (const movie in movieDetailResults) {
        loadedMovieDetailResults.push({
          id: movieDetailResults[movie].id,
          original_title: props.movieDetail.original_title,
          overview: props.movieDetail.overview,
          backdrop_path: props.movieDetail.backdrop_path,
          poster_path: props.movieDetail.poster_path,
          key: movieDetailResults[movie].key,
          site: movieDetailResults[movie].site,
          published_at:
            movieDetailResults[movie].published_at === "" ||
            movieDetailResults[movie].published_at === null ||
            movieDetailResults[movie].published_at === undefined
              ? "0000-00-00"
              : movieDetailResults[movie].published_at.substr(0, 10),
          vote_average: props.movieDetail.vote_average,
          type: movieDetailResults[movie].type,
          typeOrd: movieDetailResults[movie].type === "Trailer" ? 1 : 2,
        });
      }

      // Get first movie detail with type is Trailer or Teaser and site is YouTube
      const movieDetailGet = loadedMovieDetailResults
        .filter((movieDetail) => {
          return (
            (movieDetail.type === "Trailer" || movieDetail.type === "Teaser") &&
            movieDetail.site === "YouTube"
          );
        })
        .sort((a, b) => a.typeOrd - b.typeOrd);

      // If movieDetailGet is empty, loadedMovieDetailResults is not empty, get first movie detail with site is YouTube and use Backdrop image instead of Video trailer
      if (
        movieDetailGet.length === 0 &&
        loadedMovieDetailResults.length !== 0
      ) {
        // Get movie detail with site is YouTube
        const loadedMovieDetailResultsFilterSite =
          loadedMovieDetailResults.filter(
            (movieDetail) => movieDetail.site === "YouTube"
          );

        // If loadedMovieDetailResultsFilterSite is not empty, set movieDetail value
        if (loadedMovieDetailResultsFilterSite.length > 0) {
          // Hide Video trailer
          setIsShowiframe(false);
          // Show Backdrop image
          setIsShowBackdrop(true);
          // Set movieDetail value
          setMovieDetail(loadedMovieDetailResults[0]);
        }
      } else {
        // Set movieDetail value
        setMovieDetail(movieDetailGet[0]);
      }
    }
  };

  // use Http for fetching data
  const { sendRequest: fetchTasks } = useHttp();

  // Fetch data from API
  useEffect(() => {
    fetchTasks(
      {
        url: `https://api.themoviedb.org/3/movie/${props.movieDetail.id}/videos?api_key=${MOVIE_API_KEY}`,
      },
      transformTasksMovies
    );
  }, [fetchTasks, props.movieDetail.id]);

  return (
    <Modal className={classes.movie_detail} onClose={props.onClose}>
      <div className={classes.movie_detail_container}>
        <div>
          <h1 className={classes.original_title}>
            {movieDetail.original_title}
          </h1>
          <div className={classes.subtitle}>
            <h3 className={classes.published_at}>
              Release Date: {movieDetail.published_at}
            </h3>
            <p className={classes.vote_average}>{movieDetail.vote_average}</p>
          </div>
          <p className={classes.overview}>{movieDetail.overview}</p>
        </div>
        {isShowiframe && (
          <iframe
            title={movieDetail.original_title}
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${movieDetail.key}`}
          ></iframe>
        )}
        {isShowBackdrop && (
          <img
            className={classes.backdrop_path}
            src={`https://image.tmdb.org/t/p/original${
              movieDetail.backdrop_path !== null
                ? movieDetail.backdrop_path
                : movieDetail.poster_path
            }`}
            alt={movieDetail.original_name}
          />
        )}
      </div>
    </Modal>
  );
};

export default MovieDetail;
