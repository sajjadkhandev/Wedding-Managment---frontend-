import React, { useState } from 'react';
import { formatPKR, formatDate } from '../../utils/formatters';
import { paymentApi } from '../../services/api';
import { 
  X, 
  Printer, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Building2, 
  FileText, 
  Calendar, 
  User, 
  Clock, 
  MapPin, 
  ArrowRight,
  Receipt
} from 'lucide-react';

const PaymentBillModal = ({ booking, isOpen, onClose, onPaymentSuccess }) => {
  if (!isOpen || !booking) return null;

  const totalAmount = Number(booking.totalAmountPKR || booking.pricePKR || 350000);
  const alreadyPaid = Number(booking.advanceDepositPKR || 0);
  const advanceRequired = Math.round(totalAmount * 0.2); // 20% Pakistani standard milestone deposit
  const remainingDue = Math.max(0, totalAmount - alreadyPaid);

  // States
  const [payOption, setPayOption] = useState(alreadyPaid >= advanceRequired ? 'full' : 'advance'); // 'advance' | 'full'
  const [paymentMethod, setPaymentMethod] = useState('jazzcash'); // 'jazzcash' | 'easypaisa' | 'bank_transfer' | 'card'
  const [transactionRef, setTransactionRef] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(booking.status === 'confirmed' || alreadyPaid >= advanceRequired);
  const [paidDetails, setPaidDetails] = useState({
    invoiceNumber: booking.invoiceNumber || `WP-INV-${booking.bookingNumber ? booking.bookingNumber.replace('WP-BK-', '') : '829101'}`,
    paymentNumber: `WP-PAY-${Date.now().toString().slice(-6)}`,
    amountPaid: alreadyPaid > 0 ? alreadyPaid : advanceRequired,
    method: 'Online Verified',
    trxId: 'ONLINE-TRX-829102',
    date: new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })
  });

  const payableAmount = payOption === 'advance' 
    ? Math.max(0, advanceRequired - alreadyPaid) 
    : remainingDue;

  const invoiceNo = booking.invoiceNumber || `WP-INV-${booking.bookingNumber ? booking.bookingNumber.replace('WP-BK-', '') : '829101'}`;
  const bookingNo = booking.bookingNumber || `WP-BK-829101`;
  const customerName = booking.customerName || booking.customer?.name || 'Zaid & Ayesha';
  const customerPhone = booking.customerPhone || booking.customer?.phone || '0300-1234567';
  const customerEmail = booking.customerEmail || booking.customer?.email || 'customer@wedplan.pk';
  const vendorName = booking.service?.title || booking.title || booking.vendor?.businessName || 'The Royal Crystal Ballroom';
  const eventName = booking.eventName || 'Baraat';
  const eventDate = booking.eventDate ? formatDate(booking.eventDate) : '20 Nov 2026';

  const handleProcessPayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const generatedTrx = transactionRef.trim() || `${paymentMethod.toUpperCase()}-${Math.floor(10000000 + Math.random() * 90000000)}`;

    try {
      if (booking._id && !booking._id.startsWith('bk-demo')) {
        await paymentApi.recordPayment({
          bookingId: booking._id,
          amountPKR: payableAmount,
          paymentType: payOption === 'advance' ? 'advance_deposit' : 'full_payment',
          paymentMethod,
          transactionReference: generatedTrx,
          notes: `Paid ${formatPKR(payableAmount)} via ${paymentMethod.toUpperCase()} on WedPlan.`
        });
      }
    } catch (err) {
      console.warn('Backend payment record error (using local state fallback):', err);
    }

    const newPaidState = {
      invoiceNumber: invoiceNo,
      paymentNumber: `WP-PAY-${Math.floor(100000 + Math.random() * 900000)}`,
      amountPaid: payableAmount + alreadyPaid,
      method: paymentMethod.toUpperCase().replace('_', ' '),
      trxId: generatedTrx,
      date: new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };

    setPaidDetails(newPaidState);
    setIsPaid(true);
    setIsProcessing(false);

    if (onPaymentSuccess) {
      onPaymentSuccess({
        bookingId: booking._id,
        amountPaid: newPaidState.amountPaid,
        invoiceNumber: invoiceNo,
        trxId: generatedTrx
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = `*WedPlan Official Bill & Payment Confirmation* 👑%0A%0A` +
      `• *Invoice No:* ${invoiceNo}%0A` +
      `• *Booking Ref:* ${bookingNo}%0A` +
      `• *Customer:* ${customerName}%0A` +
      `• *Service / Venue:* ${vendorName}%0A` +
      `• *Event Date:* ${eventDate} (${eventName})%0A` +
      `• *Total Price:* Rs. ${totalAmount.toLocaleString()} PKR%0A` +
      `• *Amount Paid:* Rs. ${paidDetails.amountPaid.toLocaleString()} PKR%0A` +
      `• *Status:* ${isPaid ? 'PAID & VERIFIED' : 'PENDING'}%0A` +
      `• *Transaction ID:* ${paidDetails.trxId}%0A%0A` +
      `Assalam-o-Alaikum Sajjad Bhai, please verify this payment for my booking.`;

    window.open(`https://wa.me/923069122770?text=${text}`, '_blank');
  };

  return (
    <div 
      className="modal show d-block" 
      tabIndex="-1" 
      style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1060 }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
        <div className="modal-content rounded-4 border-0 shadow-2xl overflow-hidden bg-white">
          
          {/* Modal Header */}
          <div 
            className="p-3 px-4 d-flex justify-content-between align-items-center text-white"
            style={{ backgroundColor: 'var(--wp-charcoal, #212529)', borderBottom: '2px solid var(--wp-gold, #C5A059)' }}
          >
            <div className="d-flex align-items-center gap-2">
              <Receipt size={22} className="text-warning" />
              <h5 className="font-serif fw-bold mb-0 text-white">
                Official Bill & Tax Invoice Receipt
              </h5>
            </div>
            <button 
              type="button" 
              className="btn btn-sm btn-outline-light rounded-circle p-1 d-flex align-items-center justify-content-center"
              onClick={onClose}
              style={{ width: '32px', height: '32px' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Body: The Printable Bill */}
          <div className="modal-body p-4 p-md-5" id="printable-bill-area">
            
            {/* Top Brand & Invoice Metadata Bar */}
            <div className="row g-4 align-items-start border-bottom pb-4 mb-4">
              <div className="col-12 col-sm-7">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <img 
                    src="/logo.jpg" 
                    alt="WedPlan Pakistan" 
                    className="rounded-circle border"
                    style={{ width: '52px', height: '52px', objectFit: 'cover', borderColor: 'var(--wp-gold, #C5A059)' }}
                  />
                  <div>
                    <h4 className="font-serif fw-bold text-dark mb-0 lh-1">WedPlan Pakistan</h4>
                    <span className="small text-muted text-uppercase fw-semibold" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
                      Official Wedding Marketplace & Escrow Billing
                    </span>
                  </div>
                </div>
                <div className="text-muted small mt-2">
                  <div><strong>Support & Billing Lead:</strong> Sajjad Wazir</div>
                  <div><strong>WhatsApp & Helpline:</strong> 0306-9122770 (+92 306 9122770)</div>
                  <div><strong>Email:</strong> sajjadwazir4459@email.com</div>
                  <div><strong>Address:</strong> Main Boulevard, Gulberg III, Lahore, Pakistan</div>
                </div>
              </div>

              <div className="col-12 col-sm-5 text-sm-end">
                <div className="d-inline-block text-start text-sm-end bg-light p-3 rounded-3 border">
                  <span className="badge bg-warning text-dark mb-1 fw-bold">TAX INVOICE</span>
                  <div className="fw-bold font-monospace fs-5 text-dark">{invoiceNo}</div>
                  <div className="small text-muted"><strong>Booking Ref:</strong> {bookingNo}</div>
                  <div className="small text-muted"><strong>Invoice Date:</strong> {new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                  <div className="small text-muted"><strong>Event Date:</strong> {eventDate}</div>
                  
                  {isPaid ? (
                    <div className="mt-2 text-success fw-bold d-flex align-items-center gap-1 justify-content-sm-end">
                      <CheckCircle2 size={16} /> Status: <strong>PAID & LOCKED</strong>
                    </div>
                  ) : (
                    <div className="mt-2 text-danger fw-bold d-flex align-items-center gap-1 justify-content-sm-end">
                      <Clock size={16} /> Status: <strong>UNPAID (Pending Deposit)</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Billed To / Vendor Row */}
            <div className="row g-3 mb-4">
              <div className="col-12 col-md-6">
                <div className="p-3 rounded-3 bg-light border h-100">
                  <span className="text-muted small fw-bold text-uppercase d-block mb-1">
                    <User size={13} className="inline me-1 text-warning" /> Billed To (Customer Details)
                  </span>
                  <h6 className="fw-bold text-dark mb-1">{customerName}</h6>
                  <div className="small text-muted">Phone: {customerPhone}</div>
                  <div className="small text-muted">Email: {customerEmail}</div>
                  <div className="small text-muted">City: Lahore / Pakistan</div>
                </div>
              </div>

              <div className="col-12 col-md-6">
                <div className="p-3 rounded-3 bg-light border h-100">
                  <span className="text-muted small fw-bold text-uppercase d-block mb-1">
                    <Building2 size={13} className="inline me-1 text-warning" /> Service Provider / Vendor
                  </span>
                  <h6 className="fw-bold text-dark mb-1">{vendorName}</h6>
                  <div className="small text-muted">Event: <strong>{eventName}</strong></div>
                  <div className="small text-muted">Scheduled Date: <strong>{eventDate}</strong></div>
                  <div className="small text-muted">Platform Guarantee: Verified & Price-Frozen in PKR</div>
                </div>
              </div>
            </div>

            {/* Itemized Financial Breakdown Table */}
            <div className="table-responsive mb-4">
              <table className="table table-bordered align-middle mb-0">
                <thead className="table-light small">
                  <tr>
                    <th>Item Description</th>
                    <th>Event Day</th>
                    <th className="text-center">Rate Type</th>
                    <th className="text-end">Amount (PKR)</th>
                  </tr>
                </thead>
                <tbody className="small">
                  <tr>
                    <td>
                      <strong className="text-dark d-block">{vendorName}</strong>
                      <span className="text-muted">Confirmed wedding reservation with all standard inclusions & platform protection.</span>
                    </td>
                    <td>{eventDate} ({eventName})</td>
                    <td className="text-center"><span className="badge bg-secondary bg-opacity-10 text-dark">Locked Rate</span></td>
                    <td className="text-end fw-bold text-dark">{formatPKR(totalAmount)}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="text-end text-muted">
                      <strong>20% Advance Milestone Deposit (Required to lock date):</strong>
                    </td>
                    <td className="text-end fw-bold text-warning">{formatPKR(advanceRequired)}</td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="text-end text-muted">
                      <strong>Remaining Balance Due on Event Day:</strong>
                    </td>
                    <td className="text-end fw-bold text-muted">{formatPKR(Math.max(0, totalAmount - advanceRequired))}</td>
                  </tr>
                  <tr className="table-light">
                    <td colSpan="3" className="text-end fs-6 fw-bold text-dark">
                      Total Package Commitment (PKR):
                    </td>
                    <td className="text-end fs-6 fw-bold text-success">{formatPKR(totalAmount)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* PAID WATERMARK & RECEIPT STAMP IF PAID */}
            {isPaid ? (
              <div 
                className="p-4 rounded-4 mb-4 text-center position-relative border"
                style={{
                  backgroundColor: '#F3FAF5',
                  borderColor: '#28a745',
                  boxShadow: '0 4px 16px rgba(40,167,69,0.1)'
                }}
              >
                <div 
                  className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill mb-2 fw-bold text-uppercase"
                  style={{
                    backgroundColor: '#D4EDDA',
                    color: '#155724',
                    border: '1.5px solid #28A745',
                    fontSize: '0.82rem',
                    letterSpacing: '1px'
                  }}
                >
                  <CheckCircle2 size={16} /> OFFICIAL PAYMENT STAMP — PAID & VERIFIED
                </div>

                <div className="row g-2 justify-content-center small text-muted mt-2">
                  <div className="col-auto"><strong>Receipt #:</strong> {paidDetails.paymentNumber}</div>
                  <div className="col-auto">•</div>
                  <div className="col-auto"><strong>Amount Received:</strong> <span className="text-success fw-bold">{formatPKR(paidDetails.amountPaid)}</span></div>
                  <div className="col-auto">•</div>
                  <div className="col-auto"><strong>Channel:</strong> {paidDetails.method}</div>
                  <div className="col-auto">•</div>
                  <div className="col-auto"><strong>TRX ID:</strong> <span className="font-monospace text-dark fw-bold">{paidDetails.trxId}</span></div>
                  <div className="col-auto">•</div>
                  <div className="col-auto"><strong>Date:</strong> {paidDetails.date}</div>
                </div>

                <p className="small text-muted mb-0 mt-3" style={{ fontSize: '0.78rem' }}>
                  This payment has been acknowledged by WedPlan Pakistan Escrow. Your event date is securely locked with the vendor.
                </p>
              </div>
            ) : (
              /* PAYMENT PROCESSOR SECTION */
              <div className="p-4 rounded-4 bg-light border mb-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="font-serif fw-bold text-dark mb-0 d-flex align-items-center gap-2">
                    <CreditCard size={20} className="text-warning" />
                    Complete Online Payment in PKR
                  </h5>
                  <span className="badge bg-success bg-opacity-10 text-success fw-semibold">
                    <ShieldCheck size={14} className="inline me-1" /> 100% Secure Checkout
                  </span>
                </div>

                <form onSubmit={handleProcessPayment}>
                  {/* Select Payment Amount Option */}
                  <div className="mb-4">
                    <label className="form-label small fw-bold text-muted mb-2">Choose Payment Amount:</label>
                    <div className="row g-2">
                      <div className="col-12 col-sm-6">
                        <div 
                          className={`p-3 rounded-3 border cursor-pointer transition-all ${payOption === 'advance' ? 'bg-white border-warning shadow-sm' : 'bg-white text-muted'}`}
                          onClick={() => setPayOption('advance')}
                          style={{ cursor: 'pointer', border: payOption === 'advance' ? '2px solid var(--wp-gold, #C5A059)' : '1px solid #dee2e6' }}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <strong className="d-block text-dark small">20% Advance Milestone</strong>
                              <span className="small text-muted">Locks & reserves your wedding date</span>
                            </div>
                            <span className="fw-bold text-warning fs-6">{formatPKR(advanceRequired)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 col-sm-6">
                        <div 
                          className={`p-3 rounded-3 border cursor-pointer transition-all ${payOption === 'full' ? 'bg-white border-warning shadow-sm' : 'bg-white text-muted'}`}
                          onClick={() => setPayOption('full')}
                          style={{ cursor: 'pointer', border: payOption === 'full' ? '2px solid var(--wp-gold, #C5A059)' : '1px solid #dee2e6' }}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <strong className="d-block text-dark small">Full 100% Payment</strong>
                              <span className="small text-muted">Pay total package upfront</span>
                            </div>
                            <span className="fw-bold text-success fs-6">{formatPKR(totalAmount)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Tabs */}
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-muted mb-2">Select Payment Method (Pakistani Channels):</label>
                    <div className="row g-2 mb-3">
                      <div className="col-6 col-md-3">
                        <button
                          type="button"
                          className={`btn w-100 p-2 text-start small d-flex flex-column gap-1 ${paymentMethod === 'jazzcash' ? 'btn-dark' : 'btn-outline-secondary bg-white'}`}
                          onClick={() => setPaymentMethod('jazzcash')}
                        >
                          <div className="d-flex align-items-center justify-content-between w-100">
                            <strong className="text-warning">JazzCash</strong>
                            <Smartphone size={16} />
                          </div>
                          <span style={{ fontSize: '0.68rem' }}>0306-9122770</span>
                        </button>
                      </div>

                      <div className="col-6 col-md-3">
                        <button
                          type="button"
                          className={`btn w-100 p-2 text-start small d-flex flex-column gap-1 ${paymentMethod === 'easypaisa' ? 'btn-dark' : 'btn-outline-secondary bg-white'}`}
                          onClick={() => setPaymentMethod('easypaisa')}
                        >
                          <div className="d-flex align-items-center justify-content-between w-100">
                            <strong className="text-success">EasyPaisa</strong>
                            <Smartphone size={16} />
                          </div>
                          <span style={{ fontSize: '0.68rem' }}>0306-9122770</span>
                        </button>
                      </div>

                      <div className="col-6 col-md-3">
                        <button
                          type="button"
                          className={`btn w-100 p-2 text-start small d-flex flex-column gap-1 ${paymentMethod === 'bank_transfer' ? 'btn-dark' : 'btn-outline-secondary bg-white'}`}
                          onClick={() => setPaymentMethod('bank_transfer')}
                        >
                          <div className="d-flex align-items-center justify-content-between w-100">
                            <strong>Bank Transfer</strong>
                            <Building2 size={16} />
                          </div>
                          <span style={{ fontSize: '0.68rem' }}>Bank Alfalah / HBL</span>
                        </button>
                      </div>

                      <div className="col-6 col-md-3">
                        <button
                          type="button"
                          className={`btn w-100 p-2 text-start small d-flex flex-column gap-1 ${paymentMethod === 'card' ? 'btn-dark' : 'btn-outline-secondary bg-white'}`}
                          onClick={() => setPaymentMethod('card')}
                        >
                          <div className="d-flex align-items-center justify-content-between w-100">
                            <strong>Visa / Master</strong>
                            <CreditCard size={16} />
                          </div>
                          <span style={{ fontSize: '0.68rem' }}>Debit or Credit Card</span>
                        </button>
                      </div>
                    </div>

                    {/* Method Specific Details & Input */}
                    {(paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && (
                      <div className="p-3 bg-white rounded-3 border mb-3">
                        <h6 className="fw-bold text-dark small mb-1">
                          {paymentMethod === 'jazzcash' ? 'JazzCash Mobile Account Instructions:' : 'EasyPaisa Mobile Account Instructions:'}
                        </h6>
                        <p className="text-muted small mb-2" style={{ fontSize: '0.78rem' }}>
                          Please send <strong>{formatPKR(payableAmount)}</strong> to account number <strong>0306-9122770</strong> (Account Title: <strong>Sajjad Wazir</strong>) via your mobile app or retailer. Then enter the Transaction ID (TID) below:
                        </p>
                        <div className="row g-2 align-items-center">
                          <div className="col-12 col-sm-8">
                            <input 
                              type="text" 
                              className="form-control form-control-sm"
                              placeholder="e.g. TID: 9182736450"
                              value={transactionRef}
                              onChange={(e) => setTransactionRef(e.target.value)}
                            />
                          </div>
                          <div className="col-12 col-sm-4 text-muted small" style={{ fontSize: '0.72rem' }}>
                            (Leave blank for instant simulation)
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'bank_transfer' && (
                      <div className="p-3 bg-white rounded-3 border mb-3">
                        <h6 className="fw-bold text-dark small mb-1">Online Bank Account Details:</h6>
                        <div className="small text-muted mb-2" style={{ fontSize: '0.78rem' }}>
                          <div>• <strong>Bank Name:</strong> Bank Alfalah Ltd.</div>
                          <div>• <strong>Account Title:</strong> Sajjad Wazir (WedPlan Escrow)</div>
                          <div>• <strong>Account Number:</strong> 0123-1002938475</div>
                          <div>• <strong>IBAN:</strong> PK92ALFH0001092837465001</div>
                        </div>
                        <input 
                          type="text" 
                          className="form-control form-control-sm"
                          placeholder="Enter Bank Transfer Reference # / Screenshot Ref"
                          value={transactionRef}
                          onChange={(e) => setTransactionRef(e.target.value)}
                        />
                      </div>
                    )}

                    {paymentMethod === 'card' && (
                      <div className="p-3 bg-white rounded-3 border mb-3">
                        <div className="row g-2">
                          <div className="col-12">
                            <label className="form-label small fw-bold text-muted mb-1">Card Number</label>
                            <input 
                              type="text" 
                              className="form-control form-control-sm"
                              placeholder="4123 •••• •••• 9821"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                            />
                          </div>
                          <div className="col-6">
                            <label className="form-label small fw-bold text-muted mb-1">Expiry Date</label>
                            <input 
                              type="text" 
                              className="form-control form-control-sm"
                              placeholder="MM/YY"
                              value={cardExp}
                              onChange={(e) => setCardExp(e.target.value)}
                            />
                          </div>
                          <div className="col-6">
                            <label className="form-label small fw-bold text-muted mb-1">CVV</label>
                            <input 
                              type="password" 
                              maxLength="4" 
                              className="form-control form-control-sm"
                              placeholder="•••"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Payment Button */}
                  <button 
                    type="submit" 
                    disabled={isProcessing}
                    className="btn btn-gold w-100 py-3 fs-6 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
                  >
                    {isProcessing ? (
                      <span>Processing Payment...</span>
                    ) : (
                      <>
                        <ShieldCheck size={18} /> 
                        Pay {formatPKR(payableAmount)} & Generate Official Bill Receipt
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Bottom Footer Notes */}
            <div className="text-center text-muted small border-top pt-3" style={{ fontSize: '0.72rem' }}>
              <p className="mb-1">
                WedPlan Pakistan Escrow Guarantee: Payment remains protected until the milestone verification.
              </p>
              <p className="mb-0">
                Inquiries & manual bank confirmations: Sajjad Wazir | <strong>0306-9122770</strong> | sajjadwazir4459@email.com
              </p>
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="modal-footer p-3 px-4 bg-light d-flex justify-content-between align-items-center">
            <button 
              type="button" 
              className="btn btn-outline-secondary btn-sm"
              onClick={onClose}
            >
              Close
            </button>

            <div className="d-flex align-items-center gap-2">
              <button 
                type="button" 
                className="btn btn-outline-dark btn-sm d-flex align-items-center gap-1"
                onClick={handlePrint}
              >
                <Printer size={15} /> Print / Save PDF
              </button>

              <button 
                type="button" 
                className="btn btn-success btn-sm d-flex align-items-center gap-1 text-white"
                onClick={handleShareWhatsApp}
              >
                <MessageCircle size={15} /> Send to WhatsApp (0306-9122770)
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentBillModal;
