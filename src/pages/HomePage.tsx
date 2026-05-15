import { useState, useEffect } from "react";
import PageTemplate from "../components/TemplateMovieListPage";
import type { DiscoverMovieOverviewProps } from "../types/movieAppTypes";

const HomePage = () => {
  const [movies, setMovies] = useState<DiscoverMovieOverviewProps[]>([]);

  const favourites = movies.filter((m) => m.favourite);
  localStorage.setItem("favourites", JSON.stringify(favourites));

  const addToFavourites = (movieId: number) => {
    const updatedMovies = movies.map((m: DiscoverMovieOverviewProps) =>
      m.id === movieId ? { ...m, favourite: true } : m
    );

    setMovies(updatedMovies);
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        import.meta.env.VITE_TMDB_KEY
      }&language=en-US&include_adult=false&page=1`
    )
      .then((res) => res.json())
      .then((json) => json.results)
      .then((movies) => {
        setMovies(movies);
      });
  }, []);

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      selectFavourite={addToFavourites}
    />
  );
};

export default HomePage;

