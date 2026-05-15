import Movie from "./MovieCard";
import Grid from "@mui/material/Grid";

import type { BaseMovieListProps } from "../types/movieAppTypes";

const MovieList = ({ movies }: BaseMovieListProps) => {
  return (
    <>
      {movies.map((m) => (
        <Grid
          key={m.id}
          size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
        >
          <Movie movie={m} />
        </Grid>
      ))}
    </>
  );
};

export default MovieList;