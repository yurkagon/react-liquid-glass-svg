import { ReactNode, CSSProperties, ElementType, HTMLAttributes } from 'react';

export interface LiquidGlassProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'as'
> {
  /** Content to display inside the glass container */
  children?: ReactNode;

  /** Additional TailwindCSS classes */
  className?: string;

  /** Blur level for the backdrop filter (in px) */
  backdropBlur?: number;

  /** Tint overlay color */
  tintColor?: string;

  /** Displacement map scale (liquid effect intensity) */
  displacementScale?: number;

  /**
   * Turbulence base frequency (controls noise size).
   * - Single number — applied to both x and y axes.
   * - `[x, y]` tuple — different frequencies per axis.
   */
  turbulenceBaseFrequency?: number | [number, number];

  /** Turbulence seed (for different noise patterns) */
  turbulenceSeed?: number;

  /** HTML component to render (div, button, section, etc.) */
  as?: ElementType;

  /** Additional inline styles */
  style?: CSSProperties;

  /**
   * Enable iOS-style polished glass edge: inset highlights + diagonal
   * specular sheen. Default: false (uses the original soft drop-shadow).
   */
  glassBorder?: boolean;
}
