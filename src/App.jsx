import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PhoneFrame from './components/PhoneFrame';
import { useScrollToTop } from './hooks/useScrollToTop';

// Pages
import Home from './pages/Home';
import MeetDrAnna from './pages/MeetDrAnna';
import Therapies from './pages/Therapies';
import TherapyDetail from './pages/TherapyDetail';
import ADHDTesting from './pages/ADHDTesting';
import Resources from './pages/Resources';
import FAQs from './pages/FAQs';
import Contact from './pages/Contact';
import MenuPage from './pages/MenuPage';

function AppRoutes() {
  useScrollToTop();

  return (
    <Routes>
      {/* 5 Primary Bottom Navigation Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/therapies" element={<Therapies />} />
      <Route path="/adhd-testing" element={<ADHDTesting />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/contact" element={<Contact />} />

      {/* Detail & Secondary Screens */}
      <Route path="/meet-dr-anna" element={<MeetDrAnna />} />
      <Route path="/therapies/:slug" element={<TherapyDetail />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/menu" element={<MenuPage />} />

      {/* Direct website URL aliases / redirects */}
      <Route path="/mental-health-links" element={<Navigate to="/resources" replace />} />
      <Route path="/get-in-touch" element={<Navigate to="/contact" replace />} />
      <Route path="/individual-therapy-for-adults" element={<Navigate to="/therapies/individual-therapy-for-adults" replace />} />
      <Route path="/therapy-for-teenagers-adolescents" element={<Navigate to="/therapies/therapy-for-teenagers-adolescents" replace />} />
      <Route path="/adhd-therapy-executive-functioning-coaching" element={<Navigate to="/therapies/adhd-therapy-executive-functioning-coaching" replace />} />
      <Route path="/anxiety-stress" element={<Navigate to="/therapies/anxiety-stress" replace />} />
      <Route path="/trauma-informed-therapy" element={<Navigate to="/therapies/trauma-informed-therapy" replace />} />
      <Route path="/sleep-insomnia-support" element={<Navigate to="/therapies/sleep-insomnia-support" replace />} />
      <Route path="/relationship-interpersonal-therapy" element={<Navigate to="/therapies/relationship-interpersonal-therapy" replace />} />
      <Route path="/mindfulness-based-therapy" element={<Navigate to="/therapies/mindfulness-based-therapy" replace />} />
      <Route path="/burnout-life-transitions" element={<Navigate to="/therapies/burnout-life-transitions" replace />} />
      <Route path="/self-esteem-difficulties" element={<Navigate to="/therapies/self-esteem-difficulties" replace />} />
      <Route path="/anger-management" element={<Navigate to="/therapies/anger-management" replace />} />
      <Route path="/parent-support" element={<Navigate to="/therapies/parent-support" replace />} />

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <PhoneFrame>
        <AppRoutes />
      </PhoneFrame>
    </BrowserRouter>
  );
}
