import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Public Pages
import Home from '../pages/public/Home';
import AboutUs from '../pages/public/AboutUs';
import BrowseServices from '../pages/public/BrowseServices';
import BrowseVendors from '../pages/public/BrowseVendors';
import WeddingVenues from '../pages/public/WeddingVenues';
import CarRental from '../pages/public/CarRental';
import Catering from '../pages/public/Catering';
import Photography from '../pages/public/Photography';
import Decoration from '../pages/public/Decoration';
import MakeupArtists from '../pages/public/MakeupArtists';
import WeddingDresses from '../pages/public/WeddingDresses';
import WeddingPlanners from '../pages/public/WeddingPlanners';
import WeddingPackages from '../pages/public/WeddingPackages';
import HowItWorks from '../pages/public/HowItWorks';
import ContactUs from '../pages/public/ContactUs';
import FAQ from '../pages/public/FAQ';
import PrivacyPolicy from '../pages/public/PrivacyPolicy';
import TermsConditions from '../pages/public/TermsConditions';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import ForgotPassword from '../pages/public/ForgotPassword';
import ResetPassword from '../pages/public/ResetPassword';
import VendorRegister from '../pages/public/VendorRegister';
import VendorDetails from '../pages/public/VendorDetails';
import PackageDetails from '../pages/public/PackageDetails';
import SearchResults from '../pages/public/SearchResults';
import BillInvoicePage from '../pages/public/BillInvoicePage';
import NotFound from '../pages/public/NotFound';

// Protected Portals
import CustomerDashboard from '../pages/customer/CustomerDashboard';
import VendorDashboard from '../pages/vendor/VendorDashboard';
import AdminDashboard from '../pages/admin/AdminDashboard';

// Scroll to top upon route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<PublicLayout />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<BrowseServices />} />
          <Route path="/vendors" element={<BrowseVendors />} />
          <Route path="/services/venues" element={<WeddingVenues />} />
          <Route path="/services/cars" element={<CarRental />} />
          <Route path="/services/catering" element={<Catering />} />
          <Route path="/services/photography" element={<Photography />} />
          <Route path="/services/decoration" element={<Decoration />} />
          <Route path="/services/makeup" element={<MakeupArtists />} />
          <Route path="/services/dresses" element={<WeddingDresses />} />
          <Route path="/services/planners" element={<WeddingPlanners />} />
          <Route path="/packages" element={<WeddingPackages />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/vendor-register" element={<VendorRegister />} />
          <Route path="/vendors/:id" element={<VendorDetails />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/bill/:id" element={<BillInvoicePage />} />
          <Route path="/invoice/:id" element={<BillInvoicePage />} />

          {/* Protected Customer Dashboard */}
          <Route
            path="/customer/dashboard"
            element={
              <ProtectedRoute allowedRoles={['customer', 'admin']}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Activity & Notifications Hub Route */}
          <Route
            path="/notifications"
            element={
              <ProtectedRoute allowedRoles={['customer', 'vendor', 'admin']}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Vendor Dashboard */}
          <Route
            path="/vendor/dashboard"
            element={
              <ProtectedRoute allowedRoles={['vendor']}>
                <VendorDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected Admin Dashboard */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 Catch All */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
