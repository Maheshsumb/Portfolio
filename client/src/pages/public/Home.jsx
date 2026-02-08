import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Loader from '../../components/shared/Loader';
import SEO from '../../components/shared/SEO';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaArrowRight, FaDownload, FaReact, FaNodeJs, FaDatabase, FaJava, FaPython, FaJs, FaHtml5, FaCss3, FaBootstrap, FaGitAlt } from 'react-icons/fa';
import { SiSpring, SiSpringboot, SiHibernate, SiEclipseide, SiApachemaven, SiPostman } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';



// Helper component for orbital icons
const OrbitItem = ({ icon: Icon, color, angle, parentDuration, radius, reverse = false }) => {
    return (
         <div 
            className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center bg-transparent"
            style={{ transform: `rotate(${angle}deg) translate(${radius}px)` }}
         >
             <div
                className="flex-shrink-0 flex items-center justify-center rounded-full border border-white/20 shadow-lg relative group overflow-hidden"
                style={{
                    animation: `spin ${parentDuration}s linear infinite ${reverse ? '' : 'reverse'}`,
                    willChange: 'transform',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    width: '48px', // Fixed pixel width
                    height: '48px', // Fixed pixel height
                    minWidth: '48px',
                    minHeight: '48px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.4))', // Bubble gradient
                    boxShadow: `inset -2px -2px 6px rgba(0,0,0,0.3), inset 2px 2px 6px rgba(255,255,255,0.1), 0 0 15px -5px ${color.includes('white') ? 'rgba(255,255,255,0.2)' : 'var(--tw-shadow-color)'}`,
                    '--tw-shadow-color': color.includes('red') ? 'rgba(239, 68, 68, 0.4)' : 
                                         color.includes('blue') ? 'rgba(59, 130, 246, 0.4)' :
                                         color.includes('green') ? 'rgba(34, 197, 94, 0.4)' :
                                         color.includes('yellow') ? 'rgba(234, 179, 8, 0.4)' :
                                         color.includes('orange') ? 'rgba(249, 115, 22, 0.4)' :
                                         color.includes('purple') ? 'rgba(168, 85, 247, 0.4)' : 'rgba(255,255,255,0.2)'
                }}
             >
                 {/* Shine Reflection */}
                 <div className="absolute top-2 left-2 w-3 h-1.5 bg-white/40 rounded-[50%] blur-[1px] transform -rotate-45"></div>
                 
                 {/* Icon */}
                 <Icon className={`text-2xl ${color} opacity-90 drop-shadow-md`} />
             </div>
         </div>
    );
};

const Home = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get('/profile');
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="relative min-h-screen flex items-center justify-center px-6 py-20">
            <SEO title="Home" description={profile?.about} />
            
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-600/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-red-900/20 rounded-full blur-[100px] animate-pulse"></div>
            </div>



            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Text Content */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-left space-y-6 relative"
                >
                    <div className="inline-block px-4 py-1.5 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-400 font-medium text-sm">
                        Available for work
                    </div>
                    
                    <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                        Hi, I'm <br />
                        <span className="bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                            {profile?.name || 'Developer'}
                        </span>
                    </h1>
                    
                    <h2 className="text-2xl lg:text-3xl text-gray-300 font-light">
                        {profile?.title || 'Full Stack Developer'}
                    </h2>
                    
                    <p className="max-w-xl text-gray-400 text-lg leading-relaxed">
                        {profile?.about?.substring(0, 200)}...
                    </p>
                    
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link 
                            to="/projects"
                            className="bg-primary-600 hover:bg-primary-500 text-white px-8 py-3.5 rounded-full font-medium transition-all flex items-center gap-2 shadow-lg shadow-primary-600/25 hover:shadow-primary-600/40 transform hover:-translate-y-1"
                        >
                            View Projects <FaArrowRight />
                        </Link>
                        
                        {profile?.resumeUrl && (
                            <a 
                                href={profile.resumeUrl} 
                                target="_blank" 
                                rel="noreferrer"
                                className="border border-dark-600 hover:border-gray-400 text-gray-300 hover:text-white px-8 py-3.5 rounded-full font-medium transition-all flex items-center gap-2 bg-dark-800/50 backdrop-blur-sm"
                            >
                                Resume <FaDownload size={14} />
                            </a>
                        )}
                    </div>

                    <div className="flex gap-6 pt-8 border-t border-dark-800 mt-8">
                        {profile?.github && (
                            <a href={profile.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <FaGithub size={24} />
                            </a>
                        )}
                        {profile?.linkedin && (
                            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                <FaLinkedin size={24} />
                            </a>
                        )}
                    </div>
                </motion.div>

                {/* Visual Content - Abstract Code/Glass Card */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative hidden lg:block"
                >
                    <div className="relative w-full aspect-square max-w-lg mx-auto flex items-center justify-center">
                        {/* Rotating ring */}
                        <div className="absolute inset-0 border-2 border-dashed border-dark-700 rounded-full animate-[spin_10s_linear_infinite] z-0"></div>
                        
                        {/* Profile Image (Central Planet) */}
                        <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-dark-800 shadow-2xl z-10 group bg-dark-800">
                             {/* Overlay Effect */}
                             <div className="absolute inset-0 bg-primary-500/10 group-hover:bg-transparent transition-colors duration-500 z-20 mix-blend-overlay"></div>
                             
                             {/* Image or Fallback */}
                             {profile?.imageUrl ? (
                                <img 
                                    src={profile.imageUrl} 
                                    alt={profile.name} 
                                    className="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-110"
                                />
                             ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 text-gray-400">
                                    <span className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500">
                                        {profile?.name?.charAt(0) || 'D'}
                                    </span>
                                    <span className="text-sm mt-2 opacity-50">Upload Photo</span>
                                </div>
                             )}
                        </div>



                        {/* Orbits Container */}
                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                            {/* Orbit 1 - Inner (Languages) - Radius 190px */}
                            <div 
                                className="absolute w-[380px] h-[380px] border border-dashed border-dark-600/30 rounded-full flex items-center justify-center animate-[spin_40s_linear_infinite]"
                                style={{ willChange: 'transform', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                            >
                                <OrbitItem icon={FaJava} color="text-red-500" angle={0} radius={190} parentDuration={40} />
                                <OrbitItem icon={FaPython} color="text-yellow-300" angle={90} radius={190} parentDuration={40} />
                                <OrbitItem icon={FaJs} color="text-yellow-400" angle={180} radius={190} parentDuration={40} />
                                <OrbitItem icon={FaHtml5} color="text-orange-500" angle={270} radius={190} parentDuration={40} />
                            </div>

                            {/* Orbit 2 - Middle (Frameworks) - Radius 270px */}
                            <div 
                                className="absolute w-[540px] h-[540px] border border-dashed border-dark-600/20 rounded-full flex items-center justify-center animate-[spin_50s_linear_infinite_reverse]"
                                style={{ willChange: 'transform', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                            >
                                <OrbitItem icon={FaReact} color="text-blue-400" angle={45} radius={270} parentDuration={50} reverse />
                                <OrbitItem icon={FaNodeJs} color="text-green-500" angle={117} radius={270} parentDuration={50} reverse />
                                <OrbitItem icon={SiSpringboot} color="text-green-600" angle={189} radius={270} parentDuration={50} reverse />
                                <OrbitItem icon={FaDatabase} color="text-yellow-400" angle={261} radius={270} parentDuration={50} reverse />
                                <OrbitItem icon={FaCss3} color="text-blue-500" angle={333} radius={270} parentDuration={50} reverse />
                            </div>

                             {/* Orbit 3 - Outer (Tools) - Radius 350px */}
                            <div 
                                className="absolute w-[700px] h-[700px] border border-dashed border-dark-600/10 rounded-full flex items-center justify-center animate-[spin_60s_linear_infinite]"
                                style={{ willChange: 'transform', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                            >
                                <OrbitItem icon={FaGithub} color="text-white" angle={0} radius={350} parentDuration={60} />
                                <OrbitItem icon={VscVscode} color="text-blue-400" angle={45} radius={350} parentDuration={60} />
                                <OrbitItem icon={SiPostman} color="text-orange-500" angle={90} radius={350} parentDuration={60} />
                                <OrbitItem icon={FaGitAlt} color="text-red-500" angle={135} radius={350} parentDuration={60} />
                                <OrbitItem icon={SiEclipseide} color="text-blue-800" angle={180} radius={350} parentDuration={60} />
                                <OrbitItem icon={SiApachemaven} color="text-red-600" angle={225} radius={350} parentDuration={60} />
                                <OrbitItem icon={FaBootstrap} color="text-purple-600" angle={270} radius={350} parentDuration={60} />
                                <OrbitItem icon={SiHibernate} color="text-gray-400" angle={315} radius={350} parentDuration={60} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
