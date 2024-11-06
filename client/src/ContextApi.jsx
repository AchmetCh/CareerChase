import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('Authorization'));

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserId(decodedToken.userId);
        } else {
            setUserId(null); // Reset userId if token is not present
        }
    }, [token]);

    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('Authorization', newToken);
    };

    const logout = () => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem('Authorization');
    };

    return (
        <AuthContext.Provider value={{ userId, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);