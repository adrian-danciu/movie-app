import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import { fetchMovieById } from "../../hooks/useFetch"; // Assuming you have this function
import { useUserContext } from "../../providers/UserProvider";
import { IMovieDetails } from "../../types/Movie.types";

const Favorites = () => {
  const { currentUser } = useUserContext();
  const [favoriteMovies, setFavoriteMovies] = useState<IMovieDetails[]>([]);

  useEffect(() => {
    if (currentUser && currentUser.favorites.length > 0) {
      const fetchFavorites = async () => {
        const promises = currentUser.favorites.map((id) => fetchMovieById(id));
        const results = await Promise.all(promises);
        setFavoriteMovies(results as IMovieDetails[]);
      };
      fetchFavorites();
    } else {
      setFavoriteMovies([]);
    }
  }, [currentUser?.favorites]);

  return (
    <div className="p-4 bg-background min-h-screen">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favoriteMovies.length === 0 && (
          <h1 className="text-2xl text-center text-primary">
            You have no favorite movies
          </h1>
        )}
        {favoriteMovies.map((movie, index) => (
          <Card key={index} data={movie} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
