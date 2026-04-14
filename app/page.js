'use client';

import { useEffect, useMemo, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import TransactionForm from '@/components/TransactionForm';
import SummaryCards from '@/components/SummaryCards';
import Filters from '@/components/Filters';
import TransactionList from '@/components/TransactionList';
import CategoryBreakdown from '@/components/CategoryBreakdown';
import {
  CATEGORIES,
  calculateTotals,
  filterTransactions,
  getExpenseBreakdown,
  sortTransactionsByDate,
  validateTransaction,
} from '@/lib/finance';

const STORAGE_KEY = 'finance-tracker-transactions';
const THEME_KEY = 'finance-tracker-theme';

const initialFilters = {
  type: 'All',
  category: 'All',
  startDate: '',
  endDate: '',
};

const seedTransactions = [
  {
    id: '1',
    type: 'Income',
    amount: 5000,
    category: 'Salary',
    date: '2026-04-01',
  },
  {
    id: '2',
    type: 'Expense',
    amount: 500,
    category: 'Food',
    date: '2026-04-02',
  },
  {
    id: '3',
    type: 'Expense',
    amount: 700,
    category: 'Bills',
    date: '2026-04-03',
  },
  {
    id: '4',
    type: 'Income',
    amount: 1200,
    category: 'Freelance',
    date: '2026-04-04',
  },
];

export default function HomePage() {
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTransactions = localStorage.getItem(STORAGE_KEY);

    if (savedTransactions) {
      try {
        const parsed = JSON.parse(savedTransactions);
        setTransactions(sortTransactionsByDate(parsed));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
        setTransactions(sortTransactionsByDate(seedTransactions));
      }
    } else {
      setTransactions(sortTransactionsByDate(seedTransactions));
    }

    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(theme === 'dark' ? 'theme-dark' : 'theme-light');
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const totals = useMemo(() => calculateTotals(transactions), [transactions]);

  const filteredTransactions = useMemo(() => {
    return filterTransactions(transactions, filters);
  }, [transactions, filters]);

  const breakdown = useMemo(() => {
    return getExpenseBreakdown(filteredTransactions);
  }, [filteredTransactions]);

  function handleSaveTransaction(formData) {
    const validation = validateTransaction(
      transactions,
      formData,
      editingTransaction?.id || null
    );

    if (!validation.valid) {
      return validation;
    }

    if (editingTransaction) {
      const updatedTransactions = transactions.map((txn) =>
        txn.id === editingTransaction.id
          ? { ...formData, id: editingTransaction.id }
          : txn
      );

      setTransactions(sortTransactionsByDate(updatedTransactions));
      setEditingTransaction(null);
      return { valid: true };
    }

    const newTransaction = {
      ...formData,
      id: crypto.randomUUID(),
    };

    setTransactions((prev) => sortTransactionsByDate([...prev, newTransaction]));
    return { valid: true };
  }

  function handleDeleteTransaction(id) {
    const updatedTransactions = transactions.filter((txn) => txn.id !== id);
    setTransactions(updatedTransactions);

    if (editingTransaction?.id === id) {
      setEditingTransaction(null);
    }

    if (updatedTransactions.length === 0) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  function handleEditTransaction(transaction) {
    setEditingTransaction(transaction);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancelEdit() {
    setEditingTransaction(null);
  }

  function handleResetFilters() {
    setFilters(initialFilters);
  }

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  return (
    <main className="page">
      <header className="header header-row">
        <div>
          <h1>💸 Personal Finance Tracker</h1>
          <p>
            Track income and expenses, prevent invalid spending, edit transactions,
            and view color-coded financial insights.
          </p>
        </div>

        <button className="theme-toggle" type="button" onClick={toggleTheme}>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
          {theme === 'light' ? 'Night Mode' : 'Morning Mode'}
        </button>
      </header>

      <div className="layout-grid">
        <TransactionForm
          categories={CATEGORIES}
          onSave={handleSaveTransaction}
          editingTransaction={editingTransaction}
          onCancelEdit={handleCancelEdit}
        />

        <section className="content-grid">
          <SummaryCards totals={totals} />
          <Filters
            filters={filters}
            setFilters={setFilters}
            categories={CATEGORIES}
            onReset={handleResetFilters}
          />
          <TransactionList
            transactions={filteredTransactions}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
          />
          <CategoryBreakdown breakdown={breakdown} />
        </section>
      </div>
    </main>
  );
}
