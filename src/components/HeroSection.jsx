import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      navigate('/register', { state: { email } });
    }
  };

  return (
    <div 
      className="
        w-full min-h-screen relative flex flex-col items-center justify-center 
        overflow-hidden bg-cover bg-center pt-[56px] md:pt-0 border-b-8 border-[#222]
      "
      style={{ backgroundImage: `url('https://www.latestfreestuff.co.uk/wp-content/uploads/2014/07/cinema.jpg')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30 z-[2]" />
      
      <div className="relative z-10 text-center px-4 md:px-5 max-w-[800px]">
        <h1 className="text-[28px] md:text-4xl lg:text-[56px] font-bold mb-3 md:mb-4 leading-[1.1] text-white">
          Unlimited movies,<br />
          TV shows, and more
        </h1>
        
        <p className="text-base md:text-xl lg:text-2xl mb-3 md:mb-5 text-white">
          Starts at IDR 54,000. Cancel anytime.
        </p>
        
        <p className="text-sm md:text-base lg:text-lg mb-4 md:mb-6 text-gray-300">
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        
        <form className="flex flex-col md:flex-row justify-center items-center gap-0" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full md:w-[360px] max-w-[360px] 
              p-3.5 md:p-[18px] 
              text-sm md:text-base 
              border border-gray-500 rounded md:rounded-r-none rounded-b md:rounded-b-none
              bg-black/70 text-white outline-none mb-3 md:mb-0
            "
          />
          <button 
            type="submit" 
            className="
              w-full md:w-auto px-6 py-3.5 md:py-[18px] 
              text-base md:text-xl font-semibold 
              bg-[#e50914] text-white border-none 
              rounded md:rounded-l-none cursor-pointer 
              flex items-center justify-center gap-2
            "
          >
            Get Started <span>›</span>
          </button>
        </form>
      </div>

      <div className="
        absolute bottom-5 md:bottom-[30px] left-0 right-0 
        text-center text-white z-20 opacity-80 pointer-events-none animate-bounce
      ">
        <div className="text-xs md:text-sm mb-2 uppercase tracking-[2px]">
          <span className="md:hidden">Swipe up for movies</span>
          <span className="hidden md:inline">Scroll down for movies</span>
        </div>
        <div className="text-xl">
          <span className="md:hidden">↑</span>
          <span className="hidden md:inline">↓</span>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
