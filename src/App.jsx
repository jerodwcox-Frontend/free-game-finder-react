import { useEffect, useMemo, useState } from "react";
import Controls from "./components/Controls";
import GameCard from "./components/GameCard";
import SkeletonCard from "./components/SkeletonCard";
import { fetchGames, preloadImages } from "./utils/api";
import { filterGames, sortGames } from "./utils/games";

const SKELETON_COUNT = 8;

function App() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Loading games...");
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("newest");

  // Load the games once when the page opens. Skeleton cards show until the
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

  // Re-filter and re-sort whenever the games, search, or sort choice change.
  const visibleGames = useMemo(
    () => sortGames(filterGames(games, search), sortType),
    [games, search, sortType]
  );

  const keyword = search.trim();

  return (
    <>
      <header>
        <h1>Free Game Finder</h1>
        <p>Browse free-to-play games fetched live from the FreeToGame API.</p>
      </header>

      <main>
        <section className="project-intro">
          <h2>Project Overview</h2>
          <p>
            This app fetches real free-to-play games from the FreeToGame public API and lets you
            search and sort them. If the API is unavailable, sample games are shown automatically.
          </p>
        </section>

        <Controls
          search={search}
          onSearchChange={setSearch}
          sortType={sortType}
          onSortChange={setSortType}
        />

        <p className="status-message">{status}</p>

        <section className="game-grid" aria-live="polite" aria-busy={loading}>
          {loading ? (
            Array.from({ length: SKELETON_COUNT }, (_, index) => <SkeletonCard key={index} />)
          ) : visibleGames.length === 0 && keyword ? (
            <p className="no-results">
              No games found for "{keyword}". Try a different search.
            </p>
          ) : (
            visibleGames.map((game) => <GameCard game={game} key={game.id} />)
          )}
        </section>
      </main>

      <footer>
        <p>&copy; 2026 Free Game Finder. Built with React.</p>
      </footer>
    </>
  );
}

export default App;
