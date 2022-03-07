const BASE_URL = 'http://127.0.0.1:8000';
const USER_API_URL = `${BASE_URL}/api/users`;

export class API {
  static getUsers() {
    return fetch(`${USER_API_URL}/`, {
      method: 'GET',
    }).then(resp => resp.json());
  }
  static createUser(body) {
    return fetch(`${USER_API_URL}/`, {
      method: 'POST',
      body: JSON.stringify(body),
    }).then(resp => resp.json());
  }
  static deleteUser(id) {
    return fetch(`${USER_API_URL}/${id}/`, {
      method: 'DELETE',
    });
  }
}
