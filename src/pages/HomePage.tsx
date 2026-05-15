import { useState } from "react";

import PageTemplate from "../components/TemplateMovieListPage";

import type { DiscoverMovieOverviewProps } from "../types/movieAppTypes";

import { getMovies } from "../api/tmdb-api";

import { useQuery } from "@tanstack/react-query";

import Spinner from "../components/Spinner";
import Button from "@mui/material/Button";

import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const HomePage = () => {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isError } = useQuery<
    DiscoverMovieOverviewProps[],
    Error
  >({
    queryKey: ["discover", page],
    queryFn: () => getMovies(page),
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data ?? [];

  const addToFavourites = (movie: DiscoverMovieOverviewProps) => {
    return <AddToFavoritesIcon movie={movie} />;
  };

  return (
    <>
      <PageTemplate
        title={`Discover Movies - Page ${page}`}
        movies={movies}
        action={addToFavourites}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <Button
          variant="contained"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </Button>

        <Button variant="contained" onClick={() => setPage((prev) => prev + 1)}>
          Next
        </Button>
      </div>
    </>
  );
};

export default HomePage;
