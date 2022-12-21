export const getExactMovieInfo = (movies, selectedMovie) => {
  return movies.filter(({ movieInfo }) => movieInfo.title === selectedMovie);
};
