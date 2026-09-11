import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Mail, 
  Linkedin, 
  Figma, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  Check, 
  ArrowUpRight,
  Twitter,
  Phone
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { personalInfo } = usePortfolio();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'UI/UX Design',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<typeof formData | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    if (personalInfo.email) {
      navigator.clipboard.writeText(personalInfo.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setIsSubmitting(true);
    const payload = { ...formData };
    setSubmittedData(payload);

    try {
      // Dispatches real email notification to jayanthofficial.0610@gmail.com via FormSubmit AJAX service
      await fetch('https://formsubmit.co/ajax/jayanthofficial.0610@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          projectType: payload.projectType,
          message: payload.message,
          _subject: `New Portfolio Message from ${payload.name} (${payload.projectType})`,
          _template: 'table',
        }),
      });
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        projectType: 'UI/UX Design',
        message: '',
      });
    } catch (err) {
      console.warn('FormSubmit AJAX fallback:', err);
      // Fallback direct mail client launcher
      const subject = encodeURIComponent(`Portfolio Inquiry: ${payload.projectType} from ${payload.name}`);
      const body = encodeURIComponent(`Hi Jayanth,\n\nName: ${payload.name}\nEmail: ${payload.email}\nTopic: ${payload.projectType}\n\nMessage:\n${payload.message}`);
      window.location.href = `mailto:jayanthofficial.0610@gmail.com?subject=${subject}&body=${body}`;
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenDirectEmailClient = () => {
    if (!submittedData) return;
    const subject = encodeURIComponent(`Portfolio Inquiry: ${submittedData.projectType} from ${submittedData.name}`);
    const body = encodeURIComponent(`Hi Jayanth,\n\nName: ${submittedData.name}\nEmail: ${submittedData.email}\nTopic: ${submittedData.projectType}\n\nMessage:\n${submittedData.message}`);
    window.open(`mailto:jayanthofficial.0610@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F8F9FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Get In Touch</span>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] tracking-tight">
              Let's create something meaningful together.
            </h2>
          </div>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Have an internship opening, a design challenge, freelance project, or just want to chat about Figma and UX research? I'd love to connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info & Social Profiles */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Email Contact Bento Card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4 relative">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center border border-slate-200">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Direct Gmail</span>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-sm sm:text-base font-bold text-[#0F172A] hover:text-blue-600 transition-colors break-all"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              {personalInfo.phone && (
                <div className="flex items-center gap-3.5 pt-1 border-t border-slate-100">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Phone / WhatsApp</span>
                    <a
                      href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                      className="text-sm sm:text-base font-bold text-[#0F172A] hover:text-emerald-600 transition-colors"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>
              )}

              <button
                onClick={handleCopyEmail}
                id="contact-copy-email-btn"
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Email Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Social & Portfolio Profiles Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Connect on Professional Platforms
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* LinkedIn */}
                {personalInfo.linkedin && (
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between group cursor-pointer shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <div className="mt-4">
                      <span className="block text-xs font-bold text-[#0F172A]">LinkedIn</span>
                      <span className="text-[11px] text-slate-400">Professional Profile</span>
                    </div>
                  </a>
                )}

                {/* Figma Community */}
                {personalInfo.figma && (
                  <a
                    href={personalInfo.figma}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between group cursor-pointer shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <Figma className="w-5 h-5 text-[#A259FF]" />
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <div className="mt-4">
                      <span className="block text-xs font-bold text-[#0F172A]">Figma</span>
                      <span className="text-[11px] text-slate-400">Design Profiles</span>
                    </div>
                  </a>
                )}

                {/* Twitter / X */}
                {personalInfo.twitter && (
                  <a
                    href={personalInfo.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between group cursor-pointer shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <Twitter className="w-5 h-5 text-sky-500" />
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <div className="mt-4">
                      <span className="block text-xs font-bold text-[#0F172A]">Twitter / X</span>
                      <span className="text-[11px] text-slate-400">Social</span>
                    </div>
                  </a>
                )}
              </div>
            </div>

            {/* Availability Box Bento Card */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1 shrink-0 animate-pulse"></span>
              <div>
                <strong className="block font-bold text-emerald-950">Fast Response Guarantee</strong>
                <span className="text-emerald-800">I typically reply within 12–24 hours for all design inquiries and opportunity discussions.</span>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form Bento Card */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
              <h3 className="text-xl font-bold text-[#0F172A] mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                Messages are routed directly to <strong className="text-slate-800 font-mono">jayanthofficial.0610@gmail.com</strong>.
              </p>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-emerald-900">
                    Thank you! Message Dispatched to Jayanth.
                  </h4>
                  <p className="text-xs text-emerald-700 max-w-sm mx-auto leading-relaxed">
                    Your inquiry has been sent to <strong className="underline">jayanthofficial.0610@gmail.com</strong>. Jayanth will review your note and respond shortly.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleOpenDirectEmailClient}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Also Open in Gmail / Mail App</span>
                    </button>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950 cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Sarah Connor"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#0F172A] placeholder:text-slate-400 focus:outline-hidden focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 bg-slate-50/60 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700">
                        Your Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#0F172A] placeholder:text-slate-400 focus:outline-hidden focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 bg-slate-50/60 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-project-type" className="block text-xs font-semibold text-slate-700">
                      Topic / Project Type
                    </label>
                    <select
                      id="contact-project-type"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#0F172A] focus:outline-hidden focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 bg-slate-50/60 transition-all"
                    >
                      <option value="UI/UX Design">UI/UX Design Project</option>
                      <option value="Internship / Full-Time Role">UI/UX Internship / Full-Time Role</option>
                      <option value="Mobile App Design">Mobile App Design (iOS / Android)</option>
                      <option value="Web App / SaaS Dashboard">Web App / SaaS Dashboard</option>
                      <option value="Design System in Figma">Design System Architecture in Figma</option>
                      <option value="Coffee / Mentorship Chat">General Design Chat</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your product, timeline, or design goals..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#0F172A] placeholder:text-slate-400 focus:outline-hidden focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 bg-slate-50/60 transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    id="contact-submit-btn"
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending directly to Jayanth's Gmail...</span>
                    ) : (
                      <>
                        <span>Send Message to Jayanth</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
