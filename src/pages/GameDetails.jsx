import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchGameDetails } from "../utils/api";
import { formatDate } from "../utils/games";

// FreeToGame descriptions sometimes contain HTML entities like &#039;.
// This turns them into normal characters (as plain text, never as HTML).
function decodeText(text) {
  return new DOMParser().parseFromString(text, "text/html").documentElement.textContent;
}

function toParagraphs(text) {
  return decodeText(text)
    .split(/\r?\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
}

const REQUIREMENT_LABELS = {
  os: "Operating system",
  processor: "Processor",
  memory: "Memory",
  graphics: "Graphics",
  storage: "Storage",
};

function DetailsSkeleton() {
  return (
    <div className="details-card" aria-hidden="true">
      <div className="skeleton details__hero-skeleton"></div>
      <div className="details-body">
        <div className="skeleton skeleton__title" style={{ width: "50%", height: "2rem" }}></div>
        <div className="game-meta">
          <div className="skeleton skeleton__pill"></div>
          <div className="skeleton skeleton__pill"></div>
        </div>
        <div className="skeleton skeleton__line"></div>
        <div className="skeleton skeleton__line"></div>
        <div className="skeleton skeleton__line skeleton__line--short"></div>
      </div>
    </div>
  );
}

function GameDetails({ games }) {
  const { id } = useParams();
  // Remembers which game the loaded details belong to, so when you open a
  // different game we know we're loading again.
  const [result, setResult] = useState({ id: null, details: null });
  const loading = result.id !== id;
  const details = loading ? null : result.details;

  // The short info we already have from the game list, used if the full
  // details can't be loaded.
  const basicGame = games.find((game) => String(game.id) === id);

  useEffect(() => {
    let cancelled = false;
    window.scrollTo(0, 0);
    fetchGameDetails(id).then((details) => {
      if (!cancelled) setResult({ id, details });
    });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const game = details || basicGame;

  useEffect(() => {
    document.title = game ? `${game.title} | Free Game Finder` : "Free Game Finder";
    return () => {
      document.title = "Free Game Finder";
    };
  }, [game]);

  const backLink = (
    <Link to="/" className="back-link">
      &larr; Back to all games
    </Link>
  );

  if (loading) {
    return (
      <section className="details" aria-busy="true">
        {backLink}
        <p className="status-message">Loading game details...</p>
        <DetailsSkeleton />
      </section>
    );
  }

  if (!game) {
    return (
      <section className="details-message">
        <h2>Game not found</h2>
        <p>We couldn't load this game. It may not exist, or the game service may be down.</p>
        <Link to="/" className="game-link">Back to all games</Link>
      </section>
    );
  }

  const paragraphs = toParagraphs(details?.description || game.short_description);
  const requirements = Object.entries(details?.requirements || {}).filter(
    ([key, value]) => REQUIREMENT_LABELS[key] && value
  );
  const facts = [
    ["Genre", game.genre],
    ["Platform", game.platform],
    ["Released", formatDate(game.release_date)],
    ["Publisher", details?.publisher],
    ["Developer", details?.developer],
    ["Status", details?.status],
  ].filter(([, value]) => value);

  return (
    <article className="details">
      {backLink}

      <div className="details-card">
        {game.thumbnail ? (
          <img className="details__hero" src={game.thumbnail} alt={game.title + " cover image"} />
        ) : (
          <div className="game-image details__hero">{game.title}</div>
        )}

        <div className="details-body">
          <h2 className="details__title">{game.title}</h2>
          {!details && (
            <p className="details__note">
              Full details are unavailable right now, so this is a short summary.
            </p>
          )}

          <dl className="details__facts">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <h3>About this game</h3>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="details__paragraph">{paragraph}</p>
          ))}

          {details?.screenshots.length > 0 && (
            <>
              <h3>Screenshots</h3>
              <div className="details__screenshots">
                {details.screenshots.slice(0, 3).map((shot) => (
                  <img
                    key={shot.id}
                    src={shot.image}
                    alt={`${game.title} screenshot`}
                    loading="lazy"
                  />
                ))}
              </div>
            </>
          )}

          {requirements.length > 0 && (
            <>
              <h3>Minimum system requirements</h3>
              <dl className="details__requirements">
                {requirements.map(([key, value]) => (
                  <div key={key}>
                    <dt>{REQUIREMENT_LABELS[key]}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </>
          )}

          <div className="details__actions">
            {game.game_url && game.game_url !== "#" && (
              <a className="game-link" href={game.game_url} target="_blank" rel="noopener noreferrer">
                Play Game (opens FreeToGame)
              </a>
            )}
            <Link to="/" className="button-secondary">Back to all games</Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default GameDetails;
