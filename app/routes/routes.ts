/**
 * Enum representing different routes for the application.
 * Each route has a corresponding path.
 * @readonly
 * @enum {string}
 */
enum RoutePath {
  Home = '/', // Path for the home page
  SignIn = '/auth/signin', // Path for the sign-in page
  AuthGoogle = '/auth/google', // Path for Google authentication
  Content = '/contenido', // Path for general content
  Movies = '/peliculas', // Path for the movies page
  Watch = '/peliculas/watch', // Path for watching movies
  WatchFree = '/peliculas/watch-free', // Path for watching free movies
  Genres = '/generos',
  DetailMovie = '/pelicula', // Path for YT movie
  DetailMovieSee = '/pelicula/ver', // Path for YT movie see
}

/**
 * Object mapping route keys to their respective paths.
 * Use these keys when navigating or referencing paths in the code.
 * @type {Object}
 * @property {string} home - Path for the home page.
 * @property {string} signin - Path for the sign-in page.
 * @property {string} authGoogle - Path for Google authentication.
 * @property {string} content - Path for general content.
 * @property {string} movies - Path for the movies page.
 * @property {string} watch - Path for watching movies.
 * @property {string} watchFree - Path for watching free movies.
 * @property {string} genres - Path for movie genres.
 * @property {string} detailMovie - Path for YT movie
 * @property {string} detailMovieSee - Path for YT movie see
 */
export const routesPaths = {
  home: RoutePath.Home,
  signin: RoutePath.SignIn,
  authGoogle: RoutePath.AuthGoogle,
  content: RoutePath.Content,
  movies: RoutePath.Movies,
  watch: RoutePath.Watch,
  watchFree: RoutePath.WatchFree,
  genres: RoutePath.Genres,
  detailMovie: RoutePath.DetailMovie,
  detailMovieSee: RoutePath.DetailMovieSee,
};
