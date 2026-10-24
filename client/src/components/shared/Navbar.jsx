import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../context/ProfileContext';
import { FaGithub, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa';

import { sanitizeUrl } from '../../utils/sanitizeUrl';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { profile } = useProfile();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Education', path: '/education' },
    { name: 'Experience', path: '/experience' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="fixed w-full z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent shrink-0"
            >
              {profile?.name || 'Portfolio'}
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-baseline space-x-1 ml-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-primary-500 bg-dark-800'
                      : 'text-gray-300 hover:text-white hover:bg-dark-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {user && (
                <Link to="/admin" className="text-yellow-400 hover:text-yellow-300 px-3 py-2 font-medium text-sm">
                  Admin Panel
                </Link>
              )}
            </div>

            {/* Desktop Social + Logout */}
            <div className="hidden md:flex items-center gap-4">
              {profile?.github && (
                <a href={sanitizeUrl(profile.github)} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <FaGithub size={20} />
                </a>
              )}
              {profile?.linkedin && (
                <a href={sanitizeUrl(profile.linkedin)} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <FaLinkedin size={20} />
                </a>
              )}
              {user && (
                <button onClick={logout} className="text-sm text-red-500 hover:text-red-400">
                  Logout
                </button>
              )}
            </div>

            {/* Mobile: Social icons + Hamburger */}
            <div className="flex md:hidden items-center gap-3">
              {profile?.github && (
                <a href={sanitizeUrl(profile.github)} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <FaGithub size={18} />
                </a>
              )}
              {profile?.linkedin && (
                <a href={sanitizeUrl(profile.linkedin)} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <FaLinkedin size={18} />
                </a>
              )}
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="text-gray-300 hover:text-white transition-colors p-2 rounded-md focus:outline-none"
                aria-label="Toggle menu"
              >
                {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 z-50 bg-dark-900 border-l border-dark-700 shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-dark-700">
          <span className="text-lg font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            {profile?.name || 'Menu'}
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-400 hover:text-white transition-colors p-1 rounded-md"
            aria-label="Close menu"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex flex-col px-4 py-6 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-4 py-3 rounded-lg text-base font-medium transition-all ${
                isActive(link.path)
                  ? 'text-primary-400 bg-primary-500/10 border border-primary-500/20'
                  : 'text-gray-300 hover:text-white hover:bg-dark-700'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user && (
            <Link
              to="/admin"
              className="px-4 py-3 rounded-lg text-base font-medium text-yellow-400 hover:text-yellow-300 hover:bg-dark-700 transition-all"
            >
              Admin Panel
            </Link>
          )}
        </nav>

        {/* Drawer Footer */}
        {user && (
          <div className="absolute bottom-8 left-0 right-0 px-6">
            <button
              onClick={() => { logout(); setMenuOpen(false); }}
              className="w-full py-3 rounded-lg text-sm font-medium text-red-400 border border-red-500/30 hover:bg-red-500/10 transition-all"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
