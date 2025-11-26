import axios from "axios";
const API_URL = "http://localhost:5000/api/challenges";

class ChallengeService {
    async getAllChallenges() {
        try {
            const response = await axios.get(API_URL, {
                withCredentials: true,
            });
            return response.data;
        } catch (err) {
            console.error("Failed to fetch challenges:", err);
            return [];
        }
    }

    async createChallenge(newData) {
        try {
            const response = await axios.post(API_URL, newData, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });
            return response.data;
        } catch (err) {
            console.error("Failed to create challenge:", err);
            return null;
        }
    }

    async updateChallenge(id, updatedData) {
        try {
            const response = await axios.put(`${API_URL}/${id}`, updatedData, {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            });
            return response.data;
        } catch (err) {
            console.error("Failed to update challenge:", err);
            return null;
        }
    }

    async deleteChallenge(id) {
        try {
            // DELETE-запрос на URL с id
            await axios.delete(`${API_URL}/${id}`, {
                withCredentials: true,
            });
            return true;
        } catch (err) {
            console.error("Failed to delete challenge:", err);
            return false;
        }
    }
}

export default new ChallengeService();