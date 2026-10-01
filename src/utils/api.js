import fallbackGames from "../data/fallbackGames";

const BASE_URL = "https://www.freetogame.com/api/games";

// FreeToGame blocks direct browser requests (CORS), so we go through a proxy,
// with a second proxy as a backup.
const PROXIES = [
  "https://corsproxy.io/?" + BASE_URL,
  "https://api.allorigins.win/raw?url=" + encodeURIComponent(BASE_URL),
];

let nextId = fallbackGames.length + 1;

// Fill in any missing fields so every card can render safely.
export function normalizeGame(game) {
  return {
    id: game.id || nextId++,
    title: game.title || "Untitled Game",
    thumbnail: game.thumbnail || "",
    short_description: game.short_description || "No description available.",
    genre: game.genre || "Unknown Genre",
    platform: game.platform || "Unknown Platform",
    release_date: game.release_date || "2000-01-01",
    game_url: game.game_url || "#",
  };
}

async function tryFetch(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error("Status " + response.status);
  const data = await response.json();
  if (!Array.isArray(data)) throw new Error("Response was not a game list.");
  return data;
}

// Returns { games, isLive }. Tries each proxy, then falls back to sample games.
export async function fetchGames() {
  for (const url of PROXIES) {
    try {
      const data = await tryFetch(url);
      return { games: data.slice(0, 24).map(normalizeGame), isLive: true };
    } catch (error) {
      console.warn("Proxy failed (" + error.message + "), trying the next option...");
    }
  }
  return { games: fallbackGames.map(normalizeGame), isLive: false };
}
