import { GoogleGenAI, Type } from '@google/genai';

// Preset detailed routes for instant 1-click loading and zero-latency responses
const PRESET_TRIPS = {
  'mumbai-goa': {
    id: 'mumbai-goa-preset',
    origin: 'Mumbai, MH',
    destination: 'Goa (Panaji)',
    budget: 'Standard',
    travelersCount: 2,
    daysCount: 3,
    distanceKm: 580,
    durationText: '9 hours 30 mins',
    totalCostEstimate: 16500,
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
        pricePerNight: 12500,
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
        pricePerNight: 5200,
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
        pricePerNight: 1800,
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
        estimatedDailyRate: 3200,
        fuelEstimate: 2400,
        co2Estimate: 'Low Emission EV / Diesel',
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
        highlights: ['Convertible 4x4 top', 'Touchscreen Infotainment', 'High Ground Clearance'],
      },
      {
        type: 'Cruiser Bike Expedition',
        name: 'Royal Enfield Himalayan 450 / Classic 350',
        estimatedDailyRate: 1500,
        fuelEstimate: 1600,
        co2Estimate: 'Fuel Efficient (35 km/l)',
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
        highlights: ['High-torque motor for ghats', 'Dual Channel ABS', 'Luggage carriers'],
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
    ],
    shoppingMalls: [
      {
        id: 'mall-goa-1',
        name: 'Mall De Goa (Porvorim)',
        city: 'Porvorim, North Goa',
        rating: 4.6,
        address: 'NH 66, Porvorim, Goa 403521',
        image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80',
        highlights: ['INOX Multiplex 4-Screen', 'Top Fashion Brands', 'Large Food Court', 'Goan Cashew & Spices Bazaar'],
        googleMapUrl: 'https://maps.google.com/?q=Mall+De+Goa+Porvorim',
      },
    ],
    fuelStations: [
      {
        id: 'fuel-goa-1',
        name: 'IndianOil Swagat Highway Service Plaza',
        brand: 'IndianOil',
        fuelTypes: ['Petrol (₹104.2/L)', 'XP95 Premium', 'Diesel (₹92.4/L)', 'EV Fast Charging 60kW CCS2'],
        petrolPricePerLitre: 104.2,
        dieselPricePerLitre: 92.4,
        address: 'NH-66 Highway Milestone 210 near Chiplun',
        distanceFromRoute: 'Directly on Highway (Zero Detour)',
        openHours: '24 Hours Open • Free Clean Washrooms & ATM',
        googleMapUrl: 'https://maps.google.com/?q=IndianOil+Swagat+Chiplun',
      },
    ],
    flights: [
      {
        id: 'fl-goa-1',
        airline: 'IndiGo Express',
        airlineLogo: '✈️',
        flightNumber: '6E-5312',
        departureTime: '06:15 AM (BOM Mumbai)',
        arrivalTime: '07:30 AM (GOI Dabolim)',
        duration: '1h 15m',
        type: 'Direct',
        priceINR: 3450,
        bookingUrl: 'https://www.goindigo.in',
      },
    ],
    weather: {
      destinationName: 'Goa (Panaji)',
      currentTempC: 29,
      condition: 'Tropical Sunny & Ocean Breeze',
      humidity: 68,
      windKmH: 16,
      packingTip: 'Light cottons, flip-flops, UV sunscreen, and beach sunglasses!',
      forecast: [
        { day: 'Day 1', tempC: 30, condition: 'Sunny Beach Weather', icon: '☀️' },
        { day: 'Day 2', tempC: 29, condition: 'Warm Breeze', icon: '🌤️' },
        { day: 'Day 3', tempC: 28, condition: 'Clear Sunset', icon: '🌅' },
      ],
    },
    dailyItinerary: [
      {
        dayNumber: 1,
        title: 'Mumbai Departure & Coastal Konkan Drive',
        morning: '5:00 AM start via Mumbai-Pune Expressway & Khopoli to bypass morning city traffic.',
        afternoon: 'Halt for lunch at Kamat Highway Dhaba near Chiplun. Enjoy steaming Misal Pav and filter coffee.',
        evening: 'Cross Goa border, check into beachfront stay, and head to Baga Beach for candlelit seaside dinner.',
        dayEstimatedCost: 4500,
      },
      {
        dayNumber: 2,
        title: 'Fort Aguada, Water Sports & Sunset Dining',
        morning: 'Visit historic 17th century Fort Aguada lighthouse with sweeping views of the Arabian Sea.',
        afternoon: 'Parasailing and jet skiing at Calangute Beach followed by relaxing beach shack lunch.',
        evening: 'Golden hour sunset drinks and Mediterranean mezze at cliffside Thalassa in Vagator.',
        dayEstimatedCost: 6500,
      },
      {
        dayNumber: 3,
        title: 'Fontainhas Latin Quarter & Return Journey',
        morning: 'Walk through Panaji’s colorful Portuguese heritage streets in Fontainhas; visit bakeries for Bebinca.',
        afternoon: 'Souvenir shopping at Mall De Goa; pick up authentic Feni, roasted cashews, and spices.',
        evening: 'Begin relaxing drive back or head to airport for short evening flight home.',
        dayEstimatedCost: 5500,
      },
    ],
    blogStory: {
      title: 'The Great Konkan Coastal Highway: Mumbai to Goa Drive (NH-66)',
      excerpt: 'Lush mountain ghats, spicy highway dhabas, 24-hour fuel plazas, and sunset cocktails on Goa’s golden shores.',
      fullContent: `Driving from Mumbai to Goa along the newly four-laned NH-66 highway remains one of India’s most breathtaking road journeys. Leaving Mumbai before sunrise allows you to watch the misty Western Ghats awaken.
      
### Fuel & Food Stops
Stop at **IndianOil Swagat Highway Service Plaza** near Chiplun for clean restrooms and high-octane fuel. For authentic Konkani food, Kamat Dhaba serves fresh Kokum Sharbat and piping hot Vada Pav.

### Where to Stay
For luxury travelers, **Taj Fort Aguada** delivers world-class Portuguese colonial elegance. Backpacker adventurers will love the vibrant pool vibe at **Zostel Anjuna**.`,
      coverImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80',
      tags: ['India', 'Road Trip', 'Goa', 'Beach', 'NH66'],
    },
  },
};

// Generate rich dynamic fallback trip if Gemini key is missing or calls fail
function createDynamicFallbackTrip(origin, destination, budget, daysCount, travelersCount, vehiclePreference) {
  const baseCost = budget === 'Luxury' ? 32000 : budget === 'Economy' ? 9500 : 18500;
  const totalCostEstimate = baseCost * Math.max(1, daysCount / 3) * Math.max(1, travelersCount / 2);

  return {
    id: `trip-${Date.now()}`,
    origin,
    destination,
    budget,
    travelersCount,
    daysCount,
    distanceKm: 420,
    durationText: '5 hours 30 mins',
    totalCostEstimate: Math.round(totalCostEstimate),
    googleDirectionsUrl: `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=driving`,
    createdAt: new Date().toISOString(),
    waypoints: [
      { name: origin, lat: 19.076, lng: 72.8777, type: 'origin', description: `Starting journey from ${origin}` },
      { name: 'National Highway Fast Service Plaza', lat: 18.25, lng: 73.45, type: 'fuel', description: 'Petrol, Diesel, EV Fast Charger & Clean Restrooms' },
      { name: 'Midway Heritage Dhaba & Cafe', lat: 17.5, lng: 74.0, type: 'food', description: 'Fresh hot meals, thali & local snacks' },
      { name: `${destination} Central Hub Mall`, lat: 15.6, lng: 74.5, type: 'mall', description: 'Shopping, Multiplex & local handicrafts' },
      { name: `${destination} Prime Hotel Stay`, lat: 15.5, lng: 74.8, type: 'hotel', description: `Top-rated stay in ${destination}` },
      { name: destination, lat: 15.4, lng: 75.0, type: 'destination', description: `Arriving in ${destination}` },
    ],
    routePolylineCoords: [
      [19.076, 72.8777],
      [18.25, 73.45],
      [17.5, 74.0],
      [15.6, 74.5],
      [15.5, 74.8],
      [15.4, 75.0],
    ],
    hotels: [
      {
        id: `h-${Date.now()}-1`,
        name: `${destination} Grand Heritage Resort & Spa`,
        category: budget === 'Luxury' ? '5-Star Luxury Resort' : 'Boutique 4-Star Stay',
        pricePerNight: budget === 'Luxury' ? 14500 : budget === 'Economy' ? 2200 : 5800,
        rating: 4.8,
        address: `Main Boulevard, ${destination}`,
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        description: `Highly rated stay in central ${destination} with swimming pool, fine dining, and panoramic views.`,
        amenities: ['Swimming Pool', 'Free Wi-Fi', 'Breakfast Included', 'Spa', 'Secure Parking'],
        googleMapUrl: `https://maps.google.com/?q=${encodeURIComponent(destination + ' Hotels')}`,
        bookingUrl: 'https://www.booking.com',
      },
      {
        id: `h-${Date.now()}-2`,
        name: `${destination} Comfort Suites & Inn`,
        category: 'Comfort 3-Star City Hotel',
        pricePerNight: budget === 'Luxury' ? 8500 : budget === 'Economy' ? 1500 : 3400,
        rating: 4.5,
        address: `Station Road, ${destination}`,
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
        description: 'Modern convenient city hotel with air conditioning, workspace, and 24/7 room service.',
        amenities: ['Free Wi-Fi', 'Restaurant', 'AC Rooms', 'Room Service'],
        googleMapUrl: `https://maps.google.com/?q=${encodeURIComponent(destination + ' Hotels')}`,
        bookingUrl: 'https://www.booking.com',
      },
    ],
    vehicles: [
      {
        type: vehiclePreference || 'Rental SUV / 4x4',
        name: 'Mahindra Thar 4x4 / Tata Nexon EV',
        estimatedDailyRate: 3200,
        fuelEstimate: 2400,
        co2Estimate: 'Low Emission',
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
        highlights: ['Spacious 4x4', 'GPS Touchscreen', 'High Ground Clearance'],
      },
      {
        type: 'Sedan / Hatchback',
        name: 'Honda City / Maruti Dzire',
        estimatedDailyRate: 2100,
        fuelEstimate: 1900,
        co2Estimate: '21 km/L Mileage',
        image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80',
        highlights: ['Comfortable Seats', 'Smooth Automatic', 'Large Boot Space'],
      },
    ],
    foodSpots: [
      {
        name: `${destination} Heritage Highway Kitchen`,
        placeName: `${destination} Grand Dhaba`,
        cuisine: 'Local Regional Delicacies & Thali',
        priceLevel: '₹₹',
        rating: 4.7,
        address: `Highway Crossing, ${destination}`,
        signatureDish: 'House Special Thali, Tandoori Breads & Filter Coffee',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        tags: ['Great Ambiance', 'Family Friendly', 'Quick Service'],
      },
      {
        name: `${destination} Rooftop Lounge & Bistro`,
        placeName: 'The Skyline Cafe',
        cuisine: 'Multi-Cuisine & Beverages',
        priceLevel: '₹₹',
        rating: 4.6,
        address: `City Center, ${destination}`,
        signatureDish: 'Wood-fired Pizza & Artisanal Drinks',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
        tags: ['Sunset View', 'Live Music', 'Desserts'],
      },
    ],
    shoppingMalls: [
      {
        id: `mall-${Date.now()}`,
        name: `${destination} Grand City Mall`,
        city: destination,
        rating: 4.6,
        address: `City Center Road, ${destination}`,
        image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80',
        highlights: ['Multiplex Cinema', 'Fashion Brands', 'Food Court', 'Handicraft Bazaars'],
        googleMapUrl: `https://maps.google.com/?q=${encodeURIComponent(destination + ' Malls')}`,
      },
    ],
    fuelStations: [
      {
        id: `fuel-${Date.now()}`,
        name: 'IndianOil Swagat Highway Service Plaza',
        brand: 'IndianOil',
        fuelTypes: ['Petrol (₹104.5/L)', 'XP95', 'Diesel (₹92.2/L)', 'EV Fast Charging 60kW'],
        petrolPricePerLitre: 104.5,
        dieselPricePerLitre: 92.2,
        address: `NH Highway Crossing near ${destination}`,
        distanceFromRoute: 'Directly on Highway',
        openHours: '24 Hours Open • Free Clean Restrooms',
        googleMapUrl: `https://maps.google.com/?q=${encodeURIComponent('IndianOil petrol pump near ' + destination)}`,
      },
    ],
    flights: [
      {
        id: `flight-${Date.now()}`,
        airline: 'IndiGo Express',
        airlineLogo: '✈️',
        flightNumber: '6E-412',
        departureTime: '07:30 AM',
        arrivalTime: '09:00 AM',
        duration: '1h 30m',
        type: 'Direct',
        priceINR: 3600,
        bookingUrl: 'https://www.goindigo.in',
      },
    ],
    weather: {
      destinationName: destination,
      currentTempC: 26,
      condition: 'Pleasant & Clear Skies',
      humidity: 58,
      windKmH: 14,
      packingTip: 'Light comfortable clothes, sunglasses, and good walking shoes!',
      forecast: [
        { day: 'Day 1', tempC: 26, condition: 'Sunny', icon: '☀️' },
        { day: 'Day 2', tempC: 27, condition: 'Partly Cloudy', icon: '⛅' },
        { day: 'Day 3', tempC: 25, condition: 'Clear Skies', icon: '🌤️' },
      ],
    },
    dailyItinerary: Array.from({ length: Math.min(daysCount, 5) }).map((_, i) => ({
      dayNumber: i + 1,
      title: i === 0 ? `Departure from ${origin} & Journey to ${destination}` : `Exploring ${destination} Highlights (Day ${i + 1})`,
      morning: i === 0 ? `Depart from ${origin}, enjoy scenic highway drive with morning breakfast stop.` : `Morning sightseeing at famous cultural landmarks and scenic spots in ${destination}.`,
      afternoon: `Lunch at highly-recommended local eatery and relaxation.`,
      evening: `Sunset views, local shopping for souvenirs, and dinner at top-rated restaurant.`,
      dayEstimatedCost: Math.round(totalCostEstimate / daysCount),
    })),
    blogStory: {
      title: `Unforgettable Journey: Exploring ${origin} to ${destination}`,
      excerpt: `A complete travel guide featuring scenic routes, fuel stations, handpicked hotels, and delightful local food.`,
      fullContent: `Traveling from ${origin} to ${destination} is an exhilarating road journey that showcases the vibrant beauty of the region.

### The Journey & Highway Stops
Plan to leave early in the morning to beat rush hour. Refuel at the 24-hour service plazas along the route for clean restrooms and snacks.

### Recommended Stays & Food
We recommend staying close to the city center for easy access to top sightseeing spots. Don't miss sampling the local signature dishes!`,
      coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      tags: ['Road Trip', 'Travel Guide', origin, destination],
    },
  };
}

// Vercel Serverless Function & Express compatible handler
export default async function handler(req, res) {
  // Always respond with JSON
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed. Please send a POST request with JSON body.'
    });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (err) {
        return res.status(400).json({
          success: false,
          error: 'Invalid JSON request body'
        });
      }
    }

    const {
      origin,
      destination,
      budget = 'Standard',
      daysCount = 3,
      travelersCount = 2,
      vehiclePreference = 'Rental SUV / 4x4 (Thar / Nexon EV)',
    } = body || {};

    if (!origin || !destination || typeof origin !== 'string' || typeof destination !== 'string' || !origin.trim() || !destination.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Both origin and destination are required to plan a trip.'
      });
    }

    // Check presets first for instant, rock-solid response
    const originKey = origin.toLowerCase().split(/[,(]/)[0].trim();
    const destKey = destination.toLowerCase().split(/[,(]/)[0].trim();
    const normalizedKey = `${originKey}-${destKey}`;

    if (PRESET_TRIPS[normalizedKey]) {
      const preset = PRESET_TRIPS[normalizedKey];
      return res.status(200).json({
        success: true,
        trip: {
          ...preset,
          daysCount: Number(daysCount) || preset.daysCount,
          travelersCount: Number(travelersCount) || preset.travelersCount,
          budget: budget || preset.budget,
        },
        source: 'preset'
      });
    }

    // Check Gemini API key
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '';
    if (!apiKey) {
      console.log('No GEMINI_API_KEY set; serving dynamic fallback itinerary.');
      const fallbackTrip = createDynamicFallbackTrip(
        origin,
        destination,
        budget,
        Number(daysCount) || 3,
        Number(travelersCount) || 2,
        vehiclePreference
      );
      return res.status(200).json({
        success: true,
        trip: fallbackTrip,
        source: 'fallback'
      });
    }

    // Initialize Google GenAI
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `You are an expert travel planner and blog editor. Generate a detailed, highly realistic travel recommendation & itinerary for a trip from "${origin}" to "${destination}".
Budget Level: ${budget}
Days Count: ${daysCount}
Travelers Count: ${travelersCount}
Preferred Vehicle/Transit: ${vehiclePreference}

CRITICAL: All monetary values (cost estimates, room rates, vehicle rates, food prices, flight ticket prices) MUST be in INDIAN RUPEES (₹ INR). For example, 1 USD = approx ₹85 INR.
- Hotels should be ₹1,500 to ₹18,000 per night depending on budget.
- Total trip cost should be realistic in Indian Rupees (e.g., ₹8,000 to ₹45,000+).
- Flight prices should be ₹2,500 to ₹12,000 per seat.
- Fuel rates (Petrol/Diesel) should be ₹95 to ₹110 per litre.

Provide a JSON object with:
1. distanceKm: estimated driving or transit distance in kilometers (number)
2. durationText: formatted drive/transit time string (e.g. "9 hours 30 mins")
3. totalCostEstimate: total cost in Indian Rupees (₹ INR) for ${travelersCount} people for ${daysCount} days (number)
4. routePolylineCoords: array of [latitude, longitude] pairs (approx 4-6 points from origin to destination)
5. waypoints: array of 5-6 key stops [{ name, lat, lng, type ('origin'|'destination'|'hotel'|'food'|'scenic'|'fuel'|'mall'), description }]
6. hotels: 3 realistic nearby hotel options [{ id, name, category, pricePerNight (in ₹ INR), rating, address, image, description, amenities: string[], googleMapUrl, bookingUrl }]
7. vehicles: 3 vehicle/transit choices including SUVs, Sedan, Royal Enfield Bike, Volvo Bus, or Flights [{ type, name, estimatedDailyRate (in ₹ INR), fuelEstimate (in ₹ INR), co2Estimate, image, highlights: string[] }]
8. foodSpots: 3 top on-the-way food spots & local dhabas/restaurants [{ name, placeName, cuisine, priceLevel ('₹'|'₹₹'|'₹₹₹'), rating, address, signatureDish, image, tags: string[] }]
9. shoppingMalls: 2 nearby shopping malls or famous bazaars [{ id, name, city, rating, address, image, highlights: string[], googleMapUrl }]
10. fuelStations: 2 petrol/diesel/EV fast charging stations along the route [{ id, name, brand ('IndianOil'|'BPCL'|'HPCL'|'Shell'|'EV Charge'), fuelTypes: string[], petrolPricePerLitre (in ₹ INR), dieselPricePerLitre (in ₹ INR), address, distanceFromRoute, openHours, googleMapUrl }]
11. flights: 2 flight options if available between origin & destination cities [{ id, airline, airlineLogo ('✈️'), flightNumber, departureTime, arrivalTime, duration, type ('Direct'|'1 Stop'), priceINR (in ₹ INR), bookingUrl }]
12. weather: destination weather info [{ destinationName, currentTempC, condition, humidity, windKmH, packingTip, forecast: [{ day, tempC, condition, icon }] }]
13. dailyItinerary: array of ${daysCount} days [{ dayNumber, title, morning, afternoon, evening, dayEstimatedCost (in ₹ INR) }]
14. blogStory: { title, excerpt, fullContent (markdown format with headings), coverImage, tags: string[] }`;

    const generateConfig = {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          distanceKm: { type: Type.NUMBER },
          durationText: { type: Type.STRING },
          totalCostEstimate: { type: Type.NUMBER },
          routePolylineCoords: {
            type: Type.ARRAY,
            items: {
              type: Type.ARRAY,
              items: { type: Type.NUMBER },
            },
          },
          waypoints: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                lat: { type: Type.NUMBER },
                lng: { type: Type.NUMBER },
                type: { type: Type.STRING },
                description: { type: Type.STRING },
              },
              required: ['name', 'lat', 'lng', 'type'],
            },
          },
          hotels: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                category: { type: Type.STRING },
                pricePerNight: { type: Type.NUMBER },
                rating: { type: Type.NUMBER },
                address: { type: Type.STRING },
                image: { type: Type.STRING },
                description: { type: Type.STRING },
                amenities: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                googleMapUrl: { type: Type.STRING },
                bookingUrl: { type: Type.STRING },
              },
              required: ['name', 'pricePerNight', 'rating', 'address'],
            },
          },
          vehicles: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING },
                name: { type: Type.STRING },
                estimatedDailyRate: { type: Type.NUMBER },
                fuelEstimate: { type: Type.NUMBER },
                co2Estimate: { type: Type.STRING },
                image: { type: Type.STRING },
                highlights: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
            },
          },
          foodSpots: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                placeName: { type: Type.STRING },
                cuisine: { type: Type.STRING },
                priceLevel: { type: Type.STRING },
                rating: { type: Type.NUMBER },
                address: { type: Type.STRING },
                signatureDish: { type: Type.STRING },
                image: { type: Type.STRING },
                tags: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
            },
          },
          shoppingMalls: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                city: { type: Type.STRING },
                rating: { type: Type.NUMBER },
                address: { type: Type.STRING },
                image: { type: Type.STRING },
                highlights: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                googleMapUrl: { type: Type.STRING },
              },
            },
          },
          fuelStations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                brand: { type: Type.STRING },
                fuelTypes: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                petrolPricePerLitre: { type: Type.NUMBER },
                dieselPricePerLitre: { type: Type.NUMBER },
                address: { type: Type.STRING },
                distanceFromRoute: { type: Type.STRING },
                openHours: { type: Type.STRING },
                googleMapUrl: { type: Type.STRING },
              },
            },
          },
          flights: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                airline: { type: Type.STRING },
                airlineLogo: { type: Type.STRING },
                flightNumber: { type: Type.STRING },
                departureTime: { type: Type.STRING },
                arrivalTime: { type: Type.STRING },
                duration: { type: Type.STRING },
                type: { type: Type.STRING },
                priceINR: { type: Type.NUMBER },
                bookingUrl: { type: Type.STRING },
              },
            },
          },
          weather: {
            type: Type.OBJECT,
            properties: {
              destinationName: { type: Type.STRING },
              currentTempC: { type: Type.NUMBER },
              condition: { type: Type.STRING },
              humidity: { type: Type.NUMBER },
              windKmH: { type: Type.NUMBER },
              packingTip: { type: Type.STRING },
              forecast: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    day: { type: Type.STRING },
                    tempC: { type: Type.NUMBER },
                    condition: { type: Type.STRING },
                    icon: { type: Type.STRING },
                  },
                },
              },
            },
          },
          dailyItinerary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                dayNumber: { type: Type.NUMBER },
                title: { type: Type.STRING },
                morning: { type: Type.STRING },
                afternoon: { type: Type.STRING },
                evening: { type: Type.STRING },
                dayEstimatedCost: { type: Type.NUMBER },
              },
            },
          },
          blogStory: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              excerpt: { type: Type.STRING },
              fullContent: { type: Type.STRING },
              coverImage: { type: Type.STRING },
              tags: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
            },
          },
        },
        required: [
          'distanceKm',
          'durationText',
          'totalCostEstimate',
          'waypoints',
          'hotels',
          'vehicles',
          'foodSpots',
          'weather',
          'dailyItinerary',
        ],
      },
    };

    let response = null;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: generateConfig,
      });
    } catch {
      try {
        response = await ai.models.generateContent({
          model: 'gemini-flash-latest',
          contents: prompt,
          config: generateConfig,
        });
      } catch {
        response = null;
      }
    }

    if (!response || !response.text) {
      const fallbackTrip = createDynamicFallbackTrip(
        origin,
        destination,
        budget,
        Number(daysCount) || 3,
        Number(travelersCount) || 2,
        vehiclePreference
      );
      return res.status(200).json({
        success: true,
        trip: fallbackTrip,
        source: 'fallback'
      });
    }

    const parsedData = JSON.parse(response.text || '{}');

    const tripResult = {
      id: `trip-${Date.now()}`,
      origin,
      destination,
      budget,
      travelersCount: Number(travelersCount) || 2,
      daysCount: Number(daysCount) || 3,
      distanceKm: parsedData.distanceKm || 350,
      durationText: parsedData.durationText || '5 hours 15 mins',
      totalCostEstimate: parsedData.totalCostEstimate || 15000,
      googleDirectionsUrl: `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&travelmode=driving`,
      createdAt: new Date().toISOString(),
      waypoints: parsedData.waypoints || [
        { name: origin, lat: 18.922, lng: 72.8347, type: 'origin', description: `Starting from ${origin}` },
        { name: destination, lat: 15.4989, lng: 73.8278, type: 'destination', description: `Arriving at ${destination}` },
      ],
      routePolylineCoords: parsedData.routePolylineCoords || [
        [18.922, 72.8347],
        [15.4989, 73.8278],
      ],
      hotels: parsedData.hotels || [],
      vehicles: parsedData.vehicles || [],
      foodSpots: parsedData.foodSpots || [],
      shoppingMalls: parsedData.shoppingMalls || [],
      fuelStations: parsedData.fuelStations || [],
      flights: parsedData.flights || [],
      weather: parsedData.weather || {
        destinationName: destination,
        currentTempC: 25,
        condition: 'Sunny & Pleasant',
        humidity: 60,
        windKmH: 12,
        packingTip: 'Light casual wear',
        forecast: [],
      },
      dailyItinerary: parsedData.dailyItinerary || [],
      blogStory: parsedData.blogStory || {
        title: `Journey from ${origin} to ${destination}`,
        excerpt: `A wonderful travel experience.`,
        fullContent: `Detailed journey narrative from ${origin} to ${destination}.`,
        coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        tags: ['Travel', destination],
      },
    };

    return res.status(200).json({ success: true, trip: tripResult, source: 'gemini' });
  } catch {
    // Fallback gracefully so user gets a real trip even if AI model has temporary outage
    try {
      const {
        origin = 'Mumbai, MH',
        destination = 'Goa (Panaji)',
        budget = 'Standard',
        daysCount = 3,
        travelersCount = 2,
        vehiclePreference = 'Rental Car',
      } = (typeof req.body === 'string' ? JSON.parse(req.body) : req.body) || {};

      const fallbackTrip = createDynamicFallbackTrip(
        origin,
        destination,
        budget,
        Number(daysCount) || 3,
        Number(travelersCount) || 2,
        vehiclePreference
      );

      return res.status(200).json({
        success: true,
        trip: fallbackTrip,
        source: 'fallback'
      });
    } catch {
      return res.status(200).json({
        success: true,
        trip: createDynamicFallbackTrip('Mumbai', 'Goa', 'Standard', 3, 2, 'Rental Car'),
        source: 'fallback'
      });
    }
  }
}
