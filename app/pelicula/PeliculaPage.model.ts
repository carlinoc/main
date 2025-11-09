export interface PeliculaPageProps {
  params: {
    id: string;
    urlId: string;
  };
}

export interface VerPageProps extends PeliculaPageProps {}
