import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="not-found-page">

            <div className="not-found-card">

                <div className="not-found-icon">
                    🔎
                </div>

                <h1>
                    404
                </h1>

                <h2>
                    Page Not Found
                </h2>

                <p>
                    Sorry, the page you are looking for
                    does not exist or may have been moved.
                </p>

                <div className="not-found-buttons">

                    <Link
                        to="/"
                        className="not-found-home-btn"
                    >
                        ← Back to Home
                    </Link>

                    <Link
                        to="/login"
                        className="not-found-login-btn"
                    >
                        Login
                    </Link>

                </div>

            </div>

        </div>
    );
};

export default NotFound;