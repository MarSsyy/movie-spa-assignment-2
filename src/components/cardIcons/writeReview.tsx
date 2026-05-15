import RateReviewIcon from "@mui/icons-material/RateReview";
import type { DiscoverMovieOverviewProps } from "../../types/movieAppTypes";

type Props = {
  movie: DiscoverMovieOverviewProps;
};

const WriteReviewIcon = ({ movie }: Props) => {
  return <RateReviewIcon color="primary" fontSize="large" />;
};

export default WriteReviewIcon;