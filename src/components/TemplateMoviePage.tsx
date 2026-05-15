import type React from "react";

import MovieHeader from "./HeaderMovie";

import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

import { useQuery } from "@tanstack/react-query";

import { getMovieImages } from "../api/tmdb-api";
import type {
  MovieImage,
  MovieDetailsProps,
} from "../types/movieAppTypes";

import Spinner from "./Spinner";

const styles = {
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridListTile: {
    width: 450,
    height: "100vh",
  },
};

interface TemplateMoviePageProps {
  movie: MovieDetailsProps;
  children: React.ReactElement;
}

const TemplateMoviePage = ({
  movie,
  children,
}: TemplateMoviePageProps) => {
  const {
    data,
    error,
    isLoading,
    isError,
  } = useQuery<MovieImage[], Error>({
    queryKey: ["images", movie.id],
    queryFn: () => getMovieImages(movie.id),
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const images = data ?? [];

  return (
    <>
      <MovieHeader {...movie} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid size={3}>
          <ImageList cols={1}>
            {images.map((image) => (
              <ImageListItem
                key={image.file_path}
                sx={styles.gridListTile}
                cols={1}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                  alt="Movie poster"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>

        <Grid size={9}>{children}</Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;
