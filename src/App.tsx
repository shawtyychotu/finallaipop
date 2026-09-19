import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { SplitRevealLoader } from './components/SplitRevealLoader';
import { LetterEnvelopeView } from './components/LetterEnvelopeView';
import { InteractiveApologyPage } from './components/InteractiveApologyPage';
import { COLORFUL_LOLLIPOP } from './data/themes';

export default function App() {
  const [progress, setProgress] = useState(0);
  const [isRevealing, setIsRevealing] = useState(false);
  const [spinBoost, setSpinBoost] = useState<number | null>(null);
  const [activeView, setActiveView] = useState<'letter' | 'apology'>('letter');

  // Run the loading simulation
  const startLoading = useCallback(() => {
    setIsRevealing(false);
    setProgress(0);
    setActiveView('letter');

    const totalDurationMs = 3800; // Snappy 3.8s loading sequence
    const intervalMs = 25;
    const step = (100 / totalDurationMs) * intervalMs;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsRevealing(true);
          }, 180);
          return 100;
        }
        return next;
      });
    }, intervalMs);

    return timer;
  }, []);

  // Initial load sequence on mount
  useEffect(() => {
    const timer = startLoading();
    return () => clearInterval(timer);
  }, [startLoading]);

  // Click lollipop to boost spin speed during loader
  const handleLollipopClick = () => {
    setSpinBoost(0.6);
    setTimeout(() => {
      setSpinBoost(null);
    }, 1200);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-[#05070d]">
      <AnimatePresence mode="wait">
        {activeView === 'letter' ? (
          <LetterEnvelopeView
            key="letter-view"
            onReplayLoader={startLoading}
            isRevealed={isRevealing}
            onNext={() => setActiveView('apology')}
          />
        ) : (
          <InteractiveApologyPage
            key="apology-page"
            onBack={() => setActiveView('letter')}
            onReplayLoader={startLoading}
          />
        )}
      </AnimatePresence>

      {/* WHITE SPLIT REVEAL LOADING SCREEN ON TOP */}
      {/* Featuring the 3-square loading bar on the right and hand-drawn sticker lollipop in the center */}
      <SplitRevealLoader
        progress={progress}
        isRevealing={isRevealing}
        flavor={COLORFUL_LOLLIPOP}
        spinSpeed={spinBoost || 2.6}
        onLollipopClick={handleLollipopClick}
      />
    </div>
  );
}
