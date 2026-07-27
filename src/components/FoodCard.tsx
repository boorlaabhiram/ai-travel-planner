import React from 'react';
import { Utensils, Star, MapPin, Sparkles, Heart } from 'lucide-react';
import { FoodOption } from '../types';

interface FoodCardProps {
  food: FoodOption;
}

export const FoodCard: React.FC<FoodCardProps> = ({ food }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Food Image */}
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80');
          }}
        />
        <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full border border-white/20">
          {food.cuisine}
        </div>
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
          {food.priceLevel}
        </div>
      </div>

      {/* Food Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-bold text-slate-900 text-base group-hover:text-rose-600 transition-colors">
              {food.placeName || food.name}
            </h4>
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 shrink-0">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span className="text-xs font-bold text-amber-800">{food.rating}</span>
            </div>
          </div>

          {/* Signature Dish Badge */}
          <div className="bg-rose-50 border border-rose-100 p-2.5 rounded-xl mb-3">
            <p className="text-[11px] font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1 mb-0.5">
              <Sparkles className="w-3 h-3" /> Signature Dish:
            </p>
            <p className="text-xs font-bold text-slate-900">{food.signatureDish}</p>
          </div>

          <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="truncate">{food.address}</span>
          </p>

          <div className="flex flex-wrap gap-1.5 mb-2">
            {food.tags.map((tag, idx) => (
              <span key={idx} className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(food.placeName + ' ' + food.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold text-center transition-colors flex items-center justify-center gap-1 mt-2"
        >
          <Utensils className="w-3.5 h-3.5 text-amber-600" /> View Food Spot on Maps
        </a>
      </div>
    </div>
  );
};
