import React, { useState, useEffect, useMemo } from 'react';
import './CardNameFilter.css';

const CardNameFilter = ({ transactions, onCardNameFilterChange }) => {
  const uniqueCardNames = useMemo(() => [...new Set(transactions.map((t) => t.cardName))], [transactions]);
  const [selectedCardNames, setSelectedCardNames] = useState(uniqueCardNames);

  useEffect(() => {
    setSelectedCardNames(uniqueCardNames);
    onCardNameFilterChange(uniqueCardNames);
  }, [uniqueCardNames, onCardNameFilterChange]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCardNames(uniqueCardNames);
      onCardNameFilterChange(uniqueCardNames);
    } else {
      setSelectedCardNames([]);
      onCardNameFilterChange([]);
    }
  };

  const handleCardNameChange = (e) => {
    const { value, checked } = e.target;
    let updatedSelectedCardNames = [...selectedCardNames];

    if (checked) {
      updatedSelectedCardNames.push(value);
    } else {
      updatedSelectedCardNames = updatedSelectedCardNames.filter((cardName) => cardName !== value);
    }

    setSelectedCardNames(updatedSelectedCardNames);
    onCardNameFilterChange(updatedSelectedCardNames);
  };

  return (
    <div className="filter-item">
      <label className="filter-label">
        <span className="filter-icon">💳</span> Card Name:
      </label>
      <div className="card-name-filter">
        <label className="all tooltip">
          <input
            type="checkbox"
            value="All"
            checked={selectedCardNames.length === uniqueCardNames.length}
            onChange={handleSelectAll}
          />
          All
          <span className="tooltip-text">Select All Cards</span>
        </label>
        {uniqueCardNames.map((cardName, index) => (
          <label key={index} className="tooltip">
            <input
              type="checkbox"
              value={cardName}
              checked={selectedCardNames.includes(cardName)}
              onChange={handleCardNameChange}
            />
            {cardName}
            <span className="tooltip-text">{cardName}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CardNameFilter;
