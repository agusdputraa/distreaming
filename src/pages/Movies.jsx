import { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import SearchFilters from '../components/SearchFilters';
import { useMovies, useGenres, useFilters } from '../hooks';

function Movies() {
    const {
        filters,
        apiFilters,
        localSearch,
        setLocalSearch,
        updateFilter,
        handleSearchSubmit,
        clearFilters,
        hasActiveFilters
    } = useFilters();

    const { movies, loading, error, total, loadMore, hasMore, refetch } = useMovies(apiFilters);
    const { genres: allGenres, loading: genresLoading } = useGenres();

    const loadMoreRef = useRef(null);

    // Infinite Scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadMore();
                }
            },
            { threshold: 0.1, rootMargin: '100px' }
        );
        
        if (loadMoreRef.current) observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [hasMore, loading, loadMore]);

    return (
        <div className="min-h-screen flex flex-col bg-[#141414]">
            <Navbar />
            
            <div className="flex-1 pt-[70px]">
                {/* Header + Filters */}
                <div className="bg-[#141414] border-b border-gray-800 px-4 md:px-[60px] py-4 sticky top-[70px] z-[50]">
                    <div className="mx-auto">
                        <SearchFilters
                            filters={filters}
                            localSearch={localSearch}
                            setLocalSearch={setLocalSearch}
                            updateFilter={updateFilter}
                            onSubmit={handleSearchSubmit}
                            clearFilters={clearFilters}
                            hasActiveFilters={hasActiveFilters}
                            genres={genresLoading ? [] : allGenres}
                            total={total}
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="px-4 md:px-[60px] py-8">
                    <div className="mx-auto">
                        {/* Error */}
                        {error && (
                            <div className="text-center py-10">
                                <p className="text-red-500 mb-4">{error}</p>
                                <button onClick={refetch} className="px-4 py-2 bg-[#e50914] text-white rounded">Try Again</button>
                            </div>
                        )}

                        {/* Movies Grid */}
                        {movies.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                                {movies.map((movie) => (
                                    <MovieCard
                                        key={movie.id}
                                        id={movie.id}
                                        title={movie.title}
                                        thumbnail={movie.thumbnail}
                                        genre_names={movie.genre_names}
                                        year={movie.year}
                                        rating={movie.rating}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Infinite scroll trigger */}
                        <div ref={loadMoreRef} className="flex justify-center py-8">
                            {loading && (
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#e50914]"></div>
                            )}
                            {!loading && !hasMore && movies.length > 0 && (
                                <p className="text-gray-500 text-sm">You've reached the end</p>
                            )}
                        </div>

                        {/* Empty state */}
                        {!loading && movies.length === 0 && !error && (
                            <div className="text-center py-20">
                                <p className="text-gray-400 text-lg mb-4">No movies found</p>
                                {hasActiveFilters && (
                                    <button onClick={clearFilters} className="text-[#e50914] hover:underline">
                                        Clear filters
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Movies;
