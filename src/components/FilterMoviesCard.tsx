import { useQuery } from "@tanstack/react-query";

import type { ChangeEvent } from "react";
import type { SelectChangeEvent } from "@mui/material";

import { getGenres } from "../api/tmdb-api";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Spinner from "./Spinner";

const styles = {
  root: {
    maxWidth: 345,
  },
  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255,255,255)",
  },
};

interface FilterMoviesCardProps {
  onUserInput: (f: string, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  yearFilter: string;
  sortFilter: string;
}

type Genre = {
  id: number | string;
  name: string;
};

const FilterMoviesCard = ({
  titleFilter,
  genreFilter,
  yearFilter,
  sortFilter,
  onUserInput,
}: FilterMoviesCardProps) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  const apiGenres: Genre[] = Array.isArray(data) ? data : data?.genres ?? [];

  const genres: Genre[] = [{ id: "0", name: "All" }, ...apiGenres];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent,
    type: string,
    value: string
  ) => {
    e.preventDefault();
    onUserInput(type, value);
  };

  return (
    <>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5">
            <FilterAltIcon fontSize="large" />
            Filter Movies
          </Typography>

          <TextField
            sx={styles.formControl}
            label="Search Title"
            variant="filled"
            value={titleFilter}
            onChange={(e) => handleChange(e, "title", e.target.value)}
          />

          <FormControl sx={styles.formControl}>
            <InputLabel>Genre</InputLabel>

            <Select
              value={genreFilter}
              onChange={(e) => handleChange(e, "genre", e.target.value)}
            >
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={String(genre.id)}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            sx={styles.formControl}
            label="Release Year"
            variant="filled"
            value={yearFilter}
            onChange={(e) => handleChange(e, "year", e.target.value)}
          />
        </CardContent>
      </Card>

      <Card sx={{ ...styles.root, marginTop: 2 }} variant="outlined">
        <CardContent>
          <Typography variant="h5">
            <SortIcon fontSize="large" />
            Sort Movies
          </Typography>

          <FormControl sx={styles.formControl}>
            <InputLabel>Sort By</InputLabel>

            <Select
              value={sortFilter}
              onChange={(e) => handleChange(e, "sort", e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
              <MenuItem value="release">Release Date</MenuItem>
              <MenuItem value="title">Title</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterMoviesCard;
