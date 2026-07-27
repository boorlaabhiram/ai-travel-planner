import React, { useState } from 'react';
import { MapPin, Navigation, IndianRupee, Calendar, Users, Car, Sparkles, Compass } from 'lucide-react';
import { BudgetLevel, TripRequest } from '../types';

interface TripPlannerFormProps {
  onGenerateTrip: (req: TripRequest) => void;
  isLoading: boolean;
  loadingStep: string;
}

export const TripPlannerForm: React.FC<TripPlannerFormProps> = ({
  onGenerateTrip,
  isLoading,
  loadingStep,
}) => {
  const [origin, setOrigin] = useState('Mumbai, MH');
  const [destination, setDestination] = useState('Goa (Panaji)');
  const [budget, setBudget] = useState<BudgetLevel>('Standard');
  const [daysCount, setDaysCount] = useState<number>(3);
  const [travelersCount, setTravelersCount] = useState<number>(2);
  const [vehiclePreference, setVehiclePreference] = useState('Rental SUV / 4x4 (Thar / Nexon EV)');

  const presetRoutes = [
    { label: '🌴 Mumbai → Goa Beach Highway', origin: 'Mumbai, MH', destination: 'Goa (Panaji)', budget: 'Standard' as BudgetLevel },
    { label: '⛰️ Delhi → Manali & Solang Valley', origin: 'Delhi, NCR', destination: 'Manali, HP', budget: 'Standard' as BudgetLevel },
    { label: '☕ Bengaluru → Coorg Coffee Hills', origin: 'Bengaluru, KA', destination: 'Coorg (Madikeri)', budget: 'Economy' as BudgetLevel },
    { label: '🌊 Hyderabad → Visakhapatnam Vizag', origin: 'Hyderabad, TS', destination: 'Visakhapatnam, AP', budget: 'Standard' as BudgetLevel },
    { label: '🏰 Jaipur → Udaipur Royal Palace Drive', origin: 'Jaipur, RJ', destination: 'Udaipur, RJ', budget: 'Luxury' as BudgetLevel },
    { label: '🗼 Foreign: Paris → Nice Riviera', origin: 'Paris, France', destination: 'Nice, France', budget: 'Luxury' as BudgetLevel },
    { label: '🌸 Foreign: Tokyo → Kyoto Shinkansen', origin: 'Tokyo, Japan', destination: 'Kyoto, Japan', budget: 'Standard' as BudgetLevel },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin.trim() || !destination.trim()) return;
    onGenerateTrip({
      origin: origin.trim(),
      destination: destination.trim(),
      budget,
      daysCount,
      travelersCount,
      vehiclePreference,
    });
  };

  const applyPreset = (preset: typeof presetRoutes[0]) => {
    setOrigin(preset.origin);
    setDestination(preset.destination);
    setBudget(preset.budget);
    onGenerateTrip({
      origin: preset.origin,
      destination: preset.destination,
      budget: preset.budget,
      daysCount,
      travelersCount,
      vehiclePreference,
    });
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/90 relative overflow-hidden">
      {/* Background colorful glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-rose-500/20 via-amber-500/15 to-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-gradient-to-tr from-sky-500/20 via-emerald-500/15 to-purple-500/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> AI Earth Route Engine
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              ₹ INR Currency Standard
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Plan Travel Route & Discover Hotels, Food, Fuel & Flights
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            AI recommends nearby Hotels 🏨, on-the-way Food Spots 🍕, Petrol & Diesel stations ⛽, Shopping Malls 🛍️, Flights ✈️, & Google Maps navigation in Indian Rupees (₹)!
          </p>
        </div>
      </div>

      {/* Preset Route Chips */}
      <div className="mb-6 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80">
        <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
          <Compass className="w-4 h-4 text-rose-500 animate-spin-slow" /> Express Route Presets (1-Click Instant Load):
        </p>
        <div className="flex flex-wrap gap-2">
          {presetRoutes.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => applyPreset(p)}
              disabled={isLoading}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-gradient-to-r hover:from-rose-50 hover:to-amber-50 hover:text-rose-700 hover:border-rose-300 text-slate-800 border border-slate-200 shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Origin & Destination Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-extrabold text-slate-800 uppercase mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Starting Location (Origin)
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="e.g. Mumbai, Delhi, Bengaluru, Hyderabad"
                className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 bg-white shadow-2xs"
              />
              <MapPin className="w-4 h-4 text-emerald-500 absolute left-3.5 top-4" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-800 uppercase mb-1 flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5 text-rose-600" /> Destination
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Goa, Manali, Coorg, Paris, Tokyo"
                className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-slate-300 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 bg-white shadow-2xs"
              />
              <Navigation className="w-4 h-4 text-rose-500 absolute left-3.5 top-4" />
            </div>
          </div>
        </div>

        {/* Budget, Days, Travelers, Vehicle Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {/* Budget Level (Rupees) */}
          <div>
            <label className="block text-xs font-extrabold text-slate-800 uppercase mb-1 flex items-center gap-1">
              <IndianRupee className="w-3.5 h-3.5 text-amber-600" /> Budget Range (₹)
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value as BudgetLevel)}
              className="w-full px-3 py-3.5 rounded-2xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 cursor-pointer shadow-2xs"
            >
              <option value="Economy">Economy (₹ Budget - Dhabas & Hostels)</option>
              <option value="Standard">Standard (₹₹ Balanced - 3-4★ Hotels & SUV)</option>
              <option value="Luxury">Luxury (₹₹₹ High End - 5★ Taj & Flight)</option>
            </select>
          </div>

          {/* Days Count */}
          <div>
            <label className="block text-xs font-extrabold text-slate-800 uppercase mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-sky-600" /> Trip Duration
            </label>
            <select
              value={daysCount}
              onChange={(e) => setDaysCount(Number(e.target.value))}
              className="w-full px-3 py-3.5 rounded-2xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 cursor-pointer shadow-2xs"
            >
              <option value={1}>1 Day Express Trip</option>
              <option value={2}>2 Days Weekend Getaway</option>
              <option value={3}>3 Days Classic Drive</option>
              <option value={5}>5 Days Extended Vacation</option>
              <option value={7}>7 Days Complete Explorer</option>
            </select>
          </div>

          {/* Travelers Count */}
          <div>
            <label className="block text-xs font-extrabold text-slate-800 uppercase mb-1 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-purple-600" /> Travelers
            </label>
            <select
              value={travelersCount}
              onChange={(e) => setTravelersCount(Number(e.target.value))}
              className="w-full px-3 py-3.5 rounded-2xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 cursor-pointer shadow-2xs"
            >
              <option value={1}>Solo Explorer (1 Person)</option>
              <option value={2}>Couple / 2 Travelers</option>
              <option value={4}>Family / Group of 4</option>
              <option value={6}>Large Friends Group (6+)</option>
            </select>
          </div>

          {/* Expanded Vehicle Preference */}
          <div>
            <label className="block text-xs font-extrabold text-slate-800 uppercase mb-1 flex items-center gap-1">
              <Car className="w-3.5 h-3.5 text-indigo-600" /> Vehicle / Transit
            </label>
            <select
              value={vehiclePreference}
              onChange={(e) => setVehiclePreference(e.target.value)}
              className="w-full px-3 py-3.5 rounded-2xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/30 focus:border-rose-500 cursor-pointer shadow-2xs"
            >
              <option value="Rental SUV / 4x4 (Thar / Nexon EV)">🚘 SUV / 4x4 (Thar / Nexon EV)</option>
              <option value="Sedan / Hatchback (Honda City / Swift)">🚗 Sedan / Hatchback (City / Swift)</option>
              <option value="Royal Enfield Bike Expedition">🏍️ Bike Expedition (Royal Enfield)</option>
              <option value="Luxury Car / Convertible">🏎️ Luxury Car / Convertible</option>
              <option value="Sleeper AC Volvo Bus">🚌 Sleeper AC Volvo Bus</option>
              <option value="Vande Bharat / Express Train">🚆 Express / Vande Bharat Train</option>
              <option value="Flight & Airport Transit">✈️ Direct Flight</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-amber-500 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-black text-base sm:text-lg shadow-xl shadow-rose-500/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-80"
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>{loadingStep || 'Generating Itinerary & Route Map...'}</span>
              </div>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Generate Route, Hotels, Food, Fuel & Flight Details (in ₹)
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

