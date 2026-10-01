import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="details-message">
      <h2>Page not found</h2>
      <p>That page doesn't exist.</p>
      <Link to="/" className="game-link">Back to all games</Link>
    </section>
  );
}

export default NotFound;
