import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, Volume2, VolumeX, Maximize2, Minimize2, Heart, Play, Pause, ArrowRight } from 'lucide-react';

interface LetterEnvelopeViewProps {
  onReplayLoader: () => void;
  isRevealed: boolean;
  onNext: () => void;
}

export const LetterEnvelopeView: React.FC<LetterEnvelopeViewProps> = ({
  onReplayLoader,
  isRevealed,
  onNext,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Audio Play / Pause
  const toggleAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log('Audio playback prevented:', err));
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  // Autoplay audio on reveal
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isRevealed) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    audio.currentTime = 0;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => {
        // Fallback on first click if autoplay restricted
        const resumeAudio = () => {
          if (audio && audio.paused) {
            audio.play().then(() => setIsPlaying(true)).catch(() => {});
          }
          window.removeEventListener('click', resumeAudio);
        };
        window.addEventListener('click', resumeAudio);
      });
  }, [isRevealed]);

  // Fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
      }
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bgImageRef = useRef<HTMLDivElement | null>(null);
  const parallaxRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Interactive Particle Canvas & Mouse Parallax for wallpaper.jpg
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    interface Sparkle {
      x: number;
      y: number;
      size: number;
      alpha: number;
      twinkleSpeed: number;
      color: string;
    }

    let sparkles: Sparkle[] = [];
    const count = Math.floor((width * height) / 16000);
    for (let i = 0; i < count; i++) {
      sparkles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.6,
        alpha: Math.random() * 0.7 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        color: Math.random() > 0.4 ? '#bae6fd' : '#fef08a',
      });
    }

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const factorX = (e.clientX / width - 0.5) * 2;
      const factorY = (e.clientY / height - 0.5) * 2;
      parallaxRef.current.targetX = factorX * 18;
      parallaxRef.current.targetY = factorY * 14;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      const p = parallaxRef.current;
      p.x += (p.targetX - p.x) * 0.05;
      p.y += (p.targetY - p.y) * 0.05;

      if (bgImageRef.current) {
        bgImageRef.current.style.transform = `translate3d(${-p.x}px, ${-p.y}px, 0) scale(1.05)`;
      }

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < sparkles.length; i++) {
        const s = sparkles[i];
        s.alpha += Math.sin(Date.now() * s.twinkleSpeed) * 0.012;
        const currentAlpha = Math.max(0.15, Math.min(0.9, s.alpha));

        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        const px = s.x + p.x * 0.3;
        const py = s.y + p.y * 0.3;
        ctx.arc(px, py, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const [envelopeImageSrc, setEnvelopeImageSrc] = useState<string>('./assets/letter.jpg');

  // Automatically make the outer black background around the envelope transparent
  useEffect(() => {
    const img = new Image();
    img.src = './assets/letter.jpg';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const w = canvas.width;
        const h = canvas.height;

        // BFS flood-fill from all 4 borders to remove contiguous black background
        const visited = new Uint8Array(w * h);
        const queue = new Int32Array(w * h);
        let head = 0;
        let tail = 0;

        const pushPixel = (x: number, y: number) => {
          const idx = y * w + x;
          if (visited[idx]) return;
          visited[idx] = 1;
          const p = idx * 4;
          // If near black (screenshot border)
          if (data[p] < 30 && data[p + 1] < 30 && data[p + 2] < 30) {
            data[p + 3] = 0; // set transparent
            queue[tail++] = idx;
          }
        };

        for (let x = 0; x < w; x++) {
          pushPixel(x, 0);
          pushPixel(x, h - 1);
        }
        for (let y = 0; y < h; y++) {
          pushPixel(0, y);
          pushPixel(w - 1, y);
        }

        while (head < tail) {
          const curr = queue[head++];
          const cx = curr % w;
          const cy = Math.floor(curr / w);

          if (cx > 0) pushPixel(cx - 1, cy);
          if (cx < w - 1) pushPixel(cx + 1, cy);
          if (cy > 0) pushPixel(cx, cy - 1);
          if (cy < h - 1) pushPixel(cx, cy + 1);
        }

        ctx.putImageData(imgData, 0, 0);
        setEnvelopeImageSrc(canvas.toDataURL('image/png'));
      } catch (e) {
        console.warn('Canvas cutout fallback:', e);
      }
    };
  }, []);

  return (
    <div
      id="letter-view-container"
      className="relative w-full h-screen bg-[#05070d] overflow-hidden select-none"
    >
      {/* 1. Wallpaper Image with Mouse Parallax */}
      <div
        id="wallpaper-image"
        ref={bgImageRef}
        className="absolute -top-[3%] -left-[3%] w-[106%] h-[106%] bg-cover bg-no-repeat will-change-transform pointer-events-none"
        style={{
          backgroundImage: "url('./assets/wallpaper.jpg')",
          backgroundPosition: 'center 35%',
        }}
      />

      {/* 2. Interactive Canvas for Ambient Star Sparkles */}
      <canvas
        id="particle-canvas"
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
      />

      {/* 3. Soft Ambient Vignette Overlay */}
      <div
        id="vignette-overlay"
        className="absolute inset-0 w-full h-full pointer-events-none z-[3]"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(5, 7, 13, 0.25) 0%, rgba(5, 7, 13, 0.72) 100%)',
        }}
      />

      {/* 4. Top Controls Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="fixed top-5 right-5 md:top-6 md:right-8 z-30 flex items-center gap-2.5"
      >
        {/* Replay Split Loader Button */}
        <button
          id="replay-split-loader-btn"
          onClick={onReplayLoader}
          title="Replay Lollipop Loader"
          className="px-4 py-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white/90 hover:text-white shadow-lg transition-all duration-200 cursor-pointer flex items-center gap-2 text-xs font-medium tracking-wide active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Replay</span>
        </button>

        {/* Audio Mute/Unmute */}
        <button
          id="audio-mute-toggle-btn"
          onClick={toggleMute}
          title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white/90 hover:text-white shadow-lg transition-all cursor-pointer active:scale-95"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-cyan-300" />}
        </button>

        {/* Fullscreen */}
        <button
          id="fullscreen-toggle-btn"
          onClick={toggleFullscreen}
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white/90 hover:text-white shadow-lg transition-all cursor-pointer active:scale-95"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </motion.div>

      {/* =========================================================================
          5. MESSAGE ENVELOPE IMAGE POSITIONED ON THE LEFT SIDE
         ========================================================================= */}
      <div className="absolute left-4 md:left-[5vw] top-1/2 -translate-y-1/2 z-20 max-w-[420px] md:max-w-[460px] w-[90vw] pointer-events-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, x: -40, scale: 0.94 }}
          animate={isRevealed ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -40, scale: 0.94 }}
          transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full flex flex-col items-center group"
        >
          {/* Ambient colored glow behind the envelope */}
          <div className="absolute inset-0 bg-[#88D8CE]/20 rounded-3xl blur-2xl pointer-events-none transform scale-95 opacity-70 group-hover:opacity-90 transition-opacity" />

          {/* The Envelope Image */}
          <div
            className="relative w-full transition-transform duration-300 group-hover:scale-[1.015]"
            style={{
              filter: 'drop-shadow(0 20px 45px rgba(0, 0, 0, 0.75)) drop-shadow(0 6px 14px rgba(0, 0, 0, 0.45))',
            }}
          >
            <img
              src={envelopeImageSrc}
              alt="Apology letter in envelope for Lali from Prabha"
              className="w-full h-auto max-h-[75vh] object-contain rounded-2xl select-none"
              draggable={false}
            />
          </div>

          {/* Compact Glassmorphic Audio Player Bar right underneath */}
          <div
            id="glass-audio-player"
            onClick={toggleAudio}
            className={`mt-4 w-full flex items-center gap-3 px-4 py-2.5 rounded-full bg-black/45 backdrop-blur-xl border border-white/15 hover:border-cyan-400/50 hover:bg-black/60 transition-all duration-300 cursor-pointer shadow-lg select-none ${
              isPlaying ? 'border-cyan-400/50 shadow-[0_0_18px_rgba(0,240,255,0.25)]' : ''
            }`}
          >
            {/* Play/Pause Button */}
            <button
              id="audio-toggle-btn"
              onClick={(e) => {
                e.stopPropagation();
                toggleAudio();
              }}
              title="Play / Pause Audio"
              className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-slate-950 shadow-[0_0_12px_rgba(0,240,255,0.5)] hover:scale-105 active:scale-95 transition-transform flex-shrink-0 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950 ml-0.5" />}
            </button>

            {/* Song Details */}
            <div className="flex flex-col flex-grow min-w-0">
              <span className="text-xs md:text-sm font-medium text-white truncate">Come Back Home</span>
              <span className="text-[0.68rem] text-cyan-300 tracking-wider">Sofia Carson</span>
            </div>

            {/* Animated Equalizer Waveform Bars */}
            <div className="flex items-end gap-[3px] h-3.5 pr-1">
              <span className={`w-[2.5px] bg-cyan-400 rounded-full transition-all duration-200 ${isPlaying ? 'animate-equalize-1' : 'h-1'}`} />
              <span className={`w-[2.5px] bg-cyan-400 rounded-full transition-all duration-200 ${isPlaying ? 'animate-equalize-2' : 'h-1.5'}`} />
              <span className={`w-[2.5px] bg-cyan-400 rounded-full transition-all duration-200 ${isPlaying ? 'animate-equalize-3' : 'h-2'}`} />
              <span className={`w-[2.5px] bg-cyan-400 rounded-full transition-all duration-200 ${isPlaying ? 'animate-equalize-4' : 'h-1'}`} />
            </div>
          </div>

          {/* NEXT BUTTON -> Opens Interactive Apology */}
          <motion.button
            id="next-to-interactive-apology-btn"
            onClick={onNext}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="mt-3.5 w-full py-3 px-6 rounded-full font-bold text-slate-950 bg-gradient-to-r from-cyan-300 via-teal-300 to-amber-300 shadow-[0_0_22px_rgba(0,240,255,0.45)] hover:shadow-[0_0_32px_rgba(0,240,255,0.75)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2.5 text-sm uppercase tracking-widest font-mono group select-none"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </motion.button>
        </motion.div>
      </div>

      {/* HTML5 Audio Element */}
      <audio ref={audioRef} id="bg-audio" loop preload="auto" src="./assets/audio.mp3" />
    </div>
  );
};
