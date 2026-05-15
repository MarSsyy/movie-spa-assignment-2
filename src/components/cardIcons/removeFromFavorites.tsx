import { useContext, type MouseEvent } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { MoviesContext } from "../../contexts/moviesContext";
import type { DiscoverMovieOverviewProps } from "../../types/movieAppTypes";

type Props = {
  movie: DiscoverMovieOverviewProps;
};

const RemoveFromFavoritesIcon = ({ movie }: Props) => {
  const { removeFromFavourites } = useContext(MoviesContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeFromFavourites(movie);
  };

  return (
    <IconButton aria-label="remove from favorites" onClick={onUserRequest}>
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavoritesIcon;