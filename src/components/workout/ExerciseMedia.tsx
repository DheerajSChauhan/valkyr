import React, { useState, useEffect } from 'react';
import { Play, Film, Volume2, VolumeX, ExternalLink } from 'lucide-react';
import { Exercise } from '../../types';
import { resolveGifUrlForExercise } from '../../data/exerciseGymGifs';

interface ExerciseMediaProps {
  exercise: Pick<Exercise, 'id' | 'name' | 'mediaUrl' | 'equipment' | 'targetMuscle'>;
  className?: string;
  showBadge?: boolean;
}

// High-craft animated SVG biomechanical fallback when offline or before remote GIF resolves
const AnimatedBiomechanicalFallback: React.FC<{
  name: string;
  targetMuscle?: string;
  equipment?: string;
  className?: string;
}> = ({ name, targetMuscle = 'Muscle', equipment = 'Gym', className = '' }) => {
  const m = targetMuscle.toLowerCase();
  const isLower =
    m.includes('quad') || m.includes('ham') || m.includes('glute') || m.includes('calf') || m.includes('leg');
  const isPull = m.includes('lat') || m.includes('back') || m.includes('bicep') || m.includes('trap');
  const accent = isLower ? '#65D9C0' : isPull ? '#FF9A58' : '#C7FF3D';

  return (
    <div
      className={`relative overflow-hidden flex flex-col items-center justify-center bg-gradient-to-br from-[#171A1C] via-[#121416] to-[#191D1F] border border-white/10 select-none ${className}`}
      title={`${name} animated demonstration`}
    >
      <svg viewBox="0 0 100 100" className="w-4/5 h-4/5" aria-hidden="true">
        <defs>
          <radialGradient id={`glow-${name.length}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.26" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="42" fill={`url(#glow-${name.length})`} />
        {/* Animated Kinetic Barbell / Cable Path */}
        <g stroke={accent} strokeWidth="3.5" strokeLinecap="round" fill="none">
          <line x1="22" y1="50" x2="78" y2="50">
            <animate
              attributeName="y1"
              values="58;36;58"
              dur="1.8s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y2"
              values="58;36;58"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </line>
          <rect x="15" y="38" width="7" height="24" rx="2.5" fill={accent}>
            <animate
              attributeName="y"
              values="46;24;46"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="78" y="38" width="7" height="24" rx="2.5" fill={accent}>
            <animate
              attributeName="y"
              values="46;24;46"
              dur="1.8s"
              repeatCount="indefinite"
            />
          </rect>
        </g>
        {/* Target Muscle Pulse Node */}
        <circle cx="50" cy="68" r="6" fill={accent} opacity="0.85">
          <animate attributeName="r" values="4.5;7.5;4.5" dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
        </circle>
      </svg>
      <span
        className="absolute bottom-1 right-1 text-[8px] font-black uppercase px-1.5 py-0.2 rounded bg-black/75 border border-white/10 tracking-wider"
        style={{ color: accent }}
      >
        GIF
      </span>
      <span className="sr-only">{equipment}</span>
    </div>
  );
};

export const ExerciseMedia: React.FC<ExerciseMediaProps> = ({
  exercise,
  className = '',
  showBadge = true
}) => {
  const [hasError, setHasError] = useState(false);

  const resolvedCatalogGif = resolveGifUrlForExercise(
    exercise.name,
    exercise.equipment,
    exercise.targetMuscle
  );

  const candidateUrl =
    (exercise.mediaUrl && (exercise.mediaUrl.startsWith('http') || exercise.mediaUrl.startsWith('data:'))
      ? exercise.mediaUrl
      : undefined) ||
    resolvedCatalogGif ||
    exercise.mediaUrl ||
    `/exercises/${encodeURIComponent(exercise.id)}.gif`;

  useEffect(() => {
    setHasError(false);
  }, [candidateUrl, exercise.name]);

  if (hasError || !candidateUrl) {
    return (
      <AnimatedBiomechanicalFallback
        name={exercise.name}
        targetMuscle={exercise.targetMuscle}
        equipment={exercise.equipment}
        className={className}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#151718] ${className}`}>
      <img
        src={candidateUrl}
        alt={`${exercise.name} GIF demonstration`}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={() => setHasError(true)}
      />
      {showBadge && (
        <span className="absolute bottom-1 right-1 text-[8px] font-black uppercase px-1.5 py-0.2 rounded bg-black/75 text-[#C7FF3D] border border-[#C7FF3D]/30 backdrop-blur-sm">
          GIF
        </span>
      )}
    </div>
  );
};

interface ExerciseAutoplayPlayerProps {
  videoId: string;
  videoStart?: number;
  title: string;
  onSwitchToGif?: () => void;
}

export const ExerciseAutoplayEmbed: React.FC<ExerciseAutoplayPlayerProps> = ({
  videoId,
  videoStart = 0,
  title,
  onSwitchToGif
}) => {
  const [isMuted, setIsMuted] = useState(true);

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?start=${
    videoStart || 0
  }&autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${videoId}&playsinline=1&rel=0&modestbranding=1`;

  return (
    <div className="space-y-2 animate-in fade-in duration-200">
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#C7FF3D] animate-pulse shrink-0" />
          <span className="text-[10px] font-black uppercase tracking-wider text-[#C7FF3D] truncate">
            YouTube Auto-Play Form Demo • {title}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => setIsMuted(m => !m)}
            className="btn-glass-subtle px-2 py-1 rounded-lg text-[10px] font-bold text-white flex items-center gap-1 hover:border-[#C7FF3D]/50"
            title={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3 h-3 text-[#FF9A58]" />
                <span>Unmute</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3 h-3 text-[#C7FF3D]" />
                <span>Sound On</span>
              </>
            )}
          </button>
          <a
            href={`https://www.youtube.com/watch?v=${videoId}${videoStart ? `&t=${videoStart}s` : ''}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glass-subtle px-2 py-1 rounded-lg text-[10px] font-bold text-[#929895] hover:text-white flex items-center gap-1"
            title="Open on YouTube"
          >
            <ExternalLink className="w-3 h-3" />
            <span className="hidden sm:inline">YouTube</span>
          </a>
          {onSwitchToGif && (
            <button
              type="button"
              onClick={onSwitchToGif}
              className="px-2 py-1 rounded-lg text-[10px] font-black bg-[#C7FF3D]/15 text-[#C7FF3D] border border-[#C7FF3D]/30 hover:bg-[#C7FF3D] hover:text-[#101112] transition flex items-center gap-1"
            >
              <Film className="w-3 h-3" />
              <span>GIF View</span>
            </button>
          )}
        </div>
      </div>

      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black border border-[#C7FF3D]/30 shadow-xl">
        <iframe
          key={`${videoId}-${isMuted ? 'muted' : 'unmuted'}`}
          className="w-full h-full"
          src={embedUrl}
          title={`${title} YouTube Exercise Demo`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};
