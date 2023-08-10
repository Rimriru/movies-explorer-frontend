class MainApi {
  constructor({ baseUrl, headers }) {
    this.baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) {
    try {
      if (res.ok) {
        return res.json().then(data => data);
      }
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
}

export const mainApi = new MainApi({
  baseUrl: 'https://movies.explorer.api.nomoredomains.xyz',
  headers: {
    "Content-Type": "application/json",
  },
});
