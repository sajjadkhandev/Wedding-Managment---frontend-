import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Phone, Mail, MapPin, Heart, ShieldCheck } from 'lucide-react';
import { CITIES } from '../../data/mockData';

const Footer = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-auto" style={{ backgroundColor: '#18161A' }}>
      <div className="container">
        <div className="row g-4 pb-5 border-bottom border-secondary border-opacity-25">
          {/* Col 1: Brand & Mission */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img 
                src="/logo.jpg" 
                alt="WedPlan Pakistan" 
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
                <Sparkles size={20} color="#FFFFFF" />
              </div>
              <div>
                <span className="font-serif fw-bold fs-3 text-white d-block lh-1">WedPlan</span>
                <span className="text-uppercase fw-bold" style={{ color: 'var(--wp-gold, #C5A059)', fontSize: '0.65rem', letterSpacing: '2px' }}>Pakistan</span>
              </div>
            </div>
            <p className="text-secondary small pe-lg-3">
              Pakistan’s premier wedding planning and vendor booking platform. Seamlessly connect with verified marriage halls, luxury car rentals, authentic caterers, photographers, and stylists across Pakistan.
            </p>
            <div className="d-flex align-items-center gap-2 mt-3 p-2 rounded bg-black bg-opacity-25 border border-secondary border-opacity-25">
              <ShieldCheck size={20} className="text-warning flex-shrink-0" />
              <span className="small text-secondary">Verified Vendors & Protected Booking Commitments</span>
            </div>
          </div>

          {/* Col 2: Wedding Services */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-white text-uppercase fw-bold mb-3 font-serif" style={{ letterSpacing: '1px' }}>
              Services
            </h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li><Link to="/services/venues" className="text-secondary text-decoration-none hover-gold">Wedding Venues</Link></li>
              <li><Link to="/services/cars" className="text-secondary text-decoration-none hover-gold">Car Rental</Link></li>
              <li><Link to="/services/catering" className="text-secondary text-decoration-none hover-gold">Catering & Food</Link></li>
              <li><Link to="/services/photography" className="text-secondary text-decoration-none hover-gold">Photography</Link></li>
              <li><Link to="/services/decoration" className="text-secondary text-decoration-none hover-gold">Stage Decor</Link></li>
              <li><Link to="/services/makeup" className="text-secondary text-decoration-none hover-gold">Bridal Makeup</Link></li>
              <li><Link to="/services/dresses" className="text-secondary text-decoration-none hover-gold">Wedding Dresses</Link></li>
              <li><Link to="/services/planners" className="text-secondary text-decoration-none hover-gold">Wedding Planners</Link></li>
            </ul>
          </div>

          {/* Col 3: Platform & Links */}
          <div className="col-lg-3 col-md-6 col-6">
            <h6 className="text-white text-uppercase fw-bold mb-3 font-serif" style={{ letterSpacing: '1px' }}>
              Quick Links
            </h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li><Link to="/about" className="text-secondary text-decoration-none hover-gold">About WedPlan</Link></li>
              <li><Link to="/how-it-works" className="text-secondary text-decoration-none hover-gold">How It Works</Link></li>
              <li><Link to="/packages" className="text-secondary text-decoration-none hover-gold">Wedding Packages</Link></li>
              <li><Link to="/vendor-register" className="text-warning text-decoration-none hover-gold fw-semibold">Join as Vendor</Link></li>
              <li><Link to="/faq" className="text-secondary text-decoration-none hover-gold">Frequently Asked Questions</Link></li>
              <li><Link to="/privacy" className="text-secondary text-decoration-none hover-gold">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-secondary text-decoration-none hover-gold">Terms of Service</Link></li>
              <li><Link to="/contact" className="text-secondary text-decoration-none hover-gold">Contact Support</Link></li>
            </ul>
          </div>

          {/* Col 4: Cities & Contact */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-white text-uppercase fw-bold mb-3 font-serif" style={{ letterSpacing: '1px' }}>
              Cities & Contact
            </h6>
            <div className="d-flex flex-wrap gap-1 mb-3">
              {CITIES.slice(0, 7).map(city => (
                <Link key={city} to={`/search?city=${city}`} className="badge bg-secondary bg-opacity-25 text-light text-decoration-none px-2 py-1 small">
                  {city}
                </Link>
              ))}
            </div>
            <div className="text-secondary small d-flex flex-column gap-2 mt-3">
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-warning text-dark px-2 py-1 fw-bold" style={{ fontSize: '0.72rem' }}>Contact Person</span>
                <strong className="text-white">Sajjad Wazir</strong>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Phone size={15} className="text-warning" />
                <a 
                  href="https://wa.me/923069122770?text=Assalam-o-Alaikum%20Sajjad%20Bhai,%20I%20have%20an%20inquiry%20regarding%20WedPlan" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-secondary text-decoration-none hover-gold"
                >
                  0306-9122770 (WhatsApp & Call)
                </a>
              </div>
              <div className="d-flex align-items-center gap-2">
                <Mail size={15} className="text-warning" />
                <a href="mailto:sajjadwazir4459@email.com" className="text-secondary text-decoration-none hover-gold">
                  sajjadwazir4459@email.com
                </a>
              </div>
              <div className="d-flex align-items-center gap-2">
                <MapPin size={15} className="text-warning" />
                <span>Main Boulevard, Gulberg III, Lahore, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pt-4 small text-secondary">
          <p className="mb-2 mb-md-0">
            © {new Date().getFullYear()} WedPlan Pakistan. All rights reserved. All prices quoted in Pakistani Rupees (PKR).
          </p>
          <div className="d-flex align-items-center gap-1">
            <span>Crafted with</span>
            <Heart size={14} className="text-danger inline" fill="currentColor" />
            <span>for Pakistani Weddings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
