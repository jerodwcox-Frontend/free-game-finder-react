# Free Game Finder (React)

A React version of [Free Game Finder](https://jerodwcox-frontend.github.io/final-project-API/). It loads free-to-play games from the [FreeToGame API](https://www.freetogame.com/api-doc), and lets you search by title, genre, platform or description and sort by release date or title. If the API can't be reached, it shows sample games instead.

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

The finished site goes into the `dist` folder. It works on Vercel (import the repo, no settings needed) or GitHub Pages.

## How it's organized

| File | What it does |
| --- | --- |
| `src/App.jsx` | The page: loads the games and holds the search and sort state |
| `src/components/Controls.jsx` | The search box and sort dropdown |
| `src/components/GameCard.jsx` | One game card, with a placeholder if the image fails |
| `src/utils/api.js` | Fetches games through a CORS proxy, with a backup proxy and sample-game fallback |
| `src/utils/games.js` | Search, sort and date-formatting helpers |
| `src/data/fallbackGames.js` | The 8 sample games |
| `src/index.css` | Styles (carried over from the original project) |
