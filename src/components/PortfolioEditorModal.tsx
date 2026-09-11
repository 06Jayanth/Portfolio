import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Download, 
  Upload, 
  Check, 
  Sparkles, 
  Globe, 
  Mail, 
  Linkedin, 
  Github, 
  Figma, 
  Layers, 
  Palette, 
  FolderKanban, 
  Code2, 
  Compass, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Eye
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project, PlaygroundItem, SkillItem } from '../types';

interface PortfolioEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'profile' | 'projects' | 'playground' | 'skills' | 'data';
  initialProjectId?: string | null;
  initialPlaygroundId?: string | null;
}

export const PortfolioEditorModal: React.FC<PortfolioEditorModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'profile',
  initialProjectId = null,
  initialPlaygroundId = null,
}) => {
  const {
    personalInfo,
    projects,
    playgroundItems,
    skillCategories,
    updatePersonalInfo,
    updateStat,
    addStat,
    deleteStat,
    addProject,
    updateProject,
    deleteProject,
    addPlaygroundItem,
    updatePlaygroundItem,
    deletePlaygroundItem,
    addSkill,
    updateSkill,
    deleteSkill,
    resetToDefaults,
    exportData,
    importData,
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'playground' | 'skills' | 'data'>(defaultTab);
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Synchronize active tab from props
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
      if (initialProjectId) {
        setEditingProjectId(initialProjectId);
        setIsProjectFormOpen(true);
      }
      if (initialPlaygroundId) {
        setEditingPlaygroundId(initialPlaygroundId);
        setIsPlaygroundFormOpen(true);
      }
    }
  }, [isOpen, defaultTab, initialProjectId, initialPlaygroundId]);

  const showToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  // Profile Form State
  const [profileForm, setProfileForm] = useState(personalInfo);
  useEffect(() => {
    setProfileForm(personalInfo);
  }, [personalInfo]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updatePersonalInfo(profileForm);
    showToast('Profile & social channels updated successfully!');
  };

  // Projects Management State
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState<Partial<Project>>({
    id: '',
    title: '',
    tagline: '',
    category: 'UI/UX Design • Mobile App',
    platform: 'Mobile App',
    role: 'Lead UI/UX Designer',
    duration: '4 Weeks',
    tools: ['Figma', 'FigJam', 'Auto-Layout'],
    thumbnail: '/src/assets/images/travio_app_mockup_1788620700599.jpg',
    figmaPrototypeUrl: 'https://www.figma.com',
    overview: '',
    problemStatement: '',
    designObjective: '',
  });

  const handleOpenAddProject = () => {
    setEditingProjectId(null);
    setProjectForm({
      id: `project-${Date.now().toString(36)}`,
      title: '',
      tagline: '',
      category: 'UI/UX Design • Mobile App',
      platform: 'Mobile App',
      role: 'Lead UI/UX Designer',
      duration: '4 Weeks',
      tools: ['Figma', 'FigJam', 'Design Tokens'],
      thumbnail: '/src/assets/images/travio_app_mockup_1788620700599.jpg',
      figmaPrototypeUrl: 'https://www.figma.com',
      overview: '',
      problemStatement: '',
      designObjective: '',
      targetUsers: [
        {
          persona: 'Primary User Persona',
          role: 'Core Target Demographic',
          quote: 'Looking for a clean, intuitive solution with zero friction.',
          painPoints: ['Complex navigation', 'Lack of transparency'],
        },
      ],
      userFlow: [
        {
          step: '01. Onboarding',
          action: 'Select Preferences',
          screen: 'Welcome View',
          description: 'User sets up their initial profile in under 60 seconds.',
        },
      ],
      wireframeInsights: ['Validated visual hierarchy with 5 users', 'Simplified checkout flow to 2 taps'],
      designDecisions: [
        {
          title: 'High-Contrast Card Layout',
          description: 'Utilized clean borders and subtle neutral backgrounds for maximum scannability.',
          impact: 'Improved task completion speed by 25%.',
        },
      ],
      challengesAndSolutions: [
        {
          challenge: 'Balancing data density with visual minimalism.',
          solution: 'Created progressive disclosure patterns with modal drawers.',
        },
      ],
      finalOutcome: {
        stats: [
          { label: 'Usability Score', value: '92/100' },
          { label: 'Task Success Rate', value: '96%' },
        ],
        summary: 'Successfully delivered an intuitive, production-ready design system and prototype.',
      },
      screens: [],
      colorPalette: [
        { name: 'Brand Accent', hex: '#6366F1', role: 'Primary Action' },
        { name: 'Dark Slate', hex: '#1D1D1F', role: 'Display Typography' },
      ],
      typography: [
        { style: 'Display Headings', sample: 'Space Grotesk Bold', usage: 'Titles & hero headers' },
        { style: 'Body Text', sample: 'Plus Jakarta Sans', usage: 'Descriptions & form elements' },
      ],
    });
    setIsProjectFormOpen(true);
  };

  const handleOpenEditProject = (proj: Project) => {
    setEditingProjectId(proj.id);
    setProjectForm(proj);
    setIsProjectFormOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.id) {
      alert('Please provide a project Title and ID.');
      return;
    }

    if (editingProjectId) {
      updateProject(editingProjectId, projectForm as Project);
      showToast(`Project "${projectForm.title}" updated!`);
    } else {
      addProject(projectForm as Project);
      showToast(`Project "${projectForm.title}" added successfully!`);
    }
    setIsProjectFormOpen(false);
    setEditingProjectId(null);
  };

  const handleDeleteProject = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete the project "${title}"?`)) {
      deleteProject(id);
      showToast(`Project "${title}" deleted.`);
    }
  };

  // Playground Management State
  const [isPlaygroundFormOpen, setIsPlaygroundFormOpen] = useState(false);
  const [editingPlaygroundId, setEditingPlaygroundId] = useState<string | null>(null);
  const [playgroundForm, setPlaygroundForm] = useState<Partial<PlaygroundItem>>({
    id: '',
    title: '',
    category: 'Mobile UI',
    description: '',
    image: '/src/assets/images/figma_hero_art_1788616935980.jpg',
    figmaFrame: 'Frame 101 — Exploration',
    tags: ['UI', 'Figma'],
    date: 'Jun 2026',
    color: '#6366F1',
    details: '',
  });

  const handleOpenAddPlayground = () => {
    setEditingPlaygroundId(null);
    setPlaygroundForm({
      id: `pg-${Date.now().toString(36)}`,
      title: '',
      category: 'Mobile UI',
      description: '',
      image: '/src/assets/images/figma_hero_art_1788616935980.jpg',
      figmaFrame: 'Component ❖ UI Exploration',
      tags: ['Figma', 'Interactive', 'Micro-interaction'],
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      color: '#6366F1',
      details: 'Designed with Auto-Layout and interactive variants.',
    });
    setIsPlaygroundFormOpen(true);
  };

  const handleOpenEditPlayground = (item: PlaygroundItem) => {
    setEditingPlaygroundId(item.id);
    setPlaygroundForm(item);
    setIsPlaygroundFormOpen(true);
  };

  const handleSavePlayground = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playgroundForm.title || !playgroundForm.id) {
      alert('Please provide a title.');
      return;
    }

    if (editingPlaygroundId) {
      updatePlaygroundItem(editingPlaygroundId, playgroundForm as PlaygroundItem);
      showToast(`Playground item "${playgroundForm.title}" updated!`);
    } else {
      addPlaygroundItem(playgroundForm as PlaygroundItem);
      showToast(`Playground item "${playgroundForm.title}" added!`);
    }
    setIsPlaygroundFormOpen(false);
    setEditingPlaygroundId(null);
  };

  const handleDeletePlayground = (id: string, title: string) => {
    if (confirm(`Are you sure you want to remove "${title}"?`)) {
      deletePlaygroundItem(id);
      showToast(`Removed "${title}".`);
    }
  };

  // Skills Management State
  const [newSkillCategory, setNewSkillCategory] = useState<string>('Design');
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillProficiency, setNewSkillProficiency] = useState('Advanced');
  const [newSkillContext, setNewSkillContext] = useState('');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    addSkill(newSkillCategory, {
      name: newSkillName.trim(),
      proficiency: newSkillProficiency,
      context: newSkillContext.trim() || 'Applied across mobile and web interfaces',
      tag: newSkillCategory,
    });
    setNewSkillName('');
    setNewSkillContext('');
    showToast(`Added skill "${newSkillName}" to ${newSkillCategory}!`);
  };

  // New Stat State
  const [newStatValue, setNewStatValue] = useState('');
  const [newStatLabel, setNewStatLabel] = useState('');

  const handleAddStat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStatValue.trim() || !newStatLabel.trim()) return;
    addStat({ value: newStatValue.trim(), label: newStatLabel.trim() });
    setNewStatValue('');
    setNewStatLabel('');
    showToast('New metric stat added!');
  };

  // Import / Export State
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleExport = () => {
    const jsonStr = exportData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jayanth-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('Portfolio JSON backup downloaded!');
  };

  const handleImport = () => {
    if (!importJsonText.trim()) {
      setImportStatus('Please paste valid JSON data.');
      return;
    }
    const success = importData(importJsonText);
    if (success) {
      setImportStatus('Data imported successfully!');
      showToast('All portfolio data imported!');
      setImportJsonText('');
    } else {
      setImportStatus('Failed to parse JSON. Please verify data format.');
    }
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all portfolio data back to default values? Any unsaved edits will be restored to original settings.')) {
      resetToDefaults();
      showToast('Portfolio reset to default state.');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white border border-gray-100 rounded-3xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:px-8 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-[#1D1D1F]">
                  Portfolio Manager & Editor
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold">
                  CMS Mode
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Add, edit, or remove projects, playground items, skills, and update contact links (Gmail, LinkedIn, Figma, GitHub, etc.)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="px-5 sm:px-8 pt-3 border-b border-gray-100 bg-[#F8F9FA] flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          {[
            { id: 'profile', label: 'Profile & Social Links', icon: Mail },
            { id: 'projects', label: `Projects (${projects.length})`, icon: FolderKanban },
            { id: 'playground', label: `Playground (${playgroundItems.length})`, icon: Palette },
            { id: 'skills', label: 'Skills & Stats', icon: Layers },
            { id: 'data', label: 'Backup & Reset', icon: RotateCcw },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setIsProjectFormOpen(false);
                  setIsPlaygroundFormOpen(false);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'border-indigo-600 text-indigo-600 bg-white shadow-xs font-bold'
                    : 'border-transparent text-gray-500 hover:text-black hover:bg-white/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Toast Alert */}
        {saveToast && (
          <div className="bg-emerald-50 border-b border-emerald-100 px-6 py-2.5 flex items-center justify-between text-xs text-emerald-800 font-medium animate-in fade-in">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              {saveToast}
            </span>
            <button onClick={() => setSaveToast(null)} className="text-emerald-700 hover:text-emerald-900 font-bold">
              Dismiss
            </button>
          </div>
        )}

        {/* Modal Body Container */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          
          {/* TAB 1: PROFILE & SOCIALS */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6 max-w-4xl mx-auto">
              
              {/* Personal Details Bento Box */}
              <div className="p-6 rounded-3xl bg-[#F8F9FA] border border-gray-100 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
                  <Sparkles className="w-4 h-4" />
                  <span>General Identity & Bio</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Professional Title</label>
                    <input
                      type="text"
                      value={profileForm.title}
                      onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Location</label>
                    <input
                      type="text"
                      value={profileForm.location}
                      onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Work Status / Hiring Badge</label>
                    <input
                      type="text"
                      value={profileForm.status}
                      onChange={(e) => setProfileForm({ ...profileForm, status: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Short Introduction (Hero Bio)</label>
                  <textarea
                    rows={2}
                    value={profileForm.shortBio}
                    onChange={(e) => setProfileForm({ ...profileForm, shortBio: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-700">Design Philosophy Quote</label>
                  <textarea
                    rows={3}
                    value={profileForm.designPhilosophy}
                    onChange={(e) => setProfileForm({ ...profileForm, designPhilosophy: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600"
                  />
                </div>
              </div>

              {/* Social Channels & Contact Bento Box */}
              <div className="p-6 rounded-3xl bg-[#F8F9FA] border border-gray-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
                    <Globe className="w-4 h-4" />
                    <span>Contact & Social Platforms (Gmail, LinkedIn, Figma, etc.)</span>
                  </div>
                  <span className="text-[11px] text-gray-400">Updates across whole site</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Gmail / Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-red-500" />
                      <span>Email / Gmail Address</span>
                    </label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      placeholder="e.g. yourname@gmail.com"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600 font-mono"
                      required
                    />
                    <span className="text-[11px] text-gray-400">Used for direct mailto links & contact button</span>
                  </div>

                  {/* LinkedIn */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                      <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                      <span>LinkedIn Profile URL</span>
                    </label>
                    <input
                      type="url"
                      value={profileForm.linkedin}
                      onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600 font-mono"
                    />
                    <span className="text-[11px] text-gray-400">Target for "LinkedIn" buttons in Hero & Contact</span>
                  </div>

                  {/* Figma */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                      <Figma className="w-3.5 h-3.5 text-[#A259FF]" />
                      <span>Figma Profile / Community URL</span>
                    </label>
                    <input
                      type="url"
                      value={profileForm.figma}
                      onChange={(e) => setProfileForm({ ...profileForm, figma: e.target.value })}
                      placeholder="https://figma.com/@yourusername"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600 font-mono"
                    />
                  </div>

                  {/* GitHub */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                      <Github className="w-3.5 h-3.5 text-[#1D1D1F]" />
                      <span>GitHub Profile URL</span>
                    </label>
                    <input
                      type="url"
                      value={profileForm.github}
                      onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                      placeholder="https://github.com/yourusername"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600 font-mono"
                    />
                  </div>

                  {/* Twitter / X */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                      <span>Twitter / X URL (Optional)</span>
                    </label>
                    <input
                      type="url"
                      value={profileForm.twitter || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, twitter: e.target.value })}
                      placeholder="https://x.com/yourhandle"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600 font-mono"
                    />
                  </div>

                  {/* Dribbble / Behance */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                      <span>Dribbble or Behance URL (Optional)</span>
                    </label>
                    <input
                      type="url"
                      value={profileForm.dribbble || profileForm.behance || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, dribbble: e.target.value })}
                      placeholder="https://dribbble.com/yourhandle"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-100 transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile & Links</span>
                </button>
              </div>

            </form>
          )}

          {/* TAB 2: PROJECTS MANAGEMENT */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              
              {!isProjectFormOpen ? (
                <div>
                  {/* Top Bar with Add Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-[#1D1D1F]">
                        Featured Case Studies & Projects
                      </h3>
                      <p className="text-xs text-gray-500">
                        Add new projects, update existing ones, or remove old work from your showcase.
                      </p>
                    </div>

                    <button
                      onClick={handleOpenAddProject}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1D1D1F] hover:bg-black text-white text-xs font-bold shadow-xs transition-all cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4 text-indigo-400" />
                      <span>Add New Project</span>
                    </button>
                  </div>

                  {/* Projects List */}
                  <div className="space-y-4">
                    {projects.map((proj, idx) => (
                      <div
                        key={proj.id}
                        className="p-5 rounded-2xl bg-[#F8F9FA] border border-gray-100 hover:border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                      >
                        <div className="flex items-start sm:items-center gap-4">
                          <img
                            src={proj.thumbnail}
                            alt={proj.title}
                            className="w-20 h-14 rounded-xl object-cover border border-gray-200 bg-gray-100 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/src/assets/images/travio_app_mockup_1788620700599.jpg';
                            }}
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono font-bold text-indigo-600">0{idx + 1}</span>
                              <h4 className="text-base font-bold text-[#1D1D1F]">{proj.title}</h4>
                              <span className="px-2 py-0.5 rounded-md bg-white border border-gray-200 text-[10px] font-semibold text-gray-600">
                                {proj.platform}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                              {proj.tagline || proj.overview}
                            </p>
                            <span className="text-[11px] text-gray-400 font-mono mt-1 block">
                              Duration: {proj.duration} • ID: {proj.id}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                          <button
                            onClick={() => handleOpenEditProject(proj)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:border-indigo-300 text-xs font-semibold text-gray-700 hover:text-indigo-600 transition-colors cursor-pointer shadow-2xs"
                            title="Edit project details"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => handleDeleteProject(proj.id, proj.title)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 text-xs font-semibold text-red-600 transition-colors cursor-pointer"
                            title="Delete this project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Project Add / Edit Form */
                <form onSubmit={handleSaveProject} className="space-y-6 max-w-4xl mx-auto">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div>
                      <h3 className="text-lg font-bold text-[#1D1D1F]">
                        {editingProjectId ? `Edit Project: ${projectForm.title}` : 'Add New Featured Project'}
                      </h3>
                      <p className="text-xs text-gray-500">
                        Fill in the project case study specifications below.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsProjectFormOpen(false)}
                      className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-600 cursor-pointer"
                    >
                      Back to Projects List
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-700">Project Title *</label>
                      <input
                        type="text"
                        value={projectForm.title || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        placeholder="e.g. ZenFit Mobile App"
                        className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-700">Unique Project ID (slug) *</label>
                      <input
                        type="text"
                        value={projectForm.id || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, id: e.target.value })}
                        placeholder="e.g. zenfit-mobile"
                        disabled={!!editingProjectId}
                        className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600 font-mono disabled:opacity-60"
                        required
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-gray-700">Tagline / Catchphrase</label>
                      <input
                        type="text"
                        value={projectForm.tagline || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, tagline: e.target.value })}
                        placeholder="e.g. Mindful Habit Building & Daily Activity Tracker"
                        className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-700">Category Tag</label>
                      <input
                        type="text"
                        value={projectForm.category || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                        placeholder="e.g. UI/UX Design • Mobile App"
                        className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-700">Platform Filter</label>
                      <select
                        value={projectForm.platform || 'Mobile App'}
                        onChange={(e) => setProjectForm({ ...projectForm, platform: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600"
                      >
                        <option value="Mobile App">Mobile App</option>
                        <option value="Web Application">Web Application</option>
                        <option value="SaaS & AI">SaaS & AI</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-700">Your Role</label>
                      <input
                        type="text"
                        value={projectForm.role || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, role: e.target.value })}
                        placeholder="e.g. Lead UI/UX Designer & Researcher"
                        className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-700">Duration & Timeline</label>
                      <input
                        type="text"
                        value={projectForm.duration || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, duration: e.target.value })}
                        placeholder="e.g. 5 Weeks (Research to Prototype)"
                        className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-gray-700">Thumbnail Image URL or Path</label>
                      <input
                        type="text"
                        value={projectForm.thumbnail || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, thumbnail: e.target.value })}
                        placeholder="https://... or /src/assets/images/..."
                        className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600 font-mono"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-gray-700">Figma Prototype Link</label>
                      <input
                        type="url"
                        value={projectForm.figmaPrototypeUrl || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, figmaPrototypeUrl: e.target.value })}
                        placeholder="https://www.figma.com/proto/..."
                        className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600 font-mono"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-gray-700">Tools (Comma-separated)</label>
                      <input
                        type="text"
                        value={Array.isArray(projectForm.tools) ? projectForm.tools.join(', ') : ''}
                        onChange={(e) => setProjectForm({ ...projectForm, tools: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                        placeholder="Figma, FigJam, Auto-Layout, Design Tokens"
                        className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-gray-700">Project Overview</label>
                      <textarea
                        rows={3}
                        value={projectForm.overview || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, overview: e.target.value })}
                        placeholder="High-level description of what the product does and why it was created..."
                        className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-gray-700">Problem Statement</label>
                      <textarea
                        rows={2}
                        value={projectForm.problemStatement || ''}
                        onChange={(e) => setProjectForm({ ...projectForm, problemStatement: e.target.value })}
                        placeholder="The core pain points and challenges faced by target users..."
                        className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setIsProjectFormOpen(false)}
                      className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-100 transition-all cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingProjectId ? 'Save Changes' : 'Create Project'}</span>
                    </button>
                  </div>
                </form>
              )}

            </div>
          )}

          {/* TAB 3: DESIGN PLAYGROUND MANAGEMENT */}
          {activeTab === 'playground' && (
            <div className="space-y-6">
              {!isPlaygroundFormOpen ? (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-[#1D1D1F]">
                        Design Playground & UI Explorations
                      </h3>
                      <p className="text-xs text-gray-500">
                        Manage standalone Figma screens, micro-interactions, components, and experiments.
                      </p>
                    </div>

                    <button
                      onClick={handleOpenAddPlayground}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1D1D1F] hover:bg-black text-white text-xs font-bold shadow-xs transition-all cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4 text-indigo-400" />
                      <span>Add Playground Screen</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {playgroundItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-[#F8F9FA] border border-gray-100 flex items-start justify-between gap-3 hover:border-gray-200 transition-all"
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 rounded-xl object-cover border border-gray-200 bg-gray-100 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/src/assets/images/figma_hero_art_1788616935980.jpg';
                            }}
                          />
                          <div>
                            <span className="text-[10px] font-bold text-indigo-600 uppercase">
                              {item.category}
                            </span>
                            <h4 className="text-sm font-bold text-[#1D1D1F] line-clamp-1">{item.title}</h4>
                            <span className="text-[11px] text-gray-400 font-mono block mt-0.5">
                              ❖ {item.figmaFrame}
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {item.tags.map((t, idx) => (
                                <span key={idx} className="px-2 py-0.5 rounded bg-white text-gray-600 text-[9px] border border-gray-100">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1.5 shrink-0">
                          <button
                            onClick={() => handleOpenEditPlayground(item)}
                            className="p-2 rounded-lg bg-white border border-gray-200 hover:text-indigo-600 text-gray-600 transition-colors cursor-pointer shadow-2xs"
                            title="Edit screen"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeletePlayground(item.id, item.title)}
                            className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors cursor-pointer"
                            title="Delete screen"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Playground Add/Edit Form */
                <form onSubmit={handleSavePlayground} className="space-y-4 max-w-2xl mx-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <h3 className="text-base font-bold text-[#1D1D1F]">
                      {editingPlaygroundId ? 'Edit Playground Exploration' : 'New Playground Exploration'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsPlaygroundFormOpen(false)}
                      className="text-xs text-gray-500 hover:text-black cursor-pointer"
                    >
                      Back
                    </button>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Exploration Title *</label>
                    <input
                      type="text"
                      value={playgroundForm.title || ''}
                      onChange={(e) => setPlaygroundForm({ ...playgroundForm, title: e.target.value })}
                      placeholder="e.g. AI Prompt Synthesizer Interface"
                      className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-700">Category</label>
                      <select
                        value={playgroundForm.category || 'Mobile UI'}
                        onChange={(e) => setPlaygroundForm({ ...playgroundForm, category: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600"
                      >
                        <option value="Mobile UI">Mobile UI</option>
                        <option value="Web & SaaS">Web & SaaS</option>
                        <option value="Components">Components</option>
                        <option value="Experimental">Experimental</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-700">Figma Frame Label</label>
                      <input
                        type="text"
                        value={playgroundForm.figmaFrame || ''}
                        onChange={(e) => setPlaygroundForm({ ...playgroundForm, figmaFrame: e.target.value })}
                        placeholder="Frame 404 — Micro-interaction"
                        className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600 font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Image URL</label>
                    <input
                      type="text"
                      value={playgroundForm.image || ''}
                      onChange={(e) => setPlaygroundForm({ ...playgroundForm, image: e.target.value })}
                      placeholder="https://... or /src/assets/images/..."
                      className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Tags (Comma-separated)</label>
                    <input
                      type="text"
                      value={Array.isArray(playgroundForm.tags) ? playgroundForm.tags.join(', ') : ''}
                      onChange={(e) => setPlaygroundForm({ ...playgroundForm, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                      placeholder="Figma, Mobile, Design System, Prototyping"
                      className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-700">Short Description</label>
                    <textarea
                      rows={2}
                      value={playgroundForm.description || ''}
                      onChange={(e) => setPlaygroundForm({ ...playgroundForm, description: e.target.value })}
                      placeholder="Brief note on visual hierarchy or prototype mechanics..."
                      className="w-full px-3.5 py-2.5 bg-[#F8F9FA] border border-gray-200 rounded-xl text-xs text-[#1D1D1F] focus:outline-hidden focus:border-indigo-600"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setIsPlaygroundFormOpen(false)}
                      className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 cursor-pointer shadow-xs"
                    >
                      Save Exploration
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 4: SKILLS & STATS */}
          {activeTab === 'skills' && (
            <div className="space-y-8">
              
              {/* Hero Stats Section */}
              <div className="p-6 rounded-3xl bg-[#F8F9FA] border border-gray-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#1D1D1F] uppercase tracking-wider">
                      Hero Metric Counter Stats
                    </h4>
                    <p className="text-xs text-gray-500">
                      These numbers appear across the top hero section.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {personalInfo.stats.map((st, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-white border border-gray-200/80 relative group">
                      <button
                        onClick={() => deleteStat(idx)}
                        className="absolute top-2 right-2 p-1 text-gray-300 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        title="Delete stat"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                      <input
                        type="text"
                        value={st.value}
                        onChange={(e) => updateStat(idx, { ...st, value: e.target.value })}
                        className="text-xl font-bold text-indigo-600 w-full bg-transparent border-b border-transparent focus:border-indigo-300 focus:outline-hidden"
                      />
                      <input
                        type="text"
                        value={st.label}
                        onChange={(e) => updateStat(idx, { ...st, label: e.target.value })}
                        className="text-xs text-gray-500 w-full bg-transparent border-b border-transparent focus:border-gray-300 focus:outline-hidden mt-0.5"
                      />
                    </div>
                  ))}
                </div>

                {/* Add new stat mini-form */}
                <form onSubmit={handleAddStat} className="pt-2 flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    value={newStatValue}
                    onChange={(e) => setNewStatValue(e.target.value)}
                    placeholder="e.g. 50+"
                    className="w-24 px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#1D1D1F]"
                  />
                  <input
                    type="text"
                    value={newStatLabel}
                    onChange={(e) => setNewStatLabel(e.target.value)}
                    placeholder="e.g. Design Sprints Led"
                    className="flex-1 min-w-[160px] px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs text-[#1D1D1F]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-[#1D1D1F] text-white text-xs font-bold hover:bg-black transition-colors cursor-pointer"
                  >
                    + Add Stat
                  </button>
                </form>
              </div>

              {/* Skills by Category */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-base font-bold text-[#1D1D1F]">
                      Skills & Proficiencies
                    </h4>
                    <p className="text-xs text-gray-500">
                      Add, edit or delete skill badges in Design, UX, and Tools categories.
                    </p>
                  </div>
                </div>

                {/* Add Skill Form */}
                <form onSubmit={handleAddSkill} className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex flex-wrap items-center gap-2">
                  <select
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white border border-indigo-200 text-xs font-semibold text-[#1D1D1F]"
                  >
                    <option value="Design">Design</option>
                    <option value="UX">UX</option>
                    <option value="Tools">Tools</option>
                  </select>

                  <input
                    type="text"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="Skill name (e.g. Micro-interactions)"
                    className="flex-1 min-w-[150px] px-3 py-2 rounded-xl bg-white border border-indigo-200 text-xs text-[#1D1D1F]"
                    required
                  />

                  <select
                    value={newSkillProficiency}
                    onChange={(e) => setNewSkillProficiency(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-white border border-indigo-200 text-xs font-semibold text-[#1D1D1F]"
                  >
                    <option value="Expert">Expert</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Proficient">Proficient</option>
                  </select>

                  <input
                    type="text"
                    value={newSkillContext}
                    onChange={(e) => setNewSkillContext(e.target.value)}
                    placeholder="Context / application..."
                    className="flex-1 min-w-[160px] px-3 py-2 rounded-xl bg-white border border-indigo-200 text-xs text-[#1D1D1F]"
                  />

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    + Add Skill
                  </button>
                </form>

                {/* Category Lists */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {skillCategories.map((cat) => (
                    <div key={cat.category} className="p-4 rounded-3xl bg-[#F8F9FA] border border-gray-100 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-gray-200/60">
                        <span className="font-bold text-sm text-[#1D1D1F]">{cat.category}</span>
                        <span className="text-[10px] font-mono text-gray-400">{cat.skills.length} skills</span>
                      </div>

                      <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                        {cat.skills.map((sk, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-2.5 rounded-xl bg-white border border-gray-100 flex items-start justify-between gap-2 text-xs shadow-2xs group"
                          >
                            <div>
                              <div className="flex items-center gap-1.5">
                                <strong className="text-[#1D1D1F]">{sk.name}</strong>
                                <span className="text-[9px] px-1.5 py-0.2 rounded bg-gray-100 text-gray-600">
                                  {sk.proficiency}
                                </span>
                              </div>
                              <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">{sk.context}</p>
                            </div>

                            <button
                              onClick={() => deleteSkill(cat.category, sIdx)}
                              className="text-gray-300 hover:text-red-600 p-1 opacity-40 group-hover:opacity-100 transition-opacity cursor-pointer shrink-0"
                              title="Delete skill"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          )}

          {/* TAB 5: BACKUP & RESET */}
          {activeTab === 'data' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              <div className="p-6 rounded-3xl bg-[#F8F9FA] border border-gray-100 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
                  <Download className="w-4 h-4" />
                  <span>Export Portfolio Backup</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Export all your customized projects, contact channels, bio, and playground screens as a single JSON file. You can keep this as a personal backup or migrate it to another device.
                </p>
                <button
                  onClick={handleExport}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1D1D1F] hover:bg-black text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-indigo-400" />
                  <span>Download Backup JSON</span>
                </button>
              </div>

              <div className="p-6 rounded-3xl bg-[#F8F9FA] border border-gray-100 space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
                  <Upload className="w-4 h-4" />
                  <span>Restore from JSON Backup</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Paste previously exported JSON portfolio configuration to restore your work:
                </p>
                <textarea
                  rows={4}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder='Paste JSON data here {"personalInfo": {...}, "projects": [...]}'
                  className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs font-mono text-[#1D1D1F]"
                />
                {importStatus && (
                  <div className="text-xs font-medium text-indigo-600">
                    {importStatus}
                  </div>
                )}
                <button
                  onClick={handleImport}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>Import JSON Data</span>
                </button>
              </div>

              <div className="p-6 rounded-3xl bg-red-50/70 border border-red-100 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-700">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span>Factory Reset</span>
                </div>
                <p className="text-xs text-red-900 leading-relaxed">
                  Revert all portfolio content (projects, personal info, playground items, and skills) back to original default demo data.
                </p>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All to Defaults</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:px-8 border-t border-gray-100 bg-white flex items-center justify-between text-xs text-gray-500 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Changes auto-save locally to your browser storage</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#1D1D1F] hover:bg-black text-white font-bold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
