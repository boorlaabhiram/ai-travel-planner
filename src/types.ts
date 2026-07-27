export interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  isLoggedIn: boolean;
  googleId?: string;
  loginMethod: 'google_sso' | 'demo_sso';
}

export type BudgetLevel = 'Economy' | 'Standard' | 'Luxury';

export interface TripRequest {
  origin: string;
  destination: string;
  budget: BudgetLevel;
  startDate?: string;
  daysCount: number;
  travelersCount: number;
  vehiclePreference?: string;
  interests?: string[];
}

export interface HotelOption {
  id: string;
  name: string;
  category: string;
  pricePerNight: number; // in INR ₹
  rating: number;
  address: string;
  image: string;
  description: string;
  amenities: string[];
  googleMapUrl: string;
  bookingUrl: string;
}

export interface VehicleOption {
  type: string;
  name: string;
  estimatedDailyRate: number; // in INR ₹
  fuelEstimate: number; // in INR ₹
  co2Estimate: string;
  image: string;
  highlights: string[];
}

export interface FoodOption {
  name: string;
  placeName: string;
  cuisine: string;
  priceLevel: string;
  rating: number;
  address: string;
  signatureDish: string;
  image: string;
  tags: string[];
}

export interface ShoppingMall {
  id: string;
  name: string;
  city: string;
  rating: number;
  address: string;
  image: string;
  highlights: string[];
  googleMapUrl: string;
}

export interface FuelStation {
  id: string;
  name: string;
  brand: string; // IndianOil, HPCL, BPCL, Shell, Reliance, EV Charge
  fuelTypes: string[]; // Petrol, Diesel, CNG, EV Fast Charge
  petrolPricePerLitre: number; // in INR ₹
  dieselPricePerLitre: number; // in INR ₹
  address: string;
  distanceFromRoute: string;
  openHours: string;
  googleMapUrl: string;
}

export interface FlightOption {
  id: string;
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  type: 'Direct' | '1 Stop';
  priceINR: number; // in INR ₹
  bookingUrl: string;
}

export interface DailyForecast {
  day: string;
  tempC: number;
  condition: string;
  icon: string;
}

export interface WeatherInfo {
  destinationName: string;
  currentTempC: number;
  condition: string;
  humidity: number;
  windKmH: number;
  packingTip: string;
  forecast: DailyForecast[];
}

export interface RouteWaypoint {
  name: string;
  lat: number;
  lng: number;
  type: 'origin' | 'destination' | 'hotel' | 'food' | 'scenic' | 'fuel' | 'mall';
  description?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  dayEstimatedCost: number; // in INR ₹
}

export interface BlogStory {
  title: string;
  excerpt: string;
  fullContent: string;
  coverImage: string;
  tags: string[];
}

export interface TripPlanResult {
  id: string;
  origin: string;
  destination: string;
  budget: BudgetLevel;
  travelersCount: number;
  daysCount: number;
  distanceKm: number;
  durationText: string;
  totalCostEstimate: number; // in INR ₹
  waypoints: RouteWaypoint[];
  routePolylineCoords: [number, number][];
  hotels: HotelOption[];
  vehicles: VehicleOption[];
  foodSpots: FoodOption[];
  shoppingMalls: ShoppingMall[];
  fuelStations: FuelStation[];
  flights: FlightOption[];
  weather: WeatherInfo;
  dailyItinerary: ItineraryDay[];
  blogStory: BlogStory;
  googleDirectionsUrl: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  authorName: string;
  authorEmail: string;
  authorAvatar: string;
  date: string;
  coverImage: string;
  excerpt: string;
  content: string;
  origin: string;
  destination: string;
  likesCount: number;
  commentsCount: number;
  tags: string[];
  featured?: boolean;
  tripPlanSummary?: {
    distanceKm: number;
    durationText: string;
    totalCostEstimate: number; // in INR ₹
    hotelName: string;
    topFood: string;
  };
}

export interface Comment {
  id: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  createdAt: string;
}
