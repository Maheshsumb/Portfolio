import { useState, useEffect } from 'react';
import api from '../../services/api';
import Loader from '../../components/shared/Loader';
import SpotlightCard from '../../components/shared/SpotlightCard';

const ProfileManager = () => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState(null);

    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get('/profile');
                setFormData(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };

            const { data } = await api.post('/upload', formData, config);

            setFormData((prev) => ({ ...prev, imageUrl: data }));
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
            setMsg({ type: 'error', text: 'Image upload failed' });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put('/profile', formData);
            setMsg({ type: 'success', text: 'Profile Updated!' });
        } catch (error) {
            setMsg({ type: 'error', text: 'Update Failed' });
        }
    };



    if (loading) return <Loader />;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-white">Manage Profile</h2>
            {msg && <div className={`p-4 mb-4 rounded ${msg.type === 'success' ? 'bg-green-800' : 'bg-red-800'}`}>{msg.text}</div>}
            
            <SpotlightCard className="p-8" spotlightColor="rgba(249, 115, 22, 0.2)">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-400 mb-2">Name</label>
                            <input name="name" value={formData.name || ''} onChange={handleChange} className="w-full bg-dark-900 border border-dark-600 rounded p-2 text-gray-200" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">Title</label>
                            <input name="title" value={formData.title || ''} onChange={handleChange} className="w-full bg-dark-900 border border-dark-600 rounded p-2 text-gray-200" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">Email</label>
                            <input name="email" value={formData.email || ''} onChange={handleChange} className="w-full bg-dark-900 border border-dark-600 rounded p-2 text-gray-200" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">Phone</label>
                            <input name="phone" value={formData.phone || ''} onChange={handleChange} className="w-full bg-dark-900 border border-dark-600 rounded p-2 text-gray-200" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">Location</label>
                            <input name="location" value={formData.location || ''} onChange={handleChange} className="w-full bg-dark-900 border border-dark-600 rounded p-2 text-gray-200" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">Resume URL</label>
                            <input name="resumeUrl" value={formData.resumeUrl || ''} onChange={handleChange} className="w-full bg-dark-900 border border-dark-600 rounded p-2 text-gray-200" />
                        </div>
                         <div>
                            <label className="block text-gray-400 mb-2">GitHub URL</label>
                            <input name="github" value={formData.github || ''} onChange={handleChange} className="w-full bg-dark-900 border border-dark-600 rounded p-2 text-gray-200" />
                        </div>
                         <div>
                            <label className="block text-gray-400 mb-2">LinkedIn URL</label>
                            <input name="linkedin" value={formData.linkedin || ''} onChange={handleChange} className="w-full bg-dark-900 border border-dark-600 rounded p-2 text-gray-200" />
                        </div>
                    </div>

                    <div className="mt-6">
                         <label className="block text-gray-400 mb-2">Profile Image</label>
                         <div className="flex flex-col gap-4">
                            <div className="flex gap-4 items-center">
                                <input 
                                    type="text" 
                                    name="imageUrl" 
                                    value={formData.imageUrl || ''} 
                                    onChange={handleChange} 
                                    className="w-full bg-dark-900 border border-dark-600 rounded p-2 text-gray-300" 
                                    placeholder="Image URL" 
                                />
                                <label className="bg-dark-700 hover:bg-dark-600 text-white px-4 py-2 rounded cursor-pointer transition-colors whitespace-nowrap border border-dark-600">
                                    Choose File
                                    <input 
                                        type="file" 
                                        onChange={uploadFileHandler} 
                                        className="hidden" 
                                    />
                                </label>
                            </div>
                            {uploading && <div className="text-primary-400 text-sm animate-pulse">Uploading image...</div>}
                            {formData.imageUrl && (
                                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary-500/50">
                                    <img src={formData.imageUrl} alt="Profile Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                         </div>
                    </div>

                    <div className="mt-6">
                         <label className="block text-gray-400 mb-2">Favicon</label>
                         <div className="flex flex-col gap-4">
                            <div className="flex gap-4 items-center">
                                <input 
                                    type="text" 
                                    name="favicon" 
                                    value={formData.favicon || ''} 
                                    onChange={handleChange} 
                                    className="w-full bg-dark-900 border border-dark-600 rounded p-2 text-gray-300" 
                                    placeholder="Favicon URL" 
                                />
                                <label className="bg-dark-700 hover:bg-dark-600 text-white px-4 py-2 rounded cursor-pointer transition-colors whitespace-nowrap border border-dark-600">
                                    Upload Icon
                                    <input 
                                        type="file" 
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            const fd = new FormData();
                                            fd.append('image', file);
                                            setUploading(true);
                                            api.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
                                                .then(({ data }) => {
                                                    setFormData(prev => ({ ...prev, favicon: data }));
                                                    setUploading(false);
                                                })
                                                .catch(err => {
                                                    console.error(err);
                                                    setUploading(false);
                                                    setMsg({ type: 'error', text: 'Favicon upload failed' });
                                                });
                                        }} 
                                        className="hidden" 
                                    />
                                </label>
                            </div>
                            {formData.favicon && (
                                <div className="w-16 h-16 rounded overflow-hidden border-2 border-primary-500/50 p-2 bg-dark-800">
                                    <img src={formData.favicon} alt="Favicon Preview" className="w-full h-full object-contain" />
                                </div>
                            )}
                         </div>
                    </div>

                    <div>
                        <label className="block text-gray-400 mb-2">About</label>
                        <textarea name="about" rows="5" value={formData.about || ''} onChange={handleChange} className="w-full bg-dark-900 border border-dark-600 rounded p-2 text-gray-200"></textarea>
                    </div>
                    <button type="submit" className="bg-primary-600 hover:bg-primary-500 text-white px-6 py-3 rounded transition-colors">Update Profile</button>
                </form>
            </SpotlightCard>
        </div>
    );
};

export default ProfileManager;
