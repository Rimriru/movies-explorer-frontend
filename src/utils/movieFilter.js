const filterMovieArray = (arr) => {
  const searchMovieTitleLowered = localStorage.getItem("title").toLowerCase();
  const isTitleLatin = /[a-z]/.test(searchMovieTitleLowered);
  if (arr) {
    const filteredAllMoviesArray = arr.filter((movie) =>
      (isTitleLatin ? movie.nameEN : movie.nameRU)
        .toLowerCase()
        .includes(searchMovieTitleLowered)
    );
    const filteredWithoutShortMoviesArray = arr.filter(
      (movie) =>
        (isTitleLatin ? movie.nameEN : movie.nameRU)
          .toLowerCase()
          .includes(searchMovieTitleLowered) && movie.duration > 40
    );
    return { filteredAllMoviesArray, filteredWithoutShortMoviesArray};
  } else {
    return { filteredAllMoviesArray: [], filteredWithoutShortMoviesArray: [] };
  }
};

const showMovieArray = (arr, isCheckboxChecked) => {
  try {
    const { filteredAllMoviesArray, filteredWithoutShortMoviesArray } = filterMovieArray(arr);
    return isCheckboxChecked ? filteredAllMoviesArray : filteredWithoutShortMoviesArray;
  } catch (error) {
    console.log(error);
  }
}

export default showMovieArray;
