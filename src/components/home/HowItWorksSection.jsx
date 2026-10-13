import React from 'react';
import { Calendar, Search, HeartHandshake, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: '01',
    title: 'Create Your Wedding Project',
    description: 'Set up your wedding profile and specify your multi-day events: Mehndi, Baraat, Walima, and Nikah dates with estimated budgets.',
    icon: Calendar
  },
  {
    number: '02',
    title: 'Discover & Compare Vendors',
    description: 'Filter halls, bridal cars, caterers, and studios by city and capacity. View verified photographs and transparent PKR pricing.',
    icon: Search
  },
  {
    number: '03',
    title: 'Book Securely & Relax',
    description: 'Submit booking requests without risk of double-booking. Track your actual expenses, manage guest RSVPs, and celebrate stress-free.',
    icon: HeartHandshake
  }
];

const HowItWorksSection = () => {
  return (
    <section className="py-5" style={{ backgroundColor: 'var(--wp-bg-main)' }}>
      <div className="container py-3">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-gold sub-badge">Simple 3-Step Process</span>
          <h2>How WedPlan Works</h2>
          <p>Organize an entire Pakistani wedding celebration from a single, organized digital hub.</p>
          <div className="gold-divider"></div>
        </div>

        <div className="row g-4 position-relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="col-12 col-md-4">
                <div className="wedding-card h-100 p-4 text-center position-relative border-0 shadow-sm">
                  <div 
                    className="position-absolute top-0 end-0 m-3 font-serif fw-bold text-muted opacity-25" 
                    style={{ fontSize: '2.5rem' }}
                  >
                    {step.number}
                  </div>
                  <div className="feature-icon-box mx-auto mb-3">
                    <Icon size={28} />
                  </div>
                  <h5 className="font-serif fw-bold text-dark mb-2">{step.title}</h5>
                  <p className="text-muted small mb-0">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-4 pt-2">
          <Link to="/how-it-works" className="btn-gold">
            Learn More About The Workflow <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
