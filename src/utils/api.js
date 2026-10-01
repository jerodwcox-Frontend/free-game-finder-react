import fallbackGames from "../data/fallbackGames";

const API_ROOT = "https://www.freetogame.com/api";

// FreeToGame blocks direct browser requests (CORS). On Vercel, "/api/..."
// is forwarded to FreeToGame by vercel.json (and by Vite's dev server when
// running locally), so it's same-origin and reliable. The public proxies
// are backups.
function sourcesFor(path) {
  const url = API_ROOT + path;
  return [
    "/api" + path,
    "https://corsproxy.io/?" + url,
    "https://api.allorigins.win/raw?url=" + encodeURIComponent(url),
  ];
}

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

// Tries each source in order and returns the first response that passes
// `isValid`. Each source gets 5 seconds so the page never hangs.
async function fetchFirstWorking(sources, isValid) {
  for (const url of sources) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
      if (!response.ok) throw new Error("Status " + response.status);
      const data = await response.json();
      if (!isValid(data)) throw new Error("Unexpected response.");
      return data;
    } catch (error) {
      console.warn("Source failed (" + error.message + "), trying the next option...");
    }
  }
  return null;
}

// Returns { games, isLive }. Falls back to sample games if every source fails.
export async function fetchGames() {
  const data = await fetchFirstWorking(sourcesFor("/games"), Array.isArray);
  if (data) return { games: data.slice(0, 24).map(normalizeGame), isLive: true };
  return { games: fallbackGames.map(normalizeGame), isLive: false };
}

// Returns the full details for one game (description, publisher, system
// requirements, screenshots), or null if they can't be loaded.
export async function fetchGameDetails(id) {
  const data = await fetchFirstWorking(
    sourcesFor("/game?id=" + encodeURIComponent(id)),
    (game) => game && typeof game === "object" && game.title
  );
  if (!data) return null;
  return {
    ...normalizeGame(data),
    description: data.description || "",
    publisher: data.publisher || "",
    developer: data.developer || "",
    status: data.status || "",
    requirements: data.minimum_system_requirements || null,
    screenshots: Array.isArray(data.screenshots) ? data.screenshots : [],
  };
}

// Download every cover image before showing the cards, so they all appear
// together instead of popping in one at a time. Broken images count as done
// (the card shows a placeholder), and we stop waiting after `timeoutMs`.
export function preloadImages(urls, timeoutMs = 6000) {
  const loads = urls.filter(Boolean).map(
    (url) =>
      new Promise((resolve) => {
        const image = new Image();
        image.onload = resolve;
        image.onerror = resolve;
        image.src = url;
      })
  );
  const timeout = new Promise((resolve) => setTimeout(resolve, timeoutMs));
  return Promise.race([Promise.all(loads), timeout]);
}
