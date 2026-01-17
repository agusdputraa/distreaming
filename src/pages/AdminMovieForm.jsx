import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Icon from '../Icon/Icon';
import { useAuth } from '../context/AuthContext';
import { useMovies, useGenres } from '../hooks';

const inputClass = "w-full px-3 py-2 bg-[#333] border border-gray-700 rounded text-white text-sm";

export default function AdminMovieForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const isEdit = !!id;
  
  const { movies, createMovie, updateMovie, deleteMovie } = useMovies({}, { fetchAll: true });
  const { genres } = useGenres();
  
  const [form, setForm] = useState({
    title: '',
    type: 'movie',
    thumbnail: '',
    backdrop_image: '',
    synopsis: '',
    rating: '',
    year: new Date().getFullYear(),
    episodes: '',
    genre_ids: []
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);
  
  // Load movie data when editing
  useEffect(() => {
    if (!isEdit) return;
    
    const movie = movies.find(x => x.id === parseInt(id));
    if (movie) {
      setForm({
        title: movie.title || '',
        type: movie.is_series ? 'series' : 'movie',
        thumbnail: movie.thumbnail || '',
        backdrop_image: movie.backdrop_image || '',
        synopsis: movie.synopsis || '',
        rating: movie.rating || '',
        year: movie.year || new Date().getFullYear(),
        episodes: movie.episodes || '',
        genre_ids: movie.genres?.map(g => g.id) || []
      });
    }
  }, [id, isEdit, movies]);

  // Form field update helper
  const setField = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };
  
  // Genre toggle helper
  const toggleGenre = (genreId) => {
    setField(
      'genre_ids',
      form.genre_ids.includes(genreId)
        ? form.genre_ids.filter(id => id !== genreId)
        : [...form.genre_ids, genreId]
    );
  };

  // Save movie (create or update)
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const movieData = {
        ...form,
        is_series: form.type === 'series',
        year: parseInt(form.year),
        episodes: form.type === 'series' ? parseInt(form.episodes) || null : null
      };
      
      if (isEdit) {
        await updateMovie(id, movieData);
      } else {
        await createMovie(movieData);
      }
      
      setMsg('Saved!');
      setTimeout(() => navigate('/admin/movies'), 600);
    } catch (err) {
      console.error('Save error:', err);
      setMsg(err?.response?.data?.message || 'Error saving movie');
    } finally {
      setLoading(false);
    }
  };

  // Delete movie
  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteMovie(id);
      navigate('/admin/movies');
    } catch (err) {
      console.error('Delete error:', err);
      setMsg('Failed to delete');
    } finally {
      setLoading(false);
    }
  };
  
  // Get selected genre names for preview
  const selectedGenreNames = genres
    .filter(g => form.genre_ids.includes(g.id))
    .map(g => g.name);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 px-6 md:px-[60px] py-8 pt-[90px]">
        <div className="flex gap-8">
          {/* Left: Form */}
          <div className="flex-1 bg-black/60 rounded-lg p-6 border border-gray-800">
            <form onSubmit={handleSave} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setField('title', e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
              
              {/* Type & Year */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setField('type', e.target.value)}
                    className={inputClass}
                  >
                    <option value="movie">Movie</option>
                    <option value="series">Series</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Year</label>
                  <input
                    type="number"
                    value={form.year}
                    onChange={(e) => setField('year', e.target.value)}
                    required
                    className={inputClass}
                  />
                </div>
              </div>
              
              {/* Episodes (only for series) */}
              {form.type === 'series' && (
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Episodes</label>
                  <input
                    type="number"
                    value={form.episodes}
                    onChange={(e) => setField('episodes', e.target.value)}
                    className={inputClass}
                  />
                </div>
              )}
              
              {/* Synopsis */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">Synopsis</label>
                <textarea
                  value={form.synopsis}
                  onChange={(e) => setField('synopsis', e.target.value)}
                  rows={3}
                  className={inputClass + " resize-none"}
                />
              </div>
              
              {/* Rating */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">Rating</label>
                <select
                  value={form.rating}
                  onChange={(e) => setField('rating', e.target.value)}
                  className={inputClass}
                >
                  <option value="">-</option>
                  {['SU', '7+', '13+', '16+', '18+'].map(r => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              
              {/* Thumbnail URL */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">Thumbnail URL</label>
                <input
                  type="url"
                  value={form.thumbnail}
                  onChange={(e) => setField('thumbnail', e.target.value)}
                  required
                  className={inputClass}
                />
              </div>
              
              {/* Backdrop URL */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">Backdrop URL</label>
                <input
                  type="url"
                  value={form.backdrop_image}
                  onChange={(e) => setField('backdrop_image', e.target.value)}
                  className={inputClass}
                />
              </div>
              
              {/* Genres */}
              <div>
                <label className="block text-xs text-gray-400 mb-1">Genres</label>
                <div className="flex flex-wrap gap-1">
                  {genres.map(g => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => toggleGenre(g.id)}
                      className={`px-2 py-1 rounded text-xs ${
                        form.genre_ids.includes(g.id)
                          ? 'bg-[#e50914] text-white'
                          : 'bg-[#333] text-gray-300'
                      }`}
                    >
                      {g.name}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={loading || !form.genre_ids.length}
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
                  onClick={() => navigate('/admin/movies')}
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

          {/* Right: Live Preview - Hidden on mobile */}
          <div className="hidden lg:block flex-1">
            <div className="bg-black/60 rounded-lg border border-gray-800 p-4">
              <div className="flex gap-4">
                {/* Thumbnail Preview */}
                <div className="w-32 h-48 flex-shrink-0 bg-[#1a1a1a] rounded overflow-hidden">
                  {form.thumbnail ? (
                    <img
                      src={form.thumbnail}
                      alt="Thumbnail"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">
                      No img
                    </div>
                  )}
                </div>
                
                {/* Info Preview */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-base truncate">
                    {form.title || 'Title'}
                  </h3>
                  
                  <div className="flex flex-wrap gap-1 text-xs text-gray-400 mt-1">
                    <span>{form.year}</span>
                    <span>•</span>
                    <span className="capitalize">{form.type}</span>
                    {form.rating && (
                      <>
                        <span>•</span>
                        <span>{form.rating}</span>
                      </>
                    )}
                    {form.type === 'series' && form.episodes && (
                      <>
                        <span>•</span>
                        <span>{form.episodes} eps</span>
                      </>
                    )}
                  </div>
                  
                  {selectedGenreNames.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedGenreNames.map(name => (
                        <span
                          key={name}
                          className="px-1.5 py-0.5 bg-[#333] rounded text-[10px] text-gray-300"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-gray-500 text-xs mt-2 line-clamp-5">
                    {form.synopsis || 'No synopsis'}
                  </p>
                </div>
              </div>
              
              {/* Backdrop Preview */}
              {form.backdrop_image && (
                <div className="mt-3">
                  <div className="text-[10px] text-gray-500 mb-1">Backdrop</div>
                  <div className="aspect-[21/9] bg-[#1a1a1a] rounded overflow-hidden">
                    <img
                      src={form.backdrop_image}
                      alt="Backdrop"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
