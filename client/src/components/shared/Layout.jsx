import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

import { useMemo, useState, useEffect } from 'react';
import { FloatingShape } from './ThreeDShapes';
import { Helmet } from 'react-helmet-async';
import api from '../../services/api';

const Layout = () => {
    const [favicon, setFavicon] = useState(null);
    useEffect(() => {
        const fetchFavicon = async () => {
            try {
                // Simple fetch to get globally available profile data
                // In a larger app, use Context or Redux
                const { data } = await api.get('/profile');
                if (data.favicon) setFavicon(data.favicon);
            } catch (e) {
                console.error("Failed to load global settings", e);
            }
        };
        fetchFavicon();
    }, []);

    const floatingShapes = useMemo(() => {
        return Array.from({ length: 60 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            scale: 0.5 + Math.random(), // 0.5 to 1.5
            delay: Math.random() * 5,
            opacity: 0.2 + Math.random() * 0.4, // 0.2 to 0.6
            color: [
                'from-orange-500/30 to-red-500/10',
                'from-red-500/30 to-orange-400/10',
                'from-amber-500/30 to-yellow-400/10',
                'from-orange-600/30 to-red-400/10',
                'from-yellow-600/30 to-orange-300/10'
            ][Math.floor(Math.random() * 5)]
        }));
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-dark-900 text-gray-100 relative overflow-hidden">
            {favicon && (
                <Helmet>
                    <link rel="icon" href={favicon} />
                </Helmet>
            )}
            {/* Global Floating Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {floatingShapes.map((shape) => (
                    <div 
                        key={shape.id}
                        className="absolute hidden md:block"
                        style={{ 
                            top: shape.top, 
                            left: shape.left, 
                            opacity: shape.opacity,
                            transform: `scale(${shape.scale})` 
                        }}
                    >
                        <FloatingShape color={shape.color} delay={shape.delay} />
                    </div>
                ))}
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow pt-16">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
