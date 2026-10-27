import React, { useState } from 'react';
import { FeedActivityItem, Workout } from '../../types';
import { defaultFeedActivityItems } from '../../data/mockDashboard';
import { useFitness } from '../../context/FitnessContext';
import {
  Flame,
  MessageSquare,
  Clock,
  Dumbbell,
  Sparkles,
  Share2,
  Check,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

interface FollowingFeedListProps {
  initialItems?: FeedActivityItem[];
}

export const FollowingFeedList: React.FC<FollowingFeedListProps> = ({
  initialItems = defaultFeedActivityItems
}) => {
  const {
    convertFromKg,
    userProfile,
    setCurrentScreen,
    cloneRoutineFromPost,
    showToast
  } = useFitness();

  const [feedItems, setFeedItems] = useState<FeedActivityItem[]>(initialItems);
  const [cheeredItemId, setCheeredItemId] = useState<string | null>(null);
  const [activeCommentDrawerId, setActiveCommentDrawerId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');

  const handleToggleKudos = (id: string) => {
    setFeedItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextGiven = !item.hasKudosGiven;
          const nextCount = nextGiven ? item.kudosCount + 1 : Math.max(0, item.kudosCount - 1);

          if (nextGiven) {
            setCheeredItemId(id);
            setTimeout(() => setCheeredItemId(null), 1200);
            showToast(`Cheered ${item.athleteName}! 🔥`);
          }

          return {
            ...item,
            hasKudosGiven: nextGiven,
            kudosCount: nextCount
          };
        }
        return item;
      })
    );
  };

  const handleAddComment = (id: string) => {
    if (!commentInput.trim()) return;
    setFeedItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, commentCount: (item.commentCount || 0) + 1 }
          : item
      )
    );
    setCommentInput('');
    setActiveCommentDrawerId(null);
    showToast('Comment sent to athlete feed');
  };

  return (
    <section aria-label="Zone 4: Following Feed" className="space-y-3.5">
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C7FF3D]" />
          <h2 className="text-xs font-black uppercase tracking-widest text-[#929895]">
            FOLLOWING FEED
          </h2>
        </div>
        <button
          type="button"
          onClick={() => setCurrentScreen('community')}
          className="text-[11px] font-bold text-[#C7FF3D] hover:underline flex items-center gap-0.5 active:scale-95 transition"
        >
          <span>View Club Feed</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Vertical Feed Cards */}
      <div className="space-y-3">
        {feedItems.map(item => {
          const formattedVolume = convertFromKg(item.volumeKg).toLocaleString();
          const isCheeredActive = cheeredItemId === item.id;
          const isDrawerOpen = activeCommentDrawerId === item.id;

          return (
            <article
              key={item.id}
              className="rounded-2xl sm:rounded-3xl bg-[#181A1B]/95 border border-white/10 hover:border-white/20 p-4 sm:p-5 shadow-xl transition-all duration-200 space-y-3 relative overflow-hidden"
            >
              {/* Header: User avatar, display name, handle, relative timestamp */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={item.athleteAvatar}
                      alt={item.athleteName}
                      className="w-10 h-10 rounded-full object-cover border border-[#C7FF3D]/40"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#101112] flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-[#C7FF3D]" />
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4 className="text-sm font-black text-white tracking-tight truncate">
                        {item.athleteName}
                      </h4>
                      {item.athleteHandle && (
                        <span className="text-[11px] font-semibold text-[#929895] truncate">
                          {item.athleteHandle}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-[#929895] font-medium">
                      {item.relativeTime || 'Recently'}
                    </p>
                  </div>
                </div>

                {item.routineClone && (
                  <button
                    type="button"
                    onClick={() => {
                      if (item.routineClone) {
                        cloneRoutineFromPost({
                          id: item.id,
                          authorId: 'cloned',
                          authorName: item.athleteName,
                          authorHandle: item.athleteHandle || '',
                          authorAvatar: item.athleteAvatar,
                          authorBadge: 'Athlete',
                          workoutTitle: item.sessionTitle,
                          workoutId: item.workoutId,
                          routineClone: item.routineClone,
                          createdAt: item.relativeTime || '',
                          durationSec: item.durationMinutes * 60,
                          totalVolumeKg: item.volumeKg,
                          totalSets: item.exerciseCount * 3,
                          perceivedRpe: 9,
                          prBadges: [],
                          targetMuscles: [],
                          notes: '',
                          kudosCount: item.kudosCount,
                          hasKudoed: item.hasKudosGiven,
                          comments: []
                        });
                      }
                    }}
                    className="p-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white/70 hover:text-white text-[10px] font-bold shrink-0 active:scale-95 transition"
                    title="Clone workout routine"
                  >
                    Clone
                  </button>
                )}
              </div>

              {/* Workout Title */}
              <div>
                <h3 className="text-base font-black text-white tracking-tight">
                  {item.sessionTitle}
                </h3>
              </div>

              {/* Stats Row: Volume (14,850 kg), Total Moves (7 exercises), Duration (63 mins) */}
              <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-black/40 border border-white/5 text-center">
                <div>
                  <div className="text-[9px] font-extrabold uppercase tracking-wider text-[#929895]">
                    Volume
                  </div>
                  <div className="text-xs sm:text-sm font-black text-white tracking-tight truncate mt-0.5">
                    {formattedVolume} {userProfile.unit}
                  </div>
                </div>

                <div className="border-x border-white/5">
                  <div className="text-[9px] font-extrabold uppercase tracking-wider text-[#929895]">
                    Total Moves
                  </div>
                  <div className="text-xs sm:text-sm font-black text-white tracking-tight truncate mt-0.5">
                    {item.exerciseCount} exercises
                  </div>
                </div>

                <div>
                  <div className="text-[9px] font-extrabold uppercase tracking-wider text-[#929895]">
                    Duration
                  </div>
                  <div className="text-xs sm:text-sm font-black text-white tracking-tight truncate mt-0.5">
                    {item.durationMinutes} mins
                  </div>
                </div>
              </div>

              {/* Social Actions: Kudos counter with fire icon, Comment count, quick Cheer button */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5 flex-wrap">
                <div className="flex items-center gap-2">
                  {/* Kudos counter with fire icon */}
                  <button
                    type="button"
                    onClick={() => handleToggleKudos(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all active:scale-95 border ${
                      item.hasKudosGiven
                        ? 'bg-[#FF9A58]/20 text-[#FF9A58] border-[#FF9A58]/40 shadow-sm'
                        : 'bg-white/[0.06] text-[#929895] hover:text-white border-white/10'
                    }`}
                  >
                    <Flame
                      className={`w-3.5 h-3.5 ${
                        item.hasKudosGiven
                          ? 'fill-[#FF9A58] text-[#FF9A58] animate-bounce'
                          : 'text-[#929895]'
                      }`}
                    />
                    <span>{item.kudosCount} Kudos</span>
                  </button>

                  {/* Comment count */}
                  <button
                    type="button"
                    onClick={() =>
                      setActiveCommentDrawerId(prev => (prev === item.id ? null : item.id))
                    }
                    className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-black text-[#929895] hover:text-white flex items-center gap-1.5 active:scale-95 transition"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>💬 {item.commentCount || 0}</span>
                  </button>
                </div>

                {/* Quick "Cheer" button */}
                <button
                  type="button"
                  onClick={() => handleToggleKudos(item.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 active:scale-95 transition-all shadow-md ${
                    item.hasKudosGiven
                      ? 'bg-[#C7FF3D] text-[#101112] shadow-[#C7FF3D]/30 ring-2 ring-[#C7FF3D]/40'
                      : 'bg-gradient-to-r from-[#C7FF3D] to-[#65D9C0] text-[#101112] hover:opacity-95'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 fill-[#101112]" />
                  <span>{item.hasKudosGiven ? 'Cheered! 🔥' : 'Cheer'}</span>
                </button>
              </div>

              {/* Cheered celebration badge popup */}
              {isCheeredActive && (
                <div className="absolute inset-0 bg-[#C7FF3D]/10 backdrop-blur-xs flex items-center justify-center pointer-events-none animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-4 py-2 rounded-2xl bg-[#101112]/90 border border-[#C7FF3D] text-[#C7FF3D] font-black text-sm flex items-center gap-2 shadow-2xl">
                    <Flame className="w-4 h-4 fill-[#C7FF3D]" />
                    <span>+1 KUDOS GIVEN! 🔥</span>
                  </div>
                </div>
              )}

              {/* Inline Comment Drawer */}
              {isDrawerOpen && (
                <div className="pt-2 border-t border-white/10 space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={`Cheer on ${item.athleteName.split(' ')[0]}...`}
                      value={commentInput}
                      onChange={e => setCommentInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAddComment(item.id)}
                      className="flex-1 bg-black/50 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white placeholder-[#929895] focus:outline-none focus:border-[#C7FF3D]"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddComment(item.id)}
                      className="px-3 py-1.5 rounded-xl bg-[#C7FF3D] text-[#101112] text-xs font-black active:scale-95 transition"
                    >
                      Post
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};
