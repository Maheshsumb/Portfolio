import { useState, useEffect } from 'react';
import api from '../../services/api';
import Loader from '../../components/shared/Loader';
import { FaTrash, FaPlus, FaCloudUploadAlt } from 'react-icons/fa';
import { RxDragHandleDots2 } from 'react-icons/rx';
import { MdOutlineEdit, MdDeleteOutline, MdVisibility, MdVisibilityOff } from 'react-icons/md';

import { Reorder } from 'framer-motion';
import SpotlightCard from '../../components/shared/SpotlightCard';

const ProjectsManager = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', techStack: '', githubLink: '', liveLink: '', imageUrls: [] });
    const [uploading, setUploading] = useState(false);

    const fetchProjects = async () => {
        try {
            const { data } = await api.get('/projects/all');
            // Ensure compatibility if backend returns mixed data
            const normalizedData = data.map(p => ({
                ...p,
                imageUrls: p.imageUrls && p.imageUrls.length > 0 ? p.imageUrls : (p.imageUrl ? [p.imageUrl] : [])
            }));
            setProjects(normalizedData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const toggleVisibility = async (project) => {
        try {
            const updatedProjects = projects.map(p => 
                p._id === project._id ? { ...p, isPublished: !p.isPublished } : p
            );
            setProjects(updatedProjects);
            
            await api.put(`/projects/${project._id}`, { isPublished: !project.isPublished });
        } catch (error) {
            console.error("Failed to update visibility", error);
            fetchProjects();
        }
    };

    const handleReorder = async (newOrder) => {
        setProjects(newOrder);
        try {
            const items = newOrder.map(item => item._id);
            await api.put('/projects/reorder', { items });
        } catch (error) {
            console.error("Failed to save order", error);
            fetchProjects();
        }
    };

    const handleUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        const newUrls = [];

        try {
            for (const file of files) {
                const uploadData = new FormData();
                uploadData.append('image', file);
                
                const { data } = await api.post('/upload', uploadData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                newUrls.push(data);
            }
            
            setFormData(prev => ({ 
                ...prev, 
                imageUrls: [...prev.imageUrls, ...newUrls] 
            }));
        } catch (error) {
            console.error(error);
            alert('Image upload failed');
        } finally {
            setUploading(false);
        }
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            imageUrls: prev.imageUrls.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            techStack: formData.techStack.split(',').map(s => s.trim())
        };

        try {
            if (editing) {
                await api.put(`/projects/${editing._id}`, payload);
            } else {
                await api.post('/projects', payload);
            }
            setFormData({ title: '', description: '', techStack: '', githubLink: '', liveLink: '', imageUrls: [] });
            setEditing(null);
            fetchProjects();
        } catch (error) {
            console.error(error);
            alert('Failed to save project');
        }
    };

    const handleEdit = (project) => {
        setEditing(project);
        setFormData({
            ...project,
            techStack: project.techStack.join(', '),
            imageUrls: project.imageUrls && project.imageUrls.length > 0 ? project.imageUrls : (project.imageUrl ? [project.imageUrl] : [])
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this project?')) {
            try {
                await api.delete(`/projects/${id}`);
                fetchProjects();
            } catch (error) {
                console.error(error);
            }
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-white">Manage Projects</h2>
            
            <SpotlightCard className="p-8 mb-12 shadow-2xl relative overflow-visible" spotlightColor="rgba(249, 115, 22, 0.2)">
                <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-bold mb-6 text-primary-400 border-b border-white/10 pb-2">{editing ? 'Edit Project' : 'Add New Project'}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Project Title</label>
                            <input className="w-full bg-dark-950/50 border border-white/10 p-3 rounded-lg text-white focus:border-primary-500 outline-none transition-colors" placeholder="e.g. E-Commerce Platform" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                        </div>
                        <div>
                             <label className="block text-gray-400 text-sm mb-1">Tech Stack</label>
                            <input className="w-full bg-dark-950/50 border border-white/10 p-3 rounded-lg text-white focus:border-primary-500 outline-none transition-colors" placeholder="React, Node, MongoDB" value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">GitHub Link</label>
                                <input className="w-full bg-dark-950/50 border border-white/10 p-3 rounded-lg text-white focus:border-primary-500 outline-none transition-colors" placeholder="https://github.com/..." value={formData.githubLink} onChange={e => setFormData({...formData, githubLink: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Live Demo</label>
                                <input className="w-full bg-dark-950/50 border border-white/10 p-3 rounded-lg text-white focus:border-primary-500 outline-none transition-colors" placeholder="https://..." value={formData.liveLink} onChange={e => setFormData({...formData, liveLink: e.target.value})} />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-400 text-sm mb-1">Description</label>
                            <textarea className="w-full bg-dark-950/50 border border-white/10 p-3 rounded-lg text-white focus:border-primary-500 outline-none transition-colors h-32 resize-none" placeholder="Project details..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required></textarea>
                        </div>
                        
                        <div>
                            <label className="block text-gray-400 text-sm mb-2">Project Images (Multiple)</label>
                            <div className="flex flex-wrap gap-3 mb-3">
                                {formData.imageUrls.map((url, index) => (
                                    <div key={index} className="relative group w-20 h-20 rounded-lg overflow-hidden border border-white/20">
                                        <img src={url} alt="Preview" className="w-full h-full object-cover" />
                                        <button type="button" onClick={() => removeImage(index)} className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-red-500">
                                            <FaTrash />
                                        </button>
                                    </div>
                                ))}
                                <label className="w-20 h-20 flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-primary-500 hover:text-primary-500 text-gray-500 transition-all bg-dark-950/30">
                                    {uploading ? <Loader size="small" /> : <FaPlus />}
                                    <input type="file" multiple onChange={handleUpload} className="hidden" accept="image/*" />
                                </label>
                            </div>
                            <p className="text-xs text-gray-500">Click + to upload images. Click image to remove.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex gap-4">
                    <button type="submit" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white px-8 py-3 rounded-lg font-bold shadow-lg transform hover:-translate-y-1 transition-all">{editing ? 'Update Project' : 'Create Project'}</button>
                    {editing && <button type="button" onClick={() => {setEditing(null); setFormData({ title: '', description: '', techStack: '', githubLink: '', liveLink: '', imageUrls: [] });}} className="bg-dark-800 hover:bg-dark-700 text-gray-300 px-6 py-3 rounded-lg transition-colors border border-white/10">Cancel</button>}
                </div>
                </form>
            </SpotlightCard>

            <Reorder.Group axis="y" values={projects} onReorder={handleReorder} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                    <Reorder.Item key={project._id} value={project} className="h-full">
                         <SpotlightCard className={`h-full group overflow-hidden transition-all cursor-move ${!project.isPublished ? 'opacity-50' : ''}`} spotlightColor="rgba(249, 115, 22, 0.2)">
                        <div className="h-48 bg-dark-950 relative overflow-hidden">
                             {project.imageUrls && project.imageUrls.length > 0 ? (
                                <img src={project.imageUrls[0]} alt={project.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                             ) : (
                                <div className="flex items-center justify-center h-full text-gray-600 bg-dark-900">No Image</div>
                             )}
                             <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm rounded px-2 py-1 text-xs text-white">
                                {project.imageUrls?.length || 0} Images
                             </div>
                             <div className="absolute top-2 left-2 text-white bg-black/50 p-2 rounded-full opacity-80 hover:opacity-100">
                                <RxDragHandleDots2 size={24} />
                             </div>
                        </div>
                        <div className="p-5">
                            <h3 className="text-lg font-bold mb-2 text-white">{project.title}</h3>
                             <div className="flex justify-end gap-2 mt-4">
                                <button onClick={() => toggleVisibility(project)} className={`${project.isPublished ? 'text-cyan-400 hover:text-cyan-300' : 'text-gray-500 hover:text-gray-400'} p-2 hover:bg-white/10 rounded-full transition-colors`} title={project.isPublished ? "Hide" : "Show"}>
                                    {project.isPublished ? <MdVisibility size={22} /> : <MdVisibilityOff size={22} />}
                                </button>
                                <button onClick={() => handleEdit(project)} className="text-amber-500 hover:text-amber-300 p-2 hover:bg-white/10 rounded-full transition-colors" title="Edit">
                                    <MdOutlineEdit size={22} />
                                </button>
                                <button onClick={() => handleDelete(project._id)} className="text-red-500 hover:text-red-300 p-2 hover:bg-white/10 rounded-full transition-colors" title="Delete">
                                    <MdDeleteOutline size={22} />
                                </button>
                            </div>
                        </div>
                    </SpotlightCard>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    );
};

export default ProjectsManager;
