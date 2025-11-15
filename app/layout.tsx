// Import necessary dependencies and types
import { Inter } from 'next/font/google';
import '@/app/styles/globals.css';
import { Header } from '@/app/ui/components/shared/Header';
import { Footer } from '@/app/ui/components/shared/Footer';
import { ScrollWrapper } from '@/app/lib/utils/ScrollWrapper';
import GoogleAuthProvider from './context/GoogleAuthProvider';
import { CountryProvider } from './context/CountryContext';

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
          <CountryProvider>
            <body className={`${inter.className} antialiased`}>
              {/* Header with navigation bar */}
              <Header />
              {/* Main content */}
              <main id="main-content">{children}</main>
              {/* Footer component */}
              <Footer />
            </body>
          </CountryProvider>
        </ScrollWrapper>
      </GoogleAuthProvider>
    </html>
  );
}
