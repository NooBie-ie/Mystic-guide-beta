import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { TableEnchantment } from '../types';
import { getEnchantIcon } from './EnchantCard';
import { BookOpen } from 'lucide-react';
import { useSpotlight } from '../hooks/useSpotlight';

interface TableCardProps {
  data: TableEnchantment;
}

export const TableCard: React.FC<TableCardProps> = memo(({ data }) => {
  const handleMouseMove = useSpotlight();

  const getRarityColor = (r: string) => {
      switch(r) {
          case 'Common': return 'bg-green-500';
          case 'Uncommon': return 'bg-blue-500';
          case 'Rare': return 'bg-purple-500';
          case 'Very Rare': return 'bg-amber-500';
          default: return 'bg-slate-400';
      }
  }
  
  const getRarityText = (r: string) => {
      switch(r) {
          case 'Common': return 'text-green-600';
          case 'Uncommon': return 'text-blue-600';
          case 'Rare': return 'text-purple-600';
          case 'Very Rare': return 'text-amber-600';
          default: return 'text-slate-500';
      }
  }

  const getProbabilityWidth = (weight: number) => {
      // Max weight is 10.
      return `${(weight / 10) * 100}%`;
  }

  return (
    <motion.div
      layout
      onMouseMove={handleMouseMove}
      className="liquid-glass hover-spotlight-card relative overflow-hidden rounded-2xl p-6 bg-white/60 border border-slate-200/60 group hover:shadow-xl transition-all"
    >
       <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-center gap-4">
           <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 group-hover:scale-110 group-hover:bg-purple-50 group-hover:text-purple-600 transition-all duration-300 shadow-sm">
             {getEnchantIcon(data.id, data.items)}
           </div>
           <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none">{data.name}</h3>
              <span className="text-[11px] text-slate-400 uppercase tracking-widest font-bold mt-1 block">Table Max: Lvl {data.maxTableLevel}</span>
           </div>
        </div>
        <div className="text-slate-300">
            <BookOpen size={20} />
        </div>
      </div>

      <div className="relative z-10 mt-4">
          <div className="flex justify-between items-end mb-2">
              <span className={`text-xs font-black uppercase tracking-widest ${getRarityText(data.rarity)}`}>{data.rarity}</span>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Weight: {data.weight}</span>
          </div>
          
          {/* Rarity Bar */}
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: getProbabilityWidth(data.weight) }}
                transition={{ duration: 1, ease: "circOut" }}
                className={`h-full rounded-full ${getRarityColor(data.rarity)} opacity-80`}
              />
          </div>
           <p className="text-[11px] text-slate-400 mt-2 font-medium">
            {data.weight === 10 ? 'Highly likely to appear at Level 30.' : 
             data.weight === 5 ? 'Moderately frequent.' : 
             data.weight === 2 ? 'Hard to find. Requires rerolling.' : 'Extremely rare. Good luck!'}
          </p>
      </div>
      
       <div className="flex flex-wrap gap-2 mt-6 relative z-10">
        {data.items.slice(0, 3).map((item) => (
          <span key={item} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 border border-slate-200">
            {item}
          </span>
        ))}
      </div>

    </motion.div>
  );
});

TableCard.displayName = 'TableCard';