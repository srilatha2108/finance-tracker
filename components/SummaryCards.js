import { FaArrowDown, FaArrowUp, FaWallet } from 'react-icons/fa';
import { formatCurrency } from '@/lib/finance';

export default function SummaryCards({ totals }) {
  return (
    <section className="summary-grid">
      <article className="summary-card income-card">
        <p>
          <FaArrowUp /> Total Income
        </p>
        <h3 className="income-text">{formatCurrency(totals.income)}</h3>
      </article>

      <article className="summary-card expense-card">
        <p>
          <FaArrowDown /> Total Expenses
        </p>
        <h3 className="expense-text">{formatCurrency(totals.expenses)}</h3>
      </article>

      <article className="summary-card balance-card">
        <p>
          <FaWallet /> Remaining Balance
        </p>
        <h3 className="balance-text">{formatCurrency(totals.balance)}</h3>
      </article>
    </section>
  );
}
