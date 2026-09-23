import React, { useEffect, useRef, useState, useTransition } from 'react';
import L from 'leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Navigation,
  Search,
  Crosshair,
  Sparkles,
  Star,
  ExternalLink,
  MoveUp,
  MoveDown,
  Trash2,
  Plus,
  Layers,
  Clock,
  Check,
  AlertCircle,
  GripVertical,
  Hotel,
  Utensils,
  Plane,
  Train,
  Bus,
  Camera,
  Fuel,
  ShoppingBag,
  X,
  Compass,
  RotateCcw,
  Info
} from 'lucide-react';
import { RouteWaypoint } from '../types';

// API Key setup check
const GOOGLE_MAPS_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

interface InteractiveMapProps {
  waypoints: RouteWaypoint[];
  routePolylineCoords?: [number, number][];
  googleDirectionsUrl: string;
  origin: string;
  destination: string;
  onWaypointsChange?: (updatedWaypoints: RouteWaypoint[]) => void;
}

// Calculate distance between coordinates using Haversine formula
function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  waypoints: initialWaypoints,
  routePolylineCoords,
  googleDirectionsUrl,
  origin,
  destination,
  onWaypointsChange,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const leafletPolylineRef = useRef<L.Polyline | null>(null);

  // States
  const [waypoints, setWaypoints] = useState<RouteWaypoint[]>(initialWaypoints);
  const [mapStyle, setMapStyle] = useState<'outdoors' | 'streets' | 'satellite'>('outdoors');
  const [selectedWaypoint, setSelectedWaypoint] = useState<RouteWaypoint | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isReorderOpen, setIsReorderOpen] = useState(false);
  const [droppedPins, setDroppedPins] = useState<RouteWaypoint[]>([]);
  const [showApiKeyGuide, setShowApiKeyGuide] = useState(!GOOGLE_MAPS_KEY);

  // Sync initialWaypoints when prop changes
  useEffect(() => {
    setWaypoints(initialWaypoints);
  }, [initialWaypoints]);

  // Combine waypoints + dropped pins
  const allWaypoints = [...waypoints, ...droppedPins];

  // Filtered waypoints based on category tab
  const filteredWaypoints = allWaypoints.filter((wp) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'hotels') return wp.type === 'hotel';
    if (filterCategory === 'attractions') return wp.type === 'scenic' || wp.type === 'tourist_attraction';
    if (filterCategory === 'food') return wp.type === 'food';
    if (filterCategory === 'transit')
      return wp.type === 'airport' || wp.type === 'bus_station' || wp.type === 'train_station';
    if (filterCategory === 'fuel') return wp.type === 'fuel';
    return true;
  });

  // Calculate live total distance
  const totalDistanceKm = React.useMemo(() => {
    if (waypoints.length < 2) return 0;
    let dist = 0;
    for (let i = 0; i < waypoints.length - 1; i++) {
      dist += calculateDistanceKm(waypoints[i].lat, waypoints[i].lng, waypoints[i + 1].lat, waypoints[i + 1].lng);
    }
    return dist;
  }, [waypoints]);

  // Estimated driving duration
  const estimatedHours = Math.floor(totalDistanceKm / 60);
  const estimatedMins = Math.round(((totalDistanceKm % 60) / 60) * 60);
  const durationFormatted =
    estimatedHours > 0 ? `${estimatedHours}h ${estimatedMins}m` : `${estimatedMins || 15} mins`;

  // Tile layers for Leaflet
  const tileUrls = {
    outdoors: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    streets: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  };

  // Icon symbol generator based on type
  const getWaypointMeta = (type: string) => {
    switch (type) {
      case 'origin':
        return { symbol: '🅰️', color: '#10b981', label: 'Start Point', bgClass: 'bg-emerald-500' };
      case 'destination':
        return { symbol: '🏁', color: '#f43f5e', label: 'Destination', bgClass: 'bg-rose-500' };
      case 'hotel':
        return { symbol: '🏨', color: '#8b5cf6', label: 'Hotel Stay', bgClass: 'bg-purple-500' };
      case 'food':
        return { symbol: '🍕', color: '#f59e0b', label: 'Dining / Food', bgClass: 'bg-amber-500' };
      case 'scenic':
      case 'tourist_attraction':
        return { symbol: '📷', color: '#06b6d4', label: 'Attraction / Spot', bgClass: 'bg-cyan-500' };
      case 'airport':
        return { symbol: '✈️', color: '#0284c7', label: 'Airport', bgClass: 'bg-sky-500' };
      case 'bus_station':
        return { symbol: '🚌', color: '#ea580c', label: 'Bus Station', bgClass: 'bg-orange-500' };
      case 'train_station':
        return { symbol: '🚆', color: '#4f46e5', label: 'Train Station', bgClass: 'bg-indigo-500' };
      case 'fuel':
        return { symbol: '⛽', color: '#10b981', label: 'Fuel Station', bgClass: 'bg-emerald-600' };
      case 'mall':
        return { symbol: '🛍️', color: '#ec4899', label: 'Shopping Mall', bgClass: 'bg-pink-500' };
      case 'user_location':
        return { symbol: '📍', color: '#2563eb', label: 'My Location', bgClass: 'bg-blue-600' };
      case 'custom_pin':
      default:
        return { symbol: '📌', color: '#7c3aed', label: 'Dropped Pin', bgClass: 'bg-violet-600' };
    }
  };

  // Map Initialization & Updates
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const defaultLat = filteredWaypoints[0]?.lat || 20.5937;
    const defaultLng = filteredWaypoints[0]?.lng || 78.9629;

    const map = L.map(mapContainerRef.current, {
      center: [defaultLat, defaultLng],
      zoom: 7,
      zoomControl: false,
    });

    mapInstanceRef.current = map;

    L.control.zoom({ position: 'topright' }).addTo(map);

    L.tileLayer(tileUrls[mapStyle], {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Click handler to drop pin
    map.on('click', async (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      
      // Reverse Geocoding attempt via Nominatim
      let placeName = `Dropped Pin (${lat.toFixed(3)}, ${lng.toFixed(3)})`;
      let addressStr = `${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E`;

      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
        if (res.ok) {
          const data = await res.json();
          if (data.display_name) {
            addressStr = data.display_name;
            placeName = data.name || data.address?.road || data.address?.suburb || 'Selected Location';
          }
        }
      } catch (err) {
        console.log('Reverse geocode fallback used');
      }

      const newPin: RouteWaypoint = {
        id: `pin-${Date.now()}`,
        name: placeName,
        lat,
        lng,
        type: 'custom_pin',
        address: addressStr,
        description: 'Custom pin dropped by clicking the interactive map.',
        rating: 4.8,
      };

      setDroppedPins((prev) => [...prev, newPin]);
      setSelectedWaypoint(newPin);
    });

    const bounds = L.latLngBounds([]);

    // Custom Icon Creator
    const createCustomIcon = (type: string) => {
      const { symbol, color } = getWaypointMeta(type);
      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div style="
          background: ${color};
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 4px 14px rgba(0,0,0,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
          transition: transform 0.2s ease;
        ">${symbol}</div>`,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      });
    };

    // Render Markers
    filteredWaypoints.forEach((wp) => {
      const marker = L.marker([wp.lat, wp.lng], {
        icon: createCustomIcon(wp.type),
      }).addTo(map);

      marker.on('click', () => {
        setSelectedWaypoint(wp);
      });

      bounds.extend([wp.lat, wp.lng]);
    });

    // Draw Route Polyline connecting main waypoints
    if (waypoints.length > 1) {
      const coords: [number, number][] = waypoints.map((wp) => [wp.lat, wp.lng]);
      const polyline = L.polyline(coords, {
        color: '#e11d48',
        weight: 5,
        opacity: 0.85,
        dashArray: '8, 8',
      }).addTo(map);

      leafletPolylineRef.current = polyline;
      coords.forEach((c) => bounds.extend(c));
    }

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [waypoints, droppedPins, mapStyle, filterCategory]);

  // Handle Geolocation (User Location Detection)
  const handleDetectLocation = () => {
    setIsLocating(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        const userWp: RouteWaypoint = {
          id: 'user-loc',
          name: 'Your Current Location',
          lat,
          lng,
          type: 'user_location',
          description: 'Detected via device GPS.',
          address: `Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`,
        };

        setUserLocation({ lat, lng });
        setDroppedPins((prev) => [userWp, ...prev.filter((p) => p.id !== 'user-loc')]);
        setSelectedWaypoint(userWp);
        setIsLocating(false);

        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([lat, lng], 13, { duration: 1.5 });
        }
      },
      (err) => {
        setIsLocating(false);
        if (err.code === err.PERMISSION_DENIED) {
          setLocationError('Location permission denied. Please enable location access in browser.');
        } else {
          setLocationError('Unable to retrieve location. Please search manually.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Handle Location Search
  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError(null);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      if (!res.ok) throw new Error('Search service unavailable');
      const data = await res.json();

      if (data && data.length > 0) {
        const top = data[0];
        const lat = parseFloat(top.lat);
        const lng = parseFloat(top.lon);

        const foundWp: RouteWaypoint = {
          id: `search-${Date.now()}`,
          name: top.display_name.split(',')[0] || searchQuery,
          lat,
          lng,
          type: 'tourist_attraction',
          address: top.display_name,
          description: 'Location found via autocomplete search.',
          rating: 4.9,
        };

        setDroppedPins((prev) => [...prev, foundWp]);
        setSelectedWaypoint(foundWp);
        setIsSearching(false);
        setSearchQuery('');

        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([lat, lng], 12, { duration: 1.5 });
        }
      } else {
        setSearchError('No locations found. Try searching a city, airport, or landmark.');
        setIsSearching(false);
      }
    } catch (err) {
      setSearchError('Search failed. Check network connection.');
      setIsSearching(false);
    }
  };

  // Waypoint reordering functions
  const moveWaypoint = (index: number, direction: 'up' | 'down') => {
    const newWps = [...waypoints];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newWps.length) return;

    const temp = newWps[index];
    newWps[index] = newWps[targetIdx];
    newWps[targetIdx] = temp;

    setWaypoints(newWps);
    if (onWaypointsChange) onWaypointsChange(newWps);
  };

  const removeWaypoint = (index: number) => {
    if (waypoints.length <= 2) return; // Keep at least origin & destination
    const newWps = waypoints.filter((_, i) => i !== index);
    setWaypoints(newWps);
    if (onWaypointsChange) onWaypointsChange(newWps);
  };

  const addPinToRoute = (pin: RouteWaypoint) => {
    const updated = [...waypoints, pin];
    setWaypoints(updated);
    if (onWaypointsChange) onWaypointsChange(updated);
    setDroppedPins((prev) => prev.filter((p) => p.id !== pin.id));
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-200/90 overflow-hidden space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse shrink-0"></span>
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-rose-600" /> Interactive Route Map & Places
            </h3>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200 uppercase tracking-wider">
              Live GIS
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Connecting <span className="font-bold text-slate-800">{origin}</span> to{' '}
            <span className="font-bold text-slate-800">{destination}</span> • Click anywhere to drop custom pins
          </p>
        </div>

        {/* Action Controls & External Directions */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Detect My Location */}
          <button
            onClick={handleDetectLocation}
            disabled={isLocating}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all cursor-pointer border border-slate-200/80"
            title="Detect My Location"
          >
            <Crosshair className={`w-4 h-4 text-blue-600 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Locating...' : 'My Location'}</span>
          </button>

          {/* Reorder Route Button */}
          <button
            onClick={() => setIsReorderOpen(!isReorderOpen)}
            className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold px-3.5 py-2.5 rounded-xl transition-all cursor-pointer border border-rose-200/80"
          >
            <GripVertical className="w-4 h-4 text-rose-600" />
            <span>Reorder Route ({waypoints.length})</span>
          </button>

          {/* Map Layer Selector */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200/80">
            <button
              onClick={() => setMapStyle('outdoors')}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                mapStyle === 'outdoors' ? 'bg-white text-rose-600 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Outdoor
            </button>
            <button
              onClick={() => setMapStyle('streets')}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                mapStyle === 'streets' ? 'bg-white text-rose-600 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Street
            </button>
            <button
              onClick={() => setMapStyle('satellite')}
              className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                mapStyle === 'satellite' ? 'bg-white text-rose-600 shadow-2xs' : 'text-slate-600'
              }`}
            >
              Satellite
            </button>
          </div>

          {/* Open Google Maps Directions */}
          <a
            href={googleDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer"
          >
            <span>Navigate in Google Maps</span> <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* API Key Setup Banner if not configured */}
      {showApiKeyGuide && (
        <div className="bg-gradient-to-r from-amber-50 to-rose-50 p-3.5 rounded-2xl border border-amber-200/80 text-xs flex items-center justify-between gap-3 text-slate-800">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Google Maps Platform Key:</strong> Configure <code>GOOGLE_MAPS_PLATFORM_KEY</code> in Secrets for full Google Places Autocomplete. Fallback OpenStreetMap GIS is active.
            </span>
          </div>
          <button
            onClick={() => setShowApiKeyGuide(false)}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Location Error Alert */}
      {locationError && (
        <div className="bg-rose-50 p-3 rounded-2xl border border-rose-200 text-xs text-rose-700 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{locationError}</span>
          </div>
          <button onClick={() => setLocationError(null)} className="text-rose-400 hover:text-rose-700">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Live Search Autocomplete Bar */}
      <form onSubmit={handleSearchSubmit} className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search city, hotel, attraction, airport, restaurant, or landmark..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <button
          type="submit"
          disabled={isSearching}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-5 py-2.5 rounded-2xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          {isSearching ? 'Searching...' : 'Search Place'}
        </button>
      </form>

      {/* Search Error Alert */}
      {searchError && (
        <p className="text-xs text-rose-600 font-semibold px-1">{searchError}</p>
      )}

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider shrink-0 mr-1">
          Filter:
        </span>
        {[
          { id: 'all', label: `All (${allWaypoints.length})`, icon: Layers },
          { id: 'hotels', label: 'Hotels', icon: Hotel },
          { id: 'attractions', label: 'Attractions', icon: Camera },
          { id: 'food', label: 'Food & Dining', icon: Utensils },
          { id: 'transit', label: 'Transit (Airport/Train)', icon: Plane },
          { id: 'fuel', label: 'Fuel Stations', icon: Fuel },
        ].map((cat) => {
          const Icon = cat.icon;
          const isActive = filterCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {cat.label}
            </button>
          );
        })}
      </div>

      {/* Live Route Distance Stats Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-3.5 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold shadow-inner">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
              <Compass className="w-4 h-4" />
            </span>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Total Route Distance</p>
              <p className="text-sm font-extrabold text-white">{totalDistanceKm} km</p>
            </div>
          </div>

          <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Clock className="w-4 h-4" />
            </span>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Est. Drive Time</p>
              <p className="text-sm font-extrabold text-white">{durationFormatted}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 border-l border-slate-800 pl-4">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <MapPin className="w-4 h-4" />
            </span>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold">Waypoints</p>
              <p className="text-sm font-extrabold text-white">{waypoints.length} Stops</p>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-slate-400 italic hidden sm:block">
          💡 Click map anywhere to drop custom pin
        </p>
      </div>

      {/* Reorder Route Drawer / Modal */}
      <AnimatePresence>
        {isReorderOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-slate-50 p-4 rounded-2xl border border-slate-200/90 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <GripVertical className="w-4 h-4 text-rose-600" /> Reorder Waypoints & Auto-Update Polyline
              </h4>
              <button
                onClick={() => setIsReorderOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                Done
              </button>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {waypoints.map((wp, idx) => {
                const meta = getWaypointMeta(wp.type);
                return (
                  <div
                    key={idx}
                    className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3 shadow-2xs text-xs"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm">{meta.symbol}</span>
                      <div className="truncate">
                        <p className="font-bold text-slate-900 truncate">{wp.name}</p>
                        <p className="text-[10px] text-slate-500">{meta.label}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => moveWaypoint(idx, 'up')}
                        disabled={idx === 0}
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 cursor-pointer"
                        title="Move Up"
                      >
                        <MoveUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveWaypoint(idx, 'down')}
                        disabled={idx === waypoints.length - 1}
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-30 text-slate-700 cursor-pointer"
                        title="Move Down"
                      >
                        <MoveDown className="w-3.5 h-3.5" />
                      </button>
                      {waypoints.length > 2 && (
                        <button
                          onClick={() => removeWaypoint(idx)}
                          className="p-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer"
                          title="Remove Stop"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Map View Canvas Container */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 h-[420px] sm:h-[480px] bg-slate-100 shadow-inner">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Legend Overlay */}
        <div className="absolute bottom-3 left-3 z-20 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-slate-200/90 shadow-lg text-xs flex flex-wrap items-center gap-3 max-w-[90%] sm:max-w-none">
          <span className="flex items-center gap-1.5 font-bold text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Start
          </span>
          <span className="flex items-center gap-1.5 font-bold text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Finish
          </span>
          <span className="flex items-center gap-1.5 font-bold text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Hotel
          </span>
          <span className="flex items-center gap-1.5 font-bold text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Dining
          </span>
          <span className="flex items-center gap-1.5 font-bold text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span> Attraction
          </span>
          <span className="flex items-center gap-1.5 font-bold text-slate-800">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-600"></span> Pin
          </span>
        </div>

        {/* Interactive Selected Place Popup Card */}
        <AnimatePresence>
          {selectedWaypoint && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="absolute top-4 left-4 right-4 sm:right-auto sm:max-w-xs z-30 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/90 shadow-2xl space-y-2.5"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className={`text-[10px] font-extrabold text-white px-2.5 py-0.5 rounded-full ${getWaypointMeta(selectedWaypoint.type).bgClass}`}>
                    {getWaypointMeta(selectedWaypoint.type).label}
                  </span>
                  <h4 className="font-extrabold text-slate-900 text-base leading-tight mt-1">
                    {selectedWaypoint.name}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedWaypoint(null)}
                  className="p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {selectedWaypoint.rating && (
                <div className="flex items-center gap-1 text-xs font-extrabold text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{selectedWaypoint.rating} / 5.0</span>
                </div>
              )}

              {selectedWaypoint.address && (
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed flex items-start gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{selectedWaypoint.address}</span>
                </p>
              )}

              {selectedWaypoint.description && (
                <p className="text-xs text-slate-500 line-clamp-2 italic">
                  "{selectedWaypoint.description}"
                </p>
              )}

              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selectedWaypoint.lat},${selectedWaypoint.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold py-2 rounded-xl text-center transition-all flex items-center justify-center gap-1 shadow-2xs"
                >
                  <span>Navigate</span> <ExternalLink className="w-3 h-3" />
                </a>

                {selectedWaypoint.type === 'custom_pin' && (
                  <button
                    onClick={() => addPinToRoute(selectedWaypoint)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all flex items-center gap-1"
                    title="Add stop to route"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Stop
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
