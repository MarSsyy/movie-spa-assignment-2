import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router-dom";

import type { DiscoverMovieOverviewProps } from "../../types/movieAppTypes";

type Props = {
  movie: DiscoverMovieOverviewProps;
};

const WriteReviewIcon = ({ movie }: Props) => {
  return (
    <Link
      to="/reviews/form"
      state={{
        movieId: movie.id,
      }}
    >
      <RateReviewIcon color="primary" fontSize="large" />
    </Link>
  );
};

export default WriteReviewIcon;