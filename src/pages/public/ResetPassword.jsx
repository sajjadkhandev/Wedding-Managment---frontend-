import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    setSuccess(true);
  };

  return (
    <div className="py-5" style={{ background: 'linear-gradient(135deg, #FAF8F5 0%, #F5EFE6 100%)', minHeight: '80vh' }}>
      <div className="container py-4" style={{ maxWidth: '460px' }}>
        <div className="bg-white p-4 p-md-5 rounded-4 shadow-md border text-center">
          <h2 className="font-serif fw-bold text-dark mb-1">Set New Password</h2>
          <p className="text-muted small mb-4">Please choose a strong new password for your WedPlan account.</p>

          {success ? (
            <div className="p-4 bg-light rounded-3 border mb-3">
              <CheckCircle2 size={40} className="text-success mx-auto mb-2" />
              <h5 className="fw-bold text-dark mb-1">Password Updated!</h5>
              <p className="text-muted small mb-3">Your password has been successfully reset. You can now log in.</p>
              <Link to="/login" className="btn-gold d-inline-block">
                Sign In Now
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="text-start">
              <div className="mb-3">
                <label className="form-label small fw-bold">New Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <Lock size={16} className="text-muted" />
                  </span>
                  <input 
                    type="password" 
                    className="form-control bg-light border-start-0" 
                    placeholder="Minimum 6 characters"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label small fw-bold">Confirm New Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <Lock size={16} className="text-muted" />
                  </span>
                  <input 
                    type="password" 
                    className="form-control bg-light border-start-0" 
                    placeholder="Re-enter password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>

              <button type="submit" className="btn-gold w-100 py-2 fs-6 mb-3">
                Save New Password <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
