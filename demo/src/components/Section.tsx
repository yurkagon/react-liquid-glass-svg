import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
  className?: string;
  children: ReactNode;
}

export function Section({
  id,
  eyebrow,
  title,
  lead,
  className = '',
  children,
}: SectionProps) {
  return (
    <section id={id} className={`relative z-[1] py-[36px] ${className}`}>
      <div className="mx-auto max-w-[1180px] px-7">
        {(eyebrow || title) && (
          <header className="mb-[34px] max-w-[680px] text-left">
            {eyebrow && (
              <div className="text-accent3 mb-3 inline-block font-mono text-[12px] tracking-[0.14em] uppercase">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="font-disp m-0 mb-3 text-[clamp(24px,3.4vw,34px)] leading-[1.1] font-semibold tracking-[-0.025em] text-balance">
                {title}
              </h2>
            )}
            {lead && (
              <p className="text-inkdim m-0 text-[clamp(14.5px,1.6vw,16.5px)] text-pretty">
                {lead}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
