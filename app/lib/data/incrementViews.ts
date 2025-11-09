export async function incrementMovieViews(movieId: number) {
  try {
    const response = await fetch('/api/movie-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieId }),
    });

    if (!response.ok) throw new Error('Error incrementando vistas');

    const data = await response.json();
    return data.views;
  } catch (error) {
    console.error('Error incrementMovieViews:', error);
    return null;
  }
}
