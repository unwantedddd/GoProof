import React, { useCallback, useEffect, useState } from "react";
import { AuthContext } from "@/context/authContext.js";
import authService from "@/pages/services/auth.services.js";

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const userData = await authService.getMe();
      setIsLoading(false);
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      setIsLoading(false);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        refetch: fetchUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;