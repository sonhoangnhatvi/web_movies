import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import classes from "./Search.module.css";
import SearchForm from "../../components/SearchForm/SearchForm";
import ResultList from "../../components/ResultList/ResultList";
import MovieDetail from "../../components/MovieDetail/MovieDetail";

const Search = () => {
  // Define state
  // State for movie search list
  const [movieSearchList, setMovieSearchList] = useState([]);
  // State fro show/hide movie detail
  const [isShowMovieDetail, setIsShowMovieDetail] = useState(false);
  // State for movie detail
  const [movieDetail, setMovieDetail] = useState({});

  // Get data from search form
  const handleDataFromSearchForm = (data) => {
    setMovieSearchList(data);
  };

  // Handle movie click
  const handleMovieClick = (movie) => {
    // Show movie detail
    setIsShowMovieDetail(true);
    // Set movie detail
    setMovieDetail(movie);
  };

  // State hide movie detail
  const hideMovieDetailHandler = () => {
    setIsShowMovieDetail(false);
  };

  return (
    <div className={classes.app}>
      <Navbar />
      <SearchForm sendDataToSearchPage={handleDataFromSearchForm}></SearchForm>
      {isShowMovieDetail && (
        <MovieDetail
          onClose={hideMovieDetailHandler}
          movieDetail={movieDetail}
        />
      )}
      <ResultList
        movieList={movieSearchList}
        onClose={hideMovieDetailHandler}
        onClick={handleMovieClick}
      ></ResultList>
    </div>
  );
};

export default Search;
