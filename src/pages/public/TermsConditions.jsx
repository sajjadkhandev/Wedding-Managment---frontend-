import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import { FileText } from 'lucide-react';

const TermsConditions = () => {
  return (
    <div>
      <PageHeader 
        title="Terms & Conditions"
        subtitle="Platform policies, booking terms, cancellation rules, and vendor codes of conduct."
        badge="Legal & Terms"
        breadcrumbs={[{ label: 'Terms & Conditions' }]}
      />

      <div className="container py-5" style={{ maxWidth: '820px' }}>
        <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border">
          <div className="d-flex align-items-center gap-2 text-warning mb-4">
            <FileText size={22} />
            <span className="fw-bold small text-uppercase">Terms of Platform Use</span>
          </div>

          <h5 className="font-serif fw-bold mb-2">1. The WedPlan Marketplace Agreement</h5>
          <p className="text-muted small mb-4">
            WedPlan provides a digital marketplace platform connecting wedding hosts and couples with independent Pakistani service providers. All contracts for wedding venue reservations, car rentals, photography, and catering represent agreements between the customer and the vendor.
          </p>

          <h5 className="font-serif fw-bold mb-2">2. Pricing & Currency Policy</h5>
          <p className="text-muted small mb-4">
            All prices on WedPlan are stated in Pakistani Rupees (PKR). Once a vendor accepts a customer booking request, the agreed package price snapshot is frozen and binding for that reservation.
          </p>

          <h5 className="font-serif fw-bold mb-2">3. Double-Booking & Date Reservations</h5>
          <p className="text-muted small mb-4">
            Vendors must maintain real-time calendar accuracy. Confirmed bookings locked through the platform must be honored. Vendors who breach confirmed dates without extraordinary force majeure face suspension and de-listing.
          </p>

          <h5 className="font-serif fw-bold mb-2">4. Cancellations & Disputes</h5>
          <p className="text-muted small mb-0">
            Cancellations are subject to the specific vendor policy published at the time of reservation. In the event of a dispute, WedPlan customer support assists in mediation based on recorded booking snapshots.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
