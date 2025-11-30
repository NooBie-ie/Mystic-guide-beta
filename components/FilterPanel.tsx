
import React from 'react';
import { motion } from 'framer-motion';
import { FilterOptions } from '../types';
import { Check, X, Sparkles, AlertTriangle, Box } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterOptions;
  setFilters: (f: FilterOptions) => void;
  onClose: () => void;
}

const ITEM_TYPES = ['All', 'Sword', 'Pickaxe', 'Axe', 'Shovel', 'Bow', 'Crossbow', 'Trident', 'Helmet', 'Chestplate', 'Leggings', 'Boots', 'Elytra', 'Fishing Rod'];

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, setFilters, onClose }) => {
  
  const toggleItemType = (type: string) => {
      setFilters({ ...filters, itemType: type });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      className="absolute top-full right-0 mt-4 w-full md:w-80 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/60 p-5 z-50 liquid-glass"
    >
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-800 flex items-center gap-2">
                <Box size={14} /> Filter Results
            </h3>
            <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-800 transition-colors">
                <X size={16} />
            </button>
        </div>

        <div className="space-y-5">
            {/* Item Type Filter */}
            <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Item Type</label>
                <div className="flex flex-wrap gap-2">
                    {ITEM_TYPES.map(type => (
                        <button
                            key={type}
                            onClick={() => toggleItemType(type)}
                            className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg border transition-all ${
                                filters.itemType === type 
                                ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-500/20' 
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-purple-200 hover:text-purple-600'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* Toggles */}
            <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Attributes</label>
                
                <button 
                    onClick={() => setFilters({ ...filters, treasureOnly: !filters.treasureOnly })}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                        filters.treasureOnly ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
                    }`}
                >
                    <div className="flex items-center gap-2">
                        <Sparkles size={16} className={filters.treasureOnly ? 'text-amber-500' : 'text-slate-400'} />
                        <span className="text-xs font-bold">Treasure Only</span>
                    </div>
                    {filters.treasureOnly && <Check size={14} className="text-amber-600" />}
                </button>

                <button 
                    onClick={() => setFilters({ ...filters, noCurses: !filters.noCurses })}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                        filters.noCurses ? 'bg-purple-50 border-purple-200 text-purple-800' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
                    }`}
                >
                    <div className="flex items-center gap-2">
                        <AlertTriangle size={16} className={filters.noCurses ? 'text-purple-500' : 'text-slate-400'} />
                        <span className="text-xs font-bold">Exclude Curses</span>
                    </div>
                    {filters.noCurses && <Check size={14} className="text-purple-600" />}
                </button>
            </div>

            {/* Reset */}
            <div className="pt-2 border-t border-slate-100">
                <button 
                    onClick={() => setFilters({ itemType: 'All', treasureOnly: false, noCurses: false })}
                    className="w-full py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
                >
                    Reset Filters
                </button>
            </div>
        </div>
    </motion.div>
  );
};
