import React, { useState, useCallback } from "react";
import type { DiscoverMovieOverviewProps } from "../types/movieAppTypes";

type MovieContextInterface = {
  favourites: number[];
  addToFavourites: (movie: DiscoverMovieOverviewProps) => void;
  removeFromFavourites: (movie: DiscoverMovieOverviewProps) => void;
};

const initialContextState: MovieContextInterface = {
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
};

export const MoviesContext =
  React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favourites, setFavourites] = useState<number[]>([]);

  const addToFavourites = useCallback((movie: DiscoverMovieOverviewProps) => {
    setFavourites((prevFavourites) => {
      if (!prevFavourites.includes(movie.id)) {
        return [...prevFavourites, movie.id];
      }

      return prevFavourites;
    });
  }, []);

  const removeFromFavourites = useCallback(
    (movie: DiscoverMovieOverviewProps) => {
      setFavourites((prevFavourites) =>
        prevFavourites.filter((movieId) => movieId !== movie.id)
      );
    },
    []
  );

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
