import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageSquare, Loader2, Wand2 } from 'lucide-react';
import { Enchantment } from '../types';
import { getEnchantmentAdvice } from '../services/geminiService';

interface GeminiAdvisorProps {
  enchant: Enchantment | null;
  onClose: () => void;
}

export const GeminiAdvisor: React.FC<GeminiAdvisorProps> = ({ enchant, onClose }) => {
  const [advice, setAdvice] = useState<string | null>(null);
  const [synergy, setSynergy] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (enchant) {
      setLoading(true);
      setAdvice(null);
      setSynergy(null);
      
      getEnchantmentAdvice(enchant)
        .then((data) => {
            setAdvice(data.advice);
            setSynergy(data.synergy);
        })
        .finally(() => setLoading(false));
    }
  }, [enchant]);

  if (!enchant) return null;

  return (
    <AnimatePresence>
        <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }} 
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }} 
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4"
        >
            <motion.div 
                initial={{ scale: 0.9, y: 30, opacity: 0 }} 
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 10, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg relative rounded-2xl border border-white/60 bg-white/90 p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] liquid-glass"
            >
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-all">
                    <X size={20} />
                </button>

                <div className="mb-8 flex items-center gap-4 border-b border-slate-100 pb-6">
                    <div className="p-3 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl shadow-lg shadow-purple-500/20">
                        <Wand2 className="text-white" size={28} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{enchant.name}</h2>
                        <p className="text-purple-600/80 text-xs uppercase tracking-widest font-extrabold mt-1">Mystic Analysis</p>
                    </div>
                </div>

                <div className="space-y-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-4 text-slate-400">
                            <Loader2 className="animate-spin text-purple-500" size={32} />
                            <span className="text-xs font-bold tracking-[0.2em] animate-pulse text-purple-600">CONSULTING THE ORACLE...</span>
                        </div>
                    ) : (
                        <>
                            <div className="bg-white rounded-xl p-5 border border-slate-100 shadow-sm hover:border-purple-200 transition-colors">
                                <h4 className="gradient-text text-xs uppercase tracking-widest font-extrabold mb-3 flex items-center gap-2">
                                    <MessageSquare size={14} className="text-purple-500" /> Strategic Advice
                                </h4>
                                <p className="text-slate-700 leading-relaxed text-sm font-semibold">
                                    {advice}
                                </p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-5 border border-purple-100">
                                <h4 className="text-purple-600 text-xs uppercase tracking-widest font-extrabold mb-3 flex items-center gap-2">
                                    <Wand2 size={14} /> Synergy
                                </h4>
                                <p className="text-slate-700 leading-relaxed text-sm font-semibold">
                                    {synergy}
                                </p>
                            </div>
                            
                            <div className="text-[10px] text-slate-400 text-center mt-4 font-mono uppercase tracking-widest font-bold">
                                Powered by Gemini 2.5
                            </div>
                        </>
                    )}
                </div>
            </motion.div>
        </motion.div>
    </AnimatePresence>
  );
};