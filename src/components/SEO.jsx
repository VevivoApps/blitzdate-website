import React from 'react';
import { Helmet } from 'react-helmet-async';

const toAbsoluteUrl = (value, baseUrl) => {
  if (!value) return value;
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  try {
    return new URL(value, baseUrl).toString();
  } catch {
    return value;
  }
};

const normalizeJsonLd = (jsonLd) => {
  if (!jsonLd) return [];
  return Array.isArray(jsonLd) ? jsonLd : [jsonLd];
};

const SEO = ({ title, description, keywords, image, url, robots, jsonLd }) => {
  const defaultTitle = "BlitzDate - Skip the Wait, Spark a Date!";
  const defaultDescription = "The dating app for people who value their time. No games. No endless swiping. Just real dates. Only people who are active today.";
  const defaultKeywords = "dating app, real dates, no swiping, active users, same day dating, BlitzDate, date tonight";
  const defaultImage = "/blitz_logo_icon.png"; // Assuming this is available in public/
  const defaultUrl = "https://blitzdate.app";

  const metaTitle = title || defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  const metaUrl = url || defaultUrl;
  const metaImage = toAbsoluteUrl(image || defaultImage, metaUrl);
  const metaRobots = robots || 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1';
  const jsonLdItems = normalizeJsonLd(jsonLd);

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content={metaRobots} />
      <meta name="theme-color" content="#9c71fe" />
      <link rel="canonical" href={metaUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="BlitzDate" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={metaUrl} />
      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={metaImage} />

      {jsonLdItems.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
