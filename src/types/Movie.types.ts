export interface IMovieCard {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IMovieDetails extends IMovieCard {
  belongs_to_collection: { id: number; name: string; poster_path: string };
  genres: { id: number; name: string }[];
  budget: number;
  homepage: string;
  imdb_id: string;
  production_companies: { id: number; logo_path: string; name: string }[];
  production_countries: string[];
  revenue: number;
  runtime: number;
  spoken_languages: string[];
  status: string;
  tagline: string;
}

export interface IMovieDetailsProps {
  movie: IMovieDetails;
}

export interface IFetchMoviesResponse {
  data: IMovieCard[];
  loading: boolean;
  error: string | null;
}
