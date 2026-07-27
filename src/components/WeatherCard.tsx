import React from 'react';
import { Sun, Cloud, Wind, Droplets, Luggage, Sparkles } from 'lucide-react';
import { WeatherInfo } from '../types';

interface WeatherCardProps {
  weather: WeatherInfo;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  return (
    <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
      {/* Glow SVG background */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Destination Current Temp & Status */}
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner border border-white/20">
            ☀️
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200 flex items-center gap-1">
              Destination Weather Forecast
            </span>
            <h3 className="text-2xl font-bold font-serif-title">{weather.destinationName}</h3>
            <p className="text-3xl font-extrabold mt-0.5">{weather.currentTempC}°C</p>
            <p className="text-xs font-semibold text-blue-100 mt-0.5">{weather.condition}</p>
          </div>
        </div>

        {/* Humidity & Wind Metrics */}
        <div className="grid grid-cols-2 gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-xs">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-cyan-300" />
            <div>
              <p className="text-[10px] text-blue-200 uppercase font-semibold">Humidity</p>
              <p className="font-bold">{weather.humidity}%</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-cyan-300" />
            <div>
              <p className="text-[10px] text-blue-200 uppercase font-semibold">Wind Speed</p>
              <p className="font-bold">{weather.windKmH} km/h</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Day Forecast Row */}
      {weather.forecast && weather.forecast.length > 0 && (
        <div className="mt-6 pt-5 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {weather.forecast.map((fc, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10 text-center">
              <p className="text-xs font-bold text-blue-200">{fc.day}</p>
              <p className="text-2xl my-1">{fc.icon || '☀️'}</p>
              <p className="text-sm font-extrabold">{fc.tempC}°C</p>
              <p className="text-[10px] text-blue-100 truncate mt-0.5">{fc.condition}</p>
            </div>
          ))}
        </div>
      )}

      {/* Packing Tip Banner */}
      <div className="mt-4 bg-white/15 backdrop-blur-md p-3 rounded-2xl border border-white/20 flex items-start gap-2.5 text-xs text-blue-50">
        <Luggage className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-300 mr-1">Smart Packing Advice:</span>
          {weather.packingTip}
        </div>
      </div>
    </div>
  );
};
