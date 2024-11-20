// Import necessary dependencies and types
import { Inter } from 'next/font/google';
import '@/app/styles/globals.css';
import Script from 'next/script';
import { Header } from '@/app/ui/components/shared/Header';
import { Footer } from '@/app/ui/components/shared/Footer';
import { ScrollWrapper } from '@/app/lib/utils/ScrollWrapper';
import GoogleAuthProvider from './context/GoogleAuthProvider';
// Initialize the Inter font with Latin subset
const inter = Inter({ subsets: ['latin'] });
/**
 * RootLayout Component
 *
 * A React component serving as the root layout for the application.
 *
 * @component
 * @param {Object} props - Props for the RootLayout component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} - JSX element representing the RootLayout component.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="cinergia">
      <GoogleAuthProvider>
        <ScrollWrapper>
          <body className={`${inter.className} antialiased`}>
            {/* Header with navigation bar */}
            <Header />

            {/* Main content */}
            {children}

            {/* Footer component */}
            <Footer />
          </body>
        </ScrollWrapper>
      </GoogleAuthProvider>
      {/* Include the Izipay payment script */}
      <Script src="https://sandbox-checkout.izipay.pe/payments/v1/js/index.js" />
    </html>
  );
}
