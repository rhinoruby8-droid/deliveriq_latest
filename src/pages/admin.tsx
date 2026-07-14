import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useCmsContent, useUpdateCmsContent, isLoggedIn, setAuthToken, removeAuthToken, CmsContent, Speaker, Sponsor, Session } from '@/lib/cms-client';
import { Save, LogOut, Lock, Layout, BookOpen, User, Award, Mail, Shield, FileText, Code, RefreshCw, CheckCircle, AlertTriangle, Plus, Trash2, Edit2, Eye, Calendar, Clock, Globe, Settings, CheckSquare, Play } from 'lucide-react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { RichTextEditor } from '@/components/RichTextEditor';
import { ModeToggle } from '@/components/cms/ModeToggle';
import { MigrationPrompt } from '@/components/cms/MigrationPrompt';
import { VisualPageEditor } from '@/components/cms/VisualPageEditor';
import { LivePreviewPanel } from '@/components/cms/LivePreviewPanel';
import { parseHtmlToBlocks, generateHtmlFromBlocks, type PageKey } from '@/lib/cms-blocks';
import { FormBuilder } from '@/components/cms/FormBuilder';
import { FALLBACK_CMS_CONTENT } from '@/lib/cms-client';

type ActiveTabType = 
  | 'home' | 'sessions-html' | 'speakers-html' | 'sponsors-html' | 'contact-html' | 'privacy-html' | 'terms-html' | 'register-html'
  | 'replays-html' | 'session-detail-html' | '404-html' | 'global-css'
  | 'manage-sessions' | 'manage-speakers' | 'manage-sponsors' | 'manage-forms' | 'settings' | 'json';

export default function AdminPage() {
  const queryClient = useQueryClient();
  const { data: cmsContent, isLoading } = useCmsContent();
  const updateMutation = useUpdateCmsContent();

  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<ActiveTabType>('home');
  const [localContent, setLocalContent] = useState<CmsContent | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // ── Visual CMS Mode State ─────────────────────────────────────────────
  type EditorMode = 'visual' | 'html';
  const [pageModes, setPageModes] = useState<Record<string, EditorMode>>({
    home: 'html', 'sessions-html': 'html', 'speakers-html': 'html',
    'sponsors-html': 'html', 'contact-html': 'html', 'privacy-html': 'html', 'terms-html': 'html', 'register-html': 'html',
    'replays-html': 'html', 'session-detail-html': 'html', '404-html': 'html'
  });
  const [migrationState, setMigrationState] = useState<{
    tab: string; pageKey: PageKey; canAutoMigrate: boolean; parsedBlocks: unknown;
  } | null>(null);

  const [jsonCode, setJsonCode] = useState('');
  const [jsonError, setJsonError] = useState('');

  // Speaker Modal State
  const [showSpeakerModal, setShowSpeakerModal] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);
  const [speakerForm, setSpeakerForm] = useState<Omit<Speaker, 'id'> & { id: string }>({
    id: '',
    name: '',
    role: '',
    organisation: '',
    bio: '',
    avatarUrl: '',
    email: '',
    socialUrl: '',
  });

  // Sponsor Modal State
  const [showSponsorModal, setShowSponsorModal] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState<Sponsor | null>(null);
  const [sponsorForm, setSponsorForm] = useState<Omit<Sponsor, 'id'> & { id: string }>({
    id: '',
    name: '',
    logoUrl: '',
    websiteUrl: '',
    tier: 'Session Sponsor',
  });

  // Session Modal State
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [editingSession, setEditingSession] = useState<Session | null>(null);
  const [sessionTimezone, setSessionTimezone] = useState('UTC');
  const [sessionTimeRaw, setSessionTimeRaw] = useState('09:00'); // HH:MM for <input type="time">
  const [sessionForm, setSessionForm] = useState<Omit<Session, 'id' | 'speakerIds' | 'sponsorIds'> & { id: string; speakerIds: string[]; sponsorIds: string[] }>({
    id: '',
    title: '',
    description: '',
    tag: 'Project Controls',
    date: '',
    time: '',
    duration: '60 min',
    status: 'draft',
    speakerIds: [],
    sponsorIds: [],
    registrationUrl: '',
    videoUrl: '',
  });

  // Sync loaded CMS content to local state for editing
  useEffect(() => {
    if (cmsContent) {
      setLocalContent(cmsContent);
    }
  }, [cmsContent]);

  // Check login state on mount
  useEffect(() => {
    if (isLoggedIn()) {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const res = await fetch('/api/cms/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json() as { error?: string };
        throw new Error(data.error || 'Invalid credentials');
      }

      const data = await res.json() as { token: string };
      setAuthToken(data.token);
      setAuthenticated(true);
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    removeAuthToken();
    setAuthenticated(false);
  };

  const handleUpdate = (key: keyof CmsContent, value: unknown) => {
    if (!localContent) return;
    setLocalContent({ ...localContent, [key]: value });
  };

  const handleSave = (updatedData?: CmsContent) => {
    const dataToSave = updatedData || localContent;
    if (!dataToSave) return;
    if (jsonError) {
      setToast({ type: 'error', message: 'Cannot save changes. Please fix JSON syntax errors.' });
      return;
    }
    setToast(null);

    updateMutation.mutate(dataToSave, {
      onSuccess: () => {
        setToast({ type: 'success', message: 'Content saved successfully!' });
      },
      onError: (err) => {
        setToast({ type: 'error', message: err instanceof Error ? err.message : 'Failed to save content' });
      },
    });
  };

  const handleClearCache = () => {
    queryClient.clear();
    window.location.reload();
  };

  const handleTabChange = (tab: ActiveTabType) => {
    setActiveTab(tab);
    if (tab === 'json' && localContent) {
      setJsonCode(JSON.stringify(localContent, null, 2));
      setJsonError('');
    }
  };

  // ── Visual CMS Handlers ────────────────────────────────────────────────────

  const TAB_TO_PAGE_KEY: Record<string, PageKey> = {
    home: 'homepage', 'sessions-html': 'sessions', 'speakers-html': 'speakers',
    'sponsors-html': 'sponsors', 'contact-html': 'contact',
    'privacy-html': 'privacy', 'terms-html': 'terms', 'register-html': 'register',
    'replays-html': 'replays', 'session-detail-html': 'session-detail', '404-html': '404'
  };

  const TAB_TO_HTML_KEY: Record<string, keyof CmsContent> = {
    home: 'homepageHtml', 'sessions-html': 'sessionsPageHtml', 'speakers-html': 'speakersPageHtml',
    'sponsors-html': 'sponsorsPageHtml', 'contact-html': 'contactPageHtml',
    'privacy-html': 'privacyPageHtml', 'terms-html': 'termsPageHtml', 'register-html': 'registerPageHtml',
    'replays-html': 'replaysPageHtml', 'session-detail-html': 'sessionDetailPageHtml', '404-html': 'notFoundPageHtml'
  };

  const TAB_TO_CONTENT_KEY: Record<string, keyof CmsContent> = {
    home: 'homepageContent', 'sessions-html': 'sessionsContent', 'speakers-html': 'speakersContent',
    'sponsors-html': 'sponsorsContent', 'contact-html': 'contactContent',
    'privacy-html': 'privacyContent', 'terms-html': 'termsContent', 'register-html': 'registerContent',
    'replays-html': 'replaysContent', 'session-detail-html': 'sessionDetailContent', '404-html': 'notFoundContent'
  };

  const TAB_TO_CSS_KEY: Record<string, keyof CmsContent> = {
    home: 'homepageCss', 'sessions-html': 'sessionsPageCss', 'speakers-html': 'speakersPageCss',
    'sponsors-html': 'sponsorsPageCss', 'contact-html': 'contactPageCss',
    'privacy-html': 'privacyPageCss', 'terms-html': 'termsPageCss', 'register-html': 'registerPageCss',
    'replays-html': 'replaysPageCss', 'session-detail-html': 'sessionDetailPageCss', '404-html': 'notFoundPageCss'
  };

  const handleModeToggle = (tab: string, newMode: EditorMode) => {
    if (!localContent) return;
    if (newMode === 'visual') {
      const htmlKey = TAB_TO_HTML_KEY[tab];
      const pageKey = TAB_TO_PAGE_KEY[tab];
      const contentKey = TAB_TO_CONTENT_KEY[tab];
      const html = String(localContent[htmlKey] || '');
      const hasHtml = html.trim().length > 0;

      if (hasHtml) {
        // Has existing HTML — show migration prompt
        const parsed = parseHtmlToBlocks(pageKey, html);
        setMigrationState({ tab, pageKey, canAutoMigrate: parsed !== null, parsedBlocks: parsed });
        return;
      }

      // No existing HTML — initialise from fallback defaults and switch directly
      if (!localContent[contentKey]) {
        const defaultContent = { ...(FALLBACK_CMS_CONTENT[contentKey] as object), visualMode: true };
        setLocalContent(prev => prev ? { ...prev, [contentKey]: defaultContent } : prev);
      }
      setPageModes(prev => ({ ...prev, [tab]: 'visual' }));
    } else {
      // Switching visual → html: sync html from current blocks first
      const pageKey = TAB_TO_PAGE_KEY[tab];
      const contentKey = TAB_TO_CONTENT_KEY[tab];
      const blocks = localContent[contentKey];
      if (blocks) {
        const html = generateHtmlFromBlocks(pageKey, blocks);
        const htmlKey = TAB_TO_HTML_KEY[tab];
        setLocalContent(prev => prev ? { ...prev, [htmlKey]: html } : prev);
      }
      setPageModes(prev => ({ ...prev, [tab]: 'html' }));
    }
  };

  const handleMigrationAutoMigrate = () => {
    if (!migrationState || !localContent) return;
    const { tab, parsedBlocks } = migrationState;
    const contentKey = TAB_TO_CONTENT_KEY[tab];
    // Always merge parsed blocks ON TOP of full defaults so no property is ever undefined
    const defaultContent = FALLBACK_CMS_CONTENT[contentKey] as object ?? {};
    const merged = { ...defaultContent, ...(parsedBlocks as object ?? {}), visualMode: true };
    setLocalContent(prev => prev ? { ...prev, [contentKey]: merged } : prev);
    setPageModes(prev => ({ ...prev, [tab]: 'visual' }));
    setMigrationState(null);
  };

  const handleMigrationStartFresh = () => {
    if (!migrationState || !localContent) return;
    const { tab, pageKey } = migrationState;
    const contentKey = TAB_TO_CONTENT_KEY[tab];
    // Load default template from FALLBACK_CMS_CONTENT
    const defaultContent = { ...(FALLBACK_CMS_CONTENT[contentKey] as object), visualMode: true };
    setLocalContent(prev => prev ? { ...prev, [contentKey]: defaultContent } : prev);
    setPageModes(prev => ({ ...prev, [tab]: 'visual' }));
    setMigrationState(null);
    void pageKey; // suppress unused var
  };

  const handleMigrationCancel = () => setMigrationState(null);

  const handleJsonChange = (val: string) => {
    setJsonCode(val);
    try {
      const parsed = JSON.parse(val) as CmsContent;
      setLocalContent(parsed);
      setJsonError('');
    } catch (err) {
      setJsonError(err instanceof Error ? err.message : 'Invalid JSON format');
    }
  };

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // --- SPEAKER CRUD HANDLERS ---
  const openAddSpeaker = () => {
    setEditingSpeaker(null);
    setSpeakerForm({
      id: '',
      name: '',
      role: '',
      organisation: '',
      bio: '',
      avatarUrl: '',
      email: '',
      socialUrl: '',
    });
    setShowSpeakerModal(true);
  };

  const openEditSpeaker = (sp: Speaker) => {
    setEditingSpeaker(sp);
    setSpeakerForm({ ...sp, socialUrl: sp.socialUrl || '' });
    setShowSpeakerModal(true);
  };

  const deleteSpeaker = (id: string) => {
    if (!localContent || !window.confirm('Are you sure you want to delete this speaker? This will unlink them from any sessions.')) return;
    const updatedSpeakers = localContent.speakers.filter(s => s.id !== id);
    const updatedSessions = localContent.sessions.map(s => ({
      ...s,
      speakerIds: s.speakerIds.filter(sid => sid !== id)
    }));
    const newContent = { ...localContent, speakers: updatedSpeakers, sessions: updatedSessions };
    setLocalContent(newContent);
    handleSave(newContent);
  };

  const saveSpeakerForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localContent) return;

    let updatedSpeakers = [...localContent.speakers];
    const item: Speaker = {
      id: editingSpeaker ? editingSpeaker.id : (speakerForm.id.trim() || speakerForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')),
      name: speakerForm.name,
      role: speakerForm.role,
      organisation: speakerForm.organisation,
      bio: speakerForm.bio,
      avatarUrl: speakerForm.avatarUrl || '/airo-assets/images/speakers/default',
      email: speakerForm.email,
      socialUrl: speakerForm.socialUrl,
    };

    if (editingSpeaker) {
      updatedSpeakers = updatedSpeakers.map(s => s.id === editingSpeaker.id ? item : s);
    } else {
      if (updatedSpeakers.some(s => s.id === item.id)) {
        alert('Speaker ID already exists. Please choose a different slug.');
        return;
      }
      updatedSpeakers.push(item);
    }

    const newContent = { ...localContent, speakers: updatedSpeakers };
    setLocalContent(newContent);
    setShowSpeakerModal(false);
    handleSave(newContent);
  };

  // --- SPONSOR CRUD HANDLERS ---
  const openAddSponsor = () => {
    setEditingSponsor(null);
    setSponsorForm({
      id: '',
      name: '',
      logoUrl: '',
      websiteUrl: '',
      tier: 'Session Sponsor',
    });
    setShowSponsorModal(true);
  };

  const openEditSponsor = (sp: Sponsor) => {
    setEditingSponsor(sp);
    setSponsorForm({ ...sp, tier: sp.tier || 'Session Sponsor' });
    setShowSponsorModal(true);
  };

  const deleteSponsor = (id: string) => {
    if (!localContent || !window.confirm('Are you sure you want to delete this sponsor? This will unlink them from any sessions.')) return;
    const updatedSponsors = localContent.sponsors.filter(s => s.id !== id);
    const updatedSessions = localContent.sessions.map(s => ({
      ...s,
      sponsorIds: s.sponsorIds.filter(sid => sid !== id)
    }));
    const newContent = { ...localContent, sponsors: updatedSponsors, sessions: updatedSessions };
    setLocalContent(newContent);
    handleSave(newContent);
  };

  const saveSponsorForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localContent) return;

    let updatedSponsors = [...localContent.sponsors];
    const item: Sponsor = {
      id: editingSponsor ? editingSponsor.id : (sponsorForm.id.trim() || sponsorForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')),
      name: sponsorForm.name,
      logoUrl: sponsorForm.logoUrl || '/airo-assets/images/logo/default',
      websiteUrl: sponsorForm.websiteUrl,
      tier: sponsorForm.tier,
    };

    if (editingSponsor) {
      updatedSponsors = updatedSponsors.map(s => s.id === editingSponsor.id ? item : s);
    } else {
      if (updatedSponsors.some(s => s.id === item.id)) {
        alert('Sponsor ID already exists. Please choose a different slug.');
        return;
      }
      updatedSponsors.push(item);
    }

    const newContent = { ...localContent, sponsors: updatedSponsors };
    setLocalContent(newContent);
    setShowSponsorModal(false);
    handleSave(newContent);
  };

  // --- SESSION CRUD HANDLERS ---
  const openAddSession = () => {
    setEditingSession(null);
    setSessionTimeRaw('09:00');
    setSessionTimezone('UTC');
    setSessionForm({
      id: '',
      title: '',
      description: '',
      tag: 'Project Controls',
      date: '',
      time: '09:00 UTC',
      duration: '60 min',
      status: 'draft',
      speakerIds: [],
      sponsorIds: [],
      registrationUrl: '',
      videoUrl: '',
    });
    setShowSessionModal(true);
  };

  const openEditSession = (se: Session) => {
    setEditingSession(se);
    // Parse stored time string like "16:00 BST" into picker components
    const timeParts = (se.time || '09:00 UTC').trim().split(' ');
    const rawTime = timeParts[0] || '09:00';
    const tz = timeParts[1] || 'UTC';
    setSessionTimeRaw(rawTime);
    setSessionTimezone(tz);
    setSessionForm({
      ...se,
      registrationUrl: se.registrationUrl || '',
      videoUrl: se.videoUrl || '',
      speakerIds: se.speakerIds || [],
      sponsorIds: se.sponsorIds || [],
    });
    setShowSessionModal(true);
  };

  const deleteSession = (id: string) => {
    if (!localContent || !window.confirm('Are you sure you want to delete this session?')) return;
    const updatedSessions = localContent.sessions.filter(s => s.id !== id);
    const newContent = { ...localContent, sessions: updatedSessions };
    setLocalContent(newContent);
    handleSave(newContent);
  };

  const toggleSessionRelation = (type: 'speaker' | 'sponsor', id: string) => {
    setSessionForm(prev => {
      const field = type === 'speaker' ? 'speakerIds' : 'sponsorIds';
      const arr = prev[field];
      const newArr = arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id];
      return { ...prev, [field]: newArr };
    });
  };

  const saveSessionForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localContent) return;

    let updatedSessions = [...localContent.sessions];
    const item: Session = {
      id: editingSession ? editingSession.id : (sessionForm.id.trim() || sessionForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')),
      title: sessionForm.title,
      description: sessionForm.description,
      tag: sessionForm.tag,
      date: sessionForm.date,
      time: sessionForm.time,
      duration: sessionForm.duration,
      status: sessionForm.status,
      speakerIds: sessionForm.speakerIds,
      sponsorIds: sessionForm.sponsorIds,
      registrationUrl: sessionForm.registrationUrl || undefined,
      videoUrl: sessionForm.videoUrl || undefined,
    };

    if (editingSession) {
      updatedSessions = updatedSessions.map(s => s.id === editingSession.id ? item : s);
    } else {
      if (updatedSessions.some(s => s.id === item.id)) {
        alert('Session ID already exists. Please choose a different slug.');
        return;
      }
      updatedSessions.push(item);
    }

    const newContent = { ...localContent, sessions: updatedSessions };
    setLocalContent(newContent);
    setShowSessionModal(false);
    handleSave(newContent);
  };

  if (!authenticated) {
    return (
      <>
        <Helmet>
          <title>CMS Login — DeliverIQ</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="min-h-[90vh] flex items-center justify-center bg-[#1A1D24] px-6">
          <div className="w-full max-w-sm border border-[#2C2F38] bg-[#21242C] p-8 rounded shadow-2xl">
            <div className="flex flex-col items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full border border-[#C79A4E]/30 bg-[#C79A4E]/5 flex items-center justify-center text-[#C79A4E]">
                <Lock size={20} />
              </div>
              <h1 className="text-xl font-bold text-[#F0EDE8]">CMS Admin Login</h1>
              <p className="text-xs text-[#8A8D96] text-center">Enter the administration password to configure layout copy and settings.</p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Admin password"
                  required
                  className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] placeholder-[#8A8D96] px-4 py-3 text-sm rounded focus:outline-none focus:border-[#C79A4E] transition-colors"
                />
              </div>

              {loginError && (
                <p className="text-xs text-red-500 font-semibold flex items-center gap-1">
                  <AlertTriangle size={12} /> {loginError}
                </p>
              )}

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 text-sm font-semibold bg-[#C79A4E] text-[#1A1D24] rounded transition-all hover:brightness-110 disabled:opacity-50"
              >
                {loginLoading ? 'Authenticating...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }

  if (isLoading || !localContent) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-3 bg-[#1A1D24]">
        <RefreshCw size={24} className="text-[#C79A4E] animate-spin" />
        <p className="text-xs text-[#8A8D96]">Loading CMS content config...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>CMS Admin Panel — DeliverIQ</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Migration prompt modal — shown when switching a page to Visual mode */}
      {migrationState && (
        <MigrationPrompt
          canAutoMigrate={migrationState.canAutoMigrate}
          onAutoMigrate={handleMigrationAutoMigrate}
          onStartFresh={handleMigrationStartFresh}
          onCancel={handleMigrationCancel}
        />
      )}

      <div className="bg-[#1A1D24] min-h-screen text-[#F0EDE8] antialiased">
        {/* Header bar */}
        <header className="border-b border-[#2C2F38] bg-[#21242C] px-6 py-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold bg-[#C79A4E] text-[#1A1D24] px-2.5 py-1 rounded tracking-wide">CMS</span>
            <h1 className="text-base font-bold tracking-tight hidden sm:block">DeliverIQ Content Manager</h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleClearCache}
              className="inline-flex items-center gap-2 px-4 py-2 border border-[#2C2F38] text-[#8A8D96] rounded text-xs font-bold hover:text-[#F0EDE8] hover:bg-[#2C2F38] transition-all"
            >
              <RefreshCw size={14} /> Clear Cache
            </button>
            <button
              onClick={() => handleSave()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#C79A4E] text-[#1A1D24] rounded text-xs font-bold hover:brightness-110 transition-all hover:scale-[1.02]"
            >
              <Save size={14} /> Save Changes
            </button>
            <button
              onClick={handleLogout}
              className="p-2 text-[#8A8D96] hover:text-red-400 hover:bg-[#2C2F38] rounded transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-69px)]">
          {/* Sidebar tabs */}
          <nav className="w-full md:w-64 border-r border-[#2C2F38] bg-[#21242C]/40 p-4 flex flex-row md:flex-col gap-1 overflow-x-auto shrink-0">
            <p className="text-[9px] font-bold text-[#8A8D96] uppercase tracking-widest px-4 py-2 hidden md:block select-none">Layout Pages</p>
            <button
              onClick={() => handleTabChange('home')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'home' ? 'bg-[#C79A4E] text-[#1A1D24]' : 'text-[#8A8D96] hover:bg-[#2C2F38] hover:text-[#F0EDE8]'
              }`}
            >
              <Layout size={14} />
              Homepage Layout
            </button>
            <button
              onClick={() => handleTabChange('sessions-html')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'sessions-html' ? 'bg-[#C79A4E] text-[#1A1D24]' : 'text-[#8A8D96] hover:bg-[#2C2F38] hover:text-[#F0EDE8]'
              }`}
            >
              <BookOpen size={14} />
              Sessions Layout
            </button>
            <button
              onClick={() => handleTabChange('speakers-html')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'speakers-html' ? 'bg-[#C79A4E] text-[#1A1D24]' : 'text-[#8A8D96] hover:bg-[#2C2F38] hover:text-[#F0EDE8]'
              }`}
            >
              <User size={14} />
              Speakers Layout
            </button>
            <button
              onClick={() => handleTabChange('sponsors-html')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'sponsors-html' ? 'bg-[#C79A4E] text-[#1A1D24]' : 'text-[#8A8D96] hover:bg-[#2C2F38] hover:text-[#F0EDE8]'
              }`}
            >
              <Award size={14} />
              Sponsors Layout
            </button>
            <button
              onClick={() => handleTabChange('contact-html')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'contact-html' ? 'bg-[#C79A4E] text-[#1A1D24]' : 'text-[#8A8D96] hover:bg-[#2C2F38] hover:text-[#F0EDE8]'
              }`}
            >
              <Mail size={14} />
              Contact Layout
            </button>
            <button
              onClick={() => handleTabChange('privacy-html')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'privacy-html' ? 'bg-[#C79A4E] text-[#1A1D24]' : 'text-[#8A8D96] hover:bg-[#2C2F38] hover:text-[#F0EDE8]'
              }`}
            >
              <Shield size={14} />
              Privacy Policy
            </button>
            <button
              onClick={() => handleTabChange('terms-html')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'terms-html' ? 'bg-[#C79A4E] text-[#1A1D24]' : 'text-[#8A8D96] hover:bg-[#2C2F38] hover:text-[#F0EDE8]'
              }`}
            >
              <FileText size={14} />
              Terms of Use
            </button>
            <button
              onClick={() => handleTabChange('register-html')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'register-html' ? 'bg-[#C79A4E] text-[#1A1D24]' : 'text-[#8A8D96] hover:bg-[#2C2F38] hover:text-[#F0EDE8]'
              }`}
            >
              <CheckSquare size={14} />
              Register Layout
            </button>
            <button
              onClick={() => handleTabChange('replays-html')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'replays-html' ? 'bg-[#C79A4E] text-[#1A1D24]' : 'text-[#8A8D96] hover:bg-[#2C2F38] hover:text-[#F0EDE8]'
              }`}
            >
              <Play size={14} />
              Replays Layout
            </button>
            <button
              onClick={() => handleTabChange('session-detail-html')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'session-detail-html' ? 'bg-[#C79A4E] text-[#1A1D24]' : 'text-[#8A8D96] hover:bg-[#2C2F38] hover:text-[#F0EDE8]'
              }`}
            >
              <FileText size={14} />
              Session Detail Layout
            </button>
            <button
              onClick={() => handleTabChange('404-html')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === '404-html' ? 'bg-[#C79A4E] text-[#1A1D24]' : 'text-[#8A8D96] hover:bg-[#2C2F38] hover:text-[#F0EDE8]'
              }`}
            >
              <AlertTriangle size={14} />
              404 Page Layout
            </button>
            <button
              onClick={() => handleTabChange('global-css')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'global-css' ? 'bg-[#C79A4E] text-[#1A1D24]' : 'text-[#8A8D96] hover:bg-[#2C2F38] hover:text-[#F0EDE8]'
              }`}
            >
              <Code size={14} />
              Global CSS Editor
            </button>
            
            <p className="text-[9px] font-bold text-[#8A8D96] uppercase tracking-widest px-4 py-2 mt-4 hidden md:block select-none">Database Modules</p>
            <button
              onClick={() => handleTabChange('manage-sessions')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'manage-sessions' ? 'bg-[#C79A4E] text-[#1A1D24]' : 'text-[#8A8D96] hover:bg-[#2C2F38] hover:text-[#F0EDE8]'
              }`}
            >
              <Calendar size={14} />
              Manage Sessions
            </button>
            <button
              onClick={() => handleTabChange('manage-speakers')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'manage-speakers' ? 'bg-[#C79A4E] text-[#1A1D24]' : 'text-[#8A8D96] hover:bg-[#2C2F38] hover:text-[#F0EDE8]'
              }`}
            >
              <User size={14} />
              Manage Speakers
            </button>
            <button
              onClick={() => handleTabChange('manage-sponsors')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'manage-sponsors' ? 'bg-[#C79A4E] text-[#1A1D24]' : 'text-[#8A8D96] hover:bg-[#2C2F38] hover:text-[#F0EDE8]'
              }`}
            >
              <Award size={14} />
              Manage Sponsors
            </button>
            <button
              onClick={() => handleTabChange('manage-forms')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'manage-forms' ? 'bg-[#C79A4E] text-[#1A1D24]' : 'text-[#8A8D96] hover:bg-[#2C2F38] hover:text-[#F0EDE8]'
              }`}
            >
              <CheckSquare size={14} />
              Manage Forms
            </button>

            <div className="h-px bg-[#2C2F38] my-2 hidden md:block" />
            <button
              onClick={() => handleTabChange('settings')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'settings' ? 'bg-[#C79A4E] text-[#1A1D24]' : 'text-[#8A8D96] hover:bg-[#2C2F38] hover:text-[#F0EDE8]'
              }`}
            >
              <Settings size={14} />
              Platform Settings
            </button>
            <button
              onClick={() => handleTabChange('json')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'json' ? 'bg-[#C79A4E] text-[#1A1D24]' : 'text-[#8A8D96] hover:bg-[#2C2F38] hover:text-[#F0EDE8]'
              }`}
            >
              <Code size={14} />
              Raw JSON Config
            </button>
          </nav>

          {/* Form edit body */}
          <main className="flex-1 p-6 md:p-8 max-w-5xl overflow-y-auto">
            
            {/* ==================== LAYOUT TABS ==================== */}

            {/* ── Dual-mode page tab renderer ── */}
            {(['home', 'sessions-html', 'speakers-html', 'sponsors-html', 'contact-html', 'privacy-html', 'terms-html', 'register-html', 'replays-html', 'session-detail-html', '404-html'] as const).map(tab => {
              if (activeTab !== tab) return null;
              const mode = pageModes[tab] ?? 'html';
              const pageKey = TAB_TO_PAGE_KEY[tab];
              const htmlKey = TAB_TO_HTML_KEY[tab];
              const contentKey = TAB_TO_CONTENT_KEY[tab];
              const pageLabels: Record<string, { title: string; desc: string }> = {
                home: { title: 'Homepage Content', desc: 'Edit the landing page. Use [MarqueeTicker] and [SessionsList] shortcodes in HTML mode.' },
                'sessions-html': { title: 'Sessions Page Layout', desc: 'Edit the sessions page header. Binds [RegisterForm] and [TopicsList] widgets in HTML mode.' },
                'speakers-html': { title: 'Speakers Page Layout', desc: 'Edit speaker page copy. Binds [SpeakerForm] widget in HTML mode.' },
                'sponsors-html': { title: 'Sponsors Page Layout', desc: 'Edit sponsors copy. Binds [SponsorStats] and [SponsorForm] widgets in HTML mode.' },
                'contact-html': { title: 'Contact Page Layout', desc: 'Binds the [ContactForm] widget in HTML mode.' },
                'privacy-html': { title: 'Privacy Policy', desc: 'Edit privacy policy content.' },
                'terms-html': { title: 'Terms of Use', desc: 'Edit terms of service content.' },
                'register-html': { title: 'Register Page Layout', desc: 'Edit the layout of the registration page. The dynamic session content will render inside the [RegisterWidget] shortcode.' },
                'replays-html': { title: 'Replays Page Layout', desc: 'Manage past sessions and video playbacks. Binds [ReplaysGrid] widget in HTML mode.' },
                'session-detail-html': { title: 'Session Detail Layout', desc: 'Configure session detail pages template.' },
                '404-html': { title: '404 Page Layout', desc: 'Edit the message shown when a page cannot be found.' }
              };
              const { title, desc } = pageLabels[tab];

              return (
                <div key={tab} className="flex flex-col gap-5 h-full">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold">{title}</h2>
                      <p className="text-xs text-[#8A8D96] mt-1">{desc}</p>
                    </div>
                    <a href={`/${tab === 'home' ? '' : tab.replace('-html', '')}`} target="_blank" rel="noreferrer"
                      className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-[#8A8D96] hover:text-[#C79A4E] border border-[#2C2F38] hover:border-[#C79A4E]/30 px-3 py-1.5 rounded-sm transition-all">
                      <Eye size={11} /> Preview
                    </a>
                  </div>

                  <ModeToggle
                    mode={mode}
                    onChange={(m) => handleModeToggle(tab, m)}
                    hasExistingHtml={!!(localContent?.[htmlKey] as string)?.trim()}
                  />

                  {mode === 'visual' && localContent?.[contentKey] ? (
                    <div className="flex gap-5" style={{ minHeight: '600px' }}>
                      {/* LEFT: block editor forms */}
                      <div className="flex-1 overflow-y-auto flex flex-col gap-5">
                        <VisualPageEditor
                          page={pageKey}
                          content={localContent}
                          onContentChange={(c) => setLocalContent(c)}
                        />
                      </div>
                      {/* RIGHT: live preview */}
                      <div className="w-[440px] shrink-0 border border-[#2C2F38] rounded-sm overflow-hidden flex flex-col">
                        <LivePreviewPanel
                          page={pageKey}
                          content={localContent[contentKey]}
                        />
                      </div>
                    </div>
                  ) : (
                    <RichTextEditor
                      value={String(localContent?.[htmlKey] ?? '')}
                      onChange={(val) => handleUpdate(htmlKey as keyof CmsContent, val)}
                    />
                  )}

                  {/* Page Custom CSS section */}
                  <div className="mt-2 border border-[#2C2F38] bg-[#21242C] rounded-sm overflow-hidden">
                    <div className="px-5 py-4 border-b border-[#2C2F38] flex items-center justify-between bg-[#1A1D24]/40">
                      <div className="flex items-center gap-2">
                        <Code size={14} className="text-[#C79A4E]" />
                        <h3 className="text-sm font-bold text-[#F0EDE8]">Custom Page CSS Override</h3>
                      </div>
                      <span className="text-[10px] text-[#8A8D96] italic">Injects a local &lt;style&gt; block on this page</span>
                    </div>
                    <div className="p-5 flex flex-col gap-2">
                      <textarea
                        rows={6}
                        value={String(localContent?.[TAB_TO_CSS_KEY[tab]] ?? '')}
                        onChange={(e) => handleUpdate(TAB_TO_CSS_KEY[tab], e.target.value)}
                        placeholder="/* Enter custom CSS rules to style this page (e.g. .register-form { border-color: red; }) */"
                        className="w-full font-mono text-xs bg-[#1A1D24] border border-[#2C2F38] rounded p-3 text-[#F0EDE8] placeholder-[#4A4D56] focus:outline-none focus:border-[#C79A4E] resize-y"
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* ==================== SPEAKERS CRUD TAB ==================== */}
            {activeTab === 'manage-speakers' && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Manage Speakers Directory</h2>
                    <p className="text-xs text-[#8A8D96] mt-1">Configure and manage active speakers profiles linked to learning sessions.</p>
                  </div>
                  <button
                    onClick={openAddSpeaker}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C79A4E] text-[#1A1D24] rounded text-xs font-bold hover:brightness-110 transition-colors"
                  >
                    <Plus size={14} /> Add Speaker
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {localContent.speakers.map((sp) => (
                    <div key={sp.id} className="border border-[#2C2F38] bg-[#21242C] p-5 rounded-sm flex items-start gap-4 hover:border-[#C79A4E]/30 transition-colors relative group">
                      <img
                        src={sp.avatarUrl}
                        alt={sp.name}
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80'; }}
                        className="w-14 h-14 rounded-full object-cover bg-[#1A1D24] border border-[#2C2F38] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <h3 className="font-bold text-sm text-[#F0EDE8] truncate">{sp.name}</h3>
                          <span className="text-[10px] font-mono text-[#8A8D96] uppercase bg-[#1A1D24] px-1.5 py-0.5 rounded border border-[#2C2F38]">{sp.id}</span>
                        </div>
                        <p className="text-xs text-[#C79A4E] font-medium mb-1 truncate">{sp.role}</p>
                        <p className="text-xs text-[#8A8D96] truncate mb-2">{sp.organisation}</p>
                        <p className="text-xs text-[#8A8D96] line-clamp-2 leading-relaxed italic">{sp.bio}</p>
                      </div>

                      {/* Floating actions */}
                      <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEditSpeaker(sp)}
                          className="p-1.5 bg-[#1A1D24] border border-[#2C2F38] text-[#8A8D96] hover:text-[#C79A4E] hover:border-[#C79A4E]/30 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={() => deleteSpeaker(sp.id)}
                          className="p-1.5 bg-[#1A1D24] border border-[#2C2F38] text-[#8A8D96] hover:text-red-400 hover:border-red-950/40 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==================== SPONSORS CRUD TAB ==================== */}
            {activeTab === 'manage-sponsors' && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Manage Sponsors directory</h2>
                    <p className="text-xs text-[#8A8D96] mt-1">Configure brand sponsorships, logo displays, websites, and partner tiers.</p>
                  </div>
                  <button
                    onClick={openAddSponsor}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C79A4E] text-[#1A1D24] rounded text-xs font-bold hover:brightness-110 transition-colors"
                  >
                    <Plus size={14} /> Add Sponsor
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {localContent.sponsors.map((sp) => (
                    <div key={sp.id} className="border border-[#2C2F38] bg-[#21242C] p-5 rounded-sm flex flex-col items-center text-center hover:border-[#C79A4E]/30 transition-colors relative group">
                      <div className="w-16 h-16 rounded bg-[#1A1D24] border border-[#2C2F38] flex items-center justify-center p-2 mb-4 shrink-0 overflow-hidden">
                        <img
                          src={sp.logoUrl}
                          alt={sp.name}
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120'; }}
                          className="max-w-full max-h-full object-contain filter brightness-90"
                        />
                      </div>

                      <h3 className="font-bold text-sm text-[#F0EDE8] mb-1">{sp.name}</h3>
                      <span className="text-[10px] font-semibold text-[#C79A4E] border border-[#C79A4E]/20 px-2 py-0.5 rounded-sm uppercase tracking-wide mb-3">{sp.tier || 'Session Sponsor'}</span>
                      <a href={sp.websiteUrl} target="_blank" rel="noreferrer" className="text-xs text-[#8A8D96] hover:text-[#C79A4E] flex items-center gap-1 hover:underline">
                        <Globe size={11} /> Visit Website
                      </a>

                      {/* Floating actions */}
                      <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEditSponsor(sp)}
                          className="p-1.5 bg-[#1A1D24] border border-[#2C2F38] text-[#8A8D96] hover:text-[#C79A4E] hover:border-[#C79A4E]/30 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={() => deleteSponsor(sp.id)}
                          className="p-1.5 bg-[#1A1D24] border border-[#2C2F38] text-[#8A8D96] hover:text-red-400 hover:border-red-950/40 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==================== SESSIONS CRUD TAB ==================== */}
            {activeTab === 'manage-sessions' && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Manage Learning Sessions</h2>
                    <p className="text-xs text-[#8A8D96] mt-1">Configure live learning modules, set publish statuses, and link presenters and sponsors.</p>
                  </div>
                  <button
                    onClick={openAddSession}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C79A4E] text-[#1A1D24] rounded text-xs font-bold hover:brightness-110 transition-colors"
                  >
                    <Plus size={14} /> Add Session
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {localContent.sessions.map((se) => {
                    const linkedSpeakers = localContent.speakers.filter(s => se.speakerIds.includes(s.id));
                    const linkedSponsors = localContent.sponsors.filter(s => se.sponsorIds.includes(s.id));

                    return (
                      <div key={se.id} className="border border-[#2C2F38] bg-[#21242C] p-6 rounded-sm hover:border-[#C79A4E]/30 transition-colors relative group">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            se.status === 'published' ? 'bg-green-950/30 text-green-400 border border-green-900/30' : 'bg-yellow-950/30 text-yellow-500 border border-yellow-900/30'
                          }`}>
                            {se.status}
                          </span>
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#1A1D24] text-[#C79A4E] border border-[#2C2F38]">
                            {se.tag}
                          </span>
                          <span className="text-[10px] font-mono text-[#8A8D96] ml-auto mr-12">{se.id}</span>
                        </div>

                        <h3 className="font-bold text-lg text-[#F0EDE8] mb-2 leading-snug pr-12 group-hover:text-[#C79A4E] transition-colors">{se.title}</h3>
                        <p className="text-xs text-[#8A8D96] mb-5 leading-relaxed max-w-3xl">{se.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#2C2F38] text-xs">
                          {/* Col 1: Schedule */}
                          <div className="flex flex-col gap-1.5 text-[#8A8D96]">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#F0EDE8] mb-1">Session Schedule</p>
                            <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[#C79A4E]" /> {se.date}</span>
                            <span className="flex items-center gap-1.5"><Clock size={12} className="text-[#C79A4E]" /> {se.time} ({se.duration})</span>
                          </div>

                          {/* Col 2: Speakers */}
                          <div className="flex flex-col gap-1.5">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#F0EDE8] mb-1">Speakers ({linkedSpeakers.length})</p>
                            {linkedSpeakers.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {linkedSpeakers.map(sp => (
                                  <span key={sp.id} className="bg-[#1A1D24] border border-[#2C2F38] px-2 py-1 rounded text-[11px] text-[#F0EDE8]">{sp.name}</span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-[#8A8D96] italic">No speakers linked</span>
                            )}
                          </div>

                          {/* Col 3: Sponsors */}
                          <div className="flex flex-col gap-1.5">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#F0EDE8] mb-1">Sponsors ({linkedSponsors.length})</p>
                            {linkedSponsors.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {linkedSponsors.map(sp => (
                                  <span key={sp.id} className="bg-[#1A1D24] border border-[#2C2F38] px-2 py-1 rounded text-[11px] text-[#F0EDE8]">{sp.name}</span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-[#8A8D96] italic">No sponsors linked</span>
                            )}
                          </div>
                        </div>

                        {/* Floating actions */}
                        <div className="absolute top-6 right-6 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <a
                            href={`/sessions/${se.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 bg-[#1A1D24] border border-[#2C2F38] text-[#8A8D96] hover:text-green-400 hover:border-green-950/40 rounded transition-colors"
                            title="Preview public page"
                          >
                            <Eye size={12} />
                          </a>
                          <button
                            onClick={() => openEditSession(se)}
                            className="p-1.5 bg-[#1A1D24] border border-[#2C2F38] text-[#8A8D96] hover:text-[#C79A4E] hover:border-[#C79A4E]/30 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button
                            onClick={() => deleteSession(se.id)}
                            className="p-1.5 bg-[#1A1D24] border border-[#2C2F38] text-[#8A8D96] hover:text-red-400 hover:border-red-950/40 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ==================== FORMS CRUD TAB ==================== */}
            {activeTab === 'manage-forms' && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-bold">Manage Forms</h2>
                  <p className="text-xs text-[#8A8D96] mt-1">Configure form fields and settings for data collection.</p>
                </div>
                <FormBuilder 
                  forms={localContent.forms || []} 
                  onChange={(forms) => {
                    const newContent = { ...localContent, forms };
                    setLocalContent(newContent);
                    handleSave(newContent);
                  }} 
                />
              </div>
            )}

            {/* ==================== SETTINGS TAB ==================== */}
            {activeTab === 'settings' && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-bold">Platform Settings</h2>
                  <p className="text-xs text-[#8A8D96] mt-1">Manage payment gateways and integration preferences.</p>
                </div>

                <div className="border border-[#2C2F38] bg-[#21242C] p-6 rounded-sm flex flex-col gap-6">
                  <h3 className="text-sm font-bold text-[#F0EDE8] border-b border-[#2C2F38] pb-2 mb-2">Payment Gateways</h3>
                  
                  {/* Stripe */}
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div>
                      <p className="text-sm font-semibold text-[#F0EDE8] group-hover:text-[#C79A4E] transition-colors">Stripe Checkout</p>
                      <p className="text-xs text-[#8A8D96] mt-0.5">Primary gateway for card payments.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={localContent.paymentConfig?.stripeActive ?? true}
                      onChange={(e) => {
                        const val = e.target.checked;
                        const curr = localContent.paymentConfig || { stripeActive: true, paypalActive: false, razorpayActive: false, currency: 'USD' };
                        handleUpdate('paymentConfig', { ...curr, stripeActive: val });
                      }}
                      className="rounded border-[#2C2F38] text-[#C79A4E] focus:ring-0 w-4 h-4 bg-[#1A1D24]"
                    />
                  </label>

                  {/* PayPal */}
                  <label className="flex items-center justify-between cursor-pointer group border-t border-[#2C2F38] pt-6">
                    <div>
                      <p className="text-sm font-semibold text-[#F0EDE8] group-hover:text-[#C79A4E] transition-colors">PayPal</p>
                      <p className="text-xs text-[#8A8D96] mt-0.5">Allow users to checkout using their PayPal wallet.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={localContent.paymentConfig?.paypalActive ?? false}
                      onChange={(e) => {
                        const val = e.target.checked;
                        const curr = localContent.paymentConfig || { stripeActive: true, paypalActive: false, razorpayActive: false, currency: 'USD' };
                        handleUpdate('paymentConfig', { ...curr, paypalActive: val });
                      }}
                      className="rounded border-[#2C2F38] text-[#C79A4E] focus:ring-0 w-4 h-4 bg-[#1A1D24]"
                    />
                  </label>

                  {/* Razorpay */}
                  <label className="flex items-center justify-between cursor-pointer group border-t border-[#2C2F38] pt-6">
                    <div>
                      <p className="text-sm font-semibold text-[#F0EDE8] group-hover:text-[#C79A4E] transition-colors">Razorpay</p>
                      <p className="text-xs text-[#8A8D96] mt-0.5">Enable UPI, Cards, and Netbanking via Razorpay.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={localContent.paymentConfig?.razorpayActive ?? false}
                      onChange={(e) => {
                        const val = e.target.checked;
                        const curr = localContent.paymentConfig || { stripeActive: true, paypalActive: false, razorpayActive: false, currency: 'USD' };
                        handleUpdate('paymentConfig', { ...curr, razorpayActive: val });
                      }}
                      className="rounded border-[#2C2F38] text-[#C79A4E] focus:ring-0 w-4 h-4 bg-[#1A1D24]"
                    />
                  </label>
                  
                  <div className="border-t border-[#2C2F38] pt-6 flex flex-col gap-2">
                    <label className="text-sm font-semibold text-[#F0EDE8]">Base Currency</label>
                    <select
                      value={localContent.paymentConfig?.currency ?? 'USD'}
                      onChange={(e) => {
                        const curr = localContent.paymentConfig || { stripeActive: true, paypalActive: false, razorpayActive: false, currency: 'USD' };
                        handleUpdate('paymentConfig', { ...curr, currency: e.target.value });
                      }}
                      className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none w-full max-w-xs text-sm"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="INR">INR (₹)</option>
                      <option value="AUD">AUD ($)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ==================== GLOBAL CSS TAB ==================== */}
            {activeTab === 'global-css' && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-bold">Global CSS stylesheet Editor</h2>
                  <p className="text-xs text-[#8A8D96] mt-1">
                    Directly view and edit global stylesheet style rules. These rules are injected site-wide (acting as overrides to the main bundle index-CGTjzYuQ.css).
                  </p>
                </div>

                <div className="border border-[#2C2F38] bg-[#21242C] rounded-sm overflow-hidden flex flex-col">
                  <div className="px-5 py-4 border-b border-[#2C2F38] flex items-center justify-between bg-[#1A1D24]/40">
                    <div className="flex items-center gap-2">
                      <Code size={14} className="text-[#C79A4E]" />
                      <span className="text-xs font-mono font-bold text-[#F0EDE8]">index-CGTjzYuQ.css (Overrides)</span>
                    </div>
                    <span className="text-[10px] text-[#8A8D96] italic">Persistent global custom styling</span>
                  </div>
                  <div className="p-5 flex flex-col gap-2">
                    <textarea
                      rows={24}
                      value={localContent?.globalCss || ''}
                      onChange={(e) => handleUpdate('globalCss', e.target.value)}
                      placeholder="/* Add global CSS rules here to override default site colors, layout margins, padding or fonts */"
                      className="w-full font-mono text-xs bg-[#1A1D24] border border-[#2C2F38] rounded p-3 text-[#F0EDE8] placeholder-[#4A4D56] focus:outline-none focus:border-[#C79A4E] resize-y leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ==================== RAW JSON CODE TAB ==================== */}
            {activeTab === 'json' && (
              <div className="flex flex-col gap-6 h-full min-h-[500px]">
                <div>
                  <h2 className="text-xl font-bold">Raw Config Code Editor</h2>
                  <p className="text-xs text-[#8A8D96] mt-1">Edit the raw JSON configuration of the platform.</p>
                </div>

                <div className="flex-1 flex flex-col gap-3">
                  <textarea
                    rows={25}
                    value={jsonCode}
                    onChange={(e) => handleJsonChange(e.target.value)}
                    className="w-full font-mono text-[11px] bg-[#1A1D24] border border-[#2C2F38] rounded p-4 text-[#F0EDE8] leading-normal focus:outline-none focus:border-[#C79A4E] resize-y"
                  />
                  {jsonError && (
                    <p className="text-xs text-red-400 flex items-center gap-1.5 p-3 bg-red-950/20 border border-red-900/30 rounded">
                      <AlertTriangle size={13} /> {jsonError}
                    </p>
                  )}
                  {!jsonError && (
                    <p className="text-xs text-green-400 flex items-center gap-1.5">
                      ✓ Valid JSON Config
                    </p>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ==================== SPEAKER EDIT MODAL ==================== */}
      {showSpeakerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl bg-[#21242C] border border-[#2C2F38] rounded-sm p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-[#F0EDE8] mb-4">{editingSpeaker ? 'Edit Speaker Profile' : 'Add New Speaker'}</h3>
            <form onSubmit={saveSpeakerForm} className="flex flex-col gap-4 text-xs">
              {!editingSpeaker && (
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Speaker ID (Slug) *</label>
                  <input
                    type="text"
                    required
                    value={speakerForm.id}
                    onChange={(e) => setSpeakerForm(prev => ({ ...prev, id: e.target.value }))}
                    placeholder="e.g. john-doe"
                    className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none focus:border-[#C79A4E]"
                  />
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={speakerForm.name}
                    onChange={(e) => setSpeakerForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. John Doe"
                    className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={speakerForm.email}
                    onChange={(e) => setSpeakerForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="e.g. name@company.com"
                    className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Role/Title *</label>
                  <input
                    type="text"
                    required
                    value={speakerForm.role}
                    onChange={(e) => setSpeakerForm(prev => ({ ...prev, role: e.target.value }))}
                    placeholder="e.g. PMO Director"
                    className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Organisation *</label>
                  <input
                    type="text"
                    required
                    value={speakerForm.organisation}
                    onChange={(e) => setSpeakerForm(prev => ({ ...prev, organisation: e.target.value }))}
                    placeholder="e.g. Google"
                    className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Avatar image path</label>
                <input
                  type="text"
                  value={speakerForm.avatarUrl}
                  onChange={(e) => setSpeakerForm(prev => ({ ...prev, avatarUrl: e.target.value }))}
                  placeholder="e.g. /airo-assets/images/speakers/john-doe"
                  className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Social profile URL (LinkedIn)</label>
                <input
                  type="text"
                  value={speakerForm.socialUrl}
                  onChange={(e) => setSpeakerForm(prev => ({ ...prev, socialUrl: e.target.value }))}
                  placeholder="e.g. https://linkedin.com/in/username"
                  className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Biography *</label>
                <textarea
                  rows={3}
                  required
                  value={speakerForm.bio}
                  onChange={(e) => setSpeakerForm(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Speaker's professional background..."
                  className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-[#2C2F38]">
                <button
                  type="button"
                  onClick={() => setShowSpeakerModal(false)}
                  className="px-4 py-2 text-[#8A8D96] hover:text-[#F0EDE8] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C79A4E] text-[#1A1D24] rounded font-bold hover:brightness-110"
                >
                  Save Speaker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== SPONSOR EDIT MODAL ==================== */}
      {showSponsorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl bg-[#21242C] border border-[#2C2F38] rounded-sm p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-[#F0EDE8] mb-4">{editingSponsor ? 'Edit Sponsor Profile' : 'Add New Sponsor'}</h3>
            <form onSubmit={saveSponsorForm} className="flex flex-col gap-4 text-xs">
              {!editingSponsor && (
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Sponsor ID (Slug) *</label>
                  <input
                    type="text"
                    required
                    value={sponsorForm.id}
                    onChange={(e) => setSponsorForm(prev => ({ ...prev, id: e.target.value }))}
                    placeholder="e.g. Microsoft"
                    className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Sponsor / Brand Name *</label>
                <input
                  type="text"
                  required
                  value={sponsorForm.name}
                  onChange={(e) => setSponsorForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Microsoft"
                  className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Sponsor Website URL *</label>
                <input
                  type="url"
                  required
                  value={sponsorForm.websiteUrl}
                  onChange={(e) => setSponsorForm(prev => ({ ...prev, websiteUrl: e.target.value }))}
                  placeholder="e.g. https://brand.com"
                  className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Logo image path</label>
                <input
                  type="text"
                  value={sponsorForm.logoUrl}
                  onChange={(e) => setSponsorForm(prev => ({ ...prev, logoUrl: e.target.value }))}
                  placeholder="e.g. /airo-assets/images/logo/microsoft"
                  className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Sponsorship Tier</label>
                <select
                  value={sponsorForm.tier}
                  onChange={(e) => setSponsorForm(prev => ({ ...prev, tier: e.target.value as 'Session Sponsor' | 'Series Sponsor' | 'Platform Partner' }))}
                  className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none"
                >
                  <option value="Session Sponsor">Session Sponsor</option>
                  <option value="Series Sponsor">Series Sponsor</option>
                  <option value="Platform Partner">Platform Partner</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-[#2C2F38]">
                <button
                  type="button"
                  onClick={() => setShowSponsorModal(false)}
                  className="px-4 py-2 text-[#8A8D96] hover:text-[#F0EDE8] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C79A4E] text-[#1A1D24] rounded font-bold hover:brightness-110"
                >
                  Save Sponsor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== SESSION EDIT MODAL ==================== */}
      {showSessionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl bg-[#21242C] border border-[#2C2F38] rounded-sm p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-[#F0EDE8] mb-4">{editingSession ? 'Edit Learning Session' : 'Add New Session'}</h3>
            <form onSubmit={saveSessionForm} className="flex flex-col gap-4 text-xs">
              {!editingSession && (
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Session ID (Slug) *</label>
                  <input
                    type="text"
                    required
                    value={sessionForm.id}
                    onChange={(e) => setSessionForm(prev => ({ ...prev, id: e.target.value }))}
                    placeholder="e.g. evm-ai"
                    className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Session Title *</label>
                <input
                  type="text"
                  required
                  value={sessionForm.title}
                  onChange={(e) => setSessionForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. AI in Earned Value Management"
                  className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Discipline Tag *</label>
                  <select
                    value={sessionForm.tag}
                    onChange={(e) => setSessionForm(prev => ({ ...prev, tag: e.target.value as 'Project Controls' | 'Project Management' | 'Delivery Leadership' }))}
                    className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none"
                  >
                    <option value="Project Controls">Project Controls</option>
                    <option value="Project Management">Project Management</option>
                    <option value="Delivery Leadership">Delivery Leadership</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Publish Status *</label>
                  <select
                    value={sessionForm.status}
                    onChange={(e) => setSessionForm(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' }))}
                    className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none"
                  >
                    <option value="draft">Draft (hidden)</option>
                    <option value="published">Published (live)</option>
                  </select>
                </div>
              </div>

              {/* Date picker */}
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Date *</label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={sessionForm.date}
                    onChange={(e) => setSessionForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none focus:border-[#C79A4E]/50 transition-colors [color-scheme:dark] cursor-pointer"
                  />
                </div>
              </div>

              {/* Time + Timezone row */}
              <div className="grid grid-cols-5 gap-4">
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Time *</label>
                  <input
                    type="time"
                    required
                    value={sessionTimeRaw}
                    onChange={(e) => {
                      setSessionTimeRaw(e.target.value);
                      setSessionForm(prev => ({ ...prev, time: `${e.target.value} ${sessionTimezone}` }));
                    }}
                    className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none focus:border-[#C79A4E]/50 transition-colors [color-scheme:dark] cursor-pointer"
                  />
                </div>
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Timezone *</label>
                  <select
                    value={sessionTimezone}
                    onChange={(e) => {
                      setSessionTimezone(e.target.value);
                      setSessionForm(prev => ({ ...prev, time: `${sessionTimeRaw} ${e.target.value}` }));
                    }}
                    className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none focus:border-[#C79A4E]/50 transition-colors"
                  >
                    <optgroup label="Universal">
                      <option value="UTC">UTC — Coordinated Universal Time</option>
                    </optgroup>
                    <optgroup label="Europe">
                      <option value="GMT">GMT — Greenwich Mean Time</option>
                      <option value="BST">BST — British Summer Time (UTC+1)</option>
                      <option value="CET">CET — Central European Time (UTC+1)</option>
                      <option value="CEST">CEST — Central European Summer Time (UTC+2)</option>
                      <option value="EET">EET — Eastern European Time (UTC+2)</option>
                    </optgroup>
                    <optgroup label="Americas">
                      <option value="EST">EST — Eastern Standard Time (UTC-5)</option>
                      <option value="EDT">EDT — Eastern Daylight Time (UTC-4)</option>
                      <option value="CST">CST — Central Standard Time (UTC-6)</option>
                      <option value="CDT">CDT — Central Daylight Time (UTC-5)</option>
                      <option value="MST">MST — Mountain Standard Time (UTC-7)</option>
                      <option value="MDT">MDT — Mountain Daylight Time (UTC-6)</option>
                      <option value="PST">PST — Pacific Standard Time (UTC-8)</option>
                      <option value="PDT">PDT — Pacific Daylight Time (UTC-7)</option>
                    </optgroup>
                    <optgroup label="Middle East & Africa">
                      <option value="GST">GST — Gulf Standard Time (UTC+4)</option>
                      <option value="AST">AST — Arabia Standard Time (UTC+3)</option>
                      <option value="EAT">EAT — East Africa Time (UTC+3)</option>
                      <option value="WAT">WAT — West Africa Time (UTC+1)</option>
                    </optgroup>
                    <optgroup label="Asia & Pacific">
                      <option value="IST">IST — India Standard Time (UTC+5:30)</option>
                      <option value="PKT">PKT — Pakistan Standard Time (UTC+5)</option>
                      <option value="SGT">SGT — Singapore Time (UTC+8)</option>
                      <option value="HKT">HKT — Hong Kong Time (UTC+8)</option>
                      <option value="JST">JST — Japan Standard Time (UTC+9)</option>
                      <option value="KST">KST — Korea Standard Time (UTC+9)</option>
                      <option value="AEST">AEST — Australian Eastern Standard Time (UTC+10)</option>
                      <option value="AEDT">AEDT — Australian Eastern Daylight Time (UTC+11)</option>
                      <option value="NZST">NZST — New Zealand Standard Time (UTC+12)</option>
                    </optgroup>
                  </select>
                </div>
                <div className="col-span-1 flex flex-col gap-1.5">
                  <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Duration *</label>
                  <select
                    value={sessionForm.duration}
                    onChange={(e) => setSessionForm(prev => ({ ...prev, duration: e.target.value }))}
                    className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none focus:border-[#C79A4E]/50 transition-colors"
                  >
                    <option value="30 min">30 min</option>
                    <option value="45 min">45 min</option>
                    <option value="60 min">60 min</option>
                    <option value="90 min">90 min</option>
                    <option value="120 min">120 min</option>
                    <option value="Half day">Half day</option>
                    <option value="Full day">Full day</option>
                  </select>
                </div>
              </div>

              {/* Preview of the stored time string */}
              {sessionTimeRaw && (
                <p className="text-[10px] text-[#8A8D96] -mt-2">
                  Stored as: <span className="text-[#C79A4E] font-mono">{sessionTimeRaw} {sessionTimezone}</span>
                </p>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Custom registration URL</label>
                  <input
                    type="text"
                    value={sessionForm.registrationUrl}
                    onChange={(e) => setSessionForm(prev => ({ ...prev, registrationUrl: e.target.value }))}
                    placeholder="e.g. https://event.com/123"
                    className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Replay Video URL</label>
                  <input
                    type="text"
                    value={sessionForm.videoUrl}
                    onChange={(e) => setSessionForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                    placeholder="e.g. /airo-assets/videos/replays/evm"
                    className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none"
                  />
                </div>
              </div>

              {/* Speaker Select Checklist */}
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Link Presenting Speakers *</label>
                <div className="border border-[#2C2F38] bg-[#1A1D24] rounded p-3 flex flex-col gap-2 max-h-36 overflow-y-auto">
                  {localContent.speakers.map(sp => (
                    <label key={sp.id} className="flex items-center gap-2 cursor-pointer text-[#F0EDE8] hover:text-[#C79A4E] transition-colors">
                      <input
                        type="checkbox"
                        checked={sessionForm.speakerIds.includes(sp.id)}
                        onChange={() => toggleSessionRelation('speaker', sp.id)}
                        className="rounded border-[#2C2F38] text-[#C79A4E] focus:ring-0 focus:ring-offset-0 bg-[#21242C] w-3.5 h-3.5"
                      />
                      <span>{sp.name} ({sp.organisation})</span>
                    </label>
                  ))}
                  {localContent.speakers.length === 0 && <span className="text-[#8A8D96] italic">No speakers available. Add speakers first.</span>}
                </div>
              </div>

              {/* Sponsor Select Checklist */}
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Link Event Sponsors</label>
                <div className="border border-[#2C2F38] bg-[#1A1D24] rounded p-3 flex flex-col gap-2 max-h-36 overflow-y-auto">
                  {localContent.sponsors.map(sp => (
                    <label key={sp.id} className="flex items-center gap-2 cursor-pointer text-[#F0EDE8] hover:text-[#C79A4E] transition-colors">
                      <input
                        type="checkbox"
                        checked={sessionForm.sponsorIds.includes(sp.id)}
                        onChange={() => toggleSessionRelation('sponsor', sp.id)}
                        className="rounded border-[#2C2F38] text-[#C79A4E] focus:ring-0 focus:ring-offset-0 bg-[#21242C] w-3.5 h-3.5"
                      />
                      <span>{sp.name} ({sp.tier})</span>
                    </label>
                  ))}
                  {localContent.sponsors.length === 0 && <span className="text-[#8A8D96] italic">No sponsors available. Add sponsors first.</span>}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-[#8A8D96] uppercase tracking-wider text-[10px]">Session Description *</label>
                <textarea
                  rows={3}
                  required
                  value={sessionForm.description}
                  onChange={(e) => setSessionForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="What will attendees learn in this live session?..."
                  className="bg-[#1A1D24] border border-[#2C2F38] text-[#F0EDE8] px-3.5 py-2.5 rounded focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-[#2C2F38]">
                <button
                  type="button"
                  onClick={() => setShowSessionModal(false)}
                  className="px-4 py-2 text-[#8A8D96] hover:text-[#F0EDE8] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C79A4E] text-[#1A1D24] rounded font-bold hover:brightness-110"
                >
                  Save Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating status Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-in">
          <div className={`flex items-center gap-3 px-4 py-3 rounded shadow-2xl border text-xs font-semibold ${
            toast.type === 'success' ? 'bg-green-950/30 border-green-900/40 text-green-400' : 'bg-red-950/30 border-red-900/40 text-red-400'
          }`}>
            {toast.type === 'success' ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </>
  );
}
