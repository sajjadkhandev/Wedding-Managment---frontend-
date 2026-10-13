import React, { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { FAQS } from '../../data/mockData';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div>
      <PageHeader 
        title="Frequently Asked Questions"
        subtitle="Common queries regarding Pakistani wedding vendor bookings, advance deposits, and platform policies."
        badge="Help & Guidance"
        breadcrumbs={[{ label: 'FAQ' }]}
      />

      <div className="container py-5" style={{ maxWidth: '840px' }}>
        <div className="d-flex flex-column gap-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="border rounded-3 bg-white overflow-hidden shadow-sm">
                <button 
                  className="w-100 p-4 text-start bg-transparent border-0 d-flex justify-content-between align-items-center fw-bold font-serif fs-5 text-dark"
                  onClick={() => toggle(idx)}
                >
                  <span className="d-flex align-items-center gap-2">
                    <HelpCircle size={20} className="text-warning flex-shrink-0" />
                    {faq.q}
                  </span>
                  {isOpen ? <ChevronUp size={20} className="text-muted" /> : <ChevronDown size={20} className="text-muted" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-muted small border-top bg-light">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
