import { useEffect, useState } from 'react';
import api from '../../services/api';
import Loader from '../../components/shared/Loader';
import { FaBriefcase, FaBuilding, FaCalendarAlt } from 'react-icons/fa';

import { motion } from 'framer-motion';
import SpotlightCard from '../../components/shared/SpotlightCard';

const Experience = () => {
    const [experienceData, setExperienceData] = useState([]);
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
        const fetchExperience = async () => {
            try {
                const { data } = await api.get('/experience');
                // Sort by most recent (descending)
                const sortedData = data.sort((a, b) => getSortValue(b.duration) - getSortValue(a.duration));
                setExperienceData(sortedData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchExperience();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Experience
            </h2>
            
            <div className="max-w-4xl mx-auto space-y-8 relative">

                {experienceData.map((exp, index) => (
                    <SpotlightCard 
                        key={exp._id} 
                        className="p-8 group"
                        spotlightColor="rgba(var(--primary) / 0.2)"
                    >
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                         {/* Timeline Dot */}


                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="p-4 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-xl text-primary-400 shrink-0 md:hidden">
                                <FaBriefcase size={28} />
                            </div>
                            
                            <div className="flex-1">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-2">
                                    <h3 className="text-2xl font-bold text-gray-100 group-hover:text-primary-400 transition-colors">
                                        {exp.role}
                                    </h3>
                                    <span className="text-sm font-bold text-primary-400 bg-primary-500/10 px-3 py-1 rounded-full border border-primary-500/20 whitespace-nowrap">
                                        {exp.duration}
                                    </span>
                                </div>
                                
                                <div className="flex items-center gap-2 text-gray-400 mb-6 text-sm font-medium">
                                    <FaBuilding className="text-primary-500" />
                                    <span>{exp.company}</span>
                                </div>
                                
                                {exp.description && (
                                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                        {exp.description}
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

export default Experience;
