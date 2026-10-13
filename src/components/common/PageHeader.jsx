import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const PageHeader = ({ title, subtitle, badge, breadcrumbs = [] }) => {
  return (
    <div className="py-5" style={{ background: 'linear-gradient(135deg, #FAF8F5 0%, #F5EFE6 100%)', borderBottom: '1px solid var(--wp-border)' }}>
      <div className="container">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <nav aria-label="breadcrumb" className="mb-2">
            <ol className="breadcrumb small mb-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-muted text-decoration-none hover-gold">Home</Link>
              </li>
              {breadcrumbs.map((crumb, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return isLast ? (
                  <li key={idx} className="breadcrumb-item active text-dark fw-semibold" aria-current="page">
                    {crumb.label}
                  </li>
                ) : (
                  <li key={idx} className="breadcrumb-item">
                    <Link to={crumb.path} className="text-muted text-decoration-none hover-gold">{crumb.label}</Link>
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        {badge && <span className="badge-gold mb-2">{badge}</span>}
        <h1 className="font-serif fw-bold text-dark mb-2" style={{ fontSize: 'clamp(2rem, 1.5rem + 1.5vw, 2.75rem)' }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted fs-6 mb-0" style={{ maxWidth: '680px' }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
