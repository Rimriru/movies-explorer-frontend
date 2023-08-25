const filterForDuration = (isCheckboxChecked, duration) => {
  return !isCheckboxChecked ? duration > 0 : duration <= 40;
};

const filterMoviesByDuration = (arr, isCheckboxChecked) => {
  if (arr) {
    const filteredMoviesArrayByDuration = arr.filter((movie) =>
      filterForDuration(isCheckboxChecked, movie.duration)
    );
    return filteredMoviesArrayByDuration;
  } else {
    return [];
  }
};

const filterMovieArray = (arr, title, isCheckboxChecked) => {
  const searchMovieTitleLowered = title.toLowerCase();
  const isTitleLatin = /[a-z]/.test(searchMovieTitleLowered);
  if (arr) {
    const filteredMoviesArray = arr.filter(
      (movie) =>
        (isTitleLatin ? movie.nameEN : movie.nameRU)
          .toLowerCase()
          .includes(searchMovieTitleLowered) &&
          filterForDuration(isCheckboxChecked, movie.duration)
    );
    return filteredMoviesArray;
  } else {
    return [];
  }
};

const showMovieArray = (arr, title, isCheckboxChecked) => {
  try {
    const filteredMoviesArray = filterMovieArray(arr, title, isCheckboxChecked);
    return filteredMoviesArray;
  } catch (error) {
    console.log(error);
  }
};

const isCardLiked = (savedMoviesArray, movieArray) => {
  if (savedMoviesArray && movieArray) {
    return movieArray.map((movie) => {
      const foundMovie = savedMoviesArray.find(
        (savedMovie) => savedMovie.movieId === movie.id
      );
      if (foundMovie) {
        return { ...movie, isLiked: true };
      }
      return movie;
    });
  } else {
    return;
  }
};

export { filterMoviesByDuration, showMovieArray, isCardLiked };
