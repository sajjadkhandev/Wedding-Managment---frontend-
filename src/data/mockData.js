// WedPlan Mock Data — Pakistani Wedding Marketplace Data

export const CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Sialkot',
  'Gujranwala',
  'Quetta'
];

export const WEDDING_EVENTS = [
  'Mehndi',
  'Baraat',
  'Walima',
  'Nikah',
  'Engagement',
  'Qawwali / Sangeet'
];

export const CATEGORIES = [
  {
    id: 'cat-venues',
    slug: 'venues',
    name: 'Wedding Venues & Halls',
    path: '/services/venues',
    tagline: 'Banquet halls, luxury marquees & outdoor wedding lawns',
    count: '140+ Listings',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    icon: 'Building2'
  },
  {
    id: 'cat-cars',
    slug: 'cars',
    name: 'Car Rental & Transport',
    path: '/services/cars',
    tagline: 'Bridal luxury cars, vintage classics & guest coasters',
    count: '85+ Listings',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    icon: 'Car'
  },
  {
    id: 'cat-catering',
    slug: 'catering',
    name: 'Catering & Food',
    path: '/services/catering',
    tagline: 'Authentic Pakistani Biryani, BBQ, desserts & royal buffets',
    count: '95+ Listings',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    icon: 'Utensils'
  },
  {
    id: 'cat-photo',
    slug: 'photography',
    name: 'Photography & Cinema',
    path: '/services/photography',
    tagline: 'Cinematic wedding films, candid captures & drone reels',
    count: '110+ Listings',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
    icon: 'Camera'
  },
  {
    id: 'cat-decor',
    slug: 'decoration',
    name: 'Stage Decor & Florists',
    path: '/services/decoration',
    tagline: 'Royal stage designs, fresh floral setups & festive lighting',
    count: '75+ Listings',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
    icon: 'Sparkles'
  },
  {
    id: 'cat-makeup',
    slug: 'makeup',
    name: 'Bridal Makeup & Salons',
    path: '/services/makeup',
    tagline: 'Certified bridal stylists, groom grooming & family glam',
    count: '65+ Listings',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    icon: 'Palette'
  },
  {
    id: 'cat-dresses',
    slug: 'dresses',
    name: 'Bridal & Groom Outfits',
    path: '/services/dresses',
    tagline: 'Hand-embroidered Lehengas, royal Sherwanis & rentals',
    count: '50+ Listings',
    image: 'https://images.unsplash.com/photo-1594465919760-441fe5908ab0?auto=format&fit=crop&w=800&q=80',
    icon: 'Shirt'
  },
  {
    id: 'cat-planners',
    slug: 'planners',
    name: 'Wedding Planners',
    path: '/services/planners',
    tagline: 'Full event coordination, vendor management & hospitality',
    count: '40+ Listings',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    icon: 'CalendarCheck'
  }
];

export const FEATURED_VENUES = [
  {
    id: 'v-1',
    title: 'The Royal Crystal Ballroom',
    vendorName: 'Royal Hospitality Group',
    city: 'Lahore',
    location: 'Gulberg III, Lahore',
    capacity: 650,
    pricePKR: 350000,
    priceUnit: 'per event slot',
    rating: 4.9,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    venueType: 'Indoor Luxury Hall',
    featured: true,
    amenities: ['100% Generator Backup', 'Bridal Suite with Private Washroom', 'Valet Parking for 200 Cars', 'Central Air Conditioning'],
    description: 'An architectural marvel featuring Italian chandeliers, high ceilings, and royal carpeted flooring ideal for Baraat and Walima receptions.'
  },
  {
    id: 'v-2',
    title: 'Grand Serena Marquee',
    vendorName: 'Serena Event Spaces',
    city: 'Islamabad',
    location: 'Club Road, Islamabad',
    capacity: 800,
    pricePKR: 450000,
    priceUnit: 'per event slot',
    rating: 4.88,
    reviewsCount: 52,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    venueType: 'Modern Marquee',
    featured: true,
    amenities: ['Margalla View Lawn', 'Separate Dining Hall', 'Helipad Facility', 'Dedicated Security Guard Team'],
    description: 'Set amidst the lush greenery of Islamabad, offering grand outdoor views with state-of-the-art climate-controlled marquee amenities.'
  },
  {
    id: 'v-3',
    title: 'Mughal Heritage Lawn & Banquet',
    vendorName: 'Mughal Event Group',
    city: 'Karachi',
    location: 'KDA Scheme 1, Karachi',
    capacity: 500,
    pricePKR: 280000,
    priceUnit: 'per event slot',
    rating: 4.7,
    reviewsCount: 29,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
    venueType: 'Open Lawn & Banquet',
    featured: true,
    amenities: ['Lush Green Turf', 'Traditional Fountains', 'Bridal Dressing Room', 'Ample Parking'],
    description: 'Traditional Pakistani open-air lawn ambiance coupled with an opulent covered stage setup for colorful Mehndis and Baraats.'
  },
  {
    id: 'v-4',
    title: 'Royal Palm Golf & Country Club Marquee',
    vendorName: 'Royal Palm Hospitality',
    city: 'Lahore',
    location: 'Canal Bank Road, Lahore',
    capacity: 1000,
    pricePKR: 520000,
    priceUnit: 'per event slot',
    rating: 4.95,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
    venueType: 'Modern Marquee',
    featured: true,
    amenities: ['Lakeside Golf Course View', 'Executive Bridal Lounge', 'Valet Parking for 400+ Cars', 'Triple 500kVA Generators'],
    description: 'Prestigious country club marquee with panoramic golf course views, crystal chandeliers, and ultra-luxurious dining halls for royal wedding celebrations.'
  },
  {
    id: 'v-5',
    title: 'Beach Luxury Waterfront Banquet & Marquee',
    vendorName: 'Beach Luxury Events',
    city: 'Karachi',
    location: 'Moulvi Tamizuddin Khan Rd, Lalazar, Karachi',
    capacity: 750,
    pricePKR: 380000,
    priceUnit: 'per event slot',
    rating: 4.82,
    reviewsCount: 41,
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
    venueType: 'Open Lawn & Banquet',
    featured: true,
    amenities: ['Sea Breeze Open Lawn', 'Covered Glass Marquee', 'Valet Waterfront Parking', 'Full Acoustic Lighting'],
    description: 'Karachi premier seaside wedding destination featuring historic palms, sea breezes, and stunning waterfront banquet setups for memorable Walimas.'
  },
  {
    id: 'v-6',
    title: 'The Monal Margalla Greens Marquee',
    vendorName: 'Monal Group Islamabad',
    city: 'Islamabad',
    location: 'Margalla Foothills, Islamabad',
    capacity: 600,
    pricePKR: 420000,
    priceUnit: 'per event slot',
    rating: 4.9,
    reviewsCount: 35,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    venueType: 'Modern Marquee',
    featured: true,
    amenities: ['Margalla Mountain Panorama', 'Heated & Air-Conditioned', 'VIP Helicopter Pad', 'Live Floral Entryway'],
    description: 'Breathtaking mountain foothill venue with transparent marquee glass walls, scenic lighting, and elite catering options for destination-style weddings.'
  },
  {
    id: 'v-7',
    title: "Faletti's Heritage Grand Ballroom",
    vendorName: "Faletti's Hotel Lahore",
    city: 'Lahore',
    location: 'Egerton Road, Lahore',
    capacity: 450,
    pricePKR: 310000,
    priceUnit: 'per event slot',
    rating: 4.88,
    reviewsCount: 47,
    image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=800&q=80',
    venueType: 'Indoor Luxury Hall',
    featured: true,
    amenities: ['Colonial Heritage Architecture', 'Red Carpet VIP Foyer', 'Bridal Suite with Dressing Salon', 'Central Climate Control'],
    description: 'Rich historical charm from 1880 combined with modern five-star banquet hospitality, antique gold trimmings, and regal ambience.'
  },
  {
    id: 'v-8',
    title: 'Pearl Continental Marquee & Banquet',
    vendorName: 'PC Hospitality Rawalpindi',
    city: 'Rawalpindi',
    location: 'The Mall, Rawalpindi Cantt',
    capacity: 850,
    pricePKR: 480000,
    priceUnit: 'per event slot',
    rating: 4.92,
    reviewsCount: 58,
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80',
    venueType: 'Modern Marquee',
    featured: true,
    amenities: ['5-Star Hotel Standards', 'Dedicated Valet 300 Cars', 'Integrated Buffet Area', 'Private VIP Rooms'],
    description: 'Twin Cities favorite five-star marquee facility offering massive column-free interior capacity and impeccable hospitality.'
  },
  {
    id: 'v-9',
    title: 'Chenab Palace & Royal Banquet',
    vendorName: 'Chenab Banquets',
    city: 'Faisalabad',
    location: 'Jaranwala Road, Faisalabad',
    capacity: 700,
    pricePKR: 290000,
    priceUnit: 'per event slot',
    rating: 4.78,
    reviewsCount: 31,
    image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=80',
    venueType: 'Indoor Luxury Hall',
    featured: true,
    amenities: ['Grand Stage Depth', 'Huge Dining Section', 'Uninterrupted Power Backup', 'Ample Car Parking'],
    description: 'Faisalabad largest luxury wedding banquet featuring majestic ceiling heights, intricate stage backdrops, and spacious guest walkways.'
  }
];

export const FEATURED_CARS = [
  {
    id: 'c-1',
    title: 'Mercedes-Benz S-Class (White Bridal Special)',
    vendorName: 'Royal Wheels Lahore',
    city: 'Lahore',
    carType: 'Luxury Sedan',
    modelYear: 2022,
    passengerCapacity: 4,
    pricePKR: 35000,
    rateUnit: 'per day (10 hrs)',
    withDriver: true,
    rating: 4.9,
    reviewsCount: 44,
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    includedMileage: '100 km included (Rs. 150/km extra)',
    driverIncluded: 'Professional uniform-attired Chauffeur included',
    description: 'Flawless white Mercedes S-Class decorated with fresh imported flowers option. Perfect for the groom and bride entrance.'
  },
  {
    id: 'c-2',
    title: 'Vintage 1965 Rolls Royce Silver Cloud',
    vendorName: 'Heritage Classic Rentals',
    city: 'Islamabad',
    carType: 'Vintage Classic',
    modelYear: 1965,
    passengerCapacity: 3,
    pricePKR: 55000,
    rateUnit: 'per 6-hour slot',
    withDriver: true,
    rating: 5.0,
    reviewsCount: 21,
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
    includedMileage: 'City limits only',
    driverIncluded: 'Experienced vintage-certified driver',
    description: 'Add unmatched royal nostalgia to your wedding photography with this timeless British classic.'
  },
  {
    id: 'c-3',
    title: 'Toyota Land Cruiser Prado TX (Black Edition)',
    vendorName: 'Executive Transport Karachi',
    city: 'Karachi',
    carType: 'SUV / Escort',
    modelYear: 2023,
    passengerCapacity: 7,
    pricePKR: 25000,
    rateUnit: 'per day',
    withDriver: true,
    rating: 4.8,
    reviewsCount: 31,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    includedMileage: '120 km included',
    driverIncluded: 'Trained Chauffeur',
    description: 'Ideal for wedding family transport and Barat motorcade escort.'
  },
  {
    id: 'c-4',
    title: 'Toyota Coaster Salon (29 Seater Guest Bus)',
    vendorName: 'Capital Coaches',
    city: 'Rawalpindi',
    carType: 'Guest Bus',
    modelYear: 2021,
    passengerCapacity: 29,
    pricePKR: 18000,
    rateUnit: 'per trip',
    withDriver: true,
    rating: 4.7,
    reviewsCount: 19,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    includedMileage: 'Intra-city route',
    driverIncluded: 'Experienced commercial driver',
    description: 'Spacious air-conditioned coaster to safely transport the Baraat and Walima guests in comfort.'
  }
];

export const FEATURED_PHOTOGRAPHY = [
  {
    id: 'p-1',
    title: 'Noor Wedding Cinema & Studio',
    vendorName: 'Noor Visuals',
    city: 'Lahore',
    pricePKR: 120000,
    priceUnit: 'per event day',
    rating: 4.95,
    reviewsCount: 67,
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=800&q=80',
    packageIncludes: ['2 Candid Photographers', '1 Cinematic Videographer', '4K Drone Coverage', 'Digital Leather Photo Album', 'Teaser Reel in 48 Hours']
  },
  {
    id: 'p-2',
    title: 'Aura Lens Karachi',
    vendorName: 'Aura Media Studio',
    city: 'Karachi',
    pricePKR: 95000,
    priceUnit: 'per event day',
    rating: 4.8,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
    packageIncludes: ['Full Ceremony Coverage', 'Signature Portraits', 'High-Res Edited Soft Copies', 'Short Instagram Reels']
  }
];

export const FEATURED_CATERING = [
  {
    id: 'cat-item-1',
    title: 'Shahi Dastarkhwan Wedding Menu',
    vendorName: 'Al-Miraj Royal Caterers',
    city: 'Lahore',
    pricePKR: 1850,
    priceUnit: 'per person / head',
    rating: 4.9,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    highlights: ['Special Mutton Biryani (Basmati)', 'Chicken Achari Karahi', 'Seekh Kabab (Mutton/Beef)', 'Fresh Naan & Roghani Roti', 'Shahi Kheer & Gulab Jamun']
  },
  {
    id: 'cat-item-2',
    title: 'Mezban Executive Buffet Package',
    vendorName: 'Mezban Catering Services',
    city: 'Islamabad',
    pricePKR: 2200,
    priceUnit: 'per person / head',
    rating: 4.85,
    reviewsCount: 54,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    highlights: ['Dum Pukht Mutton Qorma', 'Chicken Reshmi Boti', 'Fish Crackers & Kashmiri Chai', 'Fresh Seasonal Salad Bar']
  }
];

export const FEATURED_PACKAGES = [
  {
    id: 'pkg-1',
    title: 'The Royal 3-Day Wedding Combo',
    events: ['Mehndi', 'Baraat', 'Walima'],
    city: 'Lahore',
    totalPricePKR: 1250000,
    savingsPKR: 180000,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Hall booking for 300 guests on all 3 days',
      'Full stage & floral decor customized per theme',
      '3-Day comprehensive photography & cinematic reels',
      'Bridal Mercedes S-Class on Baraat day'
    ]
  },
  {
    id: 'pkg-2',
    title: 'Baraat & Walima Signature Duo',
    events: ['Baraat', 'Walima'],
    city: 'Karachi',
    totalPricePKR: 850000,
    savingsPKR: 95000,
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Banquet Hall rental with AC & backup generator',
      'Luxury entrance pathway & stage lighting',
      'Full HD video coverage & 2 deluxe printed albums',
      'Toyota Prado bridal escort'
    ]
  },
  {
    id: 'pkg-3',
    title: 'Intimate Nikah & Family Dinner Package',
    events: ['Nikah', 'Intimate Dinner'],
    city: 'Islamabad',
    totalPricePKR: 420000,
    savingsPKR: 60000,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Lawn marquee venue setup for 120 guests',
      'High-end floral Nikah backdrop & Quran table',
      'Exclusive 3-course dinner catering',
      'Full coverage photo & highlight film'
    ]
  },
  {
    id: 'pkg-4',
    title: 'Grand Shahi Dastarkhwan & Banquet Combo',
    events: ['Baraat', 'Walima'],
    city: 'Rawalpindi',
    totalPricePKR: 980000,
    savingsPKR: 120000,
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Marquee hall for 400 guests with AC & power backup',
      'Royal Dastarkhwan Catering: Special Mutton Biryani, Qorma & BBQ',
      '2 Photographers + 4K Drone Teaser Video',
      'White Audi A6 Bridal Sedan with Floral Adornment'
    ]
  },
  {
    id: 'pkg-5',
    title: 'Vibrant Colorful Mehndi & Sangeet Bash',
    events: ['Mehndi', 'Sangeet'],
    city: 'Lahore',
    totalPricePKR: 380000,
    savingsPKR: 45000,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Traditional Yellow Marigold Floral Canopy & Jhoola (Swing)',
      'Floor gao-takiya seating & low dining setup for 250 guests',
      'Professional Dholak & Acoustic Sound Setup',
      'Candid Mehndi coverage + Instagram Reels'
    ]
  },
  {
    id: 'pkg-6',
    title: 'VIP Executive Bridal & Groom Luxury Suite',
    events: ['Baraat', 'Walima'],
    city: 'Islamabad',
    totalPricePKR: 650000,
    savingsPKR: 80000,
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Signature HD Bridal Makeup & Hair by Senior Artist (2 Days)',
      'Groom Grooming & Styling at Premier Studio',
      'Chauffeur-Driven Mercedes-Benz S-Class for 2 Days',
      'Bridal Suite Hospitality & Refreshments'
    ]
  },
  {
    id: 'pkg-7',
    title: 'Lakeside Open-Air Destination Wedding Combo',
    events: ['Mehndi', 'Baraat', 'Walima'],
    city: 'Karachi',
    totalPricePKR: 1450000,
    savingsPKR: 220000,
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80',
    inclusions: [
      'Waterfront open-air lawn & glass marquee for 500 guests',
      'Royal stage setup with fresh imported roses & chandeliers',
      'Executive 4-course dinner buffet + live mocktail bar',
      '3-Day cinematic crew with dual drones & leather albums'
    ]
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    couple: 'Zaid & Ayesha',
    city: 'Lahore',
    weddingDate: 'February 2026',
    comment: 'WedPlan made organizing our 3-day wedding so effortless! We booked Royal Crystal Ballroom and Noor Cinema within 2 days with zero phone calls or confusion. Truly changed Pakistani wedding planning.',
    rating: 5,
    demo: true
  },
  {
    id: 't-2',
    couple: 'Hamza & Maham',
    city: 'Karachi',
    weddingDate: 'January 2026',
    comment: 'The budget tracker alone saved us over 300,000 PKR by preventing duplicate bookings. Booking the bridal S-Class car and catering with transparent prices was so refreshing.',
    rating: 5,
    demo: true
  },
  {
    id: 't-3',
    couple: 'Bilal & Hina',
    city: 'Islamabad',
    weddingDate: 'December 2025',
    comment: 'As overseas Pakistanis planning our wedding back home, WedPlan was a lifesaver. We verified vendors, inspected high-res stage photos, and scheduled all event dates remotely.',
    rating: 5,
    demo: true
  }
];

export const FAQS = [
  {
    q: 'How does vendor booking work on WedPlan?',
    a: 'Browse through our verified wedding vendors (venues, car rentals, caterers, photographers, etc.), choose your requested wedding date and package, and submit a booking request. The vendor accepts your request, locking in your agreed PKR price.'
  },
  {
    q: 'Are the prices quoted in Pakistani Rupees (PKR)?',
    a: 'Yes, all prices on WedPlan are strictly in Pakistani Rupees (PKR / Rs.) and represent transparent estimates or fixed rates determined by registered vendors.'
  },
  {
    q: 'Can I manage multiple Pakistani wedding events (Mehndi, Baraat, Walima)?',
    a: 'Absolutely! Our Customer Wedding Project dashboard allows you to organize multiple sub-events under a single wedding, assign specific vendors to each day, and track individual guest RSVPs and budgets.'
  },
  {
    q: 'What if a venue or car is already booked on my date?',
    a: 'Our smart availability engine checks vendor calendars in real time and prevents overlapping reservations. If a vendor is already booked for that date and slot, the platform immediately alerts you so you can select an alternative.'
  },
  {
    q: 'How can wedding vendors join WedPlan?',
    a: 'Vendors can register for free via the Vendor Registration page. Once business details and CNIC/NTN are submitted, our administration team verifies the account before publishing listings to ensure customer safety.'
  },
  {
    q: 'How can I reach human support or get personalized wedding planning assistance?',
    a: 'You can directly contact Sajjad Wazir (WedPlan Concierge & Support Lead) via WhatsApp or phone call at 0306-9122770 (+92 306 9122770) or via email at sajjadwazir4459@email.com. Our support desk operates 7 days a week.'
  }
];
