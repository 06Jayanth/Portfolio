import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Shield, 
  Lock, 
  Mail, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  LogIn, 
  Sparkles, 
  KeyRound, 
  ShieldCheck,
  Check
} from 'lucide-react';
import { signInWithGoogle } from '../lib/firebase';
import { usePortfolio, AUTHORIZED_OWNER_EMAILS } from '../context/PortfolioContext';

export const AdminLogin: React.FC = () => {
  const { currentUser, isAdmin, authLoading, loginWithAdminCredentials } = usePortfolio();
  const navigate = useNavigate();

  const [email, setEmail] = useState('jayanthofficial.0610@gmail.com');
  const [password, setPassword] = useState('Jayanth@0610');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  // If already authenticated and verified as admin, redirect to dashboard
  useEffect(() => {
    if (!authLoading && currentUser && isAdmin) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [currentUser, isAdmin, authLoading, navigate]);

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const result = await signInWithGoogle();
      const signedInEmail = result.user.email?.toLowerCase() || '';
      const isAuthorized = AUTHORIZED_OWNER_EMAILS.some(e => e.toLowerCase() === signedInEmail);

      if (!isAuthorized) {
        setErrorMessage(`Access denied: ${signedInEmail} is not authorized. Access is restricted to portfolio administrator.`);
      } else {
        setSuccessMessage('Owner authenticated via Google. Redirecting...');
        setTimeout(() => navigate('/admin/dashboard'), 600);
      }
    } catch (err: any) {
      console.error('Google Sign In failed:', err);
      setErrorMessage(err.message || 'Google authentication failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCredentialsAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please provide both username/email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      await loginWithAdminCredentials(email, password);
      setSuccessMessage('Welcome back, Jayanth! Authentication verified. Redirecting...');
      setTimeout(() => navigate('/admin/dashboard'), 600);
    } catch (err: any) {
      console.error('Login error:', err);
      setErrorMessage(err.message || 'Access Denied: Invalid administrator credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillCredentials = () => {
    setEmail('jayanthofficial.0610@gmail.com');
    setPassword('Jayanth@0610');
    setErrorMessage(null);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans selection:bg-indigo-500/20">
      
      {/* Top Header */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between py-2">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-xl border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Public Portfolio</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Portfolio Admin Portal</span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="max-w-md w-full mx-auto my-8">
        <div className="bg-[#121620] border border-white/10 rounded-3xl p-7 sm:p-9 shadow-2xl shadow-black/80 relative overflow-hidden">
          
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-12 -mt-12" />

          {/* Card Header */}
          <div className="mb-7 text-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Lock className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Administrator Login
            </h1>
            <p className="mt-1.5 text-xs text-gray-400">
              Private access reserved exclusively for Jayanth Vishwakarma
            </p>
          </div>

          {/* Saved Owner Credentials Box */}
          <div className="mb-6 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-indigo-300 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-indigo-400" />
                <span>Authorized Owner Credentials</span>
              </span>
              <button
                type="button"
                onClick={handleFillCredentials}
                className="text-[11px] font-bold text-indigo-300 hover:text-white bg-indigo-600/40 hover:bg-indigo-600/60 px-2.5 py-1 rounded-lg border border-indigo-400/30 transition-all cursor-pointer flex items-center gap-1"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Applied</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Auto Fill</span>
                  </>
                )}
              </button>
            </div>
            <div className="space-y-1 font-mono text-[11px] text-gray-300">
              <p><span className="text-gray-500 font-sans">Username:</span> jayanthofficial.0610@gmail.com</p>
              <p><span className="text-gray-500 font-sans">Password:</span> Jayanth@0610</p>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* 1. Credentials Form */}
          <form onSubmit={handleCredentialsAuth} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1.5">
                Username / Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jayanthofficial.0610@gmail.com"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-medium text-gray-300">
                  Password
                </label>
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{isLoading ? 'Verifying Credentials...' : 'Sign In to Dashboard'}</span>
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-white/10 w-full" />
            <span className="bg-[#121620] px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
              Or
            </span>
          </div>

          {/* 2. Secondary Google Sign-In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 font-semibold text-xs transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27A7.14 7.14 0 0 1 4.9 12c0-.79.14-1.57.38-2.27V6.58H1.26A11.97 11.97 0 0 0 0 12c0 1.92.45 3.74 1.26 5.42l4.02-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Sign in with Google Account</span>
          </button>

          {/* Access Policy Note */}
          <div className="mt-6 p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-gray-400 leading-relaxed text-center">
            <span className="text-gray-300 font-semibold">Access Restriction:</span> Access to this dashboard is strictly restricted. Any unauthorized attempts are blocked and logged.
          </div>
        </div>
      </main>

      {/* Footer Notice */}
      <footer className="max-w-md w-full mx-auto text-center text-xs text-gray-500 py-2">
        Protected Administrator Session • Jayanth Vishwakarma Portfolio
      </footer>
    </div>
  );
};
