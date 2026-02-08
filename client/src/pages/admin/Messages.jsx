import { useState, useEffect } from 'react';
import { MdDeleteOutline, MdMarkEmailRead } from 'react-icons/md';
import api from '../../services/api';
import Loader from '../../components/shared/Loader';
import SpotlightCard from '../../components/shared/SpotlightCard';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        try {
            const { data } = await api.get('/messages');
            setMessages(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id) => {
        if(window.confirm('Delete message?')) {
            try {
                await api.delete(`/messages/${id}`);
                fetchMessages();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await api.put(`/messages/${id}/read`);
            // Optimistic update
            setMessages(prev => prev.map(msg => msg._id === id ? { ...msg, isRead: true } : msg));
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-white">Inbox</h2>
            {messages.length === 0 ? <p className="text-gray-500">No messages.</p> : (
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <SpotlightCard key={msg._id} className={`p-6 relative transition-all ${!msg.isRead ? 'border-primary-500/50 bg-primary-900/10' : ''}`} spotlightColor="rgba(249, 115, 22, 0.2)">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-0.5">
                                        <h3 className={`font-bold text-lg ${!msg.isRead ? 'text-white' : 'text-gray-300'}`}>{msg.name}</h3>
                                        {!msg.isRead && (
                                            <span className="text-[10px] font-bold text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded border border-primary-500/20 tracking-wider">NEW</span>
                                        )}
                                    </div>
                                    <a href={`mailto:${msg.email}`} className="text-sm text-primary-400 hover:underline">{msg.email}</a>
                                </div>
                                <div className="text-right flex flex-col items-end gap-2">
                                    <p className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleDateString()}</p>
                                    <div className="flex gap-2 mt-2">
                                        {!msg.isRead && (
                                            <button onClick={() => handleMarkAsRead(msg._id)} className="flex items-center gap-1 text-xs bg-primary-600/20 text-primary-300 hover:bg-primary-600/40 border border-primary-500/20 px-3 py-1 rounded transition-colors" title="Mark as Read">
                                                <MdMarkEmailRead size={16} /> <span className="hidden sm:inline">Mark Read</span>
                                            </button>
                                        )}
                                        <button onClick={() => handleDelete(msg._id)} className="text-red-500 hover:text-red-400 p-1.5 rounded hover:bg-red-500/10 transition-colors" title="Delete">
                                            <MdDeleteOutline size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <p className={`${!msg.isRead ? 'text-gray-100' : 'text-gray-400'} whitespace-pre-line`}>{msg.message}</p>
                        </SpotlightCard>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Messages;
