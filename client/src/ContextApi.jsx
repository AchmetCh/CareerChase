import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("Authorization");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);
    }
  }, []);
  useEffect(() => {
    setToken(localStorage.getItem('Authorization'))
  }, [])
  return (
    <AuthContext.Provider value={{ userId, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);