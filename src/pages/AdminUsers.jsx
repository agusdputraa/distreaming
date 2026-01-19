import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Icon from '../Icon/Icon';
import { useAuth } from '../context/AuthContext';
import { useUsers } from '../hooks';

function AdminUsers() {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const { users, loading, error } = useUsers();
    const [search, setSearch] = useState('');

    useEffect(() => { if (!isLoggedIn) navigate('/login'); }, [isLoggedIn, navigate]);

    const filtered = users.filter(u => 
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 px-6 md:px-[60px] py-8 pt-[90px]">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white">Users ({filtered.length})</h1>
                    <div className="flex gap-2">
                        <button onClick={() => navigate('/admin/movies')} className="px-4 py-2 bg-[#333] text-white rounded-md hover:bg-[#444]">Movies</button>
                        <button onClick={() => navigate('/admin/genres')} className="px-4 py-2 bg-[#333] text-white rounded-md hover:bg-[#444]">Genres</button>
                        <button onClick={() => navigate('/admin/user')} className="px-4 py-2 bg-[#e50914] text-white rounded-md flex items-center gap-2 hover:bg-[#f40612]">
                            <Icon name="plus" size={18} />Add
                        </button>
                    </div>
                </div>

                {/* Search */}
                <input 
                    type="text" 
                    placeholder="Search users by name or email..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-md px-4 py-2 bg-[#333] border border-gray-600 rounded-md text-white mb-6" 
                />

                {error && <p className="text-red-500 text-center py-10">{error}</p>}
                {loading && <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#e50914]"></div></div>}

                {/* Table */}
                {!loading && filtered.length > 0 && (
                    <div className="bg-[#141414] rounded-lg border border-gray-800 overflow-auto">
                        <table className="w-full text-left">
                            <thead className="bg-black/40 text-gray-400 text-xs uppercase">
                                <tr>
                                    <th className="px-4 py-3">ID</th>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Email</th>
                                    <th className="px-4 py-3 hidden md:table-cell">Created</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {filtered.map(u => (
                                    <tr key={u.id} onClick={() => navigate(`/admin/user/${u.id}`)} className="hover:bg-white/5 cursor-pointer">
                                        <td className="px-4 py-3 text-gray-500">{u.id}</td>
                                        <td className="px-4 py-3 text-white">{u.name}</td>
                                        <td className="px-4 py-3 text-gray-400">{u.email}</td>
                                        <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                                            {u.created_at ? new Date(u.created_at).toLocaleDateString() : '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {!loading && !filtered.length && !error && <p className="text-gray-400 text-center py-20">No users found</p>}
            </div>
        </div>
    );
}

export default AdminUsers;
