import React, { useState } from "react";
import { Button, Input, SpinnerComponent } from "../../components";
import Card from "../../components/Card/Card";
import { useDebounce } from "../../hooks/useDebounce";
import { useFetchMovies } from "../../hooks/useFetch";
import { IMovieCard } from "../../types/Movie.types";
import { genreMapping } from "../../utils/movieGenres";

const Home = () => {
  const initialFilters = JSON.parse(
    localStorage.getItem("movieFilters") || "{}"
  );
  const [searchQuery, setSearchQuery] = useState<{
    title: string;
    year: number | null;
    genre: number | null;
  }>(initialFilters);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { data: movies, loading, error } = useFetchMovies(debouncedSearchQuery);

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchQuery((prev) => ({
      ...prev,
      [name]:
        name === "year" || name === "genre"
          ? parseInt(value, 10) || null
          : value,
    }));
  };

  const handleSelectQuery = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFilters = {
      ...searchQuery,
      [name]: parseInt(value) || null,
    };
    setSearchQuery(updatedFilters);
    localStorage.setItem("movieFilters", JSON.stringify(updatedFilters));
  };

  const handleClearFilters = () => {
    localStorage.removeItem("movieFilters");
    setSearchQuery({ title: "", year: null, genre: null });
  };

  return (
    <div className="p-4 bg-background">
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 mb-4 justify-start items-center">
        <Input
          config={{
            type: "text",
            name: "title",
            value: searchQuery.title,
            handleChange: handleQuery,
            required: false,
            placeholder: "Search by title",
          }}
        />
        <Input
          config={{
            type: "number",
            name: "year",
            value: searchQuery.year?.toString(),
            handleChange: handleQuery,
            required: false,
            placeholder: "Search by release year",
          }}
        />
        <div className="mt-2">
          <select
            value={searchQuery.genre?.toString() || ""}
            onChange={handleSelectQuery}
            name="genre"
            className="block w-full rounded-md border-0 py-1.5 px-1.5 text-background shadow-sm sm:text-sm sm:leading-6 h-[36px]"
          >
            <option value="" className="text-text">
              Search by genre
            </option>
            {Object.keys(genreMapping).map((key) => (
              <option key={key} value={key}>
                {genreMapping[parseInt(key)]}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-2">
          <Button
            onClick={handleClearFilters}
            type="button"
            text="Reset"
            variant="secondary"
          />
        </div>
      </div>

      {loading ? (
        <SpinnerComponent />
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {movies.map((movie: IMovieCard) => (
            <Card data={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
