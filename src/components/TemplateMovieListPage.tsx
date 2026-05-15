import { useState } from "react";

import Header from "./HeaderMovieList";
import FilterCard from "./FilterMoviesCard";
import MovieList from "./MovieList";

import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";

import type {
  MovieListPageTemplateProps,
  FilterOption,
} from "../types/movieAppTypes";

const styles = {
  root: {
    padding: "20px",
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 2,
    right: 2,
  },
};

const MovieListPageTemplate = ({
  movies,
  title,
}: MovieListPageTemplateProps) => {
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const genreId = Number(genreFilter);

  const displayedMovies = movies
    .filter((m) =>
      (m.title ?? "").toLowerCase().includes(titleFilter.toLowerCase())
    )
    .filter((m) =>
      genreId > 0 ? m.genre_ids?.includes(genreId) : true
    );

  const handleChange = (type: FilterOption, value: string) => {
    if (type === "title") setTitleFilter(value);
    else setGenreFilter(value);
  };

  return (
    <>
      <Grid container sx={styles.root}>
        <Grid size={12}>
          <Header title={title} />
        </Grid>

       <Grid container spacing={5} size={12}>
        <MovieList movies={displayedMovies} />
       </Grid>
      </Grid>

      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        Filter
      </Fab>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterCard
          onUserInput={handleChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
        />
      </Drawer>
    </>
  );
};

export default MovieListPageTemplate;