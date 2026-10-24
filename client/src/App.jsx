import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import api from './services/api';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProfileProvider } from './context/ProfileContext';
import Layout from './components/shared/Layout';
import RequireAuth from './components/shared/RequireAuth';

import Home from './pages/public/Home';
import About from './pages/public/About';
import Skills from './pages/public/Skills';
import Projects from './pages/public/Projects';
import Contact from './pages/public/Contact';
import Education from './pages/public/Education';
import Experience from './pages/public/Experience';
import ProfileManager from './pages/admin/ProfileManager';
import SkillsManager from './pages/admin/SkillsManager';
import ProjectsManager from './pages/admin/ProjectsManager';
import EducationManager from './pages/admin/EducationManager';
import ExperienceManager from './pages/admin/ExperienceManager';
import CertificatesManager from './pages/admin/CertificatesManager';
import Messages from './pages/admin/Messages';
import Dashboard from './pages/admin/Dashboard';
import AdminSettings from './pages/admin/AdminSettings';

// Login Page Import (Already there)
import Login from './pages/admin/Login';

import { HelmetProvider } from 'react-helmet-async';

import ScrollToTop from './components/shared/ScrollToTop';

function App() {
  // Keep-alive ping to backend every 12 minutes to keep Render awake
  useEffect(() => {
    const PING_INTERVAL_MS = 12 * 60 * 1000; // 12 minutes

    const pingBackend = async () => {
      try {
        await api.get('/health');
      } catch (err) {
        // Silently catch errors so user UX is never interrupted
        console.debug('Keep-alive ping attempt:', err?.message);
      }
    };

    // Initial ping on app mount
    pingBackend();

    const intervalId = setInterval(pingBackend, PING_INTERVAL_MS);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <HelmetProvider>
      <AuthProvider>
      <ThemeProvider>
        <ProfileProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/login" element={<Login />} />
          
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="skills" element={<Skills />} />
            <Route path="education" element={<Education />} />
            <Route path="experience" element={<Experience />} />
            <Route path="projects" element={<Projects />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/admin" element={<Layout />}>
                <Route index element={<Dashboard />} />
                <Route path="profile" element={<ProfileManager />} />
                <Route path="skills" element={<SkillsManager />} />
                <Route path="projects" element={<ProjectsManager />} />
                <Route path="education" element={<EducationManager />} />
                <Route path="experience" element={<ExperienceManager />} />
                <Route path="certificates" element={<CertificatesManager />} />
                <Route path="messages" element={<Messages />} />
                <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>

        </Routes>

        </Router>
        </ProfileProvider>
      </ThemeProvider>
    </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
