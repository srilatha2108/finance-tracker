'use client';

import { useEffect, useState } from 'react';
import {
  FaCalendarAlt,
  FaCheck,
  FaEdit,
  FaMoneyBillWave,
  FaTags,
  FaTimes,
  FaWallet,
} from 'react-icons/fa';

const getDefaultForm = () => ({
  type: 'Expense',
  amount: '',
  category: 'Food',
  date: new Date().toISOString().split('T')[0],
});

export default function TransactionForm({
  categories,
  onSave,
  editingTransaction,
  onCancelEdit,
}) {
  const [formData, setFormData] = useState(getDefaultForm);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        type: editingTransaction.type,
        amount: String(editingTransaction.amount),
        category: editingTransaction.category,
        date: editingTransaction.date,
      });
      setError('');
    } else {
      setFormData(getDefaultForm());
    }
  }, [editingTransaction]);

  function handleChange(event) {
    const { name, value } = event.target;

    if (name === 'amount' && Number(value) < 0) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      ...formData,
      amount: Number(formData.amount),
    };

    const result = onSave(payload);

    if (!result.valid) {
      setError(result.message);
      return;
    }

    setError('');
    setFormData(getDefaultForm());
  }

  function handleCancel() {
    setError('');
    setFormData(getDefaultForm());
    onCancelEdit();
  }

  return (
    <section className="panel form-section">
      <h2 className="panel-title">
        {editingTransaction ? <FaEdit /> : <FaCheck />}
        {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
      </h2>

      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="type">
            <FaWallet /> Type
          </label>
          <select id="type" name="type" value={formData.type} onChange={handleChange}>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="amount">
            <FaMoneyBillWave /> Amount
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            min="1"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
          />
        </div>

        <div className="field">
          <label htmlFor="category">
            <FaTags /> Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="date">
            <FaCalendarAlt /> Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        {error ? <p className="error-text">{error}</p> : null}

        <div className="form-actions">
          <button className="button button-primary" type="submit">
            {editingTransaction ? 'Update Transaction' : 'Save Transaction'}
          </button>

          {editingTransaction ? (
            <button
              className="button button-secondary"
              type="button"
              onClick={handleCancel}
            >
              <FaTimes /> Cancel
            </button>
          ) : null}
        </div>
      </form>
    </section>
  );
}