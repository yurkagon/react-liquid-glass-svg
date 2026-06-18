import { FC } from 'react';

export interface FullFilterProps {
  id: string;
  turbulenceBaseFrequency: string;
  turbulenceSeed: number;
  displacementScale: number;
}

const FullFilter: FC<FullFilterProps> = ({
  id,
  turbulenceBaseFrequency,
  turbulenceSeed,
  displacementScale,
}) => (
  <filter
    id={id}
    x="0%"
    y="0%"
    width="100%"
    height="100%"
    filterUnits="objectBoundingBox"
  >
    <feTurbulence
      type="fractalNoise"
      baseFrequency={turbulenceBaseFrequency}
      numOctaves={1}
      seed={turbulenceSeed}
      result="turbulence"
    />

    <feComponentTransfer in="turbulence" result="mapped">
      <feFuncR type="gamma" amplitude={1} exponent={10} offset={0.5} />
      <feFuncG type="gamma" amplitude={0} exponent={1} offset={0} />
      <feFuncB type="gamma" amplitude={0} exponent={1} offset={0.5} />
    </feComponentTransfer>

    <feGaussianBlur in="turbulence" stdDeviation={3} result="softMap" />

    <feSpecularLighting
      in="softMap"
      surfaceScale={5}
      specularConstant={1}
      specularExponent={100}
      lightingColor="white"
      result="specLight"
    >
      <fePointLight x={-200} y={-200} z={300} />
    </feSpecularLighting>

    <feComposite
      in="specLight"
      operator="arithmetic"
      k1={0}
      k2={1}
      k3={1}
      k4={0}
      result="litImage"
    />

    <feDisplacementMap
      in="SourceGraphic"
      in2="softMap"
      scale={displacementScale}
      xChannelSelector="R"
      yChannelSelector="G"
    />
  </filter>
);

export default FullFilter;
