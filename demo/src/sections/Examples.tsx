import { useState, type ReactNode } from 'react';
import { LiquidGlass } from 'react-liquid-glass-svg';

import { Code } from '@/components/Code';
import {
  GlassBackdrop,
  type BackdropVariant,
} from '@/components/GlassBackdrop';
import { Section } from '@/components/Section';

interface Example {
  key: string;
  name: string;
  desc: string;
  bg: BackdropVariant;
  code: string;
  render: () => ReactNode;
}

const EXAMPLES: Example[] = [
  {
    key: 'player',
    name: 'Music Player',
    desc: 'Mini player widget — album art, controls, progress bar.',
    bg: 'ocean',
    code: `<LiquidGlass
  glassBorder
  backdropBlur={5}
  tintColor="rgba(255,255,255,0.15)"
  className="rounded-2xl p-5 w-[360px]"
>
  <div className="flex items-center gap-4">
    <AlbumArt />
    <TrackMeta />
    <PlayControls />
  </div>
  <ProgressBar value={42} />
</LiquidGlass>`,
    render: () => (
      <LiquidGlass
        glassBorder
        className="block w-[min(400px,100%)] rounded-[18px] p-5 text-left"
        backdropBlur={5}
        tintColor="rgba(255,255,255,0.15)"
        displacementScale={130}
        turbulenceBaseFrequency={0.008}
      >
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 shrink-0 rounded-[12px] bg-gradient-to-br from-[#ff5fae] via-[#b14bff] to-[#36c9ff] shadow-[0_6px_18px_rgba(177,75,255,0.45)]" />
          <div className="min-w-0 flex-1">
            <div className="font-disp truncate text-[15px] font-semibold text-white">
              Liquid Skies
            </div>
            <div className="truncate text-[12.5px] text-white/65">
              Ambient Drift
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full text-white/85 transition-colors hover:bg-white/15 hover:text-white"
              aria-label="Previous"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 6h2v12H6zM9.5 12l8.5 6V6z" />
              </svg>
            </button>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full bg-white text-black shadow-[0_4px_14px_rgba(0,0,0,0.35)] transition-transform hover:scale-105"
              aria-label="Play"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full text-white/85 transition-colors hover:bg-white/15 hover:text-white"
              aria-label="Next"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <span className="font-mono text-[11px] text-white/65 tabular-nums">
            1:24
          </span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-[42%] rounded-full bg-white" />
          </div>
          <span className="font-mono text-[11px] text-white/65 tabular-nums">
            3:18
          </span>
        </div>
      </LiquidGlass>
    ),
  },
  {
    key: 'navbar',
    name: 'Navbar',
    desc: 'Polymorphic glass navbar — logo, links, mobile menu trigger.',
    bg: 'grid',
    code: `<LiquidGlass
  backdropBlur={1.2}
  tintColor="rgba(0,0,0,0.2)"
  displacementScale={60}
  turbulenceSeed={1}
  className="rounded-2xl"
>
  <nav className="flex h-16 items-center justify-between px-6">
    <a href="/" className="flex items-center gap-2">
      <Logo />
      <span>yurkagon</span>
    </a>
    <div className="flex items-center gap-4">
      <a href="/work">Work</a>
      <a href="/notes">Notes</a>
      <a href="/about">About</a>
      <button aria-label="Open menu">
        <Menu />
      </button>
    </div>
  </nav>
</LiquidGlass>`,
    render: () => (
      <LiquidGlass
        backdropBlur={1.2}
        tintColor="rgba(0,0,0,0.2)"
        displacementScale={60}
        turbulenceSeed={1}
        className="block w-[min(400px,100%)] rounded-2xl"
      >
        <nav
          aria-label="Main"
          className="flex h-[60px] items-center justify-between px-4"
        >
          <a href="#top" className="flex items-center gap-2" aria-label="Home">
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-gradient-to-br from-[#7fd1ff] via-[#a78bfa] to-[#ff5fae] shadow-[0_4px_14px_rgba(167,139,250,0.45)]"
              aria-hidden="true"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12L12 4l8 8M6 10v10h12V10" />
              </svg>
            </span>
            <span className="truncate font-mono text-[14px] font-medium tracking-wide text-white">
              yurkagon
            </span>
          </a>
          <div className="flex items-center gap-1">
            <div className="hidden items-center gap-1 sm:flex">
              <a
                className="rounded-full px-2.5 py-1.5 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                href="#examples"
              >
                Work
              </a>
              <a
                className="rounded-full px-2.5 py-1.5 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                href="#sandbox"
              >
                Notes
              </a>
              <a
                className="rounded-full px-2.5 py-1.5 text-[13px] font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                href="#install"
              >
                About
              </a>
            </div>
            <button
              type="button"
              aria-label="Open menu"
              className="grid h-9 w-9 cursor-pointer place-items-center rounded-full text-white/85 transition-colors hover:bg-white/15 hover:text-white"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </button>
          </div>
        </nav>
      </LiquidGlass>
    ),
  },
  {
    key: 'stats',
    name: 'Stats',
    desc: 'KPI card with trend indicator — dashboards, analytics surfaces.',
    bg: 'lime',
    code: `<LiquidGlass
  glassBorder
  backdropBlur={5}
  tintColor="rgba(255,255,255,0.2)"
  className="rounded-2xl p-6"
>
  <Header label="Active users" trend={8.2} />
  <BigNumber value="12.4k" />
  <Sparkline data={[...]} />
  <Footer days={7} />
</LiquidGlass>`,
    render: () => (
      <LiquidGlass
        glassBorder
        className="block w-[min(400px,100%)] rounded-[18px] p-6 text-left"
        backdropBlur={5}
        tintColor="rgba(255,255,255,0.2)"
        displacementScale={110}
        turbulenceBaseFrequency={0.008}
        turbulenceSeed={5}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="font-mono text-[11px] tracking-[0.16em] text-white/70 uppercase">
            Active users
          </div>
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-400/20 px-1.5 py-0.5 font-mono text-[12px] font-semibold text-emerald-200">
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="18 15 12 9 6 15" />
            </svg>
            8.2%
          </span>
        </div>

        <div className="mt-3 flex items-end justify-between gap-3">
          <div className="font-disp text-[44px] leading-none font-bold tracking-[-0.02em] text-white">
            12.4k
          </div>
          <div className="text-right">
            <div className="font-mono text-[11px] tracking-[0.1em] text-white/55 uppercase">
              Peak
            </div>
            <div className="font-mono text-[14px] font-semibold text-white">
              14.2k
            </div>
          </div>
        </div>

        <svg
          viewBox="0 0 200 50"
          preserveAspectRatio="none"
          className="mt-5 h-[56px] w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="lg-spark-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.35" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,38 L20,32 L40,34 L60,24 L80,28 L100,18 L120,22 L140,12 L160,16 L180,8 L200,14 L200,50 L0,50 Z"
            fill="url(#lg-spark-fill)"
          />
          <path
            d="M0,38 L20,32 L40,34 L60,24 L80,28 L100,18 L120,22 L140,12 L160,16 L180,8 L200,14"
            fill="none"
            stroke="white"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-3">
          <span className="font-mono text-[11px] text-white/55">
            Last 7 days
          </span>
          <span className="inline-flex items-center gap-1 text-[12px] font-medium text-white/70 transition-colors hover:text-white">
            Details
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </span>
        </div>
      </LiquidGlass>
    ),
  },
  {
    key: 'search',
    name: 'Search',
    desc: 'Command-palette style search bar with keyboard hint.',
    bg: 'aurora',
    code: `<LiquidGlass
  glassBorder
  backdropBlur={6}
  tintColor="rgba(255,255,255,0.12)"
  className="rounded-full px-5 py-3 w-[420px]"
>
  <div className="flex items-center gap-3">
    <SearchIcon />
    <input placeholder="Search files…" />
    <kbd>⌘K</kbd>
  </div>
</LiquidGlass>`,
    render: () => (
      <LiquidGlass
        glassBorder
        className="block w-[min(400px,100%)] rounded-full px-5 py-3 text-left"
        backdropBlur={6}
        tintColor="rgba(255,255,255,0.12)"
        displacementScale={100}
        turbulenceBaseFrequency={0.01}
      >
        <div className="flex items-center gap-3">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.7"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span className="flex-1 text-[14.5px] text-white/55">
            Search files, components, docs…
          </span>
          <kbd className="inline-flex items-center gap-0.5 rounded-md border border-white/20 bg-white/[0.08] px-1.5 py-0.5 font-mono text-[11px] font-medium text-white/75">
            ⌘K
          </kbd>
        </div>
      </LiquidGlass>
    ),
  },
  {
    key: 'button',
    name: 'Button',
    desc: 'Polymorphic: as="button" — the component IS a button.',
    bg: 'magenta',
    code: `<LiquidGlass
  as="button"
  glassBorder
  backdropBlur={3}
  tintColor="rgba(0,0,0,0.2)"
  className="rounded-full px-8 py-4"
>
  Click Me!
</LiquidGlass>`,
    render: () => (
      <LiquidGlass
        as="button"
        glassBorder
        className="font-disp block w-[min(400px,100%)] cursor-pointer rounded-full px-[38px] py-[17px] text-center text-[18px] font-semibold text-white transition-transform hover:scale-105"
        backdropBlur={3}
        tintColor="rgba(0,0,0,0.2)"
        displacementScale={110}
        turbulenceBaseFrequency={0.009}
        turbulenceSeed={4}
      >
        Click Me!
      </LiquidGlass>
    ),
  },
];

export function Examples() {
  const [active, setActive] = useState(EXAMPLES[0].key);
  const ex = EXAMPLES.find((e) => e.key === active)!;

  return (
    <Section
      id="examples"
      eyebrow="Examples"
      title="Patterns from the wild"
      lead="Realistic UI surfaces built with a single <LiquidGlass> — preview on the left, the code on the right."
    >
      <div className="mb-[26px] flex flex-wrap justify-start gap-2">
        {EXAMPLES.map((e) => {
          const on = active === e.key;
          return (
            <button
              key={e.key}
              type="button"
              onClick={() => setActive(e.key)}
              className={
                'font-body cursor-pointer rounded-[11px] border px-[18px] py-[9px] text-[14px] font-semibold transition-all ' +
                (on
                  ? 'border-transparent bg-gradient-to-br from-white to-[#cfe0ff] text-[#07080d]'
                  : 'border-line text-inkdim hover:text-ink bg-white/[0.04] hover:bg-white/[0.09]')
              }
            >
              {e.name}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-[1.15fr_0.85fr] items-stretch gap-[22px] max-[900px]:grid-cols-1">
        <div className="border-line relative grid h-[460px] min-w-0 place-items-center overflow-hidden rounded-[20px] border p-9">
          <GlassBackdrop variant={ex.bg} />
          <div className="relative z-[2] grid w-full place-items-center">
            {ex.render()}
          </div>
        </div>
        <div className="flex h-[460px] min-w-0 flex-col gap-4 max-[900px]:h-auto">
          <p className="text-inkdim m-0 text-[15px]">{ex.desc}</p>
          <div className="min-h-0 flex-1 max-[900px]:min-h-[300px]">
            <Code code={ex.code} filename={`${ex.key}.tsx`} />
          </div>
        </div>
      </div>
    </Section>
  );
}
