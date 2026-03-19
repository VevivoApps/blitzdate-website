import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Linkedin } from 'lucide-react';

function Footer({ className = '', maxWidthClass = 'max-w-4xl', contentPaddingClass = '' }) {
  const { pathname } = useLocation();
  const showChildSafety = pathname !== '/child-safety';
  const showDeleteAccount = pathname !== '/delete-account';

  return (
    <footer className={className}>
      <div className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6 sm:gap-y-8 ${maxWidthClass} mx-auto ${contentPaddingClass}`}>
        <div>
          <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-3">Legal</div>
          <div className="space-y-2">
            <a href="https://www.iubenda.com/privacy-policy/21951478" className="text-white/60 hover:text-white font-medium transition-colors block" target="_blank" rel="noopener noreferrer">Privacy</a>
            <a href="https://www.iubenda.com/terms-and-conditions/21951478" className="text-white/60 hover:text-white font-medium transition-colors block" target="_blank" rel="noopener noreferrer">Terms</a>
          </div>
        </div>

        <div>
          <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-3">Social</div>
          <div className="space-y-2">
            <a href="https://www.instagram.com/blitzdate/" className="text-white/60 hover:text-white font-medium transition-colors flex sm:inline-flex items-center justify-center sm:justify-start gap-2" target="_blank" rel="noopener noreferrer" aria-label="BlitzDate on Instagram">
              <Instagram className="w-4 h-4" />
              Instagram
            </a>
            <a href="https://www.linkedin.com/company/blitzdate-app/" className="text-white/60 hover:text-white font-medium transition-colors flex sm:inline-flex items-center justify-center sm:justify-start gap-2" target="_blank" rel="noopener noreferrer" aria-label="BlitzDate on LinkedIn">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          </div>
        </div>

        <div>
          <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-3">Safety</div>
          <div className="space-y-2">
            {showChildSafety && (
              <Link to="/child-safety" className="text-white/60 hover:text-white font-medium transition-colors block sm:inline-block">Child Safety</Link>
            )}
            {showDeleteAccount && (
              <Link to="/delete-account" className="text-white/60 hover:text-white font-medium transition-colors block sm:inline-block">Delete Account</Link>
            )}
          </div>
        </div>

        <div>
          <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-3">Support</div>
          <div className="space-y-2">
            <button type="button" onClick={() => window.blitzdateOpenCookieSettings?.()} className="text-white/60 hover:text-white font-medium transition-colors block w-full sm:w-auto">
              Cookie Settings
            </button>
            <a href="mailto:info@blitzdate.app" className="text-white/60 hover:text-white font-medium transition-colors block sm:inline-block">Contact</a>
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mt-10 text-white/50 text-xs font-medium text-center">
        © {new Date().getFullYear()} BlitzDate
      </div>
    </footer>
  );
}

export default Footer;
