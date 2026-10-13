import React from 'react';
import { Star, Quote, MapPin } from 'lucide-react';
import { TESTIMONIALS } from '../../data/mockData';

const TestimonialsSection = () => {
  return (
    <section className="py-5" style={{ backgroundColor: 'var(--wp-bg-main)' }}>
      <div className="container py-3">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-gold sub-badge">Couples' Feedback</span>
          <h2>Loved by Pakistani Brides & Grooms</h2>
          <p>Real stories from couples who planned their Baraat, Walima, and Mehndi with WedPlan.</p>
          <div className="gold-divider"></div>
        </div>

        <div className="row g-4">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="col-12 col-md-4">
              <div className="wedding-card h-100 p-4 border-0 shadow-sm position-relative">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex text-warning">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <span className="badge bg-warning bg-opacity-25 text-dark small fw-semibold" style={{ fontSize: '0.7rem' }}>Verified Client</span>
                </div>

                <div className="text-warning opacity-25 mb-2">
                  <Quote size={28} />
                </div>

                <p className="text-muted small fst-italic mb-4 flex-grow-1">
                  "{t.comment}"
                </p>

                <div className="border-top pt-3 d-flex justify-content-between align-items-center mt-auto">
                  <div>
                    <h6 className="font-serif fw-bold text-dark mb-0">{t.couple}</h6>
                    <span className="text-muted small d-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
                      <MapPin size={11} className="text-danger" /> {t.city} • {t.weddingDate}
                    </span>
                  </div>
                  <span className="badge bg-light text-success border small">Verified Couple</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
