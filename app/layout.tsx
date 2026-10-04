import type { Metadata } from 'next';
import './globals.css';
import { WhatsAppWidget } from '@/components/WhatsAppWidget';

export const metadata: Metadata = {
  title: 'ODERA Luxe | Urban African Bespoke Tailoring',
  description: 'ODERA Luxe creates contemporary African bespoke tailoring for the modern individual.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}<WhatsAppWidget /></body>
    </html>
  );
}
