import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-transparent backdrop-blur-sm border-t border-dark-800/50 py-4 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-400 text-sm order-2 md:order-1">
          &copy; {new Date().getFullYear()} Mahesh Sumb. All rights reserved.
        </p>
        
        <div className="flex gap-6 order-1 md:order-2">
            <a href="https://github.com/maheshsumb" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all" title="GitHub">
                <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/mahesh-sumb/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-500 hover:scale-110 transition-all" title="LinkedIn">
                <FaLinkedin size={20} />
            </a>
            <a href="https://instagram.com/mahesh_sumb_patil" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-500 hover:scale-110 transition-all" title="Instagram">
                <FaInstagram size={20} />
            </a>
            <a href="https://wa.me/918999412872" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-green-500 hover:scale-110 transition-all" title="WhatsApp">
                <FaWhatsapp size={20} />
            </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
