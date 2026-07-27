import React, { useState } from 'react';
import { X, Sparkles, BookOpen, MapPin, Image } from 'lucide-react';
import { BlogPost, GoogleUser, TripPlanResult } from '../types';

interface NewBlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: GoogleUser;
  currentTrip?: TripPlanResult | null;
  onPublishPost: (postData: Partial<BlogPost>) => void;
}

export const NewBlogModal: React.FC<NewBlogModalProps> = ({
  isOpen,
  onClose,
  user,
  currentTrip,
  onPublishPost,
}) => {
  const [title, setTitle] = useState(
    currentTrip
      ? currentTrip.blogStory?.title || `Our Journey from ${currentTrip.origin} to ${currentTrip.destination}`
      : 'Unforgettable Coastal Escapes: A Travel Story'
  );
  const [origin, setOrigin] = useState(currentTrip?.origin || 'Miami, FL');
  const [destination, setDestination] = useState(currentTrip?.destination || 'Key West, FL');
  const [excerpt, setExcerpt] = useState(
    currentTrip?.blogStory?.excerpt || 'A thrilling journey filled with stunning ocean views, fresh seafood, and luxury stays.'
  );
  const [content, setContent] = useState(
    currentTrip?.blogStory?.fullContent ||
      `### The Road Ahead\nOur journey from ${origin} to ${destination} was nothing short of extraordinary. The drive was smooth, taking us through scenic landscapes.\n\n### Where We Stayed & Dined\nWe booked a luxury stay near the center of town. Don't miss out on trying the local cuisine!`
  );
  const [coverImage, setCoverImage] = useState(
    currentTrip?.blogStory?.coverImage ||
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
  );
  const [tagsInput, setTagsInput] = useState('Road Trip, Coastal, Foodie');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tagsArr = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onPublishPost({
      title,
      origin,
      destination,
      excerpt,
      content,
      coverImage,
      tags: tagsArr.length ? tagsArr : ['Road Trip', 'Travel Guide'],
      authorName: user.name || 'Abhiram Boorla',
      authorEmail: user.email || 'boorlaabhiram2@gmail.com',
      authorAvatar: user.picture,
      tripPlanSummary: currentTrip
        ? {
            distanceKm: currentTrip.distanceKm,
            durationText: currentTrip.durationText,
            totalCostEstimate: currentTrip.totalCostEstimate,
            hotelName: currentTrip.hotels[0]?.name || 'Luxury Resort',
            topFood: currentTrip.foodSpots[0]?.name || 'Local Seafood',
          }
        : undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200 inline-flex items-center gap-1 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Publish Travel Story
          </span>
          <h2 className="text-2xl font-serif-title font-bold text-slate-900">
            Publish New Travel Blog
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Share your itinerary, recommendations, and photos with the Wanderlust travel community!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Blog Post Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Island Hopping by Car: Our Epic Key West Getaway"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Starting Point</label>
              <input
                type="text"
                required
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Destination</label>
              <input
                type="text"
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Short Excerpt</label>
            <input
              type="text"
              required
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="A brief 1-2 sentence teaser for readers"
              className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Cover Image URL</label>
            <input
              type="url"
              required
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Blog Story Content (Markdown Supported)</label>
            <textarea
              required
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Tags (Comma Separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-800"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              🚀 Publish Story to Community Feed
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
