import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { CatCharacter } from './CatCharacter';

interface FriendForeverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart?: () => void;
}

export const FriendForeverModal: React.FC<FriendForeverModalProps> = ({
  isOpen,
  onClose,
  onRestart
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="friend-forever-backdrop"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-950/40 backdrop-blur-xs"
        onClick={onClose}
      >
        <motion.div
          id="friend-forever-popup"
          initial={{ opacity: 0, scale: 0.8, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-sm sm:max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-sky-300 text-slate-800 text-center select-none"
        >
          {/* Close button */}
          <button
            type="button"
            id="popup-close-btn"
            onClick={onClose}
            aria-label="Close popup"
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-sky-100 hover:bg-sky-200 flex items-center justify-center text-sky-700 transition cursor-pointer"
          >
            <X size={18} />
          </button>

          {/* Floating badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles size={13} className="text-sky-500" />
            <span>Friends Forever 🍭</span>
            <Sparkles size={13} className="text-sky-500" />
          </div>

          {/* Celebrating Cute Kitten Doll Hugging Lollipop */}
          <div className="my-1 flex items-center justify-center scale-90 sm:scale-95">
            <CatCharacter mood="celebrating" />
          </div>

          {/* Main Title & Message with Lollipop instead of hearts */}
          <h2 className="text-2xl sm:text-3xl font-black text-[#0284c7] font-['Fredoka',sans-serif] tracking-wide mt-2">
            Friends Forever! 🍭
          </h2>

          <p className="text-base sm:text-lg font-bold text-slate-700 mt-2 leading-relaxed px-2 font-['Nunito',sans-serif]">
            Thank you for giving me the chances 🥺🍭
          </p>

          <p className="text-xs text-sky-600 font-semibold mt-1">
            I promise to always cherish our bond ✨
          </p>

          {/* Action buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <button
              type="button"
              id="confirm-forever-btn"
              onClick={onClose}
              className="w-full sm:flex-1 py-3 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white font-black rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer text-base"
            >
              <span className="text-lg">🍭</span>
              <span>Always & Forever</span>
            </button>

            {onRestart && (
              <button
                type="button"
                id="replay-btn"
                onClick={onRestart}
                className="w-full sm:w-auto px-4 py-3 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold rounded-2xl border border-sky-200 transition cursor-pointer text-sm"
              >
                Replay 🔄
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
