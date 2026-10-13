import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import { ShieldCheck, Heart, Sparkles, Award, MapPin } from 'lucide-react';

const AboutUs = () => {
  return (
    <div>
      <PageHeader 
        title="About WedPlan"
        subtitle="Empowering Pakistani families and couples to plan their dream wedding with absolute trust, verified vendors, and transparent prices."
        badge="Our Story & Mission"
        breadcrumbs={[{ label: 'About Us' }]}
      />

      <div className="container py-5">
        <div className="row g-5 align-items-center mb-5">
          <div className="col-12 col-lg-6">
            <span className="badge-gold mb-2">Our Genesis</span>
            <h2 className="font-serif fw-bold mb-3">Crafted for Pakistani Traditions</h2>
            <p className="text-muted">
              In Pakistan, weddings are not merely single-day events; they are magnificent celebrations uniting families across Mehndi nights, grand Baraat arrivals, and elegant Walima dinners.
            </p>
            <p className="text-muted">
              Yet, families historically faced immense stress: bargaining with dozens of unverified vendors, dealing with last-minute cancellations, and fearing double-booking of marriage halls.
            </p>
            <p className="text-muted">
              WedPlan was born to modernize this journey. We combine cutting-edge technology with Pakistani cultural hospitality, ensuring every couple can organize their celebrations with dignity and complete peace of mind.
            </p>
          </div>

          <div className="col-12 col-lg-6">
            <div className="position-relative rounded-4 overflow-hidden shadow-lg border">
              <img 
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80" 
                alt="Pakistani Wedding Reception"
                className="w-100 object-fit-cover"
                style={{ maxHeight: '420px' }}
              />
              <div 
                className="position-absolute bottom-0 start-0 m-3 p-3 bg-white rounded-3 shadow d-flex align-items-center gap-3 border"
                style={{ maxWidth: '320px' }}
              >
                <img 
                  src="/logo.jpg" 
                  alt="WedPlan" 
                  className="rounded-circle border"
                  style={{ width: '48px', height: '48px', objectFit: 'cover', borderColor: 'var(--wp-gold, #C5A059)' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div>
                  <h6 className="mb-0 fw-bold font-serif text-dark">WedPlan Pakistan</h6>
                  <span className="small text-muted" style={{ fontSize: '0.75rem' }}>Verified Wedding Marketplace</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="section-header mt-5">
          <span className="badge-gold sub-badge">Core Pillars</span>
          <h2>Our Guiding Principles</h2>
          <div className="gold-divider"></div>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-12 col-md-4">
            <div className="wedding-card p-4 h-100 text-center">
              <div className="feature-icon-box mx-auto">
                <ShieldCheck size={26} />
              </div>
              <h5 className="font-serif fw-bold">Strict Verification</h5>
              <p className="text-muted small mb-0">
                Every banquet hall, car rental provider, and catering kitchen undergoes manual validation before being published.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="wedding-card p-4 h-100 text-center">
              <div className="feature-icon-box mx-auto">
                <Award size={26} />
              </div>
              <h5 className="font-serif fw-bold">PKR Transparency</h5>
              <p className="text-muted small mb-0">
                All pricing is clearly displayed in Pakistani Rupees (PKR) with explicit inclusions, eliminating unexpected charges.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="wedding-card p-4 h-100 text-center">
              <div className="feature-icon-box mx-auto">
                <Heart size={26} />
              </div>
              <h5 className="font-serif fw-bold">Family-First Planning</h5>
              <p className="text-muted small mb-0">
                Multi-event tracking built right into our architecture so you can coordinate distinct dates for Mehndi, Baraat, and Walima.
              </p>
            </div>
          </div>
        </div>

        {/* Presence in Pakistan */}
        <div className="p-4 p-md-5 rounded-4 bg-light border text-center">
          <h3 className="font-serif fw-bold mb-3">Serving Couples Across Pakistan</h3>
          <p className="text-muted mx-auto mb-4" style={{ maxWidth: '600px' }}>
            Headquartered in Lahore, with regional vendor coordination teams operating in Karachi and Islamabad/Rawalpindi.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <span className="badge bg-white text-dark border px-3 py-2 fs-6">
              <MapPin size={16} className="text-danger inline me-1" /> Lahore (Main Office)
            </span>
            <span className="badge bg-white text-dark border px-3 py-2 fs-6">
              <MapPin size={16} className="text-danger inline me-1" /> Karachi (Regional Hub)
            </span>
            <span className="badge bg-white text-dark border px-3 py-2 fs-6">
              <MapPin size={16} className="text-danger inline me-1" /> Islamabad & Rawalpindi
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
