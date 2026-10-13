import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { FEATURED_VENUES } from '../../data/mockData';
import { formatPKR } from '../../utils/formatters';

const FeaturedVenuesSection = () => {
  return (
    <section className="py-5" style={{ backgroundColor: 'var(--wp-bg-main)' }}>
      <div className="container py-3">
        {/* Section Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-4">
          <div>
            <span className="badge-gold mb-2">Grand Event Spaces</span>
            <h2 className="font-serif fw-bold mb-1">Featured Wedding Venues & Halls</h2>
            <p className="text-muted mb-0">Iconic banquets, marquees, and wedding lawns in Pakistan.</p>
          </div>
          <Link to="/services/venues" className="btn-outline-gold mt-3 mt-md-0">
            View All Venues <ArrowRight size={16} />
          </Link>
        </div>

        {/* Venues Grid */}
        <div className="row g-4">
          {FEATURED_VENUES.slice(0, 6).map((venue) => (
            <div key={venue.id} className="col-12 col-md-4">
              <div className="wedding-card h-100">
                <div className="card-media">
                  <img 
                    src={venue.image} 
                    alt={venue.title} 
                    loading="lazy" 
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge bg-dark bg-opacity-75 text-white px-2 py-1 small">
                      {venue.venueType}
                    </span>
                  </div>
                </div>

                <div className="p-3 p-lg-4 d-flex flex-column flex-grow-1">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge-city">
                      <MapPin size={12} className="text-danger" /> {venue.city}
                    </span>
                    <div className="d-flex align-items-center gap-1 small text-dark fw-bold">
                      <Star size={14} className="text-warning fill-warning" />
                      <span>{venue.rating}</span>
                      <span className="text-muted fw-normal">({venue.reviewsCount})</span>
                    </div>
                  </div>

                  <h5 className="font-serif fw-bold text-dark mb-2">
                    <Link to={`/vendors/${venue.id}`} className="text-decoration-none text-dark hover-gold">
                      {venue.title}
                    </Link>
                  </h5>

                  <p className="text-muted small mb-3 flex-grow-1">
                    {venue.description}
                  </p>

                  <div className="d-flex align-items-center gap-2 mb-3 text-secondary small">
                    <Users size={16} className="text-warning" />
                    <span>Capacity: <strong>Up to {venue.capacity} Guests</strong></span>
                  </div>

                  <div className="border-top pt-3 mt-auto d-flex justify-content-between align-items-center">
                    <div>
                      <span className="text-muted small d-block">Starting from</span>
                      <span className="price-tag">
                        <span className="amount">{formatPKR(venue.pricePKR)}</span>
                      </span>
                    </div>
                    <Link to={`/vendors/${venue.id}`} className="btn-gold py-1 px-3 fs-6">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVenuesSection;
