import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { FEATURED_PACKAGES, CITIES, WEDDING_EVENTS } from '../../data/mockData';
import { formatPKR, formatDate } from '../../utils/formatters';
import { serviceApi } from '../../services/api';
import { Gift, Check, ArrowRight, Sparkles, MapPin, Loader2, CheckCircle2, Calendar, Users, X, Send } from 'lucide-react';

const WeddingPackages = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlCity = searchParams.get('city') || '';
  const urlDate = searchParams.get('date') || '';

  const [packageItems, setPackageItems] = useState(FEATURED_PACKAGES);
  const [cityFilter, setCityFilter] = useState(urlCity);
  const [dateFilter, setDateFilter] = useState(urlDate);
  const [loading, setLoading] = useState(false);
  const [selectedModalPackage, setSelectedModalPackage] = useState(null);
  const [selectedIds, setSelectedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('wedplan_selected_packages');
      return saved ? JSON.parse(saved) : ['pkg-1'];
    } catch {
      return ['pkg-1'];
    }
  });

  // Booking Form State inside modal
  const [bookingDate, setBookingDate] = useState(urlDate || '2026-11-20');
  const [guestCount, setGuestCount] = useState(350);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [specialNotes, setSpecialNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    if (urlCity) setCityFilter(urlCity);
    if (urlDate) {
      setDateFilter(urlDate);
      setBookingDate(urlDate);
    }
  }, [urlCity, urlDate]);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoading(true);
      try {
        const response = await serviceApi.getServices({ featured: true });
        if (response?.data?.services && response.data.services.length > 0) {
          const livePackages = [];
          response.data.services.forEach(s => {
            if (s.packages && s.packages.length > 0) {
              s.packages.forEach(p => {
                livePackages.push({
                  id: p._id || p.id,
                  title: `${s.title} - ${p.name}`,
                  events: ['Mehndi', 'Baraat', 'Walima'],
                  city: s.city,
                  totalPricePKR: p.price,
                  savingsPKR: Math.round(p.price * 0.15),
                  image: (s.images && s.images[0]) || FEATURED_PACKAGES[0].image,
                  inclusions: p.features?.length ? p.features : FEATURED_PACKAGES[0].inclusions
                });
              });
            }
          });
          if (livePackages.length >= FEATURED_PACKAGES.length) {
            setPackageItems(livePackages);
          } else {
            setPackageItems(FEATURED_PACKAGES);
          }
        } else {
          setPackageItems(FEATURED_PACKAGES);
        }
      } catch (err) {
        setPackageItems(FEATURED_PACKAGES);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const openSelectModal = (pkg) => {
    setSelectedModalPackage(pkg);
    setSelectedEvents(pkg.events || ['Baraat', 'Walima']);
    setBookingDate(dateFilter || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    setBookingSuccess(false);
  };

  const handleConfirmSelection = (e) => {
    e.preventDefault();
    if (!selectedModalPackage) return;
    
    const newSelected = Array.from(new Set([...selectedIds, selectedModalPackage.id]));
    setSelectedIds(newSelected);
    try {
      localStorage.setItem('wedplan_selected_packages', JSON.stringify(newSelected));
    } catch (err) {
      console.warn('LocalStorage error:', err);
    }
    setBookingSuccess(true);
  };

  const handleToggleEvent = (evt) => {
    if (selectedEvents.includes(evt)) {
      if (selectedEvents.length > 1) {
        setSelectedEvents(selectedEvents.filter(e => e !== evt));
      }
    } else {
      setSelectedEvents([...selectedEvents, evt]);
    }
  };

  const filtered = packageItems.filter(p => !cityFilter || p.city.toLowerCase() === cityFilter.toLowerCase());

  return (
    <div>
      <PageHeader 
        title="Curated Wedding Packages"
        subtitle="Complete multi-day wedding bundles tailored for Mehndi, Baraat, Walima, and Nikah celebrations with verified Pakistani vendors."
        badge="All-Inclusive Combos"
        breadcrumbs={[{ label: 'Packages' }]}
      />

      <div className="container py-5">
        {/* Filter bar */}
        <div className="p-3 bg-white rounded-3 shadow-sm border mb-4">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-md-4">
              <label className="form-label small fw-bold text-muted mb-1 d-flex align-items-center gap-1">
                <MapPin size={14} className="text-warning" /> Filter by Pakistani City
              </label>
              <select className="form-select bg-light" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
                <option value="">All Cities ({packageItems.length} Packages Available)</option>
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
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  setBookingDate(e.target.value);
                }} 
              />
            </div>

            <div className="col-12 col-md-4 text-md-end text-muted small pt-md-3">
              {loading ? (
                <span className="d-flex align-items-center justify-content-md-end gap-1">
                  <Loader2 size={14} className="spin" /> Syncing all-inclusive packages...
                </span>
              ) : (
                <span>
                  Showing <strong>{filtered.length}</strong> complete wedding bundles with up to 15-20% savings.
                </span>
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

        {/* Packages Grid */}
        <div className="row g-4">
          {filtered.map((pkg) => {
            const isSelected = selectedIds.includes(pkg.id);

            return (
              <div key={pkg.id} className="col-12 col-lg-6">
                <div 
                  className={`wedding-card h-100 overflow-hidden border-2 transition-all ${isSelected ? 'shadow-lg' : ''}`} 
                  style={{ 
                    borderColor: isSelected ? 'var(--wp-gold)' : 'var(--wp-border-gold)',
                    boxShadow: isSelected ? '0 8px 24px rgba(197, 160, 89, 0.25)' : undefined
                  }}
                >
                  <div className="row g-0 h-100">
                    <div className="col-12 col-sm-5 card-media h-100 position-relative">
                      <img 
                        src={pkg.image} 
                        alt={pkg.title} 
                        className="w-100 h-100 object-fit-cover" 
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                      <div className="position-absolute top-0 start-0 m-2 d-flex flex-column gap-1">
                        <span className="badge bg-danger text-white px-2 py-1 small shadow-sm">
                          Save {formatPKR(pkg.savingsPKR)}
                        </span>
                        {isSelected && (
                          <span className="badge bg-success text-white px-2 py-1 small shadow-sm d-flex align-items-center gap-1">
                            <CheckCircle2 size={12} /> Selected
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="col-12 col-sm-7 p-4 d-flex flex-column">
                      <div className="d-flex flex-wrap align-items-center justify-content-between gap-1 mb-2">
                        <div className="d-flex flex-wrap gap-1">
                          {pkg.events.map((evt) => (
                            <span key={evt} className="badge bg-warning bg-opacity-25 text-dark small fw-bold">
                              {evt}
                            </span>
                          ))}
                          <span className="badge bg-light text-secondary border small">{pkg.city}</span>
                        </div>
                        <span className="badge bg-success bg-opacity-10 text-success small d-flex align-items-center gap-1">
                          <Calendar size={11} /> {dateFilter ? formatDate(dateFilter) : 'Slots Open'}
                        </span>
                      </div>

                      <h5 className="font-serif fw-bold text-dark mb-2">{pkg.title}</h5>

                      <ul className="list-unstyled small text-muted mb-3 flex-grow-1">
                        {pkg.inclusions.map((inc, idx) => (
                          <li key={idx} className="d-flex align-items-start gap-2 mb-1">
                            <Check size={14} className="text-success mt-1 flex-shrink-0" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="border-top pt-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <div>
                            <span className="text-muted small d-block">All-Inclusive Total</span>
                            <span className="price-tag">
                              <span className="amount fs-5">{formatPKR(pkg.totalPricePKR)}</span>
                            </span>
                          </div>
                          <span className="text-muted small">
                            Advance (20%): <strong className="text-dark">{formatPKR(Math.round(pkg.totalPricePKR * 0.2))}</strong>
                          </span>
                        </div>

                        <div className="d-flex gap-2">
                          <button 
                            type="button"
                            onClick={() => openSelectModal(pkg)} 
                            className={`btn ${isSelected ? 'btn-success text-white' : 'btn-gold'} py-2 px-3 fs-6 flex-grow-1 d-flex align-items-center justify-content-center gap-1`}
                          >
                            <CheckCircle2 size={16} /> {isSelected ? 'Selected (Change)' : 'Select Package'}
                          </button>
                          <Link to={`/packages/${pkg.id}`} className="btn-outline-gold py-2 px-3 fs-6">
                            Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Select Package Modal */}
      {selectedModalPackage && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.65)', zIndex: 1060 }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
              <div className="modal-header bg-dark text-white p-3 p-md-4">
                <div>
                  <span className="badge-gold small mb-1">Package Customization & Booking</span>
                  <h5 className="modal-title font-serif fw-bold mb-0 text-white">{selectedModalPackage.title}</h5>
                  <small className="text-muted">{selectedModalPackage.city} • Multi-Day Celebration Combo</small>
                </div>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={() => setSelectedModalPackage(null)}
                ></button>
              </div>

              <div className="modal-body p-4">
                {bookingSuccess ? (
                  <div className="text-center py-4">
                    <div className="d-inline-flex p-3 rounded-circle bg-success bg-opacity-10 text-success mb-3">
                      <CheckCircle2 size={48} />
                    </div>
                    <h4 className="font-serif fw-bold text-success mb-2">Package Successfully Selected!</h4>
                    <p className="text-muted mb-4 max-w-md mx-auto">
                      <strong>{selectedModalPackage.title}</strong> has been locked in for your wedding celebration. Our dedicated WedPlan coordinator will contact you to verify vendor dates and schedule tastings.
                    </p>

                    <div className="p-3 bg-light rounded-3 border mb-4 text-start small">
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-muted">Selected Events:</span>
                        <strong className="text-dark">{selectedEvents.join(', ')}</strong>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-muted">Target Event Date:</span>
                        <strong className="text-dark">{bookingDate}</strong>
                      </div>
                      <div className="d-flex justify-content-between mb-1">
                        <span className="text-muted">Estimated Guest Count:</span>
                        <strong className="text-dark">{guestCount} Guests</strong>
                      </div>
                      <div className="d-flex justify-content-between border-top pt-2 mt-2">
                        <span className="fw-bold">Total Bundle Price:</span>
                        <strong className="text-dark fs-6">{formatPKR(selectedModalPackage.totalPricePKR)}</strong>
                      </div>
                      <div className="d-flex justify-content-between text-success">
                        <span>Your Package Savings:</span>
                        <strong>{formatPKR(selectedModalPackage.savingsPKR)}</strong>
                      </div>
                    </div>

                    <div className="d-flex gap-2 justify-content-center">
                      <button 
                        type="button" 
                        className="btn-gold px-4 py-2"
                        onClick={() => setSelectedModalPackage(null)}
                      >
                        Done & Close
                      </button>
                      <Link 
                        to="/customer/dashboard" 
                        className="btn-outline-gold px-4 py-2"
                        onClick={() => setSelectedModalPackage(null)}
                      >
                        View in Wedding Hub
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleConfirmSelection}>
                    <div className="row g-3 mb-4">
                      {/* Price Banner */}
                      <div className="col-12">
                        <div className="p-3 rounded-3 bg-warning bg-opacity-10 border border-warning d-flex justify-content-between align-items-center">
                          <div>
                            <span className="text-muted small d-block">All-Inclusive Combo Rate</span>
                            <span className="amount fs-4 fw-bold font-serif text-dark">{formatPKR(selectedModalPackage.totalPricePKR)}</span>
                          </div>
                          <div className="text-end">
                            <span className="badge bg-danger text-white mb-1">Save {formatPKR(selectedModalPackage.savingsPKR)}</span>
                            <span className="text-muted small d-block">20% Advance: <strong>{formatPKR(Math.round(selectedModalPackage.totalPricePKR * 0.2))}</strong></span>
                          </div>
                        </div>
                      </div>

                      {/* Wedding Date */}
                      <div className="col-12 col-md-6">
                        <label className="form-label small fw-bold text-muted mb-1">
                          <Calendar size={14} className="inline me-1 text-warning" /> Start / Primary Wedding Date
                        </label>
                        <input 
                          type="date" 
                          className="form-control" 
                          required
                          value={bookingDate} 
                          onChange={(e) => setBookingDate(e.target.value)} 
                        />
                      </div>

                      {/* Guest Count */}
                      <div className="col-12 col-md-6">
                        <label className="form-label small fw-bold text-muted mb-1">
                          <Users size={14} className="inline me-1 text-warning" /> Expected Guest Count
                        </label>
                        <input 
                          type="number" 
                          min="50" 
                          max="2000" 
                          className="form-control" 
                          value={guestCount} 
                          onChange={(e) => setGuestCount(Number(e.target.value))} 
                        />
                      </div>

                      {/* Event Selection */}
                      <div className="col-12">
                        <label className="form-label small fw-bold text-muted mb-1">Customize Events in this Bundle</label>
                        <div className="d-flex flex-wrap gap-2">
                          {['Mehndi', 'Baraat', 'Walima', 'Nikah', 'Qawwali / Sangeet'].map((ev) => {
                            const isIncluded = selectedEvents.includes(ev);
                            return (
                              <button
                                type="button"
                                key={ev}
                                onClick={() => handleToggleEvent(ev)}
                                className={`btn btn-sm ${isIncluded ? 'btn-dark text-white' : 'btn-outline-secondary'}`}
                              >
                                {isIncluded ? '✓ ' : '+ '} {ev}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Special Notes */}
                      <div className="col-12">
                        <label className="form-label small fw-bold text-muted mb-1">Special Preferences / Custom Inclusions</label>
                        <textarea 
                          className="form-control" 
                          rows="2" 
                          placeholder="E.g., Require outdoor lawn for Mehndi, specific floral colors, or bridal car pickup timing..."
                          value={specialNotes}
                          onChange={(e) => setSpecialNotes(e.target.value)}
                        ></textarea>
                      </div>

                      {/* Inclusions checklist preview */}
                      <div className="col-12">
                        <div className="p-3 bg-light rounded-3 border">
                          <span className="small fw-bold text-dark d-block mb-2">Package Inclusions:</span>
                          <div className="row g-2">
                            {selectedModalPackage.inclusions.map((inc, i) => (
                              <div key={i} className="col-12 col-md-6 small text-muted d-flex align-items-center gap-1">
                                <Check size={14} className="text-success flex-shrink-0" /> {inc}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex gap-2 justify-content-end border-top pt-3">
                      <button 
                        type="button" 
                        className="btn btn-light border px-4 py-2" 
                        onClick={() => setSelectedModalPackage(null)}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="btn-gold px-4 py-2 d-flex align-items-center gap-2"
                      >
                        <Send size={16} /> Confirm & Select This Package
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeddingPackages;
