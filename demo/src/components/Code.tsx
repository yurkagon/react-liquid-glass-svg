import { CopyButton } from './CopyButton';

function highlight(code: string): string {
  const esc = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return esc.replace(
    /(&#39;[^&]*&#39;|&quot;[^&]*&quot;|'[^']*'|"[^"]*"|`[^`]*`)|(&lt;\/?)([A-Za-z][\w]*)|([a-zA-Z][\w]*)(?==)|(\b\d+(?:\.\d+)?\b)|\b(import|from|function|return|const|let|export|default)\b/g,
    (m, str, lt, tag, attr, num, kw) => {
      if (str) return `<span class="tk-str">${str}</span>`;
      if (tag) return `${lt}<span class="tk-tag">${tag}</span>`;
      if (attr) return `<span class="tk-attr">${attr}</span>`;
      if (num) return `<span class="tk-num">${num}</span>`;
      if (kw) return `<span class="tk-kw">${kw}</span>`;
      return m;
    }
  );
}

interface CodeProps {
  code: string;
  lang?: string;
  filename?: string;
}

export function Code({ code, lang = 'tsx', filename }: CodeProps) {
  return (
    <div className="border-line flex h-full flex-col overflow-hidden rounded-[15px] border bg-[#0b0c12] shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5">
        <span className="inline-flex gap-1.5">
          <i className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
          <i className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
          <i className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />
        </span>
        <span className="text-inkfaint mr-auto font-mono text-[12.5px]">
          {filename || lang}
        </span>
        <CopyButton text={code} />
      </div>
      <pre className="m-0 min-h-0 flex-1 overflow-auto px-5 py-[18px] text-[13px] leading-[1.7]">
        <code
          className="whitespace-pre text-[#d6dbe8]"
          dangerouslySetInnerHTML={{ __html: highlight(code) }}
        />
      </pre>
    </div>
  );
}
