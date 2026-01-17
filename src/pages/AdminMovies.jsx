import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Icon from '../Icon/Icon';
import SearchFilters from '../components/SearchFilters';
import { useAuth } from '../context/AuthContext';
import { useMovies, useGenres, useFilters } from '../hooks';


function AdminMovies() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    
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
    
    const { movies, loading, error, loadMore, hasMore, total } = useMovies(apiFilters);
    const { genres } = useGenres();
    
    const loadMoreRef = useRef(null);

    useEffect(() => { if (!isLoggedIn) navigate('/login'); }, [isLoggedIn, navigate]);

    // Infinite Scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && hasMore && !loading && loadMore(),
            { threshold: 0.1, rootMargin: '100px' }
        );
        loadMoreRef.current && observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [hasMore, loading, loadMore]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 px-6 md:px-[60px] py-8 pt-[90px]">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white">Movies ({total})</h1>
                    <div className="flex gap-2">
                        <button onClick={() => navigate('/admin/genres')} className="px-4 py-2 bg-[#333] text-white rounded-md hover:bg-[#444]">Genres</button>
                        <button onClick={() => navigate('/admin/movie')} className="px-4 py-2 bg-[#e50914] text-white rounded-md flex items-center gap-2 hover:bg-[#f40612]">
                            <Icon name="plus" size={18} />Add
                        </button>
                    </div>
                </div>

                {/* Search & Filters */}
                <div className="mb-6">
                    <SearchFilters
                        filters={filters}
                        localSearch={localSearch}
                        setLocalSearch={setLocalSearch}
                        updateFilter={updateFilter}
                        onSubmit={handleSearchSubmit}
                        clearFilters={clearFilters}
                        hasActiveFilters={hasActiveFilters}
                        genres={genres}
                        showFilters={true}
                    />
                </div>

                {error && <p className="text-red-500 text-center py-10">{error}</p>}

                {/* Table */}
                {movies.length > 0 && (
                    <div className="bg-[#141414] rounded-lg border border-gray-800 overflow-auto">
                        <table className="w-full text-left">
                            <thead className="bg-black/40 text-gray-400 text-xs uppercase">
                                <tr>
                                    <th className="px-4 py-3">ID</th>
                                    <th className="px-4 py-3">Title</th>
                                    <th className="px-4 py-3 hidden md:table-cell">Genres</th>
                                    <th className="px-4 py-3 hidden md:table-cell">Year</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {movies.map(m => (
                                    <tr key={m.id} onClick={() => navigate(`/admin/movie/${m.id}`)} className="hover:bg-white/5 cursor-pointer">
                                        <td className="px-4 py-3 text-gray-500">{m.id}</td>
                                        <td className="px-4 py-3 text-white">{m.title}</td>
                                        <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{m.genre_names || '-'}</td>
                                        <td className="px-4 py-3 text-gray-400 hidden md:table-cell">{m.year}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div ref={loadMoreRef} className="flex justify-center py-8">
                    {loading && <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#e50914]"></div>}
                    {!loading && !hasMore && movies.length > 0 && <p className="text-gray-500 text-sm">End</p>}
                </div>

                {!loading && !movies.length && !error && <p className="text-gray-400 text-center py-20">No movies found</p>}
            </div>
        </div>
    );
}

export default AdminMovies;
