import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Check, ArrowRight, Sparkles } from 'lucide-react';
import { FEATURED_PACKAGES } from '../../data/mockData';
import { formatPKR } from '../../utils/formatters';

const RecommendedPackagesSection = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container py-3">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-gold sub-badge">All-Inclusive Bundles</span>
          <h2>Recommended Multi-Day Wedding Packages</h2>
          <p>Save time and money with pre-negotiated bundles covering venue, decor, photography, and bridal transport.</p>
          <div className="gold-divider"></div>
        </div>

        <div className="row g-4">
          {FEATURED_PACKAGES.slice(0, 4).map((pkg) => (
            <div key={pkg.id} className="col-12 col-md-6">
              <div className="wedding-card h-100 overflow-hidden border-2" style={{ borderColor: 'var(--wp-border-gold)' }}>
                <div className="row g-0 h-100">
                  <div className="col-12 col-sm-5 card-media h-100">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title} 
                      className="w-100 h-100 object-fit-cover" 
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                    <div className="position-absolute top-0 start-0 m-2">
                      <span className="badge bg-danger text-white px-2 py-1 small">
                        Save {formatPKR(pkg.savingsPKR)}
                      </span>
                    </div>
                  </div>

                  <div className="col-12 col-sm-7 p-4 d-flex flex-column">
                    <div className="d-flex flex-wrap gap-1 mb-2">
                      {pkg.events.map((evt) => (
                        <span key={evt} className="badge bg-warning bg-opacity-25 text-dark small fw-bold">
                          {evt}
                        </span>
                      ))}
                      <span className="badge bg-light text-secondary border small">{pkg.city}</span>
                    </div>

                    <h5 className="font-serif fw-bold text-dark mb-2">{pkg.title}</h5>

                    <ul className="list-unstyled small text-muted mb-3 flex-grow-1">
                      {pkg.inclusions.map((inc, idx) => (
                        <li key={idx} className="d-flex align-items-start gap-2 mb-1">
                          <Check size={14} className="text-success mt-1 flex-shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="border-top pt-3 d-flex justify-content-between align-items-center">
                      <div>
                        <span className="text-muted small d-block">Package Total</span>
                        <span className="price-tag">
                          <span className="amount fs-5">{formatPKR(pkg.totalPricePKR)}</span>
                        </span>
                      </div>
                      <Link to={`/packages/${pkg.id}`} className="btn-gold py-1 px-3 fs-6">
                        View Bundle
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4 pt-2">
          <Link to="/packages" className="btn-outline-gold">
            Browse All Wedding Packages <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecommendedPackagesSection;
