import { LiquidGlass } from 'react-liquid-glass-svg';

import { CopyButton } from '@/components/CopyButton';
import { GlassBackdrop } from '@/components/GlassBackdrop';

export const INSTALL = 'npm install react-liquid-glass-svg';

const FEATURES = [
  {
    t: 'Apple liquid glass',
    d: 'A displacement-mapped effect you can dial to any intensity.',
  },
  {
    t: 'Full TypeScript',
    d: 'Exhaustive types and autocomplete for every prop.',
  },
  {
    t: 'Tailwind-friendly',
    d: 'Style through className — no wrappers, no clashes.',
  },
  {
    t: 'Polymorphic API',
    d: 'Renders as any tag: div, button, section, nav…',
  },
  {
    t: 'Cross-browser',
    d: 'Works everywhere, with a Safari & iOS fallback.',
  },
  {
    t: 'Zero dependencies',
    d: 'Peer deps only. ESM and CJS in the box.',
  },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[132px] pb-4" id="top">
      <GlassBackdrop variant="aurora" className="hero__bg" />
      <div className="relative z-[2] mx-auto flex max-w-[760px] flex-col items-center px-7 text-center">
        <div className="text-inkfaint mb-[18px] font-mono text-[12.5px] tracking-[0.05em]">
          MIT-licensed · TypeScript · React 18+
        </div>

        <h1 className="font-disp m-0 mb-[18px] max-w-[16ch] text-[clamp(34px,5.2vw,56px)] leading-[1.04] font-bold tracking-[-0.03em] text-balance">
          Apple liquid glass,
          <br />
          <span className="from-accent3 via-accent to-accent2 bg-gradient-to-r bg-clip-text text-transparent">
            as a React component
          </span>
        </h1>

        <p className="text-inkdim m-0 mb-7 max-w-[58ch] text-[clamp(15px,1.7vw,17.5px)] text-pretty">
          Wrap anything in{' '}
          <code className="text-ink rounded-[7px] bg-white/[0.08] px-2 py-0.5 font-mono text-[0.88em]">
            &lt;LiquidGlass /&gt;
          </code>{' '}
          and it refracts the background like real glass — pure SVG turbulence
          and a displacement map over backdrop-blur. No WebGL, no canvas, no
          shaders — just browser primitives, controlled through props.
        </p>

        <div className="mb-11 flex flex-wrap items-center justify-center gap-4">
          <div className="border-line inline-flex items-center gap-3 rounded-[13px] border bg-[rgba(8,9,13,0.6)] py-[11px] pr-[11px] pl-[18px] font-mono text-[14.5px] backdrop-blur-[10px]">
            <span className="text-accent3 font-semibold">$</span>
            <code className="text-ink">{INSTALL}</code>
            <CopyButton text={INSTALL} />
          </div>
          <a
            className="text-accent3 text-[14.5px] font-semibold transition-opacity hover:opacity-70"
            href="#examples"
          >
            Browse examples →
          </a>
        </div>

        <div
          className="relative m-0 w-full max-w-[600px] scroll-mt-24"
          id="features"
        >
          <LiquidGlass
            className="block w-full rounded-[22px] text-left"
            glassBorder
            backdropBlur={3}
            tintColor="rgba(255,255,255,0.1)"
            displacementScale={170}
            turbulenceBaseFrequency={0.007}
            turbulenceSeed={1.5}
          >
            <div className="px-[30px] py-7">
              <div className="mb-2.5 font-mono text-[12.5px] tracking-[0.04em] text-white/70">
                &lt;LiquidGlass /&gt;
              </div>
              <h2 className="font-disp m-0 mb-[18px] text-[20px] leading-[1.2] font-semibold tracking-[-0.01em] text-white">
                Everything you need for glassmorphism
              </h2>
              <ul className="m-0 grid list-none grid-cols-2 gap-x-7 p-0 max-[540px]:grid-cols-1">
                {FEATURES.map((f, i) => (
                  <li
                    className="flex flex-col gap-[3px] border-t border-white/[0.14] py-3"
                    key={i}
                  >
                    <span className="font-disp text-[13.5px] font-semibold text-white">
                      {f.t}
                    </span>
                    <span className="text-[12px] leading-[1.45] text-white/70">
                      {f.d}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-[18px] mb-0 border-t border-white/[0.14] pt-3.5 text-[12px] text-white/60">
                Every line above sits on real glass — scroll the page and the
                light shifts with the background.
              </p>
            </div>
          </LiquidGlass>
        </div>
      </div>
    </section>
  );
}
