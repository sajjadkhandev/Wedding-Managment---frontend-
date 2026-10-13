import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { FEATURED_CATERING, CITIES } from '../../data/mockData';
import { formatPKR, formatDate } from '../../utils/formatters';
import { serviceApi } from '../../services/api';
import { Utensils, MapPin, Star, CheckCircle, Users, Loader2, Calendar } from 'lucide-react';

const Catering = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCity = searchParams.get('city') || '';
  const urlDate = searchParams.get('date') || '';

  const [cateringItems, setCateringItems] = useState(FEATURED_CATERING);
  const [cityFilter, setCityFilter] = useState(urlCity);
  const [dateFilter, setDateFilter] = useState(urlDate);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (urlCity) setCityFilter(urlCity);
    if (urlDate) setDateFilter(urlDate);
  }, [urlCity, urlDate]);

  useEffect(() => {
    const fetchCatering = async () => {
      setLoading(true);
      try {
        const response = await serviceApi.getServices({ category: 'catering' });
        if (response?.data?.services && response.data.services.length > 0) {
          const normalized = response.data.services.map(s => ({
            id: s._id || s.id,
            title: s.title,
            vendorName: s.vendor?.businessName || 'Verified Caterer',
            city: s.city,
            pricePKR: s.startingPrice,
            rating: s.rating || 4.9,
            image: (s.images && s.images[0]) || FEATURED_CATERING[0].image,
            highlights: s.amenities?.length ? s.amenities : ['Mutton Biryani', 'Live BBQ', 'Fresh Naan', 'Kheer / Halwa']
          }));
          setCateringItems(normalized);
        }
      } catch (err) {
        setCateringItems(FEATURED_CATERING);
      } finally {
        setLoading(false);
      }
    };
    fetchCatering();
  }, []);

  const filteredCatering = cateringItems.filter(c => !cityFilter || c.city.toLowerCase() === cityFilter.toLowerCase());

  return (
    <div>
      <PageHeader 
        title="Wedding Catering & Food Menus"
        subtitle="Royal Pakistani Dastarkhwan: Special Mutton Biryani, live charcoal BBQ, Qorma, fresh hot Naan, and traditional desserts."
        badge="Feast & Catering"
        breadcrumbs={[
          { label: 'Services', path: '/services' },
          { label: 'Catering' }
        ]}
      />

      <div className="container py-5">
        {/* Filters */}
        <div className="p-3 bg-white rounded-3 shadow-sm border mb-4">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-md-4">
              <label className="form-label small fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                <MapPin size={14} className="text-warning" /> City in Pakistan
              </label>
              <select className="form-select bg-light" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
                <option value="">All Cities</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label small fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                <Calendar size={14} className="text-warning" /> Wedding / Event Date
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
                  <Loader2 size={14} className="spin" /> Syncing live menu rates...
                </span>
              ) : (
                'All menu packages include live serving staff and high-grade chafing dishes.'
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

        {/* Catering Cards Grid */}
        <div className="row g-4">
          {filteredCatering.map((cater) => (
            <div key={cater.id} className="col-12 col-md-6">
              <div className="wedding-card h-100 p-4">
                <div className="row g-3">
                  <div className="col-12 col-sm-5 card-media rounded-3 overflow-hidden">
                    <img 
                      src={cater.image} 
                      alt={cater.title} 
                      className="w-100 h-100 object-fit-cover" 
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </div>
                    <div className="col-12 col-sm-7 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="badge-city">
                          <MapPin size={11} className="text-danger" /> {cater.city}
                        </span>
                        <div className="d-flex align-items-center gap-1 small fw-bold">
                          <Star size={13} className="text-warning fill-warning" />
                          <span>{cater.rating}</span>
                        </div>
                      </div>

                      {(() => {
                        const targetLink = `/vendors/${cater.id}?city=${encodeURIComponent(cater.city)}${dateFilter ? `&date=${dateFilter}` : ''}`;
                        return (
                          <>
                            <h5 className="font-serif fw-bold text-dark mb-1">
                              <Link to={targetLink} className="text-decoration-none text-dark hover-gold">
                                {cater.title}
                              </Link>
                            </h5>
                            <p className="text-muted small mb-2">By {cater.vendorName}</p>

                            <div className="p-2 bg-light rounded-2 mb-2 small flex-grow-1">
                              <strong className="d-block text-dark mb-1">Sample Inclusions:</strong>
                              <ul className="list-unstyled mb-0 text-muted" style={{ fontSize: '0.78rem' }}>
                                {(cater.highlights || []).map((dish, i) => (
                                  <li key={i} className="mb-1">• {dish}</li>
                                ))}
                              </ul>
                            </div>

                            {/* Date Availability Badge */}
                            <div className="mb-3 d-flex align-items-center justify-content-between small">
                              <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                                <Calendar size={12} className="text-warning inline me-1" /> Slot:
                              </span>
                              <span className="badge bg-success bg-opacity-10 text-success fw-bold" style={{ fontSize: '0.72rem' }}>
                                {dateFilter ? formatDate(dateFilter) : 'Kitchen Open'}
                              </span>
                            </div>

                            <div className="border-top pt-2 mt-auto d-flex justify-content-between align-items-center">
                              <div>
                                <span className="text-muted" style={{ fontSize: '0.72rem' }}>Per Head Rate</span>
                                <span className="price-tag d-block">
                                  <span className="amount fs-6">{formatPKR(cater.pricePKR)}</span> / person
                                </span>
                              </div>
                              <Link to={targetLink} className="btn-gold py-1 px-3 fs-6" style={{ fontSize: '0.8rem' }}>
                                Book Tasting
                              </Link>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catering;
