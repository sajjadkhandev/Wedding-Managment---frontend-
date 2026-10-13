import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { CITIES, CATEGORIES, FEATURED_VENUES, FEATURED_CARS, FEATURED_PHOTOGRAPHY, FEATURED_CATERING } from '../../data/mockData';
import { formatPKR, formatDate } from '../../utils/formatters';
import { vendorApi } from '../../services/api';
import { MapPin, Star, ShieldCheck, Search, Filter, Loader2, Calendar } from 'lucide-react';

const FALLBACK_VENDORS = [
  ...FEATURED_VENUES.map(v => ({ ...v, category: 'Wedding Venues', categorySlug: 'venues' })),
  ...FEATURED_CARS.map(c => ({ ...c, category: 'Car Rental', categorySlug: 'cars' })),
  ...FEATURED_PHOTOGRAPHY.map(p => ({ ...p, category: 'Photography & Cinema', categorySlug: 'photography' })),
  ...FEATURED_CATERING.map(ct => ({ ...ct, category: 'Catering & Food', categorySlug: 'catering' }))
];

const BrowseVendors = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCity = searchParams.get('city') || '';
  const urlDate = searchParams.get('date') || '';
  const urlCat = searchParams.get('category') || '';

  const [vendors, setVendors] = useState(FALLBACK_VENDORS);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState(urlCity);
  const [selectedDate, setSelectedDate] = useState(urlDate);
  const [selectedCategory, setSelectedCategory] = useState(urlCat);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (urlCity) setSelectedCity(urlCity);
    if (urlDate) setSelectedDate(urlDate);
    if (urlCat) setSelectedCategory(urlCat);
  }, [urlCity, urlDate, urlCat]);

  useEffect(() => {
    const fetchVendors = async () => {
      setLoading(true);
      try {
        const response = await vendorApi.getVendors();
        if (response?.data?.vendors && response.data.vendors.length > 0) {
          const normalized = response.data.vendors.map(v => ({
            id: v._id || v.id,
            title: v.businessName,
            vendorName: v.businessName,
            city: v.city,
            category: (v.categories && v.categories[0]?.name) || 'Wedding Services',
            categorySlug: (v.categories && v.categories[0]?.slug) || 'venues',
            rating: v.rating || 5.0,
            image: v.coverImage || FALLBACK_VENDORS[0].image,
            pricePKR: 150000,
            description: v.description || 'Verified wedding service provider.'
          }));
          // Merge live vendors with featured showcase vendors
          setVendors([...normalized, ...FALLBACK_VENDORS]);
        }
      } catch (err) {
        setVendors(FALLBACK_VENDORS);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const filteredVendors = vendors.filter(v => {
    const matchesCity = !selectedCity || v.city.toLowerCase() === selectedCity.toLowerCase();
    const matchesCategory = !selectedCategory || v.categorySlug === selectedCategory;
    const matchesSearch = !searchQuery || 
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesCategory && matchesSearch;
  });

  return (
    <div>
      <PageHeader 
        title="Browse Verified Wedding Vendors"
        subtitle="Meet leading marriage hall managers, chauffeur fleets, culinary chefs, and photographers in Pakistan."
        badge="Marketplace"
        breadcrumbs={[{ label: 'Vendors' }]}
      />

      <div className="container py-5">
        {/* Filters */}
        <div className="p-3 bg-white rounded-3 shadow-sm border mb-4">
          <div className="row g-3">
            <div className="col-12 col-md-6 col-lg-3">
              <label className="form-label small fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                <Search size={14} className="text-warning" /> Search Name
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <Search size={16} className="text-muted" />
                </span>
                <input 
                  type="text" 
                  className="form-control bg-light border-start-0" 
                  placeholder="e.g. Royal Ballroom..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <label className="form-label small fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                <Filter size={14} className="text-warning" /> Category
              </label>
              <select 
                className="form-select bg-light"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Vendor Categories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <label className="form-label small fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                <MapPin size={14} className="text-warning" /> City in Pakistan
              </label>
              <select 
                className="form-select bg-light"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">All Pakistani Cities</option>
                {CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <label className="form-label small fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                <Calendar size={14} className="text-warning" /> Wedding Date
              </label>
              <input 
                type="date"
                className="form-control bg-light"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>

          {/* Active Filter Chips */}
          {(selectedCity || selectedCategory || selectedDate || searchQuery) && (
            <div className="d-flex flex-wrap align-items-center gap-2 pt-3 mt-3 border-top">
              <span className="small text-muted fw-bold">Active Filters:</span>
              {selectedCity && (
                <span className="badge bg-warning text-dark d-inline-flex align-items-center gap-1">
                  <MapPin size={11} /> City: {selectedCity}
                </span>
              )}
              {selectedDate && (
                <span className="badge bg-warning text-dark d-inline-flex align-items-center gap-1">
                  <Calendar size={11} /> Date: {formatDate(selectedDate)}
                </span>
              )}
              {selectedCategory && (
                <span className="badge bg-light text-dark border">
                  Category: {selectedCategory}
                </span>
              )}
              {searchQuery && (
                <span className="badge bg-light text-dark border">
                  Query: {searchQuery}
                </span>
              )}
              <button 
                type="button" 
                onClick={() => { setSelectedCity(''); setSelectedCategory(''); setSelectedDate(''); setSearchQuery(''); }} 
                className="btn btn-link btn-sm text-muted ms-auto py-0 text-decoration-none"
              >
                Reset All
              </button>
            </div>
          )}
        </div>

        {/* Vendors Listing Grid */}
        {loading ? (
          <div className="text-center py-5">
            <Loader2 size={36} className="spinner-border text-warning" />
            <p className="text-muted small mt-2">Loading verified vendor marketplace...</p>
          </div>
        ) : (
          <div className="row g-4">
            {filteredVendors.length > 0 ? (
              filteredVendors.map((vendor, idx) => {
                const targetLink = `/vendors/${vendor.id}?city=${encodeURIComponent(vendor.city)}${selectedDate ? `&date=${selectedDate}` : ''}`;
                return (
                  <div key={vendor.id || idx} className="col-12 col-md-6 col-lg-4">
                    <div className="wedding-card h-100">
                      <div className="card-media">
                        <img src={vendor.image} alt={vendor.title} loading="lazy" />
                        <div className="position-absolute top-0 end-0 m-2">
                          <span className="badge bg-dark bg-opacity-75 text-white small">
                            {vendor.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 d-flex flex-column flex-grow-1">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span className="badge-city">
                            <MapPin size={12} className="text-danger" /> {vendor.city}
                          </span>
                          <div className="d-flex align-items-center gap-1 text-dark fw-bold small">
                            <Star size={14} className="text-warning fill-warning" />
                            <span>{vendor.rating}</span>
                          </div>
                        </div>

                        <h5 className="font-serif fw-bold text-dark mb-1">
                          <Link to={targetLink} className="text-decoration-none text-dark hover-gold">
                            {vendor.title}
                          </Link>
                        </h5>

                        <p className="text-muted small mb-2">
                          By <strong className="text-secondary">{vendor.vendorName}</strong>
                        </p>

                        <div className="d-flex align-items-center gap-1 text-success small mb-2">
                          <ShieldCheck size={16} />
                          <span>Verified Business Profile</span>
                        </div>

                        {/* Date Availability Indicator */}
                        <div className="p-2 bg-light rounded-2 mb-3 d-flex align-items-center justify-content-between small">
                          <span className="text-muted" style={{ fontSize: '0.75rem' }}>
                            <Calendar size={12} className="text-warning inline me-1" /> Booking:
                          </span>
                          <span className="badge bg-success bg-opacity-10 text-success fw-bold" style={{ fontSize: '0.72rem' }}>
                            {selectedDate ? formatDate(selectedDate) : 'Season Open'}
                          </span>
                        </div>

                        <div className="border-top pt-3 mt-auto d-flex justify-content-between align-items-center">
                          <div>
                            <span className="text-muted small d-block">Starting from</span>
                            <span className="price-tag">
                              <span className="amount fs-5">{formatPKR(vendor.pricePKR)}</span>
                            </span>
                          </div>
                          <Link to={targetLink} className="btn-gold py-1 px-3 fs-6">
                            View Profile
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-12 text-center py-5">
                <p className="text-muted fs-5 mb-2">No vendors match your search criteria.</p>
                <button 
                  className="btn-outline-gold"
                  onClick={() => { setSelectedCity(''); setSelectedCategory(''); setSearchQuery(''); }}
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseVendors;
