import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [refreshToken, setRefreshToken] = useState(
        localStorage.getItem("refreshToken")
    );
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        if (token) {
            try {
                const decoded = jwtDecode(token);
                if (decoded.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    setUser(decoded);
                }
            } catch (error) {
                console.error("Invalid token: ", error);
                logout();
            }
        } else {
            setUser(null);
        }
        setIsLoading(false);
    }, [token]);

    const login = ({ token, refreshToken }) => {
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);
        setToken(token);
        setRefreshToken(refreshToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        setToken(null);
        setRefreshToken(null);
        setUser(null);
    };

    const isAuthenticated = () => {
        return !!user && !!token;
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                refreshToken,
                user,
                login,
                logout,
                isLoading,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider.");
    }
    return context;
};

export default useAuth;
