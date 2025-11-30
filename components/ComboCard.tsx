import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { EnchantCombo } from '../types';
import { Layers, Check, Star } from 'lucide-react';
import { useSpotlight } from '../hooks/useSpotlight';

interface ComboCardProps {
  combo: EnchantCombo;
}

export const ComboCard: React.FC<ComboCardProps> = memo(({ combo }) => {
  const handleMouseMove = useSpotlight();

  return (
    <motion.div
      layout
      onMouseMove={handleMouseMove}
      className="liquid-glass hover-spotlight-card relative overflow-hidden rounded-2xl p-6 bg-white/60 border border-slate-200/60 group hover:shadow-xl transition-all"
    >
       {/* Gradient Header Accent */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

      <div className="flex items-start justify-between mb-5 mt-2 relative z-10">
        <div className="flex items-center gap-4">
             <div className="p-3 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 text-purple-600 shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Layers size={22} />
            </div>
            <div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">{combo.name}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">{combo.item}</span>
                </div>
            </div>
        </div>
        <Star className="text-amber-400 fill-amber-400/20" size={20} />
      </div>

      <p className="text-sm font-bold text-slate-500 mb-6 leading-relaxed relative z-10">
        {combo.description}
      </p>

      <div className="space-y-2.5 bg-white/40 rounded-xl p-4 border border-white/60 shadow-inner relative z-10">
        {combo.enchants.map((e, i) => (
             <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 text-sm font-extrabold text-slate-700"
             >
                <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 flex-shrink-0">
                    <Check size={12} strokeWidth={4} />
                </div>
                {e}
             </motion.div>
        ))}
      </div>
    </motion.div>
  );
});

ComboCard.displayName = 'ComboCard';