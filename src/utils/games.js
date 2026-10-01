export function filterGames(games, keyword) {
  const term = keyword.trim().toLowerCase();
  if (!term) return games;
  return games.filter(
    (game) =>
      game.title.toLowerCase().includes(term) ||
      game.genre.toLowerCase().includes(term) ||
      game.platform.toLowerCase().includes(term) ||
      game.short_description.toLowerCase().includes(term)
  );
}

export function sortGames(games, sortType) {
  const sorted = [...games];
  switch (sortType) {
    case "az":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "za":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case "newest":
      return sorted.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    case "oldest":
      return sorted.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
    default:
      return sorted;
  }
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Unknown release date";
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
