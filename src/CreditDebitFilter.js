import React from 'react';
import './Filter.css';

const CreditDebitFilter = ({ onCreditDebitFilterChange }) => {
  const handleChange = (e) => {
    onCreditDebitFilterChange(e.target.value);
  };

  return (
    <div className="filter-item">
      <label className="filter-label">
        <span className="filter-icon">💳</span> Credit/Debit:
      </label>
      <select className="filter-input" id="credit-debit-filter" onChange={handleChange}>
        <option value="All">All</option>
        <option value="Credit">Credit</option>
        <option value="Debit">Debit</option>
      </select>
    </div>
  );
};

export default CreditDebitFilter;
