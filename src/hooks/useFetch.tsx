import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IFetchMoviesResponse, IMovieDetails } from "../types/Movie.types";

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export function useFetchMovies(filters: {
  title?: string;
  year?: number | null;
  genre?: number | null;
}): IFetchMoviesResponse {
  const [data, setData] = useState<IMovieDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      let endpoint = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US`;

      if (filters.title) {
        endpoint = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(filters.title)}&language=en-US`;
      }
      if (filters.year) {
        endpoint += `&year=${filters.year}`;
      }
      if (filters.genre) {
        endpoint += `&with_genres=${filters.genre}`;
      }

      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setData(data.results || []);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, filters.title, filters.year, filters.genre]); // Ensuring all parts of filters trigger the effect

  return { data, loading, error };
}
export async function fetchMovieById(
  movieId: string
): Promise<IMovieDetails | null> {
  const endpoint = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      toast.error("Error fetching movie details:");
      return null;
    } else {
      toast.error("An unknown error occurred.");
      return null;
    }
  }
}
