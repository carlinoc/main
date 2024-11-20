// Import React and related libraries
import { Metadata } from 'next';
// Import internal components
import { Hero } from '@/app/ui/components/Content/Hero';
import { ListSection } from '@/app/ui/components/Content/ListSection/ListSection';
/**
 * Content Page Component
 *
 * This component represents the main structure of the Content page.
 * It includes a Hero component for displaying a featured section and a ListSection component for displaying a list of items.
 *
 * @component
 * @returns {JSX.Element} - JSX element representing the Content component.
 * @example
 * // Usage in a parent component or route
 * import Content from '@/app/ui/components/Content';
 * //...
 * return (
 *   <Content />
 * );
 */
export const metadata: Metadata = {
  title: 'Cinergia | Contenido: Explora el Cine Latinoamericano',
  description:
    'Explora el cine latino en Cinergia: emocionantes películas, cautivadores cortometrajes y envolventes largometrajes, creados con pasión en la región. ¡Cinergia, tu ventana al cine latino!',
  keywords: [
    'Cinergia',
    'cine latinoamericano',
    'películas latinoamericanas',
    'cortometrajes latinoamericanos',
    'largometrajes latinoamericanos',
    'géneros cinematográficos',
    'explorar géneros',
    'últimas películas',
    'cinematografía regional',
    'plataforma de streaming latinoamericana',
  ],
  authors: { name: 'Cinergia' },
  openGraph: {
    type: 'website',
    title: 'Cinergia - Géneros y Últimas Películas Latinoamericanas',
    description:
      'Explora la riqueza del cine latinoamericano en Cinergia. Descubre emocionantes películas, cautivadores cortometrajes y envolventes largometrajes, todos creados con pasión y dedicación en la región. ¡Cinergia es tu ventana al extraordinario mundo del cine latinoamericano!',
    siteName: 'Cinergia',
    images: ['https://cdn.cinergia.lat/images/logo-web-2B.png'],
  },
};
/**
 * Content Page Component
 *
 * This component represents the main structure of the Content page.
 * It includes a Hero component for displaying a featured section and a ListSection component for displaying a list of items.
 *
 * @component
 * @returns {JSX.Element} - JSX element representing the Content component.
 */
export default function Content(): JSX.Element {
  /**
   * Render the JSX for the Content component
   */
  return (
    <div className="w-full">
      {/* Hero section */}
      <Hero />
      {/* List section */}
      <ListSection />
    </div>
  );
}
