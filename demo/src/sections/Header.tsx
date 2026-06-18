import { LiquidGlass } from 'react-liquid-glass-svg';

import { Brand } from '@/components/Brand';

export function Header() {
  return (
    <div className="fixed top-3.5 left-1/2 z-[100] w-[min(calc(100%-32px),1180px)] -translate-x-1/2 overflow-hidden rounded-[18px]">
      <LiquidGlass
        as="header"
        className="rounded-[18px]"
        glassBorder
        backdropBlur={6}
        tintColor="rgba(255,255,255,0.06)"
        displacementScale={40}
        turbulenceBaseFrequency={0.012}
        turbulenceSeed={3}
      >
        <nav className="flex items-center justify-between gap-5 px-[18px] py-[11px]">
          <a
            className="inline-flex items-center gap-[11px]"
            href="https://yuragon.dev/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="brand__mark" aria-hidden="true" />
            <Brand />
          </a>
          <div className="text-inkdim hidden gap-[26px] text-[14.5px] font-medium md:flex">
            <a className="hover:text-ink transition-colors" href="#features">
              Features
            </a>
            <a className="hover:text-ink transition-colors" href="#examples">
              Examples
            </a>
            <a className="hover:text-ink transition-colors" href="#sandbox">
              Playground
            </a>
            <a className="hover:text-ink transition-colors" href="#install">
              Install
            </a>
          </div>
          <div className="flex items-center gap-3.5">
            <a
              className="text-inkdim hover:text-ink inline-flex items-center gap-[7px] text-[14px] font-semibold transition-colors"
              href="https://github.com/yurkagon/react-liquid-glass-svg"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z" />
              </svg>
              GitHub
            </a>
            <a
              className="font-body inline-flex cursor-pointer items-center justify-center rounded-[11px] bg-gradient-to-br from-white to-[#d7e4ff] px-[18px] py-[9px] text-[14px] font-bold whitespace-nowrap text-[#07080d] shadow-[0_6px_20px_oklch(0.7_0.12_250_/_0.4)] transition-transform hover:-translate-y-px"
              href="#install"
            >
              npm i
            </a>
          </div>
        </nav>
      </LiquidGlass>
    </div>
  );
}
