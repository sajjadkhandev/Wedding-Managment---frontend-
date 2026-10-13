import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { FEATURED_CARS, CITIES } from '../../data/mockData';
import { formatPKR, formatDate } from '../../utils/formatters';
import { serviceApi } from '../../services/api';
import { Car, MapPin, Users, Star, CheckCircle, ShieldCheck, Loader2, Calendar } from 'lucide-react';

const CarRental = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCity = searchParams.get('city') || '';
  const urlDate = searchParams.get('date') || '';

  const [cars, setCars] = useState(FEATURED_CARS);
  const [loading, setLoading] = useState(false);
  const [cityFilter, setCityFilter] = useState(urlCity);
  const [dateFilter, setDateFilter] = useState(urlDate);
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    if (urlCity) setCityFilter(urlCity);
    if (urlDate) setDateFilter(urlDate);
  }, [urlCity, urlDate]);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const response = await serviceApi.getServices({ category: 'cars' });
        if (response?.data?.services && response.data.services.length > 0) {
          const normalized = response.data.services.map(c => ({
            id: c._id || c.id,
            title: c.title,
            vendorName: c.vendor?.businessName || 'Verified Transport',
            city: c.city,
            carType: c.carType || 'Luxury Sedan',
            modelYear: c.modelYear || 2023,
            passengerCapacity: c.passengerCapacity || 4,
            pricePKR: c.startingPrice,
            rateUnit: c.priceUnit || 'per day',
            withDriver: c.withDriver !== false,
            rating: c.rating || 4.9,
            image: (c.images && c.images[0]) || FEATURED_CARS[0].image,
            driverIncluded: c.withDriver !== false ? 'Chauffeur in uniform included' : 'Self-drive available',
            description: c.description || 'Pristine luxury bridal car with floral decoration options.'
          }));
          setCars(normalized);
        }
      } catch (err) {
        setCars(FEATURED_CARS);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredCars = cars.filter(c => {
    const matchesCity = !cityFilter || c.city.toLowerCase() === cityFilter.toLowerCase();
    const matchesType = !typeFilter || c.carType.toLowerCase().includes(typeFilter.toLowerCase());
    return matchesCity && matchesType;
  });

  return (
    <div>
      <PageHeader 
        title="Wedding Car Rental & Transport"
        subtitle="Bridal luxury cars, vintage classics for couple photo-shoots, and spacious air-conditioned coaster buses for Baraat guests."
        badge="Wedding Transport"
        breadcrumbs={[
          { label: 'Services', path: '/services' },
          { label: 'Car Rental' }
        ]}
      />

      <div className="container py-5">
        {/* Filters */}
        <div className="p-3 bg-white rounded-3 shadow-sm border mb-4">
          <div className="row g-3">
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

            <div className="col-12 col-md-4">
              <label className="form-label small fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                <Car size={14} className="text-warning" /> Vehicle Category
              </label>
              <select className="form-select bg-light" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                <option value="">All Vehicle Types</option>
                <option value="luxury">Luxury Sedans (Mercedes S-Class)</option>
                <option value="vintage">Vintage Classics (Rolls Royce)</option>
                <option value="suv">SUVs & Escorts (Prado V8)</option>
                <option value="bus">Guest Coasters & Buses (25-30 Seats)</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {(cityFilter || dateFilter || typeFilter) && (
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
              {typeFilter && (
                <span className="badge bg-light text-dark border">
                  Type: {typeFilter}
                </span>
              )}
              <button 
                type="button" 
                onClick={() => { setCityFilter(''); setDateFilter(''); setTypeFilter(''); }} 
                className="btn btn-link btn-sm text-muted ms-auto py-0 text-decoration-none"
              >
                Reset All
              </button>
            </div>
          )}
        </div>

        {/* Cars Grid */}
        {loading ? (
          <div className="text-center py-5">
            <Loader2 size={36} className="spinner-border text-warning" />
            <p className="text-muted small mt-2">Loading bridal transport fleet...</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredCars.length > 0 ? (
              filteredCars.map((car) => {
                const targetLink = `/vendors/${car.id}?city=${encodeURIComponent(car.city)}${dateFilter ? `&date=${dateFilter}` : ''}`;
                return (
                  <div key={car.id} className="col-12 col-md-6 col-lg-3">
                    <div className="wedding-card h-100">
                      <div className="card-media">
                        <img 
                          src={car.image} 
                          alt={car.title} 
                          loading="lazy" 
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                        <div className="position-absolute top-0 start-0 m-2">
                          <span className="badge bg-warning text-dark fw-bold">{car.carType}</span>
                        </div>
                      </div>

                      <div className="p-3 d-flex flex-column flex-grow-1">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="badge-city">
                            <MapPin size={11} className="text-danger" /> {car.city}
                          </span>
                          <div className="d-flex align-items-center gap-1 small fw-bold text-dark">
                            <Star size={13} className="text-warning fill-warning" />
                            <span>{car.rating}</span>
                          </div>
                        </div>

                        <h6 className="font-serif fw-bold text-dark mb-2">
                          <Link to={targetLink} className="text-decoration-none text-dark hover-gold">
                            {car.title}
                          </Link>
                        </h6>

                        <p className="text-muted small mb-2 flex-grow-1" style={{ fontSize: '0.8rem' }}>
                          {car.description}
                        </p>

                        <div className="p-2 bg-light rounded-2 mb-2 small">
                          <div className="d-flex align-items-center gap-1 text-dark mb-1">
                            <Users size={13} className="text-warning" /> <strong>{car.passengerCapacity} Passenger Seats</strong>
                          </div>
                          <div className="text-success d-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
                            <CheckCircle size={12} /> {car.driverIncluded}
                          </div>
                        </div>

                        {/* Date Availability Indicator */}
                        <div className="mb-3 d-flex align-items-center justify-content-between small">
                          <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                            <Calendar size={12} className="text-warning inline me-1" /> Slot:
                          </span>
                          <span className="badge bg-success bg-opacity-10 text-success fw-bold" style={{ fontSize: '0.72rem' }}>
                            {dateFilter ? formatDate(dateFilter) : 'Booking Open'}
                          </span>
                        </div>

                        <div className="border-top pt-2 mt-auto d-flex justify-content-between align-items-center">
                          <div>
                            <span className="text-muted" style={{ fontSize: '0.7rem' }}>{car.rateUnit}</span>
                            <span className="price-tag d-block">
                              <span className="amount fs-6">{formatPKR(car.pricePKR)}</span>
                            </span>
                          </div>
                          <Link to={targetLink} className="btn-gold py-1 px-3 fs-6" style={{ fontSize: '0.8rem' }}>
                            Book Ride
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-12 text-center py-5">
                <p className="text-muted">No vehicles match the selected criteria.</p>
                <button 
                  className="btn-outline-gold btn-sm"
                  onClick={() => { setCityFilter(''); setTypeFilter(''); }}
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

export default CarRental;
