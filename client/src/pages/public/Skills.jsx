import { useEffect, useState } from 'react';
import api from '../../services/api';
import Loader from '../../components/shared/Loader';
import { 
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython, FaJava, FaGitAlt, FaDocker, FaAws, FaDatabase, FaCode, FaLaptopCode, FaServer, FaAward, FaExternalLinkAlt
} from 'react-icons/fa';
import { SiMongodb, SiExpress, SiTailwindcss, SiTypescript, SiNextdotjs, SiPostgresql, SiFirebase, SiRedux } from 'react-icons/si';
import SpotlightCard from '../../components/shared/SpotlightCard';

const Skills = () => {
    const [skillCategories, setSkillCategories] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    // Icon Mapping Helper
    const getSkillIcon = (skillName) => {
        const lowerName = skillName.toLowerCase();
        
        // Frameworks & Libraries (Check these FIRST to avoid "React.js" matching "js")
        if (lowerName.includes('react')) return <FaReact className="text-cyan-400" />;
        if (lowerName.includes('node')) return <FaNodeJs className="text-green-500" />;
        if (lowerName.includes('express')) return <SiExpress className="text-gray-400" />;
        if (lowerName.includes('next')) return <SiNextdotjs className="text-white" />;
        if (lowerName.includes('tailwind')) return <SiTailwindcss className="text-cyan-400" />;
        if (lowerName.includes('redux')) return <SiRedux className="text-purple-500" />;
        if (lowerName.includes('mongo')) return <SiMongodb className="text-green-500" />;
        if (lowerName.includes('firebase')) return <SiFirebase className="text-yellow-500" />;
        
        // Languages
        if (lowerName.includes('html')) return <FaHtml5 className="text-orange-500" />;
        if (lowerName.includes('css')) return <FaCss3Alt className="text-blue-500" />;
        if (lowerName.includes('javascript') || lowerName === 'js' || lowerName.includes('es6')) return <FaJs className="text-yellow-400" />;
        if (lowerName.includes('typescript') || lowerName.includes('ts')) return <SiTypescript className="text-blue-600" />;
        if (lowerName.includes('python')) return <FaPython className="text-blue-500" />;
        if (lowerName.includes('java') && !lowerName.includes('script')) return <FaJava className="text-red-500" />;

        // Database & Tools
        if (lowerName.includes('sql') || lowerName.includes('postgres')) return <SiPostgresql className="text-blue-400" />;
        if (lowerName.includes('git')) return <FaGitAlt className="text-orange-600" />;
        if (lowerName.includes('docker')) return <FaDocker className="text-blue-500" />;
        if (lowerName.includes('aws')) return <FaAws className="text-orange-500" />;
        
        return <FaCode className="text-gray-400" />; // Default icon
    };

    const getCategoryIcon = (category) => {
        const lowerCat = category.toLowerCase();
        if (lowerCat.includes('front')) return <FaLaptopCode />;
        if (lowerCat.includes('back')) return <FaServer />;
        if (lowerCat.includes('tool') || lowerCat.includes('devops')) return <FaDatabase />;
        return <FaCode />;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [skillsRes, certsRes] = await Promise.all([
                    api.get('/skills'),
                    api.get('/certificates')
                ]);
                setSkillCategories(skillsRes.data);
                setCertificates(certsRes.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Technical Arsenal
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {skillCategories.map((cat) => (
                    <SpotlightCard key={cat._id} className="p-6 group" spotlightColor="rgba(249, 115, 22, 0.2)">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-lg bg-gradient-to-br from-primary-500/20 to-primary-600/20 text-primary-400">
                                {getCategoryIcon(cat.category)}
                            </div>
                            <h3 className="text-xl font-bold text-gray-100 group-hover:text-primary-400 transition-colors">{cat.category}</h3>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                            {cat.skills.map((skill, index) => (
                                <div key={index} className="flex items-center gap-2 bg-dark-950/50 border border-white/20 px-4 py-2.5 rounded-xl hover:border-primary-500/30 hover:bg-primary-500/10 transition-all duration-300 cursor-default group/skill">
                                    <span className="text-lg group-hover/skill:scale-110 transition-transform duration-300">
                                        {getSkillIcon(skill)}
                                    </span>
                                    <span className="text-gray-300 text-sm font-medium group-hover/skill:text-white">
                                        {skill}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </SpotlightCard>
                ))}
            </div>

            {/* Certificates Section */}
            {certificates.length > 0 && (
                <div className="mt-20">
                    <h2 className="text-3xl font-bold mb-10 text-center flex items-center justify-center gap-3">
                        <FaAward className="text-primary-500" />
                        <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                            Certifications & Achievements
                        </span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {certificates.filter(c => c.isVisible !== false).map((cert) => (
                            <SpotlightCard key={cert._id} className="p-6 h-full flex flex-col justify-between" spotlightColor="rgba(var(--primary) / 0.2)">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-100 mb-2">{cert.title}</h3>
                                    <p className="text-primary-400 font-medium mb-4">{cert.provider}</p>
                                </div>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                                    <span className="text-sm text-gray-400 bg-white/5 px-2 py-1 rounded">{cert.year}</span>
                                    {cert.certificateUrl && (
                                        <a 
                                            href={cert.certificateUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                                        >
                                            View Credential <FaExternalLinkAlt size={12} />
                                        </a>
                                    )}
                                </div>
                            </SpotlightCard>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Skills;
