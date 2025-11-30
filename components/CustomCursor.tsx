
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      const isClickable = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.closest('button') ||
        target.closest('.cursor-pointer') ||
        target.closest('.group');
      
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Main Follower Blob */}
      <motion.div
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          x: "-50%",
          y: "-50%"
        }}
        animate={{
          width: isHovering ? 64 : 24,
          height: isHovering ? 64 : 24,
          backgroundColor: isHovering ? "rgba(147, 51, 234, 0.1)" : "rgba(37, 99, 235, 0.15)",
          borderWidth: isHovering ? 1 : 2,
          borderColor: isHovering ? "rgba(147, 51, 234, 0.4)" : "rgba(37, 99, 235, 0.3)",
        }}
        transition={{
            type: "spring",
            damping: 20,
            stiffness: 300
        }}
        className="absolute rounded-full backdrop-blur-[2px] flex items-center justify-center"
      >
        {/* Inner Dot */}
        <motion.div 
            animate={{
                scale: isHovering ? 0.5 : 1
            }}
            className="w-1.5 h-1.5 bg-slate-800 rounded-full" 
        />
      </motion.div>
    </div>
  );
};
