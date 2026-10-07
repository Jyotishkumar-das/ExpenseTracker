import { useState } from "react";

const TransactionFilters = ({ onFilter }) => {
    const [filters, setFilters] = useState({
        search: "",
        type: "",
        category: "",
        startDate: "",
        endDate: "",
    });

    // ================= HANDLE CHANGE =================

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    // ================= SEARCH =================

    const handleSubmit = (e) => {
        e.preventDefault();

        onFilter(filters);
    };

    // ================= RESET =================

    const handleReset = () => {
        const emptyFilters = {
            search: "",
            type: "",
            category: "",
            startDate: "",
            endDate: "",
        };

        setFilters(emptyFilters);

        onFilter(emptyFilters);
    };

    return (
        <div className="filter-card">

            {/* HEADER */}

            <div className="filter-header">

                <div>
                    <h2>
                        Search & Filter
                    </h2>

                    <p>
                        Find transactions quickly
                    </p>
                </div>

                <div className="filter-icon">
                    🔎
                </div>

            </div>

            {/* FORM */}

            <form
                className="filter-form"
                onSubmit={handleSubmit}
            >

                {/* SEARCH */}

                <div className="filter-group search-group">

                    <label>
                        Search
                    </label>

                    <input
                        type="text"
                        name="search"
                        placeholder="Search category or description"
                        value={filters.search}
                        onChange={handleChange}
                    />

                </div>

                {/* TYPE */}

                <div className="filter-group">

                    <label>
                        Type
                    </label>

                    <select
                        name="type"
                        value={filters.type}
                        onChange={handleChange}
                    >
                        <option value="">
                            All Types
                        </option>

                        <option value="income">
                            Income
                        </option>

                        <option value="expense">
                            Expense
                        </option>

                    </select>

                </div>

                {/* CATEGORY */}

                <div className="filter-group">

                    <label>
                        Category
                    </label>

                    <input
                        type="text"
                        name="category"
                        placeholder="e.g. Food"
                        value={filters.category}
                        onChange={handleChange}
                    />

                </div>

                {/* START DATE */}

                <div className="filter-group">

                    <label>
                        From Date
                    </label>

                    <input
                        type="date"
                        name="startDate"
                        value={filters.startDate}
                        onChange={handleChange}
                    />

                </div>

                {/* END DATE */}

                <div className="filter-group">

                    <label>
                        To Date
                    </label>

                    <input
                        type="date"
                        name="endDate"
                        value={filters.endDate}
                        onChange={handleChange}
                    />

                </div>

                {/* BUTTONS */}

                <div className="filter-buttons">

                    <button
                        type="submit"
                        className="filter-search-btn"
                    >
                        🔎 Search
                    </button>

                    <button
                        type="button"
                        className="filter-reset-btn"
                        onClick={handleReset}
                    >
                        ↻ Reset
                    </button>

                </div>

            </form>

        </div>
    );
};

export default TransactionFilters;