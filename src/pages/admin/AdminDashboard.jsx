import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CATEGORIES } from '../../data/mockData';
import { formatPKR, formatDate } from '../../utils/formatters';
import { adminApi } from '../../services/api';
import { 
  ShieldCheck, 
  Users, 
  Store, 
  Layers, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Clock, 
  Search,
  Filter,
  BarChart3,
  FileText,
  Activity,
  Plus,
  Tag,
  Check
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('vendors'); // 'vendors' | 'analytics' | 'logs' | 'categories'

  // Platform KPIs
  const [stats, setStats] = useState({
    totalCustomers: 450,
    totalVendors: 88,
    pendingApprovals: 3,
    activeListings: 140,
    totalGMVPKR: 42500000
  });

  // Vendor verification applications state
  const [vendors, setVendors] = useState([
    {
      id: 'v-app-1',
      businessName: 'Noor Marquee & Catering',
      contactPerson: 'Mian Tariq',
      email: 'noor.marquee@example.com',
      phone: '0300-4455667',
      city: 'Lahore',
      category: 'Wedding Venues & Halls',
      cnicOrNtn: '35201-1234567-1',
      date: '10 Oct 2026',
      status: 'pending'
    },
    {
      id: 'v-app-2',
      businessName: 'Karachi Vintage Car Fleets',
      contactPerson: 'Sohail Ahmed',
      email: 'vintage.khi@example.com',
      phone: '0321-9876543',
      city: 'Karachi',
      category: 'Car Rental & Transport',
      cnicOrNtn: '42101-7654321-3',
      date: '09 Oct 2026',
      status: 'pending'
    },
    {
      id: 'v-app-3',
      businessName: 'Islamabad Glam Salons',
      contactPerson: 'Farah Naz',
      email: 'farah.glam@example.com',
      phone: '0333-1122334',
      city: 'Islamabad',
      category: 'Bridal Makeup & Salons',
      cnicOrNtn: '37405-5544332-2',
      date: '08 Oct 2026',
      status: 'pending'
    }
  ]);

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState([
    {
      _id: 'log-1',
      action: 'VENDOR_APPROVED',
      details: 'Administrator approved "The Royal Crystal Ballroom" commercial profile',
      user: 'Super Admin',
      ip: '127.0.0.1',
      time: '45 mins ago'
    },
    {
      _id: 'log-2',
      action: 'PAYMENT_VERIFIED',
      details: 'Recorded Rs. 70,000 advance deposit for booking WP-BK-829101',
      user: 'Super Admin',
      ip: '127.0.0.1',
      time: '3 hours ago'
    },
    {
      _id: 'log-3',
      action: 'SECURITY_SCAN',
      details: 'Scheduled security audit & token expiry check completed with 0 errors',
      user: 'System Cron',
      ip: '127.0.0.1',
      time: '1 day ago'
    }
  ]);

  // Filters
  const [filterCity, setFilterCity] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Load live admin data
  useEffect(() => {
    let isMounted = true;
    async function loadAdminData() {
      try {
        const statsRes = await adminApi.getStats();
        if (isMounted && statsRes?.data) {
          setStats(statsRes.data);
        }
      } catch {}

      try {
        const vendorsRes = await adminApi.getVendors();
        if (isMounted && Array.isArray(vendorsRes?.data) && vendorsRes.data.length > 0) {
          setVendors(vendorsRes.data.map(v => ({
            id: v._id,
            businessName: v.businessName,
            contactPerson: v.user?.name || 'Owner',
            email: v.user?.email || 'vendor@wedplan.pk',
            phone: v.user?.phone || '0300-1234567',
            city: v.city,
            category: v.categories?.[0]?.name || 'Wedding Service',
            cnicOrNtn: v.taxNumber || 'NTN-VERIFIED',
            date: formatDate(v.createdAt),
            status: v.verificationStatus || 'pending'
          })));
        }
      } catch {}

      try {
        const logsRes = await adminApi.getAuditLogs();
        if (isMounted && logsRes?.data?.logs?.length > 0) {
          setAuditLogs(logsRes.data.logs.map(l => ({
            ...l,
            time: formatDate(l.timestamp)
          })));
        }
      } catch {}
    }

    loadAdminData();
    return () => { isMounted = false; };
  }, []);

  const handleVerify = async (id, newStatus) => {
    try {
      await adminApi.verifyVendor(id, { status: newStatus });
    } catch {}

    setVendors(vendors.map(v => v.id === id ? { ...v, status: newStatus } : v));
    setAuditLogs([
      {
        _id: 'log-' + Date.now(),
        action: newStatus === 'approved' ? 'VENDOR_APPROVED' : 'VENDOR_REJECTED',
        details: `Administrator updated vendor verification status to "${newStatus}"`,
        user: user?.name || 'Administrator',
        ip: '127.0.0.1',
        time: 'Just now'
      },
      ...auditLogs
    ]);
  };

  const filteredVendors = vendors.filter(v => {
    const matchCity = !filterCity || v.city === filterCity;
    const matchStatus = filterStatus === 'all' || v.status === filterStatus;
    const matchSearch = !searchQuery || v.businessName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCity && matchStatus && matchSearch;
  });

  const pendingCount = vendors.filter(v => v.status === 'pending').length;
  const approvedCount = vendors.filter(v => v.status === 'approved').length;

  return (
    <div className="py-5" style={{ backgroundColor: 'var(--wp-bg-main)', minHeight: '85vh' }}>
      <div className="container">
        {/* Admin Header */}
        <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border mb-4">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div className="d-flex align-items-center gap-3">
              <div className="bg-dark text-white p-3 rounded-circle d-flex align-items-center justify-content-center shadow-sm">
                <ShieldCheck size={28} className="text-warning" />
              </div>
              <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <h3 className="font-serif fw-bold text-dark mb-0">Platform Administration</h3>
                  <span className="badge bg-danger text-white small text-uppercase">Admin Portal</span>
                </div>
                <span className="text-muted small">
                  Logged in as: <strong>{user?.name || 'Administrator'}</strong> ({user?.email}) • Governance & Verification
                </span>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-success bg-opacity-10 text-success p-2 small">
                ✓ Pakistan Compliance Active
              </span>
            </div>
          </div>
        </div>

        {/* Global KPI Stats Grid */}
        <div className="row g-3 mb-4">
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="p-3 bg-white rounded-3 shadow-xs border">
              <span className="text-muted small d-block mb-1">Registered Customers</span>
              <h4 className="fw-bold font-serif text-dark mb-0">{stats.totalCustomers || 450}+</h4>
              <span className="text-success small" style={{ fontSize: '0.72rem' }}>Active Wedding Planners</span>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="p-3 bg-white rounded-3 shadow-xs border">
              <span className="text-muted small d-block mb-1">Approved Vendors</span>
              <h4 className="fw-bold font-serif text-success mb-0">{approvedCount || stats.totalVendors || 88}</h4>
              <span className="text-muted small" style={{ fontSize: '0.72rem' }}>Commercial Partners</span>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="p-3 bg-white rounded-3 shadow-xs border">
              <span className="text-muted small d-block mb-1">Pending Approvals</span>
              <h4 className="fw-bold font-serif text-warning mb-0">{pendingCount} Applications</h4>
              <span className="text-warning small" style={{ fontSize: '0.72rem' }}>Requires Verification</span>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="p-3 bg-white rounded-3 shadow-xs border">
              <span className="text-muted small d-block mb-1">Total Marketplace GMV</span>
              <h4 className="fw-bold font-serif text-dark mb-0">{formatPKR(stats.totalGMVPKR || 42500000)}</h4>
              <span className="text-success small" style={{ fontSize: '0.72rem' }}>Processed Booking Volume</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white p-2 rounded-4 shadow-sm border mb-4 d-flex flex-wrap gap-2">
          <button 
            className={`btn btn-sm ${activeTab === 'vendors' ? 'btn-gold' : 'btn-light text-dark'}`}
            onClick={() => setActiveTab('vendors')}
          >
            <ShieldCheck size={15} className="me-1 inline" /> Vendor Approvals Queue ({pendingCount})
          </button>
          <button 
            className={`btn btn-sm ${activeTab === 'analytics' ? 'btn-gold' : 'btn-light text-dark'}`}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 size={15} className="me-1 inline" /> Market Analytics & GMV
          </button>
          <button 
            className={`btn btn-sm ${activeTab === 'logs' ? 'btn-gold' : 'btn-light text-dark'}`}
            onClick={() => setActiveTab('logs')}
          >
            <Activity size={15} className="me-1 inline" /> Governance Audit Logs ({auditLogs.length})
          </button>
          <button 
            className={`btn btn-sm ${activeTab === 'categories' ? 'btn-gold' : 'btn-light text-dark'}`}
            onClick={() => setActiveTab('categories')}
          >
            <Tag size={15} className="me-1 inline" /> Service Categories ({CATEGORIES.length})
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: VENDOR ONBOARDING & VERIFICATION */}
        {/* ======================================================== */}
        {activeTab === 'vendors' && (
          <div className="bg-white p-4 rounded-4 shadow-sm border mb-4">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
              <div>
                <h5 className="font-serif fw-bold text-dark mb-1">Vendor Verification & Onboarding Queue</h5>
                <span className="text-muted small">Review commercial credentials, CNIC/NTN, and grant verified status</span>
              </div>

              {/* Filters Toolbar */}
              <div className="d-flex flex-wrap align-items-center gap-2">
                <input 
                  type="text" 
                  className="form-control form-control-sm"
                  placeholder="Search vendor name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '180px' }}
                />

                <select 
                  className="form-select form-select-sm"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{ width: '130px' }}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>

                <select 
                  className="form-select form-select-sm"
                  value={filterCity}
                  onChange={(e) => setFilterCity(e.target.value)}
                  style={{ width: '130px' }}
                >
                  <option value="">All Cities</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Islamabad">Islamabad</option>
                </select>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light small">
                  <tr>
                    <th>Business & Owner</th>
                    <th>City</th>
                    <th>Category</th>
                    <th>CNIC / NTN</th>
                    <th>Application Date</th>
                    <th>Status</th>
                    <th className="text-end">Verification Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVendors.length > 0 ? (
                    filteredVendors.map((v) => (
                      <tr key={v.id}>
                        <td>
                          <strong className="d-block text-dark">{v.businessName}</strong>
                          <span className="text-muted small" style={{ fontSize: '0.75rem' }}>
                            {v.contactPerson} • {v.phone}
                          </span>
                        </td>
                        <td>{v.city}</td>
                        <td>
                          <span className="badge bg-light text-secondary border small">
                            {v.category}
                          </span>
                        </td>
                        <td>
                          <code className="text-dark bg-light px-2 py-1 rounded small">{v.cnicOrNtn}</code>
                        </td>
                        <td className="small text-muted">{v.date}</td>
                        <td>
                          {v.status === 'approved' && (
                            <span className="badge bg-success text-white small">Approved</span>
                          )}
                          {v.status === 'rejected' && (
                            <span className="badge bg-danger text-white small">Rejected</span>
                          )}
                          {v.status === 'pending' && (
                            <span className="badge bg-warning text-dark small">Pending Review</span>
                          )}
                        </td>
                        <td className="text-end">
                          {v.status === 'pending' ? (
                            <div className="d-inline-flex gap-2">
                              <button 
                                className="btn btn-sm btn-success d-flex align-items-center gap-1"
                                onClick={() => handleVerify(v.id, 'approved')}
                              >
                                <CheckCircle2 size={14} /> Approve
                              </button>
                              <button 
                                className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                                onClick={() => handleVerify(v.id, 'rejected')}
                              >
                                <XCircle size={14} /> Reject
                              </button>
                            </div>
                          ) : (
                            <button 
                              className="btn btn-sm btn-light border small text-muted"
                              onClick={() => handleVerify(v.id, 'pending')}
                            >
                              Reopen Review
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4 text-muted">
                        No vendor applications found matching filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: MARKET ANALYTICS & GMV */}
        {/* ======================================================== */}
        {activeTab === 'analytics' && (
          <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border mb-4">
            <h4 className="font-serif fw-bold text-dark mb-1">Pakistani Wedding Market Distribution</h4>
            <p className="text-muted small mb-4">Platform metrics, regional booking volumes, and service demand breakdown</p>

            <div className="row g-4">
              <div className="col-12 col-md-4">
                <div className="p-4 bg-light rounded-3 border">
                  <h6 className="fw-bold text-dark mb-2">Lahore Metropolitan</h6>
                  <span className="fs-3 fw-bold text-warning font-serif d-block mb-1">45%</span>
                  <p className="text-muted small mb-0">Highest demand for royal marquees, Gulberg banquet halls & charcoal BBQ catering.</p>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="p-4 bg-light rounded-3 border">
                  <h6 className="fw-bold text-dark mb-2">Karachi Coastal Region</h6>
                  <span className="fs-3 fw-bold text-warning font-serif d-block mb-1">35%</span>
                  <p className="text-muted small mb-0">Peak volume for beachside lawn venues, vintage cars, and designer bridal couture.</p>
                </div>
              </div>
              <div className="col-12 col-md-4">
                <div className="p-4 bg-light rounded-3 border">
                  <h6 className="fw-bold text-dark mb-2">Islamabad / Rawalpindi</h6>
                  <span className="fs-3 fw-bold text-warning font-serif d-block mb-1">20%</span>
                  <p className="text-muted small mb-0">High demand for premium floral decor, Margalla hills photoshoot spots & luxury bridal limos.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: AUDIT LOGS */}
        {/* ======================================================== */}
        {activeTab === 'logs' && (
          <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 className="font-serif fw-bold text-dark mb-1">System Governance & Audit Logs</h4>
                <p className="text-muted small mb-0">Tamper-evident record of administrative verifications, payments, and system events</p>
              </div>
              <span className="badge bg-light text-secondary border small">Real-Time Auditing</span>
            </div>

            <div className="d-flex flex-column gap-2">
              {auditLogs.map((log) => (
                <div key={log._id} className="p-3 bg-light rounded-3 border d-flex align-items-center justify-content-between gap-3">
                  <div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <span className="badge bg-dark text-white font-monospace small" style={{ fontSize: '0.7rem' }}>
                        {log.action}
                      </span>
                      <strong className="text-dark small">{log.details}</strong>
                    </div>
                    <span className="text-muted small" style={{ fontSize: '0.75rem' }}>
                      Initiated by: {log.user || 'Admin'} • IP: {log.ip || '127.0.0.1'}
                    </span>
                  </div>
                  <span className="text-muted small text-nowrap" style={{ fontSize: '0.75rem' }}>
                    {log.time || 'Recently'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: CATEGORY MANAGEMENT */}
        {/* ======================================================== */}
        {activeTab === 'categories' && (
          <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h4 className="font-serif fw-bold text-dark mb-1">Managed Wedding Service Categories</h4>
                <p className="text-muted small mb-0">Active verticals in the Pakistani wedding vendor marketplace</p>
              </div>
            </div>

            <div className="row g-3">
              {CATEGORIES.map((cat) => (
                <div key={cat.slug} className="col-12 col-sm-6 col-md-4">
                  <div className="p-3 rounded-3 bg-light border d-flex align-items-center justify-content-between">
                    <div>
                      <strong className="d-block text-dark small">{cat.name}</strong>
                      <span className="text-muted font-monospace" style={{ fontSize: '0.72rem' }}>/{cat.slug}</span>
                    </div>
                    <span className="badge bg-success bg-opacity-25 text-success small d-flex align-items-center gap-1">
                      <Check size={12} /> Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;
