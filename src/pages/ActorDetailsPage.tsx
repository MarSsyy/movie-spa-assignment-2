import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import Spinner from "../components/Spinner";
import {
  getPersonDetails,
  getPersonMovieCredits,
} from "../api/tmdb-api";

const ActorDetailsPage = () => {
  const { id } = useParams();

  const {
    data: actor,
    isLoading: actorLoading,
    isError: actorIsError,
    error: actorError,
  } = useQuery({
    queryKey: ["actor", id],
    queryFn: () => getPersonDetails(id ?? ""),
  });

  const {
    data: credits,
    isLoading: creditsLoading,
  } = useQuery({
    queryKey: ["actorCredits", id],
    queryFn: () => getPersonMovieCredits(id ?? ""),
  });

  if (actorLoading || creditsLoading) {
    return <Spinner />;
  }

  if (actorIsError) {
    return <h1>{(actorError as Error).message}</h1>;
  }

  const movies = credits?.cast?.slice(0, 8) ?? [];

  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardMedia
              component="img"
              image={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                  : "https://via.placeholder.com/500x750"
              }
              alt={actor.name}
            />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h3" gutterBottom>
            {actor.name}
          </Typography>

          <Typography variant="h6">
            Birthday: {actor.birthday ?? "Unknown"}
          </Typography>

          <Typography variant="h6">
            Known For: {actor.known_for_department ?? "Unknown"}
          </Typography>

          <Typography variant="body1" sx={{ mt: 3 }}>
            {actor.biography || "No biography available."}
          </Typography>

          <Typography variant="h4" sx={{ mt: 4 }}>
            Known Movie Credits
          </Typography>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            {movies.map((movie: any) => (
              <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={{ padding: 2 }}>
                  <Typography variant="h6">
                    {movie.title}
                  </Typography>

                  <Typography variant="body2">
                    Character: {movie.character || "N/A"}
                  </Typography>

                  <Link to={`/movies/${movie.id}`}>
                    <Button variant="outlined" sx={{ mt: 1 }}>
                      Movie Details
                    </Button>
                  </Link>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ActorDetailsPage;