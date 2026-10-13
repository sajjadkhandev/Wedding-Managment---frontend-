import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { FEATURED_PHOTOGRAPHY, CITIES } from '../../data/mockData';
import { formatPKR, formatDate } from '../../utils/formatters';
import { serviceApi } from '../../services/api';
import { Camera, MapPin, Star, CheckCircle, Video, Loader2, Calendar } from 'lucide-react';

const Photography = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCity = searchParams.get('city') || '';
  const urlDate = searchParams.get('date') || '';

  const [photoItems, setPhotoItems] = useState(FEATURED_PHOTOGRAPHY);
  const [cityFilter, setCityFilter] = useState(urlCity);
  const [dateFilter, setDateFilter] = useState(urlDate);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (urlCity) setCityFilter(urlCity);
    if (urlDate) setDateFilter(urlDate);
  }, [urlCity, urlDate]);

  useEffect(() => {
    const fetchPhoto = async () => {
      setLoading(true);
      try {
        const response = await serviceApi.getServices({ category: 'photography' });
        if (response?.data?.services && response.data.services.length > 0) {
          const normalized = response.data.services.map(s => ({
            id: s._id || s.id,
            title: s.title,
            vendorName: s.vendor?.businessName || 'Verified Studio',
            city: s.city,
            pricePKR: s.startingPrice,
            rating: s.rating || 4.9,
            reviewsCount: s.reviewsCount || 15,
            image: (s.images && s.images[0]) || FEATURED_PHOTOGRAPHY[0].image,
            features: s.amenities?.length ? s.amenities : ['4K Cinematic Highlight Reel', 'Drone Aerial Footage', 'Luxury Hardcover Album', 'Raw Footage on Drive']
          }));
          setPhotoItems(normalized);
        }
      } catch (err) {
        setPhotoItems(FEATURED_PHOTOGRAPHY);
      } finally {
        setLoading(false);
      }
    };
    fetchPhoto();
  }, []);

  const filteredPhoto = photoItems.filter(p => !cityFilter || p.city.toLowerCase() === cityFilter.toLowerCase());

  return (
    <div>
      <PageHeader 
        title="Wedding Photography & Cinematography"
        subtitle="Capture memories across your Mehndi, Baraat, and Walima with premier Pakistani visual storytellers."
        badge="Films & Photography"
        breadcrumbs={[
          { label: 'Services', path: '/services' },
          { label: 'Photography' }
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
                <Calendar size={14} className="text-warning" /> Shoot / Event Date
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
                  <Loader2 size={14} className="spin" /> Syncing live studio packages...
                </span>
              ) : (
                'All packages include high-resolution color-graded photos and cinematic highlight reels.'
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
          {filteredPhoto.map((photo) => {
            const targetLink = `/vendors/${photo.id}?city=${encodeURIComponent(photo.city)}${dateFilter ? `&date=${dateFilter}` : ''}`;
            return (
              <div key={photo.id} className="col-12 col-md-6">
                <div className="wedding-card h-100 p-4">
                  <div className="row g-3">
                    <div className="col-12 col-sm-5 card-media rounded-3 overflow-hidden">
                      <img 
                        src={photo.image} 
                        alt={photo.title} 
                        className="w-100 h-100 object-fit-cover" 
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    </div>
                    <div className="col-12 col-sm-7 d-flex flex-column">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="badge-city">
                          <MapPin size={11} className="text-danger" /> {photo.city}
                        </span>
                        <div className="d-flex align-items-center gap-1 small fw-bold">
                          <Star size={13} className="text-warning fill-warning" />
                          <span>{photo.rating}</span>
                          <span className="text-muted fw-normal">({photo.reviewsCount || 15})</span>
                        </div>
                      </div>

                      <h5 className="font-serif fw-bold text-dark mb-1">
                        <Link to={targetLink} className="text-decoration-none text-dark hover-gold">
                          {photo.title}
                        </Link>
                      </h5>
                      <p className="text-muted small mb-2">By {photo.vendorName}</p>

                      <div className="p-2 bg-light rounded-2 mb-2 small flex-grow-1">
                        <strong className="d-block text-dark mb-1">Package Deliverables:</strong>
                        <ul className="list-unstyled mb-0 text-muted" style={{ fontSize: '0.78rem' }}>
                          {(photo.features || []).map((feat, i) => (
                            <li key={i} className="mb-1">• {feat}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Date Availability Indicator */}
                      <div className="mb-3 d-flex align-items-center justify-content-between small">
                        <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                          <Calendar size={12} className="text-warning inline me-1" /> Shoot Slot:
                        </span>
                        <span className="badge bg-success bg-opacity-10 text-success fw-bold" style={{ fontSize: '0.72rem' }}>
                          {dateFilter ? formatDate(dateFilter) : 'Slots Available'}
                        </span>
                      </div>

                      <div className="border-top pt-2 mt-auto d-flex justify-content-between align-items-center">
                        <div>
                          <span className="text-muted" style={{ fontSize: '0.72rem' }}>Package Price</span>
                          <span className="price-tag d-block">
                            <span className="amount fs-6">{formatPKR(photo.pricePKR)}</span> / event
                          </span>
                        </div>
                        <Link to={targetLink} className="btn-gold py-1 px-3 fs-6" style={{ fontSize: '0.8rem' }}>
                          View Portfolio
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

export default Photography;
