import React from 'react';

interface MarqueeRibbonProps {
  items?: string[];
  backgroundColor?: string;
  textColor?: string;
}

const DEFAULT_ITEMS = [
  'Carbohydrates, fibre, protein, fat',
  'Raw to cooked yield',
  'Adaptive targets',
  'Barcode scanner',
  'Built for the floor'
];

export const MarqueeRibbon: React.FC<MarqueeRibbonProps> = ({
  items = DEFAULT_ITEMS,
  backgroundColor,
  textColor
}) => {
  const customStyle: React.CSSProperties = {};
  if (backgroundColor) customStyle.backgroundColor = backgroundColor;
  if (textColor) customStyle.color = textColor;

  const itemClass =
    'font-display text-[clamp(1.2rem,2.5vw,1.8rem)] uppercase tracking-[0.04em] px-9 inline-flex items-center gap-9 whitespace-nowrap';
  const bulletClass = 'inline-block w-2 h-2 rounded-full bg-black shrink-0';

  // Render two identical groups inside marquee track for a seamless 50% shift loop with zero gaps
  return (
    <div
      data-testid="marquee-ribbon"
      className="w-full overflow-hidden bg-saffron text-black py-4 flex select-none border-t-2 border-b-2 border-black relative"
      style={customStyle}
      aria-hidden="true"
    >
      <div className="flex w-max shrink-0 animate-[marqueeScroll_24s_linear_infinite] will-change-transform motion-reduce:[animation-play-state:paused]">
        <div className="flex items-center shrink-0">
          {items.map((item, idx) => (
            <span key={`g1-${idx}`} data-testid="marquee-item" className={itemClass}>
              {item}
              <span className={bulletClass} style={{ backgroundColor: textColor || '#000000' }} />
            </span>
          ))}
        </div>
        <div className="flex items-center shrink-0">
          {items.map((item, idx) => (
            <span key={`g2-${idx}`} className={itemClass}>
              {item}
              <span className={bulletClass} style={{ backgroundColor: textColor || '#000000' }} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
