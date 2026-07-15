import React, { lazy, Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import Spinner from './components/Spinner';
import { ProtectedRoute } from './components/ProtectedRoute';

// ── Lazy-loaded page components ───────────────────────────────────────────
// Each page is split into its own JS chunk. The heavy admin panel (which
// carries Lexical + TipTap + RichTextEditor) is fully isolated so those
// editor libraries never ship to non-admin visitors.
const HomePage        = lazy(() => import('./pages/index'));
const SessionsPage    = lazy(() => import('./pages/sessions'));
const SessionDetailPage = lazy(() => import('./pages/session-detail'));
const ReplaysPage     = lazy(() => import('./pages/replays'));
const ForSpeakersPage = lazy(() => import('./pages/for-speakers'));
const ForSponsorsPage = lazy(() => import('./pages/for-sponsors'));
const ContactPage     = lazy(() => import('./pages/contact'));
const PrivacyPage     = lazy(() => import('./pages/privacy'));
const TermsPage       = lazy(() => import('./pages/terms'));
const RegisterPage    = lazy(() => import('./pages/register'));
const LoginPage       = lazy(() => import('./pages/login'));
const DashboardPage   = lazy(() => import('./pages/dashboard'));
const EmbedFormPage   = lazy(() => import('./pages/embed-form'));
const AdminPage       = lazy(() => import('./pages/admin')); // isolated — carries editor libs
const AdminLoginPage  = lazy(() => import('./pages/admin-login'));
const NotFoundPage    = lazy(() => import('./pages/_404'));

const PageFallback = () => (
  <div className="flex justify-center items-center min-h-[60vh]">
    <Spinner />
  </div>
);

function Lazy({ component: Component }: { component: React.ComponentType }) {
  return (
    <Suspense fallback={<PageFallback />}>
      <Component />
    </Suspense>
  );
}

export const routes: RouteObject[] = [
  { path: '/',              element: <Lazy component={HomePage} /> },
  { path: '/sessions',      element: <Lazy component={SessionsPage} /> },
  { path: '/sessions/:id',  element: <Lazy component={SessionDetailPage} /> },
  { path: '/replays',       element: <Lazy component={ReplaysPage} /> },
  { path: '/for-speakers',  element: <Lazy component={ForSpeakersPage} /> },
  { path: '/for-sponsors',  element: <Lazy component={ForSponsorsPage} /> },
  { path: '/contact',       element: <Lazy component={ContactPage} /> },
  { path: '/register',      element: <Lazy component={RegisterPage} /> },
  { path: '/login',         element: <Lazy component={LoginPage} /> },
  { path: '/signup',        element: <Lazy component={LoginPage} /> },
  { path: '/embed/form/:id',element: <Lazy component={EmbedFormPage} /> },
  { path: '/dashboard',     element: <ProtectedRoute><Lazy component={DashboardPage} /></ProtectedRoute> },
  { path: '/privacy',       element: <Lazy component={PrivacyPage} /> },
  { path: '/terms',         element: <Lazy component={TermsPage} /> },
  { path: '/admin/login',   element: <Lazy component={AdminLoginPage} /> },
  { path: '/admin',         element: <ProtectedRoute allowedRoles={['admin']}><Lazy component={AdminPage} /></ProtectedRoute> },
  { path: '*',              element: <Lazy component={NotFoundPage} /> },
];

export type Path =
  | '/'
  | '/sessions'
  | '/sessions/:id'
  | '/replays'
  | '/for-speakers'
  | '/for-sponsors'
  | '/contact'
  | '/register'
  | '/login'
  | '/signup'
  | '/dashboard'
  | '/privacy'
  | '/admin'
  | '/terms';

export type Params = Record<string, string | undefined>;
