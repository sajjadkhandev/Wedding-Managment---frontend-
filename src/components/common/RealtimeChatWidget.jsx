import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { chatApi } from '../../services/api';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Minimize2, 
  Maximize2, 
  ArrowRight,
  PhoneCall,
  Loader2,
  Calendar,
  CheckCircle2
} from 'lucide-react';

const INITIAL_MESSAGES = [
  {
    id: 'welcome-1',
    sender: 'bot',
    text: `Assalam-o-Alaikum! 🌸 Main **WedPlan Real-Time Wedding Concierge** hoon.\n\nAap mujh se Pakistani wedding venues, 400 guests budget calculation, luxury bridal cars, ya 3-day combo packages ke baray mein kuch bhi pooch sakte hain!`,
    suggestions: [
      '💰 Budget for 400 Guests',
      '🏛️ Best Venues in Lahore & Islamabad',
      '🚗 Bridal Mercedes S-Class Rates',
      '🎁 3-Day Wedding Combos',
      '🍽️ Royal Catering Menu'
    ],
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

// Offline fallback response generator in case API is unreachable
const getLocalFallbackReply = (text) => {
  const q = text.toLowerCase();
  if (q.includes('budget') || q.includes('cost') || q.includes('kharcha')) {
    return {
      reply: `For **400 wedding guests** in Pakistan, typical realistic budget:\n\n` +
        `• **Catering (Royal Dastarkhwan @ Rs. 1,850/head):** Rs. 740,000\n` +
        `• **Banquet Marquee / Hall Rental:** Rs. 350,000\n` +
        `• **Stage Décor & Fresh Flowers:** Rs. 180,000\n` +
        `• **Photography & 4K Cinema Reels:** Rs. 120,000\n` +
        `• **Bridal Mercedes S-Class:** Rs. 35,000\n\n` +
        `📊 **Estimated Total:** **Rs. 1,425,000 PKR**\n*You can save Rs. 180,000 by picking our 3-Day Wedding Combo!*`,
      suggestions: ['View Wedding Packages', 'Browse Venues', 'Book Bridal Car'],
      actionLink: '/packages'
    };
  }
  if (q.includes('venue') || q.includes('hall') || q.includes('marquee')) {
    return {
      reply: `We feature **9 verified premium venues** in Lahore, Karachi, and Islamabad including:\n\n` +
        `• **The Royal Crystal Ballroom** (Lahore, 650 guests) — Rs. 350,000\n` +
        `• **Grand Serena Marquee** (Islamabad, 800 guests) — Rs. 450,000\n` +
        `• **Mughal Heritage Lawn & Banquet** (Karachi, 500 guests) — Rs. 280,000\n` +
        `• **Royal Palm Golf Marquee** (Lahore, 1,000 guests) — Rs. 520,000\n\n` +
        `All venues have 100% generator power backup, valet, and bridal dressing suites.`,
      suggestions: ['Check Venue Availability', 'View Packages'],
      actionLink: '/services/venues'
    };
  }
  if (q.includes('car') || q.includes('gari') || q.includes('mercedes') || q.includes('rolls royce')) {
    return {
      reply: `Our bridal fleet with professional uniform-attired drivers:\n\n` +
        `• **Mercedes-Benz S-Class (White Special):** Rs. 35,000/day (10 hrs)\n` +
        `• **Toyota Land Cruiser Prado TX (Black Edition):** Rs. 25,000/day\n` +
        `• **Vintage 1965 Rolls Royce Silver Cloud:** Rs. 55,000 per 6-hr slot\n` +
        `• **Toyota Coaster Saloon (29 Seater):** Rs. 18,000/day for Barat guests`,
      suggestions: ['Book Mercedes S-Class', 'View All Cars'],
      actionLink: '/services/cars'
    };
  }
  if (q.includes('package') || q.includes('combo') || q.includes('discount')) {
    return {
      reply: `We have **7 multi-day wedding packages** available:\n\n` +
        `1. **The Royal 3-Day Wedding Combo** (Mehndi + Baraat + Walima) — Rs. 1,250,000 (Save Rs. 180,000)\n` +
        `2. **Baraat & Walima Signature Duo** — Rs. 850,000 (Save Rs. 95,000)\n` +
        `3. **Intimate Nikah & Family Dinner** — Rs. 420,000 (Save Rs. 60,000)\n` +
        `4. **Grand Shahi Dastarkhwan Combo** — Rs. 980,000 (Save Rs. 120,000)\n\n` +
        `You can click **"Select Package"** on our Packages page to customize dates and reserve with a 20% advance milestone!`,
      suggestions: ['Select Package Now', 'View All 7 Packages'],
      actionLink: '/packages'
    };
  }
  if (q.includes('contact') || q.includes('phone') || q.includes('call') || q.includes('whatsapp') || q.includes('email') || q.includes('sajjad') || q.includes('help') || q.includes('rabta')) {
    return {
      reply: `Aap directly **Sajjad Wazir** (Head of WedPlan Concierge & Support) se rabta kar sakte hain:\n\n` +
        `• 📱 **WhatsApp / Call:** 0306-9122770 (+92 306 9122770)\n` +
        `• ✉️ **Email:** sajjadwazir4459@email.com\n` +
        `• 📍 **Head Office:** Main Boulevard, Gulberg III, Lahore\n\n` +
        `Custom packages ya venue booking ke liye WhatsApp par message karein!`,
      suggestions: ['Open WhatsApp Chat', 'Go to Contact Page', 'Browse Venues'],
      actionLink: 'https://wa.me/923069122770'
    };
  }
  return {
    reply: `Assalam-o-Alaikum! 🌸 Main aap ki Pakistani wedding planning mein help kar sakta hoon:\n\n` +
      `• Venues & Banquet Halls in Lahore, Karachi & Islamabad\n` +
      `• Chauffeur-driven luxury bridal cars (Mercedes & Prado)\n` +
      `• Royal Dastarkhwan catering & food menus\n` +
      `• Multi-day wedding packages (save up to Rs. 220,000)\n\n` +
      `Aap ne kiss city ya event ke liye planning karni hai?`,
    suggestions: ['Budget for 400 Guests', 'Best Venues in Lahore', '3-Day Wedding Combos'],
    actionLink: '/services'
  };
};

const RealtimeChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Send to backend concierge API
      const res = await chatApi.sendMessage(text);
      if (res?.data) {
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: `bot-${Date.now()}`,
              sender: 'bot',
              text: res.data.reply,
              suggestions: res.data.suggestions || [],
              actionLink: res.data.actionLink || null,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        }, 450);
      } else {
        throw new Error('Fallback required');
      }
    } catch {
      // Local fallback
      setTimeout(() => {
        setIsTyping(false);
        const fallback = getLocalFallbackReply(text);
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: fallback.reply,
            suggestions: fallback.suggestions || [],
            actionLink: fallback.actionLink || null,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 500);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleActionClick = (link) => {
    if (link) {
      if (link.startsWith('http://') || link.startsWith('https://')) {
        window.open(link, '_blank');
      } else {
        navigate(link);
        setIsOpen(false);
      }
    }
  };

  return (
    <>
      {/* Floating Trigger Bubble */}
      <div 
        className="position-fixed" 
        style={{ bottom: '25px', right: '25px', zIndex: 1045 }}
      >
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="btn rounded-circle shadow-lg d-flex align-items-center justify-content-center p-0 position-relative transition-all"
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: 'var(--wp-charcoal, #212529)',
              color: 'var(--wp-gold, #C5A059)',
              border: '2px solid var(--wp-gold, #C5A059)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
            }}
            aria-label="Open WedPlan Real-Time Assistant"
          >
            <MessageSquare size={26} />

            {/* Online Green Pulsing Indicator */}
            <span 
              className="position-absolute top-0 end-0 rounded-circle"
              style={{
                width: '14px',
                height: '14px',
                backgroundColor: '#28a745',
                border: '2px solid #ffffff',
                boxShadow: '0 0 8px #28a745'
              }}
            ></span>

            {/* Unread Message Tooltip Teaser */}
            {hasUnread && (
              <span 
                className="position-absolute bottom-100 end-0 mb-2 px-3 py-1 bg-white text-dark small fw-bold rounded-pill shadow-sm border text-nowrap d-none d-sm-block"
                style={{ fontSize: '0.78rem' }}
              >
                ✨ Need help planning your wedding? Ask our AI Concierge!
              </span>
            )}
          </button>
        )}
      </div>

      {/* Real-Time Chatboard Window */}
      {isOpen && (
        <div
          className="position-fixed shadow-lg d-flex flex-column overflow-hidden rounded-4 bg-white border transition-all"
          style={{
            bottom: '25px',
            right: '25px',
            width: '390px',
            maxWidth: '92vw',
            height: '560px',
            maxHeight: '86vh',
            zIndex: 1050,
            borderColor: 'var(--wp-border-gold, #E5D5B5)'
          }}
        >
          {/* Header */}
          <div 
            className="p-3 text-white d-flex justify-content-between align-items-center"
            style={{ backgroundColor: 'var(--wp-charcoal, #212529)', borderBottom: '2px solid var(--wp-gold, #C5A059)' }}
          >
            <div className="d-flex align-items-center gap-2">
              <img 
                src="/logo.jpg" 
                alt="WedPlan AI Concierge" 
                className="rounded-circle shadow-sm"
                style={{ 
                  width: '38px', 
                  height: '38px', 
                  objectFit: 'cover', 
                  border: '1.5px solid var(--wp-gold, #C5A059)',
                  backgroundColor: '#FFFFFF'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div 
                className="rounded-circle d-none align-items-center justify-content-center"
                style={{ width: '38px', height: '38px', backgroundColor: 'rgba(197, 160, 89, 0.2)', border: '1px solid var(--wp-gold)' }}
              >
                <Bot size={20} className="text-warning" />
              </div>
              <div>
                <h6 className="font-serif fw-bold mb-0 text-white" style={{ fontSize: '0.95rem' }}>
                  WedPlan Concierge
                </h6>
                <div className="d-flex align-items-center gap-1">
                  <span 
                    className="rounded-circle"
                    style={{ width: '8px', height: '8px', backgroundColor: '#28a745', display: 'inline-block' }}
                  ></span>
                  <small style={{ fontSize: '0.72rem', color: '#B0BEC5' }}>Online • Real-Time AI Assistant</small>
                </div>
              </div>
            </div>

            <div className="d-flex align-items-center gap-1">
              <button 
                type="button" 
                onClick={() => setIsOpen(false)}
                className="btn btn-sm text-white p-1 hover-gold"
                aria-label="Close Chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Thread */}
          <div 
            className="flex-grow-1 p-3 overflow-y-auto"
            style={{ backgroundColor: 'var(--wp-bg-main, #FAF8F5)' }}
          >
            {messages.map((m) => (
              <div 
                key={m.id} 
                className={`d-flex mb-3 ${m.sender === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
              >
                {m.sender === 'bot' && (
                  <img 
                    src="/logo.jpg" 
                    alt="WedPlan" 
                    className="rounded-circle me-2 flex-shrink-0 mt-1 shadow-sm"
                    style={{ 
                      width: '28px', 
                      height: '28px', 
                      objectFit: 'cover', 
                      border: '1px solid var(--wp-gold, #C5A059)',
                      backgroundColor: '#FFFFFF'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                )}
                {m.sender === 'bot' && (
                  <div 
                    className="rounded-circle bg-dark text-warning d-none align-items-center justify-content-center me-2 flex-shrink-0 mt-1 shadow-sm"
                    style={{ width: '28px', height: '28px', fontSize: '0.75rem', border: '1px solid var(--wp-gold)' }}
                  >
                    🌸
                  </div>
                )}

                <div style={{ maxWidth: '82%' }}>
                  <div
                    className="p-3 rounded-3 shadow-sm text-dark"
                    style={{
                      fontSize: '0.84rem',
                      lineHeight: '1.45',
                      backgroundColor: m.sender === 'user' ? '#FFF9E6' : '#FFFFFF',
                      border: m.sender === 'user' ? '1px solid #FFE082' : '1px solid #EBE5DF',
                      borderTopRightRadius: m.sender === 'user' ? '2px' : '12px',
                      borderTopLeftRadius: m.sender === 'bot' ? '2px' : '12px'
                    }}
                  >
                    <div style={{ whiteSpace: 'pre-wrap' }}>
                      {m.text.split('\n').map((line, idx) => {
                        // Simple parser for **bold** text
                        const parts = line.split(/(\*\*.*?\*\*)/g);
                        return (
                          <div key={idx} className={line === '' ? 'py-1' : ''}>
                            {parts.map((p, pIdx) => {
                              if (p.startsWith('**') && p.endsWith('**')) {
                                return <strong key={pIdx}>{p.slice(2, -2)}</strong>;
                              }
                              return p;
                            })}
                          </div>
                        );
                      })}
                    </div>

                    {/* Action link button if available */}
                    {m.actionLink && (
                      <div className="mt-2 pt-2 border-top">
                        <button
                          type="button"
                          onClick={() => handleActionClick(m.actionLink)}
                          className="btn-gold py-1 px-3 d-inline-flex align-items-center gap-1"
                          style={{ fontSize: '0.76rem' }}
                        >
                          View Direct Page <ArrowRight size={12} />
                        </button>
                      </div>
                    )}
                  </div>

                  <span 
                    className="d-block text-muted mt-1 px-1" 
                    style={{ fontSize: '0.68rem', textAlign: m.sender === 'user' ? 'right' : 'left' }}
                  >
                    {m.timestamp}
                  </span>

                  {/* Suggestion Chips */}
                  {m.suggestions && m.suggestions.length > 0 && (
                    <div className="d-flex flex-wrap gap-1 mt-2">
                      {m.suggestions.map((sug, sIdx) => (
                        <button
                          type="button"
                          key={sIdx}
                          onClick={() => handleSendMessage(sug)}
                          className="badge bg-white text-dark border px-2 py-1 hover-gold"
                          style={{ fontSize: '0.72rem', cursor: 'pointer', textAlign: 'left' }}
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Real-Time Typing Indicator */}
            {isTyping && (
              <div className="d-flex mb-3 justify-content-start align-items-center">
                <div 
                  className="rounded-circle bg-dark text-warning d-flex align-items-center justify-content-center me-2 flex-shrink-0"
                  style={{ width: '28px', height: '28px', border: '1px solid var(--wp-gold)' }}
                >
                  🌸
                </div>
                <div 
                  className="p-2 px-3 bg-white rounded-3 border shadow-sm d-flex align-items-center gap-1"
                  style={{ fontSize: '0.78rem' }}
                >
                  <span className="text-muted">WedPlan Assistant is typing</span>
                  <span className="spin"><Loader2 size={12} className="text-warning" /></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-top">
            <div className="input-group">
              <input
                ref={inputRef}
                type="text"
                className="form-control"
                placeholder="Ask about venues, car rates, budget..."
                style={{ fontSize: '0.85rem' }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                disabled={isTyping}
              />
              <button
                type="button"
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className="btn btn-gold d-flex align-items-center justify-content-center px-3"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2 px-1">
              <small className="text-muted" style={{ fontSize: '0.68rem' }}>
                PKR estimates & Pakistani wedding guidance.
              </small>
              <a 
                href="https://wa.me/923069122770?text=Assalam-o-Alaikum%20Sajjad%20Bhai,%20I%20have%20an%20inquiry%20regarding%20WedPlan"
                target="_blank"
                rel="noreferrer"
                className="text-decoration-none small text-success fw-bold d-flex align-items-center gap-1 hover-gold"
                style={{ fontSize: '0.7rem' }}
              >
                <PhoneCall size={11} /> WhatsApp: 0306-9122770
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RealtimeChatWidget;
