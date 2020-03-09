import { API_URL } from "../App.constants";
const http = require("axios").default;

class Api {
  private static instance: Api;

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }

  login(username: string, password: string) {
    return http.post(API_URL + "/login", {
      user: username,
      password: password
    });
  }

  getWelcomeMessage() {
    return http.get(API_URL + "/getWelcomeMessage", {
      headers: this.headers
    });
  }

  sendMessage(message: string) {
    return http.post(
      API_URL + "/sendMessage",
      { text: message },
      { headers: this.headers }
    );
  }

  get headers() {
    return {
      Authorization: "Bearer " + sessionStorage.sessionId
    };
  }
}
export default Api.Instance;
