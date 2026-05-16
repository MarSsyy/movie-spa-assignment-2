import React, {
  useState,
  useCallback,
} from "react";

import type {
  DiscoverMovieOverviewProps,
  Review,
} from "../types/movieAppTypes";

type MovieContextInterface = {
  favourites: number[];

  addToFavourites: (
    movie: DiscoverMovieOverviewProps
  ) => void;

  removeFromFavourites: (
    movie: DiscoverMovieOverviewProps
  ) => void;

  addReview: (
    movie: DiscoverMovieOverviewProps,
    review: Review
  ) => void;
};

const initialContextState: MovieContextInterface = {
  favourites: [],

  addToFavourites: () => {},

  removeFromFavourites: () => {},

  addReview: () => {},
};

export const MoviesContext =
  React.createContext<MovieContextInterface>(
    initialContextState
  );

const MoviesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favourites, setFavourites] =
    useState<number[]>([]);

  const [, setReviews] = useState<
    Review[]
  >([]);

  const addToFavourites = useCallback(
    (movie: DiscoverMovieOverviewProps) => {
      setFavourites((prevFavourites) => {
        if (
          !prevFavourites.includes(movie.id)
        ) {
          return [
            ...prevFavourites,
            movie.id,
          ];
        }

        return prevFavourites;
      });
    },
    []
  );

  const removeFromFavourites =
    useCallback(
      (
        movie: DiscoverMovieOverviewProps
      ) => {
        setFavourites(
          (prevFavourites) =>
            prevFavourites.filter(
              (movieId) =>
                movieId !== movie.id
            )
        );
      },
      []
    );

  const addReview = (
    movie: DiscoverMovieOverviewProps,
    review: Review
  ) => {
    setReviews((prevReviews) => [
      ...prevReviews,
      review,
    ]);

    console.log(movie.title, review);
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        addReview,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;