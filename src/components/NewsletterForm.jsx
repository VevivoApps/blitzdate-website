import React, { useState } from 'react';

function NewsletterForm({ className = '' }) {
  const [email, setEmail] = useState('');
  const [websiteDetails, setWebsiteDetails] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website_details: websiteDetails }),
      });
      const data = await res.json().catch(() => ({ success: false, error: 'Unexpected response' }));
      if (data.success) {
        setStatus({ type: 'success', message: data.message || "Successfully subscribed! We'll keep you updated." });
        setEmail('');
      } else {
        setStatus({ type: 'error', message: data.error || 'Subscription failed. Please try again.' });
      }
    } catch {
      setStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      <div className="max-w-4xl mx-auto">
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-brand-purple/15 bg-white p-6 sm:p-10 shadow-2xl shadow-brand-purple/10">
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-magenta rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob pointer-events-none"></div>
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-brand-yellow rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000 pointer-events-none"></div>

          <div className="relative z-10">
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-gray-900 mb-4 text-center">
              Get BlitzDate <span className="text-brand-purple">updates</span>
            </h3>
            <p className="text-gray-600 text-center mb-7 sm:mb-8 max-w-2xl mx-auto">
              Product updates, launch news, and feature drops. No spam.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3 max-w-2xl mx-auto">
          <div className="sr-only">
            <label htmlFor="website-details">Website details</label>
            <input
              id="website-details"
              type="text"
              value={websiteDetails}
              onChange={(e) => setWebsiteDetails(e.target.value)}
              className="hidden"
              autoComplete="off"
              tabIndex="-1"
            />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="flex-1 rounded-xl border border-brand-purple/20 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-magenta"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-brand-magenta text-white font-bold hover:bg-brand-yellow hover:text-brand-dark transition-colors disabled:opacity-60 whitespace-nowrap"
          >
            {loading ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>
        {status && (
          <div className="mt-5 flex justify-center">
            <div
              className={`rounded-2xl px-4 py-2 text-sm font-bold ${
                status.type === 'success'
                  ? 'bg-brand-yellow/15 text-brand-dark border border-brand-yellow/30'
                  : 'bg-brand-magenta/10 text-brand-magenta border border-brand-magenta/20'
              }`}
            >
              {status.message}
            </div>
          </div>
        )}
            <div className="mt-5 text-xs text-gray-500 text-center">
              You can unsubscribe anytime.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsletterForm;
