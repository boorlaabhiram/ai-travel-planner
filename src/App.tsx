import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import logoImg from './assets/images/wanderlust_logo_1784986231866.jpg';
import { GoogleLoginModal } from './components/GoogleLoginModal';
import { TripPlannerForm } from './components/TripPlannerForm';
import { InteractiveMap } from './components/InteractiveMap';
import { HotelCard } from './components/HotelCard';
import { VehicleCard } from './components/VehicleCard';
import { FoodCard } from './components/FoodCard';
import { MallCard } from './components/MallCard';
import { FuelStationCard } from './components/FuelStationCard';
import { FlightCard } from './components/FlightCard';
import { WeatherCard } from './components/WeatherCard';
import { ItineraryTimeline } from './components/ItineraryTimeline';
import { BlogStoryCard } from './components/BlogStoryCard';
import { BlogReaderModal } from './components/BlogReaderModal';
import { NewBlogModal } from './components/NewBlogModal';
import { SavedTrips } from './components/SavedTrips';
import { DEFAULT_USER, PRESET_TRIPS, INITIAL_BLOG_POSTS } from './data/mockData';
import { BlogPost, GoogleUser, TripPlanResult, TripRequest } from './types';
import {
  Hotel,
  Car,
  Utensils,
  Sun,
  Calendar,
  BookOpen,
  Bookmark,
  Check,
  Navigation,
  PlusCircle,
  ShoppingBag,
  Fuel,
  Plane,
  ShieldCheck,
  Heart,
  Sparkles,
  AlertCircle,
  X,
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'planner' | 'blogs' | 'saved'>('planner');
  const [user, setUser] = useState<GoogleUser>(() => {
    const saved = localStorage.getItem('wanderlust_user');
    return saved ? JSON.parse(saved) : DEFAULT_USER;
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isNewBlogModalOpen, setIsNewBlogModalOpen] = useState(false);
  const [selectedBlogForReading, setSelectedBlogForReading] = useState<BlogPost | null>(null);

  // Active Trip State
  const [currentTrip, setCurrentTrip] = useState<TripPlanResult | null>(PRESET_TRIPS['miami-keywest']);
  const [isLoadingTrip, setIsLoadingTrip] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [tripError, setTripError] = useState<string | null>(null);
  const [activeRecTab, setActiveRecTab] = useState<
    'hotels' | 'vehicles' | 'food' | 'malls' | 'fuel' | 'flights' | 'weather' | 'itinerary' | 'blog'
  >('hotels');

  // Saved Trips Store
  const [savedTrips, setSavedTrips] = useState<TripPlanResult[]>(() => {
    const saved = localStorage.getItem('wanderlust_saved_trips');
    return saved ? JSON.parse(saved) : [PRESET_TRIPS['miami-keywest']];
  });

  // Community Blogs Store
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [blogFilter, setBlogFilter] = useState<string>('All');

  // Persistence
  useEffect(() => {
    localStorage.setItem('wanderlust_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('wanderlust_saved_trips', JSON.stringify(savedTrips));
  }, [savedTrips]);

  // Handle Google Login
  const handleGoogleLoginSuccess = (newUser: GoogleUser) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser({
      email: '',
      name: 'Guest User',
      picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest',
      isLoggedIn: false,
      loginMethod: 'demo_sso',
    });
  };

  // Generate Trip API Call
  const handleGenerateTrip = async (req: TripRequest) => {
    // Prevent duplicate requests
    if (isLoadingTrip) return;

    setIsLoadingTrip(true);
    setTripError(null);
    setLoadingStep('Analyzing route & Google Maps distances...');

    const stepTimers = [
      setTimeout(() => setLoadingStep('Fetching hotel availability & ratings...'), 800),
      setTimeout(() => setLoadingStep('Calculating vehicle fuel & rental rates...'), 1600),
      setTimeout(() => setLoadingStep('Checking destination weather forecast...'), 2400),
    ];

    try {
      const response = await fetch('/api/plan-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
      });

      const contentType = response.headers.get('content-type') || '';

      if (!response.ok) {
        let message = `Trip generation failed (${response.status})`;

        if (contentType.includes('application/json')) {
          const errorData = await response.json();
          message = errorData.error || message;
        } else {
          const text = await response.text();
          console.error('API returned non-JSON:', text);
        }

        throw new Error(message);
      }

      if (!contentType.includes('application/json')) {
        throw new Error('The trip API returned an invalid response.');
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Trip generation failed.');
      }

      if (data.trip) {
        setCurrentTrip(data.trip);
        setTripError(null);
      }
    } catch (err: any) {
      console.error('Trip generation error:', err);
      setTripError(err.message || 'Trip generation failed. Please try again.');
    } finally {
      stepTimers.forEach(clearTimeout);
      setIsLoadingTrip(false);
      setLoadingStep('');
    }
  };

  // Save / Bookmark Trip
  const handleToggleSaveTrip = (trip: TripPlanResult) => {
    const exists = savedTrips.some((t) => t.id === trip.id);
    if (exists) {
      setSavedTrips(savedTrips.filter((t) => t.id !== trip.id));
    } else {
      setSavedTrips([trip, ...savedTrips]);
    }
  };

  const isCurrentTripSaved = currentTrip ? savedTrips.some((t) => t.id === currentTrip.id) : false;

  // Publish New Blog Post
  const handlePublishPost = async (postData: Partial<BlogPost>) => {
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });
      const data = await res.json();
      if (data.success && data.post) {
        setBlogPosts([data.post, ...blogPosts]);
        setActiveTab('blogs');
      }
    } catch (err) {
      console.error('Publish blog error:', err);
    }
  };

  // Like Blog
  const handleLikePost = (id: string) => {
    setBlogPosts(
      blogPosts.map((p) => (p.id === id ? { ...p, likesCount: p.likesCount + 1 } : p))
    );
    if (selectedBlogForReading && selectedBlogForReading.id === id) {
      setSelectedBlogForReading({
        ...selectedBlogForReading,
        likesCount: selectedBlogForReading.likesCount + 1,
      });
    }
  };

  // Filtered Blog list
  const filteredBlogPosts = blogPosts.filter((post) => {
    if (blogFilter === 'All') return true;
    return post.tags.some((t) => t.toLowerCase().includes(blogFilter.toLowerCase()));
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onOpenGoogleLoginModal={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        savedTripsCount={savedTrips.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* TAB 1: ROUTE PLANNER ENGINE */}
        {activeTab === 'planner' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Input Form */}
            <TripPlannerForm
              onGenerateTrip={handleGenerateTrip}
              isLoading={isLoadingTrip}
              loadingStep={loadingStep}
            />

            {tripError && (
              <div className="bg-rose-50 border border-rose-200 text-rose-800 px-5 py-4 rounded-2xl flex items-center justify-between gap-3 text-sm font-medium animate-in fade-in">
                <div className="flex items-center gap-2.5">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>{tripError}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setTripError(null)}
                  className="text-rose-500 hover:text-rose-700 cursor-pointer p-1 rounded-lg hover:bg-rose-100 transition-colors"
                  aria-label="Dismiss error"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Trip Results Dashboard */}
            {currentTrip && (
              <div className="space-y-8">
                {/* Trip Summary Bar */}
                <div className="bg-gradient-to-r from-rose-600 via-amber-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Title & Route */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1">
                        <Navigation className="w-3.5 h-3.5" /> Recommended Itinerary
                      </span>
                      <span className="bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                        {currentTrip.budget} Budget
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl font-serif-title font-bold drop-shadow-sm">
                      {currentTrip.origin} to {currentTrip.destination}
                    </h2>
                    <p className="text-xs sm:text-sm text-rose-100 mt-1">
                      {currentTrip.daysCount} Days • {currentTrip.travelersCount} Travelers • Optimized Driving Route
                    </p>
                  </div>

                  {/* Summary Metrics & Actions */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center">
                      <p className="text-[10px] uppercase font-bold text-rose-100">Distance</p>
                      <p className="text-lg font-extrabold">{currentTrip.distanceKm} km</p>
                    </div>

                    <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center">
                      <p className="text-[10px] uppercase font-bold text-rose-100">Drive Time</p>
                      <p className="text-sm font-extrabold">{currentTrip.durationText}</p>
                    </div>

                    <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-center">
                      <p className="text-[10px] uppercase font-bold text-rose-100">Est. Total Cost</p>
                      <p className="text-lg font-extrabold text-amber-200">₹{currentTrip.totalCostEstimate.toLocaleString('en-IN')}</p>
                    </div>

                    {/* Bookmark Action */}
                    <button
                      onClick={() => handleToggleSaveTrip(currentTrip)}
                      className={`px-4 py-3 rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer ${
                        isCurrentTripSaved
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white text-rose-600 hover:bg-rose-50'
                      }`}
                    >
                      {isCurrentTripSaved ? (
                        <>
                          <Check className="w-4 h-4" /> Trip Bookmarked
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-4 h-4" /> Save Itinerary
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Interactive Map & Places Engine */}
                <InteractiveMap
                  waypoints={currentTrip.waypoints}
                  routePolylineCoords={currentTrip.routePolylineCoords}
                  googleDirectionsUrl={currentTrip.googleDirectionsUrl}
                  origin={currentTrip.origin}
                  destination={currentTrip.destination}
                  onWaypointsChange={(updated) => {
                    setCurrentTrip((prev) => prev ? { ...prev, waypoints: updated } : null);
                  }}
                />

                {/* Recommendations Navigation Tabs */}
                <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  <button
                    onClick={() => setActiveRecTab('hotels')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                      activeRecTab === 'hotels'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Hotel className="w-4 h-4" />
                    Hotels ({currentTrip.hotels.length})
                  </button>

                  <button
                    onClick={() => setActiveRecTab('vehicles')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                      activeRecTab === 'vehicles'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Car className="w-4 h-4" />
                    Vehicles ({currentTrip.vehicles.length})
                  </button>

                  <button
                    onClick={() => setActiveRecTab('food')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                      activeRecTab === 'food'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Utensils className="w-4 h-4" />
                    Food Spots ({currentTrip.foodSpots.length})
                  </button>

                  <button
                    onClick={() => setActiveRecTab('malls')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                      activeRecTab === 'malls'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4 text-purple-300" />
                    Malls ({currentTrip.shoppingMalls ? currentTrip.shoppingMalls.length : 0})
                  </button>

                  <button
                    onClick={() => setActiveRecTab('fuel')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                      activeRecTab === 'fuel'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Fuel className="w-4 h-4 text-emerald-300" />
                    Fuel & EV ({currentTrip.fuelStations ? currentTrip.fuelStations.length : 0})
                  </button>

                  <button
                    onClick={() => setActiveRecTab('flights')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                      activeRecTab === 'flights'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Plane className="w-4 h-4 text-sky-300" />
                    Flights ({currentTrip.flights ? currentTrip.flights.length : 0})
                  </button>

                  <button
                    onClick={() => setActiveRecTab('weather')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                      activeRecTab === 'weather'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                    Weather
                  </button>

                  <button
                    onClick={() => setActiveRecTab('itinerary')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                      activeRecTab === 'itinerary'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    Itinerary
                  </button>

                  <button
                    onClick={() => setActiveRecTab('blog')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                      activeRecTab === 'blog'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 text-amber-300" />
                    AI Blog
                  </button>
                </div>

                {/* Tab Content Display */}
                <div>
                  {/* HOTELS */}
                  {activeRecTab === 'hotels' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-serif-title font-bold text-slate-900">
                          Handpicked Hotel Stays in {currentTrip.destination}
                        </h3>
                        <span className="text-xs text-slate-500 font-semibold">
                          Matching {currentTrip.budget} Budget Level (in ₹)
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {currentTrip.hotels.map((hotel) => (
                          <HotelCard key={hotel.id} hotel={hotel} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* VEHICLES */}
                  {activeRecTab === 'vehicles' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-serif-title font-bold text-slate-900">
                          Suggested Transport & Fuel Breakdown
                        </h3>
                        <span className="text-xs text-slate-500 font-semibold">
                          Distance: {currentTrip.distanceKm} km
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {currentTrip.vehicles.map((v, idx) => (
                          <VehicleCard key={idx} vehicle={v} distanceKm={currentTrip.distanceKm} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FOOD SPOTS */}
                  {activeRecTab === 'food' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-serif-title font-bold text-slate-900">
                          Top Culinary & Dining Recommendations
                        </h3>
                        <span className="text-xs text-slate-500 font-semibold">
                          Local Specialties & Top Rated Spots
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {currentTrip.foodSpots.map((food, idx) => (
                          <FoodCard key={idx} food={food} />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* MALLS */}
                  {activeRecTab === 'malls' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-serif-title font-bold text-slate-900">
                          Shopping Malls & Retail Hubs near {currentTrip.destination}
                        </h3>
                        <span className="text-xs text-slate-500 font-semibold">
                          Multiplex, Fashion & Local Bazaars
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {currentTrip.shoppingMalls && currentTrip.shoppingMalls.length > 0 ? (
                          currentTrip.shoppingMalls.map((mall) => (
                            <MallCard key={mall.id} mall={mall} />
                          ))
                        ) : (
                          <p className="text-sm text-slate-500">No shopping malls listed for this location.</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* FUEL STATIONS */}
                  {activeRecTab === 'fuel' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-serif-title font-bold text-slate-900">
                          Nearby Petrol, Diesel & EV Fast Chargers
                        </h3>
                        <span className="text-xs text-slate-500 font-semibold">
                          IndianOil, Bharat Petroleum, HPCL & EV Power
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {currentTrip.fuelStations && currentTrip.fuelStations.length > 0 ? (
                          currentTrip.fuelStations.map((station) => (
                            <FuelStationCard key={station.id} station={station} />
                          ))
                        ) : (
                          <p className="text-sm text-slate-500">No fuel stations listed for this location.</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* FLIGHTS */}
                  {activeRecTab === 'flights' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-serif-title font-bold text-slate-900">
                          Available Flight Connections (in ₹)
                        </h3>
                        <span className="text-xs text-slate-500 font-semibold">
                          IndiGo, Air India, SpiceJet & Vistara options
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {currentTrip.flights && currentTrip.flights.length > 0 ? (
                          currentTrip.flights.map((flight) => (
                            <FlightCard key={flight.id} flight={flight} />
                          ))
                        ) : (
                          <p className="text-sm text-slate-500">No direct flight routes available.</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* WEATHER */}
                  {activeRecTab === 'weather' && (
                    <WeatherCard weather={currentTrip.weather} />
                  )}

                  {/* ITINERARY */}
                  {activeRecTab === 'itinerary' && (
                    <ItineraryTimeline days={currentTrip.dailyItinerary} />
                  )}

                  {/* AI BLOG STORY */}
                  {activeRecTab === 'blog' && currentTrip.blogStory && (
                    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                        <div>
                          <span className="text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 inline-flex items-center gap-1 mb-2">
                            <Sparkles className="w-3.5 h-3.5" /> AI Generated Travel Journal
                          </span>
                          <h3 className="text-2xl font-serif-title font-bold text-slate-900">
                            {currentTrip.blogStory.title}
                          </h3>
                        </div>

                        <button
                          onClick={() => setIsNewBlogModalOpen(true)}
                          className="bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-md transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto"
                        >
                          <PlusCircle className="w-4 h-4" /> Publish Story to Community Feed
                        </button>
                      </div>

                      <p className="text-slate-600 text-sm italic border-l-4 border-rose-500 pl-4 py-1">
                        "{currentTrip.blogStory.excerpt}"
                      </p>

                      <div className="prose prose-slate max-w-none text-slate-800 text-sm leading-relaxed space-y-4">
                        {currentTrip.blogStory.fullContent.split('\n\n').map((para, idx) => (
                          <p key={idx}>{para}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TRAVEL BLOGS FEED */}
        {activeTab === 'blogs' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Header & Write CTA */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider bg-rose-500/20 px-3 py-1 rounded-full border border-rose-500/30">
                  Community Travel Stories
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif-title font-bold mt-2">
                  Wanderlust Travel Magazine & Journals
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                  Real stories, road trip logs, cost breakdowns, and insider guidebooks from travelers worldwide.
                </p>
              </div>

              <button
                onClick={() => setIsNewBlogModalOpen(true)}
                className="bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-lg transition-all hover:scale-105 cursor-pointer flex items-center gap-2 self-start md:self-auto shrink-0"
              >
                <PlusCircle className="w-4 h-4" /> Write Travel Blog
              </button>
            </div>

            {/* Filter Tags */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {['All', 'Road Trip', 'Beach', 'Europe', 'Asia', 'Luxury', 'Budget Hacks'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setBlogFilter(filter)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    blogFilter === filter
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Blogs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogPosts.map((post) => (
                <BlogStoryCard
                  key={post.id}
                  post={post}
                  onReadPost={(p) => setSelectedBlogForReading(p)}
                  onLikePost={handleLikePost}
                />
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SAVED TRIPS & BOOKMARKS */}
        {activeTab === 'saved' && (
          <div className="animate-in fade-in duration-300">
            <SavedTrips
              savedTrips={savedTrips}
              onSelectTrip={(t) => {
                setCurrentTrip(t);
                setActiveTab('planner');
              }}
              onRemoveTrip={(id) => setSavedTrips(savedTrips.filter((t) => t.id !== id))}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-white border-t border-slate-200 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-rose-500 p-0.5 shadow-xs overflow-hidden">
              <img src={logoImg} alt="WL Wanderlust Logo" className="w-full h-full object-cover rounded-[10px]" referrerPolicy="no-referrer" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-sm">WL Wanderlust Travel</span>
              <p className="text-[11px] text-slate-500">Smart Route Planner • Hotels • Vehicles • Food • Fuel • Flights • Malls • ₹ INR</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-600 font-semibold text-[11px]">
            <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified
            </span>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Copy Rights Reserved</span>
            <span>•</span>
            <span className="text-slate-800 font-bold bg-slate-100 px-2.5 py-1 rounded-full">
              Abhiram Boorla (boorlaabhiram2@gmail.com)
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <GoogleLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentUser={user}
        onLoginSuccess={handleGoogleLoginSuccess}
      />

      <BlogReaderModal
        post={selectedBlogForReading}
        onClose={() => setSelectedBlogForReading(null)}
        onLikePost={handleLikePost}
      />

      <NewBlogModal
        isOpen={isNewBlogModalOpen}
        onClose={() => setIsNewBlogModalOpen(false)}
        user={user}
        currentTrip={currentTrip}
        onPublishPost={handlePublishPost}
      />
    </div>
  );
}
