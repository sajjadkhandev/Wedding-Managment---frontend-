import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { formatPKR, formatDate } from '../../utils/formatters';
import { WEDDING_EVENTS, CITIES } from '../../data/mockData';
import { bookingApi, planningApi, notificationApi } from '../../services/api';
import { 
  Heart, 
  Calendar, 
  MapPin, 
  Users, 
  Banknote, 
  Clock, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  Store, 
  Trash2,
  Edit2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  XCircle,
  FileText,
  CheckSquare,
  Square,
  Layers,
  Filter,
  Check,
  Receipt,
  Printer,
  CreditCard,
  Bell,
  CheckCheck,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import PaymentBillModal from '../../components/common/PaymentBillModal';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlTab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(urlTab || 'timeline'); // 'timeline' | 'bookings' | 'budget' | 'guests' | 'tasks' | 'bills' | 'notifications'

  useEffect(() => {
    if (urlTab) {
      setActiveTab(urlTab);
    }
  }, [urlTab]);

  const [notifFilter, setNotifFilter] = useState('all');
  const [dashboardNotifications, setDashboardNotifications] = useState([
    {
      _id: 'notif-1',
      title: 'Booking Request Accepted!',
      message: 'The Royal Crystal Ballroom has accepted your slot reservation for Baraat on 20 Nov 2026.',
      type: 'booking',
      time: '35m ago',
      isRead: false
    },
    {
      _id: 'notif-2',
      title: 'New Guest RSVP Received',
      message: 'Dr. Kamran Siddiqui confirmed attending for 3 members.',
      type: 'rsvp',
      time: '2h ago',
      isRead: false
    },
    {
      _id: 'notif-3',
      title: 'Installment Reminder: Catering Deposit',
      message: 'Rs. 200,000 catering deposit milestone recorded for Royal Dastarkhwan.',
      type: 'payment',
      time: '4h ago',
      isRead: true
    },
    {
      _id: 'notif-4',
      title: 'Official 20% Milestone Bill Generated',
      message: 'Official Tax Invoice #WP-INV-829101 ready for instant online payment.',
      type: 'payment',
      time: '1d ago',
      isRead: true
    }
  ]);

  // Bill & Payment Modal State
  const [selectedBillBooking, setSelectedBillBooking] = useState(null);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);

  const handleOpenBill = (bookingItem) => {
    setSelectedBillBooking(bookingItem);
    setIsBillModalOpen(true);
  };

  const handlePaymentSuccess = ({ bookingId, amountPaid }) => {
    setBookings(prev => prev.map(b => {
      if (b._id === bookingId) {
        return {
          ...b,
          advanceDepositPKR: amountPaid,
          status: 'confirmed'
        };
      }
      return b;
    }));
  };

  // 1. Wedding Project & Events State
  const [project, setProject] = useState({
    _id: 'proj-demo-1',
    title: user?.name ? `${user.name.split(' ')[0]}’s Wedding Celebration` : 'Our Royal Pakistani Wedding',
    city: user?.city || 'Lahore',
    totalBudgetPKR: 3500000,
    mainWeddingDate: '2026-11-20',
    guestCount: 450
  });

  const [events, setEvents] = useState([
    {
      id: 'ev-1',
      eventType: 'Mehndi',
      customTitle: 'Festive Mehndi & Dholki Night',
      date: '2026-11-18',
      startTime: '19:00',
      endTime: '23:30',
      location: 'Mughal Heritage Lawn, Lahore',
      expectedGuests: 250,
      venueBooked: true,
      status: 'upcoming'
    },
    {
      id: 'ev-2',
      eventType: 'Baraat',
      customTitle: 'Grand Baraat Reception',
      date: '2026-11-20',
      startTime: '19:30',
      endTime: '23:30',
      location: 'The Royal Crystal Ballroom, Gulberg III',
      expectedGuests: 500,
      venueBooked: true,
      status: 'upcoming'
    },
    {
      id: 'ev-3',
      eventType: 'Walima',
      customTitle: 'Elegant Walima Dinner',
      date: '2026-11-22',
      startTime: '20:00',
      endTime: '23:30',
      location: 'Pearl Continental Grand Hall',
      expectedGuests: 400,
      venueBooked: false,
      status: 'upcoming'
    }
  ]);

  // 2. Bookings State
  const [bookings, setBookings] = useState([
    {
      _id: 'bk-demo-1',
      bookingNumber: 'WP-BK-829101',
      service: { title: 'The Royal Crystal Ballroom' },
      vendor: { businessName: 'Royal Hospitality Group' },
      eventName: 'Baraat',
      eventDate: '2026-11-20',
      totalAmountPKR: 350000,
      advanceDepositPKR: 70000,
      status: 'confirmed'
    },
    {
      _id: 'bk-demo-2',
      bookingNumber: 'WP-BK-918234',
      service: { title: 'Executive Rolls Royce Bridal Escort' },
      vendor: { businessName: 'Executive Bridal Limousines' },
      eventName: 'Baraat',
      eventDate: '2026-11-20',
      totalAmountPKR: 95000,
      advanceDepositPKR: 20000,
      status: 'pending'
    }
  ]);

  // 3. Expenses & Budget State
  const [expenses, setExpenses] = useState([
    {
      _id: 'exp-demo-1',
      category: 'venue',
      title: 'Royal Crystal Ballroom - Hall Rental',
      estimatedCostPKR: 350000,
      actualCostPKR: 350000,
      paidAmountPKR: 70000,
      status: 'deposit_paid'
    },
    {
      _id: 'exp-demo-2',
      category: 'catering',
      title: 'Mutton Biryani + Live BBQ (450 heads)',
      estimatedCostPKR: 850000,
      actualCostPKR: 832500,
      paidAmountPKR: 200000,
      status: 'deposit_paid'
    },
    {
      _id: 'exp-demo-3',
      category: 'photography',
      title: 'Cinematic Coverage & Studio Shoot',
      estimatedCostPKR: 160000,
      actualCostPKR: 160000,
      paidAmountPKR: 50000,
      status: 'deposit_paid'
    },
    {
      _id: 'exp-demo-4',
      category: 'car_rental',
      title: 'Rolls Royce Ghost Bridal Car',
      estimatedCostPKR: 95000,
      actualCostPKR: 95000,
      paidAmountPKR: 20000,
      status: 'deposit_paid'
    }
  ]);

  // 4. Guests & RSVP State
  const [guests, setGuests] = useState([
    {
      _id: 'g-demo-1',
      name: 'Tariq Mehmood',
      familyTitle: 'Chaudhry Family',
      side: 'bride',
      phone: '03009876543',
      totalMembers: 4,
      eventsInvited: ['Mehndi', 'Baraat', 'Walima'],
      rsvpStatus: 'attending',
      rsvpConfirmedCount: 4,
      tableNumber: 'Table A-1'
    },
    {
      _id: 'g-demo-2',
      name: 'Dr. Kamran Siddiqui',
      familyTitle: 'Siddiqui Family',
      side: 'groom',
      phone: '03214567890',
      totalMembers: 3,
      eventsInvited: ['Baraat', 'Walima'],
      rsvpStatus: 'attending',
      rsvpConfirmedCount: 3,
      tableNumber: 'Table B-3'
    },
    {
      _id: 'g-demo-3',
      name: 'Farhan Zaidi',
      familyTitle: 'Zaidi Household',
      side: 'both',
      phone: '03331122334',
      totalMembers: 2,
      eventsInvited: ['Walima'],
      rsvpStatus: 'pending',
      rsvpConfirmedCount: 0,
      tableNumber: ''
    }
  ]);
  const [guestSideFilter, setGuestSideFilter] = useState('all');

  // 5. Tasks Checklist State
  const [tasks, setTasks] = useState([
    {
      _id: 'tsk-demo-1',
      title: 'Finalize Baraat stage backdrop color scheme with decorator',
      category: 'Decor',
      assignedTo: 'Bride & Sister',
      dueDate: '2026-11-05',
      priority: 'high',
      isCompleted: true
    },
    {
      _id: 'tsk-demo-2',
      title: 'Confirm sweet boxes (Mithai) order with Rehmat-e-Shereen',
      category: 'Catering',
      assignedTo: 'Groom’s Father',
      dueDate: '2026-11-10',
      priority: 'medium',
      isCompleted: false
    },
    {
      _id: 'tsk-demo-3',
      title: 'Dispatch digital wedding cards via WhatsApp to RSVP list',
      category: 'Invitations',
      assignedTo: 'Hassan',
      dueDate: '2026-10-25',
      priority: 'urgent',
      isCompleted: false
    }
  ]);

  // Modals state
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showAddGuestModal, setShowAddGuestModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  // New item form states
  const [newEvent, setNewEvent] = useState({
    eventType: 'Nikah',
    customTitle: '',
    date: '2026-11-17',
    startTime: '16:00',
    endTime: '18:30',
    location: 'Badshahi Mosque',
    expectedGuests: 150
  });

  const [newExpense, setNewExpense] = useState({
    category: 'decor',
    title: '',
    estimatedCostPKR: '',
    actualCostPKR: '',
    paidAmountPKR: '',
    status: 'planned'
  });

  const [newGuest, setNewGuest] = useState({
    name: '',
    familyTitle: '',
    side: 'bride',
    phone: '',
    totalMembers: 2,
    eventsInvited: ['Baraat', 'Walima']
  });

  const [newTask, setNewTask] = useState({
    title: '',
    category: 'General',
    assignedTo: '',
    dueDate: '2026-11-15',
    priority: 'medium'
  });

  // Load live data from API with fallbacks
  useEffect(() => {
    let isMounted = true;
    async function loadDashboardData() {
      try {
        const bookingsRes = await bookingApi.getMyBookings();
        if (isMounted && bookingsRes?.data?.bookings?.length > 0) {
          setBookings(bookingsRes.data.bookings);
        }
      } catch {}

      try {
        const guestsRes = await planningApi.getGuests(project._id);
        if (isMounted && guestsRes?.data?.guests?.length > 0) {
          setGuests(guestsRes.data.guests);
        }
      } catch {}

      try {
        const expRes = await planningApi.getExpenses(project._id);
        if (isMounted && expRes?.data?.expenses?.length > 0) {
          setExpenses(expRes.data.expenses);
        }
      } catch {}

      try {
        const tskRes = await planningApi.getTasks(project._id);
        if (isMounted && tskRes?.data?.tasks?.length > 0) {
          setTasks(tskRes.data.tasks);
        }
      } catch {}
    }

    loadDashboardData();
    return () => { isMounted = false; };
  }, [project._id]);

  // Derived calculations
  const getDaysCountdown = (dateString) => {
    const diff = Math.ceil((new Date(dateString).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  };

  const totalSpentPKR = expenses.reduce((acc, e) => acc + (Number(e.actualCostPKR) || Number(e.estimatedCostPKR) || 0), 0);
  const remainingBudgetPKR = project.totalBudgetPKR - totalSpentPKR;
  const budgetUtilization = Math.round((totalSpentPKR / project.totalBudgetPKR) * 100);

  const totalInvitedGuests = guests.reduce((acc, g) => acc + Number(g.totalMembers || 1), 0);
  const confirmedAttendingGuests = guests.filter(g => g.rsvpStatus === 'attending').reduce((acc, g) => acc + Number(g.rsvpConfirmedCount || g.totalMembers || 1), 0);

  const completedTasksCount = tasks.filter(t => t.isCompleted).length;

  // Actions
  const handleAddEvent = (e) => {
    e.preventDefault();
    const created = {
      id: 'ev-' + Date.now(),
      eventType: newEvent.eventType,
      customTitle: newEvent.customTitle || `${newEvent.eventType} Function`,
      date: newEvent.date,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      location: newEvent.location,
      expectedGuests: Number(newEvent.expectedGuests),
      venueBooked: false,
      status: 'upcoming'
    };
    setEvents([...events, created].sort((a, b) => new Date(a.date) - new Date(b.date)));
    setShowAddEventModal(false);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    const created = {
      _id: 'exp-' + Date.now(),
      category: newExpense.category,
      title: newExpense.title,
      estimatedCostPKR: Number(newExpense.estimatedCostPKR),
      actualCostPKR: Number(newExpense.actualCostPKR || newExpense.estimatedCostPKR),
      paidAmountPKR: Number(newExpense.paidAmountPKR || 0),
      status: newExpense.status
    };
    setExpenses([created, ...expenses]);
    setShowAddExpenseModal(false);
    setNewExpense({ category: 'decor', title: '', estimatedCostPKR: '', actualCostPKR: '', paidAmountPKR: '', status: 'planned' });
  };

  const handleAddGuest = (e) => {
    e.preventDefault();
    const created = {
      _id: 'g-' + Date.now(),
      name: newGuest.name,
      familyTitle: newGuest.familyTitle,
      side: newGuest.side,
      phone: newGuest.phone,
      totalMembers: Number(newGuest.totalMembers),
      eventsInvited: newGuest.eventsInvited,
      rsvpStatus: 'pending',
      rsvpConfirmedCount: 0
    };
    setGuests([created, ...guests]);
    setShowAddGuestModal(false);
    setNewGuest({ name: '', familyTitle: '', side: 'bride', phone: '', totalMembers: 2, eventsInvited: ['Baraat', 'Walima'] });
  };

  const handleToggleRSVP = (guestId, currentStatus) => {
    const nextStatus = currentStatus === 'attending' ? 'declined' : currentStatus === 'declined' ? 'pending' : 'attending';
    setGuests(guests.map(g => {
      if (g._id === guestId) {
        return {
          ...g,
          rsvpStatus: nextStatus,
          rsvpConfirmedCount: nextStatus === 'attending' ? g.totalMembers : 0
        };
      }
      return g;
    }));
  };

  const handleToggleTask = (taskId) => {
    setTasks(tasks.map(t => t._id === taskId ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const handleCancelBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking request? This will release your reserved slot.')) return;
    try {
      await bookingApi.updateBookingStatus(bookingId, { action: 'cancel', cancellationReason: 'Cancelled via customer portal' });
      setBookings(bookings.map(b => b._id === bookingId ? { ...b, status: 'cancelled' } : b));
    } catch {
      setBookings(bookings.map(b => b._id === bookingId ? { ...b, status: 'cancelled' } : b));
    }
  };

  const filteredGuests = guestSideFilter === 'all' ? guests : guests.filter(g => g.side === guestSideFilter);

  return (
    <div className="py-5" style={{ backgroundColor: 'var(--wp-bg-main)', minHeight: '85vh' }}>
      <div className="container">
        {/* Header Hero Banner */}
        <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border mb-4">
          <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
            <div>
              <div className="d-flex align-items-center gap-2 mb-2">
                <span className="badge-gold">Wedding Project Hub</span>
                <span className="badge bg-light text-dark border">
                  <MapPin size={12} className="text-danger inline me-1" /> {project.city}, Pakistan
                </span>
              </div>
              <h2 className="font-serif fw-bold text-dark mb-1">{project.title}</h2>
              <p className="text-muted small mb-0">
                Coordinating multi-day celebrations with verified Pakistani vendors and synchronized PKR budgeting.
              </p>
            </div>

            <div className="d-flex flex-wrap align-items-center gap-2">
              <div className="p-3 bg-light rounded-3 border text-center">
                <span className="text-muted small d-block" style={{ fontSize: '0.75rem' }}>Countdown to Baraat</span>
                <strong className="text-warning fs-5">{getDaysCountdown(project.mainWeddingDate)} Days</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics KPI Grid */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="p-3 bg-white rounded-3 shadow-xs border">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="text-muted small">Total PKR Budget</span>
                <Banknote size={16} className="text-warning" />
              </div>
              <h4 className="fw-bold font-serif text-dark mb-0">{formatPKR(project.totalBudgetPKR)}</h4>
              <span className="text-success small" style={{ fontSize: '0.72rem' }}>
                Remaining: {formatPKR(remainingBudgetPKR)}
              </span>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="p-3 bg-white rounded-3 shadow-xs border">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="text-muted small">Scheduled Events</span>
                <Calendar size={16} className="text-warning" />
              </div>
              <h4 className="fw-bold font-serif text-dark mb-0">{events.length} Events</h4>
              <span className="text-muted small" style={{ fontSize: '0.72rem' }}>Mehndi, Baraat, Walima</span>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="p-3 bg-white rounded-3 shadow-xs border">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="text-muted small">RSVP Confirmed</span>
                <Users size={16} className="text-warning" />
              </div>
              <h4 className="fw-bold font-serif text-dark mb-0">{confirmedAttendingGuests} / {totalInvitedGuests}</h4>
              <span className="text-muted small" style={{ fontSize: '0.72rem' }}>Confirmed Attending Headcount</span>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="p-3 bg-white rounded-3 shadow-xs border">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="text-muted small">Checklist Progress</span>
                <CheckSquare size={16} className="text-success" />
              </div>
              <h4 className="fw-bold font-serif text-dark mb-0">{completedTasksCount} / {tasks.length}</h4>
              <span className="text-warning small" style={{ fontSize: '0.72rem' }}>
                {Math.round((completedTasksCount / (tasks.length || 1)) * 100)}% Tasks Completed
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <div className="bg-white p-2 rounded-4 shadow-sm border mb-4 d-flex flex-wrap gap-2">
          <button 
            className={`btn btn-sm ${activeTab === 'timeline' ? 'btn-gold' : 'btn-light text-dark'}`}
            onClick={() => {
              setActiveTab('timeline');
              setSearchParams({ tab: 'timeline' });
            }}
          >
            <Calendar size={15} className="me-1 inline" /> Event Schedule ({events.length})
          </button>
          <button 
            className={`btn btn-sm ${activeTab === 'bookings' ? 'btn-gold' : 'btn-light text-dark'}`}
            onClick={() => {
              setActiveTab('bookings');
              setSearchParams({ tab: 'bookings' });
            }}
          >
            <Store size={15} className="me-1 inline" /> Service Bookings ({bookings.length})
          </button>
          <button 
            className={`btn btn-sm ${activeTab === 'budget' ? 'btn-gold' : 'btn-light text-dark'}`}
            onClick={() => {
              setActiveTab('budget');
              setSearchParams({ tab: 'budget' });
            }}
          >
            <Banknote size={15} className="me-1 inline" /> Budget & Expenses
          </button>
          <button 
            className={`btn btn-sm ${activeTab === 'guests' ? 'btn-gold' : 'btn-light text-dark'}`}
            onClick={() => {
              setActiveTab('guests');
              setSearchParams({ tab: 'guests' });
            }}
          >
            <Users size={15} className="me-1 inline" /> Guest List & RSVP ({totalInvitedGuests})
          </button>
          <button 
            className={`btn btn-sm ${activeTab === 'tasks' ? 'btn-gold' : 'btn-light text-dark'}`}
            onClick={() => {
              setActiveTab('tasks');
              setSearchParams({ tab: 'tasks' });
            }}
          >
            <CheckSquare size={15} className="me-1 inline" /> Wedding Checklist ({tasks.length})
          </button>
          <button 
            className={`btn btn-sm ${activeTab === 'bills' ? 'btn-gold' : 'btn-light text-dark'}`}
            onClick={() => {
              setActiveTab('bills');
              setSearchParams({ tab: 'bills' });
            }}
          >
            <Receipt size={15} className="me-1 inline" /> Bills & Payments ({bookings.length})
          </button>
          <button 
            className={`btn btn-sm ${activeTab === 'notifications' ? 'btn-gold' : 'btn-light text-dark'}`}
            onClick={() => {
              setActiveTab('notifications');
              setSearchParams({ tab: 'notifications' });
            }}
          >
            <Bell size={15} className="me-1 inline" /> Activity & Notifications ({dashboardNotifications.filter(n => !n.isRead).length})
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: EVENT SCHEDULE & TIMELINE */}
        {/* ======================================================== */}
        {activeTab === 'timeline' && (
          <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 className="font-serif fw-bold text-dark mb-1">Multi-Day Wedding Timeline</h4>
                <p className="text-muted small mb-0">Chronological schedule for your Pakistani wedding celebrations</p>
              </div>
              <button className="btn-outline-gold btn-sm" onClick={() => setShowAddEventModal(true)}>
                <Plus size={14} /> Add Event
              </button>
            </div>

            <div className="row g-4">
              {events.map((ev, idx) => (
                <div key={ev.id} className="col-12 col-lg-4 col-md-6">
                  <div className="wedding-card h-100 p-4 border-2" style={{ borderColor: 'var(--wp-border-gold)' }}>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <span className="badge bg-warning text-dark fw-bold px-2 py-1 fs-6">
                        {ev.eventType}
                      </span>
                      <span className="badge bg-light text-secondary border small">
                        Day {idx + 1}
                      </span>
                    </div>

                    <h5 className="font-serif fw-bold text-dark mb-2">{ev.customTitle}</h5>

                    <div className="text-muted small mb-3 flex-grow-1 d-flex flex-column gap-1">
                      <div className="d-flex align-items-center gap-2">
                        <Calendar size={14} className="text-warning flex-shrink-0" />
                        <strong className="text-dark">{formatDate(ev.date)}</strong>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <Clock size={14} className="text-warning flex-shrink-0" />
                        <span>{ev.startTime} - {ev.endTime} PKT</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <MapPin size={14} className="text-danger flex-shrink-0" />
                        <span>{ev.location}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <Users size={14} className="text-warning flex-shrink-0" />
                        <span>{ev.expectedGuests} Expected Guests</span>
                      </div>
                    </div>

                    <div className="border-top pt-3 d-flex justify-content-between align-items-center">
                      {ev.venueBooked ? (
                        <span className="badge bg-success bg-opacity-10 text-success small d-flex align-items-center gap-1">
                          <CheckCircle2 size={12} /> Venue Locked
                        </span>
                      ) : (
                        <Link to="/services/venues" className="btn btn-sm btn-outline-warning small" style={{ fontSize: '0.75rem' }}>
                          Find Venue
                        </Link>
                      )}

                      <button 
                        className="btn btn-link text-danger p-0" 
                        onClick={() => setEvents(events.filter(e => e.id !== ev.id))}
                        title="Remove Event"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: SERVICE BOOKINGS */}
        {/* ======================================================== */}
        {activeTab === 'bookings' && (
          <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 className="font-serif fw-bold text-dark mb-1">My Wedding Service Bookings</h4>
                <p className="text-muted small mb-0">Track reservation status, frozen PKR pricing, and vendor responses</p>
              </div>
              <Link to="/services" className="btn btn-sm btn-outline-gold">
                Browse Marketplace
              </Link>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light small">
                  <tr>
                    <th>Booking Ref</th>
                    <th>Service / Vendor</th>
                    <th>Wedding Event</th>
                    <th>Event Date</th>
                    <th>Authoritative Total (PKR)</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b._id}>
                      <td>
                        <strong className="font-monospace small text-dark">{b.bookingNumber}</strong>
                      </td>
                      <td>
                        <strong className="d-block text-dark">{b.service?.title || 'Wedding Service'}</strong>
                        <span className="text-muted small" style={{ fontSize: '0.75rem' }}>
                          {b.vendor?.businessName || 'Verified Partner'}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-warning text-dark small">{b.eventName}</span>
                      </td>
                      <td className="small">{formatDate(b.eventDate)}</td>
                      <td>
                        <strong className="text-success">{formatPKR(b.totalAmountPKR)}</strong>
                        {b.advanceDepositPKR > 0 && (
                          <span className="text-muted small d-block" style={{ fontSize: '0.72rem' }}>
                            Advance: {formatPKR(b.advanceDepositPKR)}
                          </span>
                        )}
                      </td>
                      <td>
                        <span className={`badge ${
                          b.status === 'confirmed' ? 'bg-success' :
                          b.status === 'accepted' ? 'bg-info text-dark' :
                          b.status === 'pending' ? 'bg-warning text-dark' :
                          b.status === 'cancelled' ? 'bg-secondary' : 'bg-primary'
                        } small text-uppercase`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="text-end">
                        <div className="d-flex align-items-center justify-content-end gap-1">
                          <button 
                            className="btn btn-gold btn-sm py-1 px-2 d-flex align-items-center gap-1"
                            style={{ fontSize: '0.75rem' }}
                            onClick={() => handleOpenBill(b)}
                            title="View Official Bill & Pay"
                          >
                            <Receipt size={13} /> Bill & Pay
                          </button>
                          {(b.status === 'pending' || b.status === 'accepted') && (
                            <button 
                              className="btn btn-outline-danger btn-sm py-1 px-2"
                              style={{ fontSize: '0.75rem' }}
                              onClick={() => handleCancelBooking(b._id)}
                              title="Cancel Booking"
                            >
                              <XCircle size={13} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: BUDGET & EXPENSES */}
        {/* ======================================================== */}
        {activeTab === 'budget' && (
          <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 className="font-serif fw-bold text-dark mb-1">Pakistani Wedding Budget & Expense Tracker</h4>
                <p className="text-muted small mb-0">Monitor planned vs actual PKR costs across venue, catering, decor & outfits</p>
              </div>
              <button className="btn-gold btn-sm" onClick={() => setShowAddExpenseModal(true)}>
                <Plus size={14} /> Add Expense
              </button>
            </div>

            {/* Budget Progress Bar */}
            <div className="p-4 bg-light rounded-3 border mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="small fw-bold text-dark">Budget Utilization ({budgetUtilization}%)</span>
                <span className="small text-muted">
                  Spent: <strong>{formatPKR(totalSpentPKR)}</strong> of <strong>{formatPKR(project.totalBudgetPKR)}</strong>
                </span>
              </div>
              <div className="progress" style={{ height: '12px' }}>
                <div 
                  className={`progress-bar ${budgetUtilization > 90 ? 'bg-danger' : budgetUtilization > 75 ? 'bg-warning' : 'bg-success'}`}
                  role="progressbar" 
                  style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Expenses Table */}
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light small">
                  <tr>
                    <th>Expense Item</th>
                    <th>Category</th>
                    <th>Estimated Cost (PKR)</th>
                    <th>Actual / Final (PKR)</th>
                    <th>Paid Deposit (PKR)</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((exp) => (
                    <tr key={exp._id}>
                      <td>
                        <strong className="d-block text-dark">{exp.title}</strong>
                      </td>
                      <td>
                        <span className="badge bg-light text-secondary border small text-capitalize">
                          {exp.category}
                        </span>
                      </td>
                      <td>{formatPKR(exp.estimatedCostPKR)}</td>
                      <td>
                        <strong className="text-dark">{formatPKR(exp.actualCostPKR)}</strong>
                      </td>
                      <td>
                        <span className="text-success fw-semibold">{formatPKR(exp.paidAmountPKR)}</span>
                      </td>
                      <td>
                        <span className={`badge ${
                          exp.status === 'fully_paid' ? 'bg-success' :
                          exp.status === 'deposit_paid' ? 'bg-info text-dark' : 'bg-warning text-dark'
                        } small text-uppercase`}>
                          {exp.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="text-end">
                        <button 
                          className="btn btn-link text-danger p-0"
                          onClick={() => setExpenses(expenses.filter(e => e._id !== exp._id))}
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: GUEST LIST & RSVP */}
        {/* ======================================================== */}
        {activeTab === 'guests' && (
          <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border mb-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
              <div>
                <h4 className="font-serif fw-bold text-dark mb-1">Guest List & RSVP Management</h4>
                <p className="text-muted small mb-0">
                  Total Invited: <strong>{totalInvitedGuests}</strong> • Confirmed Attending: <strong className="text-success">{confirmedAttendingGuests}</strong>
                </p>
              </div>

              <div className="d-flex align-items-center gap-2">
                <select 
                  className="form-select form-select-sm bg-light"
                  value={guestSideFilter}
                  onChange={(e) => setGuestSideFilter(e.target.value)}
                >
                  <option value="all">All Guests</option>
                  <option value="bride">Bride’s Side</option>
                  <option value="groom">Groom’s Side</option>
                  <option value="both">Mutual Family</option>
                </select>

                <button className="btn-gold btn-sm d-flex align-items-center gap-1 flex-shrink-0" onClick={() => setShowAddGuestModal(true)}>
                  <Plus size={14} /> Add Guest / Family
                </button>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light small">
                  <tr>
                    <th>Guest / Household</th>
                    <th>Side</th>
                    <th>Contact Phone</th>
                    <th>Headcount</th>
                    <th>Events Invited</th>
                    <th>RSVP Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGuests.map((g) => (
                    <tr key={g._id}>
                      <td>
                        <strong className="d-block text-dark">{g.name}</strong>
                        {g.familyTitle && (
                          <span className="text-muted small" style={{ fontSize: '0.75rem' }}>{g.familyTitle}</span>
                        )}
                      </td>
                      <td>
                        <span className={`badge ${
                          g.side === 'bride' ? 'bg-danger bg-opacity-10 text-danger' :
                          g.side === 'groom' ? 'bg-primary bg-opacity-10 text-primary' : 'bg-secondary bg-opacity-10 text-secondary'
                        } small text-capitalize`}>
                          {g.side}’s Side
                        </span>
                      </td>
                      <td className="small">{g.phone || '—'}</td>
                      <td>
                        <strong className="text-dark">{g.totalMembers} Members</strong>
                      </td>
                      <td>
                        <div className="d-flex flex-wrap gap-1">
                          {g.eventsInvited.map((ev, i) => (
                            <span key={i} className="badge bg-light text-dark border" style={{ fontSize: '0.7rem' }}>
                              {ev}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <button 
                          className={`badge border-0 ${
                            g.rsvpStatus === 'attending' ? 'bg-success' :
                            g.rsvpStatus === 'declined' ? 'bg-danger' : 'bg-warning text-dark'
                          } text-uppercase px-2 py-1 small`}
                          onClick={() => handleToggleRSVP(g._id, g.rsvpStatus)}
                          title="Click to toggle RSVP"
                          style={{ cursor: 'pointer' }}
                        >
                          {g.rsvpStatus}
                        </button>
                      </td>
                      <td className="text-end">
                        <button 
                          className="btn btn-link text-danger p-0"
                          onClick={() => setGuests(guests.filter(item => item._id !== g._id))}
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: CHECKLIST & TASKS */}
        {/* ======================================================== */}
        {activeTab === 'tasks' && (
          <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 className="font-serif fw-bold text-dark mb-1">Wedding Checklist & Deadlines</h4>
                <p className="text-muted small mb-0">Stay organized with categorized Pakistani wedding planning tasks</p>
              </div>
              <button className="btn-gold btn-sm" onClick={() => setShowAddTaskModal(true)}>
                <Plus size={14} /> Add Task
              </button>
            </div>

            <div className="d-flex flex-column gap-2">
              {tasks.map((tsk) => (
                <div 
                  key={tsk._id} 
                  className={`p-3 rounded-3 border d-flex align-items-center justify-content-between gap-3 ${tsk.isCompleted ? 'bg-light text-muted' : 'bg-white'}`}
                >
                  <div className="d-flex align-items-center gap-3">
                    <button 
                      className={`btn btn-sm p-1 rounded-circle border ${tsk.isCompleted ? 'btn-success' : 'btn-outline-secondary'}`}
                      onClick={() => handleToggleTask(tsk._id)}
                      style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      {tsk.isCompleted && <Check size={16} />}
                    </button>
                    <div>
                      <span className={`fw-semibold ${tsk.isCompleted ? 'text-decoration-line-through text-muted' : 'text-dark'}`}>
                        {tsk.title}
                      </span>
                      <div className="d-flex align-items-center gap-2 mt-1">
                        <span className="badge bg-light text-secondary border small" style={{ fontSize: '0.7rem' }}>
                          {tsk.category}
                        </span>
                        {tsk.assignedTo && (
                          <span className="text-muted small" style={{ fontSize: '0.72rem' }}>
                            Assignee: {tsk.assignedTo}
                          </span>
                        )}
                        <span className={`badge ${
                          tsk.priority === 'urgent' ? 'bg-danger' :
                          tsk.priority === 'high' ? 'bg-warning text-dark' : 'bg-info text-dark'
                        } small`} style={{ fontSize: '0.68rem' }}>
                          {tsk.priority}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button 
                    className="btn btn-link text-danger p-0"
                    onClick={() => setTasks(tasks.filter(t => t._id !== tsk._id))}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: BILLS & PAYMENTS INVOICE HUB */}
        {/* ======================================================== */}
        {activeTab === 'bills' && (
          <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border mb-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
              <div>
                <h4 className="font-serif fw-bold text-dark mb-1 d-flex align-items-center gap-2">
                  <Receipt size={24} className="text-warning" />
                  Official Wedding Bills & Payment Receipts
                </h4>
                <p className="text-muted small mb-0">
                  Track itemized tax invoices, 20% milestone advances, and online payment stamps in PKR
                </p>
              </div>
              <div className="d-flex align-items-center gap-2">
                <a 
                  href="https://wa.me/923069122770?text=Assalam-o-Alaikum%20Sajjad%20Bhai,%20I%20want%20to%20verify%20my%20wedding%20bill%20payment."
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-success btn-sm d-flex align-items-center gap-1"
                >
                  <MessageCircle size={15} /> Billing Support (0306-9122770)
                </a>
              </div>
            </div>

            {/* Financial Overview Cards */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="p-3 bg-light rounded-3 border">
                  <span className="text-muted small d-block">Total Invoiced Commitment</span>
                  <strong className="fs-5 text-dark font-serif">
                    {formatPKR(bookings.reduce((sum, b) => sum + (b.totalAmountPKR || 0), 0))}
                  </strong>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="p-3 rounded-3 border" style={{ backgroundColor: '#F3FAF5', borderColor: '#C3E6CB' }}>
                  <span className="text-success small d-block fw-semibold">Total Paid (Deposits)</span>
                  <strong className="fs-5 text-success font-serif">
                    {formatPKR(bookings.reduce((sum, b) => sum + (b.advanceDepositPKR || 0), 0))}
                  </strong>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="p-3 rounded-3 border" style={{ backgroundColor: '#FFFDF0', borderColor: '#FFEEBA' }}>
                  <span className="text-warning small d-block fw-semibold">Pending Event Day Balance</span>
                  <strong className="fs-5 text-dark font-serif">
                    {formatPKR(bookings.reduce((sum, b) => sum + Math.max(0, (b.totalAmountPKR || 0) - (b.advanceDepositPKR || 0)), 0))}
                  </strong>
                </div>
              </div>
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="p-3 bg-light rounded-3 border">
                  <span className="text-muted small d-block">Active Invoices</span>
                  <strong className="fs-5 text-dark font-serif">{bookings.length} Bills Issued</strong>
                </div>
              </div>
            </div>

            {/* Invoices List / Table */}
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light small">
                  <tr>
                    <th>Invoice #</th>
                    <th>Booking Ref</th>
                    <th>Reserved Service / Vendor</th>
                    <th>Event & Date</th>
                    <th>Total (PKR)</th>
                    <th>Paid Deposit</th>
                    <th>Status</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody className="small">
                  {bookings.map((b) => {
                    const invNumber = b.invoiceNumber || `WP-INV-${b.bookingNumber ? b.bookingNumber.replace('WP-BK-', '') : '829101'}`;
                    const isPaid = (b.advanceDepositPKR || 0) >= Math.round((b.totalAmountPKR || 0) * 0.2);

                    return (
                      <tr key={b._id}>
                        <td>
                          <strong className="font-monospace text-dark">{invNumber}</strong>
                        </td>
                        <td>
                          <span className="font-monospace text-muted">{b.bookingNumber}</span>
                        </td>
                        <td>
                          <strong className="d-block text-dark">{b.service?.title || 'Wedding Service'}</strong>
                          <span className="text-muted" style={{ fontSize: '0.75rem' }}>{b.vendor?.businessName || 'Verified Partner'}</span>
                        </td>
                        <td>
                          <span className="badge bg-warning text-dark me-1">{b.eventName}</span>
                          <span className="text-muted">{formatDate(b.eventDate)}</span>
                        </td>
                        <td>
                          <strong className="text-dark">{formatPKR(b.totalAmountPKR)}</strong>
                        </td>
                        <td>
                          <strong className="text-success">{formatPKR(b.advanceDepositPKR || 0)}</strong>
                        </td>
                        <td>
                          {isPaid ? (
                            <span className="badge bg-success text-white">PAID & LOCKED</span>
                          ) : (
                            <span className="badge bg-warning text-dark">PENDING DEPOSIT</span>
                          )}
                        </td>
                        <td className="text-end">
                          <div className="d-flex align-items-center justify-content-end gap-1">
                            <button 
                              className="btn btn-gold btn-sm py-1 px-2 d-flex align-items-center gap-1"
                              style={{ fontSize: '0.75rem' }}
                              onClick={() => handleOpenBill(b)}
                            >
                              <Receipt size={13} /> {isPaid ? 'View Bill' : 'Pay & Get Bill'}
                            </button>
                            <Link 
                              to={`/bill/${b._id}?paid=${isPaid}`} 
                              target="_blank" 
                              className="btn btn-outline-secondary btn-sm py-1 px-2"
                              style={{ fontSize: '0.75rem' }}
                              title="Full Page Invoice"
                            >
                              <Printer size={13} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 7: ACTIVITY & NOTIFICATIONS HUB */}
        {/* ======================================================== */}
        {activeTab === 'notifications' && (
          <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border mb-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
              <div>
                <h4 className="font-serif fw-bold text-dark mb-1 d-flex align-items-center gap-2">
                  <Bell size={24} className="text-warning" />
                  Activity & Notifications Hub
                </h4>
                <p className="text-muted small mb-0">
                  Track vendor approvals, guest RSVPs, and payment milestones in one centralized dashboard.
                </p>
              </div>

              <div className="d-flex align-items-center gap-2">
                {dashboardNotifications.some(n => !n.isRead) && (
                  <button 
                    className="btn btn-outline-dark btn-sm d-flex align-items-center gap-1"
                    onClick={() => setDashboardNotifications(prev => prev.map(n => ({ ...n, isRead: true })))}
                  >
                    <CheckCheck size={14} /> Mark All as Read
                  </button>
                )}
                <a 
                  href="https://wa.me/923069122770?text=Assalam-o-Alaikum%20Sajjad%20Bhai,%20I%20have%20a%20question%20about%20my%20wedding%20notifications."
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-success btn-sm d-flex align-items-center gap-1"
                >
                  <MessageCircle size={15} /> Helpline: 0306-9122770
                </a>
              </div>
            </div>

            {/* Filter pills */}
            <div className="d-flex flex-wrap gap-2 mb-4 pb-3 border-bottom">
              <button 
                className={`btn btn-sm rounded-pill px-3 py-1 ${notifFilter === 'all' ? 'btn-gold' : 'btn-light border'}`}
                onClick={() => setNotifFilter('all')}
              >
                All ({dashboardNotifications.length})
              </button>
              <button 
                className={`btn btn-sm rounded-pill px-3 py-1 ${notifFilter === 'unread' ? 'btn-gold' : 'btn-light border'}`}
                onClick={() => setNotifFilter('unread')}
              >
                Unread ({dashboardNotifications.filter(n => !n.isRead).length})
              </button>
              <button 
                className={`btn btn-sm rounded-pill px-3 py-1 ${notifFilter === 'booking' ? 'btn-gold' : 'btn-light border'}`}
                onClick={() => setNotifFilter('booking')}
              >
                Bookings
              </button>
              <button 
                className={`btn btn-sm rounded-pill px-3 py-1 ${notifFilter === 'payment' ? 'btn-gold' : 'btn-light border'}`}
                onClick={() => setNotifFilter('payment')}
              >
                Bills & Payments
              </button>
              <button 
                className={`btn btn-sm rounded-pill px-3 py-1 ${notifFilter === 'rsvp' ? 'btn-gold' : 'btn-light border'}`}
                onClick={() => setNotifFilter('rsvp')}
              >
                Guest RSVPs
              </button>
            </div>

            {/* List */}
            <div className="d-flex flex-column gap-3">
              {dashboardNotifications
                .filter(n => {
                  if (notifFilter === 'unread') return !n.isRead;
                  if (notifFilter === 'booking') return n.type === 'booking' || n.title?.toLowerCase().includes('booking');
                  if (notifFilter === 'payment') return n.type === 'payment' || n.title?.toLowerCase().includes('bill') || n.title?.toLowerCase().includes('deposit');
                  if (notifFilter === 'rsvp') return n.type === 'rsvp' || n.title?.toLowerCase().includes('rsvp') || n.title?.toLowerCase().includes('guest');
                  return true;
                })
                .map((n) => (
                  <div 
                    key={n._id}
                    className={`p-3 p-md-4 rounded-3 border shadow-xs d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 ${
                      !n.isRead ? 'bg-warning bg-opacity-10 border-warning' : 'bg-white'
                    }`}
                  >
                    <div className="d-flex align-items-start gap-3">
                      <div className="rounded-circle p-2 bg-light border mt-1">
                        {n.type === 'booking' && <Store size={18} className="text-warning" />}
                        {n.type === 'payment' && <Receipt size={18} className="text-success" />}
                        {n.type === 'rsvp' && <Users size={18} className="text-primary" />}
                        {n.type !== 'booking' && n.type !== 'payment' && n.type !== 'rsvp' && <Bell size={18} className="text-secondary" />}
                      </div>
                      <div>
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <strong className="text-dark font-serif fs-6">{n.title}</strong>
                          {!n.isRead && <span className="badge bg-danger rounded-pill px-2 py-0" style={{ fontSize: '0.65rem' }}>NEW</span>}
                        </div>
                        <p className="text-muted small mb-1">{n.message}</p>
                        <span className="text-muted" style={{ fontSize: '0.72rem' }}>
                          <Clock size={11} className="inline me-1" /> {n.time || 'Recently'}
                        </span>
                      </div>
                    </div>

                    <div className="d-flex align-items-center gap-2 justify-content-end">
                      {n.type === 'booking' && (
                        <button 
                          className="btn btn-sm btn-gold rounded-pill px-3 py-1"
                          onClick={() => {
                            setActiveTab('bookings');
                            setSearchParams({ tab: 'bookings' });
                          }}
                        >
                          View Bookings
                        </button>
                      )}
                      {n.type === 'payment' && (
                        <button 
                          className="btn btn-sm btn-gold rounded-pill px-3 py-1"
                          onClick={() => {
                            setActiveTab('bills');
                            setSearchParams({ tab: 'bills' });
                          }}
                        >
                          View Bills
                        </button>
                      )}
                      {n.type === 'rsvp' && (
                        <button 
                          className="btn btn-sm btn-gold rounded-pill px-3 py-1"
                          onClick={() => {
                            setActiveTab('guests');
                            setSearchParams({ tab: 'guests' });
                          }}
                        >
                          View Guest List
                        </button>
                      )}
                      {!n.isRead && (
                        <button 
                          className="btn btn-sm btn-outline-secondary rounded-pill px-2 py-1"
                          onClick={() => setDashboardNotifications(prev => prev.map(item => item._id === n._id ? { ...item, isRead: true } : item))}
                          title="Mark as read"
                        >
                          <Check size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Quick Vendor Booking Shortcuts */}
        <div className="p-4 rounded-4 bg-light border">
          <h5 className="font-serif fw-bold text-dark mb-3">Explore Vendors For Your Events</h5>
          <div className="row g-3">
            <div className="col-12 col-sm-6 col-md-3">
              <Link to="/services/venues" className="p-3 bg-white rounded-3 border d-flex align-items-center justify-content-between text-decoration-none text-dark hover-gold">
                <span>Book Banquet Halls</span>
                <ArrowRight size={16} className="text-warning" />
              </Link>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <Link to="/services/cars" className="p-3 bg-white rounded-3 border d-flex align-items-center justify-content-between text-decoration-none text-dark hover-gold">
                <span>Bridal Car Rental</span>
                <ArrowRight size={16} className="text-warning" />
              </Link>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <Link to="/services/catering" className="p-3 bg-white rounded-3 border d-flex align-items-center justify-content-between text-decoration-none text-dark hover-gold">
                <span>Pakistani Catering</span>
                <ArrowRight size={16} className="text-warning" />
              </Link>
            </div>
            <div className="col-12 col-sm-6 col-md-3">
              <Link to="/services/photography" className="p-3 bg-white rounded-3 border d-flex align-items-center justify-content-between text-decoration-none text-dark hover-gold">
                <span>Photography Studios</span>
                <ArrowRight size={16} className="text-warning" />
              </Link>
            </div>
          </div>
        </div>

        {/* Modal: Add Wedding Event */}
        {showAddEventModal && (
          <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50" style={{ zIndex: 1100 }}>
            <div className="bg-white p-4 p-md-5 rounded-4 shadow-lg border" style={{ maxWidth: '540px', width: '90%' }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="font-serif fw-bold text-dark mb-0">Add Wedding Event</h5>
                <button className="btn btn-close" onClick={() => setShowAddEventModal(false)}></button>
              </div>

              <form onSubmit={handleAddEvent} className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Event Type *</label>
                  <select 
                    className="form-select"
                    value={newEvent.eventType}
                    onChange={(e) => setNewEvent({ ...newEvent, eventType: e.target.value })}
                  >
                    {WEDDING_EVENTS.map(ev => <option key={ev} value={ev}>{ev}</option>)}
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Event Date *</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    required
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold">Custom Function Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Sangeet & Dholki Night"
                    value={newEvent.customTitle}
                    onChange={(e) => setNewEvent({ ...newEvent, customTitle: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Start Time</label>
                  <input 
                    type="time" 
                    className="form-control" 
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">End Time</label>
                  <input 
                    type="time" 
                    className="form-control" 
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold">Venue / Location</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold">Expected Guests</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={newEvent.expectedGuests}
                    onChange={(e) => setNewEvent({ ...newEvent, expectedGuests: e.target.value })}
                  />
                </div>

                <div className="col-12 pt-2 d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-light border" onClick={() => setShowAddEventModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-gold">
                    Add to Wedding Schedule
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Add Expense */}
        {showAddExpenseModal && (
          <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50" style={{ zIndex: 1100 }}>
            <div className="bg-white p-4 p-md-5 rounded-4 shadow-lg border" style={{ maxWidth: '540px', width: '90%' }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="font-serif fw-bold text-dark mb-0">Record Wedding Expense</h5>
                <button className="btn btn-close" onClick={() => setShowAddExpenseModal(false)}></button>
              </div>

              <form onSubmit={handleAddExpense} className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Category *</label>
                  <select 
                    className="form-select"
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  >
                    <option value="venue">Venue & Hall</option>
                    <option value="catering">Catering & Food</option>
                    <option value="photography">Photography & Video</option>
                    <option value="car_rental">Car Rental</option>
                    <option value="decor">Stage & Floral Decor</option>
                    <option value="attire">Bridal & Groom Attire</option>
                    <option value="jewellery">Gold & Jewellery</option>
                    <option value="invitations">Cards & Favours</option>
                    <option value="miscellaneous">Miscellaneous</option>
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Payment Status</label>
                  <select 
                    className="form-select"
                    value={newExpense.status}
                    onChange={(e) => setNewExpense({ ...newExpense, status: e.target.value })}
                  >
                    <option value="planned">Planned</option>
                    <option value="deposit_paid">Deposit Paid</option>
                    <option value="fully_paid">Fully Paid</option>
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold">Expense Title *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required
                    placeholder="e.g. Stage floral arrangement & sofa set"
                    value={newExpense.title}
                    onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Estimated Cost (PKR) *</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    required
                    placeholder="e.g. 150000"
                    value={newExpense.estimatedCostPKR}
                    onChange={(e) => setNewExpense({ ...newExpense, estimatedCostPKR: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Paid Advance (PKR)</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    placeholder="e.g. 50000"
                    value={newExpense.paidAmountPKR}
                    onChange={(e) => setNewExpense({ ...newExpense, paidAmountPKR: e.target.value })}
                  />
                </div>

                <div className="col-12 pt-2 d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-light border" onClick={() => setShowAddExpenseModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-gold">
                    Save Expense
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Add Guest */}
        {showAddGuestModal && (
          <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50" style={{ zIndex: 1100 }}>
            <div className="bg-white p-4 p-md-5 rounded-4 shadow-lg border" style={{ maxWidth: '540px', width: '90%' }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="font-serif fw-bold text-dark mb-0">Add Guest / Family</h5>
                <button className="btn btn-close" onClick={() => setShowAddGuestModal(false)}></button>
              </div>

              <form onSubmit={handleAddGuest} className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Guest Name *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required
                    placeholder="e.g. Tariq Mehmood"
                    value={newGuest.name}
                    onChange={(e) => setNewGuest({ ...newGuest, name: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Family / Household Title</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Chaudhry Family"
                    value={newGuest.familyTitle}
                    onChange={(e) => setNewGuest({ ...newGuest, familyTitle: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Side</label>
                  <select 
                    className="form-select"
                    value={newGuest.side}
                    onChange={(e) => setNewGuest({ ...newGuest, side: e.target.value })}
                  >
                    <option value="bride">Bride’s Side</option>
                    <option value="groom">Groom’s Side</option>
                    <option value="both">Both / Mutual</option>
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Total Members Headcount *</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    min="1"
                    required
                    value={newGuest.totalMembers}
                    onChange={(e) => setNewGuest({ ...newGuest, totalMembers: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold">WhatsApp / Phone Number</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. 03001234567"
                    value={newGuest.phone}
                    onChange={(e) => setNewGuest({ ...newGuest, phone: e.target.value })}
                  />
                </div>

                <div className="col-12 pt-2 d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-light border" onClick={() => setShowAddGuestModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-gold">
                    Add to Guest List
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Add Task */}
        {showAddTaskModal && (
          <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50" style={{ zIndex: 1100 }}>
            <div className="bg-white p-4 p-md-5 rounded-4 shadow-lg border" style={{ maxWidth: '540px', width: '90%' }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="font-serif fw-bold text-dark mb-0">Add Checklist Task</h5>
                <button className="btn btn-close" onClick={() => setShowAddTaskModal(false)}></button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                setTasks([{ _id: 'tsk-' + Date.now(), ...newTask, isCompleted: false }, ...tasks]);
                setShowAddTaskModal(false);
                setNewTask({ title: '', category: 'General', assignedTo: '', dueDate: '2026-11-15', priority: 'medium' });
              }} className="row g-3">
                <div className="col-12">
                  <label className="form-label small fw-bold">Task Title *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required
                    placeholder="e.g. Collect bridal lehenga from boutique"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Category</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Attire, Decor, Logistics"
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Assigned To</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Groom's Brother"
                    value={newTask.assignedTo}
                    onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Due Date</label>
                  <input 
                    type="date" 
                    className="form-control" 
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label small fw-bold">Priority</label>
                  <select 
                    className="form-select"
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>

                <div className="col-12 pt-2 d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-light border" onClick={() => setShowAddTaskModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-gold">
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Official Bill & Payment Modal */}
        <PaymentBillModal 
          booking={selectedBillBooking} 
          isOpen={isBillModalOpen} 
          onClose={() => setIsBillModalOpen(false)} 
          onPaymentSuccess={handlePaymentSuccess} 
        />

      </div>
    </div>
  );
};

export default CustomerDashboard;
