import React, { useState, useEffect, useMemo } from 'react';
import './CategoryFilter.css';

const CategoryFilter = ({ transactions, onCategoryFilterChange }) => {
  const uniqueCategories = useMemo(() => [...new Set(transactions.map((t) => t.category))], [transactions]);
  const [selectedCategories, setSelectedCategories] = useState(uniqueCategories);

  useEffect(() => {
    setSelectedCategories(uniqueCategories);
    onCategoryFilterChange(uniqueCategories);
  }, [uniqueCategories, onCategoryFilterChange]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCategories(uniqueCategories);
      onCategoryFilterChange(uniqueCategories);
    } else {
      setSelectedCategories([]);
      onCategoryFilterChange([]);
    }
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    let updatedSelectedCategories = [...selectedCategories];

    if (checked) {
      updatedSelectedCategories.push(value);
    } else {
      updatedSelectedCategories = updatedSelectedCategories.filter((category) => category !== value);
    }

    setSelectedCategories(updatedSelectedCategories);
    onCategoryFilterChange(updatedSelectedCategories);
  };

  return (
    <div className="filter-item">
      <label className="filter-label">
        <span className="filter-icon">📂</span> Category:
      </label>
      <div className="category-filter">
        <label className="all tooltip">
          <input
            type="checkbox"
            value="All"
            checked={selectedCategories.length === uniqueCategories.length}
            onChange={handleSelectAll}
          />
          All
          <span className="tooltip-text">Select All Categories</span>
        </label>
        {uniqueCategories.map((category, index) => (
          <label key={index} className="tooltip">
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={handleCategoryChange}
            />
            {category}
            <span className="tooltip-text">{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
