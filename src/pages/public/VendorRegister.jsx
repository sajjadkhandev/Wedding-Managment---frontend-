import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { Store, ShieldCheck, CheckCircle2, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { CITIES, CATEGORIES } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const VendorRegister = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    city: 'Lahore',
    category: 'venues',
    address: '',
    cnicOrNtn: '',
    agreeTerms: true
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { registerVendor } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await registerVendor(formData);
      if (res.success) {
        setSubmitted(true);
      }
    } catch (err) {
      setError(err.message || 'Vendor registration failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader 
        title="Register as a Wedding Vendor"
        subtitle="Grow your wedding business across Pakistan. Receive booking requests from thousands of couples with zero platform commissions during launch."
        badge="Vendor Onboarding"
        breadcrumbs={[{ label: 'Vendor Registration' }]}
      />

      <div className="container py-5" style={{ maxWidth: '780px' }}>
        <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border">
          {submitted ? (
            <div className="text-center py-4">
              <div className="bg-success bg-opacity-10 text-success p-3 rounded-circle d-inline-flex mb-3">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="font-serif fw-bold text-dark mb-2">Application Submitted!</h3>
              <p className="text-muted mb-4" style={{ maxWidth: '520px', margin: '0 auto' }}>
                Thank you for applying to join WedPlan, <strong>{formData.businessName}</strong>. Your vendor application in {formData.city} has been created with status <em>Pending Verification</em>.
              </p>
              <div className="d-flex justify-content-center gap-2">
                <Link to="/vendor/dashboard" className="btn-gold">
                  Explore Vendor Portal Preview
                </Link>
                <Link to="/" className="btn-outline-gold">
                  Return to Homepage
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-3 border mb-4">
                <ShieldCheck size={28} className="text-warning flex-shrink-0" />
                <div className="small text-muted">
                  <strong className="text-dark d-block">Admin Verification Policy:</strong>
                  All wedding listings are vetted manually to ensure quality and prevent double-booking before being published to customers.
                </div>
              </div>

              {error && (
                <div className="alert alert-danger d-flex align-items-center gap-2 p-2 small mb-3 text-start">
                  <AlertCircle size={16} className="flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Business / Brand Name *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required
                    placeholder="e.g. Royal Crystal Banquet"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Contact Person / Owner Name *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required
                    placeholder="e.g. Tariq Mehmood"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Business Email *</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    required
                    placeholder="business@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Mobile / WhatsApp *</label>
                  <input 
                    type="tel" 
                    className="form-control" 
                    required
                    placeholder="0300-1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Primary City in Pakistan *</label>
                  <select 
                    className="form-select"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  >
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Primary Business Category *</label>
                  <select 
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold">Physical Business Address *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required
                    placeholder="e.g. Plot 14, Main Gulberg Boulevard, Lahore"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold">CNIC or NTN Number (For Verification)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. 35201-xxxxxxx-x"
                    value={formData.cnicOrNtn}
                    onChange={(e) => setFormData({ ...formData, cnicOrNtn: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <div className="form-check small text-muted">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="vendorAgree" 
                      required
                      checked={formData.agreeTerms}
                      onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    />
                    <label className="form-check-label" htmlFor="vendorAgree">
                      I agree to uphold confirmed wedding reservations and adhere to WedPlan's <Link to="/terms" className="text-warning text-decoration-none">Vendor Code of Conduct</Link>.
                    </label>
                  </div>
                </div>

                <div className="col-12 pt-2">
                  <button 
                    type="submit" 
                    className="btn-gold w-100 py-2 fs-6 d-flex align-items-center justify-content-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="spinner-border spinner-border-sm" /> Submitting Application...
                      </>
                    ) : (
                      <>
                        <Store size={18} /> Submit Vendor Application
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorRegister;
