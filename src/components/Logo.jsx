import { Link } from "react-router-dom";

function Logo({ className = "" }) {
  return (
    <Link 
      to="/" 
      className={`flex items-center gap-2 text-xl md:text-[28px] font-bold text-[#e50914] cursor-pointer no-underline ${className}`}
    >
      <img 
        src="/distreaming.svg" 
        alt="diStreaming Logo" 
        className="h-6 md:h-8 w-auto"
      />
      diStreaming
    </Link>
  );
}

export default Logo;
