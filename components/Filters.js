'use client';

import { FaFilter, FaUndo } from 'react-icons/fa';

export default function Filters({ filters, setFilters, categories, onReset }) {
  function handleChange(event) {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <section className="card filter-section">
      <div className="toolbar">
        <h2 className="section-title">
          <FaFilter /> Filters
        </h2>
        <button className="button button-secondary" type="button" onClick={onReset}>
          <FaUndo /> Reset
        </button>
      </div>

      <div className="filter-grid">
        <div className="field">
          <label htmlFor="filter-type">Type</label>
          <select
            id="filter-type"
            name="type"
            value={filters.type}
            onChange={handleChange}
          >
            <option value="All">All</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="filter-category">Category</label>
          <select
            id="filter-category"
            name="category"
            value={filters.category}
            onChange={handleChange}
          >
            <option value="All">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            value={filters.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="field">
          <label htmlFor="endDate">End Date</label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            value={filters.endDate}
            onChange={handleChange}
          />
        </div>
      </div>
    </section>
  );
}