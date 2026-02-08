import { useEffect, useState, useRef } from 'react';
import api from '../../services/api';
import Loader from '../../components/shared/Loader';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import SpotlightCard from '../../components/shared/SpotlightCard';

const ProjectCard = ({ project }) => {
    // Handle both new array format and old string format
    const images = project.imageUrls && project.imageUrls.length > 0 
        ? project.imageUrls 
        : (project.imageUrl ? [project.imageUrl] : []);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <SpotlightCard className="group flex flex-col h-full !p-0" spotlightColor="rgba(var(--primary) / 0.25)">
             <div className="h-52 bg-dark-800/50 overflow-hidden relative">
                {images.length > 0 ? (
                    images.map((img, index) => (
                        <div 
                            key={index} 
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                            <img src={img} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms]" />
                        </div>
                    ))
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 font-mono text-sm bg-dark-950">
                        <span className="animate-pulse">No Signal</span>
                    </div>
                )}
                
                {/* Dots Indicator */}
                {images.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
                        {images.map((_, idx) => (
                            <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-4 bg-primary-500' : 'w-1.5 bg-white/50'}`}></div>
                        ))}
                    </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-primary-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"></div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-3 text-gray-100 group-hover:text-primary-400 transition-colors">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow font-light">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech, i) => (
                        <span key={i} className="text-xs font-mono font-medium text-gray-300 bg-primary-900/20 border border-primary-500/20 px-2.5 py-1 rounded shadow-none backdrop-blur-sm">
                            {tech}
                        </span>
                    ))}
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                            <FaGithub size={16} /> <span className="font-mono">Code</span>
                        </a>
                    )}
                    {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 transition-colors font-medium">
                            <FaExternalLinkAlt size={14} /> <span className="font-mono">Live Demo</span>
                        </a>
                    )}
                </div>
            </div>
        </SpotlightCard>
    );
};

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data } = await api.get('/projects');
                setProjects(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <ProjectCard key={project._id} project={project} />
                ))}
            </div>
            {projects.length === 0 && <p className="text-center text-gray-500">No projects found.</p>}
        </div>
    );
};

export default Projects;
