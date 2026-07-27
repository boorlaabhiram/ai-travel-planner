import React, { useState } from 'react';
import { X, Heart, MessageSquare, Share2, Calendar, MapPin, Sparkles, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPost, Comment } from '../types';

interface BlogReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onLikePost: (id: string) => void;
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({ post, onClose, onLikePost }) => {
  const [comments, setComments] = useState<Comment[]>([
    { id: 'c1', authorName: 'Elena Rostova', authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', text: 'Incredible guide! The hotel recommendation was spot on.', createdAt: '2 hours ago' },
    { id: 'c2', authorName: 'Marco Diaz', authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', text: 'Heading on this exact drive next month. Thanks for sharing!', createdAt: '5 hours ago' },
  ]);
  const [newCommentText, setNewCommentText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!post) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const commentObj: Comment = {
      id: `c-${Date.now()}`,
      authorName: 'Abhiram Boorla',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
      text: newCommentText.trim(),
      createdAt: 'Just now',
    };
    setComments([commentObj, ...comments]);
    setNewCommentText('');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 relative my-8"
        >
          {/* Cover Header */}
          <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-900">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-900 text-white p-2.5 rounded-full backdrop-blur-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title on Hero */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {post.origin} → {post.destination}
                </span>
              </div>
              <h1 className="font-extrabold text-2xl sm:text-4xl font-bold leading-tight drop-shadow-md">
                {post.title}
              </h1>
            </div>
          </div>

          {/* Story Body */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Author Meta */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-rose-500/30"
                />
                <div>
                  <p className="font-bold text-slate-900 text-sm sm:text-base">{post.authorName}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" /> Published on {post.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onLikePost(post.id)}
                  className="flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-rose-600" /> {post.likesCount}
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" /> {copiedLink ? 'Copied Link!' : 'Share'}
                </button>
              </div>
            </div>

            {/* Trip Summary Card if present */}
            {post.tripPlanSummary && (
              <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-blue-50 p-5 rounded-2xl border border-rose-100/80 space-y-3">
                <h4 className="text-xs font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Key Trip Stats
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500">Route Distance</span>
                    <p className="font-bold text-slate-900">{post.tripPlanSummary.distanceKm} km</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Duration</span>
                    <p className="font-bold text-slate-900">{post.tripPlanSummary.durationText}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Total Expense</span>
                    <p className="font-bold text-rose-600">₹{post.tripPlanSummary.totalCostEstimate.toLocaleString('en-IN')}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Top Stay</span>
                    <p className="font-bold text-slate-900 truncate">{post.tripPlanSummary.hotelName}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Markdown / Article Content */}
            <div className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4">
              {post.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="font-bold text-xl text-slate-900 pt-3 border-t border-slate-100">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                return <p key={idx}>{paragraph}</p>;
              })}
            </div>

            {/* Comment Section */}
            <div className="pt-8 border-t border-slate-100 space-y-4">
              <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-rose-600" /> Travel Discussions ({comments.length})
              </h3>

              {/* Comment Form */}
              <form onSubmit={handleAddComment} className="flex gap-2">
                <input
                  type="text"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Write a comment or ask a question about this trip..."
                  className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                />
                <button
                  type="submit"
                  className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" /> Post
                </button>
              </form>

              {/* Comments List */}
              <div className="space-y-3 pt-2">
                {comments.map((c) => (
                  <div key={c.id} className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex items-start gap-3 text-xs">
                    <img src={c.authorAvatar} alt={c.authorName} className="w-8 h-8 rounded-full object-cover mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-slate-900">{c.authorName}</span>
                        <span className="text-[10px] text-slate-400">{c.createdAt}</span>
                      </div>
                      <p className="text-slate-700">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

