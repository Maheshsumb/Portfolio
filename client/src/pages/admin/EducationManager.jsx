import { useState, useEffect } from 'react';
import api from '../../services/api';
import { Reorder } from 'framer-motion';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { MdOutlineEdit, MdDeleteOutline, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import SpotlightCard from '../../components/shared/SpotlightCard';

const EducationManager = () => {
    const [educationData, setEducationData] = useState([]);
    const [formData, setFormData] = useState({ degree: '', institution: '', department: '', year: '', grade: '', description: '' });
    const [editingId, setEditingId] = useState(null);

    const fetchEducation = async () => {
        try {
            const { data } = await api.get('/education/all');
            setEducationData(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchEducation();
    }, []);

    const toggleVisibility = async (edu) => {
        try {
            const updated = educationData.map(item => 
                item._id === edu._id ? { ...item, isVisible: !item.isVisible } : item
            );
            setEducationData(updated);
            await api.put(`/education/${edu._id}`, { isVisible: !edu.isVisible });
        } catch (error) {
            console.error("Failed to update visibility", error);
            fetchEducation();
        }
    };

    const handleReorder = async (newOrder) => {
        setEducationData(newOrder); // Optimistic update
        try {
            const items = newOrder.map(item => item._id);
            await api.put('/education/reorder', { items });
        } catch (error) {
            console.error("Failed to save order", error);
            fetchEducation();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/education/${editingId}`, formData);
            } else {
                await api.post('/education', formData);
            }
            setFormData({ degree: '', institution: '', department: '', year: '', grade: '', description: '' });
            setEditingId(null);
            fetchEducation();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (edu) => {
        setEditingId(edu._id);
        setFormData({ 
            degree: edu.degree, 
            institution: edu.institution,
            department: edu.department || '',
            department: edu.department || '',
            year: edu.year,
            grade: edu.grade || '',
            description: edu.description || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditingId(null);
        setFormData({ degree: '', institution: '', department: '', year: '', grade: '', description: '' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this education entry?')) {
            try {
                await api.delete(`/education/${id}`);
                fetchEducation();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-white">Manage Education</h2>
            
            <SpotlightCard className="p-8 mb-12 relative overflow-visible" spotlightColor="rgba(249, 115, 22, 0.2)">
                <form onSubmit={handleSubmit}>

                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                        {editingId ? 'Edit Education' : 'Add New Education'}
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
                            <label className="block text-gray-400 mb-2 text-sm">Degree / Certificate</label>
                            <input 
                                placeholder="e.g. Master of Computer Science" 
                                className="w-full bg-dark-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                value={formData.degree}
                                onChange={(e) => setFormData({...formData, degree: e.target.value})}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2 text-sm">Institution</label>
                            <input 
                                placeholder="e.g. Stanford University" 
                                className="w-full bg-dark-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                value={formData.institution}
                                onChange={(e) => setFormData({...formData, institution: e.target.value})}
                                required
                            />
                        </div>
                    </div>
                    <div>
                         <label className="block text-gray-400 mb-2 text-sm">Department (Optional)</label>
                        <input 
                            placeholder="e.g. Department of Computer Science" 
                            className="w-full bg-dark-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                            value={formData.department}
                            onChange={(e) => setFormData({...formData, department: e.target.value})}
                        />
                    </div>
                    <div>
                         <label className="block text-gray-400 mb-2 text-sm">Year / Period</label>
                        <input 
                            placeholder="e.g. 2020 - 2022" 
                            className="w-full bg-dark-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                            value={formData.year}
                            onChange={(e) => setFormData({...formData, year: e.target.value})}
                            required
                        />
                    </div>
                    <div>
                         <label className="block text-gray-400 mb-2 text-sm">Grade / CGPA / %</label>
                        <input 
                            placeholder="e.g. 3.8/4.0 CGPA" 
                            className="w-full bg-dark-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                            value={formData.grade}
                            onChange={(e) => setFormData({...formData, grade: e.target.value})}
                        />
                    </div>
                    <div>
                         <label className="block text-gray-400 mb-2 text-sm">Description (Optional)</label>
                        <textarea 
                            placeholder="Brief details about major, honors, etc." 
                            className="w-full bg-dark-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-500 transition-colors h-24 resize-none"
                            value={formData.description}
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                        />
                    </div>
                    <button type="submit" className={`w-full py-3 rounded-lg font-bold text-white shadow-lg transition-transform hover:-translate-y-1 ${editingId ? 'bg-gradient-to-r from-blue-600 to-cyan-600 shadow-blue-500/20' : 'bg-gradient-to-r from-orange-600 to-red-600 shadow-orange-500/20'}`}>
                        {editingId ? 'Update Education' : 'Add Education'}
                    </button>
                </div>
                </form>
            </SpotlightCard>

            <Reorder.Group axis="y" values={educationData} onReorder={handleReorder} className="grid grid-cols-1 gap-6">
                {educationData.map((edu) => (
                    <Reorder.Item key={edu._id} value={edu} className="mb-4"> {/* Added mb-4 for spacing */}
                        <SpotlightCard className={`p-6 relative group cursor-move ${!edu.isVisible ? 'opacity-50' : ''}`} spotlightColor="rgba(249, 115, 22, 0.2)">
                        <div className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-600 cursor-move">
                            <RxDragHandleDots2 size={24} />
                        </div>
                        <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => toggleVisibility(edu)} className={`${edu.isVisible ? 'text-cyan-400 hover:text-cyan-300' : 'text-gray-500 hover:text-gray-400'} p-2 hover:bg-white/10 rounded-full transition-colors`} title={edu.isVisible ? "Hide" : "Show"}>
                                {edu.isVisible ? <MdVisibility size={22} /> : <MdVisibilityOff size={22} />}
                            </button>
                            <button onClick={() => handleEdit(edu)} className="text-amber-500 hover:text-amber-300 p-2 hover:bg-white/10 rounded-full transition-colors" title="Edit">
                                <MdOutlineEdit size={22} />
                            </button>
                            <button onClick={() => handleDelete(edu._id)} className="text-red-500 hover:text-red-300 p-2 hover:bg-white/10 rounded-full transition-colors" title="Delete">
                                <MdDeleteOutline size={22} />
                            </button>
                        </div>
                        
                        <div className="pl-12">
                            <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                            <p className="text-primary-400 font-medium mb-1">
                                {edu.institution}
                                {edu.department && <span className="text-gray-400 font-normal"> • {edu.department}</span>}
                            </p>
                            <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/10 inline-block mb-3">{edu.year}</span>
                            {edu.grade && <span className="text-xs text-primary-400 bg-primary-500/10 px-2 py-1 rounded border border-primary-500/20 inline-block mb-3 ml-2 font-mono">{edu.grade}</span>}
                            {edu.description && <p className="text-gray-400 text-sm">{edu.description}</p>}
                        </div>
                        </SpotlightCard>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    );
};

export default EducationManager;
