import { useState, type CSSProperties } from 'react';
import { LiquidGlass } from 'react-liquid-glass-svg';

import { Code } from '@/components/Code';
import {
  GlassBackdrop,
  type BackdropVariant,
} from '@/components/GlassBackdrop';
import { Section } from '@/components/Section';

const SANDBOX_BGS: Array<{ key: BackdropVariant; label: string }> = [
  { key: 'grid', label: 'Grid' },
  { key: 'aurora', label: 'Aurora' },
  { key: 'prism', label: 'Prism' },
  { key: 'ocean', label: 'Ocean' },
];

const TINTS = [
  '#ffffff',
  '#000000',
  '#64c8ff',
  '#c084fc',
  '#ff8fa3',
  '#5eead4',
];

function hexToRgba(hex: string, a: number) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (v: number) => void;
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  suffix = '',
  onChange,
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="flex flex-col gap-2.5">
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-inkdim font-mono text-[12.5px]">{label}</span>
        <span className="text-accent3 font-mono text-[12.5px] font-semibold">
          {value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ '--pct': pct + '%' } as CSSProperties}
      />
    </label>
  );
}

export function Sandbox() {
  const [blur, setBlur] = useState(2);
  const [scale, setScale] = useState(150);
  const [freq, setFreq] = useState(0.008);
  const [seed, setSeed] = useState(1.5);
  const [tint, setTint] = useState('#ffffff');
  const [tintA, setTintA] = useState(0.18);
  const [radius, setRadius] = useState(28);
  const [glassBorder, setGlassBorder] = useState(true);
  const [bg, setBg] = useState<BackdropVariant>('grid');

  const tintColor = hexToRgba(tint, tintA);

  const generated = `<LiquidGlass
  backdropBlur={${blur}}
  tintColor="${tintColor}"
  displacementScale={${scale}}
  turbulenceBaseFrequency={${freq}}
  turbulenceSeed={${seed}}${glassBorder ? '\n  glassBorder' : ''}
  style={{ borderRadius: ${radius} }}
>
  <div className="px-[34px] py-8">
    <div className="font-mono text-[11.5px] uppercase tracking-[0.04em] text-white/75">
      &lt;LiquidGlass /&gt;
    </div>
    <h3 className="mt-2.5 font-disp text-[26px] font-semibold text-white">
      Live glass
    </h3>
    <p className="mt-2.5 text-[14.5px] text-white/[0.88]">
      Drag the controls and watch the refraction change as the background bends.
    </p>
  </div>
</LiquidGlass>`;

  return (
    <Section
      id="sandbox"
      eyebrow="Playground"
      title="Tweak it live"
      lead="Every slider drives the real component. The code on the right updates in real time — copy and paste."
    >
      <div className="grid grid-cols-[1.2fr_0.8fr] items-stretch gap-[22px] max-[940px]:grid-cols-1">
        <div className="border-line relative min-h-[460px] overflow-hidden rounded-[20px] border">
          <GlassBackdrop variant={bg} />
          <div className="absolute top-3.5 left-3.5 z-[5] flex flex-wrap gap-1.5">
            {SANDBOX_BGS.map((b) => (
              <button
                key={b.key}
                type="button"
                onClick={() => setBg(b.key)}
                className={
                  'cursor-pointer rounded-[8px] border px-[11px] py-[5px] font-mono text-[11.5px] font-medium backdrop-blur-[6px] transition-colors ' +
                  (bg === b.key
                    ? 'border-white bg-white text-[#07080d]'
                    : 'border-white/20 bg-black/40 text-white hover:bg-black/60')
                }
              >
                {b.label}
              </button>
            ))}
          </div>
          <div className="absolute inset-0 z-[3] grid place-items-center p-10">
            <LiquidGlass
              glassBorder={glassBorder}
              className="block w-[min(380px,100%)] text-left"
              backdropBlur={blur}
              tintColor={tintColor}
              displacementScale={scale}
              turbulenceBaseFrequency={freq}
              turbulenceSeed={seed}
              style={{ borderRadius: radius }}
            >
              <div className="px-[34px] py-8">
                <div className="mb-2.5 font-mono text-[11.5px] tracking-[0.04em] text-white/75">
                  &lt;LiquidGlass /&gt;
                </div>
                <div className="font-disp m-0 mb-2.5 text-[26px] font-semibold text-white">
                  Live glass
                </div>
                <p className="m-0 text-[14.5px] text-white/[0.88]">
                  Drag the controls and watch the refraction change as the
                  background bends.
                </p>
              </div>
            </LiquidGlass>
          </div>
        </div>

        <div className="border-line flex flex-col gap-5 rounded-[20px] border bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-[26px]">
          <Slider
            label="backdropBlur"
            value={blur}
            min={0}
            max={10}
            step={1}
            onChange={setBlur}
            suffix="px"
          />
          <Slider
            label="displacementScale"
            value={scale}
            min={0}
            max={400}
            step={5}
            onChange={setScale}
          />
          <Slider
            label="turbulenceBaseFrequency"
            value={freq}
            min={0.002}
            max={0.03}
            step={0.001}
            onChange={setFreq}
          />
          <Slider
            label="turbulenceSeed"
            value={seed}
            min={0}
            max={20}
            step={0.5}
            onChange={setSeed}
          />
          <Slider
            label="borderRadius"
            value={radius}
            min={0}
            max={60}
            step={2}
            onChange={setRadius}
            suffix="px"
          />

          <div className="flex flex-col gap-2.5">
            <span className="flex items-baseline justify-between gap-3">
              <span className="text-inkdim font-mono text-[12.5px]">
                tintColor
              </span>
              <span className="text-accent3 font-mono text-[12.5px] font-semibold">
                {tintColor}
              </span>
            </span>
            <div className="flex flex-wrap gap-[9px]">
              {TINTS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setTint(c)}
                  aria-label={c}
                  style={{ background: c }}
                  className={
                    'h-[30px] w-[30px] cursor-pointer rounded-[9px] border-2 p-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.2)] transition-transform hover:scale-110 ' +
                    (tint === c ? 'scale-110 border-white' : 'border-white/20')
                  }
                />
              ))}
            </div>
          </div>

          <Slider
            label="tint opacity"
            value={tintA}
            min={0}
            max={0.6}
            step={0.02}
            onChange={setTintA}
          />

          <label className="flex cursor-pointer items-center justify-between gap-3">
            <span className="text-inkdim font-mono text-[12.5px]">
              glassBorder
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={glassBorder}
              onClick={() => setGlassBorder((v) => !v)}
              className={
                'relative inline-flex h-[24px] w-[44px] shrink-0 items-center rounded-full border p-0 transition-colors ' +
                (glassBorder
                  ? 'from-accent to-accent2 border-transparent bg-gradient-to-r'
                  : 'border-line bg-white/[0.06]')
              }
            >
              <span
                className={
                  'inline-block h-[18px] w-[18px] rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.4)] transition-transform ' +
                  (glassBorder ? 'translate-x-[22px]' : 'translate-x-[2px]')
                }
              />
            </button>
          </label>
        </div>
      </div>

      <div className="mt-[22px]">
        <Code code={generated} filename="sandbox.tsx" />
      </div>
    </Section>
  );
}
