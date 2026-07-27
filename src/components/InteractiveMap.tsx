import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { ExternalLink, Layers, MapPin, Navigation } from 'lucide-react';
import { RouteWaypoint } from '../types';

interface InteractiveMapProps {
  waypoints: RouteWaypoint[];
  routePolylineCoords: [number, number][];
  googleDirectionsUrl: string;
  origin: string;
  destination: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  waypoints,
  routePolylineCoords,
  googleDirectionsUrl,
  origin,
  destination,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite' | 'outdoors'>('outdoors');

  const tileUrls = {
    outdoors: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    streets: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Clean up previous map instance if exists
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Determine initial center
    const defaultLat = waypoints[0]?.lat || 25.7617;
    const defaultLng = waypoints[0]?.lng || -80.1918;

    const map = L.map(mapContainerRef.current, {
      center: [defaultLat, defaultLng],
      zoom: 7,
      zoomControl: false,
    });

    mapInstanceRef.current = map;

    // Add zoom control to top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Add tile layer
    L.tileLayer(tileUrls[mapStyle], {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Custom Icon Creators
    const createCustomIcon = (color: string, symbol: string) => {
      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div style="
          background: ${color};
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 14px;
        ">${symbol}</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });
    };

    const bounds = L.latLngBounds([]);

    // Add waypoints markers
    waypoints.forEach((wp, idx) => {
      let color = '#3b82f6';
      let iconSymbol = '📍';

      if (wp.type === 'origin') {
        color = '#10b981';
        iconSymbol = '🅰️';
      } else if (wp.type === 'destination') {
        color = '#f43f5e';
        iconSymbol = '🏁';
      } else if (wp.type === 'hotel') {
        color = '#8b5cf6';
        iconSymbol = '🏨';
      } else if (wp.type === 'food') {
        color = '#f59e0b';
        iconSymbol = '🍕';
      } else if (wp.type === 'scenic') {
        color = '#06b6d4';
        iconSymbol = '📷';
      }

      const marker = L.marker([wp.lat, wp.lng], {
        icon: createCustomIcon(color, iconSymbol),
      }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: sans-serif; padding: 4px;">
          <h4 style="margin:0 0 4px; font-size: 14px; font-weight: bold; color: #0f172a;">${wp.name}</h4>
          <p style="margin:0; font-size: 12px; color: #475569;">${wp.description || wp.type.toUpperCase()}</p>
        </div>
      `);

      bounds.extend([wp.lat, wp.lng]);
    });

    // Draw Route Polyline
    if (routePolylineCoords && routePolylineCoords.length > 0) {
      const polyline = L.polyline(routePolylineCoords, {
        color: '#f43f5e',
        weight: 5,
        opacity: 0.85,
        dashArray: '8, 8',
      }).addTo(map);

      routePolylineCoords.forEach((pt) => bounds.extend(pt));
    }

    // Fit bounds smoothly
    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40] });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [waypoints, routePolylineCoords, mapStyle]);

  return (
    <div className="bg-white rounded-3xl p-5 shadow-lg border border-slate-200 overflow-hidden">
      {/* Map Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></span>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-1.5">
              <Navigation className="w-5 h-5 text-rose-600" /> Interactive Google Route Map
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Route: <span className="font-semibold text-slate-800">{origin}</span> →{' '}
            <span className="font-semibold text-slate-800">{destination}</span>
          </p>
        </div>

        {/* Map Style Controls + Google Maps External Link */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200">
            <button
              onClick={() => setMapStyle('outdoors')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors ${
                mapStyle === 'outdoors' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              Outdoor
            </button>
            <button
              onClick={() => setMapStyle('streets')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors ${
                mapStyle === 'streets' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              Streets
            </button>
            <button
              onClick={() => setMapStyle('satellite')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors ${
                mapStyle === 'satellite' ? 'bg-white text-rose-600 shadow-xs' : 'text-slate-600'
              }`}
            >
              Satellite
            </button>
          </div>

          <a
            href={googleDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs"
          >
            Open in Google Maps <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Map Canvas */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 h-[380px] sm:h-[420px] bg-slate-100">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Legend Overlay */}
        <div className="absolute bottom-3 left-3 z-20 bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-200/80 shadow-md text-xs flex items-center gap-3">
          <span className="flex items-center gap-1 font-semibold text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Start
          </span>
          <span className="flex items-center gap-1 font-semibold text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Finish
          </span>
          <span className="flex items-center gap-1 font-semibold text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Hotel
          </span>
          <span className="flex items-center gap-1 font-semibold text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Food
          </span>
        </div>
      </div>
    </div>
  );
};
