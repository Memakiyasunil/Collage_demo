import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ReactLenis } from 'lenis/react';

// Layout and Core Components (Eagerly Loaded)
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingSocials from './components/FloatingSocials';
import SplashScreen from './components/SplashScreen';
import PageLoader from './components/PageLoader';

// Lazy Loaded Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Vision = lazy(() => import('./pages/Vision'));
const CoreTeam = lazy(() => import('./pages/CoreTeam'));
const Courses = lazy(() => import('./pages/Courses'));
const CourseDetail = lazy(() => import('./pages/CourseDetail'));
const Partners = lazy(() => import('./pages/Partners'));
const PartnerDetail = lazy(() => import('./pages/PartnerDetail'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const LabDetail = lazy(() => import('./pages/LabDetail'));
const Careers = lazy(() => import('./pages/Careers'));
const NewsBlogs = lazy(() => import('./pages/NewsBlogs'));
const Placements = lazy(() => import('./pages/Placements'));
const Hackathons = lazy(() => import('./pages/Hackathons'));
const InterviewQuestions = lazy(() => import('./pages/InterviewQuestions'));
const StudentReviews = lazy(() => import('./pages/StudentReviews'));
const Contact = lazy(() => import('./components/Contact')); // Note: it's in components
const DiplomaCourses = lazy(() => import('./pages/DiplomaCourses'));
const IndustryIntegratedPrograms = lazy(() => import('./pages/IndustryIntegratedPrograms'));
const OnlineLearningPrograms = lazy(() => import('./pages/OnlineLearningPrograms'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const DownloadBrochure = lazy(() => import('./pages/DownloadBrochure'));
const FAQs = lazy(() => import('./pages/FAQs'));
const Bootcamps = lazy(() => import('./pages/Bootcamps'));
const InternshipSupport = lazy(() => import('./pages/InternshipSupport'));
const CareerCounselling = lazy(() => import('./pages/CareerCounselling'));
const ResumeBuilding = lazy(() => import('./pages/ResumeBuilding'));
const MockInterviews = lazy(() => import('./pages/MockInterviews'));
const TechnicalCommunity = lazy(() => import('./pages/TechnicalCommunity'));

// Lazy Loaded Admin Pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
const AdminPages = lazy(() => import('./pages/admin/AdminPages'));

// Create wrappers to extract specific components from the AdminPages bundle
const AdminDashboard = lazy(() => import('./pages/admin/AdminPages').then(module => ({ default: module.AdminDashboard })));
const AdminCourses = lazy(() => import('./pages/admin/AdminPages').then(module => ({ default: module.AdminCourses })));
const AdminServices = lazy(() => import('./pages/admin/AdminPages').then(module => ({ default: module.AdminServices })));
const AdminFooter = lazy(() => import('./pages/admin/AdminPages').then(module => ({ default: module.AdminFooter })));
const AdminPartners = lazy(() => import('./pages/admin/AdminPages').then(module => ({ default: module.AdminPartners })));

// Simple Protected Route wrapper
const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Ensure page scrolls to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothTouch: true }}>
      <AnimatePresence>
        {showSplash && (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        )}
      </AnimatePresence>

      {/* Only show the main app layout when the splash screen is done */}
      {!showSplash && (
        <div className="min-h-screen flex flex-col">
          {!isAdminRoute && <Navbar />}

          <main className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/vision" element={<Vision />} />
                <Route path="/core-team" element={<CoreTeam />} />
                <Route path="/student-reviews" element={<StudentReviews />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/course/:courseId" element={<CourseDetail />} />
                <Route path="/news" element={<NewsBlogs />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/partner/:partnerId" element={<PartnerDetail />} />
                <Route path="/placements" element={<Placements />} />
                <Route path="/hackathons" element={<Hackathons />} />
                <Route path="/interview-questions" element={<InterviewQuestions />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/services/:serviceId" element={<ServiceDetail />} />
                <Route path="/all-services" element={<ServicesPage />} />
                <Route path="/labs/:labId" element={<LabDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/diploma-courses" element={<DiplomaCourses />} />
                <Route path="/industry-integrated-programs" element={<IndustryIntegratedPrograms />} />
                <Route path="/online-learning-programs" element={<OnlineLearningPrograms />} />
                <Route path="/case-studies" element={<CaseStudies />} />
                <Route path="/download-brochure" element={<DownloadBrochure />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/bootcamps" element={<Bootcamps />} />
                <Route path="/internship-support" element={<InternshipSupport />} />
                <Route path="/career-counselling" element={<CareerCounselling />} />
                <Route path="/resume-building" element={<ResumeBuilding />} />
                <Route path="/mock-interviews" element={<MockInterviews />} />
                <Route path="/technical-community" element={<TechnicalCommunity />} />

                {/* Admin Login Route */}
                <Route
                  path="/admin/login"
                  element={
                    isAuthenticated ? <Navigate to="/admin" replace /> : <AdminLogin onLogin={() => setIsAuthenticated(true)} />
                  }
                />

                {/* Protected Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <AdminDashboard onLogout={() => setIsAuthenticated(false)} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/courses"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <AdminCourses onLogout={() => setIsAuthenticated(false)} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/services"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <AdminServices onLogout={() => setIsAuthenticated(false)} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/footer"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <AdminFooter onLogout={() => setIsAuthenticated(false)} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/partners"
                  element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                      <AdminPartners onLogout={() => setIsAuthenticated(false)} />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </Suspense>
          </main>

          {!isAdminRoute && <FloatingSocials />}
          {!isAdminRoute && <Footer />}
        </div>
      )}
    </ReactLenis>
  );
}

export default App;
