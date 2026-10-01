function Controls({ search, onSearchChange, sortType, onSortChange }) {
  return (
    <section className="controls" aria-label="Search and sort controls">
      <div className="search-group">
        <label htmlFor="searchInput">Search:</label>
        <input
          type="text"
          id="searchInput"
          placeholder="Search by title, genre, or platform..."
          aria-label="Search games"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
      <div className="sort-group">
        <label htmlFor="sortSelect">Sort by:</label>
        <select id="sortSelect" value={sortType} onChange={(event) => onSortChange(event.target.value)}>
          <option value="newest">Newest to Oldest</option>
          <option value="oldest">Oldest to Newest</option>
          <option value="az">Alphabetical A to Z</option>
          <option value="za">Alphabetical Z to A</option>
        </select>
      </div>
    </section>
  );
}

export default Controls;
