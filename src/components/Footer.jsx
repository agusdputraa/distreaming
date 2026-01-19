import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import Logo from './Logo';

export default function Footer() {
    return (
        <footer className="bg-black/80 pt-16 pb-8 px-4 md:px-12 border-t border-gray-900 mt-20">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="space-y-4 -mt-2 md:col-span-3 lg:col-span-1">
                        <Logo />
                        <p className="text-gray-400 text-sm leading-relaxed mt-4">
                            Your ultimate destination for streaming movies and series. 
                            Experience high-quality entertainment anytime, anywhere.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white hover:bg-[#e50914] transition-colors">
                                <Icon name="instagram" size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white hover:bg-[#e50914] transition-colors">
                                <Icon name="facebook" size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white hover:bg-[#e50914] transition-colors">
                                <Icon name="twitter" size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white hover:bg-[#e50914] transition-colors">
                                <Icon name="youtube" size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Quick Links</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link to="/" className="hover:text-[#e50914] transition-colors">Home</Link></li>
                            <li><Link to="/movies" className="hover:text-[#e50914] transition-colors">Movies</Link></li>
                            <li><Link to="/movies?is_series=true" className="hover:text-[#e50914] transition-colors">Series</Link></li>
                            <li><Link to="/login" className="hover:text-[#e50914] transition-colors">Login</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Legal</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-[#e50914] transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-[#e50914] transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-[#e50914] transition-colors">Cookie Policy</a></li>
                            <li><a href="#" className="hover:text-[#e50914] transition-colors">FAQ</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold mb-6">Contact Us</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>Email: support@distreaming.com</li>
                            <li>Phone: +62 812 3456 7890</li>
                            <li>Address: Jakarta, Indonesia</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-900 pt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} DiStreaming. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
