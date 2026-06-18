import { FC } from 'react';

export interface SimpleFilterProps {
  id: string;
  turbulenceBaseFrequency: string;
  turbulenceSeed: number;
}

const SimpleFilter: FC<SimpleFilterProps> = ({
  id,
  turbulenceBaseFrequency,
  turbulenceSeed,
}) => (
  <filter
    id={id}
    x="-20%"
    y="-20%"
    width="140%"
    height="140%"
    filterUnits="objectBoundingBox"
  >
    <feTurbulence
      type="fractalNoise"
      baseFrequency={turbulenceBaseFrequency}
      numOctaves={2}
      seed={turbulenceSeed}
      result="turbulence"
    />
    <feGaussianBlur in="turbulence" stdDeviation="2" result="blur" />
    <feColorMatrix
      in="blur"
      type="matrix"
      values="1 0 0 0 0
              0 1 0 0 0
              0 0 1 0 0
              0 0 0 0.15 0"
      result="transparency"
    />
    <feBlend in="SourceGraphic" in2="transparency" mode="normal" />
  </filter>
);

export default SimpleFilter;
