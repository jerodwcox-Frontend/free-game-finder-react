import { useState } from "react";
import { formatDate } from "../utils/games";

function GameCard({ game }) {
  // If the cover image fails to load, show a gradient placeholder instead.
  const [imageFailed, setImageFailed] = useState(!game.thumbnail);

  return (
    <article className="game-card game-card--loaded">
      {imageFailed ? (
        <div className="game-image" role="img" aria-label={game.title + " cover placeholder"}>
          {game.title}
        </div>
      ) : (
        <img
          src={game.thumbnail}
          alt={game.title + " cover image"}
          width="460"
          height="215"
          onError={() => setImageFailed(true)}
        />
      )}

      <div className="game-content">
        <h2>{game.title}</h2>
        <p className="game-date">Released: {formatDate(game.release_date)}</p>
        <p className="game-description">{game.short_description}</p>
        <div className="game-meta">
          <span className="pill">{game.genre}</span>
          <span className="pill">{game.platform}</span>
        </div>
        <a className="game-link" href={game.game_url} target="_blank" rel="noopener noreferrer">
          View Game
        </a>
      </div>
    </article>
  );
}

export default GameCard;
