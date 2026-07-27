import React from 'react';
import { ShoppingBag, Star, MapPin, ExternalLink, Sparkles } from 'lucide-react';
import { ShoppingMall } from '../types';

interface MallCardProps {
  mall: ShoppingMall;
}

export const MallCard: React.FC<MallCardProps> = ({ mall }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Mall Cover Image */}
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <img
          src={mall.image}
          alt={mall.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?auto=format&fit=crop&w=800&q=80');
          }}
        />
        <div className="absolute top-3 left-3 bg-purple-900/85 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1">
          <ShoppingBag className="w-3 h-3 text-purple-300" /> Shopping Mall
        </div>
        <div className="absolute bottom-3 right-3 bg-amber-500 text-white text-xs font-extrabold px-2.5 py-1 rounded-xl shadow-lg flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-white" /> {mall.rating}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-bold text-slate-900 text-base mb-1 group-hover:text-purple-600 transition-colors">
            {mall.name}
          </h4>
          <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-purple-500 shrink-0" />
            <span className="truncate">{mall.address}</span>
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {mall.highlights.map((item, idx) => (
              <span
                key={idx}
                className="text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-100 px-2.5 py-0.5 rounded-lg flex items-center gap-1"
              >
                <Sparkles className="w-2.5 h-2.5 text-purple-500" /> {item}
              </span>
            ))}
          </div>
        </div>

        <a
          href={mall.googleMapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-1.5 shadow-xs"
        >
          <MapPin className="w-3.5 h-3.5" /> Google Maps Mall Directions <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
