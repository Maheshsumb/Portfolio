import ThemeSwitcher from '../../components/admin/ThemeSwitcher';
import SpotlightCard from '../../components/shared/SpotlightCard';

const AdminSettings = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-8 text-white">Admin Settings</h2>
            
            <SpotlightCard className="p-8 mb-8" spotlightColor="rgba(var(--primary) / 0.2)">
                <h3 className="text-xl font-bold mb-6 text-gray-200">Theme Preference</h3>
                <p className="text-gray-400 mb-6">Select a visual theme for the admin panel and public site.</p>
                <ThemeSwitcher />
            </SpotlightCard>
        </div>
    );
};

export default AdminSettings;
