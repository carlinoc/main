/**
 * Enum representing different sections for the home page.
 * Each section has a corresponding slug.
 * @readonly
 * @enum {string}
 */
enum sectionSlug {
  WeekMovieSection = 'pelicula-de-la-semana',
  NewsSection = 'novedades',
  ExclusiveSection = 'exclusiva',
  ShortFilmsSection = 'cortos-gratuitos',
}
/**
 * Object mapping section keys to their respective slugs.
 * Use these keys when fetching data for specific sections on the home page.
 * @type {Object}
 * @property {string} weekMovieSection - Slug for the week movie section.
 * @property {string} newsSection - Slug for the news section.
 * @property {string} exclusiveSection - Slug for the exclusive section.
 * @property {string} shortFilmsSection - Slug for the short films section.
 */
export const homeSections = {
  weekMovieSection: sectionSlug.WeekMovieSection,
  newsSection: sectionSlug.NewsSection,
  exclusiveSection: sectionSlug.ExclusiveSection,
  shortFilmsSection: sectionSlug.ShortFilmsSection,
};
