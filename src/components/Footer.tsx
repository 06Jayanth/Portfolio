import React from 'react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { Figma, Linkedin, Mail, ArrowUp, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { personalInfo } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.replace('#', '');
      if (id) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        scrollToTop();
      }
    }
  };

  return (
    <footer id="main-footer" className="bg-[#F8F9FA] border-t border-gray-200/80 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b border-gray-200/60">
          
          {/* Brand Info */}
          <div className="space-y-2 max-w-sm">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#1D1D1F] text-white font-mono text-xs font-bold shadow-xs">
                {(personalInfo.name || 'J').charAt(0).toUpperCase()}
              </span>
              <span className="text-base font-bold text-[#1D1D1F]">
                {personalInfo.name}
              </span>
              <span className="text-xs text-gray-400 font-normal">|</span>
              <span className="text-xs font-medium text-gray-600">
                {personalInfo.title || 'UI/UX Designer'}
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Crafting intuitive, accessible, and human-first mobile apps and SaaS design systems in Figma.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-semibold text-gray-600">
            <a href="#" onClick={(e) => handleNavClick(e, '#')} className="hover:text-black transition-colors">
              Home
            </a>
            <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-black transition-colors">
              About
            </a>
            <a href="#work" onClick={(e) => handleNavClick(e, '#work')} className="hover:text-black transition-colors">
              Work
            </a>
            <a href="#playground" onClick={(e) => handleNavClick(e, '#playground')} className="hover:text-black transition-colors">
              Playground
            </a>
            <a href="#process" onClick={(e) => handleNavClick(e, '#process')} className="hover:text-black transition-colors">
              Process
            </a>
            <a href="#skills" onClick={(e) => handleNavClick(e, '#skills')} className="hover:text-black transition-colors">
              Skills
            </a>
            <a href="#certificates" onClick={(e) => handleNavClick(e, '#certificates')} className="hover:text-black transition-colors">
              Certificates
            </a>
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-black transition-colors">
              Contact
            </a>
          </div>

          {/* Social Links Bento Pills */}
          <div className="flex items-center gap-2">
            {personalInfo.linkedin && (
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 shadow-2xs transition-all cursor-pointer"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            {personalInfo.figma && (
              <a
                href={personalInfo.figma}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-purple-600 hover:border-purple-200 shadow-2xs transition-all cursor-pointer"
                title="Figma Profile"
              >
                <Figma className="w-4 h-4" />
              </a>
            )}
            {personalInfo.email && (
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 shadow-2xs transition-all cursor-pointer"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>

        </div>

        {/* Bottom bar with copyright and scroll to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <span className="text-[#A259FF] font-bold">❖</span>
              Designed in Figma
            </span>
            <span>•</span>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
              title="Portfolio Owner Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>

          <button
            onClick={scrollToTop}
            id="footer-back-to-top-btn"
            className="flex items-center gap-1 text-gray-500 hover:text-[#1D1D1F] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
