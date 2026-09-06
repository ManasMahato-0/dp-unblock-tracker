import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DP Unblock — 6-Week Tracker',
  description: '6-week plan to stop freezing on unseen DP problems. Solve each one both ways.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
