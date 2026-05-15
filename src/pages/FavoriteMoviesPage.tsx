import { useContext } from "react";

import { useQueries } from "@tanstack/react-query";

import PageTemplate from "../components/TemplateMovieListPage";

import { MoviesContext } from "../contexts/moviesContext";

import { getMovie } from "../api/tmdb-api";

import Spinner from "../components/Spinner";

import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const { favourites: movieIds } =
    useContext(MoviesContext);

  const favouriteMovieQueries = useQueries({
    queries: movieIds.map((movieId) => ({
      queryKey: ["movie", movieId],
      queryFn: () =>
        getMovie(movieId.toString()),
    })),
  });

  const isLoading = favouriteMovieQueries.find(
    (m) => m.isLoading === true
  );

  if (isLoading) {
    return <Spinner />;
  }

  const movies = favouriteMovieQueries
    .map((q) => q.data)
    .filter(Boolean);

  return (
    <PageTemplate
      title="Favourite Movies"
      movies={movies}
      action={(movie) => (
        <>
          <RemoveFromFavorites movie={movie} />
          <WriteReview movie={movie} />
        </>
      )}
    />
  );
};

export default FavoriteMoviesPage;