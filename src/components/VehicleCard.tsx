import React from 'react';
import { Car, Fuel, Zap, CheckCircle2, ShieldAlert } from 'lucide-react';
import { VehicleOption } from '../types';

interface VehicleCardProps {
  vehicle: VehicleOption;
  distanceKm: number;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, distanceKm }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Vehicle Image */}
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1584345604476-8ec5e12e4092?auto=format&fit=crop&w=800&q=80');
          }}
        />
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full border border-white/20">
          {vehicle.type}
        </div>
        <div className="absolute bottom-3 right-3 bg-amber-600 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-lg">
          ₹{vehicle.estimatedDailyRate.toLocaleString('en-IN')} <span className="font-normal text-[10px] opacity-90">/ day</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-slate-900 text-base mb-2 group-hover:text-rose-600 transition-colors">
            {vehicle.name}
          </h4>

          {/* Fuel / Energy cost calculator based on trip distance */}
          <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200/60 mb-3 text-xs">
            <div className="flex items-center justify-between font-bold text-amber-900 mb-1">
              <span className="flex items-center gap-1">
                <Fuel className="w-3.5 h-3.5 text-amber-600" /> Est. Fuel / Power Cost
              </span>
              <span className="text-sm font-extrabold text-amber-800">₹{vehicle.fuelEstimate.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-[11px] text-amber-800">
              Calculated for {distanceKm} km route ({vehicle.co2Estimate})
            </p>
          </div>

          {/* Key Highlights */}
          <div className="space-y-1.5 mb-4">
            {vehicle.highlights.map((item, idx) => (
              <p key={idx} className="text-xs text-slate-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>

        <button className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2">
          <Car className="w-4 h-4" /> Select Vehicle Option
        </button>
      </div>
    </div>
  );
};
