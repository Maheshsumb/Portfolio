import { useState, useEffect } from 'react';
import api from '../../services/api';
import Loader from '../../components/shared/Loader';
import { FaPlus, FaTrash } from 'react-icons/fa'; // Kept for file upload if needed, but actions use Md icons now
import { RxDragHandleDots2 } from 'react-icons/rx';
import { MdOutlineEdit, MdDeleteOutline, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { Reorder } from 'framer-motion';
import SpotlightCard from '../../components/shared/SpotlightCard';

const CertificatesManager = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ title: '', provider: '', year: '', certificateUrl: '' });
    const [editingId, setEditingId] = useState(null);
    const [uploading, setUploading] = useState(false);

    const fetchCertificates = async () => {
        try {
            const { data } = await api.get('/certificates');
            setCertificates(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCertificates();
    }, []);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const formDataPayload = new FormData();
        formDataPayload.append('image', file);
        setUploading(true);
        try {
            const { data } = await api.post('/upload', formDataPayload, { headers: { 'Content-Type': 'multipart/form-data' }});
            setFormData(prev => ({ ...prev, certificateUrl: data }));
        } catch (error) {
            console.error(error);
            alert('Upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/certificates/${editingId}`, formData);
            } else {
                await api.post('/certificates', formData);
            }
            setFormData({ title: '', provider: '', year: '', certificateUrl: '' });
            setEditingId(null);
            fetchCertificates();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (cert) => {
        setEditingId(cert._id);
        setFormData({
            title: cert.title,
            provider: cert.provider,
            year: cert.year,
            certificateUrl: cert.certificateUrl || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setEditingId(null);
        setFormData({ title: '', provider: '', year: '', certificateUrl: '' });
    };

    const handleDelete = async (id) => {
        if(window.confirm('Delete this certificate?')) {
            try {
                await api.delete(`/certificates/${id}`);
                fetchCertificates();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleToggleVisibility = async (cert) => {
        try {
            await api.put(`/certificates/${cert._id}`, { ...cert, isVisible: !cert.isVisible });
            fetchCertificates();
        } catch (error) {
            console.error(error);
        }
    };

    const handleReorder = (newOrder) => {
        setCertificates(newOrder);
        // Note: Backend reorder endpoint not currently implemented for certificates
        // api.put('/certificates/reorder', { items: newOrder.map(i => i._id) }).catch(console.error);
    };

    if (loading) return <Loader />;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-white">Manage Certificates</h2>
            
            <SpotlightCard className="p-8 mb-12 relative overflow-visible" spotlightColor="rgba(249, 115, 22, 0.2)">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                            {editingId ? 'Edit Certificate' : 'Add New Certificate'}
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
                                <label className="block text-gray-400 mb-2 text-sm">Certificate Title</label>
                                <input 
                                    className="w-full bg-dark-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                    placeholder="e.g. AWS Certified Solutions Architect" 
                                    value={formData.title} 
                                    onChange={e=>setFormData({...formData, title: e.target.value})} 
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Provider</label>
                                <input 
                                    className="w-full bg-dark-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                    placeholder="e.g. Amazon Web Services" 
                                    value={formData.provider} 
                                    onChange={e=>setFormData({...formData, provider: e.target.value})} 
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Year/Date</label>
                                <input 
                                    className="w-full bg-dark-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                    placeholder="e.g. 2023" 
                                    value={formData.year} 
                                    onChange={e=>setFormData({...formData, year: e.target.value})} 
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2 text-sm">Certificate File/URL</label>
                                <div className="flex gap-2">
                                    <input 
                                        className="w-full bg-dark-950/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary-500 transition-colors"
                                        placeholder="https://..." 
                                        value={formData.certificateUrl} 
                                        onChange={e=>setFormData({...formData, certificateUrl: e.target.value})} 
                                    />
                                    <label className="bg-dark-800 hover:bg-dark-700 border border-white/10 text-white px-4 py-3 rounded-lg cursor-pointer transition-colors whitespace-nowrap">
                                        {uploading ? '...' : <FaPlus />}
                                        <input type="file" onChange={handleUpload} className="hidden" />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button type="submit" className={`w-full py-3 rounded-lg font-bold text-white shadow-lg transition-transform hover:-translate-y-1 ${editingId ? 'bg-gradient-to-r from-blue-600 to-cyan-600 shadow-blue-500/20' : 'bg-gradient-to-r from-orange-600 to-red-600 shadow-orange-500/20'}`}>
                            {editingId ? 'Update Certificate' : 'Add Certificate'}
                        </button>
                    </div>
                </form>
            </SpotlightCard>

            <Reorder.Group axis="y" values={certificates} onReorder={handleReorder} className="grid grid-cols-1 gap-6">
                {certificates.map(cert => (
                    <Reorder.Item key={cert._id} value={cert} className="mb-4">
                        <SpotlightCard className={`p-6 relative group cursor-move ${cert.isVisible === false ? 'opacity-50 grayscale' : ''}`} spotlightColor="rgba(249, 115, 22, 0.2)">
                            <div className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-600 cursor-move">
                                <RxDragHandleDots2 size={24} />
                            </div>
                            
                            <div className="absolute top-4 right-4 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleEdit(cert)} className="text-amber-500 hover:text-amber-300 p-2 hover:bg-white/10 rounded-full transition-colors" title="Edit">
                                    <MdOutlineEdit size={22} />
                                </button>
                                <button onClick={() => handleToggleVisibility(cert)} className={`${cert.isVisible !== false ? 'text-primary-400' : 'text-gray-500'} hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors`} title={cert.isVisible !== false ? 'Hide' : 'Show'}>
                                    {cert.isVisible !== false ? <MdVisibility size={22} /> : <MdVisibilityOff size={22} />}
                                </button>
                                <button onClick={() => handleDelete(cert._id)} className="text-red-500 hover:text-red-300 p-2 hover:bg-white/10 rounded-full transition-colors" title="Delete">
                                    <MdDeleteOutline size={22} />
                                </button>
                            </div>

                            <div className="pl-12">
                                <h4 className="text-xl font-bold text-gray-200">{cert.title}</h4>
                                <p className="text-primary-400 font-medium mb-1">{cert.provider}</p>
                                <span className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/10 inline-block">{cert.year}</span>
                                {cert.certificateUrl && <span className="text-xs text-green-400 ml-3">PDF/Image Attached</span>}
                            </div>
                        </SpotlightCard>
                    </Reorder.Item>
                ))}
            </Reorder.Group>
        </div>
    );
};

export default CertificatesManager;
