import PageTemplate from "../components/TemplateMovieListPage";

import type {
  DiscoverMovieOverviewProps,
} from "../types/movieAppTypes";

import { getMovies } from "../api/tmdb-api";

import { useQuery } from "@tanstack/react-query";

import Spinner from "../components/Spinner";

import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const HomePage = () => {
  const {
    data,
    error,
    isLoading,
    isError,
  } = useQuery<
    DiscoverMovieOverviewProps[],
    Error
  >({
    queryKey: ["discover"],
    queryFn: getMovies,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ?? [];

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => (
        <AddToFavoritesIcon movie={movie} />
      )}
    />
  );
};

export default HomePage;

