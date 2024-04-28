import { useEffect, useState } from "react";
import { IFetchMoviesResponse, IMovieDetails } from "../types/Movie.types";

const API_KEY = import.meta.env.VITE_MOVIE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export function useFetchMovies(query = ""): IFetchMoviesResponse {
  const [data, setData] = useState<IMovieDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      let endpoint = "";

      if (query.trim() === "") {
        endpoint = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`;
      } else {
        endpoint = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}&language=en-US`;
      }

      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setData(data.results || []);
      } catch (err: unknown) {
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
  }, [query]);

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
      console.error("Error fetching movie details:", err.message);
      return null;
    } else {
      console.error("An unknown error occurred.");
      return null;
    }
  }
}
