import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const PublicLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="main-content flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
