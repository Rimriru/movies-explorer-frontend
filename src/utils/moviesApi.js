class MoviesApi {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
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
    return await fetch(this.baseUrl, {
      method: "GET",
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
