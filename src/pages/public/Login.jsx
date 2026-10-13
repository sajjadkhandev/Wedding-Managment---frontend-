import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Mail, Lock, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleHint, setRoleHint] = useState('customer');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        if (from) {
          navigate(from, { replace: true });
        } else if (result.user.role === 'vendor') {
          navigate('/vendor/dashboard');
        } else if (result.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/customer/dashboard');
        }
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoFill = (role) => {
    setRoleHint(role);
    setError('');
    if (role === 'customer') {
      setEmail('zaid.customer@wedplan.pk');
      setPassword('Customer@123');
    } else if (role === 'vendor') {
      setEmail('royal.vendor@wedplan.pk');
      setPassword('Vendor@123');
    } else {
      setEmail('sajjadwazir4459@email.com');
      setPassword('Admin@123');
    }
  };

  return (
    <div className="py-5" style={{ background: 'linear-gradient(135deg, #FAF8F5 0%, #F5EFE6 100%)', minHeight: '80vh' }}>
      <div className="container py-4" style={{ maxWidth: '480px' }}>
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

          <h2 className="font-serif fw-bold text-dark mb-1">Welcome Back</h2>
          <p className="text-muted small mb-4">Sign in to manage your Pakistani wedding plans or vendor bookings</p>

          {/* Quick Demo Role Selector */}
          <div className="p-2 bg-light rounded-3 mb-4 border">
            <span className="d-block small text-muted fw-bold mb-1">Click to Fill Demo Credentials:</span>
            <div className="d-flex gap-1 justify-content-center">
              <button 
                type="button" 
                className={`btn btn-sm ${roleHint === 'customer' ? 'btn-dark' : 'btn-outline-secondary'}`}
                onClick={() => handleDemoFill('customer')}
                style={{ fontSize: '0.75rem' }}
              >
                Customer
              </button>
              <button 
                type="button" 
                className={`btn btn-sm ${roleHint === 'vendor' ? 'btn-dark' : 'btn-outline-secondary'}`}
                onClick={() => handleDemoFill('vendor')}
                style={{ fontSize: '0.75rem' }}
              >
                Vendor
              </button>
              <button 
                type="button" 
                className={`btn btn-sm ${roleHint === 'admin' ? 'btn-dark' : 'btn-outline-secondary'}`}
                onClick={() => handleDemoFill('admin')}
                style={{ fontSize: '0.75rem' }}
              >
                Admin
              </button>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger d-flex align-items-center gap-2 p-2 small mb-3 text-start">
              <AlertCircle size={16} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="text-start">
            <div className="mb-3">
              <label className="form-label small fw-bold text-dark">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <Mail size={16} className="text-muted" />
                </span>
                <input 
                  type="email" 
                  className="form-control bg-light border-start-0" 
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center">
                <label className="form-label small fw-bold text-dark mb-1">Password</label>
                <Link to="/forgot-password" className="text-warning small text-decoration-none fw-semibold">
                  Forgot Password?
                </Link>
              </div>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <Lock size={16} className="text-muted" />
                </span>
                <input 
                  type="password" 
                  className="form-control bg-light border-start-0" 
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn-gold w-100 py-2 fs-6 mb-3 d-flex align-items-center justify-content-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="spinner-border spinner-border-sm" /> Authenticating...
                </>
              ) : (
                <>
                  Sign In to WedPlan <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="text-center small text-muted border-top pt-3">
            <span>Don't have an account? </span>
            <Link to="/register" className="text-warning fw-bold text-decoration-none">
              Register as Customer
            </Link>
            <span className="d-block mt-2">
              Are you a Wedding Vendor?{' '}
              <Link to="/vendor-register" className="text-dark fw-bold text-decoration-none">
                Register Your Business
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
