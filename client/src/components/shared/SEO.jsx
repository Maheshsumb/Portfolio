import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url }) => {
    const siteTitle = 'Mahesh Sumb Portfolio';
    const siteDescription = description || 'Portfolio of Mahesh Sumb, a Full Stack Developer specializing in MERN stack, Spring Boot, and modern web development.';
    const siteUrl = url || 'https://maheshsumb.in'; // Production Domain
    const siteImage = image || 'https://res.cloudinary.com/dcw8dat4r/image/upload/v1769936320/portfolio/cy38rgy1awcwqwzbbzdw.png'; // Default profile image

    // Structured Data (JSON-LD)
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Mahesh Sumb",
        "url": siteUrl,
        "image": siteImage,
        "sameAs": [
            "https://linkedin.com/in/mahesh-sumb",
            "https://github.com/maheshsumb"
        ],
        "jobTitle": "Full Stack Developer",
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
            {/* Dynamic Favicon */}
            {image && <link rel="icon" type="image/png" href={image} />} 
            
            <meta name="description" content={siteDescription} />
            <meta name="author" content="Mahesh Sumb" />
            <meta name="keywords" content="Mahesh Sumb, Full Stack Developer, MERN Stack, Spring Boot, React Developer, Portfolio" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={siteDescription} />
            <meta property="og:image" content={siteImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={siteUrl} />
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
