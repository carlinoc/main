'use client';
// Import React and related libraries
import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

/**
 * GoogleAuthProvider Component
 *
 * This component provides the NextAuth session context for its children.
 * It wraps the children components with the SessionProvider from NextAuth.
 *
 * @component
 * @param {object} props - Component properties.
 * @param {ReactNode} props.children - JSX elements to be wrapped with the SessionProvider.
 * @returns {JSX.Element} - JSX element representing the GoogleAuthProvider component.
 */
export default function GoogleAuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return <SessionProvider>{children}</SessionProvider>;
}
