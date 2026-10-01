// A grey placeholder card, shaped like a real game card, with a shimmer.
function SkeletonCard() {
  return (
    <article className="game-card game-card--skeleton" aria-hidden="true">
      <div className="skeleton skeleton__image"></div>
      <div className="game-content">
        <div className="skeleton skeleton__title"></div>
        <div className="skeleton skeleton__date"></div>
        <div className="skeleton skeleton__line"></div>
        <div className="skeleton skeleton__line skeleton__line--short"></div>
        <div className="game-meta">
          <div className="skeleton skeleton__pill"></div>
          <div className="skeleton skeleton__pill"></div>
        </div>
        <div className="skeleton skeleton__button"></div>
      </div>
    </article>
  );
}

export default SkeletonCard;
