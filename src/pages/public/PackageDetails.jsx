import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { FEATURED_PACKAGES } from '../../data/mockData';
import { formatPKR } from '../../utils/formatters';
import { Gift, Check, ArrowRight, CheckCircle2, Send, MapPin, Calendar, Users, Receipt } from 'lucide-react';
import PaymentBillModal from '../../components/common/PaymentBillModal';

const PackageDetails = () => {
  const { id } = useParams();
  const pkg = FEATURED_PACKAGES.find(p => p.id === id) || FEATURED_PACKAGES[0];
  
  const [selectedDate, setSelectedDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [guestCount, setGuestCount] = useState(350);
  const [notes, setNotes] = useState('');
  const [requested, setRequested] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);

  const handleSelectPackage = (e) => {
    e.preventDefault();
    try {
      const saved = localStorage.getItem('wedplan_selected_packages');
      const list = saved ? JSON.parse(saved) : [];
      if (!list.includes(pkg.id)) {
        list.push(pkg.id);
        localStorage.setItem('wedplan_selected_packages', JSON.stringify(list));
      }
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }
    setRequested(true);
  };

  return (
    <div>
      <PageHeader 
        title={pkg.title}
        subtitle={`Multi-day Pakistani wedding combo package available in ${pkg.city}.`}
        badge="Wedding Bundle"
        breadcrumbs={[
          { label: 'Packages', path: '/packages' },
          { label: pkg.title }
        ]}
      />

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="rounded-4 overflow-hidden shadow-sm mb-4 border position-relative" style={{ aspectRatio: '16/9' }}>
              <img 
                src={pkg.image} 
                alt={pkg.title} 
                className="w-100 h-100 object-fit-cover" 
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="position-absolute top-0 start-0 m-3">
                <span className="badge bg-danger text-white fs-6 px-3 py-2 shadow-sm">
                  Savings: {formatPKR(pkg.savingsPKR)}
                </span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-4 shadow-sm border mb-4">
              <h4 className="font-serif fw-bold text-dark mb-3">Covered Wedding Events</h4>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {pkg.events.map(ev => (
                  <span key={ev} className="badge bg-warning text-dark px-3 py-2 fs-6 fw-bold">
                    {ev}
                  </span>
                ))}
              </div>

              <h4 className="font-serif fw-bold text-dark mb-3">All-Inclusive Inclusions</h4>
              <div className="d-flex flex-column gap-2">
                {pkg.inclusions.map((inc, idx) => (
                  <div key={idx} className="p-3 bg-light rounded-3 border d-flex align-items-center gap-2">
                    <CheckCircle2 size={18} className="text-success flex-shrink-0" />
                    <span className="small text-dark fw-semibold">{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="p-4 rounded-4 bg-white shadow-md border sticky-top" style={{ top: '90px' }}>
              <span className="text-muted small d-block">Total Bundle Price</span>
              <span className="price-tag mb-1 d-block">
                <span className="amount fs-3">{formatPKR(pkg.totalPricePKR)}</span>
              </span>
              <span className="text-muted small d-block mb-3">
                Advance (20%): <strong className="text-dark">{formatPKR(Math.round(pkg.totalPricePKR * 0.2))}</strong>
              </span>

              {requested ? (
                <div className="p-3 bg-success bg-opacity-10 rounded-3 text-center border border-success">
                  <CheckCircle2 size={36} className="text-success mx-auto mb-2" />
                  <h6 className="fw-bold text-success mb-1">Package Selected & Locked!</h6>
                  <p className="text-muted small mb-3">
                    Your request for <strong>{pkg.title}</strong> on <strong>{selectedDate}</strong> has been recorded. Our coordinator will contact you shortly.
                  </p>
                  <button 
                    type="button" 
                    onClick={() => setShowBillModal(true)} 
                    className="btn btn-gold btn-sm w-100 mb-2 d-flex align-items-center justify-content-center gap-1 shadow-sm"
                  >
                    <Receipt size={15} /> View Official Bill & Pay Deposit (20%)
                  </button>
                  <Link to="/customer/dashboard" className="btn btn-outline-dark btn-sm w-100 mb-2">
                    Open in Customer Dashboard
                  </Link>
                  <Link to="/packages" className="btn btn-link btn-sm text-muted">
                    ← Back to All Packages
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSelectPackage}>
                  <p className="text-muted small mb-3">
                    Includes dedicated coordination between banquet management, decorator, catering, and chauffeur team.
                  </p>

                  <div className="mb-3">
                    <label className="form-label small fw-bold text-muted mb-1">
                      <Calendar size={13} className="inline me-1 text-warning" /> Start / Wedding Date
                    </label>
                    <input 
                      type="date" 
                      className="form-control form-control-sm" 
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold text-muted mb-1">
                      <Users size={13} className="inline me-1 text-warning" /> Estimated Guests
                    </label>
                    <input 
                      type="number" 
                      min="50" 
                      max="2000" 
                      className="form-control form-control-sm" 
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold text-muted mb-1">Notes / Preferences</label>
                    <textarea 
                      className="form-control form-control-sm" 
                      rows="2" 
                      placeholder="Any specific venue or date flexibility..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-gold w-100 py-2 fs-6 d-flex align-items-center justify-content-center gap-2">
                    <CheckCircle2 size={16} /> Select & Lock This Package
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Official Package Bill & Payment Modal */}
      <PaymentBillModal 
        booking={{
          _id: `pkg-demo-${id}`,
          bookingNumber: `WP-PKG-${Math.floor(100000 + Math.random() * 900000)}`,
          title: pkg.title,
          totalAmountPKR: pkg.totalPricePKR,
          advanceDepositPKR: 0,
          eventName: pkg.events ? pkg.events.join(' + ') : '3-Day Combo',
          eventDate: selectedDate,
          guestCount: guestCount,
          status: 'pending'
        }}
        isOpen={showBillModal}
        onClose={() => setShowBillModal(false)}
      />
    </div>
  );
};

export default PackageDetails;
