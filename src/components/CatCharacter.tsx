import React from 'react';
import { motion } from 'motion/react';
import { CatMood } from '../types';

interface CatCharacterProps {
  mood: CatMood;
  className?: string;
}

export const CatCharacter: React.FC<CatCharacterProps> = ({ mood, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Floating distress bubbles for crying mood */}
      {mood === 'crying' && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0 }}
          className="absolute -top-12 z-10 flex items-center gap-1.5"
        >
          <motion.div
            animate={{ y: [-2, 2, -2], rotate: [-4, 4, -4] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="flex items-center gap-1"
          >
            {/* Thought/steam bubbles */}
            <span className="w-2.5 h-2.5 rounded-full border-2 border-slate-700 bg-white inline-block"></span>
            <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-700 bg-white inline-block"></span>
            <div className="px-2.5 py-1 bg-white border-2 border-slate-700 rounded-2xl flex items-center gap-1 shadow-sm">
              <span className="text-sm">💦</span>
              <span className="text-xs font-bold text-slate-600">sorry...</span>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Floating lollipops for celebrating mood */}
      {mood === 'celebrating' && (
        <div className="absolute -top-10 inset-x-0 flex justify-center pointer-events-none">
          {[
            { x: -52, delay: 0, scale: 1 },
            { x: 48, delay: 0.2, scale: 0.9 },
            { x: -12, delay: 0.4, scale: 1.15 },
            { x: 72, delay: 0.6, scale: 0.95 },
          ].map((item, idx) => (
            <motion.span
              key={idx}
              initial={{ y: 20, opacity: 0, scale: 0.5 }}
              animate={{
                y: [-10, -45, -60],
                opacity: [0, 1, 0],
                scale: [item.scale, item.scale * 1.15, item.scale * 0.8],
                x: [item.x, item.x + (idx % 2 === 0 ? 8 : -8)],
                rotate: [0, idx % 2 === 0 ? 15 : -15, 0]
              }}
              transition={{
                repeat: Infinity,
                duration: 2.2,
                delay: item.delay,
                ease: "easeOut"
              }}
              className="absolute text-xl select-none"
            >
              🍭
            </motion.span>
          ))}
        </div>
      )}

      {/* Main Cat Illustration Container */}
      <motion.div
        key={mood}
        initial={{ scale: 0.92, opacity: 0.9 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="w-48 h-48 md:w-56 md:h-56 relative flex items-center justify-center"
      >
        {mood === 'celebrating' ? (
          /* Cat Lying Down Hugging Giant Swirl Lollipop */
          <svg viewBox="0 0 240 200" className="w-full h-full drop-shadow-md overflow-visible">
            {/* Soft Blue Shadow */}
            <ellipse cx="120" cy="180" rx="90" ry="12" fill="#bae6fd" opacity="0.6" />

            {/* Cat Body (Tilted/Lying down) */}
            <g transform="translate(10, 5)">
              {/* Fluffy tail wagging */}
              <motion.path
                d="M 40 145 C 15 145, 10 115, 25 105 C 32 100, 42 115, 45 130 Z"
                fill="#ffffff"
                stroke="#2d2d2d"
                strokeWidth="3.5"
                strokeLinejoin="round"
                style={{ transformOrigin: "40px 145px" }}
                animate={{ rotate: [-8, 8, -8] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />

              {/* Main Body */}
              <path
                d="M 50 145 C 40 100, 80 80, 140 85 C 180 90, 200 125, 195 155 C 190 175, 140 175, 90 170 C 60 168, 52 160, 50 145 Z"
                fill="#ffffff"
                stroke="#2d2d2d"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              {/* Back feet/paws */}
              <ellipse cx="60" cy="162" rx="14" ry="10" fill="#ffffff" stroke="#2d2d2d" strokeWidth="3" />
              <path d="M 56 164 L 56 170 M 62 164 L 62 170" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" />

              <ellipse cx="190" cy="155" rx="14" ry="10" fill="#ffffff" stroke="#2d2d2d" strokeWidth="3" />
              <path d="M 186 157 L 186 163 M 192 157 L 192 163" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" />

              {/* Head */}
              <path
                d="M 70 95 C 65 60, 95 45, 125 45 C 160 45, 175 70, 168 100 C 160 120, 120 125, 85 115 C 72 110, 70 102, 70 95 Z"
                fill="#ffffff"
                stroke="#2d2d2d"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />

              {/* Left Ear */}
              <path
                d="M 80 62 L 72 32 C 85 35, 95 44, 102 52 Z"
                fill="#ffffff"
                stroke="#2d2d2d"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <path d="M 82 56 L 77 39 C 85 41, 91 46, 95 51 Z" fill="#bae6fd" />

              {/* Right Ear */}
              <path
                d="M 140 50 C 148 42, 158 35, 168 36 L 158 64 Z"
                fill="#ffffff"
                stroke="#2d2d2d"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <path d="M 146 51 C 151 45, 158 41, 163 42 L 156 59 Z" fill="#bae6fd" />

              {/* Happy closed crescent eyes (^ ^) */}
              <path d="M 92 78 Q 101 70 110 78" fill="none" stroke="#2d2d2d" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 132 78 Q 141 70 150 78" fill="none" stroke="#2d2d2d" strokeWidth="3.5" strokeLinecap="round" />

              {/* Blushing blue/cyan cheeks */}
              <ellipse cx="88" cy="88" rx="8" ry="5" fill="#93c5fd" opacity="0.85" />
              <ellipse cx="154" cy="88" rx="8" ry="5" fill="#93c5fd" opacity="0.85" />

              {/* Cute Cat Mouth :3 */}
              <path d="M 116 85 Q 120 90 124 85 Q 128 90 132 85" fill="none" stroke="#2d2d2d" strokeWidth="3" strokeLinecap="round" />

              {/* Giant Hugged Swirl Lollipop */}
              <motion.g
                animate={{ scale: [1, 1.04, 1], rotate: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                transform="translate(132, 92)"
              >
                {/* Stick */}
                <line x1="5" y1="18" x2="28" y2="65" stroke="#2d2d2d" strokeWidth="8" strokeLinecap="round" />
                <line x1="5" y1="18" x2="28" y2="65" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />

                {/* Lollipop Head / Base */}
                <circle cx="0" cy="0" r="30" fill="#0284c7" stroke="#2d2d2d" strokeWidth="3.5" />

                {/* Swirl Spiral Patterns in Blue, Sky and White */}
                <path
                  d="M 0 -28 A 28 28 0 0 1 28 0 C 18 0, 8 -10, 0 -28 Z"
                  fill="#38bdf8"
                />
                <path
                  d="M 28 0 A 28 28 0 0 1 0 28 C 0 18, 10 8, 28 0 Z"
                  fill="#bae6fd"
                />
                <path
                  d="M 0 28 A 28 28 0 0 1 -28 0 C -18 0, -8 10, 0 28 Z"
                  fill="#38bdf8"
                />
                <path
                  d="M -28 0 A 28 28 0 0 1 0 -28 C 0 -18, -10 -8, -28 0 Z"
                  fill="#ffffff"
                />

                {/* Concentric spiral outline */}
                <path
                  d="M -22 -12 C -12 -24, 16 -20, 22 -4 C 26 12, 12 24, -4 22 C -16 18, -18 6, -8 -4 C 0 -10, 10 -6, 8 2 C 6 6, 2 6, 0 2"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <circle cx="0" cy="0" r="4.5" fill="#ffffff" />

                {/* Glossy Candy Highlight */}
                <path
                  d="M -16 -16 A 22 22 0 0 1 8 -22"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.9"
                />
              </motion.g>

              {/* Paws wrapped around the lollipop stick and candy */}
              <ellipse cx="118" cy="108" rx="11" ry="8" fill="#ffffff" stroke="#2d2d2d" strokeWidth="3" transform="rotate(-15 118 108)" />
              <ellipse cx="156" cy="112" rx="11" ry="8" fill="#ffffff" stroke="#2d2d2d" strokeWidth="3" transform="rotate(20 156 112)" />
            </g>
          </svg>
        ) : mood === 'crying' ? (
          /* Kitten covering face with paws crying / embarrassed */
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md overflow-visible">
            {/* Soft Blue Shadow */}
            <ellipse cx="100" cy="182" rx="65" ry="10" fill="#bae6fd" opacity="0.6" />

            {/* Body */}
            <path
              d="M 60 145 C 55 180, 145 180, 140 145 C 135 125, 65 125, 60 145 Z"
              fill="#ffffff"
              stroke="#2d2d2d"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Feet */}
            <ellipse cx="75" cy="178" rx="14" ry="8" fill="#ffffff" stroke="#2d2d2d" strokeWidth="3" />
            <ellipse cx="125" cy="178" rx="14" ry="8" fill="#ffffff" stroke="#2d2d2d" strokeWidth="3" />

            {/* Head */}
            <path
              d="M 50 100 C 45 65, 75 50, 100 50 C 125 50, 155 65, 150 100 C 150 140, 50 140, 50 100 Z"
              fill="#ffffff"
              stroke="#2d2d2d"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Left Ear */}
            <path
              d="M 58 68 L 48 35 C 65 38, 76 50, 80 60 Z"
              fill="#ffffff"
              stroke="#2d2d2d"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path d="M 60 62 L 54 42 C 65 44, 71 52, 74 58 Z" fill="#bae6fd" />

            {/* Right Ear */}
            <path
              d="M 120 60 C 124 50, 135 38, 152 35 L 142 68 Z"
              fill="#ffffff"
              stroke="#2d2d2d"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path d="M 126 58 C 129 52, 135 44, 146 42 L 140 62 Z" fill="#bae6fd" />

            {/* Eyes peeking or tears streaming from behind paws */}
            <path d="M 75 92 Q 80 88 85 92" fill="none" stroke="#2d2d2d" strokeWidth="3" strokeLinecap="round" />
            <path d="M 115 92 Q 120 88 125 92" fill="none" stroke="#2d2d2d" strokeWidth="3" strokeLinecap="round" />

            {/* Tears streaming down */}
            <motion.path
              d="M 68 98 C 65 110, 68 122, 70 126"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="3"
              strokeLinecap="round"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
            <motion.path
              d="M 132 98 C 135 110, 132 122, 130 126"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="3"
              strokeLinecap="round"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
            />

            {/* Big Blush spread on cheeks (Soft Blue) */}
            <ellipse cx="68" cy="102" rx="14" ry="8" fill="#93c5fd" opacity="0.8" />
            <ellipse cx="132" cy="102" rx="14" ry="8" fill="#93c5fd" opacity="0.8" />
            {/* Cute blush hatch marks */}
            <line x1="63" y1="99" x2="67" y2="105" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="68" y1="99" x2="72" y2="105" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="128" y1="99" x2="132" y2="105" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="133" y1="99" x2="137" y2="105" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />

            {/* Cute whimpering mouth visible under paws */}
            <path d="M 96 112 Q 100 108 104 112" fill="none" stroke="#2d2d2d" strokeWidth="2.5" strokeLinecap="round" />

            {/* Paws covering face */}
            <g>
              {/* Left paw over left eye/cheek */}
              <ellipse cx="85" cy="102" rx="15" ry="18" fill="#ffffff" stroke="#2d2d2d" strokeWidth="3.5" transform="rotate(-20 85 102)" />
              <path d="M 78 95 L 82 99 M 84 92 L 87 97" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" />

              {/* Right paw over right eye/cheek */}
              <ellipse cx="115" cy="102" rx="15" ry="18" fill="#ffffff" stroke="#2d2d2d" strokeWidth="3.5" transform="rotate(20 115 102)" />
              <path d="M 122 95 L 118 99 M 116 92 L 113 97" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" />
            </g>
          </svg>
        ) : (
          /* Happy / Curious / Pleading Cat */
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md overflow-visible">
            {/* Soft Blue Shadow */}
            <ellipse cx="100" cy="182" rx="65" ry="10" fill="#bae6fd" opacity="0.6" />

            {/* Body */}
            <path
              d="M 60 145 C 55 180, 145 180, 140 145 C 135 125, 65 125, 60 145 Z"
              fill="#ffffff"
              stroke="#2d2d2d"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Feet */}
            <ellipse cx="75" cy="178" rx="14" ry="8" fill="#ffffff" stroke="#2d2d2d" strokeWidth="3" />
            <ellipse cx="125" cy="178" rx="14" ry="8" fill="#ffffff" stroke="#2d2d2d" strokeWidth="3" />

            {/* Head */}
            <path
              d="M 50 100 C 45 65, 75 50, 100 50 C 125 50, 155 65, 150 100 C 150 140, 50 140, 50 100 Z"
              fill="#ffffff"
              stroke="#2d2d2d"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />

            {/* Left Ear */}
            <path
              d="M 58 68 L 48 35 C 65 38, 76 50, 80 60 Z"
              fill="#ffffff"
              stroke="#2d2d2d"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path d="M 60 62 L 54 42 C 65 44, 71 52, 74 58 Z" fill="#bae6fd" />

            {/* Right Ear */}
            <path
              d="M 120 60 C 124 50, 135 38, 152 35 L 142 68 Z"
              fill="#ffffff"
              stroke="#2d2d2d"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path d="M 126 58 C 129 52, 135 44, 146 42 L 140 62 Z" fill="#bae6fd" />

            {/* Eyes */}
            {mood === 'pleading' ? (
              /* Big sparkly pleading eyes */
              <g>
                <circle cx="78" cy="90" r="13" fill="#2d2d2d" />
                <circle cx="75" cy="87" r="5" fill="#ffffff" />
                <circle cx="82" cy="93" r="2.5" fill="#ffffff" />

                <circle cx="122" cy="90" r="13" fill="#2d2d2d" />
                <circle cx="119" cy="87" r="5" fill="#ffffff" />
                <circle cx="126" cy="93" r="2.5" fill="#ffffff" />
              </g>
            ) : (
              /* Big classic anime cat eyes */
              <g>
                <ellipse cx="78" cy="90" rx="10" ry="12" fill="#2d2d2d" />
                <circle cx="76" cy="87" r="4" fill="#ffffff" />
                <circle cx="81" cy="93" r="2" fill="#ffffff" />

                <ellipse cx="122" cy="90" rx="10" ry="12" fill="#2d2d2d" />
                <circle cx="120" cy="87" r="4" fill="#ffffff" />
                <circle cx="125" cy="93" r="2" fill="#ffffff" />
              </g>
            )}

            {/* Cheeks (Soft Blue Blush) */}
            <ellipse cx="66" cy="102" rx="9" ry="6" fill="#93c5fd" />
            <ellipse cx="134" cy="102" rx="9" ry="6" fill="#93c5fd" />

            {/* Mouth */}
            {mood === 'happy' || mood === 'curious' ? (
              /* Open happy mouth with cute blue/cyan tongue */
              <g>
                <path
                  d="M 94 99 Q 100 102 106 99 C 106 112, 94 112, 94 99 Z"
                  fill="#0284c7"
                  stroke="#2d2d2d"
                  strokeWidth="2.5"
                />
                <path
                  d="M 95 106 Q 100 103 105 106"
                  fill="#38bdf8"
                />
                <path d="M 100 96 L 100 100" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" />
              </g>
            ) : (
              /* Pleading small mouth */
              <path d="M 95 102 Q 100 105 105 102" fill="none" stroke="#2d2d2d" strokeWidth="2.5" strokeLinecap="round" />
            )}

            {/* Tiny front paws resting adorably */}
            <ellipse cx="86" cy="138" rx="11" ry="8" fill="#ffffff" stroke="#2d2d2d" strokeWidth="3" />
            <ellipse cx="114" cy="138" rx="11" ry="8" fill="#ffffff" stroke="#2d2d2d" strokeWidth="3" />
          </svg>
        )}
      </motion.div>
    </div>
  );
};
