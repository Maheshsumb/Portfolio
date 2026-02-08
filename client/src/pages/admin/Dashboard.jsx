import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { FaUser, FaCode, FaProjectDiagram, FaCertificate, FaEnvelope, FaGraduationCap, FaBriefcase, FaPalette } from 'react-icons/fa';
import SpotlightCard from '../../components/shared/SpotlightCard';

const Dashboard = () => {
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const fetchUnreadCount = async () => {
            try {
                const { data } = await api.get('/messages');
                const count = data.filter(msg => !msg.isRead).length;
                setUnreadCount(count);
            } catch (error) {
                console.error("Failed to fetch messages count");
            }
        };
        fetchUnreadCount();
    }, []);
    const cards = [
        { title: 'Manage Profile', icon: <FaUser size={32} />, link: '/admin/profile' },
        { title: 'Manage Skills', icon: <FaCode size={32} />, link: '/admin/skills' },
        { title: 'Manage Projects', icon: <FaProjectDiagram size={32} />, link: '/admin/projects' },
        { title: 'Manage Education', icon: <FaGraduationCap size={32} />, link: '/admin/education' },
        { title: 'Manage Experience', icon: <FaBriefcase size={32} />, link: '/admin/experience' },
        { title: 'Manage Certificates', icon: <FaCertificate size={32} />, link: '/admin/certificates' },
        { title: 'View Messages', icon: <FaEnvelope size={32} />, link: '/admin/messages', count: unreadCount },
        { title: 'Theme Settings', icon: <FaPalette size={32} />, link: '/admin/settings' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
            <h1 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((card) => (
                    <Link key={card.title} to={card.link} className="block group h-full">
                        <SpotlightCard className="h-full" spotlightColor="rgba(249, 115, 22, 0.2)">
                            <div className="p-8 h-full flex flex-col items-center justify-center text-gray-200">
                                <div className="mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-white/5 text-gray-400 group-hover:text-primary-500 group-hover:bg-primary-500/10 transition-colors relative">
                                    {card.icon}
                                    {card.count > 0 && (
                                        <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white shadow-md border-2 border-dark-900">
                                            {card.count}
                                        </span>
                                    )}
                                </div>
                                <h2 className="text-xl font-bold group-hover:text-white transition-colors text-center">
                                    {card.title}
                                </h2>
                            </div>
                        </SpotlightCard>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
