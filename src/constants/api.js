// Definition: API constants for the movie database
export const MOVIE_API_KEY = "011ddc01dd093d9988cf1b87c378aece";
export const fetchNetflixOriginals = `/discover/tv?api_key=${MOVIE_API_KEY}&with_network=123`;
export const fetchTrending = `/trending/all/week?api_key=${MOVIE_API_KEY}&language=en-US`;
export const fetchTopRated = `/movie/top_rated?api_key=${MOVIE_API_KEY}&language=en-US`;
export const fetchActionMovies = `/discover/movie?api_key=${MOVIE_API_KEY}&with_genres=28`;
export const fetchComedyMovies = `/discover/movie?api_key=${MOVIE_API_KEY}&with_genres=35`;
export const fetchHorrorMovies = `/discover/movie?api_key=${MOVIE_API_KEY}&with_genres=27`;
export const fetchRomanceMovies = `/discover/movie?api_key=${MOVIE_API_KEY}&with_genres=10749`;
export const fetchDocumentaries = `/discover/movie?api_key=${MOVIE_API_KEY}&with_genres=99`;
export const fetchSearch = `/search/movie?api_key=${MOVIE_API_KEY}&language=en-US`;
export const fetchMovie = `/movie/550?api_key=${MOVIE_API_KEY}&language=en-US`;
