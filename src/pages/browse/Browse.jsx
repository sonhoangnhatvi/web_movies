import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import useHttp from "../../hooks/use-http";
import {
  MOVIE_API_KEY,
  fetchNetflixOriginals,
  fetchTrending,
  fetchTopRated,
  fetchActionMovies,
  fetchComedyMovies,
  fetchHorrorMovies,
  fetchRomanceMovies,
  fetchDocumentaries,
} from "../../constants/api";
import Banner from "../../components/Banner/Banner";
import MovieList from "../../components/MovieList/MovieList";
import classes from "./Browse.module.css";
import MovieDetail from "../../components/MovieDetail/MovieDetail";

function Browse() {
  // Define state
  // State for banner
  const [movieForBanner, setMovieForBanner] = useState({});
  // State for show/hide movie detail
  const [isShowMovieDetail, setIsShowMovieDetail] = useState(false);
  // State for movie detail
  const [movieDetail, setMovieDetail] = useState({});

  // Handle transform data from API
  const transformTasksMovies = (jsonResponse) => {
    const movieList = jsonResponse.results;
    const loadedMovie = [];
    for (const movie in movieList) {
      loadedMovie.push({
        id: movieList[movie].id,
        original_name: movieList[movie].original_name,
        overview: movieList[movie].overview,
        backdrop_path: movieList[movie].backdrop_path,
        poster_path: movieList[movie].poster_path,
        first_air_date: movieList[movie].first_air_date,
        vote_average: movieList[movie].vote_average,
      });
    }

    // Set movie for banner
    setMovieForBanner(
      loadedMovie[Math.floor(Math.random() * loadedMovie.length - 1)]
    );
  };

  // Define custom hook
  const { sendRequest: fetchTasks } = useHttp();

  // Fetch data from API
  useEffect(() => {
    fetchTasks(
      {
        url: `https://api.themoviedb.org/3${fetchNetflixOriginals}`,
      },
      transformTasksMovies
    );
  }, [fetchTasks]);

  // Define movie list for browse page
  const movieList = [
    {
      url: `https://api.themoviedb.org/3${fetchNetflixOriginals}`,
      type: "Original",
      title: "Netflix Originals",
    },
    {
      url: `https://api.themoviedb.org/3${fetchTrending}`,
      type: "",
      title: "Xu hướng",
    },
    {
      url: `https://api.themoviedb.org/3${fetchTopRated}`,
      type: "",
      title: "Xếp hạng cao",
    },
    {
      url: `https://api.themoviedb.org/3${fetchActionMovies}`,
      type: "",
      title: "Hành động",
    },
    {
      url: `https://api.themoviedb.org/3${fetchComedyMovies}`,
      type: "",
      title: "Hài",
    },
    {
      url: `https://api.themoviedb.org/3${fetchHorrorMovies}`,
      type: "",
      title: "Kinh dị",
    },
    {
      url: `https://api.themoviedb.org/3${fetchRomanceMovies}`,
      type: "",
      title: "Lãng mạn",
    },
    {
      url: `https://api.themoviedb.org/3${fetchDocumentaries}`,
      type: "",
      title: "Tài liệu",
    },
  ];

  // Handle click movie
  const handleMovieClick = (movie) => {
    // Show movie detail
    setIsShowMovieDetail(true);
    // Set movie detail
    setMovieDetail(movie);
  };

  // Handle hide movie detail
  const hideMovieDetailHandler = () => {
    setIsShowMovieDetail(false);
  };

  return (
    <div className={classes.app}>
      <Banner movieForBanner={movieForBanner} />
      <Navbar />
      {isShowMovieDetail && (
        <MovieDetail
          onClose={hideMovieDetailHandler}
          movieDetail={movieDetail}
        />
      )}
      {movieList.map((movie) => {
        return (
          <MovieList
            key={movie.url}
            movieInfo={{
              url: movie.url,
              type: movie.type,
              title: movie.title,
            }}
            onClick={handleMovieClick}
          />
        );
      })}
    </div>
  );
}

export default Browse;
