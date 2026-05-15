import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

type FantasyMovie = {
  title: string;
  overview: string;
  genres: string;
  releaseDate: string;
  runtime: string;
  productionCompanies: string;
};

const FantasyMoviePage = () => {
  const [movie, setMovie] = useState<FantasyMovie>({
    title: "",
    overview: "",
    genres: "",
    releaseDate: "",
    runtime: "",
    productionCompanies: "",
  });

  const [savedMovie, setSavedMovie] = useState<FantasyMovie | null>(null);

  const handleChange = (field: keyof FantasyMovie, value: string) => {
    setMovie((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    localStorage.setItem("fantasyMovie", JSON.stringify(movie));
    setSavedMovie(movie);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h3" gutterBottom>
        My Fantasy Movie
      </Typography>

      <Paper sx={{ padding: 3, maxWidth: 700 }}>
        <TextField
          fullWidth
          label="Title"
          margin="normal"
          value={movie.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />

        <TextField
          fullWidth
          label="Overview"
          margin="normal"
          multiline
          minRows={4}
          value={movie.overview}
          onChange={(e) => handleChange("overview", e.target.value)}
        />

        <TextField
          fullWidth
          label="Genres"
          margin="normal"
          placeholder="Action, Drama, Sci-Fi"
          value={movie.genres}
          onChange={(e) => handleChange("genres", e.target.value)}
        />

       <TextField
        fullWidth
        type="date"
        margin="normal"
        value={movie.releaseDate}
        onChange={(e) =>
        handleChange("releaseDate", e.target.value)
        }
        />

        <TextField
          fullWidth
          label="Runtime"
          margin="normal"
          placeholder="120"
          value={movie.runtime}
          onChange={(e) => handleChange("runtime", e.target.value)}
        />

        <TextField
          fullWidth
          label="Production Company(s)"
          margin="normal"
          value={movie.productionCompanies}
          onChange={(e) =>
            handleChange("productionCompanies", e.target.value)
          }
        />

        <Button variant="contained" sx={{ mt: 2 }} onClick={handleSubmit}>
          Save Fantasy Movie
        </Button>
      </Paper>

      {savedMovie && (
        <Paper sx={{ padding: 3, maxWidth: 700, mt: 3 }}>
          <Typography variant="h4">Saved Fantasy Movie</Typography>
          <Typography>Title: {savedMovie.title}</Typography>
          <Typography>Overview: {savedMovie.overview}</Typography>
          <Typography>Genres: {savedMovie.genres}</Typography>
          <Typography>Release Date: {savedMovie.releaseDate}</Typography>
          <Typography>Runtime: {savedMovie.runtime} minutes</Typography>
          <Typography>
            Production Company(s): {savedMovie.productionCompanies}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default FantasyMoviePage;