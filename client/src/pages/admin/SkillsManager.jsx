import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Reorder } from 'framer-motion';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { MdOutlineEdit, MdDeleteOutline, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import SpotlightCard from '../../components/shared/SpotlightCard';

const SkillsManager = () => {
    const [skillsData, setSkillsData] = useState([]);
    const [formData, setFormData] = useState({ category: '', skillsString: '' });
    const [editingId, setEditingId] = useState(null);

    const fetchSkills = async () => {
        try {
            const { data } = await api.get('/skills/all');
            setSkillsData(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const toggleVisibility = async (skill) => {
        try {
            // Optimistic update
            const updatedSkills = skillsData.map(s => 
                s._id === skill._id ? { ...s, isVisible: !s.isVisible } : s
            );
            setSkillsData(updatedSkills);
            
            await api.put(`/skills/${skill._id}`, { isVisible: !skill.isVisible });
        } catch (error) {
            console.error("Failed to update visibility", error);
            fetchSkills();
        }
    };

    const handleReorder = async (newOrder) => {
        setSkillsData(newOrder); // Optimistic update
        try {
            const items = newOrder.map(item => item._id);
            await api.put('/skills/reorder', { items });
        } catch (error) {
            console.error("Failed to save order", error);
            fetchSkills(); // Revert on error
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const skillsArray = formData.skillsString.split(',').map(s => s.trim()).filter(s => s);
        
        try {
            if (editingId) {
                // Update existing
                await api.put(`/skills/${editingId}`, { category: formData.category, skills: skillsArray });
            } else {
                // Create new
                await api.post('/skills', { category: formData.category, skills: skillsArray });
            }
            setFormData({ category: '', skillsString: '' });
            setEditingId(null);
            fetchSkills();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (category) => {
        setEditingId(category._id);
        setFormData({ 
            category: category.category, 
            skillsString: category.skills.join(', ') 
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData({ category: '', skillsString: '' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this category?')) {
            try {
                await api.delete(`/skills/${id}`);
                fetchSkills();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-white">Manage Skills</h2>
            
            <SpotlightCard className="p-8 mb-12 relative overflow-visible" spotlightColor="rgba(249, 115, 22, 0.2)">
                <form onSubmit={handleSubmit}>

                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                        {editingId ? 'Edit Category' : 'Add New Category'}
                    </h3>
                    {editingId && (
                        <button type="button" onClick={handleCancel} className="text-gray-400 hover:text-white text-sm underline">
                            Cancel Edit
                        </button>
                    )}
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-gray-400 mb-2 text-sm">Category Name</label>
                        <input 
                            placeholder="e.g. Frontend Development" 
                            className="w-full bg-dark-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                            value={formData.category}
                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                         <label className="block text-gray-400 mb-2 text-sm">Skills (comma separated)</label>
                        <input 
                            placeholder="e.g. React, Vue, CSS, Tailwind" 
                            className="w-full bg-dark-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                            value={formData.skillsString}
                            onChange={(e) => setFormData({...formData, skillsString: e.target.value})}
                            required
                        />
                    </div>
                    <button type="submit" className={`w-full py-3 rounded-lg font-bold text-white shadow-lg transition-transform hover:-translate-y-1 ${editingId ? 'bg-gradient-to-r from-blue-600 to-cyan-600 shadow-blue-500/20' : 'bg-gradient-to-r from-orange-600 to-red-600 shadow-orange-500/20'}`}>
                        {editingId ? 'Update Category' : 'Add Category'}
                    </button>
                </div>
                </form>
            </SpotlightCard>

            <Reorder.Group axis="y" values={skillsData} onReorder={handleReorder} className="grid grid-cols-1 gap-6">
                {skillsData.map((group) => (
                    <Reorder.Item key={group._id} value={group} className="mb-4">
                        <SpotlightCard className={`p-6 relative group cursor-move ${!group.isVisible ? 'opacity-50' : ''}`} spotlightColor="rgba(249, 115, 22, 0.2)">
                        <div className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-600 cursor-move">
                            <RxDragHandleDots2 size={24} />
                        </div>
                        <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => toggleVisibility(group)} className={`${group.isVisible ? 'text-cyan-400 hover:text-cyan-300' : 'text-gray-500 hover:text-gray-400'} p-2 hover:bg-white/10 rounded-full transition-colors`} title={group.isVisible ? "Hide" : "Show"}>
                                {group.isVisible ? <MdVisibility size={22} /> : <MdVisibilityOff size={22} />}
                            </button>
                            <button onClick={() => handleEdit(group)} className="text-amber-500 hover:text-amber-300 p-2 hover:bg-white/10 rounded-full transition-colors" title="Edit">
                                <MdOutlineEdit size={22} />
                            </button>
                            <button onClick={() => handleDelete(group._id)} className="text-red-500 hover:text-red-300 p-2 hover:bg-white/10 rounded-full transition-colors" title="Delete">
                                <MdDeleteOutline size={22} />
                            </button>
                        </div>
                        
                        <h3 className="text-xl font-bold mb-4 text-gray-200 pl-12">{group.category}</h3>
                        <div className="flex flex-wrap gap-2 pl-12">
                            {group.skills.map((s, i) => (
                                <span key={i} className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-sm text-gray-300">
                                    {s}
                                </span>
                            ))}
                        </div>
                        </SpotlightCard>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    );
};

export default SkillsManager;
