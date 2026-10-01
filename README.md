# Free Game Finder (React)

**Live site:** https://free-game-finder-react.vercel.app

A React version of [Free Game Finder](https://jerodwcox-frontend.github.io/final-project-API/). It loads free-to-play games from the [FreeToGame API](https://www.freetogame.com/api-doc), and lets you search by title, genre, platform or description and sort by release date or title. Clicking a game opens its own details page inside the app. If the API can't be reached, it shows sample games instead.

## Pages (React Router)

| Route | Page |
| --- | --- |
| `/` | All games, with search, sort and skeleton loading cards |
| `/games/:id` | One game's details: cover, description, publisher and developer, screenshots, system requirements, and a link to play it |
| anything else | "Page not found" |

Each game card's image, title and **View Details** button link to `/games/:id`. The search and sort choices are kept when you go back.

## Run it

```bash
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173).

## Build for hosting

```bash
npm run build
```

The finished site goes into the `dist` folder. It's deployed on Vercel, which rebuilds automatically on every push to `main`. `vercel.json` forwards `/api/...` requests to FreeToGame (avoiding CORS) and sends every other path to `index.html`, so links like `/games/540` work when opened directly or refreshed.

## How it's organized

| File | What it does |
| --- | --- |
| `src/main.jsx` | Starts the app inside React Router's `BrowserRouter` |
| `src/App.jsx` | Header, footer and routes; loads the games and holds the search and sort state |
| `src/pages/Home.jsx` | The main page: overview, search and sort, and the game grid |
| `src/pages/GameDetails.jsx` | The details page for one game (`/games/:id`) |
| `src/pages/NotFound.jsx` | Shown for any unknown address |
| `src/components/Controls.jsx` | The search box and sort dropdown |
| `src/components/GameCard.jsx` | One game card, linking to its details page |
| `src/components/SkeletonCard.jsx` | The shimmering placeholder card shown while games load |
| `src/utils/api.js` | Fetches the game list and single-game details (through Vercel, with proxy and sample-game fallbacks) and preloads cover images so every card appears at once |
| `src/utils/games.js` | Search, sort and date-formatting helpers |
| `src/data/fallbackGames.js` | The 8 sample games |
| `src/index.css` | Styles |
| `vercel.json` | API forwarding and page routing on Vercel |
