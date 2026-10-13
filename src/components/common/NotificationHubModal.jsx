import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Bell, 
  CheckCheck, 
  Calendar, 
  Users, 
  Receipt, 
  Store, 
  Clock, 
  ExternalLink, 
  ArrowRight, 
  Filter, 
  CheckCircle2, 
  Sparkles, 
  PhoneCall, 
  MessageCircle,
  CreditCard,
  ShieldCheck,
  Check
} from 'lucide-react';
import { formatDate } from '../../utils/formatters';

const NotificationHubModal = ({ 
  isOpen, 
  onClose, 
  notifications = [], 
  unreadCount = 0, 
  onMarkAllRead, 
  onMarkAsRead 
}) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all'); // 'all' | 'unread' | 'booking' | 'payment' | 'rsvp'

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = 'auto';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter logic
  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.isRead;
    if (filter === 'booking') return n.type === 'booking' || n.type === 'booking_accepted' || n.title?.toLowerCase().includes('booking');
    if (filter === 'payment') return n.type === 'payment' || n.type === 'payment_received' || n.title?.toLowerCase().includes('bill') || n.title?.toLowerCase().includes('invoice') || n.title?.toLowerCase().includes('deposit');
    if (filter === 'rsvp') return n.type === 'rsvp' || n.type === 'general' || n.title?.toLowerCase().includes('rsvp') || n.title?.toLowerCase().includes('guest');
    return true;
  });

  const getNotificationIcon = (n) => {
    const t = (n.type || '').toLowerCase();
    const title = (n.title || '').toLowerCase();
    if (t.includes('booking') || title.includes('booking') || title.includes('slot')) {
      return <Store size={18} className="text-warning" />;
    }
    if (t.includes('payment') || title.includes('payment') || title.includes('deposit') || title.includes('bill') || title.includes('invoice')) {
      return <Receipt size={18} className="text-success" />;
    }
    if (t.includes('rsvp') || title.includes('rsvp') || title.includes('guest')) {
      return <Users size={18} className="text-primary" />;
    }
    return <Sparkles size={18} className="text-warning" />;
  };

  const getNotificationBadge = (n) => {
    const t = (n.type || '').toLowerCase();
    const title = (n.title || '').toLowerCase();
    if (t.includes('booking') || title.includes('booking') || title.includes('slot')) {
      return <span className="badge bg-warning bg-opacity-25 text-dark fw-semibold" style={{ fontSize: '0.68rem' }}>Venue Booking</span>;
    }
    if (t.includes('payment') || title.includes('payment') || title.includes('deposit') || title.includes('bill') || title.includes('invoice')) {
      return <span className="badge bg-success bg-opacity-25 text-success fw-semibold" style={{ fontSize: '0.68rem' }}>Billing Milestone</span>;
    }
    if (t.includes('rsvp') || title.includes('rsvp') || title.includes('guest')) {
      return <span className="badge bg-info bg-opacity-25 text-dark fw-semibold" style={{ fontSize: '0.68rem' }}>Guest RSVP</span>;
    }
    return <span className="badge bg-secondary bg-opacity-25 text-secondary fw-semibold" style={{ fontSize: '0.68rem' }}>Activity Alert</span>;
  };

  const handleActionClick = (n) => {
    if (onMarkAsRead && !n.isRead) {
      onMarkAsRead(n._id);
    }
    onClose();

    const t = (n.type || '').toLowerCase();
    const title = (n.title || '').toLowerCase();

    if (t.includes('payment') || title.includes('payment') || title.includes('deposit') || title.includes('bill') || title.includes('invoice')) {
      navigate('/customer/dashboard?tab=bills');
    } else if (t.includes('rsvp') || title.includes('rsvp') || title.includes('guest')) {
      navigate('/customer/dashboard?tab=guests');
    } else if (t.includes('booking') || title.includes('booking') || title.includes('slot')) {
      navigate('/customer/dashboard?tab=bookings');
    } else if (n.link) {
      navigate(n.link);
    } else {
      navigate('/customer/dashboard');
    }
  };

  return (
    <div 
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
      style={{
        zIndex: 1070,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(6px)'
      }}
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-4 shadow-2xl border overflow-hidden d-flex flex-column"
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '88vh',
          animation: 'fadeInUp 0.25s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 border-bottom bg-dark text-white position-relative" style={{ borderBottom: '2px solid var(--wp-gold)' }}>
          <div className="d-flex justify-content-between align-items-start">
            <div className="d-flex align-items-center gap-3">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center shadow"
                style={{ 
                  width: '46px', 
                  height: '46px', 
                  backgroundColor: 'rgba(197, 160, 89, 0.2)',
                  border: '1px solid var(--wp-gold)' 
                }}
              >
                <Bell size={22} className="text-warning" />
              </div>
              <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <h5 className="font-serif fw-bold mb-0 text-white">WedPlan Notification Hub</h5>
                  {unreadCount > 0 ? (
                    <span className="badge rounded-pill bg-danger px-2 py-1" style={{ fontSize: '0.7rem' }}>
                      {unreadCount} New
                    </span>
                  ) : (
                    <span className="badge rounded-pill bg-success px-2 py-1" style={{ fontSize: '0.7rem' }}>
                      All Caught Up
                    </span>
                  )}
                </div>
                <p className="text-light text-opacity-75 small mb-0" style={{ fontSize: '0.8rem' }}>
                  Real-time updates on vendor booking confirmations, RSVP submissions and invoice receipts.
                </p>
              </div>
            </div>

            <button 
              type="button"
              className="btn btn-outline-light btn-sm rounded-circle p-1 border-0"
              onClick={onClose}
              title="Close Notification Hub"
              style={{ width: '32px', height: '32px' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Action bar inside Header */}
          <div className="d-flex justify-content-between align-items-center mt-3 pt-3 border-top border-secondary border-opacity-50">
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-warning bg-opacity-20 text-warning border border-warning border-opacity-30 small">
                Live Activity Stream
              </span>
              <span className="text-light text-opacity-50 small" style={{ fontSize: '0.75rem' }}>
                Total: {notifications.length} notifications
              </span>
            </div>

            {unreadCount > 0 && (
              <button 
                type="button"
                className="btn btn-sm btn-outline-warning py-1 px-3 rounded-pill d-flex align-items-center gap-1 small"
                onClick={onMarkAllRead}
                style={{ fontSize: '0.75rem' }}
              >
                <CheckCheck size={14} /> Mark All as Read
              </button>
            )}
          </div>
        </div>

        {/* Filter Navigation Bar */}
        <div className="px-4 py-2 border-bottom bg-light d-flex flex-wrap gap-2 align-items-center justify-content-between">
          <div className="d-flex flex-wrap gap-1">
            <button 
              type="button"
              className={`btn btn-sm rounded-pill px-3 py-1 ${filter === 'all' ? 'btn-gold shadow-xs' : 'btn-white border text-secondary'}`}
              onClick={() => setFilter('all')}
              style={{ fontSize: '0.78rem' }}
            >
              All ({notifications.length})
            </button>
            <button 
              type="button"
              className={`btn btn-sm rounded-pill px-3 py-1 ${filter === 'unread' ? 'btn-gold shadow-xs' : 'btn-white border text-secondary'}`}
              onClick={() => setFilter('unread')}
              style={{ fontSize: '0.78rem' }}
            >
              Unread ({unreadCount})
            </button>
            <button 
              type="button"
              className={`btn btn-sm rounded-pill px-3 py-1 ${filter === 'booking' ? 'btn-gold shadow-xs' : 'btn-white border text-secondary'}`}
              onClick={() => setFilter('booking')}
              style={{ fontSize: '0.78rem' }}
            >
              Bookings
            </button>
            <button 
              type="button"
              className={`btn btn-sm rounded-pill px-3 py-1 ${filter === 'payment' ? 'btn-gold shadow-xs' : 'btn-white border text-secondary'}`}
              onClick={() => setFilter('payment')}
              style={{ fontSize: '0.78rem' }}
            >
              Bills & Payments
            </button>
            <button 
              type="button"
              className={`btn btn-sm rounded-pill px-3 py-1 ${filter === 'rsvp' ? 'btn-gold shadow-xs' : 'btn-white border text-secondary'}`}
              onClick={() => setFilter('rsvp')}
              style={{ fontSize: '0.78rem' }}
            >
              RSVP Guests
            </button>
          </div>
        </div>

        {/* Notifications Scrollable List */}
        <div className="overflow-auto flex-grow-1 p-3 p-md-4" style={{ backgroundColor: 'var(--wp-bg-main)' }}>
          {filteredNotifications.length > 0 ? (
            <div className="d-flex flex-column gap-3">
              {filteredNotifications.map((n) => {
                const isItemRead = n.isRead;
                return (
                  <div 
                    key={n._id}
                    className={`bg-white rounded-3 p-3 p-md-4 border shadow-xs transition-all position-relative ${
                      !isItemRead ? 'border-warning' : 'border-light'
                    }`}
                    style={{
                      borderLeftWidth: !isItemRead ? '5px' : '1px',
                      borderLeftColor: !isItemRead ? 'var(--wp-gold)' : '#e2e8f0'
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                      <div className="d-flex align-items-center gap-2">
                        <div 
                          className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                          style={{ backgroundColor: !isItemRead ? 'rgba(197, 160, 89, 0.15)' : '#f8fafc' }}
                        >
                          {getNotificationIcon(n)}
                        </div>
                        <div>
                          <div className="d-flex align-items-center gap-2">
                            <h6 className="fw-bold text-dark mb-0 font-serif" style={{ fontSize: '0.95rem' }}>
                              {n.title}
                            </h6>
                            {!isItemRead && (
                              <span className="badge rounded-pill bg-danger px-1 py-0" style={{ fontSize: '0.62rem' }}>
                                NEW
                              </span>
                            )}
                          </div>
                          <div className="d-flex align-items-center gap-2 mt-1">
                            {getNotificationBadge(n)}
                            <span className="text-muted d-flex align-items-center gap-1" style={{ fontSize: '0.72rem' }}>
                              <Clock size={11} /> {n.time || (n.createdAt ? formatDate(n.createdAt) : 'Recently')}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Read status toggle button */}
                      <div className="d-flex align-items-center gap-1">
                        {!isItemRead ? (
                          <button 
                            type="button"
                            className="btn btn-outline-secondary btn-sm p-1 rounded border-0"
                            title="Mark as read"
                            onClick={() => onMarkAsRead && onMarkAsRead(n._id)}
                            style={{ fontSize: '0.72rem' }}
                          >
                            <Check size={14} className="text-muted" />
                          </button>
                        ) : (
                          <span className="text-muted small px-1" title="Read" style={{ fontSize: '0.7rem' }}>
                            <CheckCheck size={14} className="text-success" />
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-secondary small mb-3 ps-md-5" style={{ fontSize: '0.84rem', lineHeight: '1.5' }}>
                      {n.message}
                    </p>

                    {/* Bottom Action Footer for each notification */}
                    <div className="d-flex flex-wrap justify-content-between align-items-center ps-md-5 pt-2 border-top gap-2">
                      <div className="d-flex align-items-center gap-2">
                        <span className="text-muted small" style={{ fontSize: '0.72rem' }}>
                          Verified via WedPlan Engine
                        </span>
                      </div>

                      <div className="d-flex gap-2">
                        <button 
                          type="button"
                          className="btn btn-sm btn-gold py-1 px-3 rounded-pill d-flex align-items-center gap-1"
                          style={{ fontSize: '0.78rem' }}
                          onClick={() => handleActionClick(n)}
                        >
                          <span>Open Details</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-5 bg-white rounded-3 border">
              <div 
                className="mx-auto rounded-circle d-flex align-items-center justify-content-center mb-3 bg-light"
                style={{ width: '60px', height: '60px' }}
              >
                <CheckCircle2 size={30} className="text-success" />
              </div>
              <h6 className="fw-bold text-dark font-serif mb-1">No Notifications In This Filter</h6>
              <p className="text-muted small mb-3">
                {filter === 'unread' 
                  ? "Great job! You have reviewed all notifications." 
                  : "There are currently no notifications matching this category."}
              </p>
              <button 
                type="button"
                className="btn btn-sm btn-outline-gold rounded-pill px-3"
                onClick={() => setFilter('all')}
              >
                Show All Notifications
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-white border-top d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">
          <div className="d-flex align-items-center gap-2 text-muted small" style={{ fontSize: '0.78rem' }}>
            <PhoneCall size={13} className="text-warning" />
            <span>Dedicated Support: <strong>0306-9122770</strong> (Sajjad Wazir)</span>
          </div>

          <div className="d-flex align-items-center gap-2 w-100 w-sm-auto justify-content-end">
            <button 
              type="button"
              className="btn btn-light border btn-sm px-3 rounded-pill"
              onClick={onClose}
            >
              Close
            </button>
            <button 
              type="button"
              className="btn btn-gold btn-sm px-3 rounded-pill d-flex align-items-center gap-1"
              onClick={() => {
                onClose();
                navigate('/customer/dashboard');
              }}
            >
              <span>Go to My Dashboard</span>
              <ExternalLink size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationHubModal;
