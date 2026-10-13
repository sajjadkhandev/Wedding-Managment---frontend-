import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { CITIES } from '../../data/mockData';
import { formatPKR, formatDate } from '../../utils/formatters';
import { serviceApi } from '../../services/api';
import { Sparkles, MapPin, Star, CheckCircle, Loader2, Calendar } from 'lucide-react';

const DECOR_ITEMS = [
  {
    id: 'dec-1',
    title: 'Flora & Royal Stage Setup',
    vendorName: 'Royal Flora Events',
    city: 'Lahore',
    pricePKR: 180000,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
    type: 'Baraat & Walima Stage',
    inclusions: ['Imported Fresh Flower Arch', 'Velvet Backdrop & Chandeliers', 'Sofa Set & Carpet', 'Custom Ambient Stage Lights']
  },
  {
    id: 'dec-2',
    title: 'Vibrant Mehndi Jhoola & Theme Decor',
    vendorName: 'Jashn Decorators',
    city: 'Karachi',
    pricePKR: 125000,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    type: 'Mehndi & Mayun Setup',
    inclusions: ['Marigold Floral Garland Canopy', 'Traditional Decorated Jhoola (Swing)', 'Floor Cushions & Low Tables', 'Fairy Lights Entrance Pathway']
  }
];

const Decoration = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCity = searchParams.get('city') || '';
  const urlDate = searchParams.get('date') || '';

  const [decorItems, setDecorItems] = useState(DECOR_ITEMS);
  const [cityFilter, setCityFilter] = useState(urlCity);
  const [dateFilter, setDateFilter] = useState(urlDate);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (urlCity) setCityFilter(urlCity);
    if (urlDate) setDateFilter(urlDate);
  }, [urlCity, urlDate]);

  useEffect(() => {
    const fetchDecor = async () => {
      setLoading(true);
      try {
        const response = await serviceApi.getServices({ category: 'decoration' });
        if (response?.data?.services && response.data.services.length > 0) {
          const normalized = response.data.services.map(s => ({
            id: s._id || s.id,
            title: s.title,
            vendorName: s.vendor?.businessName || 'Verified Decorator',
            city: s.city,
            pricePKR: s.startingPrice,
            rating: s.rating || 4.9,
            image: (s.images && s.images[0]) || DECOR_ITEMS[0].image,
            type: s.category?.name || 'Stage & Floral Setup',
            inclusions: s.amenities?.length ? s.amenities : DECOR_ITEMS[0].inclusions
          }));
          setDecorItems(normalized);
        }
      } catch (err) {
        setDecorItems(DECOR_ITEMS);
      } finally {
        setLoading(false);
      }
    };
    fetchDecor();
  }, []);

  const filtered = decorItems.filter(d => !cityFilter || d.city === cityFilter);

  return (
    <div>
      <PageHeader 
        title="Stage Decoration & Floral Art"
        subtitle="Transform your wedding venue with majestic stage designs, fresh floral canopies, and vibrant Mehndi jhoolas."
        badge="Stage & Lighting"
        breadcrumbs={[
          { label: 'Services', path: '/services' },
          { label: 'Decoration' }
        ]}
      />

      <div className="container py-5">
        <div className="p-3 bg-white rounded-3 shadow-sm border mb-4">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-md-4">
              <label className="form-label small fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                <MapPin size={14} className="text-warning" /> Filter by City
              </label>
              <select className="form-select bg-light" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
                <option value="">All Cities in Pakistan</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label small fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                <Calendar size={14} className="text-warning" /> Stage / Event Date
              </label>
              <input 
                type="date"
                className="form-control bg-light"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>

            <div className="col-12 col-md-4 text-md-end text-muted small pt-md-3">
              {loading ? (
                <span className="d-flex align-items-center justify-content-md-end gap-1">
                  <Loader2 size={14} className="spin" /> Syncing stage setups...
                </span>
              ) : (
                'Includes full setup and dismantling coordination with banquet management.'
              )}
            </div>
          </div>

          {/* Active Filter Chips */}
          {(cityFilter || dateFilter) && (
            <div className="d-flex flex-wrap align-items-center gap-2 pt-3 mt-3 border-top">
              <span className="small text-muted fw-bold">Active Filters:</span>
              {cityFilter && (
                <span className="badge bg-warning text-dark d-inline-flex align-items-center gap-1">
                  <MapPin size={11} /> City: {cityFilter}
                </span>
              )}
              {dateFilter && (
                <span className="badge bg-warning text-dark d-inline-flex align-items-center gap-1">
                  <Calendar size={11} /> Date: {formatDate(dateFilter)}
                </span>
              )}
              <button 
                type="button" 
                onClick={() => { setCityFilter(''); setDateFilter(''); }} 
                className="btn btn-link btn-sm text-muted ms-auto py-0 text-decoration-none"
              >
                Reset All
              </button>
            </div>
          )}
        </div>

        <div className="row g-4">
          {filtered.map((item) => {
            const targetLink = `/vendors/${item.id}?city=${encodeURIComponent(item.city)}${dateFilter ? `&date=${dateFilter}` : ''}`;
            return (
              <div key={item.id} className="col-12 col-md-6">
                <div className="wedding-card h-100 p-4">
                  <div className="row g-3">
                    <div className="col-12 col-sm-5 card-media rounded-3 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-100 h-100 object-fit-cover" 
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    </div>
                    <div className="col-12 col-sm-7 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="badge-city">
                          <MapPin size={11} className="text-danger" /> {item.city}
                        </span>
                        <span className="badge bg-warning text-dark small">★ {item.rating}</span>
                      </div>

                      <h5 className="font-serif fw-bold text-dark mb-1">
                        <Link to={targetLink} className="text-decoration-none text-dark hover-gold">
                          {item.title}
                        </Link>
                      </h5>
                      <span className="badge bg-light text-secondary border small mb-2 align-self-start">{item.type}</span>

                      <ul className="list-unstyled mb-2 small text-muted flex-grow-1" style={{ fontSize: '0.78rem' }}>
                        {item.inclusions.map((inc, i) => (
                          <li key={i} className="mb-1">✓ {inc}</li>
                        ))}
                      </ul>

                      {/* Date Availability Indicator */}
                      <div className="mb-3 d-flex align-items-center justify-content-between small">
                        <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                          <Calendar size={12} className="text-warning inline me-1" /> Slot:
                        </span>
                        <span className="badge bg-success bg-opacity-10 text-success fw-bold" style={{ fontSize: '0.72rem' }}>
                          {dateFilter ? formatDate(dateFilter) : 'Setup Available'}
                        </span>
                      </div>

                      <div className="border-top pt-2 mt-auto d-flex justify-content-between align-items-center">
                        <span className="price-tag">
                          <span className="amount fs-6">{formatPKR(item.pricePKR)}</span>
                        </span>
                        <Link to={targetLink} className="btn-gold py-1 px-3 fs-6" style={{ fontSize: '0.8rem' }}>
                          Book Stage
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Decoration;
