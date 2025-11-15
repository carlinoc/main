// app/librodereclamos/layout.tsx

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Libro de Reclamaciones - Cinergia',
  description: 'Formulario de Libro de Reclamaciones - MNET E.I.R.L.',
};

export default function LibroReclamacionesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
