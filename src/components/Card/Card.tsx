import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../providers/UserProvider";
import { TCard } from "../../types/Card.type";
import { genreMapping } from "../../utils/movieGenres";

const Card: React.FC<TCard> = ({ data }) => {
  const navigate = useNavigate();
  const { currentUser, toggleFavorite } = useUserContext();

  const isFavorite = currentUser?.favorites.includes(data.id as string);

  const handleFavorite = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    await toggleFavorite(data.id as string);
  };

  const handleClick = () => {
    navigate(`/movie/${data.id}`);
  };

  const renderGenres = () => {
    if (data.genres) {
      return data.genres.map((genre: { id: number; name: string }) => (
        <span
          key={genre.id}
          className="px-2 py-1 bg-accent text-background rounded-full text-xs font-medium"
        >
          {genre.name}
        </span>
      ));
    } else if (data.genre_ids) {
      return data.genre_ids.map((id: number) => (
        <span
          key={id}
          className="px-2 py-1 bg-accent text-background rounded-full text-xs font-medium"
        >
          {genreMapping[id]}
        </span>
      ));
    }
    return null;
  };

  return (
    <div
      className="col-span-1 flex flex-col rounded-lg text-center shadow bg-white cursor-pointer"
      onClick={handleClick}
    >
      <img
        className="w-full h-96 object-cover object-center rounded-t-lg"
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        alt={data.title}
      />
      <div className="flex flex-col gap-4 items-start justify-between text-primary bg-background opacity-95 p-4 h-full">
        <h3 className="text-primary text-md text-left">{data.title}</h3>
        <p className="two-line-ellipsis text-left text-xs text-text">
          {data.overview}
        </p>
        <button
          onClick={handleFavorite}
          className={`heart-button ${isFavorite ? "favorite" : ""}`}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
        <div className="flex gap-2 flex-wrap mt-2">{renderGenres()}</div>
      </div>
    </div>
  );
};

export default Card;
