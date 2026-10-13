import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Store, ArrowRight } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container py-3">
        <div className="row g-4">
          {/* Card 1: For Couples */}
          <div className="col-12 col-lg-6">
            <div 
              className="p-4 p-md-5 rounded-4 h-100 text-white position-relative overflow-hidden shadow-md"
              style={{ background: 'linear-gradient(135deg, #1E1D24 0%, #302E38 100%)' }}
            >
              <div className="position-relative" style={{ zIndex: 1 }}>
                <span className="badge bg-warning text-dark fw-bold mb-3 px-3 py-1">For Couples & Families</span>
                <h3 className="font-serif fw-bold mb-3">Begin Planning Your Wedding Free</h3>
                <p className="text-light text-opacity-80 mb-4" style={{ maxWidth: '440px' }}>
                  Create your wedding profile, organize your Mehndi, Baraat & Walima dates, and book verified vendors with guaranteed PKR pricing.
                </p>
                <Link to="/register" className="btn-gold py-2 px-4 fs-6">
                  Get Started for Free <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: For Vendors */}
          <div className="col-12 col-lg-6">
            <div 
              className="p-4 p-md-5 rounded-4 h-100 position-relative overflow-hidden shadow-md border"
              style={{ background: 'linear-gradient(135deg, #FAF8F5 0%, #F5EFE6 100%)' }}
            >
              <div className="position-relative" style={{ zIndex: 1 }}>
                <span className="badge-gold mb-3 px-3 py-1">For Wedding Businesses</span>
                <h3 className="font-serif fw-bold text-dark mb-3">List Your Wedding Services</h3>
                <p className="text-muted mb-4" style={{ maxWidth: '440px' }}>
                  Whether you manage a marriage hall, bridal car fleet, photography studio, or catering service, reach thousands of couples across Pakistan.
                </p>
                <Link to="/vendor-register" className="btn-outline-gold py-2 px-4 fs-6">
                  <Store size={18} /> Join as a Vendor <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
