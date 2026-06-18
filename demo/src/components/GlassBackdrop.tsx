import type { CSSProperties } from 'react';

export type BackdropVariant =
  | 'aurora'
  | 'violet'
  | 'sunset'
  | 'lime'
  | 'ocean'
  | 'magenta'
  | 'prism'
  | 'grid';

interface GlassBackdropProps {
  variant?: BackdropVariant;
  className?: string;
  style?: CSSProperties;
}

export function GlassBackdrop({
  variant = 'aurora',
  className = '',
  style,
}: GlassBackdropProps) {
  return (
    <div
      className={`gb gb--${variant} ${className}`}
      aria-hidden="true"
      style={style}
    >
      <span className="gb__blob gb__blob--1" />
      <span className="gb__blob gb__blob--2" />
      <span className="gb__blob gb__blob--3" />
      <span className="gb__blob gb__blob--4" />
      <span className="gb__grid" />
    </div>
  );
}
