export const metadata = {
  title: 'Personal Finance Tracker',
  description: 'Track income and expenses with color-coded sections, theme toggle, and localStorage.',
};

import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="theme-light">{children}</body>
    </html>
  );
}
