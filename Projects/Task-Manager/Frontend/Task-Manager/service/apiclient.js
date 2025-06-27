import { body } from "express-validator";

class ApiClient {
  constructor() {
    // this.baseURL = "http://127.0.0.1:8000/api/v1";
    this.baseURL = "http://localhost:8000/api/v1";
    this.defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  async customFetch(endpoint, options = {}) {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const headers = { ...this.defaultHeaders, ...options.headers };

      const config = {
        ...options,
        headers,
        credentials: "include",
      };

      console.log(`Fetching ${url}`);

      const response = await fetch(url, config);

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Api Error", error);
      throw error;
    }
  }

  // Auth endpoints

  async signup(username, email, password, fullname) {
    return this.customFetch("/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password, fullname }),
    });
  }

  async login(email, password) {
    return this.customFetch("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async profile() {
    return this.customFetch("/profile", {
      method: "GET",
    });
  }

  async forgot(email) {
    return this.customFetch("/forgot", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }
}

const apiClient = new ApiClient();

export default apiClient;
