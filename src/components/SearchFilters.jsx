import Icon from '../Icon/Icon';

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from(
  { length: CURRENT_YEAR - 1980 + 1 },
  (_, i) => CURRENT_YEAR - i
);

const SELECT_CLASS = "px-3 py-2 bg-[#333] border border-gray-700 rounded text-sm text-white";

function SearchFilters({
  filters,
  localSearch,
  setLocalSearch,
  updateFilter,
  onSubmit,
  clearFilters,
  hasActiveFilters,
  genres = [],
  showFilters = true,
  total
}) {
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <form onSubmit={onSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <Icon
            name="search"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search movies..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#333] border border-gray-600 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-[#e50914]"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-[#e50914] text-white rounded-md hover:bg-[#f40612]"
        >
          Search
        </button>
      </form>

      {/* Filters Row */}
      {showFilters && (
        <div className="flex flex-wrap gap-2">
          {/* Type Filter */}
          <select
            value={filters.is_series || ''}
            onChange={(e) => updateFilter('is_series', e.target.value)}
            className={SELECT_CLASS}
          >
            <option value="">All Types</option>
            <option value="false">Movie</option>
            <option value="true">Series</option>
          </select>

          {/* Genre Filter */}
          <select
            value={filters.genre || ''}
            onChange={(e) => updateFilter('genre', e.target.value)}
            className={SELECT_CLASS}
          >
            <option value="">All Genres</option>
            {genres.map(g => (
              <option key={g.id} value={g.name}>{g.name}</option>
            ))}
          </select>

          {/* Year Filter */}
          <select
            value={filters.year || ''}
            onChange={(e) => updateFilter('year', e.target.value)}
            className={SELECT_CLASS}
          >
            <option value="">All Years</option>
            {YEARS.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          {/* Sort By Filter */}
          <select
            value={filters.sort_by || ''}
            onChange={(e) => updateFilter('sort_by', e.target.value)}
            className={SELECT_CLASS}
          >
            <option value="">Sort: Default</option>
            <option value="title">Title</option>
            <option value="year">Year</option>
          </select>

          {/* Sort Order Filter */}
          <select
            value={filters.sort_order || ''}
            onChange={(e) => updateFilter('sort_order', e.target.value)}
            className={SELECT_CLASS}
          >
            <option value="">Order: Default</option>
            <option value="desc">Newest</option>
            <option value="asc">Oldest</option>
          </select>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-2 text-gray-400 hover:text-white text-sm underline"
            >
              Clear All
            </button>
          )}
        </div>
      )}

      {/* Results Count */}
      {total !== undefined && total > 0 && (
        <p className="text-sm text-gray-400">
          {filters.search ? `Results for "${filters.search}"` : 'All Movies'} • {total} found
        </p>
      )}
    </div>
  );
}

export default SearchFilters;
