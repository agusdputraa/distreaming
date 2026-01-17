import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from "../Icon/Icon";
import Logo from "./Logo";
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const searchInputRef = useRef(null);
    const navigate = useNavigate();
    
    const { isLoggedIn, logout } = useAuth();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
        navigate("/");
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (!isSearchOpen) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/movies?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery("");
        }
    };

    const handleDropdownNav = (path) => {
        setIsDropdownOpen(false);
        navigate(path);
    };

    return (
    <>
        <nav className="fixed top-0 left-0 right-0 h-[70px] flex justify-between items-center px-4 md:px-[60px] bg-[#000000] z-[100]">
        
        {/* Left Section: Mobile Menu & Logo */}
        <div className="flex items-center gap-4 md:gap-10">
            <button 
                className="md:hidden flex flex-col justify-center items-center w-8 h-8 bg-transparent border-none cursor-pointer p-1"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
            <Icon name="hamMenu" size={20} className="text-white" />
            </button>

          <Logo />

          <ul className="hidden md:flex gap-5 list-none">
            <li className="text-[#e5e5e5] hover:text-white text-sm cursor-pointer transition-colors">
              <Link to="/movies" className="text-inherit no-underline">Movies</Link>
            </li>
          </ul>
        </div>

        {/* Right Section: Search & Profile */}
        <div className="flex items-center gap-3 md:gap-5">
            {/* Search Input Area */}
            <div className={`flex items-center transition-all duration-300 ${isSearchOpen ? 'w-full md:w-64 bg-black/80 border border-gray-700 rounded-full px-3 py-1' : 'w-auto'}`}>
                {isSearchOpen ? (
                   <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center">
                       <Icon name="search" size={18} className="text-gray-400 mr-2" />
                       <input 
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Titles, people, genres"
                            className="bg-transparent border-none text-white text-sm focus:outline-none w-full placeholder-gray-500"
                            onBlur={() => !searchQuery && setIsSearchOpen(false)}
                       />
                       <button 
                           type="button" 
                           onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                           className="text-gray-400 hover:text-white ml-2"
                       >
                           <Icon name="x" size={16} />
                       </button>
                   </form> 
                ) : (
                    <button 
                        onClick={toggleSearch}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <Icon name="search" size={20} className="text-white" />
                    </button>
                )}
            </div>
            
            {/* Auth Section */}
            {!isSearchOpen && (
                isLoggedIn ? (
                  <div className="relative">
                    {/* Admin Button with Dropdown */}
                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[#e50914] text-white rounded-full hover:bg-[#ff0a16] transition-colors"
                    >
                        <Icon name="user" size={16} />
                        <span className="hidden md:inline text-sm font-medium">Admin</span>
                        <Icon name="chevronDown" size={14} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <>
                            {/* Backdrop */}
                            <div className="fixed inset-0 z-[90]" onClick={() => setIsDropdownOpen(false)} />
                            
                            {/* Dropdown */}
                            <div className="absolute right-0 top-full mt-2 w-48 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-xl overflow-hidden z-[100]">
                                <button 
                                    onClick={() => handleDropdownNav('/admin/movies')}
                                    className="w-full px-4 py-3 text-left text-sm text-gray-200 hover:bg-white/10 flex items-center gap-3"
                                >
                                    <Icon name="film" size={16} />
                                    Movie Management
                                </button>
                                <button 
                                    onClick={() => handleDropdownNav('/admin/genres')}
                                    className="w-full px-4 py-3 text-left text-sm text-gray-200 hover:bg-white/10 flex items-center gap-3"
                                >
                                    <Icon name="tag" size={16} />
                                    Genre Management
                                </button>
                                <div className="border-t border-gray-700" />
                                <button 
                                    onClick={handleLogout}
                                    className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/10 flex items-center gap-3"
                                >
                                    <Icon name="logout" size={16} />
                                    Logout
                                </button>
                            </div>
                        </>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="px-4 py-1.5 md:px-5 md:py-2 bg-[#e50914] text-white text-sm font-medium rounded hover:bg-[#f40612] transition-colors no-underline"
                  >
                    Login
                  </Link>
                )
            )}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`
          fixed inset-0 bg-black/95 z-[99] 
          transform transition-transform duration-300 flex flex-col p-5 pt-[70px]
          md:hidden
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <ul className="p-0 m-0 list-none">
          <li className="text-lg font-medium py-4 cursor-pointer text-white border-b border-[#333]" onClick={closeMenu}>
            <Link to="/movies" className="text-inherit no-underline block w-full">Movies</Link>
          </li>
          
          {/* Admin links in mobile menu (only if logged in) */}
          {isLoggedIn && (
            <>
              <li className="text-lg font-medium py-4 cursor-pointer text-gray-400 border-b border-[#333]" onClick={closeMenu}>
                <Link to="/admin/movies" className="text-inherit no-underline block w-full">Movie Management</Link>
              </li>
              <li className="text-lg font-medium py-4 cursor-pointer text-gray-400 border-b border-[#333]" onClick={closeMenu}>
                <Link to="/admin/genres" className="text-inherit no-underline block w-full">Genre Management</Link>
              </li>
            </>
          )}
          
          {/* Login/Logout */}
          {isLoggedIn ? (
            <li 
              className="text-lg font-medium py-4 cursor-pointer text-[#e50914] border-b border-[#333]" 
              onClick={() => { handleLogout(); closeMenu(); }}
            >
              Logout
            </li>
          ) : (
            <li className="text-lg font-medium py-4 cursor-pointer text-[#e50914] border-b border-[#333]" onClick={closeMenu}>
              <Link to="/login" className="text-inherit no-underline block w-full">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
