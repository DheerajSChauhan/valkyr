import React, { useState } from 'react';
import { useFitness } from '../context/FitnessContext';
import { initialClubLeaderboard } from '../data/mockCommunity';
import { GlassCard } from '../components/common/GlassCard';
import {
  Flame,
  MessageSquare,
  CopyPlus,
  Trophy,
  Users,
  Award,
  Clock,
  Dumbbell,
  Cloud,
  RefreshCw,
  Send
} from 'lucide-react';

export const CommunityScreen: React.FC = () => {
  const {
    communityPosts,
    toggleKudos,
    addComment,
    cloneRoutineFromPost,
    userProfile,
    convertFromKg,
    pbOnline,
    pbQueueCount,
    triggerCloudSync
  } = useFitness();

  const [activeTab, setActiveTab] = useState<'feed' | 'clubs'>('feed');
  const [rankSort, setRankSort] = useState<'dots' | 'volume' | 'streak'>('dots');
  const [openCommentsPostId, setOpenCommentsPostId] = useState<string | null>(null);
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});

  // Merge current user's live stats into Club Leaderboard
  const sortedLeaderboard = [...initialClubLeaderboard]
    .map(m =>
      m.isCurrentUser
        ? {
            ...m,
            name: userProfile.name,
            handle: userProfile.handle || '@alex_valkyr',
            avatar: userProfile.avatar,
            streakDays: userProfile.streakDays
          }
        : m
    )
    .sort((a, b) => {
      if (rankSort === 'dots') return b.dotsScore - a.dotsScore;
      if (rankSort === 'volume') return b.monthlyVolumeKg - a.monthlyVolumeKg;
      return b.streakDays - a.streakDays;
    });

  // Club Monthly Tonnage Challenge (1,000,000 kg target)
  const totalClubVolumeKg = sortedLeaderboard.reduce((acc, m) => acc + m.monthlyVolumeKg, 0);
  const challengeGoalKg = 750000;
  const challengePct = Math.min(100, Math.round((totalClubVolumeKg / challengeGoalKg) * 100));

  return (
    <div className="space-y-5 pb-28">
      {/* Header & PocketBase Live Status Pill */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Valkyr Social Club
          </h1>
          <p className="text-xs text-[#929895] font-medium">
            Strava-grade workout feed, Kudos, routine cloning & DOTS leaderboards
          </p>
        </div>

        <button
          type="button"
          onClick={triggerCloudSync}
          className={`px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 border transition ${
            pbOnline
              ? 'bg-[#C7FF3D]/15 text-[#C7FF3D] border-[#C7FF3D]/30'
              : 'btn-glass-subtle text-[#929895] hover:text-white'
          }`}
          title="Sync with PocketBase backend"
        >
          <Cloud className="w-3.5 h-3.5" />
          <span>{pbOnline ? 'PocketBase Live' : `Offline Queue (${pbQueueCount})`}</span>
          <RefreshCw className="w-3 h-3" />
        </button>
      </div>

      {/* Sub-navigation Tabs: Activity Feed vs Clubs & Leaderboards */}
      <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-[#1C1F20] border border-white/10">
        <button
          type="button"
          onClick={() => setActiveTab('feed')}
          className={`py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition ${
            activeTab === 'feed'
              ? 'bg-[#C7FF3D] text-[#101112] shadow-md'
              : 'text-[#929895] hover:text-white'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>Live Activity Feed</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('clubs')}
          className={`py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition ${
            activeTab === 'clubs'
              ? 'bg-[#C7FF3D] text-[#101112] shadow-md'
              : 'text-[#929895] hover:text-white'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>Clubs & Leaderboards</span>
        </button>
      </div>

      {activeTab === 'feed' ? (
        <div className="space-y-4">
          {communityPosts.map(post => {
            const mins = Math.floor(post.durationSec / 60);
            const volDisplay = convertFromKg(post.totalVolumeKg);
            const isCommentsOpen = openCommentsPostId === post.id;

            return (
              <GlassCard key={post.id} variant="standard" className="p-4 sm:p-5 space-y-3.5">
                {/* Author Row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-10 h-10 rounded-full object-cover border border-[#C7FF3D]/40 shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs sm:text-sm font-black text-white truncate">
                          {post.authorName}
                        </h4>
                        <span className="text-[10px] text-[#929895] truncate">
                          {post.authorHandle}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-[#C7FF3D] font-bold">
                        <span>{post.authorBadge}</span>
                        <span className="text-[#929895]">• {post.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Steal Routine Button */}
                  <button
                    type="button"
                    onClick={() => cloneRoutineFromPost(post)}
                    className="btn-glass-subtle px-2.5 py-1.5 rounded-xl text-[11px] font-bold text-[#C7FF3D] border-[#C7FF3D]/30 hover:border-[#C7FF3D] flex items-center gap-1 shrink-0"
                    title="Clone this workout into your library"
                  >
                    <CopyPlus className="w-3.5 h-3.5" />
                    <span>Steal Routine</span>
                  </button>
                </div>

                {/* Workout Title & Notes */}
                <div className="space-y-1">
                  <h3 className="text-base font-black text-white tracking-tight">
                    {post.workoutTitle}
                  </h3>
                  {post.notes && (
                    <p className="text-xs text-[#929895] leading-relaxed">{post.notes}</p>
                  )}
                </div>

                {/* 3 Session Metrics Strip */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-[#151718] border border-white/[0.06] text-center">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#929895] flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3 text-[#C7FF3D]" /> Time
                    </div>
                    <div className="text-xs sm:text-sm font-black text-white tabular-nums mt-0.5">
                      {mins}m
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#929895] flex items-center justify-center gap-1">
                      <Dumbbell className="w-3 h-3 text-[#65D9C0]" /> Volume
                    </div>
                    <div className="text-xs sm:text-sm font-black text-white tabular-nums mt-0.5">
                      {volDisplay.toLocaleString()} {userProfile.unit}
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#929895]">
                      Sets • RPE
                    </div>
                    <div className="text-xs sm:text-sm font-black text-[#FF9A58] tabular-nums mt-0.5">
                      {post.totalSets} sets • @{post.perceivedRpe}
                    </div>
                  </div>
                </div>

                {/* PR Badges */}
                {post.prBadges.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {post.prBadges.map((pr, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#FF9A58]/15 text-[#FF9A58] border border-[#FF9A58]/30 flex items-center gap-1"
                      >
                        <Award className="w-3 h-3" />
                        <span>{pr}</span>
                      </span>
                    ))}
                  </div>
                )}

                {/* Muscle Split Chips */}
                <div className="flex flex-wrap gap-1">
                  {post.targetMuscles.map(m => (
                    <span
                      key={m}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-white/[0.05] text-[#929895]"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                {/* Kudos & Comment Action Bar */}
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleKudos(post.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition ${
                        post.hasKudoed
                          ? 'bg-[#C7FF3D] text-[#101112] shadow-md shadow-[#C7FF3D]/20'
                          : 'btn-glass-subtle text-white hover:text-[#C7FF3D]'
                      }`}
                    >
                      <Flame className={`w-3.5 h-3.5 ${post.hasKudoed ? 'fill-[#101112]' : ''}`} />
                      <span>{post.kudosCount} Kudos</span>
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setOpenCommentsPostId(isCommentsOpen ? null : post.id)
                      }
                      className="btn-glass-subtle px-3 py-1.5 rounded-xl text-xs font-bold text-[#929895] hover:text-white flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{post.comments.length}</span>
                    </button>
                  </div>

                  <span className="text-[10px] text-[#929895] font-semibold">
                    Verified Session
                  </span>
                </div>

                {/* Expandable Comments Drawer */}
                {isCommentsOpen && (
                  <div className="pt-2 space-y-2.5 border-t border-white/[0.06]">
                    {post.comments.length > 0 ? (
                      <div className="space-y-2">
                        {post.comments.map(c => (
                          <div
                            key={c.id}
                            className="p-2.5 rounded-xl bg-[#151718] border border-white/[0.05] flex items-start gap-2.5 text-xs"
                          >
                            <img
                              src={c.authorAvatar}
                              alt={c.authorName}
                              className="w-6 h-6 rounded-full object-cover shrink-0 mt-0.5"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-white">{c.authorName}</span>
                                <span className="text-[10px] text-[#929895]">{c.createdAt}</span>
                              </div>
                              <p className="text-[#929895] mt-0.5">{c.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-[#929895] italic">
                        No comments yet. Drop some encouragement!
                      </p>
                    )}

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        value={commentDrafts[post.id] || ''}
                        onChange={e =>
                          setCommentDrafts(prev => ({ ...prev, [post.id]: e.target.value }))
                        }
                        onKeyDown={e => {
                          if (e.key === 'Enter' && commentDrafts[post.id]?.trim()) {
                            addComment(post.id, commentDrafts[post.id]);
                            setCommentDrafts(prev => ({ ...prev, [post.id]: '' }));
                          }
                        }}
                        className="flex-1 bg-[#151718] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#C7FF3D]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (!commentDrafts[post.id]?.trim()) return;
                          addComment(post.id, commentDrafts[post.id]);
                          setCommentDrafts(prev => ({ ...prev, [post.id]: '' }));
                        }}
                        className="btn-electric-lime px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </GlassCard>
            );
          })}
        </div>
      ) : (
        <div className="space-y-5">
          {/* Monthly Club Tonnage Challenge Card */}
          <GlassCard variant="elevated" className="p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#C7FF3D]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#C7FF3D]">
                  OCTOBER CLUB CHALLENGE • VALKYR HYPERTROPHY CREW
                </span>
              </div>
              <span className="text-xs font-black text-white tabular-nums">{challengePct}%</span>
            </div>

            <h3 className="text-base sm:text-lg font-black text-white">
              Group Monthly Tonnage Target:{' '}
              {convertFromKg(challengeGoalKg).toLocaleString()} {userProfile.unit}
            </h3>

            <div className="w-full h-2.5 bg-white/[0.08] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C7FF3D] to-[#65D9C0] rounded-full transition-all"
                style={{ width: `${challengePct}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-[#929895]">
              <span>
                Logged:{' '}
                <strong className="text-white">
                  {convertFromKg(totalClubVolumeKg).toLocaleString()} {userProfile.unit}
                </strong>
              </span>
              <span>4 Active Lifters Contributing</span>
            </div>
          </GlassCard>

          {/* Leaderboard Sort Controls */}
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-black uppercase tracking-wider text-[#929895]">
              Normalized Club Standings
            </span>
            <div className="flex items-center gap-1 bg-[#1C1F20] p-1 rounded-xl border border-white/10">
              {[
                { id: 'dots', label: 'Relative Strength (DOTS)' },
                { id: 'volume', label: 'Monthly Volume' },
                { id: 'streak', label: 'Streak' }
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setRankSort(tab.id as 'dots' | 'volume' | 'streak')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition ${
                    rankSort === tab.id
                      ? 'bg-[#C7FF3D] text-[#101112]'
                      : 'text-[#929895] hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Leaderboard List */}
          <div className="space-y-2.5">
            {sortedLeaderboard.map((member, idx) => (
              <GlassCard
                key={member.id}
                variant={member.isCurrentUser ? 'elevated' : 'standard'}
                className={`p-3.5 sm:p-4 flex items-center justify-between gap-3 ${
                  member.isCurrentUser ? 'border-[#C7FF3D]/40' : ''
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-full font-black text-xs flex items-center justify-center shrink-0 ${
                      idx === 0
                        ? 'bg-[#C7FF3D] text-[#101112]'
                        : idx === 1
                        ? 'bg-[#65D9C0]/25 text-[#65D9C0]'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    #{idx + 1}
                  </div>
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/15 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs sm:text-sm font-black text-white truncate">
                        {member.name}
                      </h4>
                      {member.isCurrentUser && (
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-[#C7FF3D] text-[#101112]">
                          YOU
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-[#929895] truncate">
                      BW: {convertFromKg(member.bodyWeightKg)} {userProfile.unit} • Best:{' '}
                      <strong className="text-white/90">{member.topLift}</strong>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  {rankSort === 'dots' && (
                    <>
                      <div className="text-sm font-black text-[#C7FF3D] tabular-nums">
                        {member.dotsScore} DOTS
                      </div>
                      <div className="text-[10px] text-[#929895]">Bodyweight Normalized</div>
                    </>
                  )}
                  {rankSort === 'volume' && (
                    <>
                      <div className="text-sm font-black text-[#65D9C0] tabular-nums">
                        {Math.round(convertFromKg(member.monthlyVolumeKg) / 1000)}k{' '}
                        {userProfile.unit}
                      </div>
                      <div className="text-[10px] text-[#929895]">Monthly Tonnage</div>
                    </>
                  )}
                  {rankSort === 'streak' && (
                    <>
                      <div className="text-sm font-black text-[#FF9A58] tabular-nums">
                        🔥 {member.streakDays} Days
                      </div>
                      <div className="text-[10px] text-[#929895]">Consistency Streak</div>
                    </>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
