import { Link } from "react-router-dom";

function Logo({ className = "" }) {
  return (
    <Link 
      to="/" 
      className={`text-xl md:text-[28px] font-bold text-[#e50914] cursor-pointer no-underline ${className}`}
    >
      diStreaming
    </Link>
  );
}

export default Logo;
