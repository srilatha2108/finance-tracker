# Personal Finance Transaction Tracker - Next.js

A simple personal finance tracker built with Next.js that allows users to record income and expenses, apply filters, and view summary insights.

## Features

- Add income and expense transactions
- Validate amount as a positive number
- Prevent expense entries that would make the balance negative
- View all recorded transactions
- Filter by:
  - Type
  - Category
  - Date range
- Dashboard summary with:
  - Total Income
  - Total Expenses
  - Remaining Balance
- Expense category breakdown
- Uses memoized derived state to reduce unnecessary recalculation and re-renders

## Tech Stack

- Next.js
- React
- JavaScript
- CSS

## Setup Instructions

```bash
npm install
npm run dev
