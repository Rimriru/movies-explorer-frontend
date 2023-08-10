class MainApi {
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


  async register({ email, name, password }) {
    return await fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: this.headers,
      credentials: "include",
      body: JSON.stringify({
        "email":  email,
        "name": name,
        "password": password,
      }),
    }).then(res => this._checkResponse(res));
  }

  async login({ email, password }) {
    return await fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: this.headers,
      credentials: "include",
      body: JSON.stringify({
        "email":  email,
        "password": password,
      })
    }).then(res => this._checkResponse(res));
  }

  async getUserInfo() {
    return await fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: this.headers,
    }).then(res => this._checkResponse(res));
  }

  async updateUserInfo({ email, password }) {
    return await fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        "email": email,
        "password": password,
      }),
    }).then(res => this._checkResponse(res));
  }

  async getUserMovies() {
    return await fetch(`${this.baseUrl}/movies`, {
      method: "GET",
      headers: this.headers,
    }).then(res => this._checkResponse(res));
  }

  async addUserMovie({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId }) {
    return await fetch(`${this.baseUrl}/movies`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        "country": country,
        "director": director,
        "duration": duration,
        "year": year,
        "description": description,
        "image": image,
        "trailer": trailer,
        "nameRU": nameRU,
        "nameEN": nameEN,
        "thumbnail": thumbnail,
        "movieId": movieId,
      }),
    }).then(res => this._checkResponse(res));
  }

  async removeUserMovie(movieId) {
    return await fetch(`${this.baseUrl}/movies/${movieId}`, {
      method: "DELETE",
      headers: this.headers,
    }).then(res => this._checkResponse(res));
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://movies.explorer.api.nomoredomains.xyz',
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;
