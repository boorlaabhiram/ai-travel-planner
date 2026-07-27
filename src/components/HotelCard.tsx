import React from 'react';
import { Star, MapPin, ExternalLink, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { HotelOption } from '../types';

interface HotelCardProps {
  hotel: HotelOption;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
    >
      {/* Hotel Image with Badge & Price Overlay */}
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5 }}
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80');
          }}
        />
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full border border-white/20">
          {hotel.category}
        </div>
        <div className="absolute bottom-3 right-3 bg-rose-600 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl shadow-lg">
          ₹{hotel.pricePerNight.toLocaleString('en-IN')} <span className="font-normal text-[10px] opacity-80">/ night</span>
        </div>
      </div>

      {/* Hotel Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header & Rating */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h4 className="font-bold text-slate-900 text-base group-hover:text-rose-600 transition-colors leading-tight">
              {hotel.name}
            </h4>
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 shrink-0">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-xs font-bold text-amber-800">{hotel.rating}</span>
            </div>
          </div>

          {/* Address */}
          <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="truncate">{hotel.address}</span>
          </p>

          {/* Description */}
          <p className="text-xs text-slate-600 line-clamp-2 mb-3">
            {hotel.description}
          </p>

          {/* Amenities Chips */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {hotel.amenities.map((amenity, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md flex items-center gap-1"
              >
                <Check className="w-3 h-3 text-emerald-500" /> {amenity}
              </span>
            ))}
          </div>
        </div>

        {/* Card Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
          <a
            href={hotel.googleMapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold text-center transition-colors flex items-center justify-center gap-1"
          >
            <MapPin className="w-3.5 h-3.5 text-rose-500" /> Map View
          </a>
          <a
            href={hotel.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1 shadow-xs"
          >
            Book Stay <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

