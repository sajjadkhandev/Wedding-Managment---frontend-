import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { formatPKR, formatDate } from '../../utils/formatters';
import { CITIES, CATEGORIES, FEATURED_VENUES, FEATURED_CARS } from '../../data/mockData';
import { bookingApi } from '../../services/api';
import { 
  Store, 
  ShieldCheck, 
  Clock, 
  Plus, 
  Layers, 
  Users, 
  Eye, 
  Calendar, 
  CheckCircle2, 
  AlertCircle,
  Tag,
  Building2,
  Trash2,
  Edit3,
  Check,
  X
} from 'lucide-react';

const VendorDashboard = () => {
  const { user } = useAuth();

  // Initial vendor listings
  const [listings, setListings] = useState([
    {
      id: 'l-1',
      title: user?.name ? `${user.name} - Main Marquee` : 'Royal Crystal Banquet Hall',
      category: 'venues',
      categoryName: 'Wedding Venues & Halls',
      city: user?.city || 'Lahore',
      startingPrice: 350000,
      priceUnit: 'per event slot',
      capacity: 600,
      isActive: true,
      packagesCount: 2
    },
    {
      id: 'l-2',
      title: 'Bridal Luxury Mercedes Escort',
      category: 'cars',
      categoryName: 'Car Rental & Transport',
      city: user?.city || 'Lahore',
      startingPrice: 35000,
      priceUnit: 'per day',
      capacity: 4,
      isActive: true,
      packagesCount: 1
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newListing, setNewListing] = useState({
    title: '',
    category: 'venues',
    city: user?.city || 'Lahore',
    startingPrice: '',
    priceUnit: 'per event slot',
    capacity: 400,
    amenities: 'Generator Backup, AC, Valet Parking'
  });

  const handleCreateListing = (e) => {
    e.preventDefault();
    if (!newListing.title || !newListing.startingPrice) return;

    const catObj = CATEGORIES.find(c => c.slug === newListing.category);

    const created = {
      id: 'l-' + Date.now(),
      title: newListing.title,
      category: newListing.category,
      categoryName: catObj?.name || newListing.category,
      city: newListing.city,
      startingPrice: Number(newListing.startingPrice),
      priceUnit: newListing.priceUnit,
      capacity: Number(newListing.capacity),
      isActive: true,
      packagesCount: 1
    };

    setListings([created, ...listings]);
    setShowAddModal(false);
    setNewListing({
      title: '',
      category: 'venues',
      city: user?.city || 'Lahore',
      startingPrice: '',
      priceUnit: 'per event slot',
      capacity: 400,
      amenities: 'Generator Backup, AC, Valet Parking'
    });
  };

  const toggleStatus = (id) => {
    setListings(listings.map(l => l.id === id ? { ...l, isActive: !l.isActive } : l));
  };

  const deleteListing = (id) => {
    if (confirm('Are you sure you want to delete this listing?')) {
      setListings(listings.filter(l => l.id !== id));
    }
  };

  // Vendor Booking Requests Queue State
  const [bookingRequests, setBookingRequests] = useState([
    {
      _id: 'bk-demo-1',
      bookingNumber: 'WP-BK-829101',
      customer: { name: 'Hassan Khan', email: 'customer@wedplan.pk', phone: '03001234567' },
      service: { title: 'Royal Crystal Banquet Hall' },
      eventName: 'Baraat',
      eventDate: '2026-11-20',
      timeSlot: 'evening',
      guestCount: 450,
      totalAmountPKR: 350000,
      advanceDepositPKR: 70000,
      status: 'pending'
    },
    {
      _id: 'bk-demo-2',
      bookingNumber: 'WP-BK-918234',
      customer: { name: 'Zainab & Bilal', email: 'zainab@wedplan.pk', phone: '03219876543' },
      service: { title: 'Royal Crystal Banquet Hall' },
      eventName: 'Walima',
      eventDate: '2026-11-22',
      timeSlot: 'evening',
      guestCount: 400,
      totalAmountPKR: 350000,
      advanceDepositPKR: 70000,
      status: 'pending'
    }
  ]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function fetchVendorBookings() {
      try {
        setLoadingBookings(true);
        const res = await bookingApi.getMyBookings();
        if (isMounted && res?.data?.bookings && res.data.bookings.length > 0) {
          setBookingRequests(res.data.bookings);
        }
      } catch {
        // Fallback demo bookings remain intact
      } finally {
        if (isMounted) setLoadingBookings(false);
      }
    }
    fetchVendorBookings();
    return () => { isMounted = false; };
  }, []);

  const handleAcceptBooking = async (bookingId) => {
    try {
      await bookingApi.updateBookingStatus(bookingId, { action: 'accept', note: 'Vendor accepted slot reservation' });
      setBookingRequests(prev => prev.map(b => b._id === bookingId ? { ...b, status: 'accepted' } : b));
    } catch {
      setBookingRequests(prev => prev.map(b => b._id === bookingId ? { ...b, status: 'accepted' } : b));
    }
  };

  const handleRejectBooking = async (bookingId) => {
    if (!confirm('Reject this booking request? The slot will be freed in your availability calendar.')) return;
    try {
      await bookingApi.updateBookingStatus(bookingId, { action: 'reject', note: 'Vendor unavailable on requested slot' });
      setBookingRequests(prev => prev.map(b => b._id === bookingId ? { ...b, status: 'rejected' } : b));
    } catch {
      setBookingRequests(prev => prev.map(b => b._id === bookingId ? { ...b, status: 'rejected' } : b));
    }
  };

  return (
    <div className="py-5" style={{ backgroundColor: 'var(--wp-bg-main)', minHeight: '85vh' }}>
      <div className="container">
        {/* Vendor Header Banner */}
        <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border mb-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-warning text-dark p-3 rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ background: 'var(--wp-gold-gradient)' }}>
                <Store size={28} color="#FFFFFF" />
              </div>
              <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <h3 className="font-serif fw-bold text-dark mb-0">{user?.name || 'Royal Hospitality Group'}</h3>
                  <span className="badge bg-success bg-opacity-10 text-success fw-bold d-flex align-items-center gap-1">
                    <ShieldCheck size={14} /> Verified Partner
                  </span>
                </div>
                <span className="text-muted small">
                  Operating City: <strong>{user?.city || 'Lahore'}, Pakistan</strong> • Email: {user?.email}
                </span>
              </div>
            </div>

            <button 
              className="btn-gold py-2 px-4 fs-6 align-self-start align-self-md-center"
              onClick={() => setShowAddModal(true)}
            >
              <Plus size={18} /> Add New Listing
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="p-3 bg-white rounded-3 shadow-xs border">
              <span className="text-muted small d-block mb-1">Active Listings</span>
              <h4 className="fw-bold font-serif text-dark mb-0">{listings.filter(l => l.isActive).length}</h4>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="p-3 bg-white rounded-3 shadow-xs border">
              <span className="text-muted small d-block mb-1">Booking Requests</span>
              <h4 className="fw-bold font-serif text-warning mb-0">3 Pending</h4>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="p-3 bg-white rounded-3 shadow-xs border">
              <span className="text-muted small d-block mb-1">Customer Inquiries</span>
              <h4 className="fw-bold font-serif text-dark mb-0">18 This Month</h4>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="p-3 bg-white rounded-3 shadow-xs border">
              <span className="text-muted small d-block mb-1">Review Rating</span>
              <h4 className="fw-bold font-serif text-dark mb-0">★ 4.95 / 5.0</h4>
            </div>
          </div>
        </div>

        {/* Listings Table Card */}
        <div className="bg-white p-4 rounded-4 shadow-sm border mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="font-serif fw-bold text-dark mb-0">My Published Wedding Services</h5>
            <span className="text-muted small">{listings.length} Services Listed</span>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light small">
                <tr>
                  <th>Service Title</th>
                  <th>Category</th>
                  <th>City</th>
                  <th>Starting Rate (PKR)</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <strong className="d-block text-dark">{item.title}</strong>
                      <span className="text-muted small" style={{ fontSize: '0.75rem' }}>
                        Capacity: {item.capacity} Guests / Seats
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-light text-secondary border small">
                        {item.categoryName}
                      </span>
                    </td>
                    <td>{item.city}</td>
                    <td>
                      <strong className="text-dark">{formatPKR(item.startingPrice)}</strong>
                      <span className="text-muted small d-block" style={{ fontSize: '0.72rem' }}>{item.priceUnit}</span>
                    </td>
                    <td>
                      <button 
                        className={`badge border-0 ${item.isActive ? 'bg-success' : 'bg-secondary'} text-white small`}
                        onClick={() => toggleStatus(item.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        {item.isActive ? 'Active' : 'Paused'}
                      </button>
                    </td>
                    <td className="text-end">
                      <div className="d-inline-flex gap-2">
                        <button 
                          className="btn btn-outline-danger btn-sm p-1"
                          onClick={() => deleteListing(item.id)}
                          title="Delete Listing"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Incoming Wedding Booking Requests Queue */}
        <div className="bg-white p-4 rounded-4 shadow-sm border mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="font-serif fw-bold text-dark mb-1">Incoming Wedding Booking Requests</h5>
              <p className="text-muted small mb-0">Review slot reservation inquiries, confirm availability, or release blocked dates</p>
            </div>
            <span className="badge bg-warning text-dark px-3 py-2 small fw-bold">
              {bookingRequests.filter(b => b.status === 'pending').length} Pending Requests
            </span>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light small">
                <tr>
                  <th>Booking Ref</th>
                  <th>Customer Details</th>
                  <th>Requested Service & Event</th>
                  <th>Date & Time Slot</th>
                  <th>Headcount</th>
                  <th>Authoritative Total (PKR)</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookingRequests.length > 0 ? (
                  bookingRequests.map((b) => (
                    <tr key={b._id}>
                      <td>
                        <strong className="font-monospace small text-dark">{b.bookingNumber}</strong>
                      </td>
                      <td>
                        <strong className="d-block text-dark">{b.customer?.name || 'Valued Customer'}</strong>
                        <span className="text-muted small" style={{ fontSize: '0.75rem' }}>
                          {b.customer?.phone || b.customer?.email}
                        </span>
                      </td>
                      <td>
                        <strong className="d-block text-dark">{b.service?.title || 'Wedding Service'}</strong>
                        <span className="badge bg-light text-secondary border small">{b.eventName}</span>
                      </td>
                      <td>
                        <strong className="d-block text-dark small">{formatDate(b.eventDate)}</strong>
                        <span className="text-muted small text-capitalize" style={{ fontSize: '0.72rem' }}>{b.timeSlot} Slot</span>
                      </td>
                      <td>
                        <span className="small text-muted">{b.guestCount} Guests</span>
                      </td>
                      <td>
                        <strong className="text-success">{formatPKR(b.totalAmountPKR)}</strong>
                        {b.advanceDepositPKR > 0 && (
                          <span className="text-muted small d-block" style={{ fontSize: '0.72rem' }}>
                            20% Adv: {formatPKR(b.advanceDepositPKR)}
                          </span>
                        )}
                      </td>
                      <td>
                        <span className={`badge ${
                          b.status === 'accepted' ? 'bg-success' :
                          b.status === 'rejected' ? 'bg-danger' :
                          b.status === 'confirmed' ? 'bg-primary' :
                          b.status === 'pending' ? 'bg-warning text-dark' : 'bg-secondary'
                        } small text-uppercase`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="text-end">
                        {b.status === 'pending' ? (
                          <div className="d-inline-flex gap-2">
                            <button 
                              className="btn btn-success btn-sm py-1 px-2 d-flex align-items-center gap-1"
                              style={{ fontSize: '0.75rem' }}
                              onClick={() => handleAcceptBooking(b._id)}
                              title="Accept Booking"
                            >
                              <Check size={14} /> Accept
                            </button>
                            <button 
                              className="btn btn-outline-danger btn-sm py-1 px-2 d-flex align-items-center gap-1"
                              style={{ fontSize: '0.75rem' }}
                              onClick={() => handleRejectBooking(b._id)}
                              title="Reject Booking"
                            >
                              <X size={14} /> Decline
                            </button>
                          </div>
                        ) : (
                          <span className="text-muted small text-capitalize">{b.status}</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-muted">
                      No incoming booking requests found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal: Add New Listing */}
        {showAddModal && (
          <div 
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
            style={{ zIndex: 1100 }}
          >
            <div className="bg-white p-4 p-md-5 rounded-4 shadow-lg border" style={{ maxWidth: '580px', width: '90%' }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="font-serif fw-bold text-dark mb-0">Create Service Listing</h5>
                <button className="btn btn-close" onClick={() => setShowAddModal(false)}></button>
              </div>

              <form onSubmit={handleCreateListing} className="row g-3">
                <div className="col-12">
                  <label className="form-label small fw-bold">Service Title *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Royal Marquee Hall A"
                    required
                    value={newListing.title}
                    onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Service Category *</label>
                  <select 
                    className="form-select"
                    value={newListing.category}
                    onChange={(e) => setNewListing({ ...newListing, category: e.target.value })}
                  >
                    {CATEGORIES.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Operating City *</label>
                  <select 
                    className="form-select"
                    value={newListing.city}
                    onChange={(e) => setNewListing({ ...newListing, city: e.target.value })}
                  >
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Starting Price (PKR) *</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="e.g. 250000"
                    required
                    value={newListing.startingPrice}
                    onChange={(e) => setNewListing({ ...newListing, startingPrice: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Price Unit</label>
                  <select 
                    className="form-select"
                    value={newListing.priceUnit}
                    onChange={(e) => setNewListing({ ...newListing, priceUnit: e.target.value })}
                  >
                    <option value="per event slot">per event slot</option>
                    <option value="per day">per day</option>
                    <option value="per person / head">per person / head</option>
                    <option value="per trip">per trip</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold">Guest / Passenger Capacity</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="e.g. 500"
                    value={newListing.capacity}
                    onChange={(e) => setNewListing({ ...newListing, capacity: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold">Amenities / Key Inclusions</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. 100% Generator Backup, Bridal Room, Valet"
                    value={newListing.amenities}
                    onChange={(e) => setNewListing({ ...newListing, amenities: e.target.value })}
                  />
                </div>

                <div className="col-12 pt-2 d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-light border" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-gold">
                    Save & Publish Listing
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
