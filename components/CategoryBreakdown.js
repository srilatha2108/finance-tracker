import { FaChartBar } from 'react-icons/fa';
import { formatCurrency } from '@/lib/finance';

export default function CategoryBreakdown({ breakdown }) {
  const maxValue = breakdown.length
    ? Math.max(...breakdown.map((item) => item.total))
    : 0;

  return (
    <section className="card breakdown-section">
      <div className="toolbar">
        <h2 className="section-title">
          <FaChartBar /> Expense Breakdown
        </h2>
        <span className="meta-text">Category-wise spending</span>
      </div>

      {breakdown.length === 0 ? (
        <p className="empty-state">No expense data available.</p>
      ) : (
        <div className="breakdown-list">
          {breakdown.map((item) => {
            const width = maxValue ? `${(item.total / maxValue) * 100}%` : '0%';

            return (
              <div key={item.category} className="breakdown-row">
                <div className="breakdown-head">
                  <strong>📊 {item.category}</strong>
                  <span>{formatCurrency(item.total)}</span>
                </div>

                <div className="bar-track">
                  <div className="bar-fill" style={{ width }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}