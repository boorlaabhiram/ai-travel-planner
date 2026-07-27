import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { PRESET_TRIPS, INITIAL_BLOG_POSTS } from './src/data/mockData.js';
import { BlogPost, TripPlanResult } from './src/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
}) : null;

// In-memory blog store initialized with rich posts
let blogPostsStore: BlogPost[] = [...INITIAL_BLOG_POSTS];

// API Routes FIRST

// 1. Plan Trip API Endpoint
app.post('/api/plan-trip', async (req, res) => {
  try {
    const { origin = 'Miami, FL', destination = 'Key West, FL', budget = 'Standard', daysCount = 3, travelersCount = 2, vehiclePreference = 'Rental Car' } = req.body;

    const normalizedKey = `${origin.toLowerCase().split(',')[0]}-${destination.toLowerCase().split(',')[0]}`;
    if (PRESET_TRIPS[normalizedKey]) {
      return res.json({ success: true, trip: PRESET_TRIPS[normalizedKey], source: 'preset' });
    }

    if (!ai) {
      // Fallback preset generator if Gemini key is missing
      const fallbackTrip: TripPlanResult = {
        id: `trip-${Date.now()}`,
        origin,
        destination,
        budget: budget as any,
        travelersCount,
        daysCount,
        distanceKm: 320,
        durationText: '4 hours 15 mins',
        totalCostEstimate: budget === 'Luxury' ? 38000 : budget === 'Economy' ? 8500 : 16500,
        googleDirectionsUrl: `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`,
        createdAt: new Date().toISOString(),
        waypoints: [
          { name: origin, lat: 18.922, lng: 72.8347, type: 'origin', description: `Starting from ${origin}` },
          { name: 'Swagat Highway Fuel & Plaza', lat: 17.5323, lng: 73.518, type: 'fuel', description: 'Petrol, Diesel & EV Fast Charging' },
          { name: 'Konkan Highway Dhaba', lat: 16.9902, lng: 73.312, type: 'food', description: 'Delicious hot meals & coffee' },
          { name: 'City Central Mall', lat: 15.5342, lng: 73.8242, type: 'mall', description: 'Shopping mall & multiplex' },
          { name: destination, lat: 15.4989, lng: 73.8278, type: 'destination', description: `Arriving in ${destination}` },
        ],
        routePolylineCoords: [
          [18.922, 72.8347],
          [17.5323, 73.518],
          [16.9902, 73.312],
          [15.5342, 73.8242],
          [15.4989, 73.8278],
        ],
        hotels: [
          {
            id: 'h1',
            name: `${destination} Oceanfront Luxury Resort`,
            category: '5-Star Resort',
            pricePerNight: budget === 'Luxury' ? 14500 : 6500,
            rating: 4.8,
            address: `Main Boulevard, ${destination}`,
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
            description: `Top-rated stay in central ${destination} featuring swimming pool, fine dining, and spa.`,
            amenities: ['Pool', 'Free Wi-Fi', 'Breakfast Included', 'Spa'],
            googleMapUrl: `https://maps.google.com/?q=${encodeURIComponent(destination + ' Hotels')}`,
            bookingUrl: 'https://www.booking.com',
          },
        ],
        vehicles: [
          {
            type: vehiclePreference || 'SUV / 4x4',
            name: 'Mahindra Thar 4x4 / Tata Nexon EV',
            estimatedDailyRate: 3200,
            fuelEstimate: 2400,
            co2Estimate: 'Low Emission',
            image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
            highlights: ['Spacious', 'GPS Navigation', 'High Ground Clearance'],
          },
        ],
        foodSpots: [
          {
            name: `${destination} Highway Tavern`,
            placeName: 'The Culinary Haven',
            cuisine: 'Local Specialties',
            priceLevel: '₹₹',
            rating: 4.7,
            address: `Central Road, ${destination}`,
            signatureDish: 'House Special Thali & Grill',
            image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
            tags: ['Popular', 'Great Ambiance'],
          },
        ],
        shoppingMalls: [
          {
            id: 'm1',
            name: `${destination} Grand Central Mall`,
            city: destination,
            rating: 4.6,
            address: `Main City Center, ${destination}`,
            image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80',
            highlights: ['Multiplex Cinema', 'Fashion Brands', 'Food Court', 'Handicraft Bazaars'],
            googleMapUrl: `https://maps.google.com/?q=${encodeURIComponent(destination + ' Malls')}`,
          },
        ],
        fuelStations: [
          {
            id: 'f1',
            name: 'IndianOil Swagat Highway Service Plaza',
            brand: 'IndianOil (IOCL)',
            fuelTypes: ['Petrol', 'XP95', 'Diesel', 'EV Fast Charging 60kW'],
            petrolPricePerLitre: 104.5,
            dieselPricePerLitre: 92.2,
            address: `Highway Crossing near ${destination}`,
            distanceFromRoute: 'Directly on Highway',
            openHours: '24 Hours Open',
            googleMapUrl: `https://maps.google.com/?q=${encodeURIComponent('IndianOil petrol pump near ' + destination)}`,
          },
        ],
        flights: [
          {
            id: 'fl1',
            airline: 'IndiGo Express',
            airlineLogo: '✈️',
            flightNumber: '6E-402',
            departureTime: '08:00 AM',
            arrivalTime: '09:25 AM',
            duration: '1h 25m',
            type: 'Direct',
            priceINR: 3800,
            bookingUrl: 'https://www.goindigo.in',
          },
        ],
        weather: {
          destinationName: destination,
          currentTempC: 25,
          condition: 'Partly Sunny & Pleasant',
          humidity: 60,
          windKmH: 14,
          packingTip: 'Pack versatile clothing, sunglasses, and comfortable walking shoes!',
          forecast: [
            { day: 'Day 1', tempC: 25, condition: 'Sunny', icon: '☀️' },
            { day: 'Day 2', tempC: 26, condition: 'Partly Cloudy', icon: '⛅' },
            { day: 'Day 3', tempC: 24, condition: 'Clear Sky', icon: '🌤️' },
          ],
        },
        dailyItinerary: [
          {
            dayNumber: 1,
            title: `Arrival in ${destination} & Exploration`,
            morning: `Depart from ${origin}, enjoy scenic driving routes.`,
            afternoon: `Check into hotel in ${destination}, stroll through local landmarks.`,
            evening: `Welcome dinner at top recommended local tavern.`,
            dayEstimatedCost: 180,
          },
        ],
        blogStory: {
          title: `Exploring the Journey: From ${origin} to ${destination}`,
          excerpt: `A memorable trip filled with scenic routes, delicious local food, and comfortable stays.`,
          fullContent: `Our road trip from ${origin} to ${destination} was an unforgettable adventure. The drive offered stunning views and great stops along the way.`,
          coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
          tags: ['Road Trip', 'Travel Guide', destination],
        },
      };
      return res.json({ success: true, trip: fallbackTrip, source: 'fallback' });
    }

    // Call Gemini 3.6 Flash for intelligent structured travel planning
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

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
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
                  amenities: { type: Type.ARRAY, items: { type: Type.STRING } },
                  googleMapUrl: { type: Type.STRING },
                  bookingUrl: { type: Type.STRING },
                },
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
                  highlights: { type: Type.ARRAY, items: { type: Type.STRING } },
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
                  tags: { type: Type.ARRAY, items: { type: Type.STRING } },
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
                  highlights: { type: Type.ARRAY, items: { type: Type.STRING } },
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
                  fuelTypes: { type: Type.ARRAY, items: { type: Type.STRING } },
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
                tags: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
            },
          },
        },
      },
    });

    const parsedData = JSON.parse(response.text || '{}');

    // Ensure image fallbacks
    const fallbackImages = [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    ];

    if (parsedData.hotels) {
      parsedData.hotels = parsedData.hotels.map((h: any, idx: number) => ({
        ...h,
        image: h.image && h.image.startsWith('http') ? h.image : fallbackImages[idx % fallbackImages.length],
        googleMapUrl: h.googleMapUrl || `https://maps.google.com/?q=${encodeURIComponent(h.name + ' ' + destination)}`,
        bookingUrl: h.bookingUrl || 'https://www.booking.com',
      }));
    }

    const tripResult: TripPlanResult = {
      id: `gemini-trip-${Date.now()}`,
      origin,
      destination,
      budget: budget as any,
      travelersCount,
      daysCount,
      distanceKm: parsedData.distanceKm || 300,
      durationText: parsedData.durationText || '4 hours',
      totalCostEstimate: parsedData.totalCostEstimate || 500,
      googleDirectionsUrl: `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}`,
      createdAt: new Date().toISOString(),
      waypoints: parsedData.waypoints || [
        { name: origin, lat: 25.76, lng: -80.19, type: 'origin' },
        { name: destination, lat: 24.55, lng: -81.80, type: 'destination' },
      ],
      routePolylineCoords: (parsedData.routePolylineCoords as [number, number][]) || [
        [25.76, -80.19],
        [24.55, -81.80],
      ],
      hotels: parsedData.hotels || [],
      vehicles: parsedData.vehicles || [],
      foodSpots: parsedData.foodSpots || [],
      shoppingMalls: parsedData.shoppingMalls || [
        {
          id: 'm1',
          name: `${destination} City Central Mall`,
          city: destination,
          rating: 4.6,
          address: `Main City Center, ${destination}`,
          image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80',
          highlights: ['Multiplex Cinema', 'Global Brands', 'Food Court', 'Handicraft Bazaars'],
          googleMapUrl: `https://maps.google.com/?q=${encodeURIComponent(destination + ' Malls')}`,
        },
      ],
      fuelStations: parsedData.fuelStations || [
        {
          id: 'f1',
          name: 'IndianOil Swagat Highway Service Plaza',
          brand: 'IndianOil (IOCL)',
          fuelTypes: ['Petrol', 'XP95', 'Diesel', 'EV Fast Charging 60kW'],
          petrolPricePerLitre: 104.5,
          dieselPricePerLitre: 92.2,
          address: `Highway Crossing near ${destination}`,
          distanceFromRoute: 'Directly on Highway',
          openHours: '24 Hours Open',
          googleMapUrl: `https://maps.google.com/?q=${encodeURIComponent('Petrol pump near ' + destination)}`,
        },
      ],
      flights: parsedData.flights || [
        {
          id: 'fl1',
          airline: 'IndiGo Express',
          airlineLogo: '✈️',
          flightNumber: '6E-402',
          departureTime: '08:00 AM',
          arrivalTime: '09:25 AM',
          duration: '1h 25m',
          type: 'Direct',
          priceINR: 3800,
          bookingUrl: 'https://www.goindigo.in',
        },
      ],
      weather: parsedData.weather || {
        destinationName: destination,
        currentTempC: 24,
        condition: 'Sunny',
        humidity: 55,
        windKmH: 12,
        packingTip: 'Sunscreen and light jacket',
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

    res.json({ success: true, trip: tripResult, source: 'gemini' });
  } catch (error: any) {
    console.error('Error generating trip with Gemini:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to generate trip recommendation' });
  }
});

// 2. Fetch Blog Posts API Endpoint
app.get('/api/blogs', (_req, res) => {
  res.json({ success: true, blogs: blogPostsStore });
});

// 3. Publish New Blog Post API Endpoint
app.post('/api/blogs', (req, res) => {
  const { title, excerpt, content, coverImage, origin, destination, authorName, authorEmail, authorAvatar, tags } = req.body;

  const newPost: BlogPost = {
    id: `blog-${Date.now()}`,
    title: title || 'My Unforgettable Travel Story',
    authorName: authorName || 'Abhiram Boorla',
    authorEmail: authorEmail || 'boorlaabhiram2@gmail.com',
    authorAvatar: authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    coverImage: coverImage || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    excerpt: excerpt || 'An exciting trip experience shared with the travel community.',
    content: content || 'It was a beautiful trip filled with amazing memories!',
    origin: origin || 'Start',
    destination: destination || 'Finish',
    likesCount: 1,
    commentsCount: 0,
    tags: tags && tags.length ? tags : ['Road Trip', 'Adventure'],
    featured: false,
  };

  blogPostsStore.unshift(newPost);
  res.json({ success: true, post: newPost });
});

// 4. Like / Comment on Blog Endpoint
app.post('/api/blogs/:id/like', (req, res) => {
  const { id } = req.params;
  const post = blogPostsStore.find((b) => b.id === id);
  if (post) {
    post.likesCount += 1;
    return res.json({ success: true, likesCount: post.likesCount });
  }
  res.status(404).json({ success: false, message: 'Post not found' });
});

// Serve Vite dev middleware or production static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Wanderlust Travel App server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
