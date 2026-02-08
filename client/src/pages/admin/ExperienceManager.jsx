import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Reorder } from 'framer-motion';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { MdOutlineEdit, MdDeleteOutline, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import SpotlightCard from '../../components/shared/SpotlightCard';

const ExperienceManager = () => {
    const [experienceData, setExperienceData] = useState([]);
    const [formData, setFormData] = useState({ role: '', company: '', duration: '', description: '' });
    const [editingId, setEditingId] = useState(null);

    const fetchExperience = async () => {
        try {
            const { data } = await api.get('/experience/all');
            setExperienceData(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchExperience();
    }, []);

    const toggleVisibility = async (exp) => {
        try {
            const updated = experienceData.map(item => 
                item._id === exp._id ? { ...item, isVisible: !item.isVisible } : item
            );
            setExperienceData(updated);
            await api.put(`/experience/${exp._id}`, { isVisible: !exp.isVisible });
        } catch (error) {
            console.error("Failed to update visibility", error);
            fetchExperience();
        }
    };

    const handleReorder = async (newOrder) => {
        setExperienceData(newOrder); // Optimistic update
        try {
            const items = newOrder.map(item => item._id);
            await api.put('/experience/reorder', { items });
        } catch (error) {
            console.error("Failed to save order", error);
            fetchExperience();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/experience/${editingId}`, formData);
            } else {
                await api.post('/experience', formData);
            }
            setFormData({ role: '', company: '', duration: '', description: '' });
            setEditingId(null);
            fetchExperience();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (exp) => {
        setEditingId(exp._id);
        setFormData({ 
            role: exp.role, 
            company: exp.company,
            duration: exp.duration,
            description: exp.description || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData({ role: '', company: '', duration: '', description: '' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this experience entry?')) {
            try {
                await api.delete(`/experience/${id}`);
                fetchExperience();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-white">Manage Experience</h2>
            
            <SpotlightCard className="p-8 mb-12 relative overflow-visible" spotlightColor="rgba(249, 115, 22, 0.2)">
                <form onSubmit={handleSubmit}>

                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                        {editingId ? 'Edit Experience' : 'Add New Experience'}
                    </h3>
                    {editingId && (
                        <button type="button" onClick={handleCancel} className="text-gray-400 hover:text-white text-sm underline">
                            Cancel Edit
                        </button>
                    )}
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-400 mb-2 text-sm">Role / Job Title</label>
                            <input 
                                placeholder="e.g. Senior Frontend Developer" 
                                className="w-full bg-dark-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                value={formData.role}
                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2 text-sm">Company</label>
                            <input 
                                placeholder="e.g. Google" 
                                className="w-full bg-dark-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                value={formData.company}
                                onChange={(e) => setFormData({...formData, company: e.target.value})}
                                required
                            />
                        </div>
                    </div>
                    <div>
                         <label className="block text-gray-400 mb-2 text-sm">Duration</label>
                        <input 
                            placeholder="e.g. Jan 2022 - Present" 
                            className="w-full bg-dark-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                            value={formData.duration}
                            onChange={(e) => setFormData({...formData, duration: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                         <label className="block text-gray-400 mb-2 text-sm">Description (Responsibilities)</label>
                        <textarea 
                            placeholder="Led the development of..." 
                            className="w-full bg-dark-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-500 transition-colors h-24 resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                    </div>
                    <button type="submit" className={`w-full py-3 rounded-lg font-bold text-white shadow-lg transition-transform hover:-translate-y-1 ${editingId ? 'bg-gradient-to-r from-blue-600 to-cyan-600 shadow-blue-500/20' : 'bg-gradient-to-r from-orange-600 to-red-600 shadow-orange-500/20'}`}>
                        {editingId ? 'Update Experience' : 'Add Experience'}
                    </button>
                </div>
                </form>
            </SpotlightCard>

            <Reorder.Group axis="y" values={experienceData} onReorder={handleReorder} className="grid grid-cols-1 gap-6">
                {experienceData.map((exp) => (
                    <Reorder.Item key={exp._id} value={exp} className="mb-4">
                        <SpotlightCard className={`p-6 relative group cursor-move ${!exp.isVisible ? 'opacity-50' : ''}`} spotlightColor="rgba(249, 115, 22, 0.2)">
                        <div className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-600 cursor-move">
                            <RxDragHandleDots2 size={24} />
                        </div>
                        <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => toggleVisibility(exp)} className={`${exp.isVisible ? 'text-cyan-400 hover:text-cyan-300' : 'text-gray-500 hover:text-gray-400'} p-2 hover:bg-white/10 rounded-full transition-colors`} title={exp.isVisible ? "Hide" : "Show"}>
                                {exp.isVisible ? <MdVisibility size={22} /> : <MdVisibilityOff size={22} />}
                            </button>
                            <button onClick={() => handleEdit(exp)} className="text-amber-500 hover:text-amber-300 p-2 hover:bg-white/10 rounded-full transition-colors" title="Edit">
                                <MdOutlineEdit size={22} />
                            </button>
                            <button onClick={() => handleDelete(exp._id)} className="text-red-500 hover:text-red-300 p-2 hover:bg-white/10 rounded-full transition-colors" title="Delete">
                                <MdDeleteOutline size={22} />
                            </button>
                        </div>
                        
                        <div className="pl-12">
                            <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                            <p className="text-primary-400 font-medium mb-1">{exp.company}</p>
                            <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/10 inline-block mb-3">{exp.duration}</span>
                            {exp.description && <p className="text-gray-400 text-sm whitespace-pre-line">{exp.description}</p>}
                        </div>
                        </SpotlightCard>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    );
};

export default ExperienceManager;
