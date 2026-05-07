import { useProfile } from '../../context/ProfileContext';
import Loader from '../../components/shared/Loader';
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import SpotlightCard from '../../components/shared/SpotlightCard';

const About = () => {
    const { profile, loadingProfile } = useProfile();

    if (loadingProfile) return <Loader />;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12 relative z-10">
            <h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent drop-shadow-sm">
                About Me
            </h1>
            
            <SpotlightCard className="p-8 md:p-12 shadow-2xl relative group bg-dark-900/40" spotlightColor="rgba(var(--primary) / 0.2)">
                {/* Decorative glow inside card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px] -z-10 group-hover:bg-primary-500/20 transition-colors duration-500"></div>

                <div className="flex flex-col md:flex-row gap-10 items-start">
                    {/* Profile Image */}
                    <div className="flex-shrink-0 mx-auto md:mx-0 relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-900 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl">
                             {profile?.imageUrl ? (
                                <img src={profile.imageUrl} alt={profile.name || "Profile"} className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
                             ) : (
                                <div className="w-full h-full bg-dark-800 flex items-center justify-center text-gray-600">
                                    <span className="text-4xl font-bold">{profile?.name?.charAt(0) || "U"}</span>
                                </div>
                             )}
                        </div>
                    </div>

                    <div className="prose prose-invert max-w-none flex-grow">
                        <p className="text-xl text-gray-200 leading-relaxed whitespace-pre-line font-light">
                            {profile?.about || "I am a passionate developer..."}
                        </p>
                    </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-start gap-8">
                    <div className="text-center md:text-left space-y-4">
                        <div>
                             <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-300">Contact Details</h3>
                             <div className="space-y-3">
                                 {/* Emails */}
                                 {(profile?.email || profile?.email2) && (
                                     <div className="flex items-start gap-3 text-gray-400">
                                         <FaEnvelope className="mt-1 text-primary-400 flex-shrink-0" />
                                         <div className="flex flex-col">
                                             {profile?.email && <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors">{profile.email}</a>}
                                             {profile?.email2 && <a href={`mailto:${profile.email2}`} className="hover:text-white transition-colors">{profile.email2}</a>}
                                         </div>
                                     </div>
                                 )}
                                 
                                 {/* Phone */}
                                 {profile?.phone && (
                                     <div className="flex items-center gap-3 text-gray-400">
                                         <FaPhoneAlt className="text-primary-400 flex-shrink-0" />
                                         <a href={`tel:${profile.phone}`} className="hover:text-white transition-colors">{profile.phone}</a>
                                     </div>
                                 )}

                                 {/* Location */}
                                 {profile?.location && (
                                     <div className="flex items-center gap-3 text-gray-400">
                                         <FaMapMarkerAlt className="text-primary-400 flex-shrink-0" />
                                         <span>{profile.location}</span>
                                     </div>
                                 )}
                             </div>
                        </div>

                        {/* Minimal Social Icons */}
                        <div className="flex justify-center md:justify-start gap-5 pt-2">
                            {profile?.github && (
                                <a href={profile.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300" title="GitHub">
                                    <FaGithub size={20} />
                                </a>
                            )}
                            {profile?.linkedin && (
                                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400 hover:scale-110 transition-all duration-300" title="LinkedIn">
                                    <FaLinkedin size={20} />
                                </a>
                            )}
                            {profile?.instagram && (
                                <a href={profile.instagram} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-500 hover:scale-110 transition-all duration-300" title="Instagram">
                                    <FaInstagram size={20} />
                                </a>
                            )}
                            {profile?.whatsapp && (
                                 <a href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-green-500 hover:scale-110 transition-all duration-300" title="WhatsApp">
                                    <FaWhatsapp size={20} />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </SpotlightCard>
        </div>
    );
};

export default About;
