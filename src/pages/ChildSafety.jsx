import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Footer from '../components/Footer';

const ChildSafety = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const siteUrl = 'https://blitzdate.app';
  const pageUrl = `${siteUrl}/child-safety`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'BlitzDate',
      url: siteUrl,
      email: 'info@blitzdate.app',
      logo: `${siteUrl}/blitz_logo_icon.png`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Child Safety Standards - BlitzDate',
      url: pageUrl,
      isPartOf: {
        '@type': 'WebSite',
        name: 'BlitzDate',
        url: siteUrl,
      },
      about: 'Child safety standards and reporting mechanisms for BlitzDate.',
    },
  ];

  return (
    <div className="min-h-screen bg-brand-purple text-white font-sans selection:bg-brand-magenta selection:text-white overflow-x-hidden">
      <SEO 
        title="Child Safety Standards - BlitzDate"
        description="BlitzDate's commitment to child safety, reporting mechanisms, and zero-tolerance policy against abuse and exploitation."
        url={pageUrl}
        image={`${siteUrl}/blitz_logo_icon.png`}
        jsonLd={jsonLd}
      />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-brand-purple/90 backdrop-blur-md border-b border-white/10 py-3 sm:py-4 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
            <img src="/blitz_logo_icon.png" alt="BlitzDate Logo" className="h-8 w-8 sm:h-10 sm:w-10 object-contain" />
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">BlitzDate</span>
          </Link>
          <Link to="/" className="px-4 py-2 sm:px-6 sm:py-2.5 bg-brand-magenta text-white rounded-full text-xs sm:text-sm font-bold hover:bg-brand-yellow hover:text-brand-dark transition-colors shadow-lg shadow-brand-magenta/20 whitespace-nowrap">
            Back to Home
          </Link>
        </div>
      </nav>

      <div className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-white mb-8 sm:mb-12 drop-shadow-sm">
          Child Safety <span className="text-brand-yellow">Standards</span>
        </h1>

        <div className="space-y-12 text-lg text-white/90 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Our Commitment</h2>
            <p>
              BlitzDate is strictly for users aged 18 and older. We are committed to maintaining a safe environment and have a zero-tolerance policy regarding Child Sexual Abuse and Exploitation (CSAE). We prioritize the safety of minors and cooperate fully with law enforcement agencies to prevent and address any form of exploitation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Zero Tolerance for CSAE and CSAM</h2>
            <p className="mb-4">
              We prohibit any content or behavior that exploits, abuses, or endangers children. This includes, but is not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Grooming a child for sexual exploitation.</li>
              <li>Sextortion involving a minor.</li>
              <li>Trafficking of a child.</li>
              <li>Sharing, storing, or promoting Child Sexual Abuse Material (CSAM).</li>
            </ul>
            <p>
              Any user found to be engaging in such behavior or sharing such material will be immediately banned, and we will report the incident and user details to the National Center for Missing & Exploited Children (NCMEC) and relevant law enforcement authorities.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Reporting Mechanisms</h2>
            <p className="mb-4">
              We encourage users to report any suspicious behavior or content immediately. You can report directly within the BlitzDate app or via our website support channels.
            </p>
            <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-brand-yellow mb-2">How to Report in the App</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Go to the user&apos;s profile or the chat conversation.</li>
                <li>Tap the &quot;Report&quot; button (usually found in the top right menu).</li>
                <li>Select &quot;Underage User&quot; or &quot;Inappropriate Content&quot; as the reason.</li>
                <li>Provide any additional details and submit.</li>
              </ol>
            </div>
            <div className="mt-4">
              <p>
                All reports are reviewed urgently by our safety team.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Compliance with Laws</h2>
            <p>
              BlitzDate complies with all applicable child safety laws and regulations. We continuously update our policies and moderation tools to align with global safety standards and best practices, including the Tech Coalition’s best practices for Combating Online CSEA.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Child Safety Point of Contact</h2>
            <p className="mb-4">
              For any inquiries, reports, or concerns specifically related to child safety, please contact our dedicated safety team:
            </p>
            <div className="bg-brand-magenta/20 p-6 rounded-2xl border border-brand-magenta/30 inline-block">
              <p className="font-bold text-white">Email Contact:</p>
              <a href="mailto:support@blitzdate.app" className="text-brand-yellow hover:text-white text-xl font-bold transition-colors">
                support@blitzdate.app
              </a>
              <p className="text-sm text-white/60 mt-2">Please include &quot;Child Safety&quot; in the subject line for expedited review.</p>
            </div>
          </section>

        </div>
      </div>

      <Footer className="py-10 sm:py-12 border-t border-white/10 text-center" maxWidthClass="max-w-3xl" contentPaddingClass="px-6" />
    </div>
  );
};

export default ChildSafety;
