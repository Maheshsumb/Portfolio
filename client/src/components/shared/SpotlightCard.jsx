import { useRef, useState, useId } from 'react';
import { motion } from 'framer-motion';

const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(249, 115, 22, 0.4)", ...props }) => {
    const divRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const gradientId = useId();

    const handleMouseMove = (e) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <motion.div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
            className={`relative overflow-hidden rounded-2xl border border-white/10 bg-dark-900/40 backdrop-blur-md transition-colors duration-300 ${className}`}
        >
            {/* Spotlight Effect (Dynamic Border via SVG) */}
            <svg 
                className="pointer-events-none absolute inset-0 h-full w-full z-20 transition-opacity duration-300"
                style={{ opacity }}
            >
                <defs>
                    <radialGradient
                        id={gradientId}
                        gradientUnits="userSpaceOnUse"
                        cx={position.x}
                        cy={position.y}
                        r="250"
                    >
                        <stop offset="0%" stopColor={spotlightColor} />
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>
                </defs>
                <rect
                    x="1"
                    y="1"
                    width="calc(100% - 2px)"
                    height="calc(100% - 2px)"
                    rx="15"
                    fill="transparent"
                    stroke={`url(#${gradientId})`}
                    strokeWidth="2"
                />
            </svg>

            {/* Spotlight Effect (Inner Background Glow) */}
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-10"
                style={{
                    opacity,
                    background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, ${spotlightColor.replace('0.4', '0.15')}, transparent 40%)`,
                }}
            />
            
            {/* Content */}
            <div className="relative z-30 h-full">
                {children}
            </div>
        </motion.div>
    );
};

export default SpotlightCard;
