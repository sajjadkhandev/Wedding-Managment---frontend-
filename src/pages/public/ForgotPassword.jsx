import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="py-5" style={{ background: 'linear-gradient(135deg, #FAF8F5 0%, #F5EFE6 100%)', minHeight: '80vh' }}>
      <div className="container py-4" style={{ maxWidth: '460px' }}>
        <div className="bg-white p-4 p-md-5 rounded-4 shadow-md border text-center">
          <h2 className="font-serif fw-bold text-dark mb-1">Reset Password</h2>
          <p className="text-muted small mb-4">Enter your registered email address and we'll send you a password reset link.</p>

          {sent ? (
            <div className="p-3 bg-light rounded-3 border mb-4">
              <CheckCircle2 size={36} className="text-success mx-auto mb-2" />
              <h6 className="fw-bold text-dark mb-1">Reset Link Sent</h6>
              <p className="text-muted small mb-3">
                We have dispatched password recovery instructions to <strong>{email}</strong>.
              </p>
              <Link to="/reset-password" className="btn-outline-gold btn-sm d-inline-block">
                Simulate Reset Token Flow
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="text-start">
              <div className="mb-4">
                <label className="form-label small fw-bold">Email Address</label>
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

              <button type="submit" className="btn-gold w-100 py-2 fs-6 mb-3">
                <Send size={16} /> Send Reset Link
              </button>
            </form>
          )}

          <div className="text-center pt-2">
            <Link to="/login" className="text-muted text-decoration-none small hover-gold d-inline-flex align-items-center gap-1">
              <ArrowLeft size={14} /> Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
