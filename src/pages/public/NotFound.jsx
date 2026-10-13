import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="py-5 text-center my-auto" style={{ minHeight: '65vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '580px' }}>
        <div className="bg-warning text-dark p-3 rounded-circle d-inline-flex mb-3 shadow-sm" style={{ background: 'var(--wp-gold-gradient)' }}>
          <Sparkles size={32} color="#FFFFFF" />
        </div>
        <h1 className="font-serif fw-bold display-4 text-dark mb-2">404</h1>
        <h3 className="font-serif fw-bold text-dark mb-2">Page Not Found</h3>
        <p className="text-muted mb-4">
          The wedding page you are looking for does not exist or may have been relocated.
        </p>
        <div className="d-flex justify-content-center gap-2">
          <Link to="/" className="btn-gold">
            <Home size={16} /> Return to Homepage
          </Link>
          <Link to="/services" className="btn-outline-gold">
            Browse Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
