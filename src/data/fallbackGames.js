// Sample games shown when the live FreeToGame API can't be reached.
const fallbackGames = [
  { id: 1, title: "Apex Legends", thumbnail: "https://www.freetogame.com/g/23/thumbnail.jpg", short_description: "A fast-paced battle royale game with team-based heroes.", genre: "Shooter", platform: "PC", release_date: "2019-02-04", game_url: "https://www.freetogame.com/open/apex-legends" },
  { id: 2, title: "Dauntless", thumbnail: "https://www.freetogame.com/g/1/thumbnail.jpg", short_description: "A cooperative action RPG where players hunt massive creatures.", genre: "MMORPG", platform: "PC", release_date: "2019-05-21", game_url: "https://www.freetogame.com/open/dauntless" },
  { id: 3, title: "Fortnite", thumbnail: "https://www.freetogame.com/g/57/thumbnail.jpg", short_description: "A popular survival and battle royale game with building mechanics.", genre: "Battle Royale", platform: "PC", release_date: "2017-07-21", game_url: "https://www.freetogame.com/open/fortnite" },
  { id: 4, title: "Genshin Impact", thumbnail: "https://www.freetogame.com/g/475/thumbnail.jpg", short_description: "An open-world action RPG with exploration and character collecting.", genre: "Action RPG", platform: "PC", release_date: "2020-09-28", game_url: "https://www.freetogame.com/open/genshin-impact" },
  { id: 5, title: "League of Legends", thumbnail: "https://www.freetogame.com/g/286/thumbnail.jpg", short_description: "A competitive MOBA game with strategic team combat.", genre: "MOBA", platform: "PC", release_date: "2009-10-27", game_url: "https://www.freetogame.com/open/league-of-legends" },
  { id: 6, title: "Overwatch 2", thumbnail: "https://www.freetogame.com/g/540/thumbnail.jpg", short_description: "A team-based hero shooter focused on objectives and coordination.", genre: "Shooter", platform: "PC", release_date: "2022-10-04", game_url: "https://www.freetogame.com/open/overwatch-2" },
  { id: 7, title: "Path of Exile", thumbnail: "https://www.freetogame.com/g/400/thumbnail.jpg", short_description: "A dark fantasy action RPG with deep character customization.", genre: "Action RPG", platform: "PC", release_date: "2013-10-23", game_url: "https://www.freetogame.com/open/path-of-exile" },
  { id: 8, title: "Rocket League", thumbnail: "https://www.freetogame.com/g/474/thumbnail.jpg", short_description: "A high-energy sports game where players use cars to play soccer.", genre: "Sports", platform: "PC", release_date: "2020-09-23", game_url: "https://www.freetogame.com/open/rocket-league" },
];

export default fallbackGames;
