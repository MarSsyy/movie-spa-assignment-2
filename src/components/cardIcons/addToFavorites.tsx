import { useContext, type MouseEvent } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { MoviesContext } from "../../contexts/moviesContext";
import type { DiscoverMovieOverviewProps } from "../../types/movieAppTypes";

type Props = {
  movie: DiscoverMovieOverviewProps;
};

const AddToFavoritesIcon = ({ movie }: Props) => {
  const { addToFavourites } = useContext(MoviesContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToFavourites(movie);
  };

  return (
    <IconButton aria-label="add to favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesIcon;