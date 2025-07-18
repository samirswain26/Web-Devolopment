class ApiClient{
    constructor(){
        this.baseURL = "http://localhost:3000/api/v1";
        this.defaultHeaders = {
            "Content-Type" : "application/json",
            "Accept" : "application/json",
        }
    }

    async customFetch(endpoint, options = {}){
        try {
            const url = `${this.baseURL}${endpoint}`
            const headers = {...this.defaultHeaders, ...options.headers}


            const config = {
                ...options,
                headers,
                Credential : "include"
            }

            console.log(`Fetching ${url}`);

            const response = await fetch(url, config)

            const data = await response.json()

            return data

        } catch (error) {
            console.error("Api Error", error);
            throw error
        }
    }

    // Auth endpoints

    async signup(name, email, password){
        return this.customFetch("/users/register", {
            method : "POST",
            body : JSON.stringify({name, email, password})
        })
    }
    async login(email, password){
        return this.customFetch("/users/login", {
            method : "POST",
            body : JSON.stringify({email, password})
        })
    }

}


const apiClient = new ApiClient

export default apiClient