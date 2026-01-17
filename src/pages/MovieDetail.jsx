import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Icon from '../Icon/Icon';
import { useMovies } from '../hooks';

function MovieDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getMovieById } = useMovies();
    
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true);
            try {
                const data = await getMovieById(id);
                setMovie(data);
            } catch (err) {
                console.error(err);
                setError('Movie not found');
            } finally {
                setLoading(false);
            }
        };
        fetchMovie();
    }, [id, getMovieById]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#141414] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#e50914]"></div>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="min-h-screen bg-[#141414] flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-white text-xl mb-4">{error || 'Movie not found'}</p>
                        <button onClick={() => navigate('/movies')} className="text-[#e50914] hover:underline">
                            Back to Movies
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#141414] flex flex-col">
            <Navbar />
            
            {/* Hero/Backdrop */}
            <div className="relative h-[50vh] md:h-[70vh]">
                {movie.backdrop_image ? (
                    <img 
                        src={movie.backdrop_image} 
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                ) : movie.thumbnail ? (
                    <img 
                        src={movie.thumbnail} 
                        alt={movie.title}
                        className="w-full h-full object-cover blur-sm"
                    />
                ) : (
                    <div className="w-full h-full bg-[#1a1a1a]" />
                )}
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-transparent to-transparent" />
                
                {/* Back Button */}
                <button 
                    onClick={() => navigate(-1)}
                    className="absolute top-24 left-6 md:left-[60px] flex items-center gap-2 text-white hover:text-[#e50914] transition-colors"
                >
                    <Icon name="chevronLeft" size={20} />
                    <span>Back</span>
                </button>
            </div>

            {/* Content */}
            <div className="relative -mt-40 md:-mt-60 px-6 md:px-[60px] pb-12">
                <div className="flex flex-col md:flex-row gap-8 max-w-7xl">
                    {/* Poster */}
                    <div className="w-48 md:w-64 flex-shrink-0 mx-auto md:mx-0">
                        <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-2xl">
                            {movie.thumbnail ? (
                                <img src={movie.thumbnail} alt={movie.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-[#333] flex items-center justify-center text-gray-500">No Image</div>
                            )}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{movie.title}</h1>
                        
                        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300 mb-6">
                            {movie.year && <span>{movie.year}</span>}
                            {movie.rating && (
                                <span className="px-2 py-0.5 bg-[#e50914] text-white rounded">{movie.rating}</span>
                            )}
                            {movie.is_series && movie.episodes && (
                                <span>{movie.episodes} Episodes</span>
                            )}
                            <span className="capitalize">{movie.is_series ? 'Series' : 'Movie'}</span>
                        </div>

                        {/* Genres */}
                        {movie.genres?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {movie.genres.map(g => (
                                    <span key={g.id} className="px-3 py-1 bg-[#333] rounded-full text-sm text-gray-300">
                                        {g.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Synopsis */}
                        {movie.synopsis && (
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-white mb-2">Synopsis</h3>
                                <p className="text-gray-400 leading-relaxed">{movie.synopsis}</p>
                            </div>
                        )}

                        {/* Play Button (placeholder) */}
                        <button className="flex items-center gap-2 px-8 py-3 bg-[#e50914] text-white font-bold rounded hover:bg-[#f40612] transition-colors">
                            <Icon name="film" size={20} />
                            Watch Now
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1" />
            <Footer />
        </div>
    );
}

export default MovieDetail;
