import { useContext, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";

import FavoriteIcon from "@mui/icons-material/Favorite";

import { Link } from "react-router-dom";

import Spinner from "../components/Spinner";

import { getPopularPeople } from "../api/tmdb-api";

import { ActorsContext } from "../contexts/actorsContext";

const ActorsPage = () => {
  const [page, setPage] = useState(1);

  const {
    favouriteActors,
    addFavouriteActor,
    removeFavouriteActor,
  } = useContext(ActorsContext);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["actors", page],
    queryFn: () => getPopularPeople(page),
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  const actors = data?.results ?? [];

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h3" gutterBottom>
        Popular Actors
      </Typography>

      <Grid container spacing={4}>
        {actors.map((actor: any) => {
          const isFavourite =
            favouriteActors.includes(actor.id);

          return (
            <Grid
              key={actor.id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
                lg: 3,
              }}
            >
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
                  <Typography variant="h5">
                    {actor.name}
                  </Typography>

                  <Typography variant="body2">
                    Popularity: {actor.popularity}
                  </Typography>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "10px",
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        if (isFavourite) {
                          removeFavouriteActor(actor.id);
                        } else {
                          addFavouriteActor(actor.id);
                        }
                      }}
                    >
                      <FavoriteIcon
                        color={
                          isFavourite
                            ? "error"
                            : "disabled"
                        }
                      />
                    </IconButton>

                    <Link to={`/actors/${actor.id}`}>
                      <Button variant="contained">
                        More Info
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        <Button
          variant="contained"
          disabled={page === 1}
          onClick={() =>
            setPage((prev) => prev - 1)
          }
        >
          Previous
        </Button>

        <Button
          variant="contained"
          onClick={() =>
            setPage((prev) => prev + 1)
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ActorsPage;