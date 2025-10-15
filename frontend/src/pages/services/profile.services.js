import axios from "axios";

class ProfileService {
    async updateUser(newData) {
        try {
            await axios.put(
                "http://localhost:5000/api/profile/update",
                newData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/json" },
                }
            );

            return true;
        } catch (err) {
            console.error("Update user failed:", err);
            return false;
        }
    };

    async changePassword(passwordData) {
        try {
            await axios.put(
                "http://localhost:5000/api/profile/change-password",
                passwordData,
                { withCredentials: true }
            );

            return true;
        } catch (err) {
            console.error("Change password failed:", err);
            return false;
        }
    };
}

export default new ProfileService();