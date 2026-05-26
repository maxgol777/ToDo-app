import { useState, type CSSProperties, type ReactNode } from "react";
import { useSwipeable } from "react-swipeable";

type SwipeToDeleteProps = {
  onDelete: () => void;
  children: ReactNode;
};

const THRESHOLD = 96;
const MAX_OFFSET = 220;
const ANIMATION_MS = 180;

export const SwipeToDelete = ({ onDelete, children }: SwipeToDeleteProps) => {
  const [offset, setOffset] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handlers = useSwipeable({
    onSwiping: ({ deltaX }) => {
      setIsSwiping(true);
      setOffset(Math.min(0, Math.max(-MAX_OFFSET, deltaX)));
    },
    onSwiped: ({ deltaX }) => {
      setIsSwiping(false);
      if (deltaX <= -THRESHOLD) {
        setIsClosing(true);
        setOffset(-MAX_OFFSET);
        window.setTimeout(onDelete, ANIMATION_MS);
        return;
      }
      setOffset(0);
    },
    trackMouse: false,
    preventScrollOnSwipe: true,
    delta: 8,
  });

  const cardStyle: CSSProperties = {
    transform: `translate3d(${offset}px, 0, 0)`,
    transition: isSwiping ? "none" : `transform ${ANIMATION_MS}ms ease-out, opacity ${ANIMATION_MS}ms ease-out`,
    opacity: isClosing ? 0 : 1,
  };

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

      <div {...handlers} style={cardStyle}>
        {children}
      </div>
    </div>
  );
};
