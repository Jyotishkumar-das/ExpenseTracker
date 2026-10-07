import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import api from "../services/api";

import Sidebar from "../components/Sidebar";

const Profile = () => {
    const { user, updateUser } = useAuth();

    // ================= PROFILE STATE =================

    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // ================= PASSWORD STATE =================

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [passwordLoading, setPasswordLoading] =
        useState(false);

    const [passwordMessage, setPasswordMessage] =
        useState("");

    const [passwordError, setPasswordError] =
        useState("");

    // ================= GET PROFILE =================

    const getProfile = async () => {
        try {
            setLoading(true);

            const response = await api.get(
                "/user/profile"
            );

            setFormData({
                name: response.data.user.name,
                email: response.data.user.email,
            });
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to load profile"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    // ================= PROFILE CHANGE =================

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        setMessage("");
        setError("");
    };

    // ================= UPDATE PROFILE =================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!formData.name || !formData.email) {
            setError(
                "Name and email are required"
            );
            return;
        }

        try {
            setSaving(true);

            const response = await api.put(
                "/user/profile",
                {
                    name: formData.name,
                    email: formData.email,
                }
            );

            setMessage(
                response.data.message
            );

            updateUser(response.data.user);
        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to update profile"
            );
        } finally {
            setSaving(false);
        }
    };

    // ================= PASSWORD CHANGE =================

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value,
        });

        setPasswordMessage("");
        setPasswordError("");
    };

    // ================= CHANGE PASSWORD =================

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        setPasswordMessage("");
        setPasswordError("");

        const {
            currentPassword,
            newPassword,
            confirmPassword,
        } = passwordData;

        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {
            setPasswordError(
                "All password fields are required"
            );
            return;
        }

        if (newPassword.length < 6) {
            setPasswordError(
                "New password must be at least 6 characters"
            );
            return;
        }

        if (
            newPassword !== confirmPassword
        ) {
            setPasswordError(
                "New password and confirm password do not match"
            );
            return;
        }

        try {
            setPasswordLoading(true);

            const response = await api.put(
                "/user/change-password",
                {
                    currentPassword,
                    newPassword,
                }
            );

            setPasswordMessage(
                response.data.message
            );

            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
            console.error(error);

            setPasswordError(
                error.response?.data?.message ||
                "Failed to change password"
            );
        } finally {
            setPasswordLoading(false);
        }
    };

    // ================= LOADING =================

    if (loading) {
        return (
            <div className="profile-layout">

                <Sidebar />

                <main className="profile-main">
                    <div className="profile-loading">
                        Loading Profile...
                    </div>
                </main>

            </div>
        );
    }

    // ================= UI =================

    return (
        <div className="profile-layout">

            {/* SIDEBAR */}

            <Sidebar />

            {/* MAIN */}

            <main className="profile-main">

                <div className="profile-content">

                    {/* HEADER */}

                    <div className="profile-header">
                        <h1>My Profile</h1>

                        <p>
                            Manage your account
                            information and password.
                        </p>
                    </div>

                    {/* PROFILE CARD */}

                    <div className="profile-card">

                        <h2>Personal Information</h2>

                        {message && (
                            <p className="success-message">
                                {message}
                            </p>
                        )}

                        {error && (
                            <p className="error-message">
                                {error}
                            </p>
                        )}

                        <form
                            className="profile-form"
                            onSubmit={handleSubmit}
                        >

                            <label>
                                Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={
                                    formData.name
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter your name"
                                required
                            />

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={
                                    formData.email
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Enter your email"
                                required
                            />

                            <button
                                type="submit"
                                className="update-profile-btn"
                                disabled={saving}
                            >
                                {saving
                                    ? "Updating..."
                                    : "Update Profile"}
                            </button>

                        </form>

                    </div>

                    {/* PASSWORD CARD */}

                    <div className="profile-card password-card">

                        <h2>Change Password</h2>

                        {passwordMessage && (
                            <p className="success-message">
                                {passwordMessage}
                            </p>
                        )}

                        {passwordError && (
                            <p className="error-message">
                                {passwordError}
                            </p>
                        )}

                        <form
                            className="profile-form"
                            onSubmit={
                                handlePasswordSubmit
                            }
                        >

                            <label>
                                Current Password
                            </label>

                            <input
                                type="password"
                                name="currentPassword"
                                value={
                                    passwordData.currentPassword
                                }
                                onChange={
                                    handlePasswordChange
                                }
                                placeholder="Enter current password"
                                required
                            />

                            <label>
                                New Password
                            </label>

                            <input
                                type="password"
                                name="newPassword"
                                value={
                                    passwordData.newPassword
                                }
                                onChange={
                                    handlePasswordChange
                                }
                                placeholder="Enter new password"
                                minLength="6"
                                required
                            />

                            <label>
                                Confirm New Password
                            </label>

                            <input
                                type="password"
                                name="confirmPassword"
                                value={
                                    passwordData.confirmPassword
                                }
                                onChange={
                                    handlePasswordChange
                                }
                                placeholder="Confirm new password"
                                minLength="6"
                                required
                            />

                            <button
                                type="submit"
                                className="update-profile-btn"
                                disabled={
                                    passwordLoading
                                }
                            >
                                {passwordLoading
                                    ? "Changing..."
                                    : "Change Password"}
                            </button>

                        </form>

                    </div>

                    <Link
                        to="/dashboard"
                        className="back-dashboard-btn"
                    >
                        ← Back to Dashboard
                    </Link>

                </div>

            </main>

        </div>
    );
};

export default Profile;