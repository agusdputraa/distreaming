import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Icon from '../Icon/Icon';
import { useAuth } from '../context/AuthContext';
import { useGenres, useMovies } from '../hooks';

export default function AdminGenreForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const isEdit = !!id;
  
  const { genres, createGenre, updateGenre, deleteGenre } = useGenres();
  const { movies } = useMovies({}, { fetchAll: true });
  
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);
  
  // Load genre data when editing
  useEffect(() => {
    if (!isEdit) return;
    
    const genre = genres.find(g => g.id === parseInt(id));
    if (genre) {
      setName(genre.name);
    }
  }, [id, isEdit, genres]);

  // Save genre (create or update)
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isEdit) {
        await updateGenre(id, { name });
      } else {
        await createGenre({ name });
      }
      
      setMsg('Saved!');
      setTimeout(() => navigate('/admin/genres'), 600);
    } catch (err) {
      console.error('Save error:', err);
      setMsg(err?.response?.data?.message || 'Error saving genre');
    } finally {
      setLoading(false);
    }
  };

  // Delete genre
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteGenre(id);
      navigate('/admin/genres');
    } catch (err) {
      console.error('Delete error:', err);
      setMsg('Failed to delete');
    } finally {
      setLoading(false);
    }
  };
  
  // Get movies that have this genre
  const moviesInGenre = isEdit
    ? movies.filter(m => m.genres?.some(g => g.id === parseInt(id)))
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 px-6 md:px-[60px] py-8 pt-[90px]">
        <div className="flex gap-8">
          {/* Left: Form */}
          <div className="flex-1 max-w-md bg-black/60 rounded-lg p-6 border border-gray-800">
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1">
                  Genre Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-[#333] border border-gray-700 rounded text-white text-sm"
                />
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 bg-[#e50914] text-white rounded text-sm disabled:opacity-50 flex items-center justify-center gap-1"
                >
                  <Icon name="save" size={14} />
                  {loading ? '...' : 'Save'}
                </button>
                
                {isEdit && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="px-4 py-2 bg-gray-700 text-white rounded text-sm hover:bg-red-600"
                  >
                    <Icon name="trash" size={14} />
                  </button>
                )}
                
                <button
                  type="button"
                  onClick={() => navigate('/admin/genres')}
                  className="px-4 py-2 bg-gray-700 text-white rounded text-sm hover:bg-gray-600"
                >
                  <Icon name="x" size={14} />
                </button>
              </div>
            </form>
            
            {/* Status Message */}
            {msg && (
              <p className={`mt-3 text-center text-xs ${
                msg === 'Saved!' ? 'text-green-400' : 'text-red-400'
              }`}>
                {msg}
              </p>
            )}
          </div>

          {/* Right: Preview Panel - Hidden on mobile */}
          <div className="hidden lg:flex flex-1 flex-col gap-4">
            {/* Genre Preview */}
            <div className="bg-black/60 rounded-lg border border-gray-800 p-6">
              <div className="text-xs text-gray-500 mb-2">Preview</div>
              <div className="inline-block px-4 py-2 bg-[#e50914] text-white rounded-full text-lg font-medium">
                {name || 'Genre Name'}
              </div>
            </div>

            {/* All Genres List */}
            <div className="bg-black/60 rounded-lg border border-gray-800 p-4">
              <div className="text-xs text-gray-500 mb-3">
                All Genres ({genres.length})
              </div>
              <div className="flex flex-wrap gap-2">
                {genres.map(g => (
                  <span
                    key={g.id}
                    className={`px-3 py-1 rounded-full text-sm ${
                      g.id === parseInt(id)
                        ? 'bg-[#e50914] text-white'
                        : 'bg-[#333] text-gray-300'
                    }`}
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Movies in this Genre (Edit mode only) */}
            {isEdit && (
              <div className="bg-black/60 rounded-lg border border-gray-800 p-4 flex-1">
                <div className="text-xs text-gray-500 mb-3">
                  Movies in "{name}" ({moviesInGenre.length})
                </div>
                
                {moviesInGenre.length > 0 ? (
                  <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
                    {moviesInGenre.map(m => (
                      <div
                        key={m.id}
                        onClick={() => navigate(`/admin/movie/${m.id}`)}
                        className="cursor-pointer hover:opacity-80"
                      >
                        {m.thumbnail ? (
                          <img
                            src={m.thumbnail}
                            alt={m.title}
                            className="w-full aspect-[2/3] object-cover rounded"
                          />
                        ) : (
                          <div className="w-full aspect-[2/3] bg-[#333] rounded flex items-center justify-center text-xs text-gray-500">
                            No img
                          </div>
                        )}
                        <p className="text-xs text-gray-400 mt-1 truncate">
                          {m.title}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No movies in this genre</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
