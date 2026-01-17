import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Icon from '../Icon/Icon';
import { useAuth } from '../context/AuthContext';
import { useGenres } from '../hooks';

function AdminGenres() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const { genres, loading, error } = useGenres();
    const [search, setSearch] = useState('');

    useEffect(() => { if (!isLoggedIn) navigate('/login'); }, [isLoggedIn, navigate]);

    const filtered = genres.filter(g => g.name?.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 px-6 md:px-[60px] py-8 pt-[90px]">
                <div>
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-white">Genres ({filtered.length})</h1>
                        <div className="flex gap-2">
                            <button onClick={() => navigate('/admin/movies')} className="px-4 py-2 bg-[#333] text-white rounded-md">Movies</button>
                            <button onClick={() => navigate('/admin/genre')} className="px-4 py-2 bg-[#e50914] text-white rounded-md flex items-center gap-2">
                                <Icon name="plus" size={18} />Add
                            </button>
                        </div>
                    </div>

                    {/* Search */}
                    <input type="text" placeholder="Search genres..." value={search} onChange={(e) => setSearch(e.target.value)}
                        className="w-full max-w-md px-4 py-2 bg-[#333] border border-gray-600 rounded-md text-white mb-6" />

                    {error && <p className="text-red-500 text-center py-10">{error}</p>}
                    {loading && <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#e50914]"></div></div>}

                    {/* Grid */}
                    {!loading && filtered.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {filtered.map(g => (
                                <div key={g.id} onClick={() => navigate(`/admin/genre/${g.id}`)}
                                    className="p-4 bg-[#1f1f1f] border border-gray-800 rounded-lg cursor-pointer hover:border-[#e50914]">
                                    <p className="text-xs text-gray-500">#{g.id}</p>
                                    <p className="text-white font-medium">{g.name}</p>
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && !filtered.length && !error && <p className="text-gray-400 text-center py-20">No genres found</p>}
                </div>
            </div>
        </div>
    );
}

export default AdminGenres;
