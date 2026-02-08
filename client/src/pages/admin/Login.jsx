import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/admin');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen relative overflow-hidden px-4">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px] -z-10"></div>

            <div className="w-full max-w-md bg-dark-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
                <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">Admin Login</h2>
                
                {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-6 text-center text-sm">{error}</div>}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Username</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-dark-950/50 border border-white/5 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 text-white transition-all placeholder-gray-600"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-dark-950/50 border border-white/5 rounded-lg px-4 py-3 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/50 text-white transition-all placeholder-gray-600"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-orange-600/20 transform hover:-translate-y-1 transition-all"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
