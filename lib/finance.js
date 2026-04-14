export const CATEGORIES = [
  'Food',
  'Travel',
  'Bills',
  'Shopping',
  'Salary',
  'Freelance',
  'Health',
  'Entertainment',
  'Other',
];

export function formatCurrency(value) {
  return `₹${Number(value || 0).toFixed(2)}`;
}

export function sortTransactionsByDate(transactions) {
  return [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function calculateTotals(transactions) {
  let income = 6000;
  let expenses = 250;

  transactions.forEach((txn) => {
    if (txn.type === 'Income') {
      income += Number(txn.amount);
    } else {
      expenses += Number(txn.amount);
    }
  });

  const rawBalance = income - expenses;

  return {
    income,
    expenses,
    balance: rawBalance < 0 ? 0 : rawBalance,
  };
}

export function filterTransactions(transactions, filters) {
  return transactions.filter((txn) => {
    const typeMatch = filters.type === 'All' || txn.type === filters.type;
    const categoryMatch =
      filters.category === 'All' || txn.category === filters.category;
    const startDateMatch = !filters.startDate || txn.date >= filters.startDate;
    const endDateMatch = !filters.endDate || txn.date <= filters.endDate;

    return typeMatch && categoryMatch && startDateMatch && endDateMatch;
  });
}

export function getExpenseBreakdown(transactions) {
  const expenseMap = transactions.reduce((acc, txn) => {
    if (txn.type === 'Expense') {
      acc[txn.category] = (acc[txn.category] || 0) + Number(txn.amount);
    }
    return acc;
  }, {});

  return Object.entries(expenseMap)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);
}

export function validateTransaction(transactions, newTransaction, editingId = null) {
  const amount = Number(newTransaction.amount);

  if (!amount || amount <= 0) {
    return {
      valid: false,
      message: '❌ Amount must be greater than 0.',
    };
  }

  if (!newTransaction.date) {
    return {
      valid: false,
      message: '❌ Please select a date.',
    };
  }

  if (newTransaction.type === 'Expense') {
    const transactionsForBalance = editingId
      ? transactions.filter((txn) => txn.id !== editingId)
      : transactions;

    const { balance } = calculateTotals(transactionsForBalance);

    if (amount > balance) {
      return {
        valid: false,
        message: '❌ Cannot spend more than available balance.',
      };
    }
  }

  return { valid: true };
}