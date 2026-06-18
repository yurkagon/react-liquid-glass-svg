'use client';

import { FC, useId } from 'react';
import type { LiquidGlassProps } from './types';
import { useBrowserDetection } from '../hooks/useBrowserDetection';

import FullFilter from './FullFilter';
import SimpleFilter from './SimpleFilter';

const DEFAULT_SHADOW =
  '0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)';

const GLASS_BORDER_OUTER_SHADOW = '0 8px 32px rgba(0,0,0,0.28)';

const GLASS_BORDER_INSET_SHADOW =
  'inset 0 1px 0 0 rgba(255,255,255,0.55), ' +
  'inset 0 -1px 1px 0 rgba(255,255,255,0.12), ' +
  'inset 0 0 0 1px rgba(255,255,255,0.08)';

const formatBaseFrequency = (value: number | [number, number]): string =>
  Array.isArray(value) ? `${value[0]} ${value[1]}` : `${value}`;

const LiquidGlass: FC<LiquidGlassProps> = ({
  children,
  className = '',
  backdropBlur = 2,
  tintColor = 'rgba(255, 255, 255, .2)',
  displacementScale = 150,
  turbulenceBaseFrequency = 0.008,
  turbulenceSeed = 1.5,
  as: Component = 'div',
  style,
  glassBorder = false,
  ...rest
}) => {
  const filterId = useId();
  const { hasFullFilterSupport } = useBrowserDetection();
  const baseFrequency = formatBaseFrequency(turbulenceBaseFrequency);

  return (
    <>
      <svg style={{ display: 'none' }}>
        {hasFullFilterSupport ? (
          <FullFilter
            id={filterId}
            turbulenceBaseFrequency={baseFrequency}
            turbulenceSeed={turbulenceSeed}
            displacementScale={displacementScale}
          />
        ) : (
          <SimpleFilter
            id={filterId}
            turbulenceBaseFrequency={baseFrequency}
            turbulenceSeed={turbulenceSeed}
          />
        )}
      </svg>

      <Component
        className={className}
        style={{
          position: 'relative',
          overflow: 'hidden',
          boxShadow: glassBorder ? GLASS_BORDER_OUTER_SHADOW : DEFAULT_SHADOW,
          ...style,
        }}
        {...rest}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            overflow: 'hidden',
            borderRadius: 'inherit',
            backdropFilter: `blur(${backdropBlur}px)`,
            WebkitBackdropFilter: `blur(${backdropBlur}px)`,
            filter: `url(#${filterId})`,
            isolation: 'isolate',
            ...(!hasFullFilterSupport && {
              transform: 'translateZ(0)',
              willChange: 'transform',
            }),
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            borderRadius: 'inherit',
            background: tintColor,
          }}
        />

        {glassBorder && (
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              borderRadius: 'inherit',
              pointerEvents: 'none',
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 38%, rgba(255,255,255,0) 62%, rgba(255,255,255,0.06) 100%)',
              boxShadow: GLASS_BORDER_INSET_SHADOW,
            }}
          />
        )}

        <div
          style={{ position: 'relative', zIndex: 3, borderRadius: 'inherit' }}
        >
          {children}
        </div>
      </Component>
    </>
  );
};

export default LiquidGlass;
