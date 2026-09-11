import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { FeaturedProjects } from '../components/FeaturedProjects';
import { CaseStudyModal } from '../components/CaseStudyModal';
import { DesignPlayground } from '../components/DesignPlayground';
import { DesignProcess } from '../components/DesignProcess';
import { SkillsSection } from '../components/SkillsSection';
import { CertificationsSection } from '../components/CertificationsSection';
import { ResumeSection } from '../components/ResumeSection';
import { ResumeModal } from '../components/ResumeModal';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { usePortfolio } from '../context/PortfolioContext';

export const PublicPortfolio: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const { projects } = usePortfolio();

  // Track active section for navbar highlighting
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['work', 'about', 'playground', 'process', 'skills', 'certificates', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || null;

  const handleOpenCaseStudy = (projectId: string) => {
    setSelectedProjectId(projectId);
  };

  const handleCloseCaseStudy = () => {
    setSelectedProjectId(null);
  };

  const handleExploreWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] text-[#0F172A] selection:bg-slate-900 selection:text-white">
      {/* Primary Fixed Navbar - 100% View Only */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        activeSection={activeSection}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExploreWork={handleExploreWork}
          onOpenCaseStudy={handleOpenCaseStudy}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* 2. About Me Section */}
        <About />

        {/* 3. Featured Work Section */}
        <FeaturedProjects
          onOpenCaseStudy={handleOpenCaseStudy}
        />

        {/* 4. Design Playground (Showcase) */}
        <DesignPlayground />

        {/* 5. Design Process */}
        <DesignProcess />

        {/* 6. Skills Section */}
        <SkillsSection />

        {/* 7. Certifications & Credentials Section */}
        <CertificationsSection />

        {/* 8. Resume Banner Section */}
        <ResumeSection
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* 9. Contact Section */}
        <ContactSection />
      </main>

      {/* 10. Footer with discrete Admin link */}
      <Footer />

      {/* Full Interactive Case Study Modal */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={handleCloseCaseStudy}
          onSelectProject={handleOpenCaseStudy}
          allProjects={projects}
        />
      )}

      {/* Interactive Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
};
