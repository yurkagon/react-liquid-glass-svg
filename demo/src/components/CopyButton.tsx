import { useState } from 'react';

interface CopyButtonProps {
  text: string;
  label?: string;
}

export function CopyButton({ text, label = 'Copy' }: CopyButtonProps) {
  const [done, setDone] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* ignore */
    }
    setDone(true);
    setTimeout(() => setDone(false), 1400);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="border-line font-body text-inkdim hover:text-ink inline-flex cursor-pointer items-center gap-1.5 rounded-[9px] border bg-white/[0.06] px-[11px] py-1.5 text-[12.5px] font-semibold transition-colors hover:bg-white/[0.13]"
    >
      {done ? (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
      <span className="inline-block min-w-[44px] text-center">
        {done ? 'Copied' : label}
      </span>
    </button>
  );
}
