import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { PathwaysPage } from './pages/PathwaysPage';
import { CertificationDetailPage } from './pages/CertificationDetailPage';
import { TalentPoolPage } from './pages/TalentPoolPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/provider/dashboard" element={<DashboardPage />} />
        <Route path="/provider/pathways" element={<PathwaysPage />} />
        <Route path="/provider/pathways/:id" element={<CertificationDetailPage />} />
        <Route path="/provider/talent" element={<TalentPoolPage />} />
        <Route path="/provider/analytics" element={<AnalyticsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
