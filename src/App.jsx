import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { fetchGames, preloadImages } from "./utils/api";
import Home from "./pages/Home";
import GameDetails from "./pages/GameDetails";
import NotFound from "./pages/NotFound";

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Loading games...");
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("newest");

  // Load the games once when the app opens. Skeleton cards show until the
  // game list AND all the cover images are ready, then everything appears at once.
  useEffect(() => {
    let cancelled = false;
    async function load() {
      const { games, isLive } = await fetchGames();
      await preloadImages(games.map((game) => game.thumbnail));
      if (cancelled) return;
      setGames(games);
      setLoading(false);
      setStatus(
        isLive
          ? `Showing ${games.length} live games from the FreeToGame API.`
          : `Showing ${games.length} sample games (live API unavailable).`
      );
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <header>
        <h1>
          <Link to="/" className="header-link">Free Game Finder</Link>
        </h1>
        <p>Browse free-to-play games fetched live from the FreeToGame API.</p>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                games={games}
                loading={loading}
                status={status}
                search={search}
                onSearchChange={setSearch}
                sortType={sortType}
                onSortChange={setSortType}
              />
            }
          />
          <Route path="/games/:id" element={<GameDetails games={games} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer>
        <p>&copy; 2026 Free Game Finder. Built with React.</p>
      </footer>
    </>
  );
}

export default App;
