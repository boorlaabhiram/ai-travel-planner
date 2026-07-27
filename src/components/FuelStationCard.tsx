import React from 'react';
import { Fuel, Zap, MapPin, ExternalLink, Clock, ShieldCheck } from 'lucide-react';
import { FuelStation } from '../types';

interface FuelStationCardProps {
  station: FuelStation;
}

export const FuelStationCard: React.FC<FuelStationCardProps> = ({ station }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-4 text-white relative">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5 font-extrabold text-sm tracking-tight">
            <Fuel className="w-4 h-4 text-emerald-200" />
            <span>{station.brand || 'Fuel & Energy Station'}</span>
          </div>
          <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/30 flex items-center gap-1">
            <Clock className="w-2.5 h-2.5" /> {station.openHours || '24 Hours'}
          </span>
        </div>
        <h4 className="font-extrabold text-base leading-tight drop-shadow-xs">
          {station.name}
        </h4>
        <p className="text-xs text-emerald-100 flex items-center gap-1 mt-1">
          <MapPin className="w-3 h-3 text-emerald-200 shrink-0" />
          <span className="truncate">{station.distanceFromRoute}</span>
        </p>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Price Table in Indian Rupees */}
          <div className="grid grid-cols-2 gap-2 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-200/80 text-center">
              <span className="text-[10px] font-bold uppercase text-emerald-800 tracking-wider">Petrol Rate</span>
              <p className="text-base font-extrabold text-emerald-700 mt-0.5">
                ₹{station.petrolPricePerLitre ? station.petrolPricePerLitre.toFixed(2) : '104.50'}/L
              </p>
            </div>
            <div className="bg-sky-50 p-2 rounded-lg border border-sky-200/80 text-center">
              <span className="text-[10px] font-bold uppercase text-sky-800 tracking-wider">Diesel Rate</span>
              <p className="text-base font-extrabold text-sky-700 mt-0.5">
                ₹{station.dieselPricePerLitre ? station.dieselPricePerLitre.toFixed(2) : '92.20'}/L
              </p>
            </div>
          </div>

          {/* Fuel / EV Types Available */}
          <div className="mb-4">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Fuels & EV Chargers Available:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {station.fuelTypes.map((type, idx) => (
                <span
                  key={idx}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
                    type.toLowerCase().includes('ev') || type.toLowerCase().includes('charging')
                      ? 'bg-cyan-50 text-cyan-800 border-cyan-200'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}
                >
                  {type.toLowerCase().includes('ev') ? <Zap className="w-3 h-3 text-cyan-600" /> : <Fuel className="w-3 h-3 text-emerald-600" />}
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>

        <a
          href={station.googleMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 shadow-xs"
        >
          <MapPin className="w-3.5 h-3.5" /> Navigate to Fuel Station <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
