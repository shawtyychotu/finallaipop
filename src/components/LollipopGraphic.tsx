import React from 'react';
import { motion } from 'motion/react';
import { FlavorConfig } from '../types';

interface LollipopGraphicProps {
  style?: string;
  flavor?: FlavorConfig;
  spinSpeed?: number;
  size?: number; // Size of head/sticker width
  isSpinning?: boolean;
  stickRibbon?: boolean;
  onClick?: () => void;
  scale?: number;
}

export const LollipopGraphic: React.FC<LollipopGraphicProps> = ({
  spinSpeed = 3.5,
  size = 230,
  isSpinning = true,
  onClick,
  scale = 1,
}) => {
  // Direct palette sampled from user reference image
  const mauveColor = '#BE7E91';
  const oatColor = '#CBB99E';
  const stickColor = '#755A65';
  const creamBg = '#FAF6F0';

  return (
    <div
      id="lollipop-wrapper"
      className="relative flex flex-col items-center select-none cursor-pointer group"
      style={{
        width: size,
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      title="Click for a cute wobble!"
    >
      {/* Soft warm ambient glow behind sticker */}
      <div
        className="absolute top-2 rounded-full blur-2xl pointer-events-none transition-all duration-700 opacity-50 group-hover:opacity-75"
        style={{
          width: size * 0.9,
          height: size * 0.9,
          backgroundColor: 'rgba(190, 126, 145, 0.28)',
          transform: 'scale(1.15)',
        }}
      />

      {/* Floating & Gentle Wobble Container */}
      <motion.div
        className="relative flex flex-col items-center"
        animate={{
          y: [-5, 5, -5],
          rotate: [-1.2, 1.2, -1.2],
        }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* ENTIRE STICKER CONTAINER with realistic Die-Cut White Border & Drop Shadow */}
        <div
          className="relative transition-transform duration-300 group-hover:scale-105 active:scale-95"
          style={{
            filter: 'drop-shadow(0px 10px 22px rgba(110, 75, 90, 0.18)) drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.07))',
          }}
        >
          <svg
            width={size}
            height={size * 1.55}
            viewBox="0 0 240 370"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible select-none"
          >
            <defs>
              {/* Circular clip path for the spinning candy head pattern */}
              <clipPath id="candyHeadClip">
                <circle cx="120" cy="115" r="86" />
              </clipPath>
              {/* Soft organic outer sticker shadow filter */}
              <filter id="stickerInnerGlow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#9C7785" floodOpacity="0.1" />
              </filter>
            </defs>

            {/* 1. SOLID DIE-CUT WHITE STICKER BACKING (Head + Stick Border) */}
            <g id="sticker-die-cut-outline">
              {/* Stick Die-Cut Margin */}
              <path
                d="M 103 160 L 103 350 C 103 358 137 358 137 350 L 137 160 Z"
                fill="#FFFFFF"
                stroke="#FFFFFF"
                strokeWidth="12"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {/* Head Die-Cut Margin (Hand-drawn organic circle) */}
              <ellipse
                cx="120"
                cy="115"
                rx="98"
                ry="97"
                fill="#FFFFFF"
                stroke="#FFFFFF"
                strokeWidth="10"
                strokeLinejoin="round"
              />
              {/* Very subtle hand-drawn warm edge line to give authentic sticker cut feel */}
              <ellipse
                cx="120"
                cy="115"
                rx="97"
                ry="96"
                fill="none"
                stroke="#F2ECE4"
                strokeWidth="1.5"
                opacity="0.75"
              />
            </g>

            {/* 2. THE HAND-DRAWN STICK (Dusty Plum-Brown) */}
            <g id="lollipop-stick">
              <path
                d="M 112 180 C 111.5 220, 112.5 280, 112 352 C 112 355, 128 355, 128 352 C 127.5 280, 128.5 220, 128 180 Z"
                fill={stickColor}
              />
              {/* Stick subtle hand-drawn organic variation */}
              <path
                d="M 116 190 L 116 345"
                stroke="#8A6B78"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.35"
              />
            </g>

            {/* 3. CANDY HEAD BACKGROUND DISK */}
            <ellipse
              cx="120"
              cy="115"
              rx="87"
              ry="86"
              fill={creamBg}
            />

            {/* 4. ROTATING HAND-DRAWN CANDY SWIRL PATTERN */}
            <g clipPath="url(#candyHeadClip)">
              <motion.g
                animate={isSpinning ? { rotate: 360 } : { rotate: 0 }}
                transition={{
                  repeat: Infinity,
                  ease: 'linear',
                  duration: spinSpeed,
                }}
                style={{
                  transformOrigin: '120px 115px',
                  willChange: 'transform',
                }}
              >
                {/* Background base fill */}
                <circle cx="120" cy="115" r="95" fill={creamBg} />

                {/* --- EXACT HAND-DRAWN SWIRL PATHS MATCHING USER IMAGE --- */}

                {/* A. OUTER MAUVE SWIRL COIL */}
                <path
                  d="M 52 140 
                     C 42 105, 58 62, 92 42 
                     C 130 20, 178 30, 202 65 
                     C 224 100, 218 152, 188 182 
                     C 160 210, 112 214, 76 192 
                     C 60 180, 48 160, 46 142"
                  fill="none"
                  stroke={mauveColor}
                  strokeWidth="21"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* B. OAT/BEIGE SWIRL COIL (Inner track spiraling toward center) */}
                <path
                  d="M 78 88 
                     C 105 60, 155 58, 182 85 
                     C 205 110, 202 148, 180 172 
                     C 155 198, 112 196, 88 172 
                     C 66 148, 72 112, 96 90 
                     C 120 70, 156 76, 172 102 
                     C 185 125, 175 152, 152 165 
                     C 130 176, 108 166, 102 145"
                  fill="none"
                  stroke={oatColor}
                  strokeWidth="19"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* C. INNER MAUVE SWIRL COIL (Nested inside oat swirl) */}
                <path
                  d="M 104 98 
                     C 128 80, 160 86, 172 112 
                     C 184 136, 172 162, 148 170 
                     C 125 178, 104 165, 100 142 
                     C 96 118, 115 102, 136 104 
                     C 152 106, 160 122, 154 138 
                     C 148 150, 134 154, 124 146"
                  fill="none"
                  stroke={mauveColor}
                  strokeWidth="17"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* D. CENTER OAT/BEIGE HOOK & CORE SWIRL */}
                <path
                  d="M 124 116 
                     C 136 114, 145 124, 142 136 
                     C 139 146, 128 148, 122 140 
                     C 116 132, 120 122, 128 122"
                  fill="none"
                  stroke={oatColor}
                  strokeWidth="15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* E. INNER MAUVE ACCENT DOT / CORE BUD (as seen in reference) */}
                <circle
                  cx="115"
                  cy="134"
                  r="7.5"
                  fill={mauveColor}
                />

                {/* F. SECONDARY INNER CREAM HIGHLIGHT CRESCENT */}
                <path
                  d="M 112 110 C 118 106, 126 106, 130 110"
                  fill="none"
                  stroke="#FAF6F0"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  opacity="0.9"
                />
              </motion.g>
            </g>

            {/* 5. GENTLE HAND-DRAWN RIM CONTOUR OVER CANDY DISK */}
            <ellipse
              cx="120"
              cy="115"
              rx="86.5"
              ry="85.5"
              fill="none"
              stroke="#E8DFD3"
              strokeWidth="2"
              opacity="0.6"
              pointerEvents="none"
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

