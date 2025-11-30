import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Enchantment } from '../types';
import { 
  Sparkles, AlertTriangle, Hammer, Shield, Zap, 
  Sword, Pickaxe, Feather, Flame, Droplets, 
  Crosshair, Anchor, Wind, Gem, Infinity, 
  Magnet, Footprints, Axe, Box
} from 'lucide-react';
import { useSpotlight } from '../hooks/useSpotlight';

interface EnchantCardProps {
  enchant: Enchantment;
  onClick: (enchant: Enchantment) => void;
}

export const getEnchantIcon = (id: string, items: string[]) => {
  // Specific Icon Mapping by ID
  switch (id) {
    case 'sharp': return <Sword size={20} />;
    case 'eff': return <Zap size={20} />;
    case 'silk': return <Feather size={20} />;
    case 'fort': return <Gem size={20} />;
    case 'unb': return <Hammer size={20} />;
    case 'mend': return <Sparkles size={20} />;
    case 'prot': return <Shield size={20} />;
    case 'feather': return <Feather size={20} />;
    case 'resp': return <Droplets size={20} />;
    case 'aqua': return <Pickaxe size={20} />;
    case 'depth': return <Footprints size={20} />;
    case 'thorns': return <Shield size={20} />;
    case 'loot': return <Gem size={20} />;
    case 'inf': return <Infinity size={20} />;
    case 'flame': return <Flame size={20} />;
    case 'loyalty': return <Magnet size={20} />;
    case 'chan': return <Zap size={20} />;
    case 'rip': return <Wind size={20} />;
    case 'impaling': return <Anchor size={20} />;
    case 'power': return <Crosshair size={20} />;
    case 'punch': return <Hammer size={20} />;
    case 'luck': return <Sparkles size={20} />;
    case 'lure': return <Magnet size={20} />;
    case 'fire': return <Flame size={20} />;
    default:
      // Fallback based on item type
      const itemStr = items.join(' ');
      if (itemStr.includes('Sword')) return <Sword size={20} />;
      if (itemStr.includes('Pickaxe')) return <Pickaxe size={20} />;
      if (itemStr.includes('Axe')) return <Axe size={20} />;
      if (itemStr.includes('Bow')) return <Crosshair size={20} />;
      if (itemStr.includes('Trident')) return <Anchor size={20} />;
      if (itemStr.includes('Boots')) return <Footprints size={20} />;
      if (itemStr.includes('Elytra')) return <Wind size={20} />;
      if (itemStr.includes('Helmet') || itemStr.includes('Chestplate') || itemStr.includes('Leggings')) return <Shield size={20} />;
      return <Box size={20} />;
  }
};

export const EnchantCard: React.FC<EnchantCardProps> = memo(({ enchant, onClick }) => {
  const handleMouseMove = useSpotlight();

  return (
    <motion.div
      layoutId={`card-${enchant.id}`}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(enchant)}
      onMouseMove={handleMouseMove}
      className="liquid-glass hover-spotlight-card relative group cursor-pointer overflow-hidden rounded-2xl p-6 bg-white/70 border-white/80"
    >
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-center gap-4">
           <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-purple-600 group-hover:scale-110 group-hover:bg-purple-50 transition-all duration-300 shadow-sm">
             {getEnchantIcon(enchant.id, enchant.items)}
           </div>
           <div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight leading-none group-hover:gradient-text transition-all">{enchant.name}</h3>
              <span className="text-[11px] text-purple-600 uppercase tracking-widest font-bold opacity-80 mt-1 block">Max Level {enchant.maxLevel}</span>
           </div>
        </div>
        {enchant.isTreasure && (
            <div className="text-amber-500 bg-amber-100 p-2 rounded-lg shadow-sm" title="Treasure Enchantment">
                <Sparkles size={16} />
            </div>
        )}
        {enchant.isCurse && (
            <div className="text-red-500 bg-red-100 p-2 rounded-lg shadow-sm" title="Curse">
                <AlertTriangle size={16} />
            </div>
        )}
      </div>

      <p className="text-sm font-semibold text-slate-500 mb-6 leading-relaxed line-clamp-2 group-hover:text-slate-700 transition-colors relative z-10">
        {enchant.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto relative z-10">
        {enchant.items.slice(0, 3).map((item) => (
          <span key={item} className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 border border-slate-200 group-hover:border-purple-200 group-hover:bg-purple-50 transition-colors">
            {item}
          </span>
        ))}
        {enchant.items.length > 3 && (
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-500 border border-slate-200">
            +{enchant.items.length - 3}
          </span>
        )}
      </div>
    </motion.div>
  );
});

EnchantCard.displayName = 'EnchantCard';