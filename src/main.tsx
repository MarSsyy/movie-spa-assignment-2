import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MovieDetailsPage";
import FavouriteMoviesPage from "./pages/FavoriteMoviesPage";
import MovieReviewPage from "./pages/MovieReviewPage";

import SiteHeader from "./components/SiteHeader";

import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from "./pages/AddMovieReviewPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3600000,
      refetchInterval: 3600000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />

        <MoviesContextProvider>
          <Routes>
            <Route
              path="/movies/favourites"
              element={<FavouriteMoviesPage />}
            />

            <Route
              path="/movies/:id"
              element={<MoviePage />}
            />

            <Route 
            path="/reviews/form" element={<AddMovieReviewPage />} 
            />
            
            <Route
              path="/reviews/:id"
              element={<MovieReviewPage />}
            />

            <Route
              path="/"
              element={<HomePage />}
            />

            <Route
              path="*"
              element={<Navigate to="/" />}
            />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(
  document.getElementById("root")!
).render(<App />);