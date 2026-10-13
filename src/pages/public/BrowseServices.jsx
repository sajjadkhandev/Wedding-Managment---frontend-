import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { CATEGORIES, CITIES } from '../../data/mockData';
import { formatDate } from '../../utils/formatters';
import { ArrowRight, Search, MapPin, Building2, Car, Utensils, Camera, Sparkles, Palette, Shirt, CalendarCheck, Calendar } from 'lucide-react';

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

const BrowseServices = () => {
  const [searchParams] = useSearchParams();
  const urlCity = searchParams.get('city') || '';
  const urlDate = searchParams.get('date') || '';

  const [selectedCity, setSelectedCity] = useState(urlCity);
  const [selectedDate, setSelectedDate] = useState(urlDate);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (urlCity) setSelectedCity(urlCity);
    if (urlDate) setSelectedDate(urlDate);
  }, [urlCity, urlDate]);

  const filteredCategories = CATEGORIES.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.tagline.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <PageHeader 
        title="Wedding Services & Categories"
        subtitle="Explore our curated directory of wedding services designed specifically for Pakistani marriage traditions."
        badge="Directory"
        breadcrumbs={[{ label: 'Services' }]}
      />

      <div className="container py-5">
        {/* Search & Filter Bar */}
        <div className="p-3 bg-white rounded-3 shadow-sm border mb-4">
          <div className="row g-3 align-items-end">
            <div className="col-12 col-md-5">
              <label className="form-label small fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                <Search size={14} className="text-warning" /> Search Service
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <Search size={18} className="text-muted" />
                </span>
                <input 
                  type="text" 
                  className="form-control bg-light border-start-0" 
                  placeholder="e.g. Venues, Catering, Cars, Photography..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12 col-md-4">
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

            <div className="col-12 col-md-3">
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
          {(selectedCity || selectedDate || searchTerm) && (
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
              {searchTerm && (
                <span className="badge bg-light text-dark border">
                  Search: {searchTerm}
                </span>
              )}
              <button 
                type="button" 
                onClick={() => { setSelectedCity(''); setSelectedDate(''); setSearchTerm(''); }} 
                className="btn btn-link btn-sm text-muted ms-auto py-0 text-decoration-none"
              >
                Reset All
              </button>
            </div>
          )}
        </div>

        {/* Categories Grid */}
        <div className="row g-4">
          {filteredCategories.map((cat) => {
            const IconComponent = iconMap[cat.icon] || Sparkles;
            const targetParams = new URLSearchParams();
            if (selectedCity) targetParams.append('city', selectedCity);
            if (selectedDate) targetParams.append('date', selectedDate);
            const targetPath = targetParams.toString() ? `${cat.path}?${targetParams.toString()}` : cat.path;
            return (
              <div key={cat.id} className="col-12 col-md-6 col-lg-3">
                <div className="wedding-card h-100">
                  <div className="card-media">
                    <img src={cat.image} alt={cat.name} loading="lazy" />
                  </div>
                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <div className="feature-icon-box mb-3">
                      <IconComponent size={24} />
                    </div>
                    <h5 className="font-serif fw-bold text-dark mb-2">{cat.name}</h5>
                    <p className="text-muted small mb-3 flex-grow-1">{cat.tagline}</p>
                    <div className="d-flex justify-content-between align-items-center pt-2 border-top">
                      <span className="badge-gold">{cat.count}</span>
                      <Link to={targetPath} className="btn-gold py-1 px-3 fs-6" style={{ fontSize: '0.8rem' }}>
                        Explore <ArrowRight size={14} />
                      </Link>
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

export default BrowseServices;
