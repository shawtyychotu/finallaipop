import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { CatCharacter } from './CatCharacter';
import { FriendForeverModal } from './FriendForeverModal';
import { DIALOGUE_STEPS } from '../data/dialogue';
import { soundFx } from '../utils/cuteAudio';

interface InteractiveApologyPageProps {
  onBack: () => void;
  onReplayLoader?: () => void;
}

export const InteractiveApologyPage: React.FC<InteractiveApologyPageProps> = ({
  onBack,
  onReplayLoader,
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [showFriendModal, setShowFriendModal] = useState(false);
  const [isCelebrated, setIsCelebrated] = useState(false);

  const currentStep = DIALOGUE_STEPS[Math.min(stepIndex, DIALOGUE_STEPS.length - 1)];

  const handleNoClick = () => {
    soundFx.playSadWhimper();
    soundFx.playGrow();
    if (stepIndex < DIALOGUE_STEPS.length - 1) {
      setStepIndex((prev) => prev + 1);
    }
  };

  const handleYesClick = () => {
    soundFx.playSuccessFanfare();
    setIsCelebrated(true);
    setShowFriendModal(true);
    confetti({
      particleCount: 170,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#0284c7', '#38bdf8', '#60a5fa', '#93c5fd', '#2ecc71', '#34d399', '#facc15', '#f43f5e'],
    });
  };

  const handleRestart = () => {
    setShowFriendModal(false);
    setIsCelebrated(false);
    setStepIndex(0);
    soundFx.playPop();
  };

  // Button sizes based on step progression
  const getYesDimensions = () => {
    switch (stepIndex) {
      case 0:
        return { paddingX: 'px-8 sm:px-12', paddingY: 'py-3 sm:py-4', fontSize: 'text-xl sm:text-2xl', width: 'w-auto' };
      case 1:
        return { paddingX: 'px-10 sm:px-15', paddingY: 'py-3.5 sm:py-5', fontSize: 'text-2xl sm:text-3xl', width: 'w-auto' };
      case 2:
        return { paddingX: 'px-12 sm:px-18', paddingY: 'py-4.5 sm:py-6', fontSize: 'text-3xl sm:text-4xl', width: 'w-auto' };
      case 3:
        return { paddingX: 'px-14 sm:px-22', paddingY: 'py-5.5 sm:py-7', fontSize: 'text-4xl sm:text-5xl', width: 'w-auto max-w-md' };
      case 4:
        return { paddingX: 'px-16 sm:px-26', paddingY: 'py-7 sm:py-9', fontSize: 'text-5xl sm:text-6xl', width: 'w-full max-w-lg' };
      case 5:
        return { paddingX: 'px-16 sm:px-30', paddingY: 'py-8 sm:py-11', fontSize: 'text-6xl sm:text-7xl', width: 'w-full max-w-xl' };
      case 6:
      default:
        return { paddingX: 'px-18 sm:px-32', paddingY: 'py-9 sm:py-12', fontSize: 'text-7xl sm:text-8xl', width: 'w-full max-w-2xl' };
    }
  };

  const yesDim = getYesDimensions();

  return (
    <motion.div
      id="apology-app-root"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="min-h-screen w-full bg-gradient-to-b from-[#e0f2fe] via-[#eaf6ff] to-[#f0f9ff] flex flex-col items-center justify-center p-4 select-none overflow-x-hidden relative"
    >
      {/* Top Navigation Bar */}
      <div className="fixed top-5 left-5 right-5 z-30 flex items-center justify-between pointer-events-auto">
        {/* Back to Letter */}
        <button
          id="back-to-letter-btn"
          onClick={onBack}
          title="Back to Letter"
          className="px-4 py-2 rounded-full bg-white/80 hover:bg-white border border-sky-200 text-sky-800 shadow-sm hover:shadow transition-all duration-200 cursor-pointer flex items-center gap-2 text-xs font-semibold tracking-wide active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Letter</span>
        </button>

        {/* Replay Split Loader if available */}
        {onReplayLoader && (
          <button
            id="apology-replay-loader-btn"
            onClick={onReplayLoader}
            title="Replay Lollipop Loader"
            className="px-4 py-2 rounded-full bg-white/80 hover:bg-white border border-sky-200 text-sky-800 shadow-sm hover:shadow transition-all duration-200 cursor-pointer flex items-center gap-2 text-xs font-semibold tracking-wide active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay Loader</span>
          </button>
        )}
      </div>

      <main className="w-full max-w-2xl flex flex-col items-center justify-center text-center my-auto pt-10">
        {/* The Animated Kitten Character */}
        <div className="mb-2">
          <CatCharacter mood={isCelebrated ? 'celebrating' : currentStep.mood} />
        </div>

        {/* The Dialogue Text */}
        <motion.h1
          key={isCelebrated ? 'celebrated' : currentStep.text}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0369a1] tracking-wide my-4 sm:my-6 font-['Nunito',sans-serif] px-4 drop-shadow-sm"
        >
          {isCelebrated ? 'Yay! You said YES! 🍭' : currentStep.text}
        </motion.h1>

        {/* The Interactive Options (YES and NO) */}
        <div className="relative w-full flex items-center justify-center gap-4 sm:gap-6 min-h-[160px] sm:min-h-[220px]">
          {/* YES Option */}
          <motion.button
            id="yes-button"
            type="button"
            onClick={handleYesClick}
            layout
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={`
              bg-[#2ecc71] hover:bg-[#27ae60] active:bg-[#219653]
              text-white font-black rounded-2xl sm:rounded-3xl
              shadow-lg hover:shadow-xl transition-colors cursor-pointer
              flex items-center justify-center uppercase tracking-wider
              ${yesDim.paddingX} ${yesDim.paddingY} ${yesDim.fontSize} ${yesDim.width}
            `}
          >
            YES
          </motion.button>

          {/* NO Option */}
          {stepIndex < 6 ? (
            <motion.button
              id="no-button"
              type="button"
              onClick={handleNoClick}
              layout
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              style={{
                transform: `scale(${currentStep.noScale})`,
                transformOrigin: 'center',
              }}
              className={`
                bg-[#f44336] hover:bg-[#e53935] active:bg-[#d32f2f]
                text-white font-black rounded-2xl
                shadow-md transition-all cursor-pointer select-none
                flex items-center justify-center uppercase tracking-wider
                ${stepIndex >= 4 ? 'px-3 py-1.5 text-xs' : 'px-8 sm:px-11 py-3 sm:py-3.5 text-xl sm:text-2xl'}
              `}
            >
              NO
            </motion.button>
          ) : (
            <motion.button
              id="no-button-tiny"
              type="button"
              onClick={handleNoClick}
              initial={{ scale: 0 }}
              animate={{ scale: 0.15 }}
              className="absolute right-2 bottom-2 w-4 h-4 rounded-full bg-red-400 text-[6px] text-white flex items-center justify-center opacity-30 hover:opacity-100 cursor-pointer"
              title="No"
            >
              no
            </motion.button>
          )}
        </div>
      </main>

      {/* Pop-up modal saying: "Friends forever thank you for giving me the chances" */}
      <FriendForeverModal
        isOpen={showFriendModal}
        onClose={() => setShowFriendModal(false)}
        onRestart={handleRestart}
      />
    </motion.div>
  );
};
