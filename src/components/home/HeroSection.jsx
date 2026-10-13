import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import { CITIES, CATEGORIES, WEDDING_EVENTS } from '../../data/mockData';

const HeroSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const navigate = useNavigate();

  // Minimum date is today
  const todayStr = new Date().toISOString().split('T')[0];

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedCategory) params.append('category', selectedCategory);
    if (selectedCity) params.append('city', selectedCity);
    if (selectedDate) params.append('date', selectedDate);
    if (selectedEvent) params.append('event', selectedEvent);
    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="hero-section">
      <div className="container py-3 py-lg-4 text-center">
        {/* Heading */}
        <h1 className="font-serif fw-bold text-white mb-3" style={{ fontSize: 'clamp(2.1rem, 2.8vw + 1.2rem, 3.8rem)', letterSpacing: '-0.02em' }}>
          Plan Your Royal Pakistani Wedding With Ease
        </h1>

        {/* Subtitle */}
        <p className="text-white text-opacity-85 mx-auto mb-4 fs-5" style={{ maxWidth: '720px' }}>
          Discover verified marriage halls, bridal cars, royal catering, photographers, and stage decor in PKR across Karachi, Lahore, Islamabad, and beyond.
        </p>

        {/* Search Box Card */}
        <div className="search-box-card mx-auto text-start" style={{ maxWidth: '1050px' }}>
          <form onSubmit={handleSearch} className="row g-2 g-md-3 align-items-end">
            {/* Category Dropdown */}
            <div className="col-12 col-md-6 col-lg-3">
              <label className="form-label small fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                <Layers size={14} className="text-warning" /> Service Needed
              </label>
              <select 
                className="form-select bg-light border-0 py-2"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Wedding Services</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* City Dropdown */}
            <div className="col-12 col-md-6 col-lg-3">
              <label className="form-label small fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                <MapPin size={14} className="text-warning" /> City in Pakistan
              </label>
              <select 
                className="form-select bg-light border-0 py-2"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                <option value="">All Major Cities</option>
                {CITIES.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Wedding Date Picker */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-2">
              <label className="form-label small fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                <Calendar size={14} className="text-warning" /> Wedding Date
              </label>
              <input 
                type="date"
                min={todayStr}
                className="form-control bg-light border-0 py-2"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            {/* Wedding Event Dropdown */}
            <div className="col-12 col-sm-6 col-md-4 col-lg-2">
              <label className="form-label small fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                <Sparkles size={14} className="text-warning" /> Wedding Event
              </label>
              <select 
                className="form-select bg-light border-0 py-2"
                value={selectedEvent}
                onChange={(e) => setSelectedEvent(e.target.value)}
              >
                <option value="">Select Event</option>
                {WEDDING_EVENTS.map(event => (
                  <option key={event} value={event}>{event}</option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="col-12 col-md-4 col-lg-2">
              <button type="submit" className="btn-gold w-100 py-2 fs-6">
                <Search size={18} /> Search
              </button>
            </div>
          </form>
        </div>

        {/* Value Highlights */}
        <div className="d-flex flex-wrap justify-content-center align-items-center gap-4 mt-4 text-white text-opacity-90 small">
          <div className="d-flex align-items-center gap-2">
            <ShieldCheck size={18} className="text-warning" />
            <span>500+ Verified Pakistani Vendors</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <Sparkles size={18} className="text-warning" />
            <span>Transparent Rates in PKR</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <ShieldCheck size={18} className="text-warning" />
            <span>Anti-Double-Booking Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
