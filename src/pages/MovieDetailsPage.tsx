import { useParams } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";

import type { MovieDetailsProps } from "../types/movieAppTypes";

import { getMovie } from "../api/tmdb-api";

import MovieDetails from "../components/MovieDetails";
import PageTemplate from "../components/TemplateMoviePage";
import Spinner from "../components/Spinner";

const MovieDetailsPage = () => {
  const { id } = useParams();

  const {
    data: movie,
    error,
    isLoading,
    isError,
  } = useQuery<MovieDetailsProps, Error>({
    queryKey: ["movie", id],
    queryFn: () => getMovie(id || ""),
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <PageTemplate movie={movie}>
          <MovieDetails {...movie} />
        </PageTemplate>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MovieDetailsPage;

