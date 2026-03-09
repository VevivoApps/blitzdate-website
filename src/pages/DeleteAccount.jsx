import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const DeleteAccount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-purple text-white font-sans selection:bg-brand-magenta selection:text-white overflow-x-hidden">
      <SEO 
        title="Delete Account - BlitzDate"
        description="Instructions on how to delete your BlitzDate account and data."
        url="https://blitzdate.app/delete-account"
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
          Delete <span className="text-brand-yellow">Account</span>
        </h1>

        <div className="space-y-12 text-lg text-white/90 leading-relaxed">
          
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">How to Delete Your Account</h2>
            <p className="mb-4">
              We respect your privacy and your right to control your data. If you wish to delete your BlitzDate account and all associated data, you can do so directly within the app or by contacting our support team.
            </p>
          </section>

          <section>
            <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-brand-yellow mb-2">Option 1: In-App Deletion (Recommended)</h3>
              <p className="mb-4">This is the fastest way to delete your account.</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Open the <strong>BlitzDate</strong> app on your device.</li>
                <li>Tap on <strong>Settings</strong> (gear icon).</li>
                <li>Scroll down to the bottom and tap on <strong>Delete Account</strong>.</li>
                <li>Confirm your choice. Your account and data will be permanently deleted.</li>
              </ol>
            </div>
          </section>

          <section>
            <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-brand-yellow mb-2">Option 2: Request via Email</h3>
              <p className="mb-4">If you cannot access the app, you can request account deletion via email.</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Send an email to <a href="mailto:support@blitzdate.app" className="text-brand-yellow hover:text-white font-bold">support@blitzdate.app</a>.</li>
                <li>Use the subject line: <strong>Account Deletion Request</strong>.</li>
                <li>Please include the email address or phone number associated with your account to help us verify your identity.</li>
              </ol>
              <p className="mt-4 text-sm text-white/60">
                Note: Email requests may take up to 30 days to process after identity verification.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">What Data is Deleted?</h2>
            <p className="mb-4">
              When you delete your account, the following data is permanently removed from our active databases:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Profile Information:</strong> Name, age, photos, bio, and preferences.</li>
              <li><strong>Matches and Messages:</strong> All chat history and match connections.</li>
              <li><strong>Activity Data:</strong> Check-ins, likes, and other interaction history.</li>
            </ul>
            <p className="text-sm text-white/60 mt-4">
              Note: Some data may be retained for a limited period in our backups or as required by law (e.g., for fraud prevention or accounting purposes), in accordance with our Privacy Policy.
            </p>
          </section>

        </div>
      </div>

      <footer className="py-12 border-t border-white/10 text-center">
        <div className="text-white/60 text-sm font-medium">
          © {new Date().getFullYear()} BlitzDate
        </div>
        <div className="flex justify-center gap-6 mt-4">
           <Link to="/child-safety" className="text-white/60 hover:text-white font-medium transition-colors">Child Safety</Link>
           <a href="mailto:info@blitzdate.app" className="text-white/60 hover:text-white font-medium transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default DeleteAccount;
