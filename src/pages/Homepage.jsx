import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import MovieCard from "../components/MovieCard";
import HeroSection from "../components/HeroSection";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import { FAQS } from "../data";
import { useMovies } from "../hooks";

/**
 * HomePage Component
 * 
 * Landing page with hero section, trending movies, pricing, and FAQ.
 * Uses Tailwind responsive utilities to show/hide movies based on screen size.
 */
function HomePage() {
  const { movies } = useMovies();
  
  // Get first 10 movies (maximum we'll show on any screen size)
  const displayedMovies = movies.slice(0, 10);

  return (
    <>
      <Navbar />
      <HeroSection />
      
      {/* Movies Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
            Trending Now
          </h2>
          <Link 
            to="/movies" 
            className="text-sm sm:text-base text-[#e50914] hover:text-[#f40612] font-medium transition-colors"
          >
            View All →
          </Link>
        </div>

        {/* Movies Grid - Responsive visibility via Tailwind */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {displayedMovies.map((movie, index) => (
            <div 
              key={movie?.id}
              className={`
                ${index >= 4 ? 'hidden md:block' : ''}
                ${index >= 8 ? 'md:hidden lg:block' : ''}
                ${index >= 5 ? 'lg:hidden' : ''}
              `}
            >
              <MovieCard 
                id={movie?.id}
                thumbnail={movie?.thumbnail}
                title={movie?.title}
                genre_names={movie?.genre_names}
                year={movie?.year}
                rating={movie?.rating}
              />
            </div>
          ))}
        </div>
      </section>

      <Pricing />

      <FAQ faqs={FAQS} />
      
      <Footer />
    </>
  );
}

export default HomePage;
