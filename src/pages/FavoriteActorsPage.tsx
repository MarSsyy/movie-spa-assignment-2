import { useContext } from "react";
import { useQueries } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Spinner from "../components/Spinner";
import { ActorsContext } from "../contexts/actorsContext";
import { getPersonDetails } from "../api/tmdb-api";

const FavoriteActorsPage = () => {
  const { favouriteActors } = useContext(ActorsContext);

  const actorQueries = useQueries({
    queries: favouriteActors.map((actorId) => ({
      queryKey: ["actor", actorId],
      queryFn: () => getPersonDetails(actorId),
    })),
  });

  const isLoading = actorQueries.some((q) => q.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  const actors = actorQueries.map((q) => q.data).filter(Boolean);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h3" gutterBottom>
        Favourite Actors
      </Typography>

      {actors.length === 0 && (
        <Typography variant="h6">
          No favourite actors selected yet.
        </Typography>
      )}

      <Grid container spacing={4}>
        {actors.map((actor: any) => (
          <Grid key={actor.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : "https://via.placeholder.com/500x750"
                }
              />

              <CardContent>
                <Typography variant="h5">{actor.name}</Typography>

                <Typography variant="body2">
                  Known for: {actor.known_for_department ?? "Unknown"}
                </Typography>

                <Link to={`/actors/${actor.id}`}>
                  <Button variant="contained" sx={{ mt: 2 }}>
                    More Info
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default FavoriteActorsPage;