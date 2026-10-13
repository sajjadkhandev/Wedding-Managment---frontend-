import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { CITIES } from '../../data/mockData';
import { formatPKR, formatDate } from '../../utils/formatters';
import { serviceApi } from '../../services/api';
import { Palette, MapPin, Star, CheckCircle, Loader2, Calendar } from 'lucide-react';

const MAKEUP_ARTISTS = [
  {
    id: 'mua-1',
    title: 'Signature Bridal Makeover by Zara',
    vendorName: 'Zara Bridal Studio',
    city: 'Lahore',
    pricePKR: 65000,
    rating: 4.95,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    services: ['Signature HD Bridal Makeup', 'Hairstyling with Fresh Floral Setting', 'Jewelry & Dupatta Setting', 'Mink Lashes & Nail Art']
  },
  {
    id: 'mua-2',
    title: 'Alle’nora Royal Bridal & Groom Look',
    vendorName: 'Alle’nora Salon',
    city: 'Islamabad',
    pricePKR: 80000,
    rating: 4.88,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    services: ['Airbrush Makeup', 'Groom Grooming & Styling', 'Pre-Bridal Facial & Glow Treatment', 'Dedicated Senior Artist']
  }
];

const MakeupArtists = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCity = searchParams.get('city') || '';
  const urlDate = searchParams.get('date') || '';

  const [artists, setArtists] = useState(MAKEUP_ARTISTS);
  const [cityFilter, setCityFilter] = useState(urlCity);
  const [dateFilter, setDateFilter] = useState(urlDate);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (urlCity) setCityFilter(urlCity);
    if (urlDate) setDateFilter(urlDate);
  }, [urlCity, urlDate]);

  useEffect(() => {
    const fetchArtists = async () => {
      setLoading(true);
      try {
        const response = await serviceApi.getServices({ category: 'makeup' });
        if (response?.data?.services && response.data.services.length > 0) {
          const normalized = response.data.services.map(s => ({
            id: s._id || s.id,
            title: s.title,
            vendorName: s.vendor?.businessName || 'Verified Makeup Artist',
            city: s.city,
            pricePKR: s.startingPrice,
            rating: s.rating || 4.9,
            image: (s.images && s.images[0]) || MAKEUP_ARTISTS[0].image,
            services: s.amenities?.length ? s.amenities : MAKEUP_ARTISTS[0].services
          }));
          setArtists(normalized);
        }
      } catch (err) {
        setArtists(MAKEUP_ARTISTS);
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  const filtered = artists.filter(m => !cityFilter || m.city === cityFilter);

  return (
    <div>
      <PageHeader 
        title="Bridal Makeup & Styling Salons"
        subtitle="Look breathtaking on your Baraat and Walima with Pakistan's top certified bridal stylists and groom grooming artists."
        badge="Beauty & Salons"
        breadcrumbs={[
          { label: 'Services', path: '/services' },
          { label: 'Makeup Artists' }
        ]}
      />

      <div className="container py-5">
        <div className="p-3 bg-white rounded-3 shadow-sm border mb-4">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-md-4">
              <label className="form-label small fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                <MapPin size={14} className="text-warning" /> Select City
              </label>
              <select className="form-select bg-light" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
                <option value="">All Cities in Pakistan</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label small fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                <Calendar size={14} className="text-warning" /> Wedding / Glam Date
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
                  <Loader2 size={14} className="spin" /> Syncing bridal stylists...
                </span>
              ) : (
                'Studio appointments and home/venue travel options available.'
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
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80';
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
                      <p className="text-muted small mb-2">{item.vendorName}</p>

                      <ul className="list-unstyled mb-2 small text-muted flex-grow-1" style={{ fontSize: '0.78rem' }}>
                        {item.services.map((s, i) => (
                          <li key={i} className="mb-1">✓ {s}</li>
                        ))}
                      </ul>

                      {/* Date Availability Indicator */}
                      <div className="mb-3 d-flex align-items-center justify-content-between small">
                        <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                          <Calendar size={12} className="text-warning inline me-1" /> Slot:
                        </span>
                        <span className="badge bg-success bg-opacity-10 text-success fw-bold" style={{ fontSize: '0.72rem' }}>
                          {dateFilter ? formatDate(dateFilter) : 'Appointments Open'}
                        </span>
                      </div>

                      <div className="border-top pt-2 mt-auto d-flex justify-content-between align-items-center">
                        <span className="price-tag">
                          <span className="amount fs-6">{formatPKR(item.pricePKR)}</span>
                        </span>
                        <Link to={targetLink} className="btn-gold py-1 px-3 fs-6" style={{ fontSize: '0.8rem' }}>
                          Book Slot
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

export default MakeupArtists;
