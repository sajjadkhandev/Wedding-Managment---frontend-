import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { formatPKR, formatDate } from '../../utils/formatters';
import { bookingApi, paymentApi } from '../../services/api';
import PageHeader from '../../components/common/PageHeader';
import { 
  Printer, 
  MessageCircle, 
  CheckCircle2, 
  ArrowLeft, 
  Receipt, 
  CreditCard, 
  Building2, 
  User, 
  ShieldCheck, 
  Clock,
  Smartphone
} from 'lucide-react';

const BillInvoicePage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isPaidParam = searchParams.get('paid') === 'true';

  const [booking, setBooking] = useState({
    _id: id || 'bk-demo-1',
    bookingNumber: `WP-BK-${id ? id.replace('bk-', '').replace('WP-BK-', '') : '829101'}`,
    invoiceNumber: `WP-INV-${id ? id.replace('bk-', '').replace('WP-BK-', '') : '829101'}`,
    service: { title: 'The Royal Crystal Ballroom' },
    vendor: { businessName: 'Royal Hospitality Group', city: 'Lahore' },
    eventName: 'Baraat',
    eventDate: '2026-11-20',
    totalAmountPKR: 350000,
    advanceDepositPKR: isPaidParam ? 70000 : 0,
    status: isPaidParam ? 'confirmed' : 'pending',
    customer: {
      name: 'Zaid & Ayesha',
      phone: '0300-1234567',
      email: 'customer@wedplan.pk'
    }
  });

  const [paymentMethod, setPaymentMethod] = useState('jazzcash');
  const [transactionRef, setTransactionRef] = useState('');
  const [isPaid, setIsPaid] = useState(isPaidParam || booking.status === 'confirmed');
  const [paidDetails, setPaidDetails] = useState({
    amountPaid: 70000,
    method: 'JazzCash Mobile',
    trxId: 'JC-91823746',
    date: new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    // Attempt to fetch real booking from backend if ID is valid
    async function fetchBooking() {
      if (id && !id.startsWith('demo')) {
        try {
          const res = await bookingApi.getBookingById(id);
          if (res?.data?.booking) {
            setBooking(res.data.booking);
            if (res.data.booking.paymentStatus === 'paid' || res.data.booking.advanceDepositPKR > 0) {
              setIsPaid(true);
            }
          }
        } catch (e) {
          // ignore error and use mock fallback
        }
      }
    }
    fetchBooking();
  }, [id]);

  const totalAmount = Number(booking.totalAmountPKR || 350000);
  const advanceRequired = Math.round(totalAmount * 0.2);

  const handlePayNow = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsPaid(true);
      setPaidDetails({
        amountPaid: advanceRequired,
        method: paymentMethod.toUpperCase(),
        trxId: transactionRef || `TRX-${Math.floor(10000000 + Math.random() * 90000000)}`,
        date: new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
      });
      setIsProcessing(false);
    }, 600);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = `*WedPlan Official Bill & Payment Confirmation* 👑%0A%0A` +
      `• *Invoice No:* ${booking.invoiceNumber}%0A` +
      `• *Booking Ref:* ${booking.bookingNumber}%0A` +
      `• *Customer:* ${booking.customer?.name || 'Customer'}%0A` +
      `• *Service:* ${booking.service?.title || 'Wedding Service'}%0A` +
      `• *Total Price:* Rs. ${totalAmount.toLocaleString()} PKR%0A` +
      `• *Advance Deposit:* Rs. ${advanceRequired.toLocaleString()} PKR%0A` +
      `• *Status:* ${isPaid ? 'PAID & VERIFIED' : 'PENDING PAYMENT'}%0A%0A` +
      `Sajjad Bhai, please check my official wedding invoice.`;

    window.open(`https://wa.me/923069122770?text=${text}`, '_blank');
  };

  return (
    <div>
      <PageHeader 
        title="Wedding Bill & Tax Invoice"
        subtitle="Official billing summary, 20% advance milestone deposit, and verified payment receipt."
        badge="Official Invoice"
        breadcrumbs={[
          { label: 'Dashboard', path: '/customer/dashboard' },
          { label: 'Invoice & Bill' }
        ]}
      />

      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Link to="/customer/dashboard" className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1">
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <div className="d-flex align-items-center gap-2">
            <button onClick={handlePrint} className="btn btn-outline-dark btn-sm d-flex align-items-center gap-1">
              <Printer size={15} /> Print / Download PDF
            </button>
            <button onClick={handleShareWhatsApp} className="btn btn-success btn-sm d-flex align-items-center gap-1 text-white">
              <MessageCircle size={15} /> WhatsApp (0306-9122770)
            </button>
          </div>
        </div>

        {/* The Printable Invoice Container */}
        <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border mx-auto" style={{ maxWidth: '900px' }}>
          
          {/* Header Row */}
          <div className="row g-4 align-items-start border-bottom pb-4 mb-4">
            <div className="col-12 col-md-7">
              <div className="d-flex align-items-center gap-2 mb-2">
                <img 
                  src="/logo.jpg" 
                  alt="WedPlan Pakistan" 
                  className="rounded-circle border"
                  style={{ width: '56px', height: '56px', objectFit: 'cover', borderColor: 'var(--wp-gold, #C5A059)' }}
                />
                <div>
                  <h4 className="font-serif fw-bold text-dark mb-0 lh-1">WedPlan Pakistan</h4>
                  <span className="small text-muted text-uppercase fw-semibold" style={{ fontSize: '0.72rem', letterSpacing: '1px' }}>
                    Premier Wedding Planning & Escrow Billing
                  </span>
                </div>
              </div>
              <div className="text-muted small mt-2">
                <div><strong>Support & Billing Lead:</strong> Sajjad Wazir</div>
                <div><strong>WhatsApp / Helpline:</strong> 0306-9122770 (+92 306 9122770)</div>
                <div><strong>Email:</strong> sajjadwazir4459@email.com</div>
                <div><strong>Head Office:</strong> Main Boulevard, Gulberg III, Lahore, Pakistan</div>
              </div>
            </div>

            <div className="col-12 col-md-5 text-md-end">
              <div className="bg-light p-3 rounded-3 border d-inline-block text-start text-md-end">
                <span className="badge bg-warning text-dark mb-1 fw-bold">TAX INVOICE</span>
                <div className="fw-bold font-monospace fs-5 text-dark">{booking.invoiceNumber}</div>
                <div className="small text-muted"><strong>Booking Ref:</strong> {booking.bookingNumber}</div>
                <div className="small text-muted"><strong>Date Issued:</strong> {new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                <div className="small text-muted"><strong>Event Date:</strong> {formatDate(booking.eventDate)}</div>

                {isPaid ? (
                  <div className="mt-2 text-success fw-bold d-flex align-items-center gap-1 justify-content-md-end">
                    <CheckCircle2 size={16} /> Status: <strong>PAID & CONFIRMED</strong>
                  </div>
                ) : (
                  <div className="mt-2 text-danger fw-bold d-flex align-items-center gap-1 justify-content-md-end">
                    <Clock size={16} /> Status: <strong>PENDING PAYMENT</strong>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Customer & Vendor Details */}
          <div className="row g-3 mb-4">
            <div className="col-12 col-md-6">
              <div className="p-3 bg-light rounded-3 border h-100">
                <span className="text-muted small fw-bold text-uppercase d-block mb-1">
                  <User size={13} className="inline me-1 text-warning" /> Customer Details
                </span>
                <h6 className="fw-bold text-dark mb-1">{booking.customer?.name || 'Zaid & Ayesha'}</h6>
                <div className="small text-muted">Phone: {booking.customer?.phone || '0300-1234567'}</div>
                <div className="small text-muted">Email: {booking.customer?.email || 'customer@wedplan.pk'}</div>
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="p-3 bg-light rounded-3 border h-100">
                <span className="text-muted small fw-bold text-uppercase d-block mb-1">
                  <Building2 size={13} className="inline me-1 text-warning" /> Reserved Wedding Service
                </span>
                <h6 className="fw-bold text-dark mb-1">{booking.service?.title || 'The Royal Crystal Ballroom'}</h6>
                <div className="small text-muted">Event: <strong>{booking.eventName}</strong></div>
                <div className="small text-muted">Date: <strong>{formatDate(booking.eventDate)}</strong></div>
              </div>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="table-responsive mb-4">
            <table className="table table-bordered align-middle mb-0">
              <thead className="table-light small">
                <tr>
                  <th>Description</th>
                  <th>Event Day</th>
                  <th className="text-end">Amount (PKR)</th>
                </tr>
              </thead>
              <tbody className="small">
                <tr>
                  <td>
                    <strong className="text-dark d-block">{booking.service?.title || 'The Royal Crystal Ballroom'}</strong>
                    <span className="text-muted">Full wedding event reservation with 100% price guarantee & cancellation protection.</span>
                  </td>
                  <td>{formatDate(booking.eventDate)} ({booking.eventName})</td>
                  <td className="text-end fw-bold text-dark">{formatPKR(totalAmount)}</td>
                </tr>
                <tr>
                  <td colSpan="2" className="text-end text-muted">
                    <strong>20% Advance Milestone Deposit (Payable to Lock Date):</strong>
                  </td>
                  <td className="text-end fw-bold text-warning">{formatPKR(advanceRequired)}</td>
                </tr>
                <tr>
                  <td colSpan="2" className="text-end text-muted">
                    <strong>Remaining Balance (Payable at Event Day):</strong>
                  </td>
                  <td className="text-end fw-bold text-muted">{formatPKR(totalAmount - advanceRequired)}</td>
                </tr>
                <tr className="table-light">
                  <td colSpan="2" className="text-end fs-6 fw-bold text-dark">
                    Total Package Commitment (PKR):
                  </td>
                  <td className="text-end fs-6 fw-bold text-success">{formatPKR(totalAmount)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Status: Paid Watermark OR Payment Form */}
          {isPaid ? (
            <div className="p-4 rounded-4 mb-4 text-center border" style={{ backgroundColor: '#F3FAF5', borderColor: '#28A745' }}>
              <div 
                className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2 fw-bold text-uppercase"
                style={{ backgroundColor: '#D4EDDA', color: '#155724', border: '1.5px solid #28A745' }}
              >
                <CheckCircle2 size={16} /> OFFICIAL PAYMENT STAMP — PAID & VERIFIED
              </div>
              <div className="small text-muted mt-2">
                <strong>Amount Received:</strong> <span className="text-success fw-bold">{formatPKR(paidDetails.amountPaid)}</span> • 
                <strong> Channel:</strong> {paidDetails.method} • 
                <strong> TRX ID:</strong> <span className="font-monospace text-dark fw-bold">{paidDetails.trxId}</span> • 
                <strong> Date:</strong> {paidDetails.date}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-4 bg-light border mb-4">
              <h5 className="font-serif fw-bold text-dark mb-3 d-flex align-items-center gap-2">
                <CreditCard size={20} className="text-warning" /> Pay 20% Advance ({formatPKR(advanceRequired)}) Online
              </h5>

              <form onSubmit={handlePayNow}>
                <div className="row g-2 mb-3">
                  <div className="col-12 col-sm-4">
                    <button
                      type="button"
                      className={`btn w-100 p-2 text-start small ${paymentMethod === 'jazzcash' ? 'btn-dark' : 'btn-outline-secondary bg-white'}`}
                      onClick={() => setPaymentMethod('jazzcash')}
                    >
                      <strong className="text-warning d-block">JazzCash</strong>
                      <span>0306-9122770</span>
                    </button>
                  </div>
                  <div className="col-12 col-sm-4">
                    <button
                      type="button"
                      className={`btn w-100 p-2 text-start small ${paymentMethod === 'easypaisa' ? 'btn-dark' : 'btn-outline-secondary bg-white'}`}
                      onClick={() => setPaymentMethod('easypaisa')}
                    >
                      <strong className="text-success d-block">EasyPaisa</strong>
                      <span>0306-9122770</span>
                    </button>
                  </div>
                  <div className="col-12 col-sm-4">
                    <button
                      type="button"
                      className={`btn w-100 p-2 text-start small ${paymentMethod === 'bank_transfer' ? 'btn-dark' : 'btn-outline-secondary bg-white'}`}
                      onClick={() => setPaymentMethod('bank_transfer')}
                    >
                      <strong className="d-block">Bank Alfalah</strong>
                      <span>IBAN Transfer</span>
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-white rounded-3 border mb-3 small">
                  <strong>Account Title:</strong> Sajjad Wazir (WedPlan Escrow) • <strong>Account / Mobile:</strong> 0306-9122770
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Transaction Reference ID (TID)</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm"
                    placeholder="Enter JazzCash / EasyPaisa / Bank TID"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className="btn btn-gold w-100 py-2 fs-6 fw-bold d-flex align-items-center justify-content-center gap-2"
                >
                  <ShieldCheck size={18} />
                  {isProcessing ? 'Verifying Payment...' : `Confirm & Pay ${formatPKR(advanceRequired)}`}
                </button>
              </form>
            </div>
          )}

          {/* Bottom Footnote */}
          <div className="text-center text-muted small border-top pt-3" style={{ fontSize: '0.72rem' }}>
            <p className="mb-1">
              All prices quoted in Pakistani Rupees (PKR). WedPlan Escrow Protection protects wedding reservations across Pakistan.
            </p>
            <p className="mb-0">
              Need assistance? Contact Sajjad Wazir: <strong>0306-9122770</strong> | sajjadwazir4459@email.com
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BillInvoicePage;
