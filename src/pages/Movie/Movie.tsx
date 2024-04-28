import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SpinnerComponent } from "../../components";
import { fetchMovieById } from "../../hooks/useFetch";
import { IMovieDetails } from "../../types/Movie.types";
import MovieDetails from "./MovieDetails";

const Movie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<IMovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      if (id) {
        const movieData = await fetchMovieById(id);
        if (movieData) {
          setMovie(movieData);
        } else {
          setError("Error fetching movie details.");
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <SpinnerComponent />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>No movie found.</div>;
  }

  return <MovieDetails movie={movie} />;
};

export default Movie;
