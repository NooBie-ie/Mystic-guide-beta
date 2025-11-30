import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hammer, Shield, Sparkles, Search, Bot, Layers, BookOpen, Filter, X } from 'lucide-react';
import { TOOLS_ENCHANTS, ARMOR_ENCHANTS, EXTRA_ENCHANTS, BEST_COMBOS, TABLE_ENCHANTS_DATA, CATEGORIES } from './constants';
import { EnchantCategory, Enchantment, EnchantCombo, TableEnchantment, FilterOptions, UnifiedSearchResult } from './types';
import { EnchantCard } from './components/EnchantCard';
import { ComboCard } from './components/ComboCard';
import { TableCard } from './components/TableCard';
import { FilterPanel } from './components/FilterPanel';
import { MysticChatBot } from './components/MysticChatBot';
import { GeminiAdvisor } from './components/GeminiAdvisor';
import { MysticOverlay } from './components/MysticOverlay';
import { getBuildStrategy } from './services/geminiService';
import { useSpotlight } from './hooks/useSpotlight';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<EnchantCategory>(EnchantCategory.TOOLS);
  const [selectedEnchant, setSelectedEnchant] = useState<Enchantment | null>(null);
  
  // Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
  // Filter State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
      itemType: 'All',
      treasureOnly: false,
      noCurses: false
  });

  // State for Build Strategy AI modal
  const [showBuildModal, setShowBuildModal] = useState(false);
  const [buildItem, setBuildItem] = useState('Diamond Pickaxe');
  const [buildResult, setBuildResult] = useState('');
  const [loadingBuild, setLoadingBuild] = useState(false);

  // State for Mystic Animation
  const [showMysticEffect, setShowMysticEffect] = useState(false);

  const handleMouseMove = useSpotlight();

  // Anti-Inspect Protection
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') || 
        (e.ctrlKey && e.shiftKey && e.key === 'J') || 
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Debounce Search Term to prevent lag on typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Unified Data Filtering Logic
  const filteredData: UnifiedSearchResult[] = useMemo(() => {
      const lowerSearch = debouncedSearchTerm.toLowerCase();
      const isSearching = lowerSearch.length > 0;
      
      let rawResults: UnifiedSearchResult[] = [];

      // 1. GATHER DATA
      if (isSearching) {
          // Global Search: Combine ALL sources
          rawResults = [
              ...TOOLS_ENCHANTS.map(d => ({ dataType: 'ENCHANT' as const, data: d })),
              ...ARMOR_ENCHANTS.map(d => ({ dataType: 'ENCHANT' as const, data: d })),
              ...EXTRA_ENCHANTS.map(d => ({ dataType: 'ENCHANT' as const, data: d })),
              ...BEST_COMBOS.map(d => ({ dataType: 'COMBO' as const, data: d })),
              ...TABLE_ENCHANTS_DATA.map(d => ({ dataType: 'TABLE' as const, data: d }))
          ];
      } else {
          // Contextual View: Use Active Category
          switch (activeCategory) {
            case EnchantCategory.TOOLS:
                rawResults = TOOLS_ENCHANTS.map(d => ({ dataType: 'ENCHANT', data: d }));
                break;
            case EnchantCategory.ARMOR:
                rawResults = ARMOR_ENCHANTS.map(d => ({ dataType: 'ENCHANT', data: d }));
                break;
            case EnchantCategory.EXTRAS:
                rawResults = EXTRA_ENCHANTS.map(d => ({ dataType: 'ENCHANT', data: d }));
                break;
            case EnchantCategory.COMBOS:
                rawResults = BEST_COMBOS.map(d => ({ dataType: 'COMBO', data: d }));
                break;
            case EnchantCategory.TABLE:
                rawResults = TABLE_ENCHANTS_DATA.map(d => ({ dataType: 'TABLE', data: d }));
                break;
            default:
                rawResults = [];
          }
      }

      // 2. APPLY SEARCH FILTER
      if (isSearching) {
          rawResults = rawResults.filter(item => {
              // Type Guard Helper
              const d = item.data;
              // Check Name
              if (d.name.toLowerCase().includes(lowerSearch)) return true;
              
              // Check Item types (Enchants & Table have items[], Combo has item string)
              if ('items' in d && Array.isArray(d.items)) {
                  if (d.items.some(i => i.toLowerCase().includes(lowerSearch))) return true;
              }
              if ('item' in d && typeof d.item === 'string') {
                  if (d.item.toLowerCase().includes(lowerSearch)) return true;
              }

              // Check Description (Enchants & Combos have desc, Table doesn't explicitly shown in types but logic is safe)
              if ('description' in d && d.description && d.description.toLowerCase().includes(lowerSearch)) return true;
              
              return false;
          });
      }

      // 3. APPLY ATTRIBUTE FILTERS
      
      // Filter by Item Type Tag
      if (filters.itemType !== 'All') {
          rawResults = rawResults.filter(item => {
              const d = item.data;
              // Combo uses singular 'item', others use 'items' array
              if ('items' in d) {
                  // Check if any item in the array includes the filter type (e.g. 'Diamond Pickaxe' includes 'Pickaxe')
                  return d.items.some(i => i.includes(filters.itemType) || (filters.itemType === 'All Tools' && i === 'All Tools'));
              } else if ('item' in d) {
                  return d.item.includes(filters.itemType);
              }
              return false;
          });
      }

      // Filter by Treasure Only
      if (filters.treasureOnly) {
          rawResults = rawResults.filter(item => {
              if (item.dataType === 'ENCHANT') {
                  return (item.data as Enchantment).isTreasure;
              }
              // Combos and Table usually don't have isTreasure flag in this simple app context, hide them if filtering specifically for treasure
              return false;
          });
      }

      // Filter by No Curses
      if (filters.noCurses) {
          rawResults = rawResults.filter(item => {
              if (item.dataType === 'ENCHANT') {
                  return !(item.data as Enchantment).isCurse;
              }
              return true; // Keep others
          });
      }

      return rawResults;
  }, [activeCategory, debouncedSearchTerm, filters]);

  const handleGetBuild = useCallback(async () => {
      setLoadingBuild(true);
      const result = await getBuildStrategy(buildItem);
      setBuildResult(result);
      setLoadingBuild(false);
  }, [buildItem]);

  const clearSearch = useCallback(() => {
      setSearchTerm('');
      setFilters({ itemType: 'All', treasureOnly: false, noCurses: false });
  }, []);

  // Stable handler for card clicks to allow React.memo to work
  const handleEnchantClick = useCallback((enchant: Enchantment) => {
    setSelectedEnchant(enchant);
  }, []);

  const handleCloseAdvisor = useCallback(() => {
    setSelectedEnchant(null);
  }, []);

  const handleCloseBuildModal = useCallback(() => {
    setShowBuildModal(false);
  }, []);

  const isSearchingGlobal = debouncedSearchTerm.length > 0;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-purple-200 relative overflow-hidden font-inter">
      
      {/* Ambient Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0 transform-gpu">
        <div className="blob-base blob-purple w-[800px] h-[800px] top-[-10%] left-[-10%]" />
        <div className="blob-base blob-blue w-[700px] h-[700px] bottom-[-10%] right-[-10%]" />
        <div className="blob-base blob-pink w-[400px] h-[400px] top-[40%] left-[60%]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-30 border-b border-slate-200/60 bg-white/70 backdrop-blur-2xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between gap-2">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-2 md:gap-4 cursor-pointer group/logo flex-shrink-0"
            onClick={() => setShowMysticEffect(true)}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 liquid-glass rounded-lg flex items-center justify-center group bg-white hover-spotlight-card transition-transform group-active/logo:scale-95" onMouseMove={handleMouseMove}>
              <Sparkles className="text-purple-600 group-hover:scale-110 transition-transform" size={20} />
            </div>
            <span className="text-lg md:text-2xl font-black tracking-tight text-slate-900 select-none hidden min-[360px]:inline">
              MYSTIC<span className="gradient-text">GUIDE</span>
            </span>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end">
             <button 
                onClick={() => setShowBuildModal(true)}
                onMouseMove={handleMouseMove}
                className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl liquid-glass text-xs md:text-sm font-bold text-purple-700 hover:bg-white hover:shadow-lg transition-all group border-purple-100 hover-spotlight-card shrink-0"
                title="AI Builder"
            >
                <Bot size={18} className="group-hover:rotate-12 transition-transform"/>
                <span className="whitespace-nowrap hidden sm:inline">AI Builder</span>
            </button>
            
            {/* Search Bar Wrapper */}
            <div className="relative group w-full max-w-[130px] sm:max-w-[200px] md:max-w-[300px] transition-all duration-300">
               <div className="relative flex items-center">
                  <Search className="absolute left-3 text-slate-400 group-hover:text-purple-500 transition-colors pointer-events-none" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search enchantments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-100/50 border border-slate-200 rounded-full py-2 pl-9 pr-9 md:py-2.5 md:pl-10 md:pr-10 text-xs md:text-sm font-semibold text-slate-700 focus:outline-none focus:border-purple-400 focus:bg-white transition-all focus:shadow-md placeholder:text-slate-400 truncate"
                  />
                  {/* Filter Toggle Button */}
                   <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className={`absolute right-1.5 p-1.5 rounded-full transition-colors ${isFilterOpen || filters.itemType !== 'All' || filters.treasureOnly || filters.noCurses ? 'bg-purple-100 text-purple-600' : 'hover:bg-slate-200 text-slate-400'}`}
                  >
                     <Filter size={14} strokeWidth={2.5} />
                   </button>
               </div>

               {/* Dropdown Filter Panel */}
               <AnimatePresence>
                  {isFilterOpen && (
                    <FilterPanel 
                        filters={filters} 
                        setFilters={setFilters} 
                        onClose={() => setIsFilterOpen(false)} 
                    />
                  )}
               </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* Category Tabs (Hidden on Global Search to reduce clutter) */}
        <div className={`transition-all duration-500 ${isSearchingGlobal ? 'opacity-50 grayscale pointer-events-none scale-95 h-auto mb-4 hidden md:flex' : 'opacity-100 scale-100 mb-10'}`}>
             <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
              {CATEGORIES.map((cat) => {
                 let Icon;
                 if (cat.id === EnchantCategory.TOOLS) Icon = Hammer;
                 else if (cat.id === EnchantCategory.ARMOR) Icon = Shield;
                 else if (cat.id === EnchantCategory.COMBOS) Icon = Layers;
                 else if (cat.id === EnchantCategory.TABLE) Icon = BookOpen;
                 else Icon = Sparkles;

                 const isActive = activeCategory === cat.id;
                 
                 return (
                   <button
                     key={cat.id}
                     onClick={() => setActiveCategory(cat.id)}
                     onMouseMove={handleMouseMove}
                     className={`relative px-3 py-2 md:px-6 md:py-3.5 rounded-xl flex items-center gap-2 md:gap-3 transition-all duration-300 overflow-hidden group hover-spotlight-card ${isActive ? 'text-white shadow-[0_10px_30px_rgba(147,51,234,0.25)]' : 'text-slate-500 hover:text-slate-800 bg-white/40'}`}
                   >
                     {isActive && (
                        <motion.div 
                            layoutId="activeTab" 
                            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl" 
                        />
                     )}
                     {!isActive && <div className="absolute inset-0 liquid-glass opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />}
                     
                     <span className="relative z-10 flex items-center gap-2">
                        <Icon size={16} className={`md:w-[18px] md:h-[18px] ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-purple-500 transition-colors'}`} />
                        <span className={`tracking-wide text-xs md:text-lg ${isActive ? 'font-black' : 'font-bold'}`}>{cat.label}</span>
                     </span>
                   </button>
                 )
              })}
            </div>
        </div>

        {/* Search Results Header */}
        {isSearchingGlobal && (
             <div className="flex items-center justify-between mb-6 animate-in fade-in slide-in-from-bottom-2">
                <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                    <Search size={20} className="text-purple-600"/>
                    Global Search Results
                    <span className="ml-2 text-xs font-bold bg-purple-100 text-purple-600 px-2 py-1 rounded-full">{filteredData.length} found</span>
                </h2>
                <button onClick={clearSearch} className="text-xs font-bold text-slate-400 hover:text-red-500 flex items-center gap-1 transition-colors">
                    <X size={14}/> Clear Search
                </button>
            </div>
        )}

        {/* Grid Layout */}
        <div className="">
          <AnimatePresence mode="wait">
            <motion.div
              key={isSearchingGlobal ? 'global' : activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-24"
            >
              {filteredData.map((item, index) => {
                  // Dynamically render based on wrapped dataType
                  if (item.dataType === 'COMBO') {
                      return <ComboCard key={`combo-${(item.data as EnchantCombo).id}`} combo={item.data as EnchantCombo} />;
                  } else if (item.dataType === 'TABLE') {
                      return <TableCard key={`table-${(item.data as TableEnchantment).id}`} data={item.data as TableEnchantment} />;
                  } else {
                      // Default ENCHANT
                      return (
                          <EnchantCard 
                              key={`enchant-${(item.data as Enchantment).id}`} 
                              enchant={item.data as Enchantment} 
                              onClick={handleEnchantClick} 
                          />
                      );
                  }
              })}
              
              {filteredData.length === 0 && (
                  <div className="col-span-full py-24 text-center text-slate-400">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                          <Search size={24} />
                      </div>
                      <p className="text-xl font-black mb-2 text-slate-700">No results found</p>
                      <p className="text-sm font-medium mb-6">We couldn't find any enchantments matching your filters.</p>
                      <button onClick={clearSearch} className="px-6 py-2 rounded-lg bg-purple-50 text-purple-600 font-bold text-sm hover:bg-purple-100 transition-colors">
                          Clear all filters
                      </button>
                  </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </main>

      {/* Modals */}
      <GeminiAdvisor enchant={selectedEnchant} onClose={handleCloseAdvisor} />
      
      <AnimatePresence>
        {showMysticEffect && (
            <MysticOverlay onComplete={() => setShowMysticEffect(false)} />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showBuildModal && (
            <motion.div 
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }} 
                animate={{ opacity: 1, backdropFilter: "blur(8px)" }} 
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                onClick={handleCloseBuildModal}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
            >
                 <motion.div 
                    initial={{ scale: 0.9, y: 30, opacity: 0 }} 
                    animate={{ scale: 1, y: 0, opacity: 1 }} 
                    exit={{ scale: 0.95, y: 10, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="liquid-glass bg-white/90 w-full max-w-2xl rounded-2xl p-8 shadow-2xl border border-white cursor-auto"
                >
                    <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                        <div className="p-2.5 bg-purple-100 rounded-xl text-purple-600">
                             <Bot size={24}/> 
                        </div>
                        AI Build Architect
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-3 mb-6">
                        <input 
                            type="text" 
                            value={buildItem}
                            onChange={(e) => setBuildItem(e.target.value)}
                            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3.5 text-slate-800 font-semibold focus:border-purple-500 outline-none transition-all placeholder-slate-400 shadow-sm"
                            placeholder="E.g., Netherite Sword"
                        />
                        <button 
                            onClick={handleGetBuild}
                            disabled={loadingBuild}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loadingBuild ? 'Forging...' : 'Generate Build'}
                        </button>
                    </div>
                    
                    <div className="bg-slate-50 rounded-xl p-6 min-h-[200px] border border-slate-200 shadow-inner overflow-y-auto max-h-[400px] whitespace-pre-wrap text-slate-700 leading-relaxed font-mono text-sm custom-scrollbar font-medium">
                         {loadingBuild ? (
                             <div className="flex flex-col items-center justify-center h-full text-purple-400 gap-3 min-h-[150px]">
                                 <Sparkles className="animate-spin" size={28} />
                                 <span className="text-xs font-bold tracking-widest animate-pulse text-purple-600">CONSULTING ANCIENT TEXTS...</span>
                             </div>
                         ) : buildResult ? (
                             <div className="animate-in fade-in duration-500">{buildResult}</div>
                         ) : (
                             <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3 min-h-[150px]">
                                 <Bot size={40} className="opacity-20" />
                                 <span className="italic text-xs font-semibold">Enter an item name to receive the ultimate enchantment strategy.</span>
                             </div>
                         )}
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>
      
      {/* Chat Bot - Always mounted for quick access */}
      <MysticChatBot />

    </div>
  );
};

export default App;