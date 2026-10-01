import { useMemo } from "react";
import Controls from "../components/Controls";
import GameCard from "../components/GameCard";
import SkeletonCard from "../components/SkeletonCard";
import { filterGames, sortGames } from "../utils/games";

const SKELETON_COUNT = 8;

// The main page: search, sort, and the grid of game cards.
// The games and the search/sort choices live in App, so they're kept
// when you open a game's details page and come back.
function Home({ games, loading, status, search, onSearchChange, sortType, onSortChange }) {
  const visibleGames = useMemo(
    () => sortGames(filterGames(games, search), sortType),
    [games, search, sortType]
  );

  const keyword = search.trim();

  return (
    <>
      <section className="project-intro">
        <h2>Project Overview</h2>
        <p>
          This app fetches real free-to-play games from the FreeToGame public API and lets you
          search and sort them. Click any game to see its details. If the API is unavailable,
          sample games are shown automatically.
        </p>
      </section>

      <Controls
        search={search}
        onSearchChange={onSearchChange}
        sortType={sortType}
        onSortChange={onSortChange}
      />

      <p className="status-message">{status}</p>

      <section className="game-grid" aria-live="polite" aria-busy={loading}>
        {loading ? (
          Array.from({ length: SKELETON_COUNT }, (_, index) => <SkeletonCard key={index} />)
        ) : visibleGames.length === 0 && keyword ? (
          <p className="no-results">No games found for "{keyword}". Try a different search.</p>
        ) : (
          visibleGames.map((game) => <GameCard game={game} key={game.id} />)
        )}
      </section>
    </>
  );
}

export default Home;
