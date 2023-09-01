class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    try {
      return res.json().then(data => data);
    } catch (error) {
      console.log(error);
      return Promise.reject(`Ошибка: ${res.status} ${error.message}`);
    }
  }

  async getMovies() {
    return await fetch(this._baseUrl, {
      headers: this.headers
    }).then(res => this._checkResponse(res));
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    "Content-Type": "application/json",
  }
});

export default moviesApi;
