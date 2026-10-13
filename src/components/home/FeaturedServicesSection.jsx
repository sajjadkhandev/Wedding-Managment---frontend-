import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Utensils, Star, CheckCircle, ArrowRight } from 'lucide-react';
import { FEATURED_PHOTOGRAPHY, FEATURED_CATERING } from '../../data/mockData';
import { formatPKR } from '../../utils/formatters';

const FeaturedServicesSection = () => {
  return (
    <section className="py-5" style={{ backgroundColor: 'var(--wp-bg-main)' }}>
      <div className="container py-3">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-gold sub-badge">Taste & Memories</span>
          <h2>Photography & Catering Specialists</h2>
          <p>Preserve your special moments with cinematic studios and delight your guests with authentic Pakistani feast menus.</p>
          <div className="gold-divider"></div>
        </div>

        <div className="row g-4">
          {/* Photographers Column */}
          <div className="col-12 col-lg-6">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="font-serif fw-bold mb-0 d-flex align-items-center gap-2">
                <Camera size={20} className="text-warning" /> Wedding Photography
              </h4>
              <Link to="/services/photography" className="text-warning fw-semibold small text-decoration-none">
                Browse All <ArrowRight size={13} />
              </Link>
            </div>

            <div className="d-flex flex-column gap-3">
              {FEATURED_PHOTOGRAPHY.map((photo) => (
                <div key={photo.id} className="wedding-card p-3 flex-row flex-wrap flex-sm-nowrap align-items-center gap-3">
                  <div className="rounded-3 overflow-hidden flex-shrink-0" style={{ width: '130px', height: '110px' }}>
                    <img src={photo.image} alt={photo.title} className="w-100 h-100 object-fit-cover" />
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <h6 className="font-serif fw-bold mb-1">{photo.title}</h6>
                      <span className="badge bg-warning text-dark small">★ {photo.rating}</span>
                    </div>
                    <span className="text-muted small d-block mb-2">{photo.city} • {photo.vendorName}</span>
                    <div className="d-flex flex-wrap gap-1 mb-2">
                      {photo.packageIncludes.slice(0, 2).map((item, idx) => (
                        <span key={idx} className="badge bg-light text-dark border small" style={{ fontSize: '0.72rem' }}>
                          ✓ {item}
                        </span>
                      ))}
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="price-tag small">
                        From <strong className="fs-6">{formatPKR(photo.pricePKR)}</strong>
                      </span>
                      <Link to={`/vendors/${photo.id}`} className="btn-outline-gold py-1 px-3 fs-6" style={{ fontSize: '0.78rem' }}>
                        View Studio
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Caterers Column */}
          <div className="col-12 col-lg-6">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="font-serif fw-bold mb-0 d-flex align-items-center gap-2">
                <Utensils size={20} className="text-warning" /> Royal Catering Menus
              </h4>
              <Link to="/services/catering" className="text-warning fw-semibold small text-decoration-none">
                Browse All <ArrowRight size={13} />
              </Link>
            </div>

            <div className="d-flex flex-column gap-3">
              {FEATURED_CATERING.map((cater) => (
                <div key={cater.id} className="wedding-card p-3 flex-row flex-wrap flex-sm-nowrap align-items-center gap-3">
                  <div className="rounded-3 overflow-hidden flex-shrink-0" style={{ width: '130px', height: '110px' }}>
                    <img src={cater.image} alt={cater.title} className="w-100 h-100 object-fit-cover" />
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <h6 className="font-serif fw-bold mb-1">{cater.title}</h6>
                      <span className="badge bg-warning text-dark small">★ {cater.rating}</span>
                    </div>
                    <span className="text-muted small d-block mb-2">{cater.city} • {cater.vendorName}</span>
                    <div className="d-flex flex-wrap gap-1 mb-2">
                      {cater.highlights.slice(0, 2).map((dish, idx) => (
                        <span key={idx} className="badge bg-light text-dark border small" style={{ fontSize: '0.72rem' }}>
                          • {dish}
                        </span>
                      ))}
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="price-tag small">
                        From <strong className="fs-6">{formatPKR(cater.pricePKR)}</strong> / head
                      </span>
                      <Link to={`/vendors/${cater.id}`} className="btn-outline-gold py-1 px-3 fs-6" style={{ fontSize: '0.78rem' }}>
                        View Menu
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServicesSection;
