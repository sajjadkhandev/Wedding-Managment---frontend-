import React from 'react';
import { ShieldCheck, Banknote, CalendarCheck2, Users2, Sparkles, CheckCircle2 } from 'lucide-react';

const benefits = [
  {
    icon: Banknote,
    title: '100% Transparent PKR Pricing',
    description: 'No hidden commission surprises. Every hall rate, car rental, and per-head catering menu is explicitly quoted in Pakistani Rupees.'
  },
  {
    icon: ShieldCheck,
    title: 'Anti-Double-Booking Protection',
    description: 'Our real-time date verification system prevents multiple customers from reserving the same hall or bridal car on the exact same date.'
  },
  {
    icon: CalendarCheck2,
    title: 'Multi-Event Wedding Architecture',
    description: 'Tailored for Pakistani traditions. Effortlessly organize your Mehndi, Baraat, Walima, and Nikah as individual milestones.'
  },
  {
    icon: Users2,
    title: 'Digital Guest & RSVP Management',
    description: 'Track guest counts per event day so your caterers and banquet halls have precise headcounts with zero wastage.'
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container py-3">
        <div className="row align-items-center g-5">
          {/* Left Column: Visual graphic */}
          <div className="col-12 col-lg-5">
            <div className="position-relative">
              <div className="rounded-4 overflow-hidden shadow-lg border border-warning border-opacity-25" style={{ aspectRatio: '4/3' }}>
                <img 
                  src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80" 
                  alt="Pakistani Wedding Celebration" 
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
              <div 
                className="position-absolute bottom-0 start-0 m-3 p-3 bg-white rounded-3 shadow-lg border"
                style={{ maxWidth: '260px' }}
              >
                <div className="d-flex align-items-center gap-2 mb-1">
                  <Sparkles size={18} className="text-warning" />
                  <span className="fw-bold small text-dark">Smart Pakistani Planning</span>
                </div>
                <p className="text-muted small mb-0" style={{ fontSize: '0.78rem' }}>
                  Over 10,000+ guest hours saved through automated scheduling.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Benefit Cards */}
          <div className="col-12 col-lg-7">
            <span className="badge-gold mb-2">Why Families Trust WedPlan</span>
            <h2 className="font-serif fw-bold mb-3">Redefining How Pakistan Plans Weddings</h2>
            <p className="text-muted mb-4">
              Traditional wedding preparation in Pakistan involves countless phone calls, price uncertainties, and booking clashes. WedPlan delivers total transparency and control to both families and service providers.
            </p>

            <div className="row g-3">
              {benefits.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div key={idx} className="col-12 col-sm-6">
                    <div className="p-3 rounded-3 bg-light h-100 border">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <div className="text-warning">
                          <Icon size={20} />
                        </div>
                        <h6 className="font-serif fw-bold mb-0 text-dark">{b.title}</h6>
                      </div>
                      <p className="text-muted small mb-0">{b.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
