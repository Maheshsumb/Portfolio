import { useState } from 'react';
import api from '../../services/api';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaUser, FaEnvelope, FaCommentAlt, FaGithub, FaLinkedin, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import SEO from '../../components/shared/SEO';
import SpotlightCard from '../../components/shared/SpotlightCard';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(null); // 'sending', 'success', 'error'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await api.post('/messages', formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus(null), 5000);
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
            <SEO title="Contact Me" description="Get in touch with me for collaborations or just to say hi!" />
            
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-500/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>

            <SpotlightCard 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-4xl bg-dark-800/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
                spotlightColor="rgba(var(--primary) / 0.2)"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contact Info Section */}
                <div className="flex flex-col justify-between space-y-8">
                    <div>
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mb-4">
                            Let's Connect
                        </h2>
                        <p className="text-gray-400 leading-relaxed text-lg">
                            Have a project in mind or just want to chat? I'm always open to discussing new ideas, opportunities, and tech.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {/* Email */}
                        <div className="flex items-start gap-4 text-gray-300">
                             <div className="w-12 h-12 rounded-full bg-dark-900/50 flex flex-shrink-0 items-center justify-center text-primary-400 border border-white/5 shadow-lg group-hover:border-primary-500/30 transition-colors">
                                <FaEnvelope size={20} />
                             </div>
                             <div>
                                 <p className="text-sm text-gray-500 mb-1">Email Me</p>
                                 <div className="flex flex-col gap-1">
                                    <a href="mailto:maheshsumbpatil87@gmail.com" className="font-medium hover:text-primary-400 transition-colors">
                                        maheshsumbpatil87@gmail.com
                                    </a>
                                    <a href="mailto:maheshsumb@zohomail.in" className="font-medium hover:text-primary-400 transition-colors">
                                        maheshsumb@zohomail.in
                                    </a>
                                 </div>
                             </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-4 text-gray-300">
                             <div className="w-12 h-12 rounded-full bg-dark-900/50 flex flex-shrink-0 items-center justify-center text-primary-400 border border-white/5 shadow-lg">
                                <FaPhoneAlt size={20} />
                             </div>
                             <div>
                                 <p className="text-sm text-gray-500 mb-1">Call Me</p>
                                 <a href="tel:+918999412872" className="font-medium hover:text-primary-400 transition-colors">
                                     +91 89994 12872
                                 </a>
                             </div>
                        </div>

                        {/* Location */}
                         <div className="flex items-center gap-4 text-gray-300">
                             <div className="w-12 h-12 rounded-full bg-dark-900/50 flex flex-shrink-0 items-center justify-center text-primary-400 border border-white/5 shadow-lg">
                                <FaMapMarkerAlt size={20} />
                             </div>
                             <div>
                                 <p className="text-sm text-gray-500 mb-1">Location</p>
                                 <p className="font-medium">
                                     Pune, Maharashtra, India
                                 </p>
                             </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-gray-500 mb-4 text-sm uppercase tracking-wider">Socials</p>
                        <div className="flex gap-4">
                            <a href="https://github.com/maheshsumb" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-dark-900/80 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 hover:scale-110 transition-all duration-300">
                                <FaGithub size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/mahesh-sumb/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-dark-900/80 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 hover:scale-110 transition-all duration-300">
                                <FaLinkedin size={20} />
                            </a>
                            <a href="https://instagram.com/mahesh_sumb_patil" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-dark-900/80 flex items-center justify-center text-gray-400 hover:text-white hover:bg-pink-600 hover:scale-110 transition-all duration-300">
                                <FaInstagram size={20} />
                            </a>
                            <a href="https://wa.me/918999412872" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-dark-900/80 flex items-center justify-center text-gray-400 hover:text-white hover:bg-green-500 hover:scale-110 transition-all duration-300">
                                <FaWhatsapp size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-5 bg-dark-900/50 p-6 rounded-2xl border border-white/5">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">Your Name</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary-500 transition-colors">
                                <FaUser />
                            </div>
                            <input
                                type="text"
                                required
                                className="w-full bg-dark-950 border border-dark-700 rounded-lg pl-10 pr-4 py-3 text-gray-200 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">Email Address</label>
                         <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 group-focus-within:text-primary-500 transition-colors">
                                <FaEnvelope />
                            </div>
                            <input
                                type="email"
                                required
                                className="w-full bg-dark-950 border border-dark-700 rounded-lg pl-10 pr-4 py-3 text-gray-200 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2 ml-1">Message</label>
                        <div className="relative group">
                            <div className="absolute top-3 left-3 pointer-events-none text-gray-500 group-focus-within:text-primary-500 transition-colors">
                                <FaCommentAlt />
                            </div>
                            <textarea
                                rows="4"
                                required
                                className="w-full bg-dark-950 border border-dark-700 rounded-lg pl-10 pr-4 py-3 text-gray-200 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 transition-all resize-none"
                                placeholder="Tell me about your project..."
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                            ></textarea>
                        </div>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={status === 'sending'}
                        className="w-full bg-gradient-to-r from-primary-600 to-primary-800 hover:from-primary-500 hover:to-primary-700 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-primary-600/20 transform hover:-translate-y-1 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {status === 'sending' ? (
                            <span className="animate-pulse">Sending...</span>
                        ) : (
                            <>
                                Send Message <FaPaperPlane className="text-sm" />
                            </>
                        )}
                    </button>

                    {status === 'success' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-center text-sm font-medium">
                            Message sent successfully! I'll get back to you soon.
                        </motion.div>
                    )}
                    {status === 'error' && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-center text-sm font-medium">
                            Failed to send message. Please try again later.
                        </motion.div>
                    )}
                </form>
                </div>
            </SpotlightCard>
        </div>
    );
};

export default Contact;
