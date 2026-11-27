import React, { useRef } from 'react';

interface PosterItem {
  id: string;
  bgColor: string;
  textColor: string;
  headline: string;
  tagline: string;
}

const POSTERS: PosterItem[] = [
  {
    id: 'poster-1',
    bgColor: '#1428D0',
    textColor: '#FBF1DC',
    headline: 'Home cooking.',
    tagline: 'Raw to cooked, with oil and ghee counted.'
  },
  {
    id: 'poster-2',
    bgColor: '#EBB945',
    textColor: '#000000',
    headline: 'Every pan.',
    tagline: 'Cooking oil is part of the meal, so it is part of the log.'
  },
  {
    id: 'poster-3',
    bgColor: '#7C0F0F',
    textColor: '#FBF1DC',
    headline: 'Protein.',
    tagline: 'Set a target and see where each day lands.'
  },
  {
    id: 'poster-4',
    bgColor: '#E4501A',
    textColor: '#FBF1DC',
    headline: 'Every macro.',
    tagline: 'Carbs and fibre included from the first log.'
  },
  {
    id: 'poster-5',
    bgColor: '#0C1026',
    textColor: '#FBF1DC',
    headline: 'Training days.',
    tagline: 'Clear targets for the days you lift.'
  },
  {
    id: 'poster-6',
    bgColor: '#8C2208',
    textColor: '#FBF1DC',
    headline: 'Scan it.',
    tagline: 'Scan packaged foods to log them faster.'
  }
];

export const PosterStrip: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = 420;
      scrollContainerRef.current.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
    }
  };

  const navBtnClass =
    'bg-[rgba(251,241,220,0.08)] border border-[rgba(251,241,220,0.25)] text-cream w-[38px] h-[38px] rounded-[4px] text-[16px] inline-flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-cream hover:text-black';

  return (
    <section
      className="relative w-full bg-black pt-[60px] pb-20 overflow-hidden"
      aria-label="Editorial Poster Exhibition Strip"
    >
      <div className="max-w-[1400px] mx-auto px-10 pb-6 max-md:px-5 max-md:pb-[18px] flex justify-between items-end border-b border-[rgba(251,241,220,0.15)]">
        <div className="flex flex-col gap-1" />
        <div className="flex gap-2">
          <button
            type="button"
            className={navBtnClass}
            onClick={() => scrollByAmount(-1)}
            aria-label="Previous plate"
          >
            ←
          </button>
          <button
            type="button"
            className={navBtnClass}
            onClick={() => scrollByAmount(1)}
            aria-label="Next plate"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-6 max-md:gap-4 py-8 px-10 max-md:py-6 max-md:px-5 overflow-x-auto snap-x snap-mandatory [scrollbar-width:thin] [scrollbar-color:rgba(255,138,31,0.4)_transparent] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-[rgba(255,138,31,0.4)] [&::-webkit-scrollbar-thumb]:rounded"
        tabIndex={0}
        role="region"
        aria-label="Horizontal plate archive strip"
      >
        {POSTERS.map((poster) => (
          <div
            key={poster.id}
            className="flex-[0_0_380px] h-[480px] max-md:flex-[0_0_300px] max-md:h-[420px] max-md:p-6 rounded-[4px] relative overflow-hidden flex flex-col justify-between p-8 snap-start shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)] border border-white/12 transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-1 hover:shadow-[0_28px_60px_-10px_rgba(0,0,0,0.9)]"
            style={{ backgroundColor: poster.bgColor, color: poster.textColor }}
          >
            <div className="my-auto">
              <h3 className="font-display text-[38px] max-md:text-[30px] leading-[1.05] uppercase mb-5">
                {poster.headline}
              </h3>
            </div>

            <div className="flex justify-between items-end border-t border-current pt-3.5 gap-3">
              <span className="font-sans text-[13px] font-semibold leading-[1.35]">{poster.tagline}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
