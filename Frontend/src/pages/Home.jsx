import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="home-page">

            {/* ================= NAVBAR ================= */}

            <nav className="home-navbar">

                <div className="home-logo">
                    💰 Expense Tracker
                </div>

                <div className="home-nav-links">

                    <Link to="/login">
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="home-register-btn"
                    >
                        Get Started
                    </Link>

                </div>

            </nav>

            {/* ================= HERO ================= */}

            <section className="hero-section">

                <div className="hero-content">

                    <div className="hero-text">

                        <span className="hero-badge">
                            💰 Smart Financial Management
                        </span>

                        <h1>
                            Take Control of
                            <span>
                                {" "}Your Money
                            </span>
                        </h1>

                        <p>
                            Track your income, manage your
                            expenses, and understand your
                            financial habits with a simple
                            and powerful expense tracker.
                        </p>

                        <div className="hero-buttons">

                            <Link
                                to="/register"
                                className="hero-primary-btn"
                            >
                                Get Started →
                            </Link>

                            <Link
                                to="/login"
                                className="hero-secondary-btn"
                            >
                                Login
                            </Link>

                        </div>

                    </div>

                    {/* ================= HERO CARD ================= */}

                    <div className="hero-dashboard-card">

                        <div className="hero-card-header">

                            <div>
                                <p>
                                    Total Balance
                                </p>

                                <h2>
                                    ₹24,500
                                </h2>
                            </div>

                            <div className="hero-card-icon">
                                💰
                            </div>

                        </div>

                        <div className="hero-card-stats">

                            <div className="hero-stat income-stat">

                                <span>
                                    Income
                                </span>

                                <strong>
                                    +₹25,000
                                </strong>

                            </div>

                            <div className="hero-stat expense-stat">

                                <span>
                                    Expense
                                </span>

                                <strong>
                                    -₹500
                                </strong>

                            </div>

                        </div>

                        <div className="hero-chart">

                            <div className="chart-bar bar-1"></div>
                            <div className="chart-bar bar-2"></div>
                            <div className="chart-bar bar-3"></div>
                            <div className="chart-bar bar-4"></div>
                            <div className="chart-bar bar-5"></div>
                            <div className="chart-bar bar-6"></div>
                            <div className="chart-bar bar-7"></div>

                        </div>

                    </div>

                </div>

            </section>

            {/* ================= FEATURES ================= */}

            <section className="features-section">

                <div className="section-header">

                    <span>
                        FEATURES
                    </span>

                    <h2>
                        Everything You Need
                        <br />
                        to Manage Your Money
                    </h2>

                    <p>
                        Simple tools to help you understand
                        and control your financial life.
                    </p>

                </div>

                <div className="features-grid">

                    {/* FEATURE 1 */}

                    <div className="feature-card">

                        <div className="feature-icon">
                            📊
                        </div>

                        <h3>
                            Financial Dashboard
                        </h3>

                        <p>
                            View your income, expenses,
                            balance, and transaction count
                            from one dashboard.
                        </p>

                    </div>

                    {/* FEATURE 2 */}

                    <div className="feature-card">

                        <div className="feature-icon">
                            💸
                        </div>

                        <h3>
                            Track Expenses
                        </h3>

                        <p>
                            Easily record your daily
                            expenses and keep your spending
                            organized.
                        </p>

                    </div>

                    {/* FEATURE 3 */}

                    <div className="feature-card">

                        <div className="feature-icon">
                            📈
                        </div>

                        <h3>
                            Visual Analytics
                        </h3>

                        <p>
                            Understand your financial
                            activity using useful charts
                            and category analysis.
                        </p>

                    </div>

                    {/* FEATURE 4 */}

                    <div className="feature-card">

                        <div className="feature-icon">
                            🔎
                        </div>

                        <h3>
                            Search & Filter
                        </h3>

                        <p>
                            Quickly find transactions using
                            search, category, type, and
                            date filters.
                        </p>

                    </div>

                    {/* FEATURE 5 */}

                    <div className="feature-card">

                        <div className="feature-icon">
                            🔐
                        </div>

                        <h3>
                            Secure Account
                        </h3>

                        <p>
                            Your account is protected with
                            authentication and password
                            security.
                        </p>

                    </div>

                    {/* FEATURE 6 */}

                    <div className="feature-card">

                        <div className="feature-icon">
                            📱
                        </div>

                        <h3>
                            Responsive Design
                        </h3>

                        <p>
                            Use the expense tracker smoothly
                            on desktop, tablet, and mobile.
                        </p>

                    </div>

                </div>

            </section>

            {/* ================= CTA ================= */}

            <section className="cta-section">

                <div className="cta-content">

                    <h2>
                        Start Managing Your Money Today
                    </h2>

                    <p>
                        Create your free account and take
                        control of your finances.
                    </p>

                    <Link
                        to="/register"
                        className="cta-button"
                    >
                        Create Free Account →
                    </Link>

                </div>

            </section>

            {/* ================= FOOTER ================= */}

            <footer className="home-footer">

                <div>
                    © 2026 Expense Tracker
                </div>

                <div>
                    Built with React, Node.js,
                    Express & MongoDB
                </div>

            </footer>

        </div>
    );
};

export default Home;