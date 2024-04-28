import { useState } from "react";
import { Input, SpinnerComponent } from "../../components";
import Card from "../../components/Card/Card";
import { useDebounce } from "../../hooks/useDebounce";
import { useFetchMovies } from "../../hooks/useFetch";
import { IMovieCard } from "../../types/Movie.types";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data: movies, loading, error } = useFetchMovies(debouncedSearchQuery);

  return (
    <div className="p-4 bg-background">
      <div className="m-4 lg:w-[30%] w-90">
        <Input
          config={{
            type: "text",
            name: "search",
            handleChange: (e) => setSearchQuery(e.target.value),
            required: false,
            value: searchQuery,
            placeholder: "Search movies...",
          }}
        />
      </div>

      {loading ? (
        <SpinnerComponent />
      ) : error ? (
        <div className="bg-background text-primary">
          {" "}
          Oops...there was an unexpected error
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
          {movies.map((movie: IMovieCard) => (
            <Card data={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
