import { useState } from "react";

import Header from "./HeaderMovieList";
import FilterCard from "./FilterMoviesCard";
import MovieList from "./MovieList";

import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";

import type {
  MovieListPageTemplateProps,
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
  action,
}: MovieListPageTemplateProps) => {
  const [titleFilter, setTitleFilter] =
    useState("");

  const [genreFilter, setGenreFilter] =
    useState("0");

  const [yearFilter, setYearFilter] =
    useState("");

  const [sortFilter, setSortFilter] =
    useState("");

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const genreId = Number(genreFilter);

  let displayedMovies = movies
    .filter((m) =>
      (m.title ?? "")
        .toLowerCase()
        .includes(titleFilter.toLowerCase())
    )
    .filter((m) =>
      genreId > 0
        ? m.genre_ids?.includes(genreId)
        : true
    )
    .filter((m) =>
      yearFilter
        ? m.release_date?.startsWith(
            yearFilter
          )
        : true
    );

  if (sortFilter === "rating") {
    displayedMovies = [
      ...displayedMovies,
    ].sort(
      (a, b) =>
        (b.vote_average ?? 0) -
        (a.vote_average ?? 0)
    );
  }

  if (sortFilter === "release") {
    displayedMovies = [
      ...displayedMovies,
    ].sort((a, b) =>
      (b.release_date ?? "").localeCompare(
        a.release_date ?? ""
      )
    );
  }

  if (sortFilter === "title") {
    displayedMovies = [
      ...displayedMovies,
    ].sort((a, b) =>
      (a.title ?? "").localeCompare(
        b.title ?? ""
      )
    );
  }

  const handleChange = (
    type: string,
    value: string
  ) => {
    if (type === "title") {
      setTitleFilter(value);
    }

    else if (type === "genre") {
      setGenreFilter(value);
    }

    else if (type === "year") {
      setYearFilter(value);
    }

    else if (type === "sort") {
      setSortFilter(value);
    }
  };

  return (
    <>
      <Grid container sx={styles.root}>
        <Grid size={12}>
          <Header title={title} />
        </Grid>

        <Grid container spacing={5} size={12}>
          <MovieList
            movies={displayedMovies}
            action={action}
          />
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
          yearFilter={yearFilter}
          sortFilter={sortFilter}
        />
      </Drawer>
    </>
  );
};

export default MovieListPageTemplate;