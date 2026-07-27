import React, { useState } from 'react';
import { Calendar, Sun, Sunset, Moon, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import { ItineraryDay } from '../types';

interface ItineraryTimelineProps {
  days: ItineraryDay[];
}

export const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({ days }) => {
  const [expandedDay, setExpandedDay] = useState<number>(1);

  if (!days || days.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-200">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
          Day-by-Day Journey
        </span>
        <h3 className="text-xl sm:text-2xl font-serif-title font-bold text-slate-900 mt-2">
          Your Customized Itinerary Breakdown
        </h3>
      </div>

      <div className="space-y-4">
        {days.map((day) => {
          const isExpanded = expandedDay === day.dayNumber;

          return (
            <div
              key={day.dayNumber}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded ? 'border-rose-300 bg-rose-50/20 shadow-md' : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              {/* Day Header Button */}
              <button
                onClick={() => setExpandedDay(isExpanded ? 0 : day.dayNumber)}
                className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                    Day {day.dayNumber}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{day.title}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-emerald-600" /> Est. Day Cost: ${day.dayEstimatedCost}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-rose-600 hidden sm:inline">
                    {isExpanded ? 'Hide Details' : 'View Schedule'}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-rose-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>

              {/* Day Schedule Body */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-rose-100/80 space-y-4">
                  {/* Morning */}
                  <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-100 shadow-2xs">
                    <div className="p-2 rounded-lg bg-amber-100 text-amber-600 shrink-0 mt-0.5">
                      <Sun className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold uppercase text-amber-700 tracking-wider">Morning</h5>
                      <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">{day.morning}</p>
                    </div>
                  </div>

                  {/* Afternoon */}
                  <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-100 shadow-2xs">
                    <div className="p-2 rounded-lg bg-rose-100 text-rose-600 shrink-0 mt-0.5">
                      <Sunset className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold uppercase text-rose-700 tracking-wider">Afternoon</h5>
                      <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">{day.afternoon}</p>
                    </div>
                  </div>

                  {/* Evening */}
                  <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-100 shadow-2xs">
                    <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600 shrink-0 mt-0.5">
                      <Moon className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold uppercase text-indigo-700 tracking-wider">Evening</h5>
                      <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">{day.evening}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
