import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import * as Sentry from '@sentry/react';
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { PortfolioIndex } from "./pages/PortfolioIndex";
import { PortfolioDetail } from "./pages/PortfolioDetail";
import { ProfilePage } from "./pages/ProfilePage";
import { ContentRepository } from "./lib/contentRepository";

import { ScrollToTop } from "./components/ui/ScrollToTop";
import { useMetrics } from "./hooks/useMetrics";

import { DocumentsPage } from "./pages/DocumentsPage";
import { LanguageProvider } from "./i18n/LanguageContext";

import StudyBotPage from './pages/admin/StudyBotPage';
import StudyPlanEditor from './pages/admin/StudyPlanEditor';
import { StudyFAQEditor } from "./pages/admin/StudyFAQEditor";
import { RoomSettingsEditor } from "./pages/admin/RoomSettingsEditor";
import { StudyGlobalSettingsEditor } from "./pages/admin/StudyGlobalSettingsEditor";
import { StudyScheduleEditor } from "./pages/admin/StudyScheduleEditor";
import { IntroductionEditor } from "./pages/admin/IntroductionEditor";
import { LoginPage } from './pages/admin/LoginPage';
import { DashboardPage } from "./pages/admin/DashboardPage";
import { GlobalEditor } from "./pages/admin/GlobalEditor";
import { HomeEditor } from "./pages/admin/HomeEditor";
import { ProfileEditor } from "./pages/admin/ProfileEditor";
import { PortfolioListPage } from "./pages/admin/PortfolioListPage";
import { PortfolioEditorPage } from "./pages/admin/PortfolioEditorPage";
import { DocumentsListPage } from "./pages/admin/DocumentsListPage";
import { DocumentsEditorPage } from "./pages/admin/DocumentsEditorPage";
import { BackupPage } from "./pages/admin/BackupPage";
import { ImportExportPage } from "./pages/admin/ImportExportPage";
import { RequireAuth } from "./components/auth/RequireAuth";
import { AdminThemeWrapper } from "./components/admin/AdminThemeWrapper";

// Study Section Imports - Lazy Loaded
const StudyLayout = lazy(() => import("./layouts/StudyLayout"));
import { StudyDashboard } from "./pages/study/StudyDashboard";
import { StudyPlanPage } from "./pages/study/StudyPlanPage";
import { StudyRecordsPage } from "./pages/study/StudyRecordsPage";
import { StudyRoomPage } from "./pages/study/StudyRoomPage";
import { StudyAboutPage } from "./pages/study/StudyAboutPage";
import { StudyFAQPage } from "./pages/study/StudyFAQPage";
import { StudyAuthPage } from "./pages/study/StudyAuthPage";
import { StudyProfilePage } from "./pages/study/StudyProfilePage";
import { StudyPrivacyPage } from "./pages/study/StudyPrivacyPage";
import { StudyTermsPage } from "./pages/study/StudyTermsPage";
import { StudyContactPage } from "./pages/study/StudyContactPage";
import { StudyIntroductionPage } from "./pages/study/StudyIntroductionPage";
import InboxPage from "./pages/admin/InboxPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { StudyThemeProvider } from './study/theme/StudyThemeContext';
import { StudyLanguageProvider } from './study/i18n/StudyLanguageContext';

type Page = 'home' | 'portfolio' | 'study' | 'profile' | 'documents';

function PublicApp() {
  const [page, setPage] = useState<Page>('home');
  const [detailId, setDetailId] = useState<string | null>(null);

  // Reset scroll on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page, detailId]);

  // Check version on mount
  useEffect(() => {
    ContentRepository.checkVersion();
  }, []);

  // Track visits
  useMetrics();

  const handleNavigate = (target: Page) => {
    setPage(target);
    setDetailId(null);
  };

  const handleViewDetail = (id: string) => {
    setDetailId(id);
  };

  const handleBackToPortfolio = () => {
    setDetailId(null);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-sky-200 selection:text-sky-900">
        <ScrollToTop />
        {!detailId && <Header onNavigate={handleNavigate} />}

        {detailId ? (
          <PortfolioDetail id={detailId} onBack={handleBackToPortfolio} />
        ) : page === 'home' ? (
          <HomePage onNavigate={handleNavigate} onViewDetail={handleViewDetail} />
        ) : page === 'portfolio' ? (
          <PortfolioIndex onNavigate={handleNavigate} onViewDetail={handleViewDetail} />
        ) : page === 'profile' ? (
          <ProfilePage />
        ) : page === 'documents' ? (
          <DocumentsPage />
        ) : (
          <Navigate to="/study/now" replace />
        )}
      </div>
    </LanguageProvider>
  );
}

import { GlobalErrorFallback } from "./components/GlobalErrorFallback";

function App() {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error, resetError }) => (
        <GlobalErrorFallback error={error as Error} resetError={resetError} />
      )}
      showDialog
    >
      <BrowserRouter>
        <Routes>
          {/* Admin Routes - With ThemeProvider */}
          <Route path="/admin/login" element={<AdminThemeWrapper><LoginPage /></AdminThemeWrapper>} />
          <Route
            path="/admin"
            element={
              <AdminThemeWrapper>
                <RequireAuth>
                  <DashboardPage />
                </RequireAuth>
              </AdminThemeWrapper>
            }
          />
          <Route
            path="/admin/global"
            element={
              <AdminThemeWrapper>
                <RequireAuth>
                  <GlobalEditor />
                </RequireAuth>
              </AdminThemeWrapper>
            }
          />
          <Route
            path="/admin/home"
            element={
              <AdminThemeWrapper>
                <RequireAuth>
                  <HomeEditor />
                </RequireAuth>
              </AdminThemeWrapper>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <AdminThemeWrapper>
                <RequireAuth>
                  <ProfileEditor />
                </RequireAuth>
              </AdminThemeWrapper>
            }
          />
          <Route
            path="/admin/portfolio"
            element={
              <AdminThemeWrapper>
                <RequireAuth>
                  <PortfolioListPage />
                </RequireAuth>
              </AdminThemeWrapper>
            }
          />
          <Route
            path="/admin/portfolio/:id"
            element={
              <AdminThemeWrapper>
                <RequireAuth>
                  <PortfolioEditorPage />
                </RequireAuth>
              </AdminThemeWrapper>
            }
          />

          <Route
            path="/admin/documents"
            element={
              <AdminThemeWrapper>
                <RequireAuth>
                  <DocumentsListPage />
                </RequireAuth>
              </AdminThemeWrapper>
            }
          />
          <Route
            path="/admin/documents/:id"
            element={
              <AdminThemeWrapper>
                <RequireAuth>
                  <DocumentsEditorPage />
                </RequireAuth>
              </AdminThemeWrapper>
            }
          />

          <Route
            path="/admin/backup"
            element={
              <AdminThemeWrapper>
                <RequireAuth>
                  <BackupPage />
                </RequireAuth>
              </AdminThemeWrapper>
            }
          />

          <Route
            path="/admin/study-bot"
            element={
              <AdminThemeWrapper>
                <RequireAuth>
                  <StudyBotPage />
                </RequireAuth>
              </AdminThemeWrapper>
            }
          />
          <Route
            path="/admin/room-settings"
            element={
              <AdminThemeWrapper>
                <RequireAuth>
                  <RoomSettingsEditor />
                </RequireAuth>
              </AdminThemeWrapper>
            }
          />
          <Route
            path="/admin/study-global-settings"
            element={
              <AdminThemeWrapper>
                <RequireAuth>
                  <StudyGlobalSettingsEditor />
                </RequireAuth>
              </AdminThemeWrapper>
            }
          />
          <Route
            path="/admin/study-plan"
            element={
              <AdminThemeWrapper>
                <RequireAuth>
                  <StudyPlanEditor />
                </RequireAuth>
              </AdminThemeWrapper>
            }
          />
          <Route
            path="/admin/inbox"
            element={
              <AdminThemeWrapper>
                <RequireAuth>
                  <InboxPage />
                </RequireAuth>
              </AdminThemeWrapper>
            }
          />
          <Route
            path="/admin/import-export"
            element={
              <AdminThemeWrapper>
                <RequireAuth>
                  <ImportExportPage />
                </RequireAuth>
              </AdminThemeWrapper>
            }
          />
          <Route
            path="/admin/faq-editor"
            element={
              <AdminThemeWrapper>
                <RequireAuth>
                  <StudyFAQEditor />
                </RequireAuth>
              </AdminThemeWrapper>
            }
          />
          <Route
            path="/admin/study-schedule"
            element={
              <AdminThemeWrapper>
                <RequireAuth>
                  <StudyScheduleEditor />
                </RequireAuth>
              </AdminThemeWrapper>
            }
          />
          <Route
            path="/admin/introduction-editor"
            element={
              <AdminThemeWrapper>
                <RequireAuth>
                  <IntroductionEditor />
                </RequireAuth>
              </AdminThemeWrapper>
            }
          />

          {/* Study Section Routes - Site within a Site */}
          {/* Lazy Loaded with Suspense - Providers wrap inside Suspense */}
          <Route
            path="/study"
            element={
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] text-[#3D3630]">Initializing Study Hub...</div>}>
                <StudyThemeProvider>
                  <StudyLanguageProvider>
                    <StudyLayout />
                  </StudyLanguageProvider>
                </StudyThemeProvider>
              </Suspense>
            }
          >
            <Route index element={<Navigate to="now" replace />} />
            <Route path="now" element={<StudyDashboard />} />
            <Route path="status" element={<Navigate to="now" replace />} />
            <Route path="records" element={<StudyRecordsPage />} />
            <Route path="plan" element={<StudyPlanPage />} />
            <Route path="room" element={<StudyRoomPage />} />
            <Route path="about" element={<StudyAboutPage />} />
            <Route path="faq" element={<StudyFAQPage />} />
            <Route path="auth" element={<StudyAuthPage />} />
            <Route path="profile" element={<StudyProfilePage />} />
            <Route path="privacy" element={<StudyPrivacyPage />} />
            <Route path="terms" element={<StudyTermsPage />} />
            <Route path="contact" element={<StudyContactPage />} />
            <Route path="introduction" element={<StudyIntroductionPage />} />
          </Route>

          {/* Privacy Policy Route */}
          <Route path="/privacy" element={<PrivacyPage />} />

          {/* Public Routes - Match everything else */}
          <Route path="/*" element={<PublicApp />} />
        </Routes>
      </BrowserRouter>
    </Sentry.ErrorBoundary>
  );
}

export default App;
