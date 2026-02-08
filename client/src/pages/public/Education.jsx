import { useEffect, useState } from 'react';
import api from '../../services/api';
import Loader from '../../components/shared/Loader';
import { FaGraduationCap, FaUniversity, FaCalendarAlt, FaBuilding, FaStar } from 'react-icons/fa';

import { motion } from 'framer-motion';
import SpotlightCard from '../../components/shared/SpotlightCard';

const Education = () => {
    const [educationData, setEducationData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getSortValue = (period) => {
        if (!period) return 0;
        const lower = period.toLowerCase();
        if (lower.includes('present') || lower.includes('now') || lower.includes('ongoing')) return Infinity;
        const years = period.match(/\d{4}/g);
        if (years && years.length > 0) return Math.max(...years.map(y => parseInt(y)));
        return 0;
    };

    useEffect(() => {
        const fetchEducation = async () => {
            try {
                const { data } = await api.get('/education');
                // Sort by most recent (descending)
                const sortedData = data.sort((a, b) => getSortValue(b.year) - getSortValue(a.year));
                setEducationData(sortedData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchEducation();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Education
            </h2>
            
            <div className="max-w-4xl mx-auto space-y-8 relative">

                {educationData.map((edu, index) => (
                    <SpotlightCard 
                        key={edu._id} 
                        className="p-8 group"
                        spotlightColor="rgba(var(--primary) / 0.2)"
                    >
                        <motion.div
                             initial={{ opacity: 0, x: -20 }}
                             animate={{ opacity: 1, x: 0 }}
                             transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                        {/* Decorative glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl -z-10 group-hover:bg-primary-500/10 transition-colors"></div>

                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="p-4 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-xl text-primary-400 shrink-0">
                                <FaGraduationCap size={32} />
                            </div>
                            
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-gray-100 group-hover:text-primary-400 transition-colors mb-2">
                                    {edu.degree}
                                </h3>
                                
                                <div className="flex flex-col gap-1 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                        <FaUniversity className="text-primary-500" />
                                        <span>{edu.institution}</span>
                                    </div>
                                    
                                    {edu.department && (
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <FaBuilding className="text-primary-500" />
                                            <span>{edu.department}</span>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                                        <FaCalendarAlt className="text-primary-500" />
                                        <span>{edu.year}</span>
                                    </div>

                                    {edu.grade && (
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <FaStar className="text-primary-500" />
                                            <span>{edu.grade}</span>
                                        </div>
                                    )}
                                </div>
                                
                                {edu.description && (
                                    <p className="text-gray-300 leading-relaxed border-l-2 border-primary-500/30 pl-4 py-1">
                                        {edu.description}
                                    </p>
                                )}
                            </div>
                        </div>
                        </motion.div>
                    </SpotlightCard>
                ))}
            </div>
        </div>
    );
};

export default Education;
