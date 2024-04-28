import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { TCard } from "../../types/Card.type";
import { genreMapping } from "../../utils/movieGenres";

const Card: FC<TCard> = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${data.id}`);
  };

  return (
    <div
      key={data.id}
      className="col-span-1 flex flex-col rounded-lg text-center shadow bg-white cursor-pointer"
      onClick={handleClick}
    >
      <img
        className="w-full h-96 object-cover object-center rounded-t-lg"
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        alt={data.title}
      />
      <div className="flex flex-col gap-4 items-start justify-between text-primary bg-background opacity-95 p-2 h-full">
        <h3 className="text-primary text-md text-left">{data.title}</h3>{" "}
        <p className="two-line-ellipsis text-left text-xs text-text">
          {data.overview}
        </p>
        <span className="px-2 py-1 text-green-800 text-[10px] font-medium bg-green-100 rounded-full">
          {data.vote_average}
        </span>
        <div className="flex gap-2 flex-wrap mt-2">
          {data.genre_ids.map((genre: number) => (
            <span
              key={genre}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
            >
              {genreMapping[genre]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
