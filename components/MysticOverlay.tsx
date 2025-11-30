import React, { useEffect, useState, memo } from 'react';
import { motion } from 'framer-motion';

interface MysticOverlayProps {
  onComplete: () => void;
}

interface Star {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: string;
  delay: string;
  color: string;
  opacity: number;
}

export const MysticOverlay: React.FC<MysticOverlayProps> = memo(({ onComplete }) => {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate random stars
    const starCount = 80;
    const newStars: Star[] = [];
    const colors = ['#ffffff', '#e879f9', '#60a5fa', '#facc15']; // White, Purple, Blue, Gold

    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        left: `${Math.random() * 100}%`,
        // Start them at different heights off-screen so they don't all enter at once
        top: `${Math.random() * -150}%`, 
        size: Math.random() * 3 + 2, // 2px to 5px
        duration: `${Math.random() * 1.5 + 2}s`, // Increased duration for smoother fall
        delay: `${Math.random() * 0.2}s`,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.6 + 0.4 // Random opacity for depth
      });
    }
    setStars(newStars);

    // Auto close after animation
    const timer = setTimeout(() => {
      onComplete();
    }, 3500); 

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, backdropFilter: "blur(0px)", backgroundColor: "rgba(15, 23, 42, 0)" }}
      animate={{ opacity: 1, backdropFilter: "blur(16px)", backgroundColor: "rgba(15, 23, 42, 0.4)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)", backgroundColor: "rgba(15, 23, 42, 0)" }}
      transition={{ 
        duration: 1.0, 
        ease: [0.22, 1, 0.36, 1] // Custom Bezier for luxurious smooth feel (EaseOutQuint-ish)
      }}
      className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center"
    >
      {/* Stars Container */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star absolute rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              backgroundColor: star.color,
              animationDuration: star.duration,
              animationDelay: star.delay,
              opacity: star.opacity
            }}
          />
        ))}
      </div>

      {/* Center Text Effect - Spring Animation */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 1.05, opacity: 0, y: -30 }}
        transition={{ 
            type: "spring", 
            stiffness: 80, 
            damping: 20,
            mass: 1.2,
            delay: 0.2 
        }}
        className="relative z-10"
      >
         <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-[0_0_30px_rgba(168,85,247,0.6)] tracking-tighter text-center">
           MYSTIC<br/>GUIDE
         </h1>
         <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-white/80 text-center mt-4 font-bold tracking-widest uppercase text-sm"
         >
            Unveiling Arcane Secrets
         </motion.p>
      </motion.div>
    </motion.div>
  );
});

MysticOverlay.displayName = 'MysticOverlay';