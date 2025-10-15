import { AuthContext } from "../context/AuthContext.js";
import { useContext } from "react";

export const useUser = () => {
    return useContext(AuthContext);
};