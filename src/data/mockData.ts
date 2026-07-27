import { BlogPost, TripPlanResult } from '../types';

export const DEFAULT_USER = {
  email: 'boorlaabhiram2@gmail.com',
  name: 'Abhiram Boorla',
  picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  isLoggedIn: true,
  loginMethod: 'google_sso' as const,
};

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: '🌴 Mumbai to Goa Coastal Highway Expedition (NH-66)',
    authorName: 'Abhiram Boorla',
    authorEmail: 'boorlaabhiram2@gmail.com',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    date: 'July 25, 2026',
    coverImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Driving through lush Konkan ghats, stopping at local Maharashtrian dhabas, petrol stations, and luxury beach resorts in North Goa!',
    content: `Cruising along the four-lane Mumbai to Goa NH-66 highway is a rite of passage for every Indian road-tripper. Leaving the bustle of Mumbai early at 5:00 AM, the sea breeze of the Konkan coastline greets you with pristine palm groves.

### The Route & Pit Stops
The total distance is roughly 580 km. Make sure to top up fuel at the **IndianOil Swagat Highway Plaza** near Chiplun. For mid-way snacks, stop at **Hotel Vitthal Kamat** for piping hot Misal Pav and filter coffee.

### Stays & Luxury Beachfront Resorts
In North Goa, we booked the **Taj Fort Aguada Resort & Spa** near Sinquerim Beach. Waking up to waves crashing against historic Portuguese fort walls was ethereal.

### Local Seafood & Shopping Malls
Don't miss butter garlic prawns at **Brittos Baga Beach** and shopping at **Mall De Goa** in Porvorim for local cashew nuts and handicrafts.`,
    origin: 'Mumbai, MH',
    destination: 'Goa (Panaji)',
    likesCount: 384,
    commentsCount: 42,
    tags: ['India', 'Road Trip', 'Beach', 'Goa', 'Konkan'],
    featured: true,
    tripPlanSummary: {
      distanceKm: 580,
      durationText: '9 hours 30 mins',
      totalCostEstimate: 14500, // ₹14,500 INR
      hotelName: 'Taj Fort Aguada Resort & Spa',
      topFood: 'Britto’s Goan Butter Garlic Prawns',
    },
  },
  {
    id: 'blog-2',
    title: '⛰️ Delhi to Manali & Solang Valley Bike & SUV Drive',
    authorName: 'Vikramaditya Sharma',
    authorEmail: 'vikram.sharma@himalayas.in',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    date: 'July 22, 2026',
    coverImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Conquering the Himalayan foothills on a Royal Enfield Himalayan & Mahindra Thar 4x4. Complete fuel stop and dhaba guide!',
    content: `Taking the Chandigarh-Manali highway up into the snow-capped Himalayan ranges is an unmatched adrenaline rush. 

### Fuel & Highway Dhabas
Refuel your bike or SUV at the **HPCL Auto Care Centre** near Bilaspur. Eat stuffed parathas with homemade white butter at the legendary **Sukhdev Dhaba Murthal** near Delhi.

### Shopping & Hotels
Stay at **The Himalayan Resort & Spa** in Old Manali and shop at **Mall Road Manali** for handmade Pashmina shawls and Kullu caps.`,
    origin: 'Delhi, NCR',
    destination: 'Manali, HP',
    likesCount: 512,
    commentsCount: 68,
    tags: ['India', 'Himalayas', 'Royal Enfield', 'Manali', 'Mountains'],
    featured: true,
    tripPlanSummary: {
      distanceKm: 535,
      durationText: '11 hours 15 mins',
      totalCostEstimate: 18200, // ₹18,200 INR
      hotelName: 'The Himalayan Resort & Spa',
      topFood: 'Amriti Paratha & Siddu',
    },
  },
  {
    id: 'blog-3',
    title: '🗼 Paris to Nice Riviera: French Highway Road Trip',
    authorName: 'Sophie Laurent',
    authorEmail: 'sophie.l@travel.com',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    date: 'July 18, 2026',
    coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Driving through Burgundy vineyards, ancient castles in Provence, and ending with seaside luxury in Nice.',
    content: `France is best experienced by car or high-speed TGV train. Starting under the glowing lights of the Eiffel Tower, we rented an electric SUV and drove south toward the Promenade des Anglais in Nice.`,
    origin: 'Paris, France',
    destination: 'Nice, France',
    likesCount: 295,
    commentsCount: 34,
    tags: ['Foreign', 'Europe', 'Luxury', 'Wine & Dine'],
    featured: false,
    tripPlanSummary: {
      distanceKm: 930,
      durationText: '8 hours 50 mins',
      totalCostEstimate: 48000, // ₹48,000 INR equivalent
      hotelName: 'Le Negresco Hotel Nice',
      topFood: 'Le Chantecler & Local Socca',
    },
  },
  {
    id: 'blog-4',
    title: '🌸 Tokyo to Kyoto Bullet Train & Road Escapade',
    authorName: 'Kenji Takahashi',
    authorEmail: 'kenji.t@japan.org',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    date: 'July 12, 2026',
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    excerpt: 'Connecting hyper-modern Tokyo Shinjuku with thousand-year-old shrines in Kyoto via Shinkansen bullet train.',
    content: `Boarding the Tokaido Shinkansen bullet train at Tokyo Station with a fresh bento box in hand marks the beginning of magic. In just over two hours, Mount Fuji glides past your window.`,
    origin: 'Tokyo, Japan',
    destination: 'Kyoto, Japan',
    likesCount: 420,
    commentsCount: 51,
    tags: ['Foreign', 'Asia', 'Bullet Train', 'Culture'],
    featured: false,
    tripPlanSummary: {
      distanceKm: 450,
      durationText: '2 hours 15 mins (Shinkansen)',
      totalCostEstimate: 36000, // ₹36,000 INR
      hotelName: 'Gion Hatanaka Traditional Ryokan',
      topFood: 'Kaiseki Dining & Gion Ramen',
    },
  },
];

export const PRESET_TRIPS: Record<string, TripPlanResult> = {
  'mumbai-goa': {
    id: 'mumbai-goa-preset',
    origin: 'Mumbai, MH',
    destination: 'Goa (Panaji)',
    budget: 'Standard',
    travelersCount: 2,
    daysCount: 3,
    distanceKm: 580,
    durationText: '9 hours 30 mins',
    totalCostEstimate: 16500, // ₹16,500 INR
    googleDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Mumbai,+MH&destination=Panaji,+Goa&travelmode=driving',
    createdAt: new Date().toISOString(),
    waypoints: [
      { name: 'Mumbai Gateway', lat: 18.922, lng: 72.8347, type: 'origin', description: 'Starting point in South Mumbai' },
      { name: 'BPCL Fuel Stop Chiplun', lat: 17.5323, lng: 73.518, type: 'fuel', description: 'Petrol, Diesel & EV Fast Charger' },
      { name: 'Kamat Highway Dhaba', lat: 16.9902, lng: 73.312, type: 'food', description: 'Famous South Indian & Vada Pav' },
      { name: 'Mall De Goa Porvorim', lat: 15.5342, lng: 73.8242, type: 'mall', description: 'Top Shopping Mall with cinema & food court' },
      { name: 'Taj Fort Aguada', lat: 15.4925, lng: 73.7737, type: 'hotel', description: 'Luxury beachfront Aguada stay' },
      { name: 'Panaji City Center', lat: 15.4989, lng: 73.8278, type: 'destination', description: 'Destination Panaji' },
    ],
    routePolylineCoords: [
      [18.922, 72.8347],
      [18.5204, 73.8567],
      [17.5323, 73.518],
      [16.9902, 73.312],
      [15.5342, 73.8242],
      [15.4989, 73.8278],
    ],
    hotels: [
      {
        id: 'h-goa-1',
        name: 'Taj Fort Aguada Resort & Spa',
        category: 'Luxury Beachfront 5-Star',
        pricePerNight: 12500, // ₹12,500 / night
        rating: 4.9,
        address: 'Sinquerim, Candolim, Goa 403515',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        description: 'Iconic 5-star oceanfront resort built into 16th century Portuguese fort walls.',
        amenities: ['Infinity Pool', 'Private Beach Access', 'Jiva Spa', 'Free Breakfast', 'Valet'],
        googleMapUrl: 'https://maps.google.com/?q=Taj+Fort+Aguada+Goa',
        bookingUrl: 'https://www.booking.com',
      },
      {
        id: 'h-goa-2',
        name: 'Hard Rock Hotel Goa',
        category: 'Mid-Range Boutique 4-Star',
        pricePerNight: 5200, // ₹5,200 / night
        rating: 4.6,
        address: '370/14 Porba Vaddo, Calangute, Goa 403516',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        description: 'Vibrant music-themed hotel in Calangute with crystal pool and live acoustic gigs.',
        amenities: ['Lagoon Pool', 'Live Music', 'Gym', 'Free Wi-Fi', 'Bar'],
        googleMapUrl: 'https://maps.google.com/?q=Hard+Rock+Hotel+Goa',
        bookingUrl: 'https://www.booking.com',
      },
      {
        id: 'h-goa-3',
        name: 'Zostel Goa (Anjuna Beach)',
        category: 'Economy Backpacker & Pool Hostel',
        pricePerNight: 1800, // ₹1,800 / night
        rating: 4.5,
        address: 'Anjuna Beach Road, Goa 403509',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
        description: 'Cozy social hostel with private rooms, outdoor pool, and rooftop sunset terrace.',
        amenities: ['Swimming Pool', 'Co-working Area', 'Free Wi-Fi', 'Cafe'],
        googleMapUrl: 'https://maps.google.com/?q=Zostel+Anjuna+Goa',
        bookingUrl: 'https://www.zostel.com',
      },
    ],
    vehicles: [
      {
        type: 'Rental SUV / 4x4',
        name: 'Mahindra Thar 4x4 / Tata Nexon EV',
        estimatedDailyRate: 3200, // ₹3,200 / day
        fuelEstimate: 2400, // ₹2,400 fuel
        co2Estimate: 'Low Emission EV / Diesel',
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
        highlights: ['Convertible 4x4 top', 'Touchscreen Infotainment', 'High Ground Clearance'],
      },
      {
        type: 'Cruiser Bike Expedition',
        name: 'Royal Enfield Himalayan 450 / Classic 350',
        estimatedDailyRate: 1500, // ₹1,500 / day
        fuelEstimate: 1600, // ₹1,600 fuel
        co2Estimate: 'Fuel Efficient (35 km/l)',
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
        highlights: ['High-torque motor for ghats', 'Dual Channel ABS', 'Luggage carriers'],
      },
      {
        type: 'Sedan / Hatchback',
        name: 'Honda City / Maruti Swift Dzire',
        estimatedDailyRate: 2200, // ₹2,200 / day
        fuelEstimate: 2000, // ₹2,000 fuel
        co2Estimate: '22 km/l Mileage',
        image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80',
        highlights: ['Chilled AC', 'Automatic Gearbox', 'Comfortable 5-Seater'],
      },
    ],
    foodSpots: [
      {
        name: 'Britto’s Baga Beach',
        placeName: 'Britto’s Restaurant & Bar',
        cuisine: 'Goan Seafood & Continental',
        priceLevel: '₹₹',
        rating: 4.8,
        address: 'Baga Beach, Calangute, Goa',
        signatureDish: 'Goan Fish Curry Rice & Butter Garlic Crab',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        tags: ['Beachfront', 'Live Saxophone', 'Seafood Master'],
      },
      {
        name: 'Thalassa Greek Taverna',
        placeName: 'Thalassa Vagator',
        cuisine: 'Greek & Mediterranean',
        priceLevel: '₹₹₹',
        rating: 4.7,
        address: 'Vagator Cliff, Goa',
        signatureDish: 'Souvlaki Wraps & Sunset Cocktails',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        tags: ['Cliffside Sunset', 'Celebrity Favorite', 'Luxury Ambiance'],
      },
      {
        name: 'Mum’s Kitchen Panaji',
        placeName: 'Mum’s Kitchen Fine Dining',
        cuisine: 'Traditional Goan Heritage',
        priceLevel: '₹₹',
        rating: 4.6,
        address: '854 Martin’s Building, Panaji, Goa',
        signatureDish: 'Pork Vindaloo & Bebinca Dessert',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        tags: ['Heritage Recipes', 'Family Friendly', 'Authentic'],
      },
    ],
    shoppingMalls: [
      {
        id: 'm1',
        name: 'Mall De Goa',
        city: 'Porvorim, Goa',
        rating: 4.6,
        address: 'NH 66, Porvorim, Goa 403501',
        image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80',
        highlights: ['INOX Multiplex', 'Global Brands (ZARA, Nike)', 'Food Court', 'Goan Cashew Shops'],
        googleMapUrl: 'https://maps.google.com/?q=Mall+De+Goa+Porvorim',
      },
      {
        id: 'm2',
        name: 'Caculo Mall',
        city: 'Panaji, Goa',
        rating: 4.4,
        address: 'Sharda Building, St Inez, Panaji, Goa 403001',
        image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=800&q=80',
        highlights: ['Boutique Fashion', 'Gaming Arcade', 'KFC & Domino’s', 'Supermarket'],
        googleMapUrl: 'https://maps.google.com/?q=Caculo+Mall+Panaji',
      },
    ],
    fuelStations: [
      {
        id: 'f1',
        name: 'BPCL Swagat Highway Service Station',
        brand: 'Bharat Petroleum (BPCL)',
        fuelTypes: ['Petrol', 'Speed Petrol', 'Diesel', 'EV Fast Charger 60kW'],
        petrolPricePerLitre: 104.2,
        dieselPricePerLitre: 92.5,
        address: 'NH-66 Highway, Chiplun, Maharashtra',
        distanceFromRoute: 'Directly on Highway',
        openHours: '24 Hours Open',
        googleMapUrl: 'https://maps.google.com/?q=BPCL+Chiplun+Highway',
      },
      {
        id: 'f2',
        name: 'IndianOil COCO Auto Care Plaza',
        brand: 'IndianOil (IOCL)',
        fuelTypes: ['XP95 Petrol', 'Diesel', 'CNG', '24/7 Air Pump'],
        petrolPricePerLitre: 103.8,
        dieselPricePerLitre: 91.9,
        address: 'NH-66 Khed Bypass, Maharashtra',
        distanceFromRoute: '0.2 km from main lane',
        openHours: '24 Hours Open',
        googleMapUrl: 'https://maps.google.com/?q=IndianOil+COCO+Khed',
      },
    ],
    flights: [
      {
        id: 'fl-1',
        name: 'IndiGo 6E-621',
        airline: 'IndiGo Airlines',
        airlineLogo: '✈️',
        flightNumber: '6E-621',
        departureTime: '07:15 AM (BOM)',
        arrivalTime: '08:30 AM (GOI)',
        duration: '1h 15m',
        type: 'Direct',
        priceINR: 3499, // ₹3,499
        bookingUrl: 'https://www.goindigo.in',
      },
      {
        id: 'fl-2',
        name: 'Air India AI-582',
        airline: 'Air India',
        airlineLogo: '✈️',
        flightNumber: 'AI-582',
        departureTime: '11:40 AM (BOM)',
        arrivalTime: '12:55 PM (GOX)',
        duration: '1h 15m',
        type: 'Direct',
        priceINR: 4200, // ₹4,200
        bookingUrl: 'https://www.airindia.com',
      },
    ],
    weather: {
      destinationName: 'Goa (Panaji)',
      currentTempC: 29,
      condition: 'Tropical Sunshine & Coastal Breeze',
      humidity: 72,
      windKmH: 16,
      packingTip: 'Pack light linen shirts, beachwear, mineral sunscreen, flip flops, and cotton hats!',
      forecast: [
        { day: 'Day 1', tempC: 29, condition: 'Sunny Beach Weather', icon: '☀️' },
        { day: 'Day 2', tempC: 30, condition: 'Partly Cloudy Breeze', icon: '⛅' },
        { day: 'Day 3', tempC: 28, condition: 'Pleasant Sunset Sky', icon: '🌤️' },
      ],
    },
    dailyItinerary: [
      {
        dayNumber: 1,
        title: 'Mumbai Departure & Konkan Coast Highway Cruise',
        morning: 'Depart Mumbai via NH-66 highway at 5:30 AM. Breakfast stop at Kamat Dhaba for hot Misal Pav & filter tea.',
        afternoon: 'Refuel at BPCL Chiplun station. Arrive in North Goa by 3:00 PM, check into Taj Fort Aguada Resort.',
        evening: 'Sunset drinks at Sinquerim Fort followed by Goan seafood feast at Britto’s Baga Beach.',
        dayEstimatedCost: 4500,
      },
      {
        dayNumber: 2,
        title: 'Water Sports, Heritage Forts & Shopping Mall',
        morning: 'Parasailing and jet-skiing at Calangute Beach followed by visit to historic Aguada Lighthouse.',
        afternoon: 'Shop for Goan spices, cashew nuts, and handicrafts at Mall De Goa in Porvorim.',
        evening: 'Dinner at Thalassa Vagator Cliff with Greek fire dance shows.',
        dayEstimatedCost: 6500,
      },
      {
        dayNumber: 3,
        title: 'Panaji Latin Quarter (Fontainhas) & Mandovi Cruise',
        morning: 'Photowalk through Fontainhas (Portuguese colorful streets) and lunch at Mum’s Kitchen.',
        afternoon: 'Souvenir shopping at Panaji Market.',
        evening: 'Sunset luxury cruise on Mandovi River before evening drive or flight home.',
        dayEstimatedCost: 3500,
      },
    ],
    blogStory: {
      title: 'Konkan Coast Highway Drive: 580km from Mumbai to Goa',
      excerpt: 'Four lanes of pristine coastal road, spicy dhabas, local petrol stations, and luxury beach resorts in North Goa!',
      fullContent: `Driving from Mumbai to Goa via NH-66 is a bucket-list journey for every traveller.

### Smooth Highways & Refueling
The upgraded 4-lane expressway cuts travel time down to under 9.5 hours. Topping up fuel at Chiplun BPCL Plaza keeps your vehicle primed.

### Stays & Dining
From the luxury Taj Fort Aguada right on Sinquerim beach to beach shacks serving fresh butter garlic mud crabs, Goa never disappoints!`,
      coverImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      tags: ['Mumbai', 'Goa', 'Beach Road Trip', 'India Travel'],
    },
  },
  'miami-keywest': {
    id: 'miami-keywest-preset',
    origin: 'Miami, FL',
    destination: 'Key West, FL',
    budget: 'Standard',
    travelersCount: 2,
    daysCount: 3,
    distanceKm: 265,
    durationText: '3 hours 45 mins',
    totalCostEstimate: 42000, // ₹42,000 INR
    googleDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=Miami,+FL&destination=Key+West,+FL&travelmode=driving',
    createdAt: new Date().toISOString(),
    waypoints: [
      { name: 'Miami Downtown', lat: 25.7617, lng: -80.1918, type: 'origin', description: 'Starting in downtown Miami' },
      { name: 'Shell Overseas Fuel Station', lat: 24.95, lng: -80.55, type: 'fuel', description: 'Petrol, Diesel & EV charging' },
      { name: 'Islamorada Key Lime Stop', lat: 24.9243, lng: -80.6278, type: 'food', description: 'Key Lime Pie & Seafood' },
      { name: 'Key West Plaza Mall', lat: 24.56, lng: -81.78, type: 'mall', description: 'Local shopping center' },
      { name: 'Ocean Key Resort', lat: 24.5588, lng: -81.8064, type: 'hotel', description: 'Luxury beachfront resort' },
      { name: 'Key West Duval St', lat: 24.5551, lng: -81.8017, type: 'destination', description: 'Historic Key West sunset' },
    ],
    routePolylineCoords: [
      [25.7617, -80.1918],
      [25.5000, -80.4000],
      [24.9243, -80.6278],
      [24.7001, -81.1189],
      [24.5588, -81.8064],
    ],
    hotels: [
      {
        id: 'h1',
        name: 'Ocean Key Resort & Spa',
        category: 'Luxury Beachfront',
        pricePerNight: 22000, // ₹22,000 INR
        rating: 4.8,
        address: '0 Duval St, Key West, FL 33040',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        description: 'Prime Duval street location right on the Gulf of Mexico with private balconies and sunset pier.',
        amenities: ['Ocean Pool', 'Sunset Pier', 'Full Spa', 'Free Wi-Fi', 'Valet Parking'],
        googleMapUrl: 'https://maps.google.com/?q=Ocean+Key+Resort+Key+West',
        bookingUrl: 'https://www.booking.com',
      },
      {
        id: 'h2',
        name: 'The Palms Hotel Key West',
        category: 'Mid-Range Boutique',
        pricePerNight: 11500, // ₹11,500 INR
        rating: 4.5,
        address: '820 White St, Key West, FL 33040',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        description: 'Charming Victorian guest house with lush tropical gardens, heated swimming pool, and breakfast.',
        amenities: ['Heated Pool', 'Free Breakfast', 'Bicycle Rentals', 'Pet Friendly'],
        googleMapUrl: 'https://maps.google.com/?q=The+Palms+Hotel+Key+West',
        bookingUrl: 'https://www.booking.com',
      },
    ],
    vehicles: [
      {
        type: 'Convertible Mustang',
        name: 'Ford Mustang Convertible',
        estimatedDailyRate: 5200, // ₹5,200 INR
        fuelEstimate: 2600, // ₹2,600 INR
        co2Estimate: 'Moderate (21 MPG)',
        image: 'https://images.unsplash.com/photo-1584345604476-8ec5e12e4092?auto=format&fit=crop&w=800&q=80',
        highlights: ['Drop top for coastal wind', 'Premium Bluetooth audio', 'Fits 2 luggage pieces'],
      },
      {
        type: 'Economy Hybrid',
        name: 'Toyota Prius Hybrid',
        estimatedDailyRate: 3400, // ₹3,400 INR
        fuelEstimate: 1200, // ₹1,200 INR
        co2Estimate: 'Low Emission (52 MPG)',
        image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80',
        highlights: ['Ultra fuel efficient', 'Smooth highway adaptive cruise', 'Spacious hatchback'],
      },
    ],
    foodSpots: [
      {
        name: 'Robbie’s of Islamorada',
        placeName: 'Robbie’s Marina & Grill',
        cuisine: 'Seafood & Key Lime',
        priceLevel: '₹₹',
        rating: 4.7,
        address: '77522 Overseas Hwy, Islamorada, FL',
        signatureDish: 'Fresh Mahi Tacos & Key Lime Pie',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        tags: ['Oceanfront', 'Family Friendly', 'Tarpon Feeding'],
      },
      {
        name: 'Blue Heaven',
        placeName: 'Blue Heaven Key West',
        cuisine: 'Caribbean-Floribbean',
        priceLevel: '₹₹₹',
        rating: 4.8,
        address: '729 Thomas St, Key West, FL',
        signatureDish: 'Mile-High Key Lime Pie & Lobster Benedict',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        tags: ['Live Music', 'Rooster Courtyard', 'Iconic Dessert'],
      },
    ],
    shoppingMalls: [
      {
        id: 'm-kw1',
        name: 'Key West Seaport Market & Mall',
        city: 'Key West, FL',
        rating: 4.5,
        address: 'Historic Seaport Waterfront, Key West',
        image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80',
        highlights: ['Artisan Souvenirs', 'Sponge Market', 'Seafood Boutiques'],
        googleMapUrl: 'https://maps.google.com/?q=Key+West+Seaport+Market',
      },
    ],
    fuelStations: [
      {
        id: 'f-kw1',
        name: 'Shell Overseas 24/7 Service Station',
        brand: 'Shell Oil',
        fuelTypes: ['Unleaded Petrol', 'Premium Diesel', 'EV Fast Charger'],
        petrolPricePerLitre: 110.0,
        dieselPricePerLitre: 102.0,
        address: 'Overseas Hwy, Islamorada, FL',
        distanceFromRoute: 'Directly on Highway',
        openHours: '24 Hours Open',
        googleMapUrl: 'https://maps.google.com/?q=Shell+Islamorada+FL',
      },
    ],
    flights: [
      {
        id: 'fl-kw1',
        name: 'American Airlines AA-1420',
        airline: 'American Airlines',
        airlineLogo: '✈️',
        flightNumber: 'AA-1420',
        departureTime: '09:30 AM (MIA)',
        arrivalTime: '10:25 AM (EYW)',
        duration: '0h 55m',
        type: 'Direct',
        priceINR: 6800, // ₹6,800 INR
        bookingUrl: 'https://www.aa.com',
      },
    ],
    weather: {
      destinationName: 'Key West, FL',
      currentTempC: 28,
      condition: 'Sunny with Ocean Breeze',
      humidity: 68,
      windKmH: 18,
      packingTip: 'Pack light linen clothes, polarized sunglasses, mineral sunscreen, and comfortable water sandals!',
      forecast: [
        { day: 'Fri', tempC: 29, condition: 'Sunny', icon: '☀️' },
        { day: 'Sat', tempC: 28, condition: 'Partly Cloudy', icon: '⛅' },
        { day: 'Sun', tempC: 28, condition: 'Sunny & Breeze', icon: '🌤️' },
      ],
    },
    dailyItinerary: [
      {
        dayNumber: 1,
        title: 'Miami Departure & Overseas Highway Drive',
        morning: 'Pick up vehicle in Miami, drive south along US-1 towards Islamorada. Stop at Robbie’s Marina.',
        afternoon: 'Cross historic Seven Mile Bridge. Arrive in Key West, check into Ocean Key Resort.',
        evening: 'Mallory Square Sunset Celebration & dinner at Blue Heaven.',
        dayEstimatedCost: 14000,
      },
      {
        dayNumber: 2,
        title: 'Key West History & Beaches',
        morning: 'Visit Ernest Hemingway’s historic house.',
        afternoon: 'Rent paddleboard at Smathers Beach or reef snorkel.',
        evening: 'Dinner at El Siboney.',
        dayEstimatedCost: 16000,
      },
      {
        dayNumber: 3,
        title: 'Southernmost Point & Return Drive / Flight',
        morning: 'Southernmost Point Buoy photo op.',
        afternoon: 'Shopping at Key West Seaport Mall.',
        evening: 'Scenic drive or return flight.',
        dayEstimatedCost: 12000,
      },
    ],
    blogStory: {
      title: 'Island Hopping by Car: Our Epic 265km Key West Getaway',
      excerpt: 'Forty-two bridges, turquoise sea on both sides, and key lime pie at every stop.',
      fullContent: `Driving the Overseas Highway from Miami to Key West feels like flying over the ocean.`,
      coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      tags: ['Florida Keys', 'Road Trip', 'Beach Escape'],
    },
  },
};

