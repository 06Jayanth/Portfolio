import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Award, 
  Palette, 
  Wrench, 
  User, 
  FileText, 
  Share2, 
  LogOut, 
  ExternalLink, 
  Plus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  RefreshCw, 
  CloudCheck, 
  AlertCircle,
  Eye,
  EyeOff,
  Save,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Sparkles,
  Link as LinkIcon,
  Upload,
  Download,
  FileUp,
  FileCheck,
  CheckCircle2,
  FileDown
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Project, Certification, PlaygroundItem, SkillItem, PersonalInfo, ProjectScreen } from '../types';
import { ImageDropZone } from '../components/ImageDropZone';
import { CaseStudyModal } from '../components/CaseStudyModal';
import { downloadDefaultResume, previewDefaultResume } from '../utils/resumeGenerator';

type DashboardTab = 'overview' | 'profile' | 'resume' | 'projects' | 'certifications' | 'playground' | 'skills' | 'contact';

export const AdminDashboard: React.FC = () => {
  const { 
    currentUser, 
    isAdmin, 
    authLoading, 
    handleSignOut,
    personalInfo,
    updatePersonalInfo,
    projects,
    addProject,
    updateProject,
    deleteProject,
    toggleProjectVisibility,
    certifications,
    addCertification,
    updateCertification,
    deleteCertification,
    toggleCertificationVisibility,
    playgroundItems,
    addPlaygroundItem,
    updatePlaygroundItem,
    deletePlaygroundItem,
    togglePlaygroundVisibility,
    skillCategories,
    addSkill,
    deleteSkill,
    seedInitialDataToFirestore,
    isFirestoreSyncing,
    lastSyncedAt,
    uploadResumePdf,
    removeResumePdf
  } = usePortfolio();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Preview Project Modal State (to inspect F2P Shooter & any project page)
  const [previewProject, setPreviewProject] = useState<Project | null>(null);

  // Resume Upload State
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [resumeFileError, setResumeFileError] = useState<string | null>(null);
  const [cloudResumeUrl, setCloudResumeUrl] = useState<string>(personalInfo.resumePdfUrl || '');
  const [isDraggingResume, setIsDraggingResume] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal / Form States
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [isAddingCert, setIsAddingCert] = useState(false);

  const [editingPlayground, setEditingPlayground] = useState<PlaygroundItem | null>(null);
  const [isAddingPlayground, setIsAddingPlayground] = useState(false);

  // New Skill Form State
  const [newSkillCategory, setNewSkillCategory] = useState<string>('Design');
  const [newSkillName, setNewSkillName] = useState<string>('');
  const [newSkillProficiency, setNewSkillProficiency] = useState<string>('Advanced');
  const [newSkillContext, setNewSkillContext] = useState<string>('');

  // Delete Confirmation Modal State
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: 'project' | 'cert' | 'playground';
    id: string;
    title: string;
  } | null>(null);

  // Profile Form Local State
  const [profileForm, setProfileForm] = useState<PersonalInfo>(personalInfo);

  useEffect(() => {
    setProfileForm(personalInfo);
    setCloudResumeUrl(personalInfo.resumePdfUrl || '');
  }, [personalInfo]);

  // Auth Guard
  useEffect(() => {
    if (!authLoading && (!currentUser || !isAdmin)) {
      navigate('/admin', { replace: true });
    }
  }, [currentUser, isAdmin, authLoading, navigate]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogout = async () => {
    await handleSignOut();
    navigate('/');
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePersonalInfo(profileForm);
    showToast('Profile and bio updated in Firestore!');
  };

  const handleSeedDatabase = async () => {
    const success = await seedInitialDataToFirestore();
    if (success) {
      showToast('All portfolio content successfully synced to Firestore!');
    } else {
      showToast('Sync completed with local cache.');
    }
  };

  // Resume PDF Upload Handler
  const handleResumeFileUpload = async (file: File) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      setResumeFileError('Invalid file format. Please upload a .pdf document.');
      return;
    }

    setResumeFileError(null);
    setIsUploadingResume(true);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const result = reader.result as string;
          const sizeFormatted = file.size > 1024 * 1024
            ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
            : `${Math.round(file.size / 1024)} KB`;

          await uploadResumePdf(result, file.name, sizeFormatted);
          showToast(`Resume "${file.name}" successfully uploaded & saved!`);
        } catch (err: any) {
          setResumeFileError('Failed to save resume: ' + (err?.message || 'Storage limit'));
        } finally {
          setIsUploadingResume(false);
        }
      };

      reader.onerror = () => {
        setResumeFileError('Failed to read PDF file.');
        setIsUploadingResume(false);
      };

      reader.readAsDataURL(file);
    } catch (err: any) {
      setResumeFileError('Error reading file: ' + err?.message);
      setIsUploadingResume(false);
    }
  };

  const handleSaveCloudResumeUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cloudResumeUrl.trim()) return;
    setIsUploadingResume(true);
    try {
      await uploadResumePdf(cloudResumeUrl.trim(), 'External_Resume.pdf', 'Hosted Document');
      showToast('Cloud Resume PDF URL saved successfully!');
    } catch (err: any) {
      setResumeFileError('Failed to update URL: ' + err?.message);
    } finally {
      setIsUploadingResume(false);
    }
  };

  const handleRemoveResume = async () => {
    await removeResumePdf();
    setCloudResumeUrl('');
    showToast('Uploaded PDF removed. Reverted to default vector resume.');
  };

  // Render Loading Guard
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0F1117] flex items-center justify-center text-white">
        <div className="flex items-center gap-3 text-sm text-gray-400">
          <RefreshCw className="w-5 h-5 animate-spin text-indigo-500" />
          <span>Verifying administrator credentials...</span>
        </div>
      </div>
    );
  }

  if (!currentUser || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1D1D1F] flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#1D1D1F] text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-white/10 animate-in fade-in slide-in-from-top-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            J
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-slate-900">Portfolio Management</h1>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-bold">
                Admin
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
              {currentUser.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Seed to Firestore Button */}
          <button
            onClick={handleSeedDatabase}
            disabled={isFirestoreSyncing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer disabled:opacity-50"
            title="Publish all projects and defaults to cloud Firestore"
          >
            <CloudCheck className={`w-3.5 h-3.5 text-blue-600 ${isFirestoreSyncing ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Sync Cloud DB</span>
          </button>

          {/* View Live Portfolio */}
          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-900 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Public Site</span>
            <ExternalLink className="w-3 h-3 ml-0.5 opacity-60" />
          </Link>

          {/* Sign Out */}
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 border border-red-200/80 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        
        {/* Navigation Sidebar */}
        <aside className="w-56 shrink-0 hidden md:flex flex-col gap-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
            Dashboard Navigation
          </div>

          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-white hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Overview & Stats</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-white hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('resume')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
              activeTab === 'resume'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-white hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4" />
              <span>Resume & CV</span>
            </div>
            {personalInfo.resumePdfUrl ? (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-700">
                PDF
              </span>
            ) : (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-slate-100 text-slate-600">
                Vector
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-white hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <FolderKanban className="w-4 h-4" />
              <span>Projects & Studies</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === 'projects' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {projects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('certifications')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
              activeTab === 'certifications'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-white hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Award className="w-4 h-4" />
              <span>Certificates</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === 'certifications' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {certifications.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('playground')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
              activeTab === 'playground'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-white hover:text-slate-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Palette className="w-4 h-4" />
              <span>Design Playground</span>
            </div>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === 'playground' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {playgroundItems.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
              activeTab === 'skills'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-white hover:text-slate-900'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Skills & Tools</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
              activeTab === 'contact'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-white hover:text-slate-900'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Social & Contact</span>
          </button>

          {/* Database Info Card */}
          <div className="mt-auto bg-white border border-slate-200 rounded-2xl p-3.5 shadow-2xs text-[11px] space-y-2">
            <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Firestore Connected</span>
            </div>
            <p className="text-slate-500 leading-tight">
              Changes sync directly to your persistent Google Cloud database.
            </p>
            {lastSyncedAt && (
              <p className="text-[10px] text-slate-400 font-mono">
                Last sync: {lastSyncedAt.toLocaleTimeString()}
              </p>
            )}
          </div>
        </aside>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden flex overflow-x-auto gap-1.5 pb-2 border-b border-slate-200 w-full mb-4 shrink-0">
          {(['overview', 'profile', 'resume', 'projects', 'certifications', 'playground', 'skills', 'contact'] as DashboardTab[]).map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap capitalize ${
                activeTab === t ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {t === 'resume' ? 'Resume PDF' : t}
            </button>
          ))}
        </div>

        {/* Main Content Pane */}
        <main className="flex-1 bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs min-h-[600px] overflow-hidden">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Welcome back, {personalInfo.name}
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Manage and publish your UI/UX portfolio case studies, official resume PDF, credentials, and profile.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                  <span className="text-xs font-medium text-slate-500">Total Projects</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">{projects.length}</div>
                  <span className="text-[10px] text-slate-400">All visible in UI</span>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                  <span className="text-xs font-medium text-slate-500">Certifications</span>
                  <div className="text-2xl font-bold text-emerald-600 mt-1">{certifications.length}</div>
                  <span className="text-[10px] text-slate-400">Verified credentials</span>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                  <span className="text-xs font-medium text-slate-500">Resume Status</span>
                  <div className="text-xs font-bold text-blue-600 mt-2 truncate">
                    {personalInfo.resumePdfUrl ? 'Custom PDF Active' : 'Default Vector PDF'}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {personalInfo.resumePdfFileName || 'ATS-Optimized'}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                  <span className="text-xs font-medium text-slate-500">Playground</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">{playgroundItems.length}</div>
                  <span className="text-[10px] text-slate-400">UI experiments</span>
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 col-span-2 sm:col-span-1">
                  <span className="text-xs font-medium text-slate-500">Skill Groups</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">{skillCategories.length}</div>
                  <span className="text-[10px] text-slate-400">Expertise areas</span>
                </div>
              </div>

              {/* F2P Shooter Case Study Spotlight */}
              {(() => {
                const f2p = projects.find(p => p.id === 'f2p-shooter') || projects[0];
                return (
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-800 relative overflow-hidden">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
                      <div className="space-y-2 max-w-xl">
                        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[11px] font-bold border border-blue-400/20">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Featured Game UI Prototype • Adobe XD</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                          {f2p?.title || 'F2P Shooter Game UI & Armory System'}
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Complete 21-screen landscape tactical shooter interface including operative loadout selector, weapon telemetry inspection, interactive audio/visual simulator, and research heuristics.
                        </p>
                        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-slate-400">
                          <span className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            {f2p?.hidden ? 'Currently Hidden' : 'Publicly Visible on Portfolio'}
                          </span>
                          <span>•</span>
                          <span>21 High-Res Screens</span>
                          <span>•</span>
                          <span>Interactive Simulator Included</span>
                        </div>
                      </div>

                      <div className="flex flex-row sm:flex-col gap-2.5 shrink-0 w-full sm:w-auto">
                        <button
                          onClick={() => setPreviewProject(f2p)}
                          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Case Study Page</span>
                        </button>
                        <button
                          onClick={() => {
                            setEditingProject(f2p);
                            setActiveTab('projects');
                          }}
                          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white border border-white/10 text-xs font-semibold transition-all cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit Case Study Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Quick Actions */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <button
                    onClick={() => {
                      setIsAddingProject(true);
                      setActiveTab('projects');
                    }}
                    className="p-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 hover:bg-slate-100/70 text-slate-800 text-left transition-colors cursor-pointer group"
                  >
                    <Plus className="w-5 h-5 mb-2 text-slate-900 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold">Add Project</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Upload new UI/UX case study</div>
                  </button>

                  <button
                    onClick={() => setActiveTab('resume')}
                    className="p-4 rounded-2xl border border-dashed border-blue-200 bg-blue-50/40 hover:bg-blue-50 text-blue-900 text-left transition-colors cursor-pointer group"
                  >
                    <FileUp className="w-5 h-5 mb-2 text-blue-600 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold">Upload Resume PDF</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Upload or update official CV</div>
                  </button>

                  <button
                    onClick={() => {
                      setIsAddingCert(true);
                      setActiveTab('certifications');
                    }}
                    className="p-4 rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50 text-emerald-900 text-left transition-colors cursor-pointer group"
                  >
                    <Award className="w-5 h-5 mb-2 text-emerald-600 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold">Add Certificate</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Internship or credential</div>
                  </button>

                  <button
                    onClick={() => setActiveTab('profile')}
                    className="p-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 hover:bg-slate-100/70 text-slate-800 text-left transition-colors cursor-pointer group"
                  >
                    <Edit3 className="w-5 h-5 mb-2 text-slate-900 group-hover:scale-110 transition-transform" />
                    <div className="text-xs font-bold">Edit Bio & Philosophy</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Update personal intro & stats</div>
                  </button>
                </div>
              </div>

              {/* Security & Public Access Status */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-900">Public Portfolio is View-Only</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1 max-w-xl">
                    Visitors at <span className="font-mono text-slate-700">/</span> see a clean, professional view. All editing controls, file uploads, and admin actions are strictly restricted to this authenticated session.
                  </p>
                </div>

                <Link
                  to="/"
                  target="_blank"
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shrink-0 transition-colors inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <span>Preview Public View</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}

          {/* TAB 2: PROFILE & BIO */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Personal Info & Bio</h2>
                  <p className="text-xs text-gray-500">Edit hero introduction, job title, and design philosophy.</p>
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={profileForm.title}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Work Status</label>
                  <input
                    type="text"
                    value={profileForm.status}
                    onChange={(e) => setProfileForm({ ...profileForm, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Short Bio (Hero Section)</label>
                <textarea
                  rows={3}
                  value={profileForm.shortBio}
                  onChange={(e) => setProfileForm({ ...profileForm, shortBio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Design Philosophy</label>
                <textarea
                  rows={3}
                  value={profileForm.designPhilosophy}
                  onChange={(e) => setProfileForm({ ...profileForm, designPhilosophy: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-indigo-500"
                />
              </div>

              {/* Stats Editor */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-2">Key Metric Stats</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {profileForm.stats.map((stat, idx) => (
                    <div key={idx} className="p-3 bg-[#F8F9FA] rounded-xl border border-gray-200/80 space-y-2">
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const newStats = [...profileForm.stats];
                          newStats[idx].value = e.target.value;
                          setProfileForm({ ...profileForm, stats: newStats });
                        }}
                        placeholder="Value (e.g. 5+)"
                        className="w-full px-2 py-1 rounded-lg border border-gray-200 text-xs font-bold"
                      />
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => {
                          const newStats = [...profileForm.stats];
                          newStats[idx].label = e.target.value;
                          setProfileForm({ ...profileForm, stats: newStats });
                        }}
                        placeholder="Label (e.g. Projects Shipped)"
                        className="w-full px-2 py-1 rounded-lg border border-gray-200 text-[11px] text-gray-600"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Resume Link in Profile Tab */}
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Official Resume / Curriculum Vitae</div>
                    <div className="text-[11px] text-slate-500">
                      {personalInfo.resumePdfUrl ? (
                        <span className="text-emerald-700 font-semibold">
                          Custom PDF active: {personalInfo.resumePdfFileName || 'Resume.pdf'} ({personalInfo.resumePdfSize || 'Ready'})
                        </span>
                      ) : (
                        <span>Default ATS vector PDF active. You can upload an official PDF document.</span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('resume')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer shrink-0 shadow-2xs"
                >
                  <FileUp className="w-3.5 h-3.5" />
                  <span>Manage Resume PDF</span>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save All Profile Changes</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB: RESUME & CV MANAGEMENT */}
          {activeTab === 'resume' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Curriculum Vitae & Resume PDF</h2>
                  <p className="text-xs text-slate-500">
                    Upload your official resume PDF document. Recruiters clicking "Download Resume" will receive this exact file.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (personalInfo.resumePdfUrl) {
                        window.open(personalInfo.resumePdfUrl, '_blank');
                      } else {
                        previewDefaultResume();
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer"
                    title="Open in new browser tab"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Preview Document</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (personalInfo.resumePdfUrl) {
                        const link = document.createElement('a');
                        link.href = personalInfo.resumePdfUrl;
                        link.download = personalInfo.resumePdfFileName || 'Jayanth_Vishwakarma_UX_Resume.pdf';
                        link.click();
                      } else {
                        downloadDefaultResume(personalInfo.resumePdfFileName || 'Jayanth_Vishwakarma_UX_Resume.pdf');
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download File</span>
                  </button>
                </div>
              </div>

              {/* Status & Active Document Card */}
              <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-slate-900">
                        {personalInfo.resumePdfFileName || 'Jayanth_Vishwakarma_UX_Resume.pdf'}
                      </h3>
                      {personalInfo.resumePdfUrl ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          Custom PDF Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          Default Vector ATS Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {personalInfo.resumePdfUrl ? (
                        <>
                          File Size: <span className="font-semibold text-slate-700">{personalInfo.resumePdfSize || 'Stored document'}</span> • 
                          Updated: <span className="font-semibold text-slate-700">{personalInfo.resumePdfUpdatedAt ? new Date(personalInfo.resumePdfUpdatedAt).toLocaleDateString() : 'Recently'}</span>
                        </>
                      ) : (
                        'Clean single-column ATS vector layout dynamically formatted from your bio & projects.'
                      )}
                    </p>
                  </div>
                </div>

                {personalInfo.resumePdfUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveResume}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Revert to Default Resume</span>
                  </button>
                )}
              </div>

              {/* Upload Zone (Drag and drop or Browse) */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDraggingResume(true);
                }}
                onDragLeave={() => setIsDraggingResume(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDraggingResume(false);
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleResumeFileUpload(file);
                }}
                className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center transition-all ${
                  isDraggingResume
                    ? 'border-blue-500 bg-blue-50/60 scale-[1.01]'
                    : 'border-slate-300 hover:border-blue-400 bg-slate-50/40 hover:bg-blue-50/20'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleResumeFileUpload(file);
                  }}
                />

                <div className="flex flex-col items-center justify-center max-w-md mx-auto space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
                    {isUploadingResume ? (
                      <RefreshCw className="w-6 h-6 animate-spin" />
                    ) : (
                      <FileUp className="w-6 h-6" />
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900">
                      {isUploadingResume ? 'Processing & Saving Resume...' : 'Upload your Official Resume PDF'}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Drag & drop your PDF file here, or click to browse your computer
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled={isUploadingResume}
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Select PDF File</span>
                  </button>

                  <p className="text-[11px] text-slate-400">
                    Supports PDF documents up to 10 MB. Encoded securely into database storage.
                  </p>

                  {resumeFileError && (
                    <div className="w-full p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium text-left">
                      {resumeFileError}
                    </div>
                  )}
                </div>
              </div>

              {/* External Cloud Link Option */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 space-y-3">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Alternative: Link Cloud-Hosted Resume URL
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Alternatively, paste a direct link to your resume PDF hosted on Google Drive, Dropbox, Notion, or personal CDN.
                  </p>
                </div>

                <form onSubmit={handleSaveCloudResumeUrl} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="url"
                    value={cloudResumeUrl}
                    onChange={(e) => setCloudResumeUrl(e.target.value)}
                    placeholder="https://drive.google.com/file/d/.../view or https://domain.com/resume.pdf"
                    className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-blue-500 font-mono"
                  />
                  <button
                    type="submit"
                    disabled={isUploadingResume || !cloudResumeUrl.trim()}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shrink-0 transition-colors disabled:opacity-50 cursor-pointer shadow-2xs"
                  >
                    Save Cloud URL
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: PROJECTS & CASE STUDIES */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Featured Projects & Case Studies</h2>
                  <p className="text-xs text-slate-500">Manage case studies, figma prototypes, and screen assets.</p>
                </div>
                <button
                  onClick={() => setIsAddingProject(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Dedicated F2P Shooter Case Study Showcase */}
              {(() => {
                const f2p = projects.find(p => p.id === 'f2p-shooter');
                if (!f2p) return null;
                return (
                  <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                    <div className="flex items-center gap-4">
                      <img
                        src={f2p.thumbnail}
                        alt={f2p.title}
                        className="w-20 h-14 rounded-2xl object-cover border border-slate-700 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-400/20">
                            F2P Shooter Showcase
                          </span>
                          <span className="text-xs text-slate-400">21 High-Res Screens</span>
                        </div>
                        <h3 className="text-sm font-bold text-white mt-1">{f2p.title}</h3>
                        <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">{f2p.tagline}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        onClick={() => setPreviewProject(f2p)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Full Page</span>
                      </button>
                      <button
                        onClick={() => setEditingProject(f2p)}
                        className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-colors cursor-pointer"
                        title="Edit F2P Shooter"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* Projects List */}
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={proj.thumbnail}
                        alt={proj.title}
                        className="w-16 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{proj.title}</h4>
                          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-semibold text-slate-600">
                            {proj.platform}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{proj.tagline}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-slate-400 font-mono">ID: {proj.id}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-[10px] text-blue-600 font-medium">{proj.tools.slice(0, 3).join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {/* View Page Button */}
                      <button
                        onClick={() => setPreviewProject(proj)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                        title="View full case study page"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Page</span>
                      </button>

                      <button
                        onClick={async () => {
                          await toggleProjectVisibility(proj.id);
                          showToast(`Project ${proj.hidden ? 'is now visible on public portfolio' : 'is now hidden from public portfolio'}`);
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          proj.hidden
                            ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
                            : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                        }`}
                        title={proj.hidden ? 'Hidden from public. Click to show.' : 'Visible on public portfolio. Click to hide.'}
                      >
                        {proj.hidden ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Hidden</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Visible</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setEditingProject(proj)}
                        className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-200 transition-colors cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setDeleteConfirm({ type: 'project', id: proj.id, title: proj.title })}
                        className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CERTIFICATIONS */}
          {activeTab === 'certifications' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Certificates & Internships</h2>
                  <p className="text-xs text-gray-500">Manage professional UI/UX certificates, internship completion records, and verification links.</p>
                </div>
                <button
                  onClick={() => setIsAddingCert(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Certificate</span>
                </button>
              </div>

              {/* Certifications List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="p-5 bg-[#F8F9FA] rounded-2xl border border-gray-200/80 flex flex-col justify-between gap-3 hover:border-indigo-200 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-white border border-gray-200 text-[11px] font-bold text-gray-800">
                          {cert.issuer}
                        </span>
                        <span className="text-[11px] text-gray-500">{cert.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-gray-900">{cert.title}</h4>
                      {(cert.certificateId || cert.internId) && (
                        <div className="text-[11px] font-mono text-indigo-600 font-semibold mt-0.5">
                          ID: {cert.certificateId || cert.internId}
                        </div>
                      )}
                      {cert.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{cert.description}</p>
                      )}
                      {cert.tags && cert.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {cert.tags.map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-white text-[10px] text-gray-600 border border-gray-100">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200/60">
                      {cert.credentialUrl ? (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:underline"
                        >
                          <LinkIcon className="w-3 h-3" />
                          <span>Verification Link</span>
                        </a>
                      ) : <span />}

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={async () => {
                            await toggleCertificationVisibility(cert.id);
                            showToast(`Certificate ${cert.hidden ? 'is now visible on public portfolio' : 'is now hidden from public portfolio'}`);
                          }}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                            cert.hidden
                              ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
                              : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                          }`}
                          title={cert.hidden ? 'Hidden from public. Click to show.' : 'Visible on public portfolio. Click to hide.'}
                        >
                          {cert.hidden ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span>Hidden</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              <span>Visible</span>
                            </>
                          )}
                        </button>
                        <button
                          onClick={() => setEditingCert(cert)}
                          className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-indigo-600 cursor-pointer"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ type: 'cert', id: cert.id, title: cert.title })}
                          className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-red-600 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PLAYGROUND */}
          {activeTab === 'playground' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Design Playground Items</h2>
                  <p className="text-xs text-gray-500">Manage interactive micro-interactions and experiment cards.</p>
                </div>
                <button
                  onClick={() => setIsAddingPlayground(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Item</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {playgroundItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-[#F8F9FA] rounded-2xl border border-gray-200/80 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 rounded-xl object-cover border border-gray-200 shrink-0"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-indigo-600 uppercase">{item.category}</span>
                        <h4 className="text-xs font-bold text-gray-900">{item.title}</h4>
                        <p className="text-[11px] text-gray-500 line-clamp-1">{item.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={async () => {
                          await togglePlaygroundVisibility(item.id);
                          showToast(`Playground item ${item.hidden ? 'is now visible on public portfolio' : 'is now hidden from public portfolio'}`);
                        }}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                          item.hidden
                            ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
                            : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                        }`}
                        title={item.hidden ? 'Hidden from public. Click to show.' : 'Visible on public portfolio. Click to hide.'}
                      >
                        {item.hidden ? (
                          <>
                            <EyeOff className="w-3.5 h-3.5" />
                            <span>Hidden</span>
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5" />
                            <span>Visible</span>
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => setEditingPlayground(item)}
                        className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-indigo-600 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm({ type: 'playground', id: item.id, title: item.title })}
                        className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-red-600 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SKILLS */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Skills & Tooling</h2>
                <p className="text-xs text-gray-500">Manage categories and competencies rendered in the Skills section.</p>
              </div>

              {/* Add New Skill Bar */}
              <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 flex flex-col sm:flex-row gap-2.5 items-end">
                <div className="w-full sm:w-1/4">
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">Category</label>
                  <select
                    value={newSkillCategory}
                    onChange={(e) => setNewSkillCategory(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-gray-200 text-xs"
                  >
                    {skillCategories.map(c => (
                      <option key={c.category} value={c.category}>{c.category}</option>
                    ))}
                  </select>
                </div>

                <div className="w-full sm:w-1/3">
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">Skill Name</label>
                  <input
                    type="text"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="e.g. Design Systems"
                    className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-gray-200 text-xs"
                  />
                </div>

                <div className="w-full sm:w-1/3">
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">Context / Description</label>
                  <input
                    type="text"
                    value={newSkillContext}
                    onChange={(e) => setNewSkillContext(e.target.value)}
                    placeholder="e.g. Auto-Layout, Variables"
                    className="w-full px-2.5 py-1.5 rounded-xl bg-white border border-gray-200 text-xs"
                  />
                </div>

                <button
                  type="button"
                  onClick={async () => {
                    if (!newSkillName.trim()) return;
                    await addSkill(newSkillCategory, {
                      name: newSkillName.trim(),
                      proficiency: newSkillProficiency,
                      context: newSkillContext.trim()
                    });
                    setNewSkillName('');
                    setNewSkillContext('');
                    showToast(`Added ${newSkillName} to ${newSkillCategory}!`);
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shrink-0 cursor-pointer"
                >
                  Add Skill
                </button>
              </div>

              {/* Categorized Skills Display */}
              <div className="space-y-6">
                {skillCategories.map((cat) => (
                  <div key={cat.category} className="space-y-2.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      {cat.category} ({cat.skills.length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {cat.skills.map((skill, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-[#F8F9FA] rounded-xl border border-gray-200/80 flex items-center justify-between gap-2"
                        >
                          <div>
                            <div className="text-xs font-bold text-gray-900">{skill.name}</div>
                            {skill.context && (
                              <div className="text-[10px] text-gray-500">{skill.context}</div>
                            )}
                          </div>
                          <button
                            onClick={async () => {
                              await deleteSkill(cat.category, idx);
                              showToast(`Deleted ${skill.name}`);
                            }}
                            className="p-1 text-gray-400 hover:text-red-600 rounded cursor-pointer"
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
          )}

          {/* TAB 7: SOCIAL & CONTACT */}
          {activeTab === 'contact' && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Social Links & Contact Info</h2>
                <p className="text-xs text-gray-500">Update your email, phone, LinkedIn, Figma, and Behance links.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={profileForm.phone || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={profileForm.linkedin}
                    onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Figma Profile URL</label>
                  <input
                    type="url"
                    value={profileForm.figma}
                    onChange={(e) => setProfileForm({ ...profileForm, figma: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Behance Profile URL</label>
                  <input
                    type="url"
                    value={profileForm.behance || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, behance: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Dribbble Profile URL</label>
                  <input
                    type="url"
                    value={profileForm.dribbble || ''}
                    onChange={(e) => setProfileForm({ ...profileForm, dribbble: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Contact Details</span>
                </button>
              </div>
            </form>
          )}

        </main>
      </div>

      {/* MODAL: ADD / EDIT CERTIFICATION */}
      {(isAddingCert || editingCert) && (
        <CertificationModal
          cert={editingCert}
          onClose={() => {
            setIsAddingCert(false);
            setEditingCert(null);
          }}
          onSave={async (certData) => {
            if (editingCert) {
              await updateCertification(editingCert.id, certData);
              showToast('Certification updated successfully!');
            } else {
              const newCert: Certification = {
                ...certData,
                id: `cert-${Date.now()}`
              };
              await addCertification(newCert);
              showToast('New certification added!');
            }
            setIsAddingCert(false);
            setEditingCert(null);
          }}
        />
      )}

      {/* MODAL: ADD / EDIT PROJECT */}
      {(isAddingProject || editingProject) && (
        <ProjectModal
          project={editingProject}
          onClose={() => {
            setIsAddingProject(false);
            setEditingProject(null);
          }}
          onSave={async (projData) => {
            if (editingProject) {
              await updateProject(editingProject.id, projData);
              showToast('Project updated successfully!');
            } else {
              const newProj: Project = {
                ...projData,
                id: projData.id || `project-${Date.now()}`
              };
              await addProject(newProj);
              showToast('New project created!');
            }
            setIsAddingProject(false);
            setEditingProject(null);
          }}
        />
      )}

      {/* MODAL: ADD / EDIT PLAYGROUND */}
      {(isAddingPlayground || editingPlayground) && (
        <PlaygroundModal
          item={editingPlayground}
          onClose={() => {
            setIsAddingPlayground(false);
            setEditingPlayground(null);
          }}
          onSave={async (itemData) => {
            if (editingPlayground) {
              await updatePlaygroundItem(editingPlayground.id, itemData);
              showToast('Playground item updated!');
            } else {
              const newItem: PlaygroundItem = {
                ...itemData,
                id: `pg-${Date.now()}`
              };
              await addPlaygroundItem(newItem);
              showToast('New playground item added!');
            }
            setIsAddingPlayground(false);
            setEditingPlayground(null);
          }}
        />
      )}

      {/* MODAL: CONFIRM DELETE */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-100">
            <h3 className="text-base font-bold text-gray-900">Confirm Deletion</h3>
            <p className="text-xs text-gray-600 mt-2">
              Are you sure you want to delete <span className="font-semibold text-gray-900">"{deleteConfirm.title}"</span>? This will remove the record from Firestore permanently.
            </p>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-3.5 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (deleteConfirm.type === 'project') {
                    await deleteProject(deleteConfirm.id);
                  } else if (deleteConfirm.type === 'cert') {
                    await deleteCertification(deleteConfirm.id);
                  } else if (deleteConfirm.type === 'playground') {
                    await deletePlaygroundItem(deleteConfirm.id);
                  }
                  showToast(`Deleted ${deleteConfirm.title}`);
                  setDeleteConfirm(null);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
              >
                Delete Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: PREVIEW FULL PROJECT / CASE STUDY PAGE */}
      {previewProject && (
        <CaseStudyModal
          project={previewProject}
          onClose={() => setPreviewProject(null)}
          onSelectProject={(id) => {
            const p = projects.find(item => item.id === id);
            if (p) setPreviewProject(p);
          }}
          allProjects={projects}
        />
      )}

    </div>
  );
};

// Subcomponent: Certification Add/Edit Modal
interface CertModalProps {
  cert: Certification | null;
  onClose: () => void;
  onSave: (data: any) => void;
}

const CertificationModal: React.FC<CertModalProps> = ({ cert, onClose, onSave }) => {
  const [title, setTitle] = useState(cert?.title || '');
  const [issuer, setIssuer] = useState(cert?.issuer || '');
  const [date, setDate] = useState(cert?.date || '2026');
  const [duration, setDuration] = useState(cert?.duration || '');
  const [certificateId, setCertificateId] = useState(cert?.certificateId || cert?.internId || '');
  const [role, setRole] = useState(cert?.role || '');
  const [verificationEmail, setVerificationEmail] = useState(cert?.verificationEmail || '');
  const [description, setDescription] = useState(cert?.description || '');
  const [credentialUrl, setCredentialUrl] = useState(cert?.credentialUrl || '');
  const [image, setImage] = useState(cert?.image || '');
  const [tags, setTags] = useState(cert?.tags?.join(', ') || 'UI/UX, Figma');
  const [hidden, setHidden] = useState(cert?.hidden || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      issuer,
      date,
      duration,
      certificateId,
      internId: certificateId,
      role,
      verificationEmail,
      description,
      credentialUrl,
      image,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      hidden
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
          <h3 className="text-base font-bold text-gray-900">
            {cert ? 'Edit Certificate' : 'Add New Certificate'}
          </h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Certificate Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Certificate of Internship Completion"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Issuing Organization</label>
              <input
                type="text"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                placeholder="e.g. UPTOSKILLS or Cognifyz"
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Issued Date</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. 20/08/2026"
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Certificate / Intern ID</label>
              <input
                type="text"
                value={certificateId}
                onChange={(e) => setCertificateId(e.target.value)}
                placeholder="e.g. US-INT-2026-K4IKUF9"
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Role / Domain</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Captain of domain FIGMA/UI/UX"
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Tenure / Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 16 May 2026 to 16 August 2026"
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Verification Email</label>
              <input
                type="email"
                value={verificationEmail}
                onChange={(e) => setVerificationEmail(e.target.value)}
                placeholder="verify@uptoskills.in"
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Verification URL (optional)</label>
            <input
              type="url"
              value={credentialUrl}
              onChange={(e) => setCredentialUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
            />
          </div>

          <div>
            <ImageDropZone
              label="Original Certificate Document / Image (Drop image or paste URL)"
              value={image}
              onChange={setImage}
              placeholder="Drop certificate image here or click to browse..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Short Description / Commendation</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Summary of performance and achievements..."
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Figma, Design Systems, Leadership"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
            />
          </div>

          <div className="flex items-center gap-2.5 p-3 bg-amber-50/70 rounded-xl border border-amber-200/80">
            <input
              type="checkbox"
              id="cert-modal-hidden"
              checked={hidden}
              onChange={(e) => setHidden(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer"
            />
            <label htmlFor="cert-modal-hidden" className="text-xs font-semibold text-amber-900 cursor-pointer select-none">
              Hide this certificate from public portfolio
            </label>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
            >
              Save Certificate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Subcomponent: Project Modal
interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSave: (data: any) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onSave }) => {
  const [title, setTitle] = useState(project?.title || '');
  const [tagline, setTagline] = useState(project?.tagline || '');
  const [category, setCategory] = useState(project?.category || 'FinTech & Mobile Banking');
  const [platform, setPlatform] = useState<'Mobile App' | 'Web Application' | 'SaaS & AI'>(project?.platform || 'Mobile App');
  const [role, setRole] = useState(project?.role || 'Lead UI/UX Designer');
  const [duration, setDuration] = useState(project?.duration || '4 Weeks');
  const [tools, setTools] = useState(project?.tools?.join(', ') || 'Figma, FigJam');
  const [thumbnail, setThumbnail] = useState(project?.thumbnail || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80');
  const [figmaUrl, setFigmaUrl] = useState(project?.figmaPrototypeUrl || 'https://www.figma.com');
  const [overview, setOverview] = useState(project?.overview || '');
  const [problemStatement, setProblemStatement] = useState(project?.problemStatement || '');
  const [designObjective, setDesignObjective] = useState(project?.designObjective || '');
  const [hidden, setHidden] = useState(project?.hidden || false);
  const [screens, setScreens] = useState<ProjectScreen[]>(project?.screens || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...(project || {}),
      title,
      tagline,
      category,
      platform,
      role,
      duration,
      tools: tools.split(',').map(t => t.trim()).filter(Boolean),
      thumbnail,
      figmaPrototypeUrl: figmaUrl,
      overview,
      problemStatement,
      designObjective,
      hidden,
      targetUsers: project?.targetUsers || [],
      userFlow: project?.userFlow || [],
      wireframeInsights: project?.wireframeInsights || [],
      designDecisions: project?.designDecisions || [],
      challengesAndSolutions: project?.challengesAndSolutions || [],
      finalOutcome: project?.finalOutcome || { stats: [], summary: '' },
      screens,
      colorPalette: project?.colorPalette || [],
      typography: project?.typography || []
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
          <h3 className="text-base font-bold text-gray-900">
            {project ? 'Edit Project' : 'Create New Project'}
          </h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Project Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Platform</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
              >
                <option value="Mobile App">Mobile App</option>
                <option value="Web Application">Web Application</option>
                <option value="SaaS & AI">SaaS & AI</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
              />
            </div>
          </div>

          <div>
            <ImageDropZone
              label="Project Cover / Thumbnail (Drop image or paste URL)"
              value={thumbnail}
              onChange={setThumbnail}
              placeholder="Drop project cover image here or click to browse..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Figma Prototype URL</label>
            <input
              type="url"
              value={figmaUrl}
              onChange={(e) => setFigmaUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Project Overview</label>
            <textarea
              rows={3}
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Problem Statement</label>
            <textarea
              rows={2}
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Design Objective</label>
            <textarea
              rows={2}
              value={designObjective}
              onChange={(e) => setDesignObjective(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
            />
          </div>

          {/* Case Study Screens & Visual Assets Drop Area */}
          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-xs font-bold text-gray-900">Case Study Screens & Visual Mockups ({screens.length})</h4>
                <p className="text-[11px] text-gray-500">Drop images for the project's interactive case study breakdown</p>
              </div>
              <button
                type="button"
                onClick={() => setScreens([
                  ...screens,
                  { title: `Screen ${screens.length + 1}`, desc: '', image: '', type: 'mobile', tags: ['UI/UX'] }
                ])}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Study Screen</span>
              </button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {screens.map((scr, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-2xl border border-gray-200 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={scr.title}
                      onChange={(e) => {
                        const updated = [...screens];
                        updated[idx].title = e.target.value;
                        setScreens(updated);
                      }}
                      placeholder="Screen Title (e.g. Onboarding or Dashboard)"
                      className="px-2.5 py-1 text-xs font-bold bg-white rounded-lg border border-gray-200 flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => setScreens(screens.filter((_, i) => i !== idx))}
                      className="p-1 text-gray-400 hover:text-red-600 cursor-pointer"
                      title="Remove screen"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <ImageDropZone
                    label={`Screen ${idx + 1} Image Asset`}
                    value={scr.image || ''}
                    onChange={(val) => {
                      const updated = [...screens];
                      updated[idx].image = val;
                      setScreens(updated);
                    }}
                    placeholder="Drop screen mockup or UI image here..."
                  />

                  <input
                    type="text"
                    value={scr.desc}
                    onChange={(e) => {
                      const updated = [...screens];
                      updated[idx].desc = e.target.value;
                      setScreens(updated);
                    }}
                    placeholder="Brief design note or insight for this screen..."
                    className="w-full px-2.5 py-1 text-xs bg-white rounded-lg border border-gray-200"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 bg-amber-50/70 rounded-xl border border-amber-200/80">
            <input
              type="checkbox"
              id="proj-modal-hidden"
              checked={hidden}
              onChange={(e) => setHidden(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer"
            />
            <label htmlFor="proj-modal-hidden" className="text-xs font-semibold text-amber-900 cursor-pointer select-none">
              Hide this project from public portfolio (keep saved in admin only)
            </label>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
            >
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Subcomponent: Playground Modal
interface PlaygroundModalProps {
  item: PlaygroundItem | null;
  onClose: () => void;
  onSave: (data: any) => void;
}

const PlaygroundModal: React.FC<PlaygroundModalProps> = ({ item, onClose, onSave }) => {
  const [title, setTitle] = useState(item?.title || '');
  const [category, setCategory] = useState<'Mobile UI' | 'Web & SaaS' | 'Components' | 'Experimental'>(item?.category || 'Mobile UI');
  const [description, setDescription] = useState(item?.description || '');
  const [image, setImage] = useState(item?.image || '');
  const [figmaFrame, setFigmaFrame] = useState(item?.figmaFrame || 'Design Frame');
  const [tags, setTags] = useState(item?.tags?.join(', ') || 'UI, Micro-Interaction');
  const [hidden, setHidden] = useState(item?.hidden || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      category,
      description,
      image,
      figmaFrame,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      date: item?.date || '2026',
      color: item?.color || '#4F46E5',
      hidden
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
          <h3 className="text-sm font-bold text-gray-900">
            {item ? 'Edit Playground Item' : 'Add Playground Item'}
          </h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
            >
              <option value="Mobile UI">Mobile UI</option>
              <option value="Web & SaaS">Web & SaaS</option>
              <option value="Components">Components</option>
              <option value="Experimental">Experimental</option>
            </select>
          </div>

          <div>
            <ImageDropZone
              label="Playground Image / Mockup (Drop image or paste URL)"
              value={image}
              onChange={setImage}
              placeholder="Drop playground design image here..."
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
            />
          </div>

          <div className="flex items-center gap-2.5 p-3 bg-amber-50/70 rounded-xl border border-amber-200/80">
            <input
              type="checkbox"
              id="pg-modal-hidden"
              checked={hidden}
              onChange={(e) => setHidden(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 cursor-pointer"
            />
            <label htmlFor="pg-modal-hidden" className="text-xs font-semibold text-amber-900 cursor-pointer select-none">
              Hide this item from public portfolio
            </label>
          </div>

          <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
            >
              Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
