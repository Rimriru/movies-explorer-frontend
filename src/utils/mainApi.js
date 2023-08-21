class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    try {
      return res.json().then((data) => data);
    } catch (error) {
      console.log(error);
      return Promise.reject(`Ошибка: ${res.status} ${error.message}`);
    }
  }

  async register({ email, name, password }) {
    return await fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        email: email,
        name: name,
        password: password,
      }),
    }).then((res) => this._checkResponse(res));
  }

  async login({ email, password }) {
    return await fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((res) => this._checkResponse(res));
  }

  async logout() {
    return await fetch(`${this._baseUrl}/signout`, {
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._checkResponse(res));
  }

  async getUserInfo() {
    return await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._checkResponse(res));
  }

  async updateUserInfo({ email, name }) {
    return await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        email: email,
        name: name
      }),
    }).then((res) => this._checkResponse(res));
  }

  async getUserMovies() {
    return await fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._checkResponse(res));
  }


  async addUserMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  }) {
    return await fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail,
        movieId,
      }),
    }).then((res) => this._checkResponse(res));
  }

  async removeUserMovie(movieId) {
    return await fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._checkResponse(res));
  }
}

// https://movies.explorer.api.nomoredomains.xyz

const mainApi = new MainApi({
  baseUrl: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
