import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'bd_cookie_consent_v1';

function readConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveConsent(consent) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...consent, ts: Date.now() }));
  } catch {
    return;
  }
}

function updateGtag(consent) {
  const map = {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: consent.analytics ? 'granted' : 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
  };
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', map);
  } else {
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    gtag('consent', 'update', map);
  }
}

const CookieConsent = () => {
  const [open, setOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [mounted, setMounted] = useState(false);

  const openSettings = () => {
    const stored = readConsent();
    setAnalytics(!!stored?.analytics);
    setShowCustomize(true);
    setOpen(true);
  };

  useEffect(() => {
    setMounted(true);
    const stored = readConsent();
    if (!stored) {
      setOpen(true);
    } else {
      updateGtag(stored);
    }
    window.blitzdateOpenCookieSettings = openSettings;
    return () => {
      delete window.blitzdateOpenCookieSettings;
    };
  }, []);

  if (!mounted) return null;

  const acceptAll = () => {
    const consent = { analytics: true };
    saveConsent(consent);
    updateGtag(consent);
    setShowCustomize(false);
    setOpen(false);
  };

  const rejectAll = () => {
    const consent = { analytics: false };
    saveConsent(consent);
    updateGtag(consent);
    setShowCustomize(false);
    setOpen(false);
  };

  const savePreferences = () => {
    const consent = { analytics };
    saveConsent(consent);
    updateGtag(consent);
    setShowCustomize(false);
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center p-4 bg-black/40">
          <div className="w-full max-w-xl rounded-2xl bg-white text-gray-900 shadow-2xl border border-gray-200">
            <div className="p-6">
              <h2 className="text-lg font-bold mb-2">Cookies and similar technologies</h2>
              <p className="text-sm text-gray-600">
                We use essential cookies to make our site work. With your consent, we also use analytics
                cookies to understand how you use our site so we can improve it. You can change your choices
                at any time by selecting “Cookie Settings”.
              </p>
              {!showCustomize && (
                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <button onClick={acceptAll} className="px-5 py-2.5 rounded-xl bg-brand-magenta text-white font-semibold hover:bg-brand-yellow hover:text-brand-dark transition-colors">
                    Accept all
                  </button>
                  <button onClick={rejectAll} className="px-5 py-2.5 rounded-xl bg-gray-200 text-gray-900 font-semibold hover:bg-gray-300 transition-colors">
                    Reject all
                  </button>
                  <button onClick={() => setShowCustomize(true)} className="px-5 py-2.5 rounded-xl border border-gray-300 font-semibold hover:bg-gray-50 transition-colors">
                    Cookie settings
                  </button>
                </div>
              )}

              {showCustomize && (
                <div className="mt-5 space-y-4">
                  <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <div>
                      <div className="font-semibold text-sm">Strictly necessary</div>
                      <div className="text-xs text-gray-600">Required for core site functionality. Always on.</div>
                    </div>
                    <div className="px-3 py-1 text-xs rounded-full bg-gray-200 text-gray-700">Always on</div>
                  </div>
                  <div className="flex items-start justify-between gap-4 p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <div>
                      <div className="font-semibold text-sm">Analytics</div>
                      <div className="text-xs text-gray-600">Helps us understand site usage to improve our product.</div>
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={analytics}
                        onChange={(e) => setAnalytics(e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all relative peer-checked:bg-brand-magenta"></div>
                    </label>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button onClick={savePreferences} className="px-5 py-2.5 rounded-xl bg-brand-magenta text-white font-semibold hover:bg-brand-yellow hover:text-brand-dark transition-colors">
                      Save preferences
                    </button>
                    <button onClick={rejectAll} className="px-5 py-2.5 rounded-xl bg-gray-200 text-gray-900 font-semibold hover:bg-gray-300 transition-colors">
                      Reject all
                    </button>
                    <button onClick={acceptAll} className="px-5 py-2.5 rounded-xl border border-gray-300 font-semibold hover:bg-gray-50 transition-colors">
                      Accept all
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;
