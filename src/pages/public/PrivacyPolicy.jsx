import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import { ShieldCheck, Lock } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div>
      <PageHeader 
        title="Privacy Policy"
        subtitle="How WedPlan safeguards your personal information, wedding dates, and contact privacy across Pakistan."
        badge="Legal & Privacy"
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />

      <div className="container py-5" style={{ maxWidth: '820px' }}>
        <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border">
          <div className="d-flex align-items-center gap-2 text-warning mb-4">
            <Lock size={22} />
            <span className="fw-bold small text-uppercase">Your Privacy Matters to Us</span>
          </div>

          <h5 className="font-serif fw-bold mb-2">1. Information We Collect</h5>
          <p className="text-muted small mb-4">
            We collect personal information necessary to deliver wedding planning services in Pakistan, including your name, email, phone number, wedding dates (such as Mehndi, Baraat, Walima), venue preferences, and guest list contacts.
          </p>

          <h5 className="font-serif fw-bold mb-2">2. Guest Contact Data Protection</h5>
          <p className="text-muted small mb-4">
            Guest lists, RSVP responses, and contact numbers uploaded into customer wedding projects are strictly private. We do not sell, rent, or publicly expose customer guest lists to vendors or advertisers under any circumstances.
          </p>

          <h5 className="font-serif fw-bold mb-2">3. Vendor Information & Business Verification</h5>
          <p className="text-muted small mb-4">
            Vendors provide business registration documents, CNIC/NTN details, and commercial addresses for vetting. These verification records are strictly stored on secure servers and reviewed only by authorized WedPlan administrative staff.
          </p>

          <h5 className="font-serif fw-bold mb-2">4. Payment & Financial Data</h5>
          <p className="text-muted small mb-0">
            WedPlan never stores raw credit or debit card numbers, CVVs, or bank account PINs on our servers. All transaction records and receipts represent verified booking confirmations in PKR.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
