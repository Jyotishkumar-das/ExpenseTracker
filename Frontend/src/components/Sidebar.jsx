import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Sidebar = () => {
    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        const confirmLogout = window.confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) {
            return;
        }

        logout();

        navigate("/login");
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* ================= MOBILE MENU BUTTON ================= */}

            <button
                className="mobile-menu-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Open menu"
            >
                {isOpen ? "✕" : "☰"}
            </button>

            {/* ================= OVERLAY ================= */}

            {isOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={closeSidebar}
                ></div>
            )}

            {/* ================= SIDEBAR ================= */}

            <aside
                className={
                    isOpen
                        ? "sidebar sidebar-open"
                        : "sidebar"
                }
            >

                {/* LOGO */}

                <div className="sidebar-logo">
                    💰 Expense Tracker
                </div>

                {/* USER */}

                <div className="sidebar-user">

                    <div className="sidebar-user-icon">
                        👤
                    </div>

                    <div>
                        <h4>
                            {user?.name || "User"}
                        </h4>

                        <p>
                            {user?.email || ""}
                        </p>
                    </div>

                </div>

                {/* NAVIGATION */}

                <nav className="sidebar-nav">

                    <NavLink
                        to="/dashboard"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-link active"
                                : "sidebar-link"
                        }
                    >
                        📊 Dashboard
                    </NavLink>

                    <NavLink
                        to="/profile"
                        onClick={closeSidebar}
                        className={({ isActive }) =>
                            isActive
                                ? "sidebar-link active"
                                : "sidebar-link"
                        }
                    >
                        👤 Profile
                    </NavLink>

                </nav>

                {/* LOGOUT */}

                <div className="sidebar-bottom">

                    <button
                        className="sidebar-logout"
                        onClick={handleLogout}
                    >
                        🚪 Logout
                    </button>

                </div>

            </aside>
        </>
    );
};

export default Sidebar;