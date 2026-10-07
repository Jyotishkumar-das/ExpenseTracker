import {
    createContext,
    useContext,
    useState,
} from "react";

import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    // ================= USER =================

    const [user, setUser] = useState(() => {
        const savedUser =
            localStorage.getItem("user");

        try {
            return savedUser
                ? JSON.parse(savedUser)
                : null;
        } catch (error) {
            console.error(
                "Invalid user data in localStorage",
                error
            );

            localStorage.removeItem("user");

            return null;
        }
    });

    // ================= LOADING =================

    const [loading, setLoading] =
        useState(false);

    // ================= REGISTER =================

    const register = async (
        name,
        email,
        password
    ) => {
        try {
            setLoading(true);

            const response = await api.post(
                "/auth/register",
                {
                    name,
                    email,
                    password,
                }
            );

            const {
                token,
                user,
            } = response.data;

            // Save token
            localStorage.setItem(
                "token",
                token
            );

            // Save user
            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            // Update React state
            setUser(user);

            return response.data;

        } finally {
            setLoading(false);
        }
    };

    // ================= LOGIN =================

    const login = async (
        email,
        password
    ) => {
        try {
            setLoading(true);

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password,
                }
            );

            const {
                token,
                user,
            } = response.data;

            // Save token
            localStorage.setItem(
                "token",
                token
            );

            // Save user
            localStorage.setItem(
                "user",
                JSON.stringify(user)
            );

            // Update React state
            setUser(user);

            return response.data;

        } finally {
            setLoading(false);
        }
    };

    // ================= UPDATE USER =================

    const updateUser = (updatedUser) => {

        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );

        setUser(updatedUser);
    };

    // ================= LOGOUT =================

    const logout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setUser(null);
    };

    // ================= PROVIDER =================

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                register,
                login,
                updateUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// ================= CUSTOM HOOK =================

export const useAuth = () => {
    return useContext(AuthContext);
};