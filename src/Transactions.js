import React from 'react';
import './Transactions.css';

const Transactions = ({ transactions, sortConfig, onSort }) => {
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? (sortConfig.direction === 'ascending' ? 'sort-asc' : 'sort-desc') : 'sort-both';
  };

  if (!transactions.length) {
    return <div>No transactions available</div>;
  }

  return (
    <div className="transactions-container">
      <div className="transactions-table">
        <div className="transactions-header">
          <div className="transactions-row">
            <div className={`transaction-date ${getClassNamesFor('date')}`} onClick={() => onSort('date')}>
              Date
            </div>
            <div className={`transaction-description ${getClassNamesFor('description')}`} onClick={() => onSort('description')}>
              Description
            </div>
            <div className={`transaction-card ${getClassNamesFor('cardName')}`} onClick={() => onSort('cardName')}>
              Card Name
            </div>
            <div className={`transaction-category ${getClassNamesFor('category')}`} onClick={() => onSort('category')}>
              Category
            </div>
            <div className={`transaction-credit-debit ${getClassNamesFor('type')}`} onClick={() => onSort('type')}>
              Credit/Debit
            </div>
            <div className={`transaction-amount ${getClassNamesFor('amount')}`} onClick={() => onSort('amount')}>
              Amount ($)
            </div>
          </div>
        </div>
        <div className="transactions-body">
          {transactions.map((transaction, index) => (
            <div
              className={`transactions-row ${index % 2 === 0 ? 'even' : 'odd'}`}
              key={index}
            >
              <div className="transaction-date">{transaction.date}</div>
              <div className="transaction-description">{transaction.description}</div>
              <div className="transaction-card">{transaction.cardName || 'N/A'}</div>
              <div className="transaction-category">{transaction.category || 'N/A'}</div>
              <div className="transaction-credit-debit">{transaction.amount < 0 ? 'Debit' : 'Credit'}</div>
              <div className="transaction-amount">{transaction.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
