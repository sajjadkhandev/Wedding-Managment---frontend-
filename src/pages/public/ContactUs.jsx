import React, { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { CITIES } from '../../data/mockData';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Lahore',
    inquiryType: 'Customer Planning',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <PageHeader 
        title="Contact WedPlan Support"
        subtitle="Need assistance with planning your Pakistani wedding or listing your vendor business? Sajjad Wazir and our team are available 7 days a week."
        badge="Get in Touch"
        breadcrumbs={[{ label: 'Contact Us' }]}
      />

      <div className="container py-5">
        <div className="row g-5">
          {/* Contact Details Column */}
          <div className="col-12 col-lg-5">
            <span className="badge-gold mb-2">Direct Contact</span>
            <h3 className="font-serif fw-bold mb-1">Sajjad Wazir</h3>
            <span className="badge bg-warning text-dark mb-3">Head of Operations & Concierge</span>
            <p className="text-muted mb-4">
              Whether you need recommendations for marriage halls in Lahore, bridal cars in Islamabad, or have inquiries regarding our packages, contact Sajjad Wazir directly.
            </p>

            {/* Direct WhatsApp Call to Action Card */}
            <div className="p-3 mb-4 rounded-3 text-white shadow-sm d-flex align-items-center justify-content-between" style={{ backgroundColor: '#25D366' }}>
              <div>
                <div className="fw-bold fs-6 d-flex align-items-center gap-2">
                  <MessageCircle size={20} /> Chat on WhatsApp
                </div>
                <div className="small text-white text-opacity-90">0306-9122770 (Instant Reply)</div>
              </div>
              <a 
                href="https://wa.me/923069122770?text=Assalam-o-Alaikum%20Sajjad%20Bhai,%20I%20have%20an%20inquiry%20regarding%20WedPlan" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-light btn-sm fw-bold px-3 py-2 text-dark shadow-xs"
              >
                Chat Now
              </a>
            </div>

            <div className="d-flex flex-column gap-3 mb-4">
              <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-light border">
                <Phone size={22} className="text-warning mt-1 flex-shrink-0" />
                <div>
                  <h6 className="fw-bold mb-1">WhatsApp & Direct Phone</h6>
                  <a href="tel:03069122770" className="text-dark fw-bold text-decoration-none d-block">
                    0306-9122770
                  </a>
                  <span className="text-muted small">+92 306 9122770 • Daily: 9:00 AM - 11:00 PM PKT</span>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-light border">
                <Mail size={22} className="text-warning mt-1 flex-shrink-0" />
                <div>
                  <h6 className="fw-bold mb-1">Email Inquiries</h6>
                  <a href="mailto:sajjadwazir4459@email.com" className="text-dark fw-bold text-decoration-none d-block">
                    sajjadwazir4459@email.com
                  </a>
                  <span className="text-muted small">Personalized wedding & vendor support</span>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3 p-3 rounded-3 bg-light border">
                <MapPin size={22} className="text-warning mt-1 flex-shrink-0" />
                <div>
                  <h6 className="fw-bold mb-1">Office Locations</h6>
                  <span className="text-muted small d-block"><strong>Lahore:</strong> Main Boulevard, Gulberg III</span>
                  <span className="text-muted small d-block"><strong>Karachi:</strong> Shahrah-e-Faisal, Block 6 PECHS</span>
                  <span className="text-muted small"><strong>Islamabad:</strong> Blue Area, Jinnah Avenue</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="col-12 col-lg-7">
            <div className="p-4 p-md-5 rounded-4 bg-white shadow-sm border">
              <h4 className="font-serif fw-bold mb-2">Send Us a Message</h4>
              <p className="text-muted small mb-4">Fill out this quick form and our support desk will respond within 4 business hours.</p>

              {submitted ? (
                <div className="alert alert-success d-flex align-items-center gap-3 p-4 rounded-3">
                  <CheckCircle2 size={32} className="text-success flex-shrink-0" />
                  <div>
                    <h5 className="fw-bold mb-1">Message Received!</h5>
                    <p className="mb-0 small">Thank you, {formData.name}. Sajjad Wazir (WedPlan Concierge Lead) will contact you at {formData.phone || formData.email} shortly.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold">Full Name *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      required
                      placeholder="e.g. Zaid Khan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold">Phone Number *</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      required
                      placeholder="0300-1234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold">Email Address *</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-bold">Your City</label>
                    <select 
                      className="form-select"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    >
                      {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-bold">Subject / Inquiry Type</label>
                    <select 
                      className="form-select"
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    >
                      <option value="Customer Planning">Wedding Planning Assistance (Couple / Family)</option>
                      <option value="Vendor Listing">Vendor Registration & Listing Query</option>
                      <option value="Payment / Booking">Booking or Payment Verification</option>
                      <option value="Complaint">Report an Issue or Dispute</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-bold">Your Message *</label>
                    <textarea 
                      rows="4" 
                      className="form-control" 
                      required
                      placeholder="Tell us about your wedding dates, requested venue, or business query..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <button type="submit" className="btn-gold w-100 py-2 fs-6">
                      <Send size={18} /> Submit Inquiry
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
