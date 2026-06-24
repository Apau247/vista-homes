const U = 'https://images.unsplash.com/photo-';

export type Property = {
  id: string;
  title: string;
  price: number;
  location: string;
  city: string;
  type: 'House' | 'Apartment' | 'Villa' | 'Commercial' | 'Condo';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  image: string;
  images: string[];
  description: string;
  status: 'For Sale' | 'For Rent' | 'Sold';
  featured: boolean;
  yearBuilt: number;
  agent: {
    name: string;
    phone: string;
    email: string;
    photo: string;
  };
};

export const properties: Property[] = [
  {
    id: "1",
    title: "Luxury Waterfront Villa",
    price: 1250000,
    location: "Malibu, CA",
    city: "Malibu",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 6,
    sqft: 6200,
    image: `${U}1600596542815-ffad4c1539a9?w=600&h=400&fit=crop&q=80`,
    images: [
      `${U}1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80`,
      `${U}1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80`,
      `${U}1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&q=80`,
    ],
    description: "Stunning oceanfront villa with panoramic Pacific views, infinity edge pool, private beach access, and architecturally designed interiors. Floor-to-ceiling windows flood the space with natural light while framing breathtaking sunsets.",
    status: "For Sale",
    featured: true,
    yearBuilt: 2022,
    agent: { name: "Sarah Chen", phone: "(310) 555-0123", email: "sarah@vistahomes.com", photo: "https://randomuser.me/api/portraits/women/44.jpg" }
  },
  {
    id: "2",
    title: "Modern Downtown Penthouse",
    price: 895000,
    location: "Downtown LA, CA",
    city: "Downtown LA",
    type: "Condo",
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2850,
    image: `${U}1486325212027-8081e485255e?w=600&h=400&fit=crop&q=80`,
    images: [
      `${U}1502672260266-1c1ef2d93688?w=800&h=600&fit=crop&q=80`,
      `${U}1605146769289-440113cc3d00?w=800&h=600&fit=crop&q=80`,
    ],
    description: "Sophisticated penthouse with floor-to-ceiling windows, private rooftop terrace, smart home automation, and valet parking. Steps from fine dining, arts, and nightlife.",
    status: "For Sale",
    featured: true,
    yearBuilt: 2020,
    agent: { name: "Michael Torres", phone: "(213) 555-0456", email: "michael@vistahomes.com", photo: "https://randomuser.me/api/portraits/men/32.jpg" }
  },
  {
    id: "3",
    title: "Family Home in Suburbs",
    price: 675000,
    location: "Pasadena, CA",
    city: "Pasadena",
    type: "House",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3200,
    image: `${U}1564013799919-ab600027ffc6?w=600&h=400&fit=crop&q=80`,
    images: [
      `${U}1512917774080-9991f1c4c750?w=800&h=600&fit=crop&q=80`,
      `${U}1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&q=80`,
    ],
    description: "Charming family home with large private backyard, updated chef's kitchen, hardwood floors throughout, and top-rated school district. Move-in ready with recent renovations.",
    status: "For Sale",
    featured: false,
    yearBuilt: 1998,
    agent: { name: "Elena Rodriguez", phone: "(626) 555-0789", email: "elena@vistahomes.com", photo: "https://randomuser.me/api/portraits/women/65.jpg" }
  },
  {
    id: "4",
    title: "Beverly Hills Estate",
    price: 4500000,
    location: "Beverly Hills, CA",
    city: "Beverly Hills",
    type: "Villa",
    bedrooms: 7,
    bathrooms: 8,
    sqft: 8500,
    image: `${U}1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop&q=80`,
    images: [
      `${U}1600566752355-35792bedcfea?w=800&h=600&fit=crop&q=80`,
      `${U}1600573472592-401b489a3cdc?w=800&h=600&fit=crop&q=80`,
    ],
    description: "Grand Mediterranean estate with private tennis court, home theater, wine cellar, and manicured gardens. Gated entrance with 24-hour security, this property defines luxury living.",
    status: "For Sale",
    featured: true,
    yearBuilt: 2005,
    agent: { name: "Sarah Chen", phone: "(310) 555-0123", email: "sarah@vistahomes.com", photo: "https://randomuser.me/api/portraits/women/44.jpg" }
  },
  {
    id: "5",
    title: "Santa Monica Beach House",
    price: 2100000,
    location: "Santa Monica, CA",
    city: "Santa Monica",
    type: "House",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    image: `${U}1605276374104-dee2a0ed3cd6?w=600&h=400&fit=crop&q=80`,
    images: [
      `${U}1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop&q=80`,
      `${U}1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80`,
    ],
    description: "Beautiful beach-adjacent home with ocean breezes, modern coastal design, outdoor deck with hot tub, and direct bike path access. Perfect for the active coastal lifestyle.",
    status: "For Sale",
    featured: false,
    yearBuilt: 2015,
    agent: { name: "Michael Torres", phone: "(213) 555-0456", email: "michael@vistahomes.com", photo: "https://randomuser.me/api/portraits/men/32.jpg" }
  },
  {
    id: "6",
    title: "Luxury Apartment in the Sky",
    price: 5200,
    location: "Downtown LA, CA",
    city: "Downtown LA",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1450,
    image: `${U}1502672260266-1c1ef2d93688?w=600&h=400&fit=crop&q=80`,
    images: [
      `${U}1486325212027-8081e485255e?w=800&h=600&fit=crop&q=80`,
      `${U}1605146769289-440113cc3d00?w=800&h=600&fit=crop&q=80`,
    ],
    description: "Premium rental on the 45th floor with panoramic city views, concierge service, gym, pool, and co-working spaces. Unbeatable location in the financial district.",
    status: "For Rent",
    featured: true,
    yearBuilt: 2021,
    agent: { name: "James Wilson", phone: "(213) 555-0321", email: "james@vistahomes.com", photo: "https://randomuser.me/api/portraits/men/86.jpg" }
  },
  {
    id: "7",
    title: "Commercial Space - Wilshire Blvd",
    price: 3500000,
    location: "Beverly Hills, CA",
    city: "Beverly Hills",
    type: "Commercial",
    bedrooms: 0,
    bathrooms: 2,
    sqft: 4500,
    image: `${U}1600585154526-990dced4db0d?w=600&h=400&fit=crop&q=80`,
    images: [
      `${U}1497366216548-37526070297c?w=800&h=600&fit=crop&q=80`,
    ],
    description: "Prime commercial real estate on Wilshire Boulevard. Open floor plan, high ceilings, corner lot with excellent visibility. Ideal for retail, showroom, or office space.",
    status: "For Sale",
    featured: false,
    yearBuilt: 2010,
    agent: { name: "James Wilson", phone: "(213) 555-0321", email: "james@vistahomes.com", photo: "https://randomuser.me/api/portraits/men/86.jpg" }
  },
  {
    id: "8",
    title: "Cozy Studio Near UCLA",
    price: 2400,
    location: "Westwood, CA",
    city: "Santa Monica",
    type: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 650,
    image: `${U}1560448204-e02f11c3d0e2?w=600&h=400&fit=crop&q=80`,
    images: [
      `${U}1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80`,
    ],
    description: "Bright and modern studio apartment steps from UCLA. Recently renovated with stainless steel appliances, in-unit laundry, and building gym. Ideal for student or professional.",
    status: "For Rent",
    featured: false,
    yearBuilt: 2018,
    agent: { name: "Elena Rodriguez", phone: "(626) 555-0789", email: "elena@vistahomes.com", photo: "https://randomuser.me/api/portraits/women/65.jpg" }
  },
  {
    id: "9",
    title: "Malibu Cliffside Retreat",
    price: 3200000,
    location: "Malibu, CA",
    city: "Malibu",
    type: "Villa",
    bedrooms: 4,
    bathrooms: 5,
    sqft: 4800,
    image: `${U}1600573472591-ee6b68d14c68?w=600&h=400&fit=crop&q=80`,
    images: [
      `${U}1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&q=80`,
      `${U}1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80`,
    ],
    description: "Architectural masterpiece perched on the cliffs of Malibu. Glass walls dissolve the boundary between indoors and out. Infinity pool overlooking the Pacific.",
    status: "For Sale",
    featured: true,
    yearBuilt: 2023,
    agent: { name: "Sarah Chen", phone: "(310) 555-0123", email: "sarah@vistahomes.com", photo: "https://randomuser.me/api/portraits/women/44.jpg" }
  },
  {
    id: "10",
    title: "Pasadena Craftsman Bungalow",
    price: 825000,
    location: "Pasadena, CA",
    city: "Pasadena",
    type: "House",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2100,
    image: `${U}1512917774080-9991f1c4c750?w=600&h=400&fit=crop&q=80`,
    images: [
      `${U}1564013799919-ab600027ffc6?w=800&h=600&fit=crop&q=80`,
    ],
    description: "Restored craftsman bungalow with original woodwork, built-in bookcases, and a wraparound porch. Modern kitchen and bathrooms blend old-world charm with contemporary comfort.",
    status: "For Sale",
    featured: false,
    yearBuilt: 1925,
    agent: { name: "Elena Rodriguez", phone: "(626) 555-0789", email: "elena@vistahomes.com", photo: "https://randomuser.me/api/portraits/women/65.jpg" }
  },
  {
    id: "11",
    title: "Equestrian Estate in Hidden Hills",
    price: 5800000,
    location: "Hidden Hills, CA",
    city: "Malibu",
    type: "Villa",
    bedrooms: 6,
    bathrooms: 7,
    sqft: 7200,
    image: `${U}1600566752355-35792bedcfea?w=600&h=400&fit=crop&q=80`,
    images: [
      `${U}1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&q=80`,
      `${U}1600573472592-401b489a3cdc?w=800&h=600&fit=crop&q=80`,
    ],
    description: "Exclusive gated equestrian estate with stables, riding trails, pool house, and guest quarters. Main residence features a grand foyer, library, and gourmet kitchen.",
    status: "For Sale",
    featured: true,
    yearBuilt: 2019,
    agent: { name: "Michael Torres", phone: "(213) 555-0456", email: "michael@vistahomes.com", photo: "https://randomuser.me/api/portraits/men/32.jpg" }
  },
  {
    id: "12",
    title: "Venice Beach Modern",
    price: 1750000,
    location: "Venice, CA",
    city: "Santa Monica",
    type: "House",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2200,
    image: `${U}1605146769289-440113cc3d00?w=600&h=400&fit=crop&q=80`,
    images: [
      `${U}1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop&q=80`,
      `${U}1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop&q=80`,
    ],
    description: "Sleek modern home in the heart of Venice. Rooftop deck with ocean views, open concept living, and a two-car garage. Walk to Abbot Kinney and the beach boardwalk.",
    status: "For Sale",
    featured: false,
    yearBuilt: 2020,
    agent: { name: "James Wilson", phone: "(213) 555-0321", email: "james@vistahomes.com", photo: "https://randomuser.me/api/portraits/men/86.jpg" }
  },
  {
    id: "13",
    title: "Downtown Luxury Rental",
    price: 4800,
    location: "Downtown LA, CA",
    city: "Downtown LA",
    type: "Condo",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1350,
    image: `${U}1600573472592-401b489a3cdc?w=600&h=400&fit=crop&q=80`,
    images: [
      `${U}1486325212027-8081e485255e?w=800&h=600&fit=crop&q=80`,
    ],
    description: "High-floor condo with sweeping city and mountain views. Top-of-the-line finishes, custom closets, and resort-style amenities including pool, spa, and 24-hour doorman.",
    status: "For Rent",
    featured: false,
    yearBuilt: 2019,
    agent: { name: "Michael Torres", phone: "(213) 555-0456", email: "michael@vistahomes.com", photo: "https://randomuser.me/api/portraits/men/32.jpg" }
  },
  {
    id: "14",
    title: "Retail Space - 3rd Street Promenade",
    price: 12000,
    location: "Santa Monica, CA",
    city: "Santa Monica",
    type: "Commercial",
    bedrooms: 0,
    bathrooms: 1,
    sqft: 1800,
    image: `${U}1497366216548-37526070297c?w=600&h=400&fit=crop&q=80`,
    images: [
      `${U}1600585154526-990dced4db0d?w=800&h=600&fit=crop&q=80`,
    ],
    description: "Premium retail space on Santa Monica's iconic 3rd Street Promenade. High foot traffic, floor-to-ceiling windows, and ready for immediate lease. Perfect for flagship retail.",
    status: "For Rent",
    featured: false,
    yearBuilt: 2000,
    agent: { name: "James Wilson", phone: "(213) 555-0321", email: "james@vistahomes.com", photo: "https://randomuser.me/api/portraits/men/86.jpg" }
  },
  {
    id: "15",
    title: "Malibu Beach Cottage",
    price: 1850000,
    location: "Malibu, CA",
    city: "Malibu",
    type: "House",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1600,
    image: `${U}1600047509807-ba8f99d2cdde?w=600&h=400&fit=crop&q=80`,
    images: [
      `${U}1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop&q=80`,
      `${U}1512917774080-9991f1c4c750?w=800&h=600&fit=crop&q=80`,
    ],
    description: "Charming beach cottage just steps from the sand. Updated throughout with coastal-chic decor, a private patio, and outdoor shower. The perfect Malibu getaway.",
    status: "For Sale",
    featured: false,
    yearBuilt: 1965,
    agent: { name: "Sarah Chen", phone: "(310) 555-0123", email: "sarah@vistahomes.com", photo: "https://randomuser.me/api/portraits/women/44.jpg" }
  },
  {
    id: "16",
    title: "Beverly Hills Condo with Views",
    price: 1200000,
    location: "Beverly Hills, CA",
    city: "Beverly Hills",
    type: "Condo",
    bedrooms: 2,
    bathrooms: 3,
    sqft: 2100,
    image: `${U}1600585154340-be6161a56a0c?w=600&h=400&fit=crop&q=80`,
    images: [
      `${U}1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&q=80`,
      `${U}1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&q=80`,
    ],
    description: "Elegant condo in the heart of Beverly Hills with panoramic city views, marble floors, gourmet kitchen, and a private balcony. Building offers pool, gym, and concierge.",
    status: "For Sale",
    featured: false,
    yearBuilt: 2017,
    agent: { name: "Michael Torres", phone: "(213) 555-0456", email: "michael@vistahomes.com", photo: "https://randomuser.me/api/portraits/men/32.jpg" }
  },
];

export const neighborhoods = [
  { name: "Malibu", image: `${U}1600596542815-ffad4c1539a9?w=600&h=400&fit=crop&q=80`, count: 24 },
  { name: "Beverly Hills", image: `${U}1600566753190-17f0baa2a6c3?w=600&h=400&fit=crop&q=80`, count: 18 },
  { name: "Downtown LA", image: `${U}1486325212027-8081e485255e?w=600&h=400&fit=crop&q=80`, count: 31 },
  { name: "Pasadena", image: `${U}1564013799919-ab600027ffc6?w=600&h=400&fit=crop&q=80`, count: 15 },
  { name: "Santa Monica", image: `${U}1600585154340-be6161a56a0c?w=600&h=400&fit=crop&q=80`, count: 22 },
];

export const testimonials = [
  {
    name: "Robert Anderson",
    role: "Home Buyer",
    content: "Vista Homes made our dream of owning a Malibu home a reality. Their expertise and dedication were unmatched throughout the entire process.",
    rating: 5,
  },
  {
    name: "Jennifer Park",
    role: "Property Investor",
    content: "The team's market knowledge helped me secure an incredible investment property. I've never worked with a more professional real estate agency.",
    rating: 5,
  },
  {
    name: "David & Lisa Thompson",
    role: "Sold Their Home",
    content: "We sold our home in just 12 days thanks to Vista Homes' strategic marketing. They achieved 15% above our asking price.",
    rating: 5,
  },
];

export const propertyTypes = ["House", "Apartment", "Villa", "Commercial", "Condo"] as const;
export const statuses = ["For Sale", "For Rent", "Sold"] as const;
