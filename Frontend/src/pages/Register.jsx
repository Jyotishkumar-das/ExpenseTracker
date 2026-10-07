import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const Register = () => {
    const navigate = useNavigate();

    const { register, loading } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        const {
            name,
            email,
            password,
            confirmPassword,
        } = formData;

        if (
            !name ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            setError("All fields are required");
            return;
        }

        if (password.length < 6) {
            setError(
                "Password must be at least 6 characters"
            );
            return;
        }

        if (password !== confirmPassword) {
            setError(
                "Password and confirm password do not match"
            );
            return;
        }

        try {
            await register(
                name,
                email,
                password
            );

            navigate("/dashboard");
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                    "Registration failed. Please try again."
            );
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                {/* LOGO */}

                <div className="auth-logo">
                    💰
                </div>

                {/* HEADER */}

                <div className="auth-header">

                    <h1>
                        Create Account
                    </h1>

                    <p>
                        Start managing your money today
                    </p>

                </div>

                {/* ERROR */}

                {error && (
                    <div className="auth-error">
                        ⚠️ {error}
                    </div>
                )}

                {/* FORM */}

                <form
                    className="auth-form"
                    onSubmit={handleSubmit}
                >

                    {/* NAME */}

                    <div className="auth-form-group">

                        <label>
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                    </div>

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
                            placeholder="Minimum 6 characters"
                            value={formData.password}
                            onChange={handleChange}
                            minLength="6"
                            required
                        />

                    </div>

                    {/* CONFIRM PASSWORD */}

                    <div className="auth-form-group">

                        <label>
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={
                                formData.confirmPassword
                            }
                            onChange={handleChange}
                            minLength="6"
                            required
                        />

                    </div>

                    {/* BUTTON */}

                    <button
                        type="submit"
                        className="auth-submit-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>

                </form>

                {/* LOGIN */}

                <div className="auth-footer">

                    <p>
                        Already have an account?
                    </p>

                    <Link to="/login">
                        Login here
                    </Link>

                </div>

                {/* HOME */}

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

export default Register;