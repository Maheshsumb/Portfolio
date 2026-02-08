import { motion } from 'framer-motion';

export const Cube = () => {
  return (
    <div className="w-16 h-16 relative preserve-3d animate-[spin_8s_linear_infinite]">
        <div className="absolute inset-0 bg-blue-500/30 border border-blue-400 translate-z-8"></div>
        <div className="absolute inset-0 bg-blue-500/30 border border-blue-400 -translate-z-8"></div>
        <div className="absolute inset-0 bg-blue-500/30 border border-blue-400 rotate-y-90 translate-z-8"></div>
        <div className="absolute inset-0 bg-blue-500/30 border border-blue-400 rotate-y-90 -translate-z-8"></div>
        <div className="absolute inset-0 bg-blue-500/30 border border-blue-400 rotate-x-90 translate-z-8"></div>
        <div className="absolute inset-0 bg-blue-500/30 border border-blue-400 rotate-x-90 -translate-z-8"></div>
    </div>
  );
};

export const FloatingShape = ({ color, delay }) => {
    return (
        <motion.div
            animate={{ 
                y: [0, -20, 0],
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
            }}
            transition={{ 
                duration: 5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: delay 
            }}
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} shadow-lg backdrop-blur-md border border-white/10`}
            style={{
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            }}
        />
    );
};

export const TechShape = ({ icon: Icon, color, delay, pos }) => {
    return (
        <motion.div
            animate={{ 
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0],
            }}
            transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: delay 
            }}
            className={`absolute ${pos} w-12 h-12 flex items-center justify-center rounded-xl bg-dark-800/80 backdrop-blur-md border border-white/10 shadow-xl z-10`}
            style={{
                boxShadow: `0 0 20px ${color}40`,
            }}
        >
            <Icon className={`text-2xl ${color}`} />
        </motion.div>
    );
};
