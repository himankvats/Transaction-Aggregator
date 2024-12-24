const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { cardNameMapping, categoryMapping } = require('./config');

const categorizeTransaction = (description) => {
  const lowerCaseDescription = description.toLowerCase();
  for (const key in categoryMapping) {
    if (lowerCaseDescription.includes(key.toLowerCase())) {
      return categoryMapping[key];
    }
  }
  return 'Uncategorized';
};

const processCSV = (filePath, dateColumnName = 'Date', amountColumnName = 'Amount', debitColumnName, creditColumnName, descriptionColumnName = 'Description', providerColumnName = 'Provider') => {
  return new Promise((resolve, reject) => {
    const transactions = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        let amount = 0;
        if (debitColumnName && creditColumnName) {
          amount = row[debitColumnName] ? parseFloat(row[debitColumnName]) : (row[creditColumnName] ? parseFloat(row[creditColumnName]) : 0);
        } else {
          amount = parseFloat(row[amountColumnName]) || 0;
        }

        const transaction = {
          date: row[dateColumnName] || 'N/A',
          description: row[descriptionColumnName] || 'N/A',
          amount: isNaN(amount) ? 0 : amount,
          provider: row[providerColumnName] || 'N/A',
          cardName: cardNameMapping[path.basename(filePath)] || 'N/A',
          category: categorizeTransaction(row[descriptionColumnName] || ''),
          type: amount < 0 ? 'Debit' : 'Credit'
        };
        transactions.push(transaction);
      })
      .on('end', () => {
        resolve(transactions);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

const aggregateTransactions = async () => {
  const csvFiles = [
    { file: path.join(__dirname, 'Dactivity.csv'), dateColumn: 'Trans. Date', amountColumn: 'Amount' },
    { file: path.join(__dirname, 'AEactivity.csv'), dateColumn: 'Date', amountColumn: 'Amount' },
    { file: path.join(__dirname, 'APactivity.csv'), dateColumn: 'Date', amountColumn: 'Amount' },
    { file: path.join(__dirname, 'CPactivity.csv'), dateColumn: 'Date', debitColumnName: 'Debit', creditColumnName: 'Credit' },
    { file: path.join(__dirname, 'CRactivity.csv'), dateColumn: 'Date', debitColumnName: 'Debit', creditColumnName: 'Credit' }
  ];

  let allTransactions = [];
  for (const csvFile of csvFiles) {
    const transactions = await processCSV(csvFile.file, csvFile.dateColumn, csvFile.amountColumn, csvFile.debitColumnName, csvFile.creditColumnName);
    allTransactions = [...allTransactions, ...transactions];
  }

  return allTransactions;
};

module.exports = { aggregateTransactions };
