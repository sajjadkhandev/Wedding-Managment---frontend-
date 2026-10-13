import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, User, Mail, Phone, Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { CITIES } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Lahore',
    password: '',
    confirmPassword: '',
    agreeTerms: true
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { registerCustomer } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await registerCustomer(formData);
      if (res.success) {
        navigate('/customer/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-5" style={{ background: 'linear-gradient(135deg, #FAF8F5 0%, #F5EFE6 100%)', minHeight: '85vh' }}>
      <div className="container py-4" style={{ maxWidth: '540px' }}>
        <div className="bg-white p-4 p-md-5 rounded-4 shadow-md border text-center">
          {/* Brand Emblem */}
          <div className="mb-3">
            <img 
              src="/logo.jpg" 
              alt="WedPlan Pakistan" 
              className="rounded-circle shadow-sm"
              style={{ 
                width: '68px', 
                height: '68px', 
                objectFit: 'cover', 
                border: '2px solid var(--wp-gold, #C5A059)',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(197, 160, 89, 0.25)'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>

          <h2 className="font-serif fw-bold text-dark mb-1">Create Customer Account</h2>
          <p className="text-muted small mb-4">Plan your dream wedding, track your budget in PKR, and book verified vendors</p>

          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2 p-2 small mb-3 text-start">
              <AlertCircle size={16} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="text-start">
            <div className="mb-3">
              <label className="form-label small fw-bold">Full Name *</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <User size={16} className="text-muted" />
                </span>
                <input 
                  type="text" 
                  className="form-control bg-light border-start-0" 
                  placeholder="e.g. Ayesha Malik"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            <div className="row g-2 mb-3">
              <div className="col-12 col-md-6">
                <label className="form-label small fw-bold">Email Address *</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <Mail size={16} className="text-muted" />
                  </span>
                  <input 
                    type="email" 
                    className="form-control bg-light border-start-0" 
                    placeholder="name@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label small fw-bold">Mobile Phone *</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <Phone size={16} className="text-muted" />
                  </span>
                  <input 
                    type="tel" 
                    className="form-control bg-light border-start-0" 
                    placeholder="0300-1234567"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">Your City in Pakistan</label>
              <select 
                className="form-select bg-light"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              >
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="row g-2 mb-3">
              <div className="col-12 col-md-6">
                <label className="form-label small fw-bold">Password *</label>
                <input 
                  type="password" 
                  className="form-control bg-light" 
                  placeholder="Minimum 6 characters"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label small fw-bold">Confirm Password *</label>
                <input 
                  type="password" 
                  className="form-control bg-light" 
                  placeholder="Re-enter password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </div>
            </div>

            <div className="form-check mb-4 small text-muted">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="termsCheck" 
                required
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
              />
              <label className="form-check-label" htmlFor="termsCheck">
                I agree to the <Link to="/terms" className="text-warning text-decoration-none">Terms & Conditions</Link> and <Link to="/privacy" className="text-warning text-decoration-none">Privacy Policy</Link>
              </label>
            </div>

            <button 
              type="submit" 
              className="btn-gold w-100 py-2 fs-6 mb-3 d-flex align-items-center justify-content-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="spinner-border spinner-border-sm" /> Registering...
                </>
              ) : (
                <>
                  Create Customer Account <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="text-center small text-muted border-top pt-3">
            <span>Already have an account? </span>
            <Link to="/login" className="text-warning fw-bold text-decoration-none">
              Sign In
            </Link>
            <span className="d-block mt-2">
              Are you a Wedding Business?{' '}
              <Link to="/vendor-register" className="text-dark fw-bold text-decoration-none">
                Register as Vendor
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
