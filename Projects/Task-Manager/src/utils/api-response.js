class ApiResponse {
    constructor(statusCode, data, message = "Success", success){
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400 || true
    }
}

export {ApiResponse}