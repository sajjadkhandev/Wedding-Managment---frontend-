import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { Calendar, Search, ShieldCheck, CheckCircle2, Store, Users, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  return (
    <div>
      <PageHeader 
        title="How WedPlan Works"
        subtitle="A step-by-step transparent guide for couples planning their wedding and vendors listing their services in Pakistan."
        badge="Workflow Guide"
        breadcrumbs={[{ label: 'How It Works' }]}
      />

      <div className="container py-5">
        {/* Step-by-Step for Couples */}
        <div className="section-header">
          <span className="badge-gold sub-badge">For Couples & Families</span>
          <h2>Your Journey to a Stress-Free Wedding</h2>
          <p>Organize multiple celebration days with confidence and total price clarity.</p>
          <div className="gold-divider"></div>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-12 col-md-4">
            <div className="wedding-card h-100 p-4 border-0 shadow-sm text-center">
              <div className="feature-icon-box mx-auto">
                <Calendar size={26} />
              </div>
              <h5 className="font-serif fw-bold">1. Define Your Events</h5>
              <p className="text-muted small">
                Create your wedding dashboard and specify the dates and estimated budgets for your <strong>Mehndi, Baraat, Walima, and Nikah</strong>.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="wedding-card h-100 p-4 border-0 shadow-sm text-center">
              <div className="feature-icon-box mx-auto">
                <Search size={26} />
              </div>
              <h5 className="font-serif fw-bold">2. Select Verified Vendors</h5>
              <p className="text-muted small">
                Explore marriage halls, bridal cars, caterers, and studios. Filter by Pakistani city, capacity, and check real-time date availability.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="wedding-card h-100 p-4 border-0 shadow-sm text-center">
              <div className="feature-icon-box mx-auto">
                <ShieldCheck size={26} />
              </div>
              <h5 className="font-serif fw-bold">3. Lock Rates in PKR</h5>
              <p className="text-muted small">
                Submit booking requests with frozen price snapshots. Once accepted, track payments, assign guests, and manage your checklist.
              </p>
            </div>
          </div>
        </div>

        {/* Step-by-Step for Vendors */}
        <div className="p-4 p-lg-5 rounded-4 bg-light border mb-5">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-6">
              <span className="badge-gold mb-2">For Wedding Businesses</span>
              <h3 className="font-serif fw-bold mb-3">How Vendors Grow With WedPlan</h3>
              <ul className="list-unstyled d-flex flex-column gap-3 mb-4">
                <li className="d-flex align-items-start gap-2">
                  <CheckCircle2 size={18} className="text-success mt-1 flex-shrink-0" />
                  <span><strong>Register Free:</strong> Submit your business details, CNIC/NTN, and city coverage.</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <CheckCircle2 size={18} className="text-success mt-1 flex-shrink-0" />
                  <span><strong>Publish Services & Packages:</strong> Upload high-res photos, venue amenities, and per-event or per-head PKR pricing.</span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <CheckCircle2 size={18} className="text-success mt-1 flex-shrink-0" />
                  <span><strong>Receive Verified Inquiries:</strong> Accept or decline customer requests with automated calendar conflict checks.</span>
                </li>
              </ul>
              <Link to="/vendor-register" className="btn-gold py-2 px-4 fs-6">
                <Store size={18} /> Register as a Vendor Now
              </Link>
            </div>

            <div className="col-12 col-lg-6">
              <div className="rounded-4 overflow-hidden shadow border">
                <img 
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80" 
                  alt="Wedding Vendor Setup"
                  className="w-100 object-fit-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
