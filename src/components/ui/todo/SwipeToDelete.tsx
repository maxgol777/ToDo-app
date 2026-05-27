import { useState, type CSSProperties, type ReactNode } from "react";
import { useSwipeable } from "react-swipeable";

type SwipeToDeleteProps = {
  onDelete: () => void;
  children: ReactNode;
};

const THRESHOLD = 100;
const MAX_OFFSET = 250;
const ANIMATION_MS = 100;

export const SwipeToDelete = ({ onDelete, children }: SwipeToDeleteProps) => {
  const [offset, setOffset] = useState(0);

  const handlers = useSwipeable({
    onSwiping: ({ deltaX }) => {
      setOffset(Math.min(0, Math.max(-MAX_OFFSET, deltaX)));
    },
    onSwiped: ({ deltaX }) => {
      if (deltaX <= -THRESHOLD) {
        setOffset(-MAX_OFFSET);
        window.setTimeout(onDelete, ANIMATION_MS);
        return;
      }
      setOffset(0);
    },
    trackMouse: false,
    preventScrollOnSwipe: true,
    //  minimum finger movement before the library treats the gesture as a swipe
    delta: 8,
  });

  const cardStyle: CSSProperties = { transform: `translate3d(${offset}px, 0, 0)` };

  return (
    <div className="relative w-full touch-pan-y overflow-hidden rounded-2xl">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-end gap-2 rounded-2xl bg-linear-to-l from-red-500 to-rose-500 pr-6 text-white"
        style={{ opacity: Math.min(1, Math.abs(offset) / THRESHOLD) }}
      >
        <span className="text-2xl font-bold leading-none">×</span>
        <span className="text-sm font-semibold uppercase tracking-wider">Delete</span>
      </div>

      <div
        //copies every property from the handlers object as props
        {...handlers}
        style={cardStyle}
      >
        {children}
      </div>
    </div>
  );
};
