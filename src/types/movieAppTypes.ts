// src/types/tmdb.ts

import type { paths } from "./generated/tmdb";

export type DiscoverMoviesProps =
  paths["/3/discover/movie"]["get"]["responses"][200]["content"]["application/json"];

export type DiscoverMovieOverviewProps =
  NonNullable<DiscoverMoviesProps["results"]>[number] & {
    favourite?: boolean;
  };

export type BaseMovieListProps = {
  movies: DiscoverMovieOverviewProps[];
  selectFavourite: (movieId: number) => void;
};

export type MovieDetailsProps =
  paths["/3/movie/{movie_id}"]["get"]["responses"][200]["content"]["application/json"] & {
    favourite?: boolean;
  };

export type MovieImage = {
  file_path: string;
  aspect_ratio?: number;
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
};

export type MoviePageProps = {
  movie: MovieDetailsProps;
  images: MovieImage[];
};

export type FilterOption = "title" | "genre";

