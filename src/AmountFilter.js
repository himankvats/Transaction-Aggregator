import React, { useState } from 'react';
import './AmountFilter.css';

const AmountFilter = ({ onAmountFilterChange }) => {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

  const handleFromAmountChange = (e) => {
    setFromAmount(e.target.value);
    onAmountFilterChange(e.target.value, toAmount);
  };

  const handleToAmountChange = (e) => {
    setToAmount(e.target.value);
    onAmountFilterChange(fromAmount, e.target.value);
  };

  return (
    <div className="filter-item amount-filter">
      <div className="amount-filter-title">Filter By Amount</div>
      <label htmlFor="from-amount">Minimum Amount:</label>
      <div className="input-container">
        <span className="currency-symbol">$</span>
        <input
          type="number"
          id="from-amount"
          value={fromAmount}
          onChange={handleFromAmountChange}
        />
      </div>
      <label htmlFor="to-amount">Maximum Amount:</label>
      <div className="input-container">
        <span className="currency-symbol">$</span>
        <input
          type="number"
          id="to-amount"
          value={toAmount}
          onChange={handleToAmountChange}
        />
      </div>
    </div>
  );
};

export default AmountFilter;
