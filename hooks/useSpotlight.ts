import { MouseEvent, useRef, useCallback } from 'react';

export const useSpotlight = () => {
  const frameRef = useRef<number>(0);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const clientX = e.clientX;
    const clientY = e.clientY;
    
    // Cancel any pending frame to ensure we only run the latest update
    if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
    }
    
    frameRef.current = requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        target.style.setProperty('--mouse-x', `${x}px`);
        target.style.setProperty('--mouse-y', `${y}px`);
    });
  }, []);

  return handleMouseMove;
};