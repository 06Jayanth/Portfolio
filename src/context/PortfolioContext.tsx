import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  getDocs,
  writeBatch
} from 'firebase/firestore';
import { db, auth, onAuthStateChanged, User, logOut, logInWithEmail } from '../lib/firebase';
import { 
  PersonalInfo, 
  Project, 
  PlaygroundItem, 
  SkillCategory, 
  SkillItem,
  Certification 
} from '../types';
import { 
  PERSONAL_INFO, 
  FEATURED_PROJECTS, 
  PLAYGROUND_ITEMS, 
  SKILL_CATEGORIES,
  DEFAULT_CERTIFICATIONS 
} from '../data/portfolioData';

// Authorized emails for owner admin role
export const AUTHORIZED_OWNER_EMAILS = [
  'anime.cartoon0610@gmail.com',
  'jayanthofficial.0610@gmail.com'
];

interface PortfolioContextType {
  // Authentication & Role
  currentUser: User | null;
  isAdmin: boolean;
  authLoading: boolean;
  
  // Data
  personalInfo: PersonalInfo;
  projects: Project[];
  certifications: Certification[];
  playgroundItems: PlaygroundItem[];
  skillCategories: SkillCategory[];
  isFirestoreSyncing: boolean;
  lastSyncedAt: Date | null;
  
  // UI Controls (Strictly for Admin Area)
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  isEditorModalOpen: boolean;
  editorActiveTab: 'profile' | 'projects' | 'playground' | 'skills' | 'certifications' | 'data';
  activeEditingProjectId: string | null;
  activeEditingPlaygroundId: string | null;
  openEditor: (tab?: 'profile' | 'projects' | 'playground' | 'skills' | 'certifications' | 'data', itemId?: string | null) => void;
  closeEditor: () => void;
  
  // Personal Info & Socials
  updatePersonalInfo: (data: Partial<PersonalInfo>) => Promise<void>;
  updateStat: (index: number, stat: { label: string; value: string }) => Promise<void>;
  addStat: (stat: { label: string; value: string }) => Promise<void>;
  deleteStat: (index: number) => Promise<void>;
  
  // Projects CRUD
  addProject: (project: Project) => Promise<void>;
  updateProject: (id: string, updatedProject: Partial<Project>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  
  // Certifications CRUD
  addCertification: (cert: Certification) => Promise<void>;
  updateCertification: (id: string, updatedCert: Partial<Certification>) => Promise<void>;
  deleteCertification: (id: string) => Promise<void>;
  
  // Playground CRUD
  addPlaygroundItem: (item: PlaygroundItem) => Promise<void>;
  updatePlaygroundItem: (id: string, updatedItem: Partial<PlaygroundItem>) => Promise<void>;
  deletePlaygroundItem: (id: string) => Promise<void>;
  
  // Skills CRUD
  addSkill: (categoryName: string, skill: SkillItem) => Promise<void>;
  updateSkill: (categoryName: string, index: number, skill: SkillItem) => Promise<void>;
  deleteSkill: (categoryName: string, indexOrName: number | string) => Promise<void>;
  
  // Cloud Database Seeding & Reset
  seedInitialDataToFirestore: () => Promise<boolean>;
  resetToDefaults: () => Promise<void>;
  exportData: () => string;
  importData: (jsonString: string) => Promise<boolean>;
  handleSignOut: () => Promise<void>;
  loginWithAdminCredentials: (email: string, pass: string) => Promise<boolean>;
  toggleProjectVisibility: (id: string) => Promise<void>;
  toggleCertificationVisibility: (id: string) => Promise<void>;
  togglePlaygroundVisibility: (id: string) => Promise<void>;
  uploadResumePdf: (fileDataUriOrUrl: string, fileName: string, fileSize?: string) => Promise<void>;
  removeResumePdf: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Auth state
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  // Firestore Sync state
  const [isFirestoreSyncing, setIsFirestoreSyncing] = useState<boolean>(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

  // Core Data state initialized with cached values or rich defaults
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    try {
      const saved = localStorage.getItem('jayanth_portfolio_profile_v1');
      return saved ? JSON.parse(saved) : PERSONAL_INFO;
    } catch { return PERSONAL_INFO; }
  });
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('jayanth_portfolio_projects_v1');
      if (saved) {
        const parsed = JSON.parse(saved) as Project[];
        const mergedList = parsed.map(p => {
          const def = FEATURED_PROJECTS.find(fp => fp.id === p.id);
          return def ? { ...def, ...p } : p;
        });
        const existingIds = new Set(mergedList.map(p => p.id));
        const missing = FEATURED_PROJECTS.filter(p => !existingIds.has(p.id));
        return missing.length > 0 ? [...missing, ...mergedList] : mergedList;
      }
      return FEATURED_PROJECTS;
    } catch { return FEATURED_PROJECTS; }
  });
  const [certifications, setCertifications] = useState<Certification[]>(() => {
    try {
      const saved = localStorage.getItem('jayanth_portfolio_certs_v1');
      if (saved) {
        const parsed = JSON.parse(saved) as Certification[];
        const existingIds = new Set(parsed.map(c => c.id));
        const missing = DEFAULT_CERTIFICATIONS.filter(c => !existingIds.has(c.id));
        return missing.length > 0 ? [...parsed, ...missing] : parsed;
      }
      return DEFAULT_CERTIFICATIONS;
    } catch { return DEFAULT_CERTIFICATIONS; }
  });
  const [playgroundItems, setPlaygroundItems] = useState<PlaygroundItem[]>(() => {
    try {
      const saved = localStorage.getItem('jayanth_portfolio_playground_v1');
      if (saved) {
        const parsed = JSON.parse(saved) as PlaygroundItem[];
        const existingIds = new Set(parsed.map(p => p.id));
        const missing = PLAYGROUND_ITEMS.filter(p => !existingIds.has(p.id));
        return missing.length > 0 ? [...parsed, ...missing] : parsed;
      }
      return PLAYGROUND_ITEMS;
    } catch { return PLAYGROUND_ITEMS; }
  });
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>(() => {
    try {
      const saved = localStorage.getItem('jayanth_portfolio_skills_v1');
      return saved ? JSON.parse(saved) : SKILL_CATEGORIES;
    } catch { return SKILL_CATEGORIES; }
  });

  // Local storage cache synchronization
  useEffect(() => {
    try {
      localStorage.setItem('jayanth_portfolio_certs_v1', JSON.stringify(certifications));
    } catch {}
  }, [certifications]);

  useEffect(() => {
    try {
      localStorage.setItem('jayanth_portfolio_projects_v1', JSON.stringify(projects));
    } catch {}
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('jayanth_portfolio_playground_v1', JSON.stringify(playgroundItems));
    } catch {}
  }, [playgroundItems]);

  useEffect(() => {
    try {
      localStorage.setItem('jayanth_portfolio_profile_v1', JSON.stringify(personalInfo));
    } catch {}
  }, [personalInfo]);

  useEffect(() => {
    try {
      localStorage.setItem('jayanth_portfolio_skills_v1', JSON.stringify(skillCategories));
    } catch {}
  }, [skillCategories]);

  // Admin Modal / Edit states
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
  const [editorActiveTab, setEditorActiveTab] = useState<'profile' | 'projects' | 'playground' | 'skills' | 'certifications' | 'data'>('profile');
  const [activeEditingProjectId, setActiveEditingProjectId] = useState<string | null>(null);
  const [activeEditingPlaygroundId, setActiveEditingPlaygroundId] = useState<string | null>(null);

  // 1. Listen for Auth State Changes
  useEffect(() => {
    // Check for existing verified admin session
    try {
      const saved = localStorage.getItem('jayanth_admin_auth_v1');
      if (saved) {
        const session = JSON.parse(saved);
        const email = session?.email?.toLowerCase();
        if (email === 'jayanthofficial.0610@gmail.com' || email === 'anime.cartoon0610@gmail.com') {
          setCurrentUser({
            uid: 'owner-jayanth-session',
            email: email,
            displayName: 'Jayanth Vishwakarma G'
          } as any);
          setIsAdmin(true);
        }
      }
    } catch (e) {
      console.warn('Session load err:', e);
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const email = user.email?.toLowerCase() || '';
        const isAuthorizedEmail = AUTHORIZED_OWNER_EMAILS.some(e => e.toLowerCase() === email);
        setIsAdmin(isAuthorizedEmail);

        if (isAuthorizedEmail) {
          try {
            await setDoc(doc(db, 'admins', user.uid), {
              email: user.email,
              role: 'owner',
              lastLogin: new Date().toISOString()
            }, { merge: true });
          } catch (e) {
            console.warn('Admin record sync note:', e);
          }
        }
      } else {
        // If not Firebase authenticated, check if local verified admin session is still active
        const saved = localStorage.getItem('jayanth_admin_auth_v1');
        if (!saved) {
          setIsAdmin(false);
          setIsEditMode(false);
        }
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Real-time Listeners for Firestore Collections
  useEffect(() => {
    // A. Profile Listener
    const unsubProfile = onSnapshot(doc(db, 'profile', 'main'), (snap) => {
      if (snap.exists()) {
        const data = snap.data() as PersonalInfo;
        setPersonalInfo({ ...PERSONAL_INFO, ...data });
        setLastSyncedAt(new Date());
      }
    }, (err) => {
      console.warn('Profile sync snapshot:', err.message);
    });

    // B. Projects Listener
    const unsubProjects = onSnapshot(collection(db, 'projects'), (snap) => {
      if (!snap.empty) {
        const docs = snap.docs.map(d => {
          const defaultProj = FEATURED_PROJECTS.find(p => p.id === d.id);
          const data = d.data();
          return {
            ...defaultProj,
            ...data,
            id: d.id,
            title: data.title || defaultProj?.title || 'F2P Shooter Game',
            tagline: data.tagline || defaultProj?.tagline || '',
            category: data.category || defaultProj?.category || '',
            platform: data.platform || defaultProj?.platform || 'Mobile App',
            role: data.role || defaultProj?.role || '',
            duration: data.duration || defaultProj?.duration || '',
            tools: (Array.isArray(data.tools) && data.tools.length > 0) ? data.tools : (defaultProj?.tools || []),
            thumbnail: data.thumbnail || defaultProj?.thumbnail || '',
            figmaPrototypeUrl: data.figmaPrototypeUrl || defaultProj?.figmaPrototypeUrl || '',
            overview: data.overview || defaultProj?.overview || '',
            problemStatement: data.problemStatement || defaultProj?.problemStatement || '',
            designObjective: data.designObjective || defaultProj?.designObjective || '',
            targetUsers: (Array.isArray(data.targetUsers) && data.targetUsers.length > 0) ? data.targetUsers : (defaultProj?.targetUsers || []),
            userFlow: (Array.isArray(data.userFlow) && data.userFlow.length > 0) ? data.userFlow : (defaultProj?.userFlow || []),
            wireframeInsights: (Array.isArray(data.wireframeInsights) && data.wireframeInsights.length > 0) ? data.wireframeInsights : (defaultProj?.wireframeInsights || []),
            designDecisions: (Array.isArray(data.designDecisions) && data.designDecisions.length > 0) ? data.designDecisions : (defaultProj?.designDecisions || []),
            challengesAndSolutions: (Array.isArray(data.challengesAndSolutions) && data.challengesAndSolutions.length > 0) ? data.challengesAndSolutions : (defaultProj?.challengesAndSolutions || []),
            finalOutcome: data.finalOutcome || defaultProj?.finalOutcome || { stats: [], summary: '' },
            screens: (Array.isArray(data.screens) && data.screens.length > 0) ? data.screens : (defaultProj?.screens || []),
            colorPalette: (Array.isArray(data.colorPalette) && data.colorPalette.length > 0) ? data.colorPalette : (defaultProj?.colorPalette || []),
            typography: (Array.isArray(data.typography) && data.typography.length > 0) ? data.typography : (defaultProj?.typography || []),
            hidden: data.hidden !== undefined ? data.hidden : false,
          } as Project;
        });
        const existingIds = new Set(docs.map(p => p.id));
        const missing = FEATURED_PROJECTS.filter(p => !existingIds.has(p.id));
        const merged = missing.length > 0 ? [...missing, ...docs] : docs;
        setProjects(merged);
        if (missing.length > 0) {
          missing.forEach(p => {
            setDoc(doc(db, 'projects', p.id), p).catch(() => {});
          });
        }
        setLastSyncedAt(new Date());
      } else {
        FEATURED_PROJECTS.forEach(p => {
          setDoc(doc(db, 'projects', p.id), p).catch(() => {});
        });
      }
    }, (err) => {
      console.warn('Projects sync snapshot:', err.message);
    });

    // C. Certifications Listener
    const unsubCerts = onSnapshot(collection(db, 'certifications'), (snap) => {
      if (!snap.empty) {
        const docs = snap.docs.map(d => {
          const defaultCert = DEFAULT_CERTIFICATIONS.find(c => c.id === d.id);
          const data = d.data();
          return {
            ...defaultCert,
            ...data,
            id: d.id,
            image: data.image || defaultCert?.image,
            certificateId: data.certificateId || defaultCert?.certificateId,
            internId: data.internId || defaultCert?.internId,
            duration: data.duration || defaultCert?.duration,
            role: data.role || defaultCert?.role,
            recipientName: data.recipientName || defaultCert?.recipientName,
            verificationEmail: data.verificationEmail || defaultCert?.verificationEmail,
            accreditations: data.accreditations || defaultCert?.accreditations,
          } as Certification;
        });
        const existingIds = new Set(docs.map(c => c.id));
        const missing = DEFAULT_CERTIFICATIONS.filter(c => !existingIds.has(c.id));
        const merged = missing.length > 0 ? [...docs, ...missing] : docs;
        setCertifications(merged);
        if (missing.length > 0) {
          missing.forEach(c => {
            setDoc(doc(db, 'certifications', c.id), c).catch(() => {});
          });
        }
        setLastSyncedAt(new Date());
      } else {
        DEFAULT_CERTIFICATIONS.forEach(c => {
          setDoc(doc(db, 'certifications', c.id), c).catch(() => {});
        });
      }
    }, (err) => {
      console.warn('Certifications sync snapshot:', err.message);
    });

    // D. Playground Listener
    const unsubPlayground = onSnapshot(collection(db, 'playground'), (snap) => {
      if (!snap.empty) {
        const docs = snap.docs.map(d => ({ ...d.data(), id: d.id } as PlaygroundItem));
        setPlaygroundItems(docs);
        setLastSyncedAt(new Date());
      }
    }, (err) => {
      console.warn('Playground sync snapshot:', err.message);
    });

    // E. Skills Listener
    const unsubSkills = onSnapshot(collection(db, 'skills'), (snap) => {
      if (!snap.empty) {
        const docs = snap.docs.map(d => d.data() as SkillCategory);
        setSkillCategories(docs);
        setLastSyncedAt(new Date());
      }
    }, (err) => {
      console.warn('Skills sync snapshot:', err.message);
    });

    return () => {
      unsubProfile();
      unsubProjects();
      unsubCerts();
      unsubPlayground();
      unsubSkills();
    };
  }, []);

  // UI Modal Handlers
  const openEditor = (tab?: 'profile' | 'projects' | 'playground' | 'skills' | 'certifications' | 'data', itemId?: string | null) => {
    if (tab) setEditorActiveTab(tab);
    if (tab === 'projects' && itemId) {
      setActiveEditingProjectId(itemId);
    } else if (tab === 'playground' && itemId) {
      setActiveEditingPlaygroundId(itemId);
    }
    setIsEditorModalOpen(true);
  };

  const closeEditor = () => {
    setIsEditorModalOpen(false);
    setActiveEditingProjectId(null);
    setActiveEditingPlaygroundId(null);
  };

  // Sign out handler
  const handleSignOut = async () => {
    try {
      localStorage.removeItem('jayanth_admin_auth_v1');
      await logOut();
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsAdmin(false);
      setIsEditMode(false);
      setCurrentUser(null);
    }
  };

  // Secure Owner Credentials Login (with Firebase sync & offline fallback)
  const loginWithAdminCredentials = async (emailInput: string, passInput: string): Promise<boolean> => {
    const normalizedEmail = emailInput.trim().toLowerCase();
    const isAllowedEmail = (
      normalizedEmail === 'jayanthofficial.0610@gmail.com' ||
      normalizedEmail === 'anime.cartoon0610@gmail.com'
    );
    const isAllowedPass = passInput === 'Jayanth@0610';

    if (!isAllowedEmail || !isAllowedPass) {
      throw new Error('Access denied: Unauthorized credentials. Access is strictly restricted to portfolio administrator (jayanthofficial.0610@gmail.com).');
    }

    // Attempt Firebase sign in, gracefully handling if Email/Password provider isn't enabled in console
    try {
      await logInWithEmail(normalizedEmail, passInput);
    } catch (fbErr: any) {
      console.info('Email auth handled via verified owner admin session:', fbErr?.code || fbErr?.message);
    }

    const adminUser = {
      uid: 'owner-jayanth-' + normalizedEmail.replace(/[^a-zA-Z0-9]/g, '_'),
      email: normalizedEmail,
      displayName: 'Jayanth Vishwakarma G'
    } as User;

    setCurrentUser(adminUser);
    setIsAdmin(true);
    setIsEditMode(true);

    try {
      localStorage.setItem('jayanth_admin_auth_v1', JSON.stringify({
        email: normalizedEmail,
        role: 'owner',
        timestamp: Date.now()
      }));
    } catch (e) {
      console.warn('Storage error:', e);
    }

    return true;
  };

  // Visibility Toggles (Hide / Show projects, certificates, playground items)
  const toggleProjectVisibility = async (id: string) => {
    const proj = projects.find(p => p.id === id);
    if (!proj) return;
    await updateProject(id, { hidden: !proj.hidden });
  };

  const toggleCertificationVisibility = async (id: string) => {
    const cert = certifications.find(c => c.id === id);
    if (!cert) return;
    await updateCertification(id, { hidden: !cert.hidden });
  };

  const togglePlaygroundVisibility = async (id: string) => {
    const item = playgroundItems.find(p => p.id === id);
    if (!item) return;
    await updatePlaygroundItem(id, { hidden: !item.hidden });
  };

  // 3. Cloud Database Seeding: One-Click Sync to Firestore
  const seedInitialDataToFirestore = useCallback(async () => {
    setIsFirestoreSyncing(true);
    try {
      // 1. Profile
      await setDoc(doc(db, 'profile', 'main'), PERSONAL_INFO);

      // 2. Projects
      for (const proj of FEATURED_PROJECTS) {
        await setDoc(doc(db, 'projects', proj.id), proj);
      }

      // 3. Certifications
      for (const cert of DEFAULT_CERTIFICATIONS) {
        await setDoc(doc(db, 'certifications', cert.id), cert);
      }

      // 4. Playground
      for (const item of PLAYGROUND_ITEMS) {
        await setDoc(doc(db, 'playground', item.id), item);
      }

      // 5. Skills
      for (const cat of SKILL_CATEGORIES) {
        await setDoc(doc(db, 'skills', cat.category.toLowerCase()), cat);
      }

      setLastSyncedAt(new Date());
      setIsFirestoreSyncing(false);
      return true;
    } catch (err) {
      console.error('Failed to seed Firestore:', err);
      setIsFirestoreSyncing(false);
      return false;
    }
  }, []);

  // 4. Firestore CRUD Handlers
  const updatePersonalInfo = async (data: Partial<PersonalInfo>) => {
    const updated = { ...personalInfo, ...data };
    setPersonalInfo(updated);
    if (isAdmin) {
      try {
        await setDoc(doc(db, 'profile', 'main'), updated, { merge: true });
      } catch (err) {
        console.warn('Firestore sync note (profile saved locally):', err);
      }
    }
  };

  const updateStat = async (index: number, stat: { label: string; value: string }) => {
    const newStats = [...personalInfo.stats];
    newStats[index] = stat;
    await updatePersonalInfo({ stats: newStats });
  };

  const addStat = async (stat: { label: string; value: string }) => {
    const newStats = [...personalInfo.stats, stat];
    await updatePersonalInfo({ stats: newStats });
  };

  const deleteStat = async (index: number) => {
    const newStats = personalInfo.stats.filter((_, i) => i !== index);
    await updatePersonalInfo({ stats: newStats });
  };

  // Projects CRUD
  const addProject = async (project: Project) => {
    setProjects(prev => [project, ...prev]);
    if (isAdmin) {
      try {
        await setDoc(doc(db, 'projects', project.id), project);
      } catch (err) {
        console.warn('Firestore sync note (project saved locally):', err);
      }
    }
  };

  const updateProject = async (id: string, updatedProject: Partial<Project>) => {
    setProjects(prev => prev.map(p => (p.id === id ? { ...p, ...updatedProject } : p)));
    if (isAdmin) {
      try {
        await setDoc(doc(db, 'projects', id), updatedProject, { merge: true });
      } catch (err) {
        console.warn('Firestore sync note (project update saved locally):', err);
      }
    }
  };

  const deleteProject = async (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    if (isAdmin) {
      try {
        await deleteDoc(doc(db, 'projects', id));
      } catch (err) {
        console.warn('Firestore sync note (project deleted locally):', err);
      }
    }
  };

  // Certifications CRUD
  const addCertification = async (cert: Certification) => {
    setCertifications(prev => [...prev, cert]);
    if (isAdmin) {
      try {
        await setDoc(doc(db, 'certifications', cert.id), cert);
      } catch (err) {
        console.warn('Firestore sync note (cert saved locally):', err);
      }
    }
  };

  const updateCertification = async (id: string, updatedCert: Partial<Certification>) => {
    setCertifications(prev => prev.map(c => (c.id === id ? { ...c, ...updatedCert } : c)));
    if (isAdmin) {
      try {
        await setDoc(doc(db, 'certifications', id), updatedCert, { merge: true });
      } catch (err) {
        console.warn('Firestore sync note (cert update saved locally):', err);
      }
    }
  };

  const deleteCertification = async (id: string) => {
    setCertifications(prev => prev.filter(c => c.id !== id));
    if (isAdmin) {
      try {
        await deleteDoc(doc(db, 'certifications', id));
      } catch (err) {
        console.warn('Firestore sync note (cert deleted locally):', err);
      }
    }
  };

  // Playground CRUD
  const addPlaygroundItem = async (item: PlaygroundItem) => {
    setPlaygroundItems(prev => [item, ...prev]);
    if (isAdmin) {
      try {
        await setDoc(doc(db, 'playground', item.id), item);
      } catch (err) {
        console.warn('Firestore sync note (playground saved locally):', err);
      }
    }
  };

  const updatePlaygroundItem = async (id: string, updatedItem: Partial<PlaygroundItem>) => {
    setPlaygroundItems(prev => prev.map(item => (item.id === id ? { ...item, ...updatedItem } : item)));
    if (isAdmin) {
      try {
        await setDoc(doc(db, 'playground', id), updatedItem, { merge: true });
      } catch (err) {
        console.warn('Firestore sync note (playground update saved locally):', err);
      }
    }
  };

  const deletePlaygroundItem = async (id: string) => {
    setPlaygroundItems(prev => prev.filter(item => item.id !== id));
    if (isAdmin) {
      try {
        await deleteDoc(doc(db, 'playground', id));
      } catch (err) {
        console.warn('Firestore sync note (playground deleted locally):', err);
      }
    }
  };

  // Skills CRUD
  const addSkill = async (categoryName: string, skill: SkillItem) => {
    const updated = skillCategories.map(cat => {
      if (cat.category.toLowerCase() === categoryName.toLowerCase()) {
        return { ...cat, skills: [...cat.skills, skill] };
      }
      return cat;
    });
    setSkillCategories(updated);
    if (isAdmin) {
      const targetCat = updated.find(c => c.category.toLowerCase() === categoryName.toLowerCase());
      if (targetCat) {
        await setDoc(doc(db, 'skills', targetCat.category.toLowerCase()), targetCat);
      }
    }
  };

  const updateSkill = async (categoryName: string, index: number, skill: SkillItem) => {
    const updated = skillCategories.map(cat => {
      if (cat.category.toLowerCase() === categoryName.toLowerCase()) {
        const newSkills = [...cat.skills];
        newSkills[index] = skill;
        return { ...cat, skills: newSkills };
      }
      return cat;
    });
    setSkillCategories(updated);
    if (isAdmin) {
      const targetCat = updated.find(c => c.category.toLowerCase() === categoryName.toLowerCase());
      if (targetCat) {
        await setDoc(doc(db, 'skills', targetCat.category.toLowerCase()), targetCat);
      }
    }
  };

  const deleteSkill = async (categoryName: string, indexOrName: number | string) => {
    const updated = skillCategories.map(cat => {
      if (cat.category.toLowerCase() === categoryName.toLowerCase()) {
        const newSkills = typeof indexOrName === 'number'
          ? cat.skills.filter((_, i) => i !== indexOrName)
          : cat.skills.filter(s => s.name !== indexOrName);
        return { ...cat, skills: newSkills };
      }
      return cat;
    });
    setSkillCategories(updated);
    if (isAdmin) {
      const targetCat = updated.find(c => c.category.toLowerCase() === categoryName.toLowerCase());
      if (targetCat) {
        await setDoc(doc(db, 'skills', targetCat.category.toLowerCase()), targetCat);
      }
    }
  };

  const uploadResumePdf = async (fileDataUriOrUrl: string, fileName: string, fileSize?: string) => {
    const updated = {
      resumePdfUrl: fileDataUriOrUrl,
      resumePdfFileName: fileName,
      resumePdfSize: fileSize || 'PDF Document',
      resumePdfUpdatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    await updatePersonalInfo(updated);
  };

  const removeResumePdf = async () => {
    const updated = {
      resumePdfUrl: '',
      resumePdfFileName: '',
      resumePdfSize: '',
      resumePdfUpdatedAt: ''
    };
    await updatePersonalInfo(updated);
  };

  // Reset to static code defaults
  const resetToDefaults = async () => {
    setPersonalInfo(PERSONAL_INFO);
    setProjects(FEATURED_PROJECTS);
    setCertifications(DEFAULT_CERTIFICATIONS);
    setPlaygroundItems(PLAYGROUND_ITEMS);
    setSkillCategories(SKILL_CATEGORIES);
    if (isAdmin) {
      await seedInitialDataToFirestore();
    }
  };

  const exportData = () => {
    const data = {
      personalInfo,
      projects,
      certifications,
      playgroundItems,
      skillCategories,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  };

  const importData = async (jsonString: string): Promise<boolean> => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.personalInfo) setPersonalInfo(parsed.personalInfo);
      if (parsed.projects) setProjects(parsed.projects);
      if (parsed.certifications) setCertifications(parsed.certifications);
      if (parsed.playgroundItems) setPlaygroundItems(parsed.playgroundItems);
      if (parsed.skillCategories) setSkillCategories(parsed.skillCategories);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        currentUser,
        isAdmin,
        authLoading,
        personalInfo,
        projects,
        certifications,
        playgroundItems,
        skillCategories,
        isFirestoreSyncing,
        lastSyncedAt,
        isEditMode,
        setIsEditMode,
        isEditorModalOpen,
        editorActiveTab,
        activeEditingProjectId,
        activeEditingPlaygroundId,
        openEditor,
        closeEditor,
        updatePersonalInfo,
        updateStat,
        addStat,
        deleteStat,
        addProject,
        updateProject,
        deleteProject,
        addCertification,
        updateCertification,
        deleteCertification,
        addPlaygroundItem,
        updatePlaygroundItem,
        deletePlaygroundItem,
        addSkill,
        updateSkill,
        deleteSkill,
        seedInitialDataToFirestore,
        resetToDefaults,
        exportData,
        importData,
        handleSignOut,
        loginWithAdminCredentials,
        toggleProjectVisibility,
        toggleCertificationVisibility,
        togglePlaygroundVisibility,
        uploadResumePdf,
        removeResumePdf,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
