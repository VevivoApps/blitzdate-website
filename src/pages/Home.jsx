import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, Heart, Clock, ConciergeBell } from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getDirectionClasses = () => {
    switch (direction) {
      case 'up': return 'translate-y-10';
      case 'down': return '-translate-y-10';
      case 'left': return '-translate-x-10';
      case 'right': return 'translate-x-10';
      default: return '';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${className} ${
        isVisible ? 'opacity-100 translate-y-0 translate-x-0' : `opacity-0 ${getDirectionClasses()}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Splash = ({ className }) => (
  <div className={`absolute -inset-24 z-0 flex items-center justify-center pointer-events-none ${className}`}>
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[180%] h-[180%] opacity-30 animate-blob">
      <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.9,32.3C59.6,43.1,48.3,51.8,36.4,58.7C24.5,65.6,12,70.7,-1.8,73.8C-15.6,76.9,-32.8,78,-47.5,71.8C-62.2,65.6,-74.4,52.1,-81.2,36.8C-88,21.5,-89.4,4.4,-84.9,-10.8C-80.4,-26,-70,-39.3,-58.1,-48.4C-46.2,-57.5,-32.8,-62.4,-19.8,-65.7C-6.8,-69,-2.9,-70.7,5.9,-80.9L14.7,-91.1L44.7,-76.4Z" transform="translate(100 100)" />
    </svg>
  </div>
);

const PhoneMockup = ({ children, className = "", splashColor = "text-brand-yellow" }) => (
  <div className={`relative ${className} animate-float`}>
    <Splash className={splashColor} />
    <div className={`relative mx-auto border-gray-900 bg-gray-900 border-[10px] sm:border-[14px] rounded-[2rem] sm:rounded-[2.5rem] h-[500px] w-[260px] sm:h-[600px] sm:w-[300px] shadow-2xl relative z-10`}>
      <div className="w-[100px] sm:w-[148px] h-[14px] sm:h-[18px] bg-gray-900 top-0 rounded-b-[0.8rem] sm:rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20"></div>
      <div className="h-[24px] sm:h-[32px] w-[3px] bg-gray-800 absolute -start-[13px] sm:-start-[17px] top-[60px] sm:top-[72px] rounded-s-lg"></div>
      <div className="h-[36px] sm:h-[46px] w-[3px] bg-gray-800 absolute -start-[13px] sm:-start-[17px] top-[100px] sm:top-[124px] rounded-s-lg"></div>
      <div className="h-[36px] sm:h-[46px] w-[3px] bg-gray-800 absolute -start-[13px] sm:-start-[17px] top-[144px] sm:top-[178px] rounded-s-lg"></div>
      <div className="h-[50px] sm:h-[64px] w-[3px] bg-gray-800 absolute -end-[13px] sm:-end-[17px] top-[120px] sm:top-[142px] rounded-e-lg"></div>
      <div className="rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden w-full h-full bg-white dark:bg-gray-800 relative z-10">
        {children}
      </div>
    </div>
  </div>
);



function Home() {
  // Forced update to refresh UI
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const siteUrl = 'https://blitzdate.app';
  const faqItems = [
    {
      question: 'What is BlitzDate?',
      answer:
        'BlitzDate is a dating app built for people who value their time. It focuses on real dates with active users instead of endless swiping.',
    },
    {
      question: 'How is BlitzDate different from swipe-based apps?',
      answer:
        'BlitzDate emphasizes direct invites and real matches with a shared daily cycle. You see people who are active today and focus on quality over quantity.',
    },
    {
      question: 'What does “active today” mean?',
      answer:
        'BlitzDate highlights people who have checked in today, so you are browsing a feed of users who are currently active.',
    },
    {
      question: 'Do matches and messages disappear?',
      answer:
        'Yes. Matches and messages run on a shared 24-hour cycle that resets at the same time for everyone.',
    },
    {
      question: 'Is BlitzDate only for adults?',
      answer:
        'Yes. BlitzDate is strictly for users aged 18 and older, and has a zero-tolerance policy against abuse and exploitation.',
    },
  ];

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
      '@type': 'WebSite',
      name: 'BlitzDate',
      url: siteUrl,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'MobileApplication',
      name: 'BlitzDate',
      applicationCategory: 'SocialNetworkingApplication',
      operatingSystem: 'iOS, Android',
      url: siteUrl,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <div className="min-h-screen bg-brand-purple text-white font-sans selection:bg-brand-magenta selection:text-white overflow-x-hidden">
      <SEO 
        title="BlitzDate - Skip the Wait, Spark a Date!"
        description="Join BlitzDate, the dating app for people who value their time. Real dates, active users, and no endless swiping. Download now!"
        keywords="dating app, real dates, no swiping, active users, same day dating, BlitzDate, date tonight, spontaneous dating"
        url={siteUrl}
        image={`${siteUrl}/blitz_logo_icon.png`}
        jsonLd={jsonLd}
      />
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-purple/90 backdrop-blur-md border-b border-white/10 py-3 sm:py-4 shadow-lg' : 'bg-transparent py-4 sm:py-6'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img src="/blitz_logo_icon.png" alt="BlitzDate Logo" className="h-8 w-8 sm:h-10 sm:w-10 object-contain" />
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">BlitzDate</span>
          </div>
          <a href="#download" className="px-4 py-2 sm:px-6 sm:py-2.5 bg-brand-magenta text-white rounded-full text-xs sm:text-sm font-bold hover:bg-brand-yellow hover:text-brand-dark transition-colors shadow-lg shadow-brand-magenta/20 whitespace-nowrap">
            Get the App
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-16 md:pt-48 md:pb-32 px-6 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-magenta rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-brand-yellow rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <FadeIn direction="down">
            <div className="flex flex-col sm:flex-row justify-center items-center mb-6 sm:mb-8 gap-2 sm:gap-4">
              <span className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter drop-shadow-sm">Blitz</span>
              <img src="/blitz_logo_icon.png" alt="BlitzDate Logo" className="h-16 w-16 sm:h-24 sm:w-24 object-contain drop-shadow-2xl animate-bounce-slow" />
              <span className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter drop-shadow-sm">Date</span>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 sm:mb-8 leading-[0.9] drop-shadow-sm">
              Skip The Wait<br />
              <span className="text-brand-yellow">Spark A Date<span className="inline-block animate-pulse">⚡️</span></span>
            </h1>
          </FadeIn>
          <FadeIn delay={400}>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed">
              The dating app for people who value their time. <br className="hidden md:block"/>
              No games. No endless swiping. Just real dates.
            </p>
          </FadeIn>
          <FadeIn delay={600}>
            <div className="flex justify-center gap-4">
              <a href="#download" className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-brand-magenta text-white rounded-full font-bold text-lg sm:text-xl hover:bg-brand-yellow hover:text-brand-dark transition-all hover:scale-105 shadow-xl shadow-brand-magenta/30 border-2 border-transparent">
                Download Now
              </a>
            </div>
          </FadeIn>
        </div>
      </header>

      {/* Feature 1: The Feed */}
      <section className="py-16 sm:py-24 md:py-32 bg-white text-gray-900 rounded-t-[2rem] sm:rounded-t-[3rem] mt-[-2rem] relative z-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 sm:gap-16 md:gap-24">
            <div className="w-full md:w-1/2 order-2 md:order-1 flex justify-center">
              <FadeIn direction="left" className="w-full flex justify-center">
                <PhoneMockup className="rotate-3 md:rotate-6" splashColor="text-brand-yellow">
                  <img
                    src="/websreenshot1.jpg"
                    alt="BlitzDate feed screen showing users active today"
                    className="w-full h-full object-cover"
                    draggable="false"
                  />
                </PhoneMockup>
              </FadeIn>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 flex flex-col items-center text-center">
              <FadeIn direction="right">
                <div className="w-32 h-32 sm:w-48 sm:h-48 bg-brand-purple/10 rounded-3xl flex items-center justify-center mb-6 sm:mb-8 text-brand-purple mx-auto">
                   <ConciergeBell className="w-16 h-16 sm:w-24 sm:h-24" />
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-6">
                  Only people who are <span className="text-brand-purple">active today</span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-500 leading-relaxed">
                  See people who checked in today. No inactive users, just people who are actually here.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Likes */}
      <section className="py-16 sm:py-24 md:py-32 bg-brand-purple/5 text-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 sm:gap-16 md:gap-24">
            <div className="w-full md:w-1/2 flex flex-col items-center text-center">
              <FadeIn direction="left">
                <div className="w-32 h-32 sm:w-48 sm:h-48 bg-brand-yellow/10 rounded-3xl flex items-center justify-center mb-6 sm:mb-8 text-brand-yellow mx-auto">
                   <Heart className="w-16 h-16 sm:w-24 sm:h-24" />
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-6">
                  Direct Invites. <br/><span className="text-brand-yellow">Real Matches.</span>
                </h2>
                <p className="text-lg sm:text-xl text-black leading-relaxed">
                  You don’t swipe endlessly. You choose carefully, because every match counts. We focus on quality over quantity to ensure meaningful connections.
                </p>
              </FadeIn>
            </div>
            <div className="w-full md:w-1/2 flex justify-center">
              <FadeIn direction="right" className="w-full flex justify-center">
                <PhoneMockup className="-rotate-3 md:-rotate-6" splashColor="text-brand-magenta">
                  <img
                    src="/webscreenshot2.png"
                    alt="BlitzDate invites screen showing direct invites and matches"
                    className="w-full h-full object-cover"
                    draggable="false"
                  />
                </PhoneMockup>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 3: Matches */}
      <section className="py-16 sm:py-24 md:py-32 bg-white text-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 sm:gap-16 md:gap-24">
            <div className="w-full md:w-1/2 order-2 md:order-1 flex justify-center">
              <FadeIn direction="left" className="w-full flex justify-center">
                <PhoneMockup className="rotate-2 md:rotate-3" splashColor="text-brand-purple">
                  <img
                    src="/webscreenshot3.jpg"
                    alt="BlitzDate matches screen showing time-limited daily conversations"
                    className="w-full h-full object-cover"
                    draggable="false"
                  />
                </PhoneMockup>
              </FadeIn>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2 flex flex-col items-center text-center">
              <FadeIn direction="right">
                <div className="w-32 h-32 sm:w-48 sm:h-48 bg-brand-purple/10 rounded-3xl flex items-center justify-center mb-6 sm:mb-8 text-brand-purple mx-auto">
                   <Clock className="w-16 h-16 sm:w-24 sm:h-24" />
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4 sm:mb-6">
                  Matches don’t<br />
                  <span className="text-brand-purple">sit around</span>
                </h2>
                <p className="text-lg sm:text-xl text-gray-500 leading-relaxed">
                  When you match, it’s time to talk. Every day runs on a shared 24 hour cycle that resets at the same time for everyone. When the day ends, matches and messages disappear.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 md:py-32 bg-white text-gray-900 relative overflow-hidden">
        <div className="absolute -bottom-24 left-1/2 w-96 h-96 bg-brand-purple rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-12">
            <h2 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-gray-900 mb-4 sm:mb-6">
              Frequently asked <span className="text-brand-magenta">questions</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqItems.map((item) => (
              <details key={item.question} className="group rounded-3xl border border-brand-purple/15 bg-white p-5 sm:p-6 shadow-lg shadow-brand-purple/10">
                <summary className="cursor-pointer list-none text-lg sm:text-xl font-black text-brand-purple flex items-center justify-between gap-4">
                  <span className="text-left">{item.question}</span>
                  <span className="shrink-0 w-10 h-10 rounded-full bg-brand-magenta/10 text-brand-magenta flex items-center justify-center text-2xl font-black group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-gray-700 leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>



      {/* Final CTA */}
      <section id="download" className="py-20 sm:py-32 bg-brand-purple text-white text-center px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn direction="up">
            <div className="flex justify-center mb-6 sm:mb-8">
              <img src="/blitz_logo_icon.png" alt="BlitzDate Logo" className="h-12 w-12 sm:h-16 sm:w-16 object-contain" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-6 sm:mb-8 text-brand-yellow">
              Ready to date differently?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-12">
              Join the community of people who are done with waiting.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://link.blitzdate.app/sRed" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 bg-brand-magenta text-white rounded-xl hover:bg-brand-yellow hover:text-brand-dark transition-colors w-full sm:w-auto shadow-lg shadow-brand-magenta/20">
                <Smartphone className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-xs font-semibold uppercase tracking-wider opacity-90">Download on</div>
                  <div className="text-lg font-bold">App Store</div>
                </div>
              </a>
              <a href="https://link.blitzdate.app/sRed" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-8 py-4 bg-brand-magenta text-white rounded-xl hover:bg-brand-yellow hover:text-brand-dark transition-colors w-full sm:w-auto shadow-lg shadow-brand-magenta/20">
                <div className="text-2xl">▶</div>
                <div className="text-left">
                  <div className="text-xs font-semibold uppercase tracking-wider opacity-90">Get it on</div>
                  <div className="text-lg font-bold">Google Play</div>
                </div>
              </a>
            </div>
          </FadeIn>

          <footer className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-white/60 text-sm font-medium">
              © {new Date().getFullYear()} BlitzDate
            </div>
            <div className="flex gap-8">
              <a href="https://www.iubenda.com/privacy-policy/65548284" className="text-white/60 hover:text-white font-medium transition-colors" target="_blank" rel="noopener noreferrer">Privacy</a>
              <a href="https://www.iubenda.com/terms-and-conditions/65548284" className="text-white/60 hover:text-white font-medium transition-colors" target="_blank" rel="noopener noreferrer">Terms</a>
              <button type="button" onClick={() => window.blitzdateOpenCookieSettings?.()} className="text-white/60 hover:text-white font-medium transition-colors">
                Cookie Settings
              </button>
              <Link to="/child-safety" className="text-white/60 hover:text-white font-medium transition-colors">Child Safety</Link>
              <Link to="/delete-account" className="text-white/60 hover:text-white font-medium transition-colors">Delete Account</Link>
              <a href="mailto:info@blitzdate.app" className="text-white/60 hover:text-white font-medium transition-colors">Contact</a>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}

export default Home;
