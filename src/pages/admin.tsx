import { useState, useEffect, useRef } from 'react';
import { SeoHead } from '../components/SeoHead';
import { useQueryClient } from '@tanstack/react-query';
import { useCmsContent, useUpdateCmsContent, CmsContent, Speaker, Sponsor, Session, Topic } from '@/lib/cms-client';
import { Save, LogOut, Layout, BookOpen, User, Users, Award, Mail, Shield, FileText, Code, RefreshCw, CheckCircle, AlertTriangle, Plus, Trash2, Edit2, Eye, Calendar, Clock, Globe, Settings, CheckSquare, Play, X, List, Download, CreditCard } from 'lucide-react';
import * as XLSX from 'xlsx';
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
  | 'hero-banner' | 'manage-sessions' | 'manage-speakers' | 'manage-sponsors' | 'manage-topics' | 'manage-forms' | 'manage-users' | 'manage-coupons' | 'manage-purchases' | 'email-templates' | 'settings' | 'json' | 'global-content' | 'subscriptions';

import { removeUserToken, getUserToken } from '@/lib/user-auth';
import { EmailTemplateStudio } from '@/components/cms/EmailTemplateStudio';
import { GlobalContentEditor } from '@/components/cms/GlobalContentEditor';
import { SubscriptionConfigEditor } from '@/components/cms/SubscriptionConfigEditor';

// ... (imports remain)

export default function AdminPage() {
  const queryClient = useQueryClient();
  const { data: cmsContent, isLoading } = useCmsContent();
  const updateMutation = useUpdateCmsContent();

  const handleLogout = () => {
    removeUserToken();
    window.location.href = '/admin/login';
  };

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

  const [isUploadingSpeakerAvatar, setIsUploadingSpeakerAvatar] = useState(false);
  const speakerAvatarInputRef = useRef<HTMLInputElement>(null);

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
  const [sessionForm, setSessionForm] = useState<Omit<Session, 'id' | 'speakerIds' | 'sponsorIds'> & { id: string; speakerIds: string[]; sponsorIds: string[]; sessionOgImageUrl?: string }>({
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
    sessionOgImageUrl: '',
    price: 0,
    isFree: false,
    gateway: 'all',
  });

  // Topic Modal State
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [topicForm, setTopicForm] = useState<Omit<Topic, 'id'> & { id: string }>({
    id: '',
    title: '',
    description: '',
  });

  // Coupon CRUD State
  interface CouponDetail {
    id: string;
    code: string;
    discountPercentage: number;
    sessionId?: string;
    startDate?: string;
    endDate?: string;
    maxUses?: number;
    uses?: number;
    active: boolean;
  }

  const [showCouponModal, setShowCouponModal] = useState(false);
  const [isUploadingHeroVideo, setIsUploadingHeroVideo] = useState(false);
  const [isUploadingHeroGif, setIsUploadingHeroGif] = useState(false);
  const [uploadProgressVideo, setUploadProgressVideo] = useState(0);
  const [uploadProgressGif, setUploadProgressGif] = useState(0);
  const [editingCoupon, setEditingCoupon] = useState<CouponDetail | null>(null);
  const [couponForm, setCouponForm] = useState<CouponDetail>({
    id: '',
    code: '',
    discountPercentage: 10,
    sessionId: 'all',
    startDate: '',
    endDate: '',
    maxUses: undefined,
    uses: 0,
    active: true
  });

  const openAddCoupon = () => {
    setEditingCoupon(null);
    setCouponForm({
      id: '',
      code: '',
      discountPercentage: 10,
      sessionId: 'all',
      startDate: '',
      endDate: '',
      maxUses: undefined,
      uses: 0,
      active: true
    });
    setShowCouponModal(true);
  };

  const openEditCoupon = (c: any) => {
    setEditingCoupon(c);
    setCouponForm({
      id: c.id,
      code: c.code,
      discountPercentage: c.discountPercentage,
      sessionId: c.sessionId || 'all',
      startDate: c.startDate || '',
      endDate: c.endDate || '',
      maxUses: c.maxUses,
      uses: c.uses || 0,
      active: c.active !== false
    });
    setShowCouponModal(true);
  };

  const saveCouponForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localContent) return;
    const newCoupons = [...(localContent.coupons || [])];
    const item: any = {
      ...couponForm,
      id: couponForm.id || couponForm.code.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      code: couponForm.code.toUpperCase(),
      maxUses: couponForm.maxUses ? Number(couponForm.maxUses) : undefined
    };

    const idx = newCoupons.findIndex((c: any) => c.id === item.id);
    if (idx !== -1) {
      newCoupons[idx] = item;
    } else {
      newCoupons.push(item);
    }

    const newContent = { ...localContent, coupons: newCoupons };
    setLocalContent(newContent);
    handleSave(newContent);
    setShowCouponModal(false);
  };

  // User CRUD State
  interface UserDetail {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'delegate';
    registered_session_ids: string[];
    created_at: string;
  }

  const [users, setUsers] = useState<UserDetail[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserDetail | null>(null);
  const [userForm, setUserForm] = useState({
    id: '',
    name: '',
    email: '',
    role: 'delegate' as 'admin' | 'delegate',
    password: '',
  });

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const token = getUserToken();
      const res = await fetch('/api/cms/users', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      }
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  // Purchase CRUD State
  interface PurchaseDetail {
    id: string;
    userId?: string;
    userEmail: string;
    userName: string;
    sessionId: string;
    sessionTitle: string;
    amount: number;
    currency: string;
    gateway: string;
    status: 'completed' | 'refunded' | 'initiated' | 'failed';
    createdAt: string;
  }

  const [purchases, setPurchases] = useState<PurchaseDetail[]>([]);
  const [isLoadingPurchases, setIsLoadingPurchases] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState<PurchaseDetail | null>(null);
  const [purchaseForm, setPurchaseForm] = useState({
    id: '',
    userId: '',
    userEmail: '',
    userName: '',
    sessionId: '',
    sessionTitle: '',
    amount: 49.99,
    currency: 'USD',
    gateway: 'stripe',
    status: 'completed' as 'completed' | 'refunded' | 'initiated' | 'failed',
  });

  // Gateway Settings State
  const [gatewaySettings, setGatewaySettings] = useState({
    email_provider: 'airo',
    resend_api_key: '',
    stripe_secret_key: '',
    stripe_webhook_secret: '',
    razorpay_key_id: '',
    razorpay_key_secret: '',
    paypal_client_id: '',
    paypal_client_secret: '',
  });
  const [showResendKey, setShowResendKey] = useState(false);
  const [isSavingGateways, setIsSavingGateways] = useState(false);

  const fetchGatewaySettings = async () => {
    try {
      const token = getUserToken();
      const res = await fetch('/api/cms/settings/gateways', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setGatewaySettings({
          email_provider: data.email_provider || 'airo',
          resend_api_key: data.resend_api_key || '',
          stripe_secret_key: data.stripe_secret_key || '',
          stripe_webhook_secret: data.stripe_webhook_secret || '',
          razorpay_key_id: data.razorpay_key_id || '',
          razorpay_key_secret: data.razorpay_key_secret || '',
          paypal_client_id: data.paypal_client_id || '',
          paypal_client_secret: data.paypal_client_secret || '',
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveGatewaySettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingGateways(true);
    try {
      const token = getUserToken();
      const res = await fetch('/api/cms/settings/gateways', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(gatewaySettings)
      });
      if (res.ok) {
        setToast({ type: 'success', message: 'Gateway keys saved securely!' });
      } else {
        setToast({ type: 'error', message: 'Failed to save gateway keys' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSavingGateways(false);
    }
  };

  const fetchPurchases = async () => {
    setIsLoadingPurchases(true);
    try {
      const token = getUserToken();
      const res = await fetch('/api/cms/purchases', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setPurchases(data);
      }
    } catch (err) {
      console.error('Error fetching purchases:', err);
    } finally {
      setIsLoadingPurchases(false);
    }
  };

  const handleSavePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = getUserToken();
      const res = await fetch('/api/cms/purchases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(purchaseForm)
      });
      if (res.ok) {
        setShowPurchaseModal(false);
        fetchPurchases();
      } else {
        const errData = await res.json();
        alert(errData.error || 'Failed to save purchase');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePurchase = async (id: string) => {
    if (!confirm('Are you sure you want to delete this purchase record?')) return;
    try {
      const token = getUserToken();
      const res = await fetch('/api/cms/purchases', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id })
      });
      if (res.ok) {
        fetchPurchases();
      } else {
        const errData = await res.json();
        alert(errData.error || 'Failed to delete purchase');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const openAddUser = () => {
    setEditingUser(null);
    setUserForm({ id: '', name: '', email: '', role: 'delegate', password: '' });
    setShowUserModal(true);
  };

  const openEditUser = (u: UserDetail) => {
    setEditingUser(u);
    setUserForm({ id: u.id, name: u.name, email: u.email, role: u.role, password: '' });
    setShowUserModal(true);
  };

  const deleteUser = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const token = getUserToken();
      const res = await fetch(`/api/cms/users?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        fetchUsers();
      } else {
        const errData = await res.json();
        alert(errData.error || 'Failed to delete user');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveUserForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = getUserToken();
      const isEdit = !!editingUser;
      const url = '/api/cms/users';
      const method = isEdit ? 'PUT' : 'POST';

      const body: any = {
        name: userForm.name,
        email: userForm.email,
        role: userForm.role,
      };
      if (isEdit) {
        body.id = userForm.id;
      }
      if (userForm.password && userForm.password.trim()) {
         body.password = userForm.password;
      }

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        setShowUserModal(false);
        fetchUsers();
      } else {
        const errData = await res.json();
        alert(errData.error || 'Failed to save user');
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (activeTab === 'manage-users') {
      fetchUsers();
    }
    if (activeTab === 'manage-purchases') {
      fetchPurchases();
    }
    if (activeTab === 'settings') {
      fetchGatewaySettings();
    }
  }, [activeTab]);

  useEffect(() => {
    if (cmsContent) {
      const isLocalEmptyFallback = !localContent || 
        (localContent.sessions?.length === 0 && cmsContent.sessions?.length > 0) ||
        (localContent.speakers?.length === 0 && cmsContent.speakers?.length > 0) ||
        (localContent.sponsors?.length === 0 && cmsContent.sponsors?.length > 0);

      if (isLocalEmptyFallback) {
        setLocalContent({
          ...FALLBACK_CMS_CONTENT,
          ...cmsContent,
        });
      }
    }
  }, [cmsContent, localContent]);

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

  const exportUsersToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users.map(u => ({
      ID: u.id,
      Name: u.name,
      Email: u.email,
      Role: u.role,
      'Joined Date': new Date(u.created_at).toLocaleDateString()
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "DeliverIQ_Users.xlsx");
  };

  const exportPurchasesToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(purchases.map(p => ({
      'Transaction ID': p.id,
      'User Name': p.userName || 'Anonymous',
      'User Email': p.userEmail,
      Session: p.sessionTitle,
      Amount: `${p.amount} ${p.currency.toUpperCase()}`,
      Gateway: p.gateway,
      Status: p.status,
      Date: new Date(p.createdAt).toLocaleString()
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Purchases");
    XLSX.writeFile(workbook, "DeliverIQ_Purchases.xlsx");
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

  // --- TOPIC CRUD HANDLERS ---
  const openAddTopic = () => {
    setEditingTopic(null);
    setTopicForm({
      id: '',
      title: '',
      description: '',
    });
    setShowTopicModal(true);
  };

  const openEditTopic = (topic: Topic) => {
    setEditingTopic(topic);
    setTopicForm({ ...topic });
    setShowTopicModal(true);
  };

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

  const handleSpeakerAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingSpeakerAvatar(true);
    try {
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result as string;
          const base64 = result.split(',')[1];
          resolve(base64);
        };
        reader.onerror = reject;
      });
      reader.readAsDataURL(file);
      const base64 = await base64Promise;

      const res = await fetch('/api/cms/upload', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getUserToken()}`
        },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type,
          base64,
          folder: 'speakers'
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Upload failed');
      }

      const data = await res.json();
      setSpeakerForm(prev => ({ ...prev, avatarUrl: data.url }));
    } catch (err: any) {
      console.error('Speaker avatar upload failed:', err);
      alert(`Failed to upload image: ${err.message || 'Unknown error'}`);
    } finally {
      setIsUploadingSpeakerAvatar(false);
      if (speakerAvatarInputRef.current) {
        speakerAvatarInputRef.current.value = '';
      }
    }
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
      sessionOgImageUrl: '',
      price: 0,
      replayPrice: 0,
      isFree: false,
      gateway: 'all',
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
      price: se.price || 0,
      replayPrice: se.replayPrice !== undefined ? se.replayPrice : 0,
      isFree: se.isFree || false,
      gateway: se.gateway || 'all',
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

  const saveTopicForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!localContent) return;

    const newTopic = { ...topicForm, id: topicForm.id || topicForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') };

    let updatedTopics = [...(localContent.topics || [])];
    if (editingTopic) {
      updatedTopics = updatedTopics.map(t => t.id === editingTopic.id ? newTopic : t);
    } else {
      updatedTopics.push(newTopic);
    }

    const newContent = { ...localContent, topics: updatedTopics };
    setLocalContent(newContent);
    handleSave(newContent);
    setShowTopicModal(false);
    setToast({ type: 'success', message: `Topic ${editingTopic ? 'updated' : 'added'} successfully.` });
  };

  const deleteTopic = (topicId: string) => {
    if (!localContent) return;
    if (confirm('Are you sure you want to delete this topic?')) {
      const updatedTopics = (localContent.topics || []).filter(t => t.id !== topicId);
      const newContent = { ...localContent, topics: updatedTopics };
      setLocalContent(newContent);
      handleSave(newContent);
      setToast({ type: 'success', message: 'Topic deleted.' });
    }
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
      price: Number(sessionForm.price) || 0,
      isFree: !!sessionForm.isFree,
      gateway: sessionForm.gateway || 'all',
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



  if (isLoading || !localContent) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-3 bg-background">
        <RefreshCw size={24} className="text-primary animate-spin" />
        <p className="text-xs text-muted-foreground">Loading CMS content config...</p>
      </div>
    );
  }

  return (
    <>
      <SeoHead />

      {/* Migration prompt modal — shown when switching a page to Visual mode */}
      {migrationState && (
        <MigrationPrompt
          canAutoMigrate={migrationState.canAutoMigrate}
          onAutoMigrate={handleMigrationAutoMigrate}
          onStartFresh={handleMigrationStartFresh}
          onCancel={handleMigrationCancel}
        />
      )}

      <div className="bg-background min-h-screen text-foreground antialiased">
        {/* Header bar */}
        <header className="border-b border-border bg-card px-6 py-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold bg-primary text-[#1A1D24] px-2.5 py-1 rounded tracking-wide">CMS</span>
            <h1 className="text-base font-bold tracking-tight hidden sm:block">DeliverIQ Content Manager</h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleClearCache}
              className="inline-flex items-center gap-2 px-4 py-2 border border-border text-muted-foreground rounded text-xs font-bold hover:text-foreground hover:bg-muted transition-all"
            >
              <RefreshCw size={14} /> Clear Cache
            </button>
            <button
              onClick={() => handleSave()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-[#1A1D24] rounded text-xs font-bold hover:brightness-110 transition-all hover:scale-[1.02]"
            >
              <Save size={14} /> Save Changes
            </button>
            <button
              onClick={handleLogout}
              className="p-2 text-muted-foreground hover:text-red-400 hover:bg-muted rounded transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-69px)]">
          {/* Sidebar tabs */}
          <nav className="w-full md:w-64 border-r border-border bg-card/40 p-4 flex flex-row md:flex-col gap-1 overflow-x-auto shrink-0">
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest px-4 py-2 hidden md:block select-none">Layout Pages</p>
            <button
              onClick={() => handleTabChange('home')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'home' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Layout size={14} />
              Homepage Layout
            </button>
            <button
              onClick={() => handleTabChange('sessions-html')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'sessions-html' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <BookOpen size={14} />
              Sessions Layout
            </button>
            <button
              onClick={() => handleTabChange('speakers-html')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'speakers-html' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <User size={14} />
              Speakers Layout
            </button>
            <button
              onClick={() => handleTabChange('sponsors-html')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'sponsors-html' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Award size={14} />
              Sponsors Layout
            </button>
            <button
              onClick={() => handleTabChange('contact-html')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'contact-html' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Mail size={14} />
              Contact Layout
            </button>
            <button
              onClick={() => handleTabChange('privacy-html')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'privacy-html' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Shield size={14} />
              Privacy Policy
            </button>
            <button
              onClick={() => handleTabChange('terms-html')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'terms-html' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <FileText size={14} />
              Terms of Use
            </button>
            <button
              onClick={() => handleTabChange('register-html')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'register-html' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <CheckSquare size={14} />
              Register Layout
            </button>
            <button
              onClick={() => handleTabChange('replays-html')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'replays-html' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Play size={14} />
              Replays Layout
            </button>
            <button
              onClick={() => handleTabChange('session-detail-html')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'session-detail-html' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <FileText size={14} />
              Session Detail Layout
            </button>
            <button
              onClick={() => handleTabChange('404-html')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === '404-html' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <AlertTriangle size={14} />
              404 Page Layout
            </button>
            <button
              onClick={() => handleTabChange('global-css')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'global-css' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Code size={14} />
              Global CSS Editor
            </button>
            
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest px-4 py-2 mt-4 hidden md:block select-none">Database Modules</p>
            <button
              onClick={() => handleTabChange('hero-banner')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'hero-banner' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Layout size={14} />
              Hero Banner Config
            </button>
            <button
              onClick={() => handleTabChange('manage-sessions')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'manage-sessions' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Calendar size={14} />
              Manage Sessions
            </button>
            <button
              onClick={() => handleTabChange('manage-topics')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'manage-topics' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <List size={14} />
              Manage Topics
            </button>
            <button
              onClick={() => handleTabChange('manage-speakers')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'manage-speakers' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <User size={14} />
              Manage Speakers
            </button>
            <button
              onClick={() => handleTabChange('manage-sponsors')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'manage-sponsors' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Award size={14} />
              Manage Sponsors
            </button>
            <button
              onClick={() => handleTabChange('manage-forms')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'manage-forms' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <CheckSquare size={14} />
              Manage Forms
            </button>
            <button
              onClick={() => handleTabChange('email-templates')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'email-templates' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Mail size={14} />
              Email Templates
            </button>
            <button
              onClick={() => handleTabChange('manage-users')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'manage-users' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Users size={14} />
              Manage Users
            </button>
            <button
              onClick={() => handleTabChange('manage-coupons')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'manage-coupons' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Award size={14} />
              Manage Coupons
            </button>
            <button
              onClick={() => handleTabChange('manage-purchases')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'manage-purchases' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <FileText size={14} />
              Purchase History
            </button>

            <div className="h-px bg-muted my-2 hidden md:block" />
            <button
              onClick={() => handleTabChange('global-content')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'global-content' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Globe size={14} />
              Global Content
            </button>
            <button
              onClick={() => handleTabChange('subscriptions')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'subscriptions' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <CreditCard size={14} />
              Subscriptions
            </button>
            <button
              onClick={() => handleTabChange('settings')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'settings' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Settings size={14} />
              Platform Settings
            </button>
            <button
              onClick={() => handleTabChange('json')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded text-xs font-semibold transition-all ${
                activeTab === 'json' ? 'bg-primary text-[#1A1D24]' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
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
                      <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                    </div>
                    <a href={`/${tab === 'home' ? '' : tab.replace('-html', '')}`} target="_blank" rel="noreferrer"
                      className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-primary border border-border hover:border-primary/30 px-3 py-1.5 rounded-sm transition-all">
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
                      <div className="w-[440px] shrink-0 border border-border rounded-sm overflow-hidden flex flex-col">
                        <LivePreviewPanel
                          page={pageKey}
                          content={localContent[contentKey]}
                        />
                      </div>
                    </div>
                  ) : (
                    <RichTextEditor
                      value={String(localContent?.[htmlKey] || FALLBACK_CMS_CONTENT[htmlKey] || '')}
                      onChange={(val) => handleUpdate(htmlKey as keyof CmsContent, val)}
                    />
                  )}

                  {/* Page Custom CSS section */}
                  <div className="mt-2 border border-border bg-card rounded-sm overflow-hidden">
                    <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-background/40">
                      <div className="flex items-center gap-2">
                        <Code size={14} className="text-primary" />
                        <h3 className="text-sm font-bold text-foreground">Custom Page CSS Override</h3>
                      </div>
                      <span className="text-[10px] text-muted-foreground italic">Injects a local &lt;style&gt; block on this page</span>
                    </div>
                    <div className="p-5 flex flex-col gap-2">
                      <textarea
                        rows={6}
                        value={String(localContent?.[TAB_TO_CSS_KEY[tab]] ?? '')}
                        onChange={(e) => handleUpdate(TAB_TO_CSS_KEY[tab], e.target.value)}
                        placeholder="/* Enter custom CSS rules to style this page (e.g. .register-form { border-color: red; }) */"
                        className="w-full font-mono text-xs bg-background border border-border rounded p-3 text-foreground placeholder-[#4A4D56] focus:outline-none focus:border-primary resize-y"
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            
            {/* ==================== HERO BANNER CONFIG TAB ==================== */}
            {activeTab === 'hero-banner' && localContent.heroBannerConfig && (
              <div className="flex flex-col gap-8">
                <div>
                  <h2 className="text-xl font-bold">Hero Banner Configuration</h2>
                  <p className="text-xs text-muted-foreground mt-1">Manage global default settings and per-page overrides for all hero banner sections.</p>
                </div>

                {/* Global Settings */}
                <div className="border border-border bg-card rounded-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-border bg-background/40">
                    <h3 className="text-sm font-bold">Global Settings</h3>
                  </div>
                  <div className="p-5 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Global Video Background (.mp4)</label>
                      <div className="flex items-center gap-4">
                        <div className="w-64 aspect-video bg-background border border-border rounded overflow-hidden flex-shrink-0">
                          {localContent.heroBannerConfig.globalVideoUrl ? (
                            <video src={localContent.heroBannerConfig.globalVideoUrl} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No video</div>
                          )}
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                          <input 
                            type="text" 
                            value={localContent.heroBannerConfig.globalVideoUrl}
                            onChange={(e) => {
                              const newConfig = { ...localContent.heroBannerConfig!, globalVideoUrl: e.target.value };
                              handleUpdate('heroBannerConfig', newConfig);
                            }}
                            className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                            placeholder="https://..."
                          />
                          <div className="relative overflow-hidden inline-block cursor-pointer">
                            <button type="button" disabled={isUploadingHeroVideo} className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-4 py-2 rounded font-semibold text-xs whitespace-nowrap transition-colors flex items-center gap-2">
                              {isUploadingHeroVideo ? <RefreshCw className="animate-spin" size={14} /> : <Plus size={14} />}
                              {isUploadingHeroVideo ? `Uploading... ${uploadProgressVideo}%` : 'Upload MP4 Video'}
                            </button>
                            <input 
                              type="file" 
                              accept="video/mp4"
                              disabled={isUploadingHeroVideo}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                setIsUploadingHeroVideo(true);
                                setUploadProgressVideo(0);
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onloadend = () => {
                                  const base64data = (reader.result as string).split(',')[1];
                                  const xhr = new XMLHttpRequest();
                                  xhr.open('POST', '/api/cms/upload', true);
                                  xhr.setRequestHeader('Content-Type', 'application/json');
                                  xhr.setRequestHeader('Authorization', `Bearer ${getUserToken()}`);
                                  
                                  xhr.upload.onprogress = (event) => {
                                    if (event.lengthComputable) {
                                      const percentComplete = Math.round((event.loaded / event.total) * 100);
                                      setUploadProgressVideo(percentComplete);
                                    }
                                  };
                                  
                                  xhr.onload = () => {
                                    setIsUploadingHeroVideo(false);
                                    if (xhr.status >= 200 && xhr.status < 300) {
                                      const { url } = JSON.parse(xhr.responseText);
                                      const newConfig = { ...localContent.heroBannerConfig!, globalVideoUrl: url };
                                      handleUpdate('heroBannerConfig', newConfig);
                                    } else {
                                      console.error('Upload failed');
                                      alert('Failed to upload video.');
                                    }
                                    e.target.value = '';
                                  };
                                  
                                  xhr.onerror = () => {
                                    setIsUploadingHeroVideo(false);
                                    console.error('Upload error');
                                    alert('Failed to upload video.');
                                    e.target.value = '';
                                  };
                                  
                                  xhr.send(JSON.stringify({ filename: file.name, contentType: file.type, base64: base64data, folder: 'hero-videos' }));
                                };
                              }}
                              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Global GIF Background (.gif)</label>
                      <div className="flex items-center gap-4">
                        <div className="w-64 aspect-video bg-background border border-border rounded overflow-hidden flex-shrink-0">
                          {localContent.heroBannerConfig.globalGifUrl ? (
                            <img src={localContent.heroBannerConfig.globalGifUrl} className="w-full h-full object-cover" alt="Hero GIF" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No GIF (Uses video if empty)</div>
                          )}
                        </div>
                        <div className="flex flex-col gap-2 flex-1">
                          <div className="flex items-center gap-2 w-full">
                          <input 
                            type="text" 
                            value={localContent.heroBannerConfig.globalGifUrl}
                            onChange={(e) => {
                              const newConfig = { ...localContent.heroBannerConfig!, globalGifUrl: e.target.value };
                              handleUpdate('heroBannerConfig', newConfig);
                            }}
                            className="w-full bg-background border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                            placeholder="https://..."
                          />
                          </div>
                          <button 
                            type="button" 
                            onClick={() => {
                              const newConfig = { ...localContent.heroBannerConfig!, globalGifUrl: '' };
                              handleUpdate('heroBannerConfig', newConfig);
                            }}
                            className="bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/20 rounded px-3 py-2 text-sm font-semibold transition-colors"
                          >
                            Clear
                          </button>
                          <div className="relative overflow-hidden inline-block cursor-pointer">
                            <button type="button" disabled={isUploadingHeroGif} className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-4 py-2 rounded font-semibold text-xs whitespace-nowrap transition-colors flex items-center gap-2">
                              {isUploadingHeroGif ? <RefreshCw className="animate-spin" size={14} /> : <Plus size={14} />}
                              {isUploadingHeroGif ? `Uploading... ${uploadProgressGif}%` : 'Upload GIF'}
                            </button>
                            <input 
                              type="file" 
                              accept="image/gif"
                              disabled={isUploadingHeroGif}
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                setIsUploadingHeroGif(true);
                                setUploadProgressGif(0);
                                const reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onloadend = () => {
                                  const base64data = (reader.result as string).split(',')[1];
                                  const xhr = new XMLHttpRequest();
                                  xhr.open('POST', '/api/cms/upload', true);
                                  xhr.setRequestHeader('Content-Type', 'application/json');
                                  xhr.setRequestHeader('Authorization', `Bearer ${getUserToken()}`);
                                  
                                  xhr.upload.onprogress = (event) => {
                                    if (event.lengthComputable) {
                                      const percentComplete = Math.round((event.loaded / event.total) * 100);
                                      setUploadProgressGif(percentComplete);
                                    }
                                  };
                                  
                                  xhr.onload = () => {
                                    setIsUploadingHeroGif(false);
                                    if (xhr.status >= 200 && xhr.status < 300) {
                                      const { url } = JSON.parse(xhr.responseText);
                                      const newConfig = { ...localContent.heroBannerConfig!, globalGifUrl: url };
                                      handleUpdate('heroBannerConfig', newConfig);
                                    } else {
                                      console.error('Upload failed');
                                      alert('Failed to upload GIF.');
                                    }
                                    e.target.value = '';
                                  };
                                  
                                  xhr.onerror = () => {
                                    setIsUploadingHeroGif(false);
                                    console.error('Upload error');
                                    alert('Failed to upload GIF.');
                                    e.target.value = '';
                                  };
                                  
                                  xhr.send(JSON.stringify({ filename: file.name, contentType: file.type, base64: base64data, folder: 'hero-videos' }));
                                };
                              }}
                              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Text Color</label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="color" 
                            value={localContent.heroBannerConfig.textColor}
                            onChange={(e) => {
                              const newConfig = { ...localContent.heroBannerConfig!, textColor: e.target.value };
                              handleUpdate('heroBannerConfig', newConfig);
                            }}
                            className="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0"
                          />
                          <input 
                            type="text" 
                            value={localContent.heroBannerConfig.textColor}
                            onChange={(e) => {
                              const newConfig = { ...localContent.heroBannerConfig!, textColor: e.target.value };
                              handleUpdate('heroBannerConfig', newConfig);
                            }}
                            className="flex-1 bg-background border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Button Color</label>
                        <div className="flex items-center gap-2">
                          <input 
                            type="color" 
                            value={localContent.heroBannerConfig.buttonColor}
                            onChange={(e) => {
                              const newConfig = { ...localContent.heroBannerConfig!, buttonColor: e.target.value };
                              handleUpdate('heroBannerConfig', newConfig);
                            }}
                            className="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0"
                          />
                          <input 
                            type="text" 
                            value={localContent.heroBannerConfig.buttonColor}
                            onChange={(e) => {
                              const newConfig = { ...localContent.heroBannerConfig!, buttonColor: e.target.value };
                              handleUpdate('heroBannerConfig', newConfig);
                            }}
                            className="flex-1 bg-background border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Alignment</label>
                        <select
                          value={localContent.heroBannerConfig.alignment}
                          onChange={(e) => {
                            const newConfig = { ...localContent.heroBannerConfig!, alignment: e.target.value as 'left' | 'center' | 'right' };
                            handleUpdate('heroBannerConfig', newConfig);
                          }}
                          className="bg-background border border-border rounded px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary w-full"
                        >
                          <option value="left">Left Align</option>
                          <option value="center">Center Align</option>
                          <option value="right">Right Align</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Per-Page Overrides */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-sm font-bold border-b border-border pb-2">Per-Page Overrides</h3>
                  
                  {['homepage', 'sessions', 'speakers', 'sponsors'].map((pageKey) => {
                    const pageConfig = localContent.heroBannerConfig!.pages[pageKey] || {};
                    return (
                      <div key={pageKey} className="border border-border bg-card rounded-sm overflow-hidden">
                        <div className="px-5 py-3 border-b border-border bg-background/40 flex items-center justify-between">
                          <h4 className="text-sm font-bold capitalize">{pageKey}</h4>
                        </div>
                        <div className="p-5 flex flex-col gap-5">
                          <div className="flex flex-col gap-2">
                            <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Text Content (HTML)</label>
                            <RichTextEditor
                              value={pageConfig.textContent || ''}
                              onChange={(val) => {
                                const newConfig = { ...localContent.heroBannerConfig! };
                                newConfig.pages = { ...newConfig.pages, [pageKey]: { ...pageConfig, textContent: val } };
                                handleUpdate('heroBannerConfig', newConfig);
                              }}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                              <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Video Override URL (Optional)</label>
                              <input 
                                type="text" 
                                value={pageConfig.videoUrl || ''}
                                onChange={(e) => {
                                  const newConfig = { ...localContent.heroBannerConfig! };
                                  newConfig.pages = { ...newConfig.pages, [pageKey]: { ...pageConfig, videoUrl: e.target.value } };
                                  handleUpdate('heroBannerConfig', newConfig);
                                }}
                                className="bg-background border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                                placeholder="Leave empty to use global video"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Alignment Override (Optional)</label>
                              <select
                                value={pageConfig.alignment || ''}
                                onChange={(e) => {
                                  const newConfig = { ...localContent.heroBannerConfig! };
                                  const val = e.target.value;
                                  if (val) {
                                    newConfig.pages = { ...newConfig.pages, [pageKey]: { ...pageConfig, alignment: val as 'left' | 'center' | 'right' } };
                                  } else {
                                    const rest = { ...pageConfig };
                                    delete rest.alignment;
                                    newConfig.pages = { ...newConfig.pages, [pageKey]: rest };
                                  }
                                  handleUpdate('heroBannerConfig', newConfig);
                                }}
                                className="bg-background border border-border rounded px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                              >
                                <option value="">-- Use Global Alignment --</option>
                                <option value="left">Left Align</option>
                                <option value="center">Center Align</option>
                                <option value="right">Right Align</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ==================== TOPICS CRUD TAB ==================== */}
            {activeTab === 'manage-topics' && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Manage "What to Expect" Topics</h2>
                    <p className="text-xs text-muted-foreground mt-1">Configure the topics that appear on the homepage and sessions page.</p>
                  </div>
                  <button
                    onClick={openAddTopic}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-[#1A1D24] rounded text-xs font-bold hover:brightness-110 transition-colors"
                  >
                    <Plus size={14} /> Add Topic
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(localContent.topics || []).map((t) => (
                    <div key={t.id} className="border border-border bg-card p-5 rounded-sm flex flex-col gap-2 hover:border-primary/30 transition-colors relative group">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-sm text-foreground truncate pr-16">{t.title}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t.description}</p>

                      {/* Floating actions */}
                      <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEditTopic(t)}
                          className="p-1.5 bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary/30 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={() => deleteTopic(t.id)}
                          className="p-1.5 bg-background border border-border text-muted-foreground hover:text-red-400 hover:border-red-950/40 rounded transition-colors"
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

            {/* ==================== SPEAKERS CRUD TAB ==================== */}
            {activeTab === 'manage-speakers' && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Manage Speakers Directory</h2>
                    <p className="text-xs text-muted-foreground mt-1">Configure and manage active speakers profiles linked to learning sessions.</p>
                  </div>
                  <button
                    onClick={openAddSpeaker}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-[#1A1D24] rounded text-xs font-bold hover:brightness-110 transition-colors"
                  >
                    <Plus size={14} /> Add Speaker
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {localContent.speakers.map((sp) => (
                    <div key={sp.id} className="border border-border bg-card p-5 rounded-sm flex items-start gap-4 hover:border-primary/30 transition-colors relative group">
                      <img
                        src={sp.avatarUrl}
                        alt={sp.name}
                        onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80'; }}
                        className="w-14 h-14 rounded-full object-cover bg-background border border-border shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <h3 className="font-bold text-sm text-foreground truncate">{sp.name}</h3>
                          <span className="text-[10px] font-mono text-muted-foreground uppercase bg-background px-1.5 py-0.5 rounded border border-border">{sp.id}</span>
                        </div>
                        <p className="text-xs text-primary font-medium mb-1 truncate">{sp.role}</p>
                        <p className="text-xs text-muted-foreground truncate mb-2">{sp.organisation}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed italic">{sp.bio}</p>
                      </div>

                      {/* Floating actions */}
                      <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEditSpeaker(sp)}
                          className="p-1.5 bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary/30 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={() => deleteSpeaker(sp.id)}
                          className="p-1.5 bg-background border border-border text-muted-foreground hover:text-red-400 hover:border-red-950/40 rounded transition-colors"
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
                    <p className="text-xs text-muted-foreground mt-1">Configure brand sponsorships, logo displays, websites, and partner tiers.</p>
                  </div>
                  <button
                    onClick={openAddSponsor}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-[#1A1D24] rounded text-xs font-bold hover:brightness-110 transition-colors"
                  >
                    <Plus size={14} /> Add Sponsor
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {localContent.sponsors.map((sp) => (
                    <div key={sp.id} className="border border-border bg-card p-5 rounded-sm flex flex-col items-center text-center hover:border-primary/30 transition-colors relative group">
                      <div className="w-16 h-16 rounded bg-background border border-border flex items-center justify-center p-2 mb-4 shrink-0 overflow-hidden">
                        <img
                          src={sp.logoUrl}
                          alt={sp.name}
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120'; }}
                          className="max-w-full max-h-full object-contain filter brightness-90"
                        />
                      </div>

                      <h3 className="font-bold text-sm text-foreground mb-1">{sp.name}</h3>
                      <span className="text-[10px] font-semibold text-primary border border-primary/20 px-2 py-0.5 rounded-sm uppercase tracking-wide mb-3">{sp.tier || 'Session Sponsor'}</span>
                      <a href={sp.websiteUrl} target="_blank" rel="noreferrer" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 hover:underline">
                        <Globe size={11} /> Visit Website
                      </a>

                      {/* Floating actions */}
                      <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEditSponsor(sp)}
                          className="p-1.5 bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary/30 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={() => deleteSponsor(sp.id)}
                          className="p-1.5 bg-background border border-border text-muted-foreground hover:text-red-400 hover:border-red-950/40 rounded transition-colors"
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
                    <p className="text-xs text-muted-foreground mt-1">Configure live learning modules, set publish statuses, and link presenters and sponsors.</p>
                  </div>
                  <button
                    onClick={openAddSession}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-[#1A1D24] rounded text-xs font-bold hover:brightness-110 transition-colors"
                  >
                    <Plus size={14} /> Add Session
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                  {localContent.sessions.map((se) => {
                    const linkedSpeakers = localContent.speakers.filter(s => se.speakerIds.includes(s.id));
                    const linkedSponsors = localContent.sponsors.filter(s => se.sponsorIds.includes(s.id));

                    return (
                      <div key={se.id} className="border border-border bg-card p-6 rounded-sm hover:border-primary/30 transition-colors relative group">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            se.status === 'published' ? 'bg-green-950/30 text-green-400 border border-green-900/30' : 'bg-yellow-950/30 text-yellow-500 border border-yellow-900/30'
                          }`}>
                            {se.status}
                          </span>
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-background text-primary border border-border">
                            {se.tag}
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground ml-auto mr-12">{se.id}</span>
                        </div>

                        <h3 className="font-bold text-lg text-foreground mb-2 leading-snug pr-12 group-hover:text-primary transition-colors">{se.title}</h3>
                        <p className="text-xs text-muted-foreground mb-5 leading-relaxed max-w-3xl">{se.description}</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border text-xs">
                          {/* Col 1: Schedule */}
                          <div className="flex flex-col gap-1.5 text-muted-foreground">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-foreground mb-1">Session Schedule</p>
                            <span className="flex items-center gap-1.5"><Calendar size={12} className="text-primary" /> {se.date}</span>
                            <span className="flex items-center gap-1.5"><Clock size={12} className="text-primary" /> {se.time} ({se.duration})</span>
                          </div>

                          {/* Col 2: Speakers */}
                          <div className="flex flex-col gap-1.5">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-foreground mb-1">Speakers ({linkedSpeakers.length})</p>
                            {linkedSpeakers.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {linkedSpeakers.map(sp => (
                                  <span key={sp.id} className="bg-background border border-border px-2 py-1 rounded text-[11px] text-foreground">{sp.name}</span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-muted-foreground italic">No speakers linked</span>
                            )}
                          </div>

                          {/* Col 3: Sponsors */}
                          <div className="flex flex-col gap-1.5">
                            <p className="text-[10px] font-bold uppercase tracking-wider text-foreground mb-1">Sponsors ({linkedSponsors.length})</p>
                            {linkedSponsors.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {linkedSponsors.map(sp => (
                                  <span key={sp.id} className="bg-background border border-border px-2 py-1 rounded text-[11px] text-foreground">{sp.name}</span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-muted-foreground italic">No sponsors linked</span>
                            )}
                          </div>
                        </div>

                        {/* Floating actions */}
                        <div className="absolute top-6 right-6 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <a
                            href={`/sessions/${se.id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 bg-background border border-border text-muted-foreground hover:text-green-400 hover:border-green-950/40 rounded transition-colors"
                            title="Preview public page"
                          >
                            <Eye size={12} />
                          </a>
                          <button
                            onClick={() => openEditSession(se)}
                            className="p-1.5 bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary/30 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button
                            onClick={() => deleteSession(se.id)}
                            className="p-1.5 bg-background border border-border text-muted-foreground hover:text-red-400 hover:border-red-950/40 rounded transition-colors"
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
                  <p className="text-xs text-muted-foreground mt-1">Configure form fields and settings for data collection.</p>
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

            {/* ==================== EMAIL TEMPLATE STUDIO TAB ==================== */}
            {activeTab === 'email-templates' && (
              <EmailTemplateStudio
                getUserToken={getUserToken}
                setToast={(t) => setToast({ type: t.type, message: t.message })}
              />
            )}

            {/* ==================== USERS CRUD TAB ==================== */}
            {activeTab === 'manage-coupons' && (
              <div className="flex-1 p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-69px)]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight text-foreground">Manage Discount Coupons</h2>
                    <p className="text-xs text-muted-foreground mt-1">Generate and manage promotional coupons, date ranges, and redemption limits.</p>
                  </div>
                  <button
                    onClick={openAddCoupon}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-[#1A1D24] rounded text-xs font-bold hover:brightness-110 transition-all hover:scale-[1.02]"
                  >
                    <Plus size={14} /> Add Coupon
                  </button>
                </div>

                <div className="border border-border bg-card/20 rounded-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-border text-muted-foreground uppercase tracking-wider text-[10px]">
                          <th className="p-4 font-semibold">Code</th>
                          <th className="p-4 font-semibold">Discount</th>
                          <th className="p-4 font-semibold">Applicable Session</th>
                          <th className="p-4 font-semibold">Validity Window</th>
                          <th className="p-4 font-semibold">Uses / Max</th>
                          <th className="p-4 font-semibold">Status</th>
                          <th className="p-4 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border text-foreground">
                        {(localContent?.coupons || []).map(coupon => {
                          const sessionItem = localContent?.sessions?.find(s => s.id === coupon.sessionId);
                          const sessionLabel = coupon.sessionId === 'all' || !coupon.sessionId ? 'All Sessions' : (sessionItem?.title || coupon.sessionId);

                          const hasStart = !!coupon.startDate;
                          const hasEnd = !!coupon.endDate;
                          const dateLabel = hasStart || hasEnd 
                            ? `${hasStart ? new Date(coupon.startDate!).toLocaleDateString() : 'Start'} - ${hasEnd ? new Date(coupon.endDate!).toLocaleDateString() : 'End'}`
                            : 'Always Valid';

                          return (
                            <tr key={coupon.id} className="hover:bg-muted/20 transition-colors">
                              <td className="p-4 font-bold text-primary">{coupon.code}</td>
                              <td className="p-4 font-semibold">{coupon.discountPercentage}% OFF</td>
                              <td className="p-4 text-muted-foreground font-medium max-w-[200px] truncate" title={sessionLabel}>
                                {sessionLabel}
                              </td>
                              <td className="p-4 text-muted-foreground">{dateLabel}</td>
                              <td className="p-4 font-bold text-slate-400">
                                {coupon.uses || 0} / {coupon.maxUses || '∞'}
                              </td>
                              <td className="p-4">
                                <span className={`px-2 py-0.5 rounded-sm border text-[10px] font-bold ${
                                  coupon.active !== false
                                    ? 'text-emerald-400 bg-emerald-950/20 border-emerald-900/30'
                                    : 'text-red-400 bg-red-950/20 border-red-900/30'
                                }`}>
                                  {coupon.active !== false ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td className="p-4 text-right">
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => openEditCoupon(coupon)}
                                    className="p-1.5 bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary/30 rounded transition-colors"
                                  >
                                    <Edit2 size={12} />
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (!window.confirm('Delete coupon ' + coupon.code + '?')) return;
                                      const updated = (localContent?.coupons || []).filter(c => c.id !== coupon.id);
                                      const newContent = { ...localContent, coupons: updated };
                                      setLocalContent(newContent);
                                      handleSave(newContent);
                                    }}
                                    className="p-1.5 bg-background border border-border text-muted-foreground hover:text-red-400 hover:border-red-950/40 rounded transition-colors"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                        {(!localContent?.coupons || localContent.coupons.length === 0) && (
                          <tr>
                            <td colSpan={7} className="p-8 text-center text-muted-foreground italic">No coupon codes created yet.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'manage-purchases' && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Manage Purchase History</h2>
                    <p className="text-xs text-muted-foreground mt-1">Review user payments, transactions, subscriptions, and event registration overrides.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={exportPurchasesToExcel}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-background border border-border text-foreground rounded text-xs font-bold hover:bg-muted transition-colors"
                    >
                      <Download size={14} /> Export
                    </button>
                    <button
                      onClick={() => {
                        setEditingPurchase(null);
                        setPurchaseForm({
                          id: '',
                          userId: '',
                          userEmail: '',
                          userName: '',
                          sessionId: localContent?.sessions?.[0]?.id || 'pro_yearly',
                          sessionTitle: localContent?.sessions?.[0]?.title || 'DeliverIQ Pro Yearly Subscription',
                          amount: 49.99,
                          currency: 'USD',
                          gateway: 'stripe',
                          status: 'completed'
                        });
                        setShowPurchaseModal(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-[#1A1D24] rounded text-xs font-bold hover:brightness-110 transition-colors"
                    >
                      <Plus size={14} /> Add Transaction
                    </button>
                  </div>
                </div>

                {isLoadingPurchases ? (
                  <div className="flex items-center justify-center py-20">
                    <RefreshCw size={20} className="text-primary animate-spin" />
                  </div>
                ) : (
                  <div className="border border-border bg-card/20 rounded-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="border-b border-border text-muted-foreground uppercase tracking-wider text-[10px]">
                            <th className="p-4 font-semibold">Transaction ID</th>
                            <th className="p-4 font-semibold">User</th>
                            <th className="p-4 font-semibold">Product</th>
                            <th className="p-4 font-semibold">Amount</th>
                            <th className="p-4 font-semibold">Gateway</th>
                            <th className="p-4 font-semibold">Status</th>
                            <th className="p-4 font-semibold">Date</th>
                            <th className="p-4 font-semibold text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border text-foreground">
                          {purchases.map(p => (
                            <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                              <td className="p-4 font-bold text-slate-400">{p.id}</td>
                              <td className="p-4">
                                <div className="font-bold">{p.userName}</div>
                                <div className="text-[10px] text-muted-foreground">{p.userEmail}</div>
                              </td>
                              <td className="p-4 font-semibold">{p.sessionTitle}</td>
                              <td className="p-4 font-bold text-primary">
                                {p.amount} {p.currency}
                              </td>
                              <td className="p-4 uppercase text-[10px]">{p.gateway}</td>
                              <td className="p-4">
                                <span className={`px-2 py-0.5 rounded-sm border text-[10px] font-bold ${
                                  p.status === 'completed' 
                                    ? 'text-emerald-400 bg-emerald-950/20 border-emerald-900/30'
                                    : p.status === 'initiated'
                                    ? 'text-amber-400 bg-amber-950/20 border-amber-900/30'
                                    : p.status === 'refunded'
                                    ? 'text-purple-400 bg-purple-950/20 border-purple-900/30'
                                    : 'text-red-400 bg-red-950/20 border-red-900/30'
                                }`}>
                                  {p.status}
                                </span>
                              </td>
                              <td className="p-4 text-muted-foreground">{new Date(p.createdAt).toLocaleDateString()}</td>
                              <td className="p-4 text-right">
                                <div className="flex justify-end gap-2">
                                  <button
                                    onClick={() => {
                                      setEditingPurchase(p);
                                      setPurchaseForm({
                                        id: p.id,
                                        userId: p.userId || '',
                                        userEmail: p.userEmail,
                                        userName: p.userName,
                                        sessionId: p.sessionId,
                                        sessionTitle: p.sessionTitle,
                                        amount: p.amount,
                                        currency: p.currency,
                                        gateway: p.gateway,
                                        status: p.status
                                      });
                                      setShowPurchaseModal(true);
                                    }}
                                    className="p-1.5 bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary/30 rounded transition-colors"
                                  >
                                    <Edit2 size={12} />
                                  </button>
                                  <button
                                    onClick={() => handleDeletePurchase(p.id)}
                                    className="p-1.5 bg-background border border-border text-muted-foreground hover:text-red-400 hover:border-red-950/40 rounded transition-colors"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                          {purchases.length === 0 && (
                            <tr>
                              <td colSpan={8} className="p-8 text-center text-muted-foreground italic">No transaction records found.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'manage-users' && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">Manage User Accounts</h2>
                    <p className="text-xs text-muted-foreground mt-1">Configure and manage registered users, administrators, and delegates.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={exportUsersToExcel}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-background border border-border text-foreground rounded text-xs font-bold hover:bg-muted transition-colors"
                    >
                      <Download size={14} /> Export
                    </button>
                    <button
                      onClick={openAddUser}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-[#1A1D24] rounded text-xs font-bold hover:brightness-110 transition-colors"
                    >
                      <Plus size={14} /> Add User
                    </button>
                  </div>
                </div>

                {isLoadingUsers ? (
                  <div className="flex items-center justify-center py-20">
                    <RefreshCw size={20} className="text-primary animate-spin" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {users.map((u) => (
                      <div key={u.id} className="border border-border bg-card p-5 rounded-sm flex items-start gap-4 hover:border-primary/30 transition-colors relative group">
                        <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center shrink-0">
                          <User size={18} className="text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <h3 className="font-bold text-sm text-foreground truncate">{u.name}</h3>
                            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border ${
                              u.role === 'admin' 
                                ? 'text-primary bg-primary/5 border-primary/20'
                                : 'text-muted-foreground bg-background border-border'
                            }`}>
                              {u.role}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate mb-2">{u.email}</p>
                          <p className="text-[10px] text-muted-foreground italic">Registered on {new Date(u.created_at).toLocaleDateString()}</p>
                        </div>

                        {/* Floating actions */}
                        <div className="absolute top-4 right-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => openEditUser(u)}
                            className="p-1.5 bg-background border border-border text-muted-foreground hover:text-primary hover:border-primary/30 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={12} />
                          </button>
                          <button
                            onClick={() => deleteUser(u.id)}
                            className="p-1.5 bg-background border border-border text-muted-foreground hover:text-red-400 hover:border-red-950/40 rounded transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'global-content' && localContent && (
              <GlobalContentEditor content={localContent} onChange={handleUpdate} />
            )}

            {activeTab === 'subscriptions' && localContent && (
              <SubscriptionConfigEditor 
                config={localContent.subscriptionConfig ?? FALLBACK_CMS_CONTENT.subscriptionConfig!} 
                onChange={(updated) => {
                  setLocalContent({ ...localContent, subscriptionConfig: updated });
                }} 
              />
            )}

            {/* ==================== SETTINGS TAB ==================== */}
            {activeTab === 'settings' && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-bold">Platform Settings</h2>
                  <p className="text-xs text-muted-foreground mt-1">Manage payment gateways and integration preferences.</p>
                </div>

                <div className="border border-border bg-card p-6 rounded-sm flex flex-col gap-6">
                  <h3 className="text-sm font-bold text-foreground border-b border-border pb-2 mb-2">Payment Gateways</h3>
                  
                  {/* Stripe */}
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div>
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Stripe Checkout</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Primary gateway for card payments.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={localContent.paymentConfig?.stripeActive ?? true}
                      onChange={(e) => {
                        const val = e.target.checked;
                        const curr = localContent.paymentConfig || { stripeActive: true, paypalActive: false, razorpayActive: false, currency: 'USD' };
                        handleUpdate('paymentConfig', { ...curr, stripeActive: val });
                      }}
                      className="rounded border-border text-primary focus:ring-0 w-4 h-4 bg-background"
                    />
                  </label>

                  {/* PayPal */}
                  <label className="flex items-center justify-between cursor-pointer group border-t border-border pt-6">
                    <div>
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">PayPal</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Allow users to checkout using their PayPal wallet.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={localContent.paymentConfig?.paypalActive ?? false}
                      onChange={(e) => {
                        const val = e.target.checked;
                        const curr = localContent.paymentConfig || { stripeActive: true, paypalActive: false, razorpayActive: false, currency: 'USD' };
                        handleUpdate('paymentConfig', { ...curr, paypalActive: val });
                      }}
                      className="rounded border-border text-primary focus:ring-0 w-4 h-4 bg-background"
                    />
                  </label>

                  {/* Razorpay */}
                  <label className="flex items-center justify-between cursor-pointer group border-t border-border pt-6">
                    <div>
                      <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">Razorpay</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Enable UPI, Cards, and Netbanking via Razorpay.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={localContent.paymentConfig?.razorpayActive ?? false}
                      onChange={(e) => {
                        const val = e.target.checked;
                        const curr = localContent.paymentConfig || { stripeActive: true, paypalActive: false, razorpayActive: false, currency: 'USD' };
                        handleUpdate('paymentConfig', { ...curr, razorpayActive: val });
                      }}
                      className="rounded border-border text-primary focus:ring-0 w-4 h-4 bg-background"
                    />
                  </label>
                  
                  <div className="border-t border-border pt-6 flex flex-col gap-2">
                    <label className="text-sm font-semibold text-foreground">Base Currency</label>
                    <select
                      value={localContent.paymentConfig?.currency ?? 'USD'}
                      onChange={(e) => {
                        const curr = localContent.paymentConfig || { stripeActive: true, paypalActive: false, razorpayActive: false, currency: 'USD' };
                        handleUpdate('paymentConfig', { ...curr, currency: e.target.value });
                      }}
                      className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none w-full max-w-xs text-sm"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="INR">INR (₹)</option>
                      <option value="AUD">AUD ($)</option>
                    </select>
                  </div>
                </div>

                <div className="border border-border bg-card p-6 rounded-sm flex flex-col gap-6">
                  <div className="border-b border-border pb-2 mb-2">
                    <h3 className="text-sm font-bold text-foreground">Payment & Email Gateway API Keys</h3>
                    <p className="text-[10px] text-muted-foreground mt-1 italic">
                      These settings and API keys are stored securely in the database and used by server-side routing logic.
                    </p>
                  </div>
                  
                  <form onSubmit={saveGatewaySettings} className="flex flex-col gap-6">
                    {/* Transactional Email Gateway */}
                    <div className="flex flex-col gap-3 pb-4 border-b border-border">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Transactional Email Gateway</h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                          Active: {gatewaySettings.email_provider.toUpperCase()}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-semibold text-muted-foreground uppercase">Active Email Provider</label>
                          <select
                            value={gatewaySettings.email_provider}
                            onChange={(e) => setGatewaySettings(prev => ({ ...prev, email_provider: e.target.value }))}
                            className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none focus:border-primary text-xs"
                          >
                            <option value="airo">Airo Gateway (127.0.0.1:2525 Loopback)</option>
                            <option value="resend">Resend API (https://api.resend.com)</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-semibold text-muted-foreground uppercase">Resend API Key</label>
                          <div className="relative flex items-center">
                            <input
                              type={showResendKey ? "text" : "password"}
                              value={gatewaySettings.resend_api_key}
                              onChange={(e) => setGatewaySettings(prev => ({ ...prev, resend_api_key: e.target.value }))}
                              placeholder="re_..."
                              className="w-full bg-background border border-border text-foreground px-3.5 py-2.5 pr-12 rounded focus:outline-none focus:border-primary text-xs font-mono"
                            />
                            <button
                              type="button"
                              onClick={() => setShowResendKey(!showResendKey)}
                              className="absolute right-2 text-[10px] uppercase font-bold text-muted-foreground hover:text-foreground px-1.5 py-1 rounded"
                            >
                              {showResendKey ? "Hide" : "Show"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stripe Keys */}
                    <div className="flex flex-col gap-3">
                      <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Stripe</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-semibold text-muted-foreground uppercase">Stripe Secret Key</label>
                          <input
                            type="password"
                            value={gatewaySettings.stripe_secret_key}
                            onChange={(e) => setGatewaySettings(prev => ({ ...prev, stripe_secret_key: e.target.value }))}
                            placeholder="sk_test_..."
                            className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none focus:border-primary text-xs"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-semibold text-muted-foreground uppercase">Stripe Webhook Secret</label>
                          <input
                            type="password"
                            value={gatewaySettings.stripe_webhook_secret}
                            onChange={(e) => setGatewaySettings(prev => ({ ...prev, stripe_webhook_secret: e.target.value }))}
                            placeholder="whsec_..."
                            className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none focus:border-primary text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* PayPal Keys */}
                    <div className="flex flex-col gap-3 pt-4 border-t border-border">
                      <h4 className="text-xs font-bold text-primary uppercase tracking-wider">PayPal</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-semibold text-muted-foreground uppercase">PayPal Client ID</label>
                          <input
                            type="text"
                            value={gatewaySettings.paypal_client_id}
                            onChange={(e) => setGatewaySettings(prev => ({ ...prev, paypal_client_id: e.target.value }))}
                            placeholder="Client ID..."
                            className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none focus:border-primary text-xs"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-semibold text-muted-foreground uppercase">PayPal Client Secret</label>
                          <input
                            type="password"
                            value={gatewaySettings.paypal_client_secret}
                            onChange={(e) => setGatewaySettings(prev => ({ ...prev, paypal_client_secret: e.target.value }))}
                            placeholder="Client Secret..."
                            className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none focus:border-primary text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Razorpay Keys */}
                    <div className="flex flex-col gap-3 pt-4 border-t border-border">
                      <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Razorpay</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-semibold text-muted-foreground uppercase">Razorpay Key ID</label>
                          <input
                            type="text"
                            value={gatewaySettings.razorpay_key_id}
                            onChange={(e) => setGatewaySettings(prev => ({ ...prev, razorpay_key_id: e.target.value }))}
                            placeholder="rzp_test_..."
                            className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none focus:border-primary text-xs"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-semibold text-muted-foreground uppercase">Razorpay Key Secret</label>
                          <input
                            type="password"
                            value={gatewaySettings.razorpay_key_secret}
                            onChange={(e) => setGatewaySettings(prev => ({ ...prev, razorpay_key_secret: e.target.value }))}
                            placeholder="Secret..."
                            className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none focus:border-primary text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        disabled={isSavingGateways}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-[#1A1D24] rounded text-xs font-bold hover:brightness-110 transition-all disabled:opacity-50"
                      >
                        {isSavingGateways ? 'Saving Keys...' : 'Save Gateway API Keys'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ==================== GLOBAL CSS TAB ==================== */}
            {activeTab === 'global-css' && (
              <div className="flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-bold">Global CSS stylesheet Editor</h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Directly view and edit global stylesheet style rules. These rules are injected site-wide (acting as overrides to the main bundle index-CGTjzYuQ.css).
                  </p>
                </div>

                <div className="border border-border bg-card rounded-sm overflow-hidden flex flex-col">
                  <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-background/40">
                    <div className="flex items-center gap-2">
                      <Code size={14} className="text-primary" />
                      <span className="text-xs font-mono font-bold text-foreground">index-CGTjzYuQ.css (Overrides)</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground italic">Persistent global custom styling</span>
                  </div>
                  <div className="p-5 flex flex-col gap-2">
                    <textarea
                      rows={24}
                      value={localContent?.globalCss || ''}
                      onChange={(e) => handleUpdate('globalCss', e.target.value)}
                      placeholder="/* Add global CSS rules here to override default site colors, layout margins, padding or fonts */"
                      className="w-full font-mono text-xs bg-background border border-border rounded p-3 text-foreground placeholder-[#4A4D56] focus:outline-none focus:border-primary resize-y leading-relaxed"
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
                  <p className="text-xs text-muted-foreground mt-1">Edit the raw JSON configuration of the platform.</p>
                </div>

                <div className="flex-1 flex flex-col gap-3">
                  <textarea
                    rows={25}
                    value={jsonCode}
                    onChange={(e) => handleJsonChange(e.target.value)}
                    className="w-full font-mono text-[11px] bg-background border border-border rounded p-4 text-foreground leading-normal focus:outline-none focus:border-primary resize-y"
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

      {/* ==================== TOPIC EDIT MODAL ==================== */}
      {showTopicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-card border border-border rounded-sm p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-foreground">{editingTopic ? 'Edit Topic' : 'Add New Topic'}</h3>
              <button type="button" onClick={() => setShowTopicModal(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={saveTopicForm} className="flex flex-col gap-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Topic Title *</label>
                <input
                  type="text"
                  required
                  value={topicForm.title}
                  onChange={(e) => setTopicForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Project Controls"
                  className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={topicForm.description}
                  onChange={(e) => setTopicForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="e.g. Schedule risk · EVM · Cost forecasting"
                  className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none focus:border-primary/50 transition-colors resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowTopicModal(false)}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-[#1A1D24] rounded font-bold hover:brightness-110 transition-colors"
                >
                  Save Topic
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== SPEAKER EDIT MODAL ==================== */}
      {showSpeakerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl bg-card border border-border rounded-sm p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-foreground mb-4">{editingSpeaker ? 'Edit Speaker Profile' : 'Add New Speaker'}</h3>
            <form onSubmit={saveSpeakerForm} className="flex flex-col gap-4 text-xs">
              {!editingSpeaker && (
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Speaker ID (Slug) *</label>
                  <input
                    type="text"
                    required
                    value={speakerForm.id}
                    onChange={(e) => setSpeakerForm(prev => ({ ...prev, id: e.target.value }))}
                    placeholder="e.g. john-doe"
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none focus:border-primary"
                  />
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={speakerForm.name}
                    onChange={(e) => setSpeakerForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. John Doe"
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={speakerForm.email}
                    onChange={(e) => setSpeakerForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="e.g. name@company.com"
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Role/Title *</label>
                  <input
                    type="text"
                    required
                    value={speakerForm.role}
                    onChange={(e) => setSpeakerForm(prev => ({ ...prev, role: e.target.value }))}
                    placeholder="e.g. PMO Director"
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Organisation *</label>
                  <input
                    type="text"
                    required
                    value={speakerForm.organisation}
                    onChange={(e) => setSpeakerForm(prev => ({ ...prev, organisation: e.target.value }))}
                    placeholder="e.g. Google"
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Avatar image path</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={speakerForm.avatarUrl}
                    onChange={(e) => setSpeakerForm(prev => ({ ...prev, avatarUrl: e.target.value }))}
                    placeholder="e.g. /airo-assets/images/speakers/john-doe"
                    className="flex-1 bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                  />
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={speakerAvatarInputRef}
                    onChange={handleSpeakerAvatarUpload}
                  />
                  <button
                    type="button"
                    onClick={() => speakerAvatarInputRef.current?.click()}
                    disabled={isUploadingSpeakerAvatar}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded border border-border font-medium hover:brightness-110 whitespace-nowrap disabled:opacity-50"
                  >
                    {isUploadingSpeakerAvatar ? 'Uploading...' : 'Browse Local Machine'}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Social profile URL (LinkedIn)</label>
                <input
                  type="text"
                  value={speakerForm.socialUrl}
                  onChange={(e) => setSpeakerForm(prev => ({ ...prev, socialUrl: e.target.value }))}
                  placeholder="e.g. https://linkedin.com/in/username"
                  className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Biography *</label>
                <textarea
                  rows={3}
                  required
                  value={speakerForm.bio}
                  onChange={(e) => setSpeakerForm(prev => ({ ...prev, bio: e.target.value }))}
                  placeholder="Speaker's professional background..."
                  className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowSpeakerModal(false)}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploadingSpeakerAvatar}
                  className="px-5 py-2 bg-primary text-[#1A1D24] rounded font-bold hover:brightness-110 disabled:opacity-50"
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
          <div className="w-full max-w-xl bg-card border border-border rounded-sm p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-foreground mb-4">{editingSponsor ? 'Edit Sponsor Profile' : 'Add New Sponsor'}</h3>
            <form onSubmit={saveSponsorForm} className="flex flex-col gap-4 text-xs">
              {!editingSponsor && (
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Sponsor ID (Slug) *</label>
                  <input
                    type="text"
                    required
                    value={sponsorForm.id}
                    onChange={(e) => setSponsorForm(prev => ({ ...prev, id: e.target.value }))}
                    placeholder="e.g. Microsoft"
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Sponsor / Brand Name *</label>
                <input
                  type="text"
                  required
                  value={sponsorForm.name}
                  onChange={(e) => setSponsorForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Microsoft"
                  className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Sponsor Website URL *</label>
                <input
                  type="url"
                  required
                  value={sponsorForm.websiteUrl}
                  onChange={(e) => setSponsorForm(prev => ({ ...prev, websiteUrl: e.target.value }))}
                  placeholder="e.g. https://brand.com"
                  className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Logo image path</label>
                <input
                  type="text"
                  value={sponsorForm.logoUrl}
                  onChange={(e) => setSponsorForm(prev => ({ ...prev, logoUrl: e.target.value }))}
                  placeholder="e.g. /airo-assets/images/logo/microsoft"
                  className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Sponsorship Tier</label>
                <select
                  value={sponsorForm.tier}
                  onChange={(e) => setSponsorForm(prev => ({ ...prev, tier: e.target.value as 'Session Sponsor' | 'Series Sponsor' | 'Platform Partner' }))}
                  className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                >
                  <option value="Session Sponsor">Session Sponsor</option>
                  <option value="Series Sponsor">Series Sponsor</option>
                  <option value="Platform Partner">Platform Partner</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowSponsorModal(false)}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-[#1A1D24] rounded font-bold hover:brightness-110"
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
          <div className="w-full max-w-xl bg-card border border-border rounded-sm p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-foreground">{editingSession ? 'Edit Learning Session' : 'Add New Session'}</h3>
              <button type="button" onClick={() => setShowSessionModal(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={saveSessionForm} className="flex flex-col gap-4 text-xs">
              {!editingSession && (
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Session ID (Slug) *</label>
                  <input
                    type="text"
                    required
                    value={sessionForm.id}
                    onChange={(e) => setSessionForm(prev => ({ ...prev, id: e.target.value }))}
                    placeholder="e.g. evm-ai"
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Session Title *</label>
                <input
                  type="text"
                  required
                  value={sessionForm.title}
                  onChange={(e) => setSessionForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. AI in Earned Value Management"
                  className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Live Price ({localContent?.paymentConfig?.currency || 'USD'}) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    disabled={sessionForm.isFree}
                    required={!sessionForm.isFree}
                    value={sessionForm.isFree ? 0 : (sessionForm.price || '')}
                    onChange={(e) => setSessionForm(prev => ({ ...prev, price: Number(e.target.value) }))}
                    placeholder="e.g. 49.99"
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none disabled:opacity-50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Replay Price ({localContent?.paymentConfig?.currency || 'USD'})</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    disabled={sessionForm.isFree}
                    value={sessionForm.isFree ? 0 : (sessionForm.replayPrice ?? '')}
                    onChange={(e) => setSessionForm(prev => ({ ...prev, replayPrice: Number(e.target.value) }))}
                    placeholder="e.g. 29.99"
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none disabled:opacity-50"
                  />
                </div>
                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="isFree"
                    checked={sessionForm.isFree || false}
                    onChange={(e) => setSessionForm(prev => ({ ...prev, isFree: e.target.checked, price: e.target.checked ? 0 : prev.price, replayPrice: e.target.checked ? 0 : prev.replayPrice }))}
                    className="rounded border-border text-primary focus:ring-0 focus:ring-offset-0 bg-card w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor="isFree" className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px] cursor-pointer">Free Session</label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Discipline Tag *</label>
                  <select
                    value={sessionForm.tag}
                    onChange={(e) => setSessionForm(prev => ({ ...prev, tag: e.target.value as 'Project Controls' | 'Project Management' | 'Delivery Leadership' }))}
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                  >
                    <option value="Project Controls">Project Controls</option>
                    <option value="Project Management">Project Management</option>
                    <option value="Delivery Leadership">Delivery Leadership</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Publish Status *</label>
                  <select
                    value={sessionForm.status}
                    onChange={(e) => setSessionForm(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' }))}
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                  >
                    <option value="draft">Draft (hidden)</option>
                    <option value="published">Published (live)</option>
                  </select>
                </div>
              </div>

              {/* Payment Routing Strategy */}
              <div className="border border-border bg-muted p-4 rounded-md flex flex-col gap-3 my-1">
                <label className="font-bold text-foreground text-xs uppercase tracking-wider flex items-center justify-between border-b border-border pb-2">
                  <span>💳 Payment Routing Strategy for this Session</span>
                  <span className="text-[10px] text-primary font-normal tracking-normal">Multi-Gateway Enabled</span>
                </label>
                <div className="flex flex-col gap-3">
                  <label className="flex items-start gap-2.5 cursor-pointer text-foreground hover:text-primary transition-colors">
                    <input
                      type="radio"
                      name="gatewayRouting"
                      checked={(sessionForm.gateway || 'all') === 'all'}
                      onChange={() => setSessionForm(prev => ({ ...prev, gateway: 'all' }))}
                      className="mt-0.5 rounded-full border-border text-primary focus:ring-0 bg-card w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <span className="font-bold text-xs">Multi-Gateway Payment Router (Dynamic Geo/Currency Switcher)</span>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">Automatically routes users between Stripe, Razorpay & PayPal based on location, currency, and active gateway availability.</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer text-foreground hover:text-primary transition-colors border-t border-border/50 pt-2.5">
                    <input
                      type="radio"
                      name="gatewayRouting"
                      checked={(sessionForm.gateway && sessionForm.gateway !== 'all') || false}
                      onChange={() => setSessionForm(prev => ({ ...prev, gateway: 'stripe' }))}
                      className="mt-0.5 rounded-full border-border text-primary focus:ring-0 bg-card w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <span className="font-bold text-xs">Force Specific Gateway (Override Dynamic Router)</span>
                      <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">Lock all checkouts for this individual session to a single payment gateway regardless of user region.</p>
                    </div>
                  </label>
                </div>

                {sessionForm.gateway && sessionForm.gateway !== 'all' && (
                  <div className="mt-1 pl-6 pt-2 border-t border-border/60 flex flex-col gap-2">
                    <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Select Gateway to Force *</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['stripe', 'razorpay', 'paypal'] as const).map((gw) => (
                        <button
                          key={gw}
                          type="button"
                          onClick={() => setSessionForm(prev => ({ ...prev, gateway: gw }))}
                          className={`px-3 py-2 rounded border text-xs font-bold uppercase transition-all ${
                            sessionForm.gateway === gw
                              ? 'bg-primary text-[#1A1D24] border-primary'
                              : 'bg-background text-muted-foreground border-border hover:text-white hover:border-primary/40'
                          }`}
                        >
                          {gw === 'stripe' ? 'Stripe (Card)' : gw === 'razorpay' ? 'Razorpay (UPI)' : 'PayPal'}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Date picker */}
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Date *</label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={sessionForm.date}
                    onChange={(e) => setSessionForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none focus:border-primary/50 transition-colors [color-scheme:dark] cursor-pointer"
                  />
                </div>
              </div>

              {/* Time + Timezone row */}
              <div className="grid grid-cols-5 gap-4">
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Time *</label>
                  <input
                    type="time"
                    required
                    value={sessionTimeRaw}
                    onChange={(e) => {
                      setSessionTimeRaw(e.target.value);
                      setSessionForm(prev => ({ ...prev, time: `${e.target.value} ${sessionTimezone}` }));
                    }}
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none focus:border-primary/50 transition-colors [color-scheme:dark] cursor-pointer"
                  />
                </div>
                <div className="col-span-2 flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Timezone *</label>
                  <select
                    value={sessionTimezone}
                    onChange={(e) => {
                      setSessionTimezone(e.target.value);
                      setSessionForm(prev => ({ ...prev, time: `${sessionTimeRaw} ${e.target.value}` }));
                    }}
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none focus:border-primary/50 transition-colors"
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
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Duration *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1 hour 30 mins"
                    value={sessionForm.duration}
                    onChange={(e) => setSessionForm(prev => ({ ...prev, duration: e.target.value }))}
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>

              {/* Preview of the stored time string */}
              {sessionTimeRaw && (
                <p className="text-[10px] text-muted-foreground -mt-2">
                  Stored as: <span className="text-primary font-mono">{sessionTimeRaw} {sessionTimezone}</span>
                </p>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Custom registration URL</label>
                  <input
                    type="text"
                    value={sessionForm.registrationUrl}
                    onChange={(e) => setSessionForm(prev => ({ ...prev, registrationUrl: e.target.value }))}
                    placeholder="e.g. https://event.com/123"
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Replay Video URL</label>
                  <input
                    type="text"
                    value={sessionForm.videoUrl}
                    onChange={(e) => setSessionForm(prev => ({ ...prev, videoUrl: e.target.value }))}
                    placeholder="e.g. /airo-assets/videos/replays/evm"
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                  />
                </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Session OG Image URL</label>
                    <input
                      type="text"
                      value={sessionForm.sessionOgImageUrl || ''}
                      onChange={(e) => setSessionForm(prev => ({ ...prev, sessionOgImageUrl: e.target.value }))}
                      placeholder="e.g. /airo-assets/images/og/session1.jpg"
                      className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                    />
                  </div>
              </div>

              {/* Speaker Select Checklist */}
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Link Presenting Speakers *</label>
                <div className="border border-border bg-background rounded p-3 flex flex-col gap-2 max-h-36 overflow-y-auto">
                  {localContent.speakers.map(sp => (
                    <label key={sp.id} className="flex items-center gap-2 cursor-pointer text-foreground hover:text-primary transition-colors">
                      <input
                        type="checkbox"
                        checked={sessionForm.speakerIds.includes(sp.id)}
                        onChange={() => toggleSessionRelation('speaker', sp.id)}
                        className="rounded border-border text-primary focus:ring-0 focus:ring-offset-0 bg-card w-3.5 h-3.5"
                      />
                      <span>{sp.name} ({sp.organisation})</span>
                    </label>
                  ))}
                  {localContent.speakers.length === 0 && <span className="text-muted-foreground italic">No speakers available. Add speakers first.</span>}
                </div>
              </div>

              {/* Sponsor Select Checklist */}
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Link Event Sponsors</label>
                <div className="border border-border bg-background rounded p-3 flex flex-col gap-2 max-h-36 overflow-y-auto">
                  {localContent.sponsors.map(sp => (
                    <label key={sp.id} className="flex items-center gap-2 cursor-pointer text-foreground hover:text-primary transition-colors">
                      <input
                        type="checkbox"
                        checked={sessionForm.sponsorIds.includes(sp.id)}
                        onChange={() => toggleSessionRelation('sponsor', sp.id)}
                        className="rounded border-border text-primary focus:ring-0 focus:ring-offset-0 bg-card w-3.5 h-3.5"
                      />
                      <span>{sp.name} ({sp.tier})</span>
                    </label>
                  ))}
                  {localContent.sponsors.length === 0 && <span className="text-muted-foreground italic">No sponsors available. Add sponsors first.</span>}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Session Description *</label>
                <textarea
                  rows={3}
                  required
                  value={sessionForm.description}
                  onChange={(e) => setSessionForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="What will attendees learn in this live session?..."
                  className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowSessionModal(false)}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-[#1A1D24] rounded font-bold hover:brightness-110"
                >
                  Save Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border w-full max-w-lg rounded-sm shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-background/40">
              <h3 className="text-base font-bold text-foreground">{editingUser ? 'Edit User Details' : 'Create User Account'}</h3>
            </div>
            
            <form onSubmit={saveUserForm} className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Name *</label>
                <input
                  type="text"
                  required
                  value={userForm.name}
                  onChange={(e) => setUserForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g. Jane Doe"
                  className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Email *</label>
                <input
                  type="email"
                  required
                  value={userForm.email}
                  onChange={(e) => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="e.g. jane@example.com"
                  className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Role *</label>
                <select
                  value={userForm.role}
                  onChange={(e) => setUserForm(prev => ({ ...prev, role: e.target.value as 'admin' | 'delegate' }))}
                  className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none focus:border-primary/50 transition-colors"
                >
                  <option value="delegate">Delegate (Learner)</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">
                  Password {editingUser ? '(Leave blank to keep unchanged)' : '*'}
                </label>
                <input
                  type="password"
                  required={!editingUser}
                  value={userForm.password}
                  onChange={(e) => setUserForm(prev => ({ ...prev, password: e.target.value }))}
                  placeholder={editingUser ? "••••••••" : "Minimum 8 characters with letter and number"}
                  className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowUserModal(false)}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-[#1A1D24] rounded font-bold hover:brightness-110"
                >
                  {editingUser ? 'Save User' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border w-full max-w-lg rounded-sm shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-background/40">
              <h3 className="text-base font-bold text-foreground">{editingPurchase ? 'Edit Transaction Details' : 'Record New Transaction'}</h3>
            </div>
            
            <form onSubmit={handleSavePurchase} className="p-6 flex flex-col gap-4">
              {editingPurchase && (
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Transaction ID (Read-only)</label>
                  <input
                    type="text"
                    disabled
                    value={purchaseForm.id}
                    className="bg-background border border-border text-muted-foreground px-3.5 py-2.5 rounded focus:outline-none opacity-60"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">User Name *</label>
                <input
                  type="text"
                  required
                  value={purchaseForm.userName}
                  onChange={(e) => setPurchaseForm(prev => ({ ...prev, userName: e.target.value }))}
                  placeholder="e.g. Kunal Sarkar"
                  className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">User Email *</label>
                <input
                  type="email"
                  required
                  value={purchaseForm.userEmail}
                  onChange={(e) => setPurchaseForm(prev => ({ ...prev, userEmail: e.target.value }))}
                  placeholder="e.g. kunal@gmail.com"
                  className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Product / Live Session *</label>
                <select
                  value={purchaseForm.sessionId}
                  onChange={(e) => {
                    const val = e.target.value;
                    const sessionItem = localContent?.sessions?.find(s => s.id === val);
                    setPurchaseForm(prev => ({
                      ...prev,
                      sessionId: val,
                      sessionTitle: val === 'pro_yearly' ? 'DeliverIQ Pro Yearly Subscription' : (sessionItem?.title || '')
                    }));
                  }}
                  className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none focus:border-primary/50 transition-colors"
                >
                  {localContent?.sessions?.map(s => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                  <option value="pro_yearly">DeliverIQ Pro Yearly Subscription</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Amount *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={purchaseForm.amount}
                    onChange={(e) => setPurchaseForm(prev => ({ ...prev, amount: Number(e.target.value) }))}
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Currency *</label>
                  <select
                    value={purchaseForm.currency}
                    onChange={(e) => setPurchaseForm(prev => ({ ...prev, currency: e.target.value }))}
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Gateway *</label>
                  <select
                    value={purchaseForm.gateway}
                    onChange={(e) => setPurchaseForm(prev => ({ ...prev, gateway: e.target.value }))}
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                  >
                    <option value="stripe">Stripe</option>
                    <option value="razorpay">Razorpay</option>
                    <option value="admin">Admin Override</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Status *</label>
                  <select
                    value={purchaseForm.status}
                    onChange={(e) => setPurchaseForm(prev => ({ ...prev, status: e.target.value as 'completed' | 'refunded' | 'initiated' | 'failed' }))}
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                  >
                    <option value="completed">Completed</option>
                    <option value="refunded">Refunded</option>
                    <option value="initiated">Initiated</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowPurchaseModal(false)}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-[#1A1D24] rounded font-bold hover:brightness-110"
                >
                  Save Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Coupon Modal */}
      {showCouponModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="bg-card border border-border w-full max-w-lg rounded-sm shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-background/40">
              <h3 className="text-base font-bold text-foreground">{editingCoupon ? 'Edit Coupon Settings' : 'Create New Coupon'}</h3>
            </div>
            
            <form onSubmit={saveCouponForm} className="p-6 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Coupon Code *</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingCoupon}
                    value={couponForm.code}
                    onChange={(e) => setCouponForm(prev => ({ ...prev, code: e.target.value.toUpperCase() }))}
                    placeholder="e.g. SAVE50"
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none disabled:opacity-50"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Discount Percentage *</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={couponForm.discountPercentage}
                    onChange={(e) => setCouponForm(prev => ({ ...prev, discountPercentage: Number(e.target.value) }))}
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Applicable Product / Session *</label>
                <select
                  value={couponForm.sessionId}
                  onChange={(e) => setCouponForm(prev => ({ ...prev, sessionId: e.target.value }))}
                  className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                >
                  <option value="all">All Sessions / Storewide</option>
                  {localContent?.sessions?.map(s => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Start Date</label>
                  <input
                    type="date"
                    value={couponForm.startDate}
                    onChange={(e) => setCouponForm(prev => ({ ...prev, startDate: e.target.value }))}
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">End Date</label>
                  <input
                    type="date"
                    value={couponForm.endDate}
                    onChange={(e) => setCouponForm(prev => ({ ...prev, endDate: e.target.value }))}
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Max Redemption Uses</label>
                  <input
                    type="number"
                    min="1"
                    value={couponForm.maxUses || ''}
                    onChange={(e) => setCouponForm(prev => ({ ...prev, maxUses: e.target.value ? Number(e.target.value) : undefined }))}
                    placeholder="e.g. 50 (Blank for Unlimited)"
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-semibold text-muted-foreground uppercase tracking-wider text-[10px]">Status Active *</label>
                  <select
                    value={couponForm.active ? 'true' : 'false'}
                    onChange={(e) => setCouponForm(prev => ({ ...prev, active: e.target.value === 'true' }))}
                    className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none"
                  >
                    <option value="true">Active (Valid)</option>
                    <option value="false">Inactive (Disabled)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowCouponModal(false)}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary text-[#1A1D24] rounded font-bold hover:brightness-110"
                >
                  Save Coupon
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
