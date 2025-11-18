// Import necessary dependencies and types
import { Hero } from '@/app/ui/components/Home/Hero';
import { ScrollTopButtonWrapper } from './ui/components/shared/ScrollTopButtonWrapper';
import { Metadata } from 'next';
/**
 * Home Component
 *
 * The Home component serves as the main structure for the home page.
 * It comprises a fixed header with a navigation bar and various sections,
 * including Hero, ExclusiveSection, NewsSection, ShortFilmsBannerSection,
 * EventBannerSection, and WeekMovieSection.
 *
 * @component
 * @returns {JSX.Element} - JSX element representing the Home component.
 */
export const metadata: Metadata = {
  title: 'Cinergia - Tu Plataforma de Streaming Favorita en Latinoamérica',
  description:
    'Explora el cine latino en Cinergia, tu plataforma exclusiva para emocionantes películas y cortometrajes. Sumérgete en la riqueza de nuestra cinematografía regional. ¡Cinergia, tu ventana al mundo del cine latino!',
  keywords: [
    'Cinergia',
    'cine latinoamericano',
    'películas latinoamericanas',
    'cortometrajes latinoamericanos',
    'largometrajes latinoamericanos',
    'historias cinematográficas únicas',
    'talento excepcional latinoamericano',
    'cultura audiovisual latinoamericana',
    'riqueza cinematográfica',
    'cinematografía regional',
    'plataforma de streaming latinoamericana',
  ],
  authors: { name: 'Cinergia' },
  openGraph: {
    type: 'website',
    title: 'Cinergia - Plataforma de Streaming Latinoamericana',
    description:
      'Descubre y disfruta del mejor contenido audiovisual latinoamericano en Cinergia. Películas, cortometrajes, largometrajes y más.',
    siteName: 'Cinergia',
    images: ['https://cdn.cinergia.lat/images/logo-web-2B.png'],
  },
};
export default function Home(): JSX.Element {
  return (
    <ScrollTopButtonWrapper>
      {/* Main content area */}
      <main className="w-full">
        {/* Hero section */}
        <Hero />
        {/* ExclusiveSection component */}
        {/* <ExclusiveSection /> */}
        {/* NewsSection component */}
        {/* <NewsSection /> */}
        {/* ShortFilmsBannerSection component */}
        {/* <ShortFilmsBannerSection /> */}
        {/* EventBannerSection component */}
        {/* <EventBannerSection /> */}
        {/* WeekMovieSection component */}
        {/* <WeekMovieSection /> */}
      </main>
    </ScrollTopButtonWrapper>
  );
}
