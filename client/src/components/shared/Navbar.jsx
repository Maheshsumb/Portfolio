import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Education', path: '/education' },
    { name: 'Experience', path: '/experience' },
    { name: 'Portfolio', path: '/projects' }, // User asked to rename 'Projects' section to 'Portfolio'
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Mahesh Sumb
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-primary-500 bg-dark-800'
                      : 'text-gray-300 hover:text-white hover:bg-dark-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {user && (
                  <Link to="/admin" className="text-yellow-400 hover:text-yellow-300 px-3 py-2 font-medium">
                      Admin Panel
                  </Link>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/maheshsumb" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/mahesh-sumb/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin size={20} />
            </a>
             {user && (
                 <button onClick={logout} className="text-sm text-red-500 hover:text-red-400 ml-4">
                     Logout
                 </button>
             )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
