import { useTheme } from '../../context/ThemeContext';
import { FaCheck } from 'react-icons/fa';

const themes = [
    { id: 'inferno', name: 'Inferno', color: '#ff6400' },
    { id: 'hacker', name: 'Hacker', color: '#00ff41' },
    { id: 'cyberpunk', name: 'Cyberpunk', color: '#ff00ff' },
    { id: 'ocean', name: 'Ocean', color: '#00dcff' },
    { id: 'dracula', name: 'Dracula', color: '#b464ff' },
    { id: 'sunset', name: 'Sunset', color: '#ff2864' },
    { id: 'forest', name: 'Red', color: '#ff0000' },
    { id: 'midnight', name: 'Midnight', color: '#7864ff' },
    { id: 'gold', name: 'Crimson', color: '#ff003c' },
    { id: 'frozen', name: 'Frozen', color: '#00c8ff' },
];

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {themes.map((t) => (
                <button 
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`
                        relative flex items-center justify-between p-4 rounded-xl border transition-all duration-300
                        ${theme === t.id 
                            ? 'bg-white/10 border-primary-500 shadow-[0_0_15px_rgba(var(--primary)/0.3)]' 
                            : 'bg-dark-800 border-white/5 hover:bg-dark-700 hover:border-white/10'}
                    `}
                >
                    <div className="flex items-center gap-3">
                        <span 
                            className="w-4 h-4 rounded-full shadow-lg"
                            style={{ backgroundColor: t.color, boxShadow: `0 0 10px ${t.color}` }}
                        />
                        <span className={`text-sm font-medium ${theme === t.id ? 'text-white' : 'text-gray-400'}`}>
                            {t.name}
                        </span>
                    </div>
                    {theme === t.id && <FaCheck className="text-primary-500 text-xs" />}
                </button>
            ))}
        </div>
    );
};

export default ThemeSwitcher;
