import { useState } from "react";
import {
    Link,
    useLocation,
    useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { login, loading } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    // ================= HANDLE CHANGE =================

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setError("");
    };

    // ================= SUBMIT =================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        const { email, password } = formData;

        // Check empty fields
        if (!email || !password) {
            setError(
                "Email and password are required"
            );
            return;
        }

        try {
            // Login user
            await login(email, password);

            // If user tried to access a protected
            // page, redirect them there.
            // Otherwise go to dashboard.

            const redirectPath =
                location.state?.from ||
                "/dashboard";

            navigate(redirectPath, {
                replace: true,
            });

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Login failed. Please try again."
            );
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                {/* ================= LOGO ================= */}

                <div className="auth-logo">
                    💰
                </div>

                {/* ================= HEADER ================= */}

                <div className="auth-header">

                    <h1>
                        Welcome Back
                    </h1>

                    <p>
                        Login to manage your expenses
                    </p>

                </div>

                {/* ================= ERROR ================= */}

                {error && (
                    <div className="auth-error">
                        ⚠️ {error}
                    </div>
                )}

                {/* ================= FORM ================= */}

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    {/* EMAIL */}

                    <div className="auth-form-group">

                        <label>
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    {/* PASSWORD */}

                    <div className="auth-form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    {/* LOGIN BUTTON */}

                    <button
                        type="submit"
                        className="auth-submit-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>

                {/* ================= REGISTER ================= */}

                <div className="auth-footer">

                    <p>
                        Don't have an account?
                    </p>

                    <Link to="/register">
                        Create an account
                    </Link>

                </div>

                {/* ================= HOME ================= */}

                <Link
                    to="/"
                    className="auth-home-link"
                >
                    ← Back to Home
                </Link>

            </div>

        </div>
    );
};

export default Login;