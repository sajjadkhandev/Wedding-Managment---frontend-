import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Car, 
  Utensils, 
  Camera, 
  Sparkles, 
  Palette, 
  Shirt, 
  CalendarCheck,
  ArrowRight
} from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';

const iconMap = {
  Building2: Building2,
  Car: Car,
  Utensils: Utensils,
  Camera: Camera,
  Sparkles: Sparkles,
  Palette: Palette,
  Shirt: Shirt,
  CalendarCheck: CalendarCheck
};

const CategorySection = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container py-3">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-gold sub-badge">Top Wedding Categories</span>
          <h2>Explore By Wedding Service</h2>
          <p>Everything you need for your Mehndi, Baraat, and Walima events in one trusted platform.</p>
          <div className="gold-divider"></div>
        </div>

        {/* Categories Grid */}
        <div className="row g-4">
          {CATEGORIES.map((cat) => {
            const IconComponent = iconMap[cat.icon] || Sparkles;
            return (
              <div key={cat.id} className="col-12 col-sm-6 col-lg-3">
                <Link to={cat.path} className="text-decoration-none">
                  <div className="wedding-card h-100 p-3 text-center border-0 bg-light shadow-sm">
                    <div className="card-media rounded-3 mb-3">
                      <img src={cat.image} alt={cat.name} loading="lazy" />
                    </div>
                    <div className="feature-icon-box mx-auto">
                      <IconComponent size={26} />
                    </div>
                    <h5 className="font-serif fw-bold text-dark mb-1">{cat.name}</h5>
                    <p className="text-muted small mb-2">{cat.tagline}</p>
                    <span className="text-warning fw-semibold small d-inline-flex align-items-center gap-1">
                      {cat.count} <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
