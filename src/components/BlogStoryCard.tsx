import React from 'react';
import { Heart, MapPin, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { BlogPost } from '../types';

interface BlogStoryCardProps {
  post: BlogPost;
  onReadPost: (post: BlogPost) => void;
  onLikePost: (id: string) => void;
}

export const BlogStoryCard: React.FC<BlogStoryCardProps> = ({ post, onReadPost, onLikePost }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group cursor-pointer"
    >
      {/* Cover Image & Route Badge */}
      <div className="relative h-52 overflow-hidden bg-slate-100" onClick={() => onReadPost(post)}>
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5 }}
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLElement).setAttribute('src', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80');
          }}
        />
        <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-md">
          <MapPin className="w-3.5 h-3.5 text-rose-400" /> {post.origin} → {post.destination}
        </div>
        {post.featured && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Featured Story
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                #{tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3
            onClick={() => onReadPost(post)}
            className="font-extrabold text-slate-900 text-xl leading-tight mb-2 group-hover:text-rose-600 transition-colors"
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed font-medium">
            {post.excerpt}
          </p>

          {/* Summary Metric Strip if available */}
          {post.tripPlanSummary && (
            <div className="bg-slate-50/90 p-3 rounded-2xl border border-slate-200 text-xs mb-4 grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Total Distance</span>
                <p className="font-extrabold text-slate-900">{post.tripPlanSummary.distanceKm} km</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold">Est. Expense</span>
                <p className="font-extrabold text-rose-600">₹{post.tripPlanSummary.totalCostEstimate.toLocaleString('en-IN')}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Author & Interactions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={post.authorAvatar}
              alt={post.authorName}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-200"
            />
            <div>
              <p className="text-xs font-bold text-slate-900">{post.authorName}</p>
              <p className="text-[10px] text-slate-500 flex items-center gap-1">
                <Calendar className="w-2.5 h-2.5" /> {post.date}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={(e) => {
                e.stopPropagation();
                onLikePost(post.id);
              }}
              className="flex items-center gap-1 text-xs font-bold text-slate-700 hover:text-rose-600 transition-colors cursor-pointer bg-slate-100 hover:bg-rose-50 px-2.5 py-1.5 rounded-xl"
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>{post.likesCount}</span>
            </motion.button>

            <motion.button
              whileHover={{ x: 3 }}
              onClick={() => onReadPost(post)}
              className="flex items-center gap-1 text-xs font-extrabold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
            >
              Read Story <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

