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

  async verifyEmail() {
    return this.customFetch("/verify", {
      method: "POST",
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

  async resetPassword(token, password, confPassword) {
    const endpoint = `/reset/${token}`;
    console.log("Reset password endpoint:", endpoint);
    console.log("Full URL will be:", `${this.baseURL}${endpoint}`);
    return this.customFetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ password, confPassword }),
    });
  }

  async logout() {
    return this.customFetch("/logout", {
      method: "POST",
    });
  }

  // Project endpoints

  async createProject(Name, description) {
    return this.customFetch("/create-project", {
      method: "POST",
      body: JSON.stringify({ Name, description }),
    });
  }

  async myProjects() {
    return this.customFetch("/get-project-By-Id", {
      method: "POST",
    });
  }

  async allProjects() {
    return this.customFetch("/get-project", {
      method: "POST",
    });
  }

  async requestToJoinProject(Name) {
    return this.customFetch("/request-project", {
      method: "POST",
      body: JSON.stringify({ Name }),
    });
  }

  async deleteProject(Name) {
    console.log("Data delete mein hai ab:", Name);
    return this.customFetch("/delete-project", {
      method: "POST",
      body: JSON.stringify({ Name }),
    });
  }
}

const apiClient = new ApiClient();

export default apiClient;
