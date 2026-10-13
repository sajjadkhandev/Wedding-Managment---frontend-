import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Menu, 
  X, 
  Building2, 
  Car, 
  Utensils, 
  Camera, 
  PhoneCall, 
  User, 
  Store,
  ChevronDown,
  LogOut,
  LayoutDashboard,
  Bell,
  CheckCheck,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { notificationApi } from '../../services/api';
import NotificationHubModal from './NotificationHubModal';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [isNotifHubOpen, setIsNotifHubOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      _id: 'n-1',
      title: 'Booking Accepted!',
      message: 'The Royal Crystal Ballroom accepted your Baraat slot.',
      type: 'booking',
      isRead: false,
      time: '35m ago'
    },
    {
      _id: 'n-2',
      title: 'New RSVP Received',
      message: 'Dr. Kamran Siddiqui confirmed attending (3 members).',
      type: 'rsvp',
      isRead: false,
      time: '2h ago'
    },
    {
      _id: 'n-3',
      title: 'Official Invoice & Deposit Ready',
      message: '20% advance milestone bill generated for Rs. 70,000 for The Royal Crystal Ballroom.',
      type: 'payment',
      isRead: true,
      time: '5h ago'
    },
    {
      _id: 'n-4',
      title: 'Catering Menu Confirmed',
      message: 'Royal Dastarkhwan confirmed your customized wedding menu for 350 guests.',
      type: 'booking',
      isRead: true,
      time: '1d ago'
    }
  ]);
  const [unreadCount, setUnreadCount] = useState(2);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) return;
    let isMounted = true;
    async function fetchNotifs() {
      try {
        const res = await notificationApi.getMyNotifications();
        if (isMounted && res?.data?.notifications) {
          setNotifications(res.data.notifications);
          setUnreadCount(res.data.unreadCount || 0);
        }
      } catch {}
    }
    fetchNotifs();
    return () => { isMounted = false; };
  }, [isAuthenticated]);

  const handleMarkAllRead = async () => {
    try {
      await notificationApi.markAllAsRead();
    } catch {}
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    setUnreadCount(0);
  };

  const handleMarkAsRead = async (id) => {
    try {
      await notificationApi.markAsRead(id);
    } catch {}
    setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setUserDropdownOpen(false);
    setNotifDropdownOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    closeMenus();
    navigate('/');
  };

  const getDashboardPath = () => {
    if (user?.role === 'vendor') return '/vendor/dashboard';
    if (user?.role === 'admin') return '/admin/dashboard';
    return '/customer/dashboard';
  };

  return (
    <header className="sticky-top">
      {/* Top Announcement Bar */}
      <div className="top-announcement-bar">
        <div className="container d-flex justify-content-between align-items-center py-1">
          <div className="d-flex align-items-center gap-3">
            <span className="badge-demo">Demo Platform</span>
            <span>Serving Karachi, Lahore, Islamabad & 7+ major cities</span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className="text-warning fw-semibold">Currency: PKR (Rs.)</span>
            <span className="d-none d-md-inline text-secondary">|</span>
            <a 
              href="https://wa.me/923069122770?text=Assalam-o-Alaikum%20Sajjad%20Bhai,%20I%20want%20to%20inquire%20about%20WedPlan%20wedding%20services" 
              target="_blank" 
              rel="noreferrer" 
              className="text-light text-decoration-none d-none d-md-inline hover-gold"
            >
              <PhoneCall size={13} className="me-1 inline text-warning" /> WhatsApp / Helpline: 0306-9122770 (Sajjad Wazir)
            </a>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <nav className="nav-glass py-2 py-lg-3">
        <div className="container d-flex align-items-center justify-content-between">
          {/* Brand Logo */}
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none" onClick={closeMenus}>
            <img 
              src="/logo.jpg" 
              alt="WedPlan Pakistan Official Brand Logo" 
              className="rounded-circle shadow-sm"
              style={{ 
                width: '44px', 
                height: '44px', 
                objectFit: 'cover', 
                border: '1.5px solid var(--wp-gold, #C5A059)',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 2px 8px rgba(197, 160, 89, 0.25)'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="bg-warning text-dark p-2 rounded-circle d-none align-items-center justify-content-center shadow-sm" style={{ background: 'var(--wp-gold-gradient)', width: '44px', height: '44px' }}>
              <Sparkles size={22} color="#FFFFFF" />
            </div>
            <div>
              <span className="font-serif fw-bold fs-3 d-block lh-1" style={{ color: 'var(--wp-noir, #1F1A17)', letterSpacing: '-0.5px' }}>WedPlan</span>
              <span className="text-uppercase fw-bold" style={{ color: 'var(--wp-gold, #C5A059)', fontSize: '0.66rem', letterSpacing: '2px' }}>Pakistan</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="d-none d-lg-flex align-items-center gap-4">
            <NavLink to="/" className={({ isActive }) => `fw-semibold text-decoration-none ${isActive ? 'text-warning' : 'text-dark'}`} end>
              Home
            </NavLink>

            {/* Services Dropdown */}
            <div className="position-relative" onMouseLeave={() => setServicesDropdownOpen(false)}>
              <button 
                className="btn btn-link text-dark fw-semibold text-decoration-none p-0 d-flex align-items-center gap-1 border-0"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                onMouseEnter={() => setServicesDropdownOpen(true)}
              >
                Services <ChevronDown size={14} />
              </button>

              {servicesDropdownOpen && (
                <div 
                  className="position-absolute bg-white shadow-lg rounded-3 py-2 border mt-1" 
                  style={{ width: '260px', top: '100%', left: '-20px', zIndex: 1050 }}
                >
                  <Link to="/services" className="dropdown-item py-2 px-3 fw-bold border-bottom text-dark" onClick={closeMenus}>
                    Browse All Services
                  </Link>
                  <Link to="/services/venues" className="dropdown-item py-2 px-3 d-flex align-items-center gap-2" onClick={closeMenus}>
                    <Building2 size={16} className="text-warning" /> Wedding Venues & Halls
                  </Link>
                  <Link to="/services/cars" className="dropdown-item py-2 px-3 d-flex align-items-center gap-2" onClick={closeMenus}>
                    <Car size={16} className="text-warning" /> Bridal Car Rental
                  </Link>
                  <Link to="/services/catering" className="dropdown-item py-2 px-3 d-flex align-items-center gap-2" onClick={closeMenus}>
                    <Utensils size={16} className="text-warning" /> Catering & Food
                  </Link>
                  <Link to="/services/photography" className="dropdown-item py-2 px-3 d-flex align-items-center gap-2" onClick={closeMenus}>
                    <Camera size={16} className="text-warning" /> Photography & Cinema
                  </Link>
                  <Link to="/services/decoration" className="dropdown-item py-2 px-3 d-flex align-items-center gap-2" onClick={closeMenus}>
                    <Sparkles size={16} className="text-warning" /> Stage Decor & Florists
                  </Link>
                  <Link to="/services/makeup" className="dropdown-item py-2 px-3 d-flex align-items-center gap-2" onClick={closeMenus}>
                    <Sparkles size={16} className="text-warning" /> Bridal Salons & Makeup
                  </Link>
                  <Link to="/services/dresses" className="dropdown-item py-2 px-3 d-flex align-items-center gap-2" onClick={closeMenus}>
                    <Sparkles size={16} className="text-warning" /> Wedding Dresses
                  </Link>
                  <Link to="/services/planners" className="dropdown-item py-2 px-3 d-flex align-items-center gap-2" onClick={closeMenus}>
                    <Sparkles size={16} className="text-warning" /> Wedding Planners
                  </Link>
                </div>
              )}
            </div>

            <NavLink to="/vendors" className={({ isActive }) => `fw-semibold text-decoration-none ${isActive ? 'text-warning' : 'text-dark'}`}>
              Vendors
            </NavLink>

            <NavLink to="/packages" className={({ isActive }) => `fw-semibold text-decoration-none ${isActive ? 'text-warning' : 'text-dark'}`}>
              Packages
            </NavLink>

            <NavLink to="/how-it-works" className={({ isActive }) => `fw-semibold text-decoration-none ${isActive ? 'text-warning' : 'text-dark'}`}>
              How It Works
            </NavLink>

            <NavLink to="/about" className={({ isActive }) => `fw-semibold text-decoration-none ${isActive ? 'text-warning' : 'text-dark'}`}>
              About Us
            </NavLink>
          </div>

          {/* Desktop Auth State / Actions */}
          <div className="d-none d-lg-flex align-items-center gap-2">
            {isAuthenticated ? (
              <>
                {/* Notifications Bell Dropdown */}
                <div className="position-relative" onMouseLeave={() => setNotifDropdownOpen(false)}>
                  <button 
                    className="btn btn-light border p-2 rounded-circle position-relative shadow-xs"
                    onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                    title="Alerts & Notifications"
                  >
                    <Bell size={18} className="text-dark" />
                    {unreadCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {notifDropdownOpen && (
                    <div 
                      className="position-absolute bg-white shadow-lg rounded-4 py-2 border mt-2 end-0" 
                      style={{ width: '320px', zIndex: 1060 }}
                    >
                      <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
                        <strong className="text-dark small font-serif">Notifications ({unreadCount})</strong>
                        {unreadCount > 0 && (
                          <button 
                            className="btn btn-link btn-sm p-0 text-decoration-none small text-muted d-flex align-items-center gap-1"
                            onClick={handleMarkAllRead}
                            style={{ fontSize: '0.72rem' }}
                          >
                            <CheckCheck size={12} /> Mark all read
                          </button>
                        )}
                      </div>

                      <div className="overflow-auto" style={{ maxHeight: '280px' }}>
                        {notifications.length > 0 ? (
                          notifications.map((n) => (
                            <div 
                              key={n._id} 
                              className={`p-3 border-bottom text-start transition-all ${n.isRead ? 'bg-white' : 'bg-warning bg-opacity-10'}`}
                              style={{ cursor: 'pointer' }}
                              onClick={() => {
                                if (!n.isRead) handleMarkAsRead(n._id);
                                setNotifDropdownOpen(false);
                                setIsNotifHubOpen(true);
                              }}
                            >
                              <div className="d-flex justify-content-between align-items-start mb-1">
                                <strong className="text-dark small d-block font-serif">{n.title}</strong>
                                {!n.isRead && <span className="p-1 bg-danger rounded-circle"></span>}
                              </div>
                              <p className="text-muted small mb-1" style={{ fontSize: '0.75rem', lineHeight: '1.3' }}>
                                {n.message}
                              </p>
                              <div className="d-flex justify-content-between align-items-center mt-1">
                                <span className="text-muted" style={{ fontSize: '0.68rem' }}>{n.time || 'Recently'}</span>
                                <span className="text-warning small fw-semibold" style={{ fontSize: '0.68rem' }}>View Details →</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-muted small">
                            No notifications yet.
                          </div>
                        )}
                      </div>

                      <div className="p-2 border-top bg-light d-flex justify-content-between align-items-center px-3">
                        <button 
                          type="button"
                          className="btn btn-link btn-sm p-0 text-dark fw-bold text-decoration-none small d-flex align-items-center gap-1 hover-gold"
                          onClick={() => {
                            setNotifDropdownOpen(false);
                            setIsNotifHubOpen(true);
                          }}
                        >
                          <ExternalLink size={13} className="text-warning" />
                          <span>Open Full Hub</span>
                        </button>
                        <Link 
                          to={getDashboardPath()} 
                          className="text-muted small text-decoration-none hover-gold" 
                          onClick={closeMenus}
                          style={{ fontSize: '0.75rem' }}
                        >
                          Dashboard →
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Profile Dropdown */}
                <div className="position-relative" onMouseLeave={() => setUserDropdownOpen(false)}>
                  <button 
                    className="btn btn-light border py-1 px-3 d-flex align-items-center gap-2 rounded-pill shadow-xs"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  >
                  <div className="bg-warning text-dark rounded-circle p-1 d-flex align-items-center justify-content-center" style={{ width: '26px', height: '26px' }}>
                    <User size={14} />
                  </div>
                  <span className="fw-semibold text-dark small">{user.name.split(' ')[0]}</span>
                  <span className="badge bg-warning bg-opacity-25 text-dark small text-uppercase" style={{ fontSize: '0.65rem' }}>
                    {user.role}
                  </span>
                  <ChevronDown size={14} className="text-muted" />
                </button>

                {userDropdownOpen && (
                  <div 
                    className="position-absolute bg-white shadow-lg rounded-3 py-2 border mt-1 end-0" 
                    style={{ width: '220px', zIndex: 1050 }}
                  >
                    <div className="px-3 py-2 border-bottom">
                      <strong className="d-block text-dark small">{user.name}</strong>
                      <span className="text-muted small d-block text-truncate" style={{ fontSize: '0.75rem' }}>{user.email}</span>
                    </div>

                    <Link to={getDashboardPath()} className="dropdown-item py-2 px-3 d-flex align-items-center gap-2 small" onClick={closeMenus}>
                      <LayoutDashboard size={15} className="text-warning" /> My Dashboard
                    </Link>

                    <button 
                      onClick={handleLogout} 
                      className="dropdown-item py-2 px-3 d-flex align-items-center gap-2 small text-danger border-top mt-1"
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
              <>
                <Link to="/vendor-register" className="btn-outline-gold py-1 px-3 fs-6">
                  <Store size={16} /> List Your Business
                </Link>
                <Link to="/login" className="btn btn-light border py-1 px-3 fw-semibold">
                  <User size={16} className="me-1" /> Sign In
                </Link>
                <Link to="/register" className="btn-gold py-1 px-3 fs-6">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className="btn btn-outline-secondary d-lg-none p-2 border-0" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="d-lg-none bg-white border-top px-3 py-3 shadow-sm">
            <div className="d-flex flex-column gap-2">
              {isAuthenticated && (
                <div className="p-3 bg-light rounded-3 mb-2 border">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong className="d-block text-dark">{user.name}</strong>
                      <span className="badge bg-warning text-dark text-uppercase small">{user.role}</span>
                    </div>
                    <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">
                      <LogOut size={14} /> Logout
                    </button>
                  </div>
                  <div className="d-flex gap-2 mt-2">
                    <button 
                      type="button"
                      className="btn btn-outline-dark w-50 py-1 small d-flex align-items-center justify-content-center gap-1"
                      onClick={() => {
                        closeMenus();
                        setIsNotifHubOpen(true);
                      }}
                    >
                      <Bell size={13} className="text-warning" />
                      <span>Notifications ({unreadCount})</span>
                    </button>
                    <Link to={getDashboardPath()} className="btn-gold w-50 py-1 small text-center text-decoration-none" onClick={closeMenus}>
                      Dashboard
                    </Link>
                  </div>
                </div>
              )}

              <Link to="/" className="py-2 text-dark fw-semibold text-decoration-none border-bottom" onClick={closeMenus}>
                Home
              </Link>
              <Link to="/services" className="py-2 text-dark fw-semibold text-decoration-none border-bottom" onClick={closeMenus}>
                Browse All Services
              </Link>
              <Link to="/services/venues" className="py-2 ps-3 text-secondary text-decoration-none" onClick={closeMenus}>
                • Wedding Venues
              </Link>
              <Link to="/services/cars" className="py-2 ps-3 text-secondary text-decoration-none" onClick={closeMenus}>
                • Bridal Car Rental
              </Link>
              <Link to="/services/catering" className="py-2 ps-3 text-secondary text-decoration-none" onClick={closeMenus}>
                • Catering & Food
              </Link>
              <Link to="/services/photography" className="py-2 ps-3 text-secondary text-decoration-none" onClick={closeMenus}>
                • Photography & Video
              </Link>
              <Link to="/vendors" className="py-2 text-dark fw-semibold text-decoration-none border-bottom" onClick={closeMenus}>
                Browse Vendors
              </Link>
              <Link to="/packages" className="py-2 text-dark fw-semibold text-decoration-none border-bottom" onClick={closeMenus}>
                Wedding Packages
              </Link>
              <Link to="/how-it-works" className="py-2 text-dark fw-semibold text-decoration-none border-bottom" onClick={closeMenus}>
                How It Works
              </Link>
              <Link to="/about" className="py-2 text-dark fw-semibold text-decoration-none border-bottom" onClick={closeMenus}>
                About Us
              </Link>
              <Link to="/contact" className="py-2 text-dark fw-semibold text-decoration-none border-bottom" onClick={closeMenus}>
                Contact Us
              </Link>

              {!isAuthenticated && (
                <div className="d-flex flex-column gap-2 mt-3 pt-2 border-top">
                  <Link to="/vendor-register" className="btn-outline-gold text-center py-2" onClick={closeMenus}>
                    <Store size={16} /> List Your Business (Vendor)
                  </Link>
                  <div className="d-flex gap-2">
                    <Link to="/login" className="btn btn-light border flex-fill text-center py-2" onClick={closeMenus}>
                      Sign In
                    </Link>
                    <Link to="/register" className="btn-gold flex-fill text-center py-2" onClick={closeMenus}>
                      Register
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Full Notification & Activity Hub Modal */}
      <NotificationHubModal 
        isOpen={isNotifHubOpen}
        onClose={() => setIsNotifHubOpen(false)}
        notifications={notifications}
        unreadCount={unreadCount}
        onMarkAllRead={handleMarkAllRead}
        onMarkAsRead={handleMarkAsRead}
      />
    </header>
  );
};

export default Navbar;
