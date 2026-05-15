import React, { useCallback, useState } from "react";

type ActorsContextInterface = {
  favouriteActors: number[];
  addFavouriteActor: (actorId: number) => void;
  removeFavouriteActor: (actorId: number) => void;
};

const initialContextState: ActorsContextInterface = {
  favouriteActors: [],
  addFavouriteActor: () => {},
  removeFavouriteActor: () => {},
};

export const ActorsContext =
  React.createContext<ActorsContextInterface>(initialContextState);

const ActorsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [favouriteActors, setFavouriteActors] = useState<number[]>([]);

  const addFavouriteActor = useCallback((actorId: number) => {
    setFavouriteActors((prev) => {
      if (!prev.includes(actorId)) {
        return [...prev, actorId];
      }

      return prev;
    });
  }, []);

  const removeFavouriteActor = useCallback((actorId: number) => {
    setFavouriteActors((prev) => prev.filter((id) => id !== actorId));
  }, []);

  return (
    <ActorsContext.Provider
      value={{
        favouriteActors,
        addFavouriteActor,
        removeFavouriteActor,
      }}
    >
      {children}
    </ActorsContext.Provider>
  );
};

export default ActorsContextProvider;