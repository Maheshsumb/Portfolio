import { Helmet } from 'react-helmet-async';
import { useProfile } from '../../context/ProfileContext';

const SEO = ({ title, description, image, url }) => {
    const { profile, loadingProfile } = useProfile();
    
    const profileName = profile?.name || 'Portfolio';
    const siteTitle = title 
        ? (loadingProfile ? title : `${title} | ${profileName}`) 
        : (loadingProfile ? 'Loading...' : `${profileName} | Full Stack Developer`);
    const siteDescription = description || profile?.about || `Portfolio of ${profileName}, a Full Stack Developer specializing in modern web development.`;
    const siteUrl = url || import.meta.env.VITE_FRONTEND_URL || 'https://www.mahehsumb.in'; 
    const siteImage = image || profile?.imageUrl || 'https://res.cloudinary.com/dcw8dat4r/image/upload/v1769936320/portfolio/cy38rgy1awcwqwzbbzdw.png'; 

    // Proper canonical URL construction
    const canonicalUrl = url || `${siteUrl}${window.location.pathname}`;

    // Structured Data (JSON-LD)
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": profileName,
        "url": siteUrl,
        "image": siteImage,
        "sameAs": [
            profile?.linkedin || "",
            profile?.github || "",
            profile?.instagram || "",
            profile?.whatsapp ? `https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}` : ""
        ].filter(Boolean),
        "jobTitle": profile?.title || "Full Stack Developer",
        "worksFor": {
            "@type": "Organization",
            "name": "Freelance"
        },
        "description": siteDescription
    };

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{siteTitle}</title>
            <link rel="canonical" href={canonicalUrl} />
            
            {/* Dynamic Favicon */}
            {image && <link rel="icon" type="image/png" href={image} />} 
            
            <meta name="description" content={siteDescription} />
            <meta name="author" content={profileName} />
            <meta name="keywords" content={`${profileName}, Full Stack Developer, Software Engineer, Portfolio, ${profile?.skills?.join(', ') || ''}`} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={siteDescription} />
            <meta property="og:image" content={siteImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={canonicalUrl} />
            <meta property="twitter:title" content={siteTitle} />
            <meta property="twitter:description" content={siteDescription} />
            <meta property="twitter:image" content={siteImage} />

            {/* Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
};


export default SEO;
