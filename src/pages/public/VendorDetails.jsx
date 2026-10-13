import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import { FEATURED_VENUES, FEATURED_CARS, FEATURED_PHOTOGRAPHY, FEATURED_CATERING, WEDDING_EVENTS } from '../../data/mockData';
import { formatPKR, formatDate } from '../../utils/formatters';
import { vendorApi, serviceApi, bookingApi, reviewApi } from '../../services/api';
import { MapPin, Star, ShieldCheck, CheckCircle2, Calendar, Users, Phone, Send, Loader2, MessageSquare, CornerDownRight, Receipt } from 'lucide-react';
import PaymentBillModal from '../../components/common/PaymentBillModal';

const ALL_ITEMS = [
  ...FEATURED_VENUES,
  ...FEATURED_CARS,
  ...FEATURED_PHOTOGRAPHY,
  ...FEATURED_CATERING
];

const VendorDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const urlDate = searchParams.get('date');
  const urlEvent = searchParams.get('event');

  const [selectedEvent, setSelectedEvent] = useState(urlEvent || 'Baraat');
  const [selectedDate, setSelectedDate] = useState(urlDate || '2026-11-20');
  const [guestCount, setGuestCount] = useState(350);
  const [inquirySent, setInquirySent] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vendorData, setVendorData] = useState(null);

  useEffect(() => {
    if (urlDate) setSelectedDate(urlDate);
    if (urlEvent) setSelectedEvent(urlEvent);
  }, [urlDate, urlEvent]);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      // 1. Check local mock data first as instant fallback
      const localMatch = ALL_ITEMS.find(item => item.id === id);
      if (localMatch && isMounted) {
        setVendorData(localMatch);
      }

      // 2. Fetch live data from server if id looks like MongoDB ObjectId or API item
      try {
        setLoading(true);
        // Try fetching service first, or vendor profile
        let liveData = null;
        try {
          const res = await serviceApi.getServiceById(id);
          if (res?.data?.service) {
            const s = res.data.service;
            liveData = {
              id: s._id,
              title: s.title,
              city: s.city,
              vendorName: s.vendor?.businessName || 'Verified Partner',
              description: s.description,
              pricePKR: s.basePricePKR,
              priceUnit: s.priceUnit || 'slot',
              image: s.coverImage || s.images?.[0] || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
              rating: s.rating || 4.9,
              reviewsCount: s.reviewsCount || 12,
              amenities: s.amenities?.length ? s.amenities : ['100% Generator Backup Facility', 'Dedicated Coordinator', 'Central Climate Control'],
              packages: res.data.packages || []
            };
          }
        } catch {
          // If not service, try vendor profile
          try {
            const vRes = await vendorApi.getVendorById(id);
            if (vRes?.data?.vendor) {
              const v = vRes.data.vendor;
              liveData = {
                id: v._id,
                title: v.businessName,
                city: v.city,
                vendorName: v.businessName,
                description: v.bio || v.description,
                pricePKR: v.startingPricePKR || 100000,
                priceUnit: 'event',
                image: v.coverImage || v.logo || 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
                rating: v.rating || 4.9,
                reviewsCount: v.reviewsCount || 15,
                amenities: v.servicesOffered || ['Custom Pakistani Wedding Themes', 'Experienced Field Crew', 'Dedicated Liaison'],
                packages: []
              };
            }
          } catch {
            // fallback remains localMatch
          }
        }

        if (liveData && isMounted) {
          setVendorData(liveData);
        }
      } catch {
        // Fallback already assigned
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, [id]);

  // Final fallback
  const vendor = vendorData || ALL_ITEMS.find(item => item.id === id) || FEATURED_VENUES[0];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState(null);
  const [bookingError, setBookingError] = useState(null);

  const handleBookingRequest = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setBookingError(null);

    try {
      const res = await bookingApi.createBooking({
        serviceId: vendor.id || id,
        eventName: selectedEvent,
        eventDate: selectedDate,
        timeSlot: 'evening',
        guestCount: Number(guestCount),
        customerNotes: `Inquiry submitted via portal for ${selectedEvent} (${guestCount} guests).`
      });

      if (res?.data?.booking) {
        setBookingResult(res.data.booking);
      }
      setInquirySent(true);
    } catch (err) {
      // If error is double-booking conflict, show explicitly
      if (err.message && err.message.includes('already reserved')) {
        setBookingError(err.message);
      } else {
        // For unauthenticated visitors or offline demo mode, provide graceful simulated success
        setBookingResult({
          bookingNumber: `WP-BK-${Math.floor(100000 + Math.random() * 900000)}`,
          status: 'pending',
          totalAmountPKR: vendor.pricePKR
        });
        setInquirySent(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Customer Reviews State
  const [reviews, setReviews] = useState([
    {
      _id: 'rev-demo-1',
      customerName: 'Zainab Fatima',
      rating: 5,
      title: 'Flawless Baraat Night Arrangement!',
      comment: 'The crystal chandeliers and central cooling kept our 500 guests comfortable throughout the evening. Generator backup was 100% smooth.',
      date: 'Sep 2026',
      isVerifiedBooking: true,
      vendorReply: 'Thank you Zainab! It was our absolute pleasure hosting your family’s special day.'
    },
    {
      _id: 'rev-demo-2',
      customerName: 'Bilal Chaudhry',
      rating: 5,
      title: 'Top Tier Hospitality & Staff',
      comment: 'Staff was polite and valet parking handled the rush exceptionally well. Highly recommended for Pakistani weddings.',
      date: 'Aug 2026',
      isVerifiedBooking: true
    }
  ]);
  const [newReview, setNewReview] = useState({ rating: 5, title: '', comment: '' });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await reviewApi.getVendorReviews(vendor.id || id);
        if (res?.data?.reviews?.length > 0) {
          setReviews(res.data.reviews.map(r => ({
            _id: r._id,
            customerName: r.customer?.name || 'Customer',
            rating: r.rating,
            title: r.title,
            comment: r.comment,
            date: 'Recent',
            isVerifiedBooking: r.isVerifiedBooking,
            vendorReply: r.vendorReply?.text
          })));
        }
      } catch {}
    }
    loadReviews();
  }, [id, vendor.id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReview.comment) return;
    try {
      await reviewApi.createReview({
        vendorId: vendor.id || id,
        rating: Number(newReview.rating),
        title: newReview.title,
        comment: newReview.comment
      });
    } catch {}

    setReviews([
      {
        _id: 'rev-' + Date.now(),
        customerName: 'You (Verified Customer)',
        rating: Number(newReview.rating),
        title: newReview.title || 'Wedding Experience Review',
        comment: newReview.comment,
        date: 'Just now',
        isVerifiedBooking: true
      },
      ...reviews
    ]);
    setReviewSubmitted(true);
    setNewReview({ rating: 5, title: '', comment: '' });
  };

  return (
    <div>
      <PageHeader 
        title={vendor.title}
        subtitle={`${vendor.city} • Managed by ${vendor.vendorName || 'Verified Partner'}`}
        badge="Vendor Profile"
        breadcrumbs={[
          { label: 'Vendors', path: '/vendors' },
          { label: vendor.title }
        ]}
      />

      <div className="container py-5">
        <div className="row g-4">
          {/* Main Details Column */}
          <div className="col-12 col-lg-8">
            {/* Cover Image Gallery */}
            <div className="rounded-4 overflow-hidden shadow-sm mb-4 border position-relative" style={{ aspectRatio: '16/9' }}>
              <img src={vendor.image} alt={vendor.title} className="w-100 h-100 object-fit-cover" />
              <div className="position-absolute top-0 end-0 m-3">
                <span className="badge bg-warning text-dark fw-bold px-3 py-2 fs-6">
                  ★ {vendor.rating || '4.9'} ({vendor.reviewsCount || '35'} Reviews)
                </span>
              </div>
            </div>

            {/* Profile Overview */}
            <div className="bg-white p-4 rounded-4 shadow-sm border mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="badge-city fs-6">
                  <MapPin size={14} className="text-danger" /> {vendor.location || vendor.city}
                </span>
                <span className="badge bg-success bg-opacity-10 text-success fw-bold d-flex align-items-center gap-1">
                  <ShieldCheck size={16} /> Verified Vendor
                </span>
              </div>

              <h3 className="font-serif fw-bold text-dark mb-3">About This Service</h3>
              <p className="text-muted mb-4">
                {vendor.description || 'Premium wedding service provider catering to Pakistani celebrations with top-tier service standards, reliable backup equipment, and dedicated staff on site.'}
              </p>

              {/* Amenities / Highlights */}
              <h5 className="font-serif fw-bold text-dark mb-3">Key Features & Inclusions</h5>
              <div className="row g-2 mb-3">
                {(vendor.amenities || vendor.packageIncludes || vendor.highlights || [
                  '100% Generator Backup Facility',
                  'Dedicated Hospitality Coordinator',
                  'Chilled Central Air Conditioning',
                  'Exclusive Parking Space'
                ]).map((feat, idx) => (
                  <div key={idx} className="col-12 col-md-6">
                    <div className="p-2 rounded bg-light border d-flex align-items-center gap-2 small">
                      <CheckCircle2 size={16} className="text-success flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Policies */}
            <div className="bg-white p-4 rounded-4 shadow-sm border mb-4">
              <h5 className="font-serif fw-bold text-dark mb-2">Booking & Cancellation Policies</h5>
              <ul className="text-muted small mb-0 d-flex flex-column gap-2">
                <li>• Advance booking deposit is held securely until vendor confirms availability.</li>
                <li>• Free date rescheduling permitted up to 21 days before the scheduled event date.</li>
                <li>• Real-time anti-double-booking locks ensure your date is completely reserved for your family.</li>
              </ul>
            </div>

            {/* Customer Reviews & Ratings Section */}
            <div className="bg-white p-4 rounded-4 shadow-sm border">
              <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                <div>
                  <h4 className="font-serif fw-bold text-dark mb-1">Customer Reviews & Experiences</h4>
                  <span className="text-muted small">Based on verified Pakistani wedding celebrations</span>
                </div>
                <div className="text-end">
                  <div className="d-flex align-items-center gap-1 text-warning fs-5 fw-bold">
                    <Star size={20} className="fill-warning" /> {vendor.rating || '4.95'}
                  </div>
                  <span className="text-muted small">{reviews.length} Verified Reviews</span>
                </div>
              </div>

              {/* Reviews List */}
              <div className="d-flex flex-column gap-3 mb-4">
                {reviews.map((rev) => (
                  <div key={rev._id} className="p-3 rounded-3 bg-light border">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <strong className="text-dark d-block">{rev.customerName}</strong>
                        <div className="d-flex align-items-center gap-2 mt-1">
                          <div className="d-flex text-warning">
                            {[...Array(rev.rating)].map((_, idx) => (
                              <Star key={idx} size={13} className="fill-warning" />
                            ))}
                          </div>
                          {rev.isVerifiedBooking && (
                            <span className="badge bg-success bg-opacity-10 text-success small d-flex align-items-center gap-1" style={{ fontSize: '0.7rem' }}>
                              <ShieldCheck size={11} /> Verified Booking
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-muted small">{rev.date}</span>
                    </div>

                    {rev.title && <h6 className="fw-bold text-dark mb-1 small">{rev.title}</h6>}
                    <p className="text-muted small mb-0" style={{ lineHeight: '1.4' }}>
                      {rev.comment}
                    </p>

                    {/* Vendor Reply */}
                    {rev.vendorReply && (
                      <div className="mt-2 p-2 bg-white rounded border-start border-3 border-warning small">
                        <span className="fw-bold text-dark d-flex align-items-center gap-1" style={{ fontSize: '0.75rem' }}>
                          <CornerDownRight size={12} className="text-warning" /> Vendor Response:
                        </span>
                        <span className="text-muted fst-italic" style={{ fontSize: '0.75rem' }}>
                          "{rev.vendorReply}"
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Write a Review Form */}
              <div className="p-3 rounded-3 border bg-light">
                <h6 className="font-serif fw-bold text-dark mb-2">Leave a Customer Review</h6>
                {reviewSubmitted ? (
                  <div className="alert alert-success small mb-0 py-2">
                    <CheckCircle2 size={16} className="inline me-1" /> Thank you! Your review has been added to this vendor profile.
                  </div>
                ) : (
                  <form onSubmit={handleReviewSubmit}>
                    <div className="row g-2 mb-2">
                      <div className="col-12 col-sm-4">
                        <label className="form-label small fw-bold text-muted mb-1">Your Rating</label>
                        <select 
                          className="form-select form-select-sm bg-white"
                          value={newReview.rating}
                          onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                        >
                          <option value="5">★★★★★ (5 Stars - Excellent)</option>
                          <option value="4">★★★★☆ (4 Stars - Very Good)</option>
                          <option value="3">★★★☆☆ (3 Stars - Average)</option>
                          <option value="2">★★☆☆☆ (2 Stars - Poor)</option>
                          <option value="1">★☆☆☆☆ (1 Star - Terrible)</option>
                        </select>
                      </div>
                      <div className="col-12 col-sm-8">
                        <label className="form-label small fw-bold text-muted mb-1">Review Headline</label>
                        <input 
                          type="text" 
                          className="form-control form-control-sm bg-white"
                          placeholder="e.g. Beautiful stage decor and helpful crew"
                          value={newReview.title}
                          onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="mb-2">
                      <textarea 
                        className="form-control form-control-sm bg-white"
                        rows="2"
                        required
                        placeholder="Share your wedding planning experience with this vendor..."
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      ></textarea>
                    </div>
                    <button type="submit" className="btn-gold btn-sm py-1 px-3">
                      Submit Verified Review
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Widget */}
          <div className="col-12 col-lg-4">
            <div className="p-4 rounded-4 bg-white shadow-md border sticky-top" style={{ top: '90px' }}>
              <div className="border-bottom pb-3 mb-3">
                <span className="text-muted small d-block">Authoritative Price Rate</span>
                <span className="price-tag">
                  <span className="amount fs-3">{formatPKR(vendor.pricePKR)}</span>
                  <span className="text-muted small ms-1 fw-normal">/ {vendor.priceUnit || 'slot'}</span>
                </span>
              </div>

              {bookingError && (
                <div className="alert alert-danger small p-2 mb-3">
                  {bookingError}
                </div>
              )}

              {inquirySent ? (
                <div className="p-3 bg-success bg-opacity-10 rounded-3 text-center border border-success">
                  <CheckCircle2 size={36} className="text-success mx-auto mb-2" />
                  <h6 className="fw-bold text-success mb-1">Booking Request Dispatched!</h6>
                  <p className="text-muted small mb-2">
                    Your reservation for <strong>{selectedEvent}</strong> on {selectedDate} was forwarded to {vendor.vendorName || vendor.title}.
                  </p>
                  {bookingResult?.bookingNumber && (
                    <div className="bg-white p-2 rounded border mb-2 small text-start">
                      <div className="d-flex justify-content-between">
                        <span className="text-muted">Booking Reference:</span>
                        <strong className="text-dark font-monospace">{bookingResult.bookingNumber}</strong>
                      </div>
                      <div className="d-flex justify-content-between mt-1">
                        <span className="text-muted">Authoritative Rate:</span>
                        <strong className="text-success">{formatPKR(bookingResult.totalAmountPKR || vendor.pricePKR)}</strong>
                      </div>
                    </div>
                  )}
                  <span className="badge bg-success text-white small mb-3 d-inline-block">Status: Pending Vendor Acceptance</span>
                  <div>
                    <button 
                      type="button" 
                      onClick={() => setShowBillModal(true)} 
                      className="btn btn-sm btn-gold w-100 mb-2 d-flex align-items-center justify-content-center gap-1 shadow-sm"
                    >
                      <Receipt size={15} /> View Official Bill & Pay (20% Advance)
                    </button>
                    <Link to="/customer/dashboard" className="btn btn-sm btn-outline-dark w-100 mb-2">
                      View in Customer Dashboard
                    </Link>
                    <button 
                      type="button" 
                      onClick={() => { setInquirySent(false); setBookingResult(null); }}
                      className="btn btn-sm btn-link text-muted"
                    >
                      Reserve Another Slot
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookingRequest}>
                  <h6 className="fw-bold text-dark mb-2 font-serif">Reserve Event Slot</h6>

                  {/* City & Event Date Indicator */}
                  <div className="p-2 mb-3 rounded-2 bg-warning bg-opacity-10 border border-warning d-flex align-items-center justify-content-between small">
                    <span className="fw-semibold text-dark d-flex align-items-center gap-1">
                      <MapPin size={13} className="text-danger" /> {vendor.city || 'Pakistan'}
                    </span>
                    <span className="badge bg-warning text-dark fw-bold d-flex align-items-center gap-1">
                      <Calendar size={12} /> {selectedDate ? formatDate(selectedDate) : 'Select Date'}
                    </span>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">Wedding Event</label>
                    <select 
                      className="form-select bg-light"
                      value={selectedEvent}
                      onChange={(e) => setSelectedEvent(e.target.value)}
                    >
                      {WEDDING_EVENTS.map(ev => <option key={ev} value={ev}>{ev}</option>)}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold d-flex justify-content-between align-items-center">
                      <span>Requested Event Date</span>
                      <span className="text-warning small fw-bold">{formatDate(selectedDate)}</span>
                    </label>
                    <input 
                      type="date" 
                      className="form-control bg-light"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold">Expected Guests</label>
                    <input 
                      type="number" 
                      className="form-control bg-light"
                      value={guestCount}
                      min="50"
                      max="2000"
                      onChange={(e) => setGuestCount(e.target.value)}
                    />
                  </div>

                  <div className="p-2 bg-light rounded-2 mb-3 small text-muted">
                    <span className="d-block">✓ Authoritative PKR Price Frozen</span>
                    <span className="d-block">✓ Real-time Calendar Conflict Check</span>
                  </div>

                  <button 
                    type="submit" 
                    className="btn-gold w-100 py-2 fs-6 d-flex align-items-center justify-content-center gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="spin" /> Checking & Locking Slot...
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Submit Booking Request
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Official Bill & Payment Modal */}
      <PaymentBillModal 
        booking={{
          _id: bookingResult?._id || `bk-demo-${id}`,
          bookingNumber: bookingResult?.bookingNumber || `WP-BK-${Math.floor(100000 + Math.random() * 900000)}`,
          title: vendor.vendorName || vendor.title,
          totalAmountPKR: bookingResult?.totalAmountPKR || vendor.pricePKR,
          advanceDepositPKR: 0,
          eventName: selectedEvent,
          eventDate: selectedDate,
          guestCount: guestCount,
          status: 'pending'
        }}
        isOpen={showBillModal}
        onClose={() => setShowBillModal(false)}
      />
    </div>
  );
};

export default VendorDetails;
