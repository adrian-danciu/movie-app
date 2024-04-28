import React from "react";
import { IMovieDetailsProps } from "../../types/Movie.types";
import { genreMapping } from "../../utils/movieGenres";

const MovieDetails: React.FC<IMovieDetailsProps> = ({ movie }) => {
  if (!movie) {
    return <div>No movie data available.</div>;
  }

  return (
    <div className="flex lg:flex-row flex-col p-6 gap-4 lg:gap-20 bg-background text-text min-h-screen">
      <div className="flex-shrink-0">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full m-auto h-auto rounded-lg"
        />
      </div>

      <div className="lg:w-[50%] w-full">
        <h1 className="text-3xl font-bold text-primary">{movie.title}</h1>{" "}
        <p className="text-lg italic text-text">{movie.tagline}</p>{" "}
        <p className="mt-4 text-text">{movie.overview}</p>
        <div className="mt-6 flex gap-2 flex-wrap">
          {movie.genres.map((genre) => (
            <span
              key={genre.id}
              className="px-3 py-1 bg-accent text-background rounded-full text-xs font-medium"
            >
              {genreMapping[genre.id]}
            </span>
          ))}
        </div>
        <div className="mt-6">
          <strong className="text-primary">Release Date:</strong>{" "}
          {movie.release_date}
        </div>
        <div className="mt-2">
          <strong className="text-primary">Runtime:</strong> {movie.runtime}{" "}
          minutes
        </div>
        <div className="mt-2">
          <strong className="text-primary">Production Companies:</strong>{" "}
          {movie.production_companies.map((pc) => pc.name).join(", ")}{" "}
        </div>
        <div className="mt-2">
          <strong className="text-primary">Budget:</strong> $
          {movie.budget.toLocaleString()}
        </div>
        <div className="mt-2">
          <strong className="text-primary">Revenue:</strong> $
          {movie.revenue.toLocaleString()}
        </div>
        {movie.belongs_to_collection && (
          <div className="mt-2">
            <strong className="text-primary">Collection:</strong>{" "}
            {movie.belongs_to_collection.name}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
