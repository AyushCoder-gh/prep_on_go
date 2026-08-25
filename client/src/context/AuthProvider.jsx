import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { getProfile } from "../api/userApi";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      if(!token){
        setLoading(false);
        return ;
      }

      try{
        const profile = await getProfile();
        setUser(profile);
      }catch(error){
        console.error("Failed to restore session", error);

        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      }finally{
        setLoading(false);
      }
    };

    restoreSession();
  }, [token]);

  const login = (userData, userToken) => {
    localStorage.setItem("token", userToken);

    setToken(userToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
  };

  //console.log("Auth State:", { user, token });

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;