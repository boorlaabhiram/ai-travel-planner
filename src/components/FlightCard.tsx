import React from 'react';
import { Plane, Clock, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react';
import { FlightOption } from '../types';

interface FlightCardProps {
  flight: FlightOption;
}

export const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 p-4 text-white relative">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5 font-extrabold text-sm tracking-tight">
            <span className="text-xl leading-none">{flight.airlineLogo || '✈️'}</span>
            <span>{flight.airline}</span>
            <span className="text-xs font-normal opacity-80">({flight.flightNumber})</span>
          </div>
          <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/30">
            {flight.type || 'Direct Flight'}
          </span>
        </div>

        {/* Departure -> Arrival Times */}
        <div className="flex items-center justify-between my-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20">
          <div>
            <p className="text-xs text-sky-200 font-semibold">Departure</p>
            <p className="text-lg font-black tracking-tight">{flight.departureTime}</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-sky-200 font-bold flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" /> {flight.duration}
            </span>
            <div className="w-16 h-0.5 bg-sky-300/60 my-1 relative flex items-center justify-center">
              <Plane className="w-3.5 h-3.5 text-white absolute" />
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-sky-200 font-semibold">Arrival</p>
            <p className="text-lg font-black tracking-tight">{flight.arrivalTime}</p>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="mb-4">
          <div className="flex items-center justify-between bg-sky-50 p-3 rounded-xl border border-sky-200/80 mb-3">
            <span className="text-xs font-extrabold text-sky-900 flex items-center gap-1">
              <Plane className="w-3.5 h-3.5 text-sky-600" /> Fare / Passenger
            </span>
            <span className="text-lg font-black text-sky-700">
              ₹{flight.priceINR.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="space-y-1 text-xs text-slate-600">
            <p className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Fast air connectivity option
            </p>
            <p className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> Real-time flight schedule estimate
            </p>
          </div>
        </div>

        <a
          href={flight.bookingUrl || 'https://www.google.com/travel/flights'}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 shadow-xs"
        >
          Book Flight Ticket <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
