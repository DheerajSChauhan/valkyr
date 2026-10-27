import React, { useRef } from 'react';
import { CatalogRoutinePlan } from '../../types';
import { ChevronLeft, ChevronRight, Sparkles, Copy, Layers, ArrowUpRight } from 'lucide-react';

interface FamousSplitsCarouselProps {
  routines: CatalogRoutinePlan[];
  onSelectRoutine: (routine: CatalogRoutinePlan) => void;
  activeFilter?: string;
}

export const FamousSplitsCarousel: React.FC<FamousSplitsCarouselProps> = ({
  routines,
  onSelectRoutine,
  activeFilter = 'All'
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Filter routines if a quick-filter is active
  const filteredRoutines = routines.filter(r => {
    if (activeFilter === 'All') return true;
    if (activeFilter === '3-Day') return r.daysPerWeek === 3;
    if (activeFilter === '4-Day') return r.daysPerWeek === 4;
    if (activeFilter === 'PPL') return r.tags.includes('PPL') || r.title.toLowerCase().includes('ppl');
    if (activeFilter === 'Hypertrophy') return r.goal.toLowerCase().includes('hypertrophy');
    if (activeFilter === 'Strength') return r.goal.toLowerCase().includes('strength');
    return true;
  });

  if (filteredRoutines.length === 0) {
    return null;
  }

  return (
    <section aria-label="Featured Famous Splits" className="space-y-3">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#C7FF3D]/10 flex items-center justify-center text-[#C7FF3D]">
            <Sparkles className="w-3.5 h-3.5 fill-[#C7FF3D]" />
          </div>
          <h2 className="text-sm sm:text-base font-black text-white tracking-tight">
            Featured / Famous Splits
          </h2>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/[0.06] text-[#929895]">
            Gold Standard
          </span>
        </div>

        {/* Carousel Scroll Arrows */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="p-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white/70 hover:text-white transition active:scale-90"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="p-1 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-white/70 hover:text-white transition active:scale-90"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={scrollContainerRef}
        tabIndex={0}
        role="region"
        aria-label="Famous splits carousel"
        className="flex items-stretch gap-3 overflow-x-auto no-scrollbar py-1 scroll-smooth"
      >
        {filteredRoutines.map(routine => (
          <article
            key={routine.id}
            className="shrink-0 w-[240px] sm:w-[260px] rounded-2xl bg-[#161819] border border-white/10 hover:border-[#C7FF3D]/50 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg group"
          >
            {/* Card Cover Image */}
            <div className="relative h-28 w-full overflow-hidden shrink-0">
              <img
                src={routine.coverImage}
                alt={routine.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161819] via-transparent to-black/30" />

              {/* Floating Badges: Days/Week & Target Goal */}
              <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between gap-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded-md bg-[#101112]/80 backdrop-blur-md text-[#C7FF3D] border border-[#C7FF3D]/30 text-[10px] font-black uppercase tracking-wider">
                  {routine.daysBadge}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#101112]/80 backdrop-blur-md text-white/90 border border-white/15 text-[9px] font-bold truncate max-w-[120px]">
                  {routine.goalBadge}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-black uppercase tracking-wider text-[#929895] block truncate">
                  {routine.author}
                </span>
                <h3 className="text-sm font-black text-white group-hover:text-[#C7FF3D] transition line-clamp-1">
                  {routine.shortTitle || routine.title}
                </h3>
                <p className="text-[10px] text-[#929895] line-clamp-2 mt-0.5 leading-relaxed">
                  {routine.description}
                </p>
              </div>

              {/* Primary Action Button: "Preview & Clone" */}
              <div className="pt-2 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => onSelectRoutine(routine)}
                  className="w-full py-2 px-3 rounded-xl bg-white/[0.08] hover:bg-[#C7FF3D] text-white hover:text-[#101112] text-xs font-black transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] group/btn"
                >
                  <Copy className="w-3.5 h-3.5 text-[#C7FF3D] group-hover/btn:text-[#101112]" />
                  <span>Preview & Clone</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
