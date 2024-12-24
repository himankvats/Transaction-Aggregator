import React, { useState } from 'react';
import './Filter.css';

const DateFilter = ({ onDateFilterChange }) => {
  const [selectedRange, setSelectedRange] = useState('all');
  const [customDate, setCustomDate] = useState({ from: '', to: '' });

  const handleRangeChange = (e) => {
    const range = e.target.value;
    setSelectedRange(range);
    onDateFilterChange(range, customDate);
  };

  const handleCustomDateChange = (e) => {
    const { name, value } = e.target;
    setCustomDate((prev) => ({ ...prev, [name]: value }));
    onDateFilterChange(selectedRange, { ...customDate, [name]: value });
  };

  return (
    <div className="filter-item">
      <label className="filter-label">
        <span className="filter-icon">📅</span> Date Filter:
      </label>
      <select className="filter-input" value={selectedRange} onChange={handleRangeChange}>
        <option value="all">All</option>
        <option value="7">Last 7 days</option>
        <option value="30">Last 30 days</option>
        <option value="60">Last 60 days</option>
        <option value="90">Last 90 days</option>
        <option value="custom">Custom Date</option>
      </select>
      {selectedRange === 'custom' && (
        <div className="custom-date-inputs">
          <label>
            From:
            <input type="date" name="from" value={customDate.from} onChange={handleCustomDateChange} />
          </label>
          <label>
            To:
            <input type="date" name="to" value={customDate.to} onChange={handleCustomDateChange} />
          </label>
        </div>
      )}
    </div>
  );
};

export default DateFilter;
