import React from 'react';

export default function RadarLogo({ size = 40 }) {
  const s = size;
  return (
    <div className="radar-root" style={{ width: s, height: s }} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <radialGradient id="rg" cx="35%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#66f59a" stopOpacity="0.28" />
            <stop offset="40%" stopColor="#0ee6a8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sweep" x1="0" x2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* dark disk */}
        <circle cx="50" cy="50" r="45" fill="#0b1023" />

        {/* concentric rings */}
        <g stroke="#7c3aed" strokeOpacity="0.14" fill="none">
          <circle cx="50" cy="50" r="35" />
          <circle cx="50" cy="50" r="24" />
          <circle cx="50" cy="50" r="12" />
        </g>

        {/* crosshair */}
        <g stroke="#06b6d4" strokeOpacity="0.12" strokeWidth="1">
          <line x1="50" y1="5" x2="50" y2="95" />
          <line x1="5" y1="50" x2="95" y2="50" />
        </g>

        {/* radial glow */}
        <circle cx="50" cy="50" r="45" fill="url(#rg)" />

        {/* clip sweep to circle and rotate the whole sweep around 50,50 */}
        <defs>
          <clipPath id="radarClip">
            <circle cx="50" cy="50" r="45" />
          </clipPath>
        </defs>

        <g clipPath="url(#radarClip)">
          <g>
            <path d="M50,50 L50,5 A45,45 0 0,1 81,19 Z" fill="url(#sweep)" opacity="0.95" />
          </g>
          <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="0 50 50" to="360 50 50" dur="3s" repeatCount="indefinite" />
        </g>

        {/* center dot (pulse) */}
        <g className="radar-center-group">
          <circle className="radar-center-outer" cx="50" cy="50" r="4" fill="#a78bfa" />
          <circle className="radar-center-inner" cx="50" cy="50" r="2" fill="#06b6d4" />
        </g>
      </svg>
    </div>
  );
}
