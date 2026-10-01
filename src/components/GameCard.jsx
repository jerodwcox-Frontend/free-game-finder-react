import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/games";

function GameCard({ game }) {
  // If the cover image fails to load, show a gradient placeholder instead.
  const [imageFailed, setImageFailed] = useState(!game.thumbnail);
  const detailsPath = `/games/${game.id}`;

  return (
    <article className="game-card game-card--loaded">
      <Link to={detailsPath} tabIndex={-1} aria-hidden="true" className="game-card__image-link">
        {imageFailed ? (
          <div className="game-image">{game.title}</div>
        ) : (
          <img
            src={game.thumbnail}
            alt=""
            width="460"
            height="215"
            onError={() => setImageFailed(true)}
          />
        )}
      </Link>

      <div className="game-content">
        <h2>
          <Link to={detailsPath} className="game-title-link">{game.title}</Link>
        </h2>
        <p className="game-date">Released: {formatDate(game.release_date)}</p>
        <p className="game-description">{game.short_description}</p>
        <div className="game-meta">
          <span className="pill">{game.genre}</span>
          <span className="pill">{game.platform}</span>
        </div>
        <Link to={detailsPath} className="game-link">
          View Details
        </Link>
      </div>
    </article>
  );
}

export default GameCard;
