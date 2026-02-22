import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DemoStoreProvider } from './store/DemoStore';
import { AppProvider } from './store/AppContext';
import { Layout } from './components/Layout';

// Pages - Learner
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { LearnerTracksPage } from './pages/LearnerTracksPage';
import { TrackDetailPage } from './pages/TrackDetailPage';
import { SkillsProfilePage } from './pages/SkillsProfilePage';
import { LearnerInboxPage } from './pages/LearnerInboxPage';
import { CoursesPage } from './pages/CoursesPage';
import { JobCenterPage } from './pages/JobCenterPage';
import { MentorMePage } from './pages/MentorMePage';

// Pages - Company
import { LearnerDatabasePage } from './pages/LearnerDatabasePage';
import { RecruiterJobCenterPage } from './pages/RecruiterJobCenterPage';

// Pages - Other
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <DemoStoreProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            {/* Landing & Login */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Learner Routes */}
            <Route
              path="/learner/tracks"
              element={
                <Layout>
                  <LearnerTracksPage />
                </Layout>
              }
            />
            <Route
              path="/learner/tracks/:trackId"
              element={
                <Layout>
                  <TrackDetailPage />
                </Layout>
              }
            />
            <Route
              path="/learner/courses"
              element={
                <Layout>
                  <CoursesPage />
                </Layout>
              }
            />
            <Route
              path="/learner/job-center"
              element={
                <Layout>
                  <JobCenterPage />
                </Layout>
              }
            />
            <Route
              path="/learner/skills-profile"
              element={
                <Layout>
                  <SkillsProfilePage />
                </Layout>
              }
            />
            <Route
              path="/learner/mentor"
              element={
                <Layout>
                  <MentorMePage />
                </Layout>
              }
            />
            <Route
              path="/learner/profile"
              element={
                <Layout>
                  <SkillsProfilePage />
                </Layout>
              }
            />
            <Route
              path="/learner/inbox"
              element={
                <Layout>
                  <LearnerInboxPage />
                </Layout>
              }
            />

            {/* Company Routes */}
            <Route
              path="/company/learner-database"
              element={
                <Layout>
                  <LearnerDatabasePage />
                </Layout>
              }
            />
            <Route
              path="/company/job-center"
              element={
                <Layout>
                  <RecruiterJobCenterPage />
                </Layout>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </DemoStoreProvider>
  );
}

export default App;
