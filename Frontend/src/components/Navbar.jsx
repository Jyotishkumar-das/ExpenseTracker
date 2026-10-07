import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div className="navbar-logo">
                <Link to="/dashboard">
                    💰 Expense Tracker
                </Link>
            </div>

            <div className="navbar-links">

                <Link to="/dashboard">
                    Dashboard
                </Link>

                <Link to="/profile">
                    Profile
                </Link>

                <span className="navbar-user">
                    Hi, {user?.name}
                </span>

                <button
                    className="navbar-logout"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
};

export default Navbar;