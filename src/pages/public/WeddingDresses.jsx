import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { CITIES } from '../../data/mockData';
import { formatPKR, formatDate } from '../../utils/formatters';
import { serviceApi } from '../../services/api';
import { Shirt, MapPin, Star, Tag, Loader2, Calendar } from 'lucide-react';

const DRESS_ITEMS = [
  {
    id: 'dr-1',
    title: 'Crimson Heritage Zardozi Lehenga',
    vendorName: 'Zari Couture Lahore',
    city: 'Lahore',
    pricePKR: 45000,
    priceType: '3-Day Rental (or Rs. 280,000 to Buy)',
    image: 'https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=800&q=80',
    type: 'Bridal Lehenga (Baraat)',
    rating: 4.9,
    description: 'Pure red silk lehenga with hand-embellished zardozi, dabka, and pearl work. Includes custom fitting and dupatta setting.'
  },
  {
    id: 'dr-2',
    title: 'Royal Ivory Prince Coat & Sherwani',
    vendorName: 'Groom & Co. Karachi',
    city: 'Karachi',
    pricePKR: 28000,
    priceType: '3-Day Rental (or Rs. 140,000 to Buy)',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
    type: 'Groom Sherwani (Walima)',
    rating: 4.85,
    description: 'Hand-tailored raw silk prince coat sherwani with antique gold buttons, matching khussa, and embroidered shawl.'
  }
];

const WeddingDresses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCity = searchParams.get('city') || '';
  const urlDate = searchParams.get('date') || '';

  const [dressItems, setDressItems] = useState(DRESS_ITEMS);
  const [cityFilter, setCityFilter] = useState(urlCity);
  const [dateFilter, setDateFilter] = useState(urlDate);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (urlCity) setCityFilter(urlCity);
    if (urlDate) setDateFilter(urlDate);
  }, [urlCity, urlDate]);

  useEffect(() => {
    const fetchDresses = async () => {
      setLoading(true);
      try {
        const response = await serviceApi.getServices({ category: 'dresses' });
        if (response?.data?.services && response.data.services.length > 0) {
          const normalized = response.data.services.map(s => ({
            id: s._id || s.id,
            title: s.title,
            vendorName: s.vendor?.businessName || 'Verified Bridal Atelier',
            city: s.city,
            pricePKR: s.startingPrice,
            priceType: s.pricingUnit === 'per_day' ? 'Rental per Day' : 'Custom Tailored Couture',
            image: (s.images && s.images[0]) || DRESS_ITEMS[0].image,
            type: s.category?.name || 'Bridal Couture',
            rating: s.rating || 4.9,
            description: s.description || 'Exclusive bridal and groom attire handcrafted by renowned Pakistani artisans.'
          }));
          setDressItems(normalized);
        }
      } catch (err) {
        setDressItems(DRESS_ITEMS);
      } finally {
        setLoading(false);
      }
    };
    fetchDresses();
  }, []);

  const filtered = dressItems.filter(d => !cityFilter || d.city === cityFilter);

  return (
    <div>
      <PageHeader 
        title="Wedding Dresses & Sherwanis"
        subtitle="Stunning bridal lehengas, royal sherwanis, and colorful Mehndi outfits available for rental or custom purchase in Pakistan."
        badge="Bridal Couture"
        breadcrumbs={[
          { label: 'Services', path: '/services' },
          { label: 'Wedding Dresses' }
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
                <option value="">All Pakistani Cities</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label small fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                <Calendar size={14} className="text-warning" /> Wedding / Fitting Date
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
                  <Loader2 size={14} className="spin" /> Syncing couture collections...
                </span>
              ) : (
                'Clear rental terms: Security deposit required, complimentary alteration included.'
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
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=800&q=80';
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

                      <p className="text-muted small mb-2 flex-grow-1" style={{ fontSize: '0.8rem' }}>
                        {item.description}
                      </p>

                      <div className="p-2 bg-light rounded-2 mb-2 small text-secondary">
                        <Tag size={13} className="text-warning me-1 inline" /> {item.priceType}
                      </div>

                      {/* Date Availability Indicator */}
                      <div className="mb-3 d-flex align-items-center justify-content-between small">
                        <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                          <Calendar size={12} className="text-warning inline me-1" /> Rental Slot:
                        </span>
                        <span className="badge bg-success bg-opacity-10 text-success fw-bold" style={{ fontSize: '0.72rem' }}>
                          {dateFilter ? formatDate(dateFilter) : 'Fitting Open'}
                        </span>
                      </div>

                      <div className="border-top pt-2 mt-auto d-flex justify-content-between align-items-center">
                        <span className="price-tag">
                          <span className="amount fs-6">{formatPKR(item.pricePKR)}</span>
                        </span>
                        <Link to={targetLink} className="btn-gold py-1 px-3 fs-6" style={{ fontSize: '0.8rem' }}>
                          Book Fitting
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

export default WeddingDresses;
