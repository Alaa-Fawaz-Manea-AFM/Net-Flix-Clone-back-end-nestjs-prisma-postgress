export type IUsers = {
  heart: IMovieDetail[];
  user: IUser;
};

export type IUser = {
  heart?: string[];
  id: string | null;
};

export type IHeart = number;

export type TRequest = {
  requestPopular: string;
  fetchTrending: string;
  fetchTopRated: string;
  fetchActionMovies: string;
  requestHorror: string;
  fetchComedyMovies: string;
};

export type TRequestArrary = {
  name: string;
  req: string;
};

export type IForm = { email: string; password: string };

export type ISlider = { title: string; req: string };

export type IMovieDetailHeart = {
  id: string;
  movieId?: string;
  title?: string;
  name?: string;
  backdrop_path?: string;
};

export type IMovieDetail = {
  id: string;
  title?: string;
  name?: string;
  runtime: string;
  tagline: string;
  overview: string;
  vote_count: string;
  poster_path: string;
  vote_average: string;
  release_date: string;
  backdrop_path?: string;
  original_title: string;
  genres: { name: string }[];
  production_companies: { logo_path: string; name: string }[];
};
