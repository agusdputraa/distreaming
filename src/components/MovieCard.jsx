import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";

function MovieCard({ id, thumbnail, title, genre_names, year, rating }) {
  return (
    <Link to={`/movie-detail/${id}`}>
      <div className="relative group transition-transform duration-300 ease-in-out hover:scale-105 hover:z-20 rounded-lg overflow-hidden bg-[#181818] shadow-lg aspect-[2/3]">
        {/* Rating Badge */}
        {rating && (
          <div className="absolute top-1 right-1 sm:top-2 sm:right-2 z-10">
            <span className="px-1.5 py-0.5 bg-red-600 text-white text-[8px] sm:text-[10px] font-bold rounded">
              {rating}
            </span>
          </div>
        )}

        {/* Movie Poster Image */}
        <img src={thumbnail} alt={title} className="w-full h-full object-cover" loading="lazy" />

        {/* Gradient Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 pt-8 sm:pt-12 bg-gradient-to-t from-black/95 via-black/60 to-transparent">
          <h4 className="text-[10px] sm:text-xs md:text-sm font-semibold text-white line-clamp-2 mb-1">
            {title}
          </h4>
          <div className="text-[8px] sm:text-[10px] md:text-xs">
            <p className="text-red-500 font-medium line-clamp-1">{genre_names || '-'}</p>
            <p className="text-gray-400">{year}</p>
          </div>
        </div>

        {/* Hover Overlay with Play button */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white/90 rounded-full flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Icon name="play" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-black ml-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
