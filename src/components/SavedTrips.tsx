import React from 'react';
import { BookmarkCheck, Trash2, ExternalLink, Calendar, DollarSign, MapPin, Navigation, Car, Hotel, Utensils, Printer } from 'lucide-react';
import { TripPlanResult } from '../types';

interface SavedTripsProps {
  savedTrips: TripPlanResult[];
  onSelectTrip: (trip: TripPlanResult) => void;
  onRemoveTrip: (tripId: string) => void;
}

export const SavedTrips: React.FC<SavedTripsProps> = ({
  savedTrips,
  onSelectTrip,
  onRemoveTrip,
}) => {
  if (!savedTrips || savedTrips.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-md max-w-xl mx-auto my-8">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-rose-100">
          <BookmarkCheck className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-serif-title font-bold text-slate-900">No Saved Itineraries Yet</h3>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto">
          Generate route recommendations for any destination worldwide and click "Save Trip" to bookmark them here!
        </p>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            Saved Bookmarks ({savedTrips.length})
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-slate-900 mt-2">
            Your Bookmarked Itineraries & Expense Sheets
          </h2>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" /> Print / Export PDF
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savedTrips.map((trip) => (
          <div
            key={trip.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100">
                    {trip.budget} Budget • {trip.daysCount} Days
                  </span>
                  <h3 className="text-xl font-bold font-serif-title text-slate-900 mt-1">
                    {trip.origin} → {trip.destination}
                  </h3>
                </div>

                <button
                  onClick={() => onRemoveTrip(trip.id)}
                  className="text-slate-400 hover:text-rose-600 p-2 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Expense Summary Box */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 my-4 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Distance</p>
                  <p className="text-sm font-extrabold text-slate-900">{trip.distanceKm} km</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Drive Time</p>
                  <p className="text-xs font-extrabold text-slate-800">{trip.durationText}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Total Expense</p>
                  <p className="text-sm font-extrabold text-rose-600">${trip.totalCostEstimate}</p>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2 text-xs text-slate-600 mb-5">
                <p className="flex items-center gap-2">
                  <Hotel className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span className="font-semibold text-slate-900">Hotel:</span>{' '}
                  <span className="truncate">{trip.hotels[0]?.name || 'Luxury Stay'}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Car className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="font-semibold text-slate-900">Vehicle:</span>{' '}
                  <span className="truncate">{trip.vehicles[0]?.name || 'Rental Drive'}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Utensils className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span className="font-semibold text-slate-900">Top Food:</span>{' '}
                  <span className="truncate">{trip.foodSpots[0]?.name || 'Local Kitchen'}</span>
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
              <button
                onClick={() => onSelectTrip(trip)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold text-center transition-all cursor-pointer shadow-xs"
              >
                View Complete Route Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
