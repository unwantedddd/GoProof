import axios from "axios";

class AuthService {
    async register(registerData) {
        try {
            const result = await axios.post(
                "http://localhost:5000/api/auth/signup",
                registerData,
                {
                    withCredentials: true,
                }
            );
            return result.data;
        } catch (error) {
            if (error.response) {
                throw new Error(
                    error.response.data.message || "Register failed"
                );
            }
        }
    }

    async login(loginData) {
        try {
            const result = await axios.post(
                "http://localhost:5000/api/auth/login",
                loginData,
                {
                    withCredentials: true,
                }
            );
            return result.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || "Login failed");
            }
        }
    }

    async getMe() {
        try {
            const result = await axios.get(
                "http://localhost:5000/api/auth/me",
                {
                    withCredentials: true,
                }
            );
            return result.data;
        } catch (error) {
            if (error.response) {
                throw new Error(
                    error.response.data.message || "Failed to fetch user data"
                );
            }
        }
    }

    async logout() {
        try {
            const result = await axios.post(
                "http://localhost:5000/api/auth/logout",
                {},
                {
                    withCredentials: true,
                }
            );
            return result.data;
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.message || "Logout failed");
            }
        }
    }
}

export default new AuthService();