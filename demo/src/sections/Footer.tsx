import { LiquidGlass } from 'react-liquid-glass-svg';

import { Brand } from '@/components/Brand';
import { Code } from '@/components/Code';
import { CopyButton } from '@/components/CopyButton';
import { GlassBackdrop } from '@/components/GlassBackdrop';
import { INSTALL } from './Hero';

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden pt-[40px] pb-[50px]"
      id="install"
    >
      <GlassBackdrop variant="violet" className="footer__bg" />
      <div className="relative z-[2] mx-auto max-w-[1180px] px-7">
        <LiquidGlass
          className="mx-auto mb-[52px] block max-w-[720px] rounded-[28px] text-center"
          glassBorder
          backdropBlur={4}
          tintColor="rgba(255,255,255,0.08)"
          displacementScale={120}
          turbulenceBaseFrequency={0.008}
        >
          <div className="px-10 py-12">
            <h2 className="font-disp m-0 mb-3 text-[clamp(26px,4vw,40px)] font-semibold tracking-[-0.02em] text-white">
              Install in seconds
            </h2>
            <p className="m-0 mb-7 text-[16px] text-white/85">
              React 18+. Works with Vite, Next.js and any Tailwind setup.
            </p>
            <div className="border-line mx-auto mb-[18px] flex max-w-[540px] items-center gap-3 rounded-[13px] border bg-[rgba(8,9,13,0.6)] py-3.5 pr-3.5 pl-[22px] font-mono text-[16px] backdrop-blur-[10px]">
              <span className="text-accent3 font-semibold">$</span>
              <code className="text-ink flex-1 truncate text-left">
                {INSTALL}
              </code>
              <CopyButton text={INSTALL} />
            </div>
            <div className="mx-auto max-w-[540px] text-left">
              <Code
                code={`import { LiquidGlass } from 'react-liquid-glass-svg'`}
                filename="app.tsx"
              />
            </div>
          </div>
        </LiquidGlass>

        <div className="flex flex-wrap items-center justify-between gap-[18px] border-t border-white/[0.06] pt-[30px]">
          <a
            className="inline-flex items-center gap-[11px]"
            href="https://yuragon.dev/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="brand__mark" aria-hidden="true" />
            <Brand />
          </a>
          <nav className="text-inkdim flex gap-6 text-[14px] font-medium">
            <a
              className="hover:text-ink transition-colors"
              href="https://yuragon.dev/"
              target="_blank"
              rel="noreferrer"
            >
              yuragon.dev
            </a>
            <a
              className="hover:text-ink transition-colors"
              href="https://www.npmjs.com/package/react-liquid-glass-svg"
              target="_blank"
              rel="noreferrer"
            >
              npm
            </a>
            <a
              className="hover:text-ink transition-colors"
              href="https://github.com/yurkagon/react-liquid-glass-svg"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a className="hover:text-ink transition-colors" href="#examples">
              Examples
            </a>
            <a className="hover:text-ink transition-colors" href="#sandbox">
              Playground
            </a>
          </nav>
          <p className="text-inkfaint m-0 w-full text-center text-[13px] sm:w-auto">
            MIT © yurkagon · react-liquid-glass-svg
          </p>
        </div>
      </div>
    </footer>
  );
}
