import React, { useState, useEffect, useCallback } from 'react';
import Transactions from './Transactions';
import DateFilter from './DateFilter';
import CardNameFilter from './CardNameFilter';
import CategoryFilter from './CategoryFilter';
import CreditDebitFilter from './CreditDebitFilter';
import AmountFilter from './AmountFilter';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [dateFilter, setDateFilter] = useState('All');
  const [cardNameFilter, setCardNameFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [creditDebitFilter, setCreditDebitFilter] = useState('All');
  const [amountFilter, setAmountFilter] = useState({ from: '', to: '' });
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'descending' });

  useEffect(() => {
    fetch('http://localhost:5001/api/transactions')
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
        setCardNameFilter([...new Set(data.map((t) => t.cardName))]);
        setCategoryFilter([...new Set(data.map((t) => t.category))]);
      });
  }, []);

  const filterTransactions = useCallback(() => {
    let filtered = [...transactions];

    // Apply date filter
    if (dateFilter !== 'All') {
      const now = new Date();
      let startDate;
      switch (dateFilter) {
        case '7':
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case '30':
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
        case '60':
          startDate = new Date(now.setMonth(now.getMonth() - 2));
          break;
        case '90':
          startDate = new Date(now.setMonth(now.getMonth() - 3));
          break;
        case 'Custom':
          // handle custom date range
          break;
        default:
          startDate = new Date();
      }
      filtered = filtered.filter((t) => new Date(t.date) >= startDate);
    }

    // Apply card name filter
    if (cardNameFilter.length > 0) {
      filtered = filtered.filter((t) => cardNameFilter.includes(t.cardName));
    }

    // Apply category filter
    if (categoryFilter.length > 0) {
      filtered = filtered.filter((t) => categoryFilter.includes(t.category));
    }

    // Apply credit/debit filter
    if (creditDebitFilter !== 'All') {
      filtered = filtered.filter((t) => (creditDebitFilter === 'Credit' ? t.amount > 0 : t.amount < 0));
    }

    // Apply amount filter
    const fromAmount = parseFloat(amountFilter.from);
    const toAmount = parseFloat(amountFilter.to);
    filtered = filtered.filter((t) => {
      if (!isNaN(fromAmount) && !isNaN(toAmount)) {
        return t.amount >= fromAmount && t.amount <= toAmount;
      }
      if (!isNaN(fromAmount)) {
        return t.amount >= fromAmount;
      }
      if (!isNaN(toAmount)) {
        return t.amount <= toAmount;
      }
      return true;
    });

    // Apply sorting
    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredTransactions(filtered);
  }, [dateFilter, cardNameFilter, categoryFilter, creditDebitFilter, amountFilter, transactions, sortConfig]);

  useEffect(() => {
    filterTransactions();
  }, [dateFilter, cardNameFilter, categoryFilter, creditDebitFilter, amountFilter, transactions, filterTransactions]);

  const clearFilters = () => {
    setDateFilter('All');
    setCardNameFilter([...new Set(transactions.map((t) => t.cardName))]);
    setCategoryFilter([...new Set(transactions.map((t) => t.category))]);
    setCreditDebitFilter('All');
    setAmountFilter({ from: '', to: '' });
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const calculateSummary = () => {
    const totalTransactions = filteredTransactions.length;
    const totalAmount = filteredTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const earliestDate = filteredTransactions.reduce((earliest, transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate < earliest ? transactionDate : earliest;
    }, new Date(filteredTransactions[0]?.date || Date.now()));
    const latestDate = filteredTransactions.reduce((latest, transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate > latest ? transactionDate : latest;
    }, new Date(filteredTransactions[0]?.date || Date.now()));

    return {
      totalTransactions,
      totalAmount,
      dateRange: `${earliestDate.toLocaleDateString()} - ${latestDate.toLocaleDateString()}`
    };
  };

  const summary = calculateSummary();

  return (
    <div className="App">
      <h1>Aggregated Transactions</h1>
      <button className="clear-filters" onClick={clearFilters}>Clear Filters</button>
      <div className="filter-panel sticky-filter">
        <div className="filter-group">
          <div className="filter-item">
            <DateFilter onDateFilterChange={setDateFilter} />
          </div>
          <div className="filter-item">
            <CardNameFilter transactions={transactions} onCardNameFilterChange={setCardNameFilter} />
          </div>
          <div className="filter-item">
            <CategoryFilter transactions={transactions} onCategoryFilterChange={setCategoryFilter} />
          </div>
          <div className="filter-item">
            <CreditDebitFilter onCreditDebitFilterChange={setCreditDebitFilter} />
          </div>
          <div className="filter-item">
            <AmountFilter onAmountFilterChange={(from, to) => setAmountFilter({ from, to })} />
          </div>
        </div>
      </div>
      <div className="transaction-summary">
        <div className="transaction-summary-title">Quick Summary</div>
        <div className="transaction-summary-content">
          <div>
            <span className="transaction-summary-key">Total Transactions:</span>
            <span className="transaction-summary-value">{summary.totalTransactions}</span>
          </div>
          <div>
            <span className="transaction-summary-key">Total Amount:</span>
            <span className={`transaction-summary-value ${summary.totalAmount < 0 ? 'positive' : 'negative'}`}>
              {summary.totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
            </span>
          </div>
          <div>
            <span className="transaction-summary-key">Date:</span>
            <span className="transaction-summary-value">{summary.dateRange}</span>
          </div>
        </div>
      </div>
      <Transactions transactions={filteredTransactions} sortConfig={sortConfig} onSort={requestSort} />
    </div>
  );
}

export default App;
