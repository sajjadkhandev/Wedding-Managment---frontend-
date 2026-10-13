import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { FEATURED_VENUES, CITIES } from '../../data/mockData';
import { formatPKR, formatDate } from '../../utils/formatters';
import { serviceApi } from '../../services/api';
import { MapPin, Users, Star, CheckCircle, ShieldCheck, Filter, Loader2, Calendar } from 'lucide-react';

const WeddingVenues = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCity = searchParams.get('city') || '';
  const urlDate = searchParams.get('date') || '';

  const [venues, setVenues] = useState(FEATURED_VENUES);
  const [loading, setLoading] = useState(false);
  const [cityFilter, setCityFilter] = useState(urlCity);
  const [dateFilter, setDateFilter] = useState(urlDate);
  const [capacityFilter, setCapacityFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  // Keep state in sync if URL params change
  useEffect(() => {
    if (urlCity) setCityFilter(urlCity);
    if (urlDate) setDateFilter(urlDate);
  }, [urlCity, urlDate]);

  // Fetch live venues from API with fallback
  useEffect(() => {
    const fetchVenues = async () => {
      setLoading(true);
      try {
        const response = await serviceApi.getServices({ category: 'venues' });
        if (response?.data?.services && response.data.services.length > 0) {
          // Normalize API data structure to display
          const normalized = response.data.services.map((s, idx) => ({
            id: s._id || s.id,
            title: s.title,
            vendorName: s.vendor?.businessName || 'Verified Vendor',
            city: s.city,
            location: s.location || s.city,
            capacity: s.capacity || 500,
            pricePKR: s.startingPrice,
            rating: s.rating || 4.9,
            image: (s.images && s.images[0]) || FEATURED_VENUES[idx % FEATURED_VENUES.length]?.image || FEATURED_VENUES[0].image,
            venueType: s.venueType || 'Indoor Luxury Hall',
            amenities: s.amenities && s.amenities.length > 0 ? s.amenities : ['Generator Backup', 'Bridal Room', 'Valet Parking'],
            description: s.description || 'Spacious wedding banquet hall with full climate control.'
          }));
          setVenues(normalized.length >= FEATURED_VENUES.length ? normalized : FEATURED_VENUES);
        } else {
          setVenues(FEATURED_VENUES);
        }
      } catch (err) {
        // Graceful fallback to mock venues dataset
        setVenues(FEATURED_VENUES);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const filteredVenues = venues.filter(v => {
    const matchesCity = !cityFilter || v.city.toLowerCase() === cityFilter.toLowerCase();
    const matchesType = !typeFilter || v.venueType.toLowerCase().includes(typeFilter.toLowerCase());
    let matchesCapacity = true;
    if (capacityFilter === 'small') matchesCapacity = v.capacity <= 500;
    else if (capacityFilter === 'large') matchesCapacity = v.capacity > 500;
    return matchesCity && matchesType && matchesCapacity;
  });

  return (
    <div>
      <PageHeader 
        title="Wedding Venues & Marriage Halls"
        subtitle="Reserve luxury banquet halls, climate-controlled marquees, and picturesque outdoor wedding lawns across Pakistan."
        badge="Venues & Marquees"
        breadcrumbs={[
          { label: 'Services', path: '/services' },
          { label: 'Venues' }
        ]}
      />

      <div className="container py-5">
        {/* Filter Toolbar */}
        <div className="p-3 bg-white rounded-3 shadow-sm border mb-4">
          <div className="row g-3">
            <div className="col-12 col-md-3">
              <label className="form-label small fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                <MapPin size={14} className="text-warning" /> City in Pakistan
              </label>
              <select className="form-select bg-light" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
                <option value="">All Cities</option>
                {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="col-12 col-md-3">
              <label className="form-label small fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                <Calendar size={14} className="text-warning" /> Wedding Date
              </label>
              <input 
                type="date" 
                className="form-control bg-light" 
                value={dateFilter} 
                onChange={(e) => setDateFilter(e.target.value)} 
              />
            </div>

            <div className="col-12 col-md-3">
              <label className="form-label small fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                <Users size={14} className="text-warning" /> Guest Capacity
              </label>
              <select className="form-select bg-light" value={capacityFilter} onChange={(e) => setCapacityFilter(e.target.value)}>
                <option value="">Any Capacity</option>
                <option value="small">Up to 500 Guests</option>
                <option value="large">500+ Guests</option>
              </select>
            </div>

            <div className="col-12 col-md-3">
              <label className="form-label small fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                <Filter size={14} className="text-warning" /> Venue Type
              </label>
              <select className="form-select bg-light" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="">All Types</option>
                <option value="indoor">Indoor Hall</option>
                <option value="marquee">Marquee</option>
                <option value="lawn">Open Lawn</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {(cityFilter || dateFilter || capacityFilter || typeFilter) && (
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
              {capacityFilter && (
                <span className="badge bg-light text-dark border">
                  Capacity: {capacityFilter === 'small' ? '≤500' : '500+'}
                </span>
              )}
              {typeFilter && (
                <span className="badge bg-light text-dark border">
                  Type: {typeFilter}
                </span>
              )}
              <button 
                type="button" 
                onClick={() => { setCityFilter(''); setDateFilter(''); setCapacityFilter(''); setTypeFilter(''); }} 
                className="btn btn-link btn-sm text-muted ms-auto py-0 text-decoration-none"
              >
                Reset All
              </button>
            </div>
          )}
        </div>

        {/* Venues Grid */}
        {loading ? (
          <div className="text-center py-5">
            <Loader2 size={36} className="spinner-border text-warning" />
            <p className="text-muted small mt-2">Loading verified marriage halls...</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredVenues.length > 0 ? (
              filteredVenues.map((venue) => {
                const targetLink = `/vendors/${venue.id}?city=${encodeURIComponent(venue.city)}${dateFilter ? `&date=${dateFilter}` : ''}`;
                return (
                  <div key={venue.id} className="col-12 col-lg-4 col-md-6">
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
                        <div className="position-absolute top-0 end-0 m-2">
                          <span className="badge bg-dark bg-opacity-75 text-white">{venue.venueType}</span>
                        </div>
                      </div>

                      <div className="p-4 d-flex flex-column flex-grow-1">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="badge-city">
                            <MapPin size={12} className="text-danger" /> {venue.city} ({venue.location})
                          </span>
                          <div className="d-flex align-items-center gap-1 small fw-bold text-dark">
                            <Star size={13} className="text-warning fill-warning" />
                            <span>{venue.rating}</span>
                          </div>
                        </div>

                        <h5 className="font-serif fw-bold text-dark mb-2">
                          <Link to={targetLink} className="text-decoration-none text-dark hover-gold">
                            {venue.title}
                          </Link>
                        </h5>

                        <p className="text-muted small mb-3 flex-grow-1">
                          {venue.description}
                        </p>

                        <div className="p-2 bg-light rounded-2 mb-3">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <div className="d-flex align-items-center gap-1 text-dark small fw-bold">
                              <Users size={14} className="text-warning" /> Capacity: {venue.capacity} Guests
                            </div>
                            <span className="badge bg-success bg-opacity-10 text-success small d-flex align-items-center gap-1">
                              <Calendar size={11} /> {dateFilter ? formatDate(dateFilter) : 'Slots Available'}
                            </span>
                          </div>
                          <div className="d-flex flex-wrap gap-1">
                            {venue.amenities && venue.amenities.slice(0, 2).map((a, i) => (
                              <span key={i} className="badge bg-white border text-secondary" style={{ fontSize: '0.7rem' }}>
                                ✓ {a}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="border-top pt-3 d-flex justify-content-between align-items-center">
                          <div>
                            <span className="text-muted small d-block">Slot Price</span>
                            <span className="price-tag">
                              <span className="amount fs-5">{formatPKR(venue.pricePKR)}</span>
                            </span>
                          </div>
                          <Link to={targetLink} className="btn-gold py-1 px-3 fs-6">
                            Check Availability
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-12 text-center py-5">
                <p className="text-muted">No venues match the selected filters.</p>
                <button 
                  className="btn-outline-gold btn-sm"
                  onClick={() => { setCityFilter(''); setCapacityFilter(''); setTypeFilter(''); }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WeddingVenues;
