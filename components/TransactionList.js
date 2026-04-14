import { FaEdit, FaTrash } from 'react-icons/fa';
import { formatCurrency } from '@/lib/finance';

export default function TransactionList({ transactions, onEdit, onDelete }) {
  return (
    <section className="card transactions-section">
      <div className="toolbar">
        <h2 className="section-title">📜 Transactions</h2>
        <span className="meta-text">{transactions.length} item(s)</span>
      </div>

      {transactions.length === 0 ? (
        <p className="empty-state">No transactions found for the selected filters.</p>
      ) : (
        <div className="transactions-list">
          {transactions.map((transaction) => (
            <article
              key={transaction.id}
              className={`transaction-item ${
                transaction.type === 'Income'
                  ? 'transaction-income'
                  : 'transaction-expense'
              }`}
            >
              <div className="transaction-main">
                <strong>📂 {transaction.category}</strong>
                <span className="meta-text">📅 {transaction.date}</span>
                <span
                  className={`pill ${
                    transaction.type === 'Income' ? 'pill-income' : 'pill-expense'
                  }`}
                >
                  {transaction.type === 'Income' ? '💰 Income' : '💸 Expense'}
                </span>
              </div>

              <div className="transaction-side">
                <div className="transaction-amount">
                  {formatCurrency(transaction.amount)}
                </div>

                <div className="row-actions">
                  <button
                    className="icon-button"
                    type="button"
                    onClick={() => onEdit(transaction)}
                    aria-label="Edit transaction"
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="icon-button delete"
                    type="button"
                    onClick={() => onDelete(transaction.id)}
                    aria-label="Delete transaction"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
