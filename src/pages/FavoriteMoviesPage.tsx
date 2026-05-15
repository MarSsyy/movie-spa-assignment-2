import PageTemplate from "../components/TemplateMovieListPage";

const FavoriteMoviesPage = () => {
  const toDo = () => true;

  const movies = JSON.parse(
    localStorage.getItem("favourites") || "[]"
  );

  return (
    <PageTemplate
      title="Favourite Movies"
      movies={movies}
      selectFavourite={toDo}
    />
  );
};

export default FavoriteMoviesPage;