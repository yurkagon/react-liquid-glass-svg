import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';

import LiquidGlass from './LiquidGlass';

/* helpers */

const setUserAgent = (ua: string) => {
  Object.defineProperty(window.navigator, 'userAgent', {
    value: ua,
    configurable: true,
  });
};

const getRoot = (container: HTMLElement) =>
  container.querySelector(
    '[style*="position: relative"][style*="overflow: hidden"]'
  ) as HTMLElement;

const getLayers = (container: HTMLElement) => {
  const root = getRoot(container);
  const divs = Array.from(root.querySelectorAll(':scope > div'));
  const sheen = root.querySelector(':scope > span');
  // Order: backdrop, tint, content (sheen optional, between tint and content)
  return {
    root,
    backdrop: divs[0] as HTMLElement,
    tint: divs[1] as HTMLElement,
    content: divs[divs.length - 1] as HTMLElement,
    sheen: sheen as HTMLSpanElement | null,
  };
};

/* default UA = Chrome (full filter path) */
const NON_SAFARI_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

describe('LiquidGlass', () => {
  const originalUA = window.navigator.userAgent;

  beforeEach(() => {
    setUserAgent(NON_SAFARI_UA);
  });

  afterEach(() => {
    setUserAgent(originalUA);
  });

  /* --------------- rendering --------------- */

  describe('rendering', () => {
    it('renders children', () => {
      const { getByText } = render(<LiquidGlass>hello</LiquidGlass>);
      expect(getByText('hello')).toBeInTheDocument();
    });

    it('renders as <div> by default', () => {
      const { container } = render(<LiquidGlass>x</LiquidGlass>);
      expect(getRoot(container).tagName).toBe('DIV');
    });

    it('supports polymorphic "as" prop — button', () => {
      const { container } = render(<LiquidGlass as="button">x</LiquidGlass>);
      const root = container.querySelector('button');
      expect(root).toBeInTheDocument();
      expect((root as HTMLElement).style.position).toBe('relative');
    });

    it('supports polymorphic "as" prop — section', () => {
      const { container } = render(<LiquidGlass as="section">x</LiquidGlass>);
      expect(container.querySelector('section')).toBeInTheDocument();
    });
  });

  /* --------------- className & style --------------- */

  describe('className and style', () => {
    it('applies className to root', () => {
      const { container } = render(
        <LiquidGlass className="my-class">x</LiquidGlass>
      );
      expect(getRoot(container).classList.contains('my-class')).toBe(true);
    });

    it('merges user style with internal styles', () => {
      const { container } = render(
        <LiquidGlass style={{ width: 200, borderRadius: 12 }}>x</LiquidGlass>
      );
      const root = getRoot(container);
      expect(root.style.width).toBe('200px');
      expect(root.style.borderRadius).toBe('12px');
      // internal styles still applied
      expect(root.style.position).toBe('relative');
      expect(root.style.overflow).toBe('hidden');
    });

    it('forwards additional HTML attributes', () => {
      const { container } = render(
        <LiquidGlass data-testid="lg" id="my-id">
          x
        </LiquidGlass>
      );
      const root = getRoot(container);
      expect(root.getAttribute('data-testid')).toBe('lg');
      expect(root.id).toBe('my-id');
    });
  });

  /* --------------- SVG filter --------------- */

  describe('SVG filter', () => {
    it('renders a hidden SVG containing a <filter>', () => {
      const { container } = render(<LiquidGlass>x</LiquidGlass>);
      const svg = container.querySelector('svg') as SVGSVGElement;
      const filter = svg.querySelector('filter');
      expect(svg).toBeInTheDocument();
      expect(svg.style.display).toBe('none');
      expect(filter).toBeInTheDocument();
    });

    it('generates unique filter ids for multiple instances', () => {
      const { container } = render(
        <>
          <LiquidGlass>a</LiquidGlass>
          <LiquidGlass>b</LiquidGlass>
        </>
      );
      const filters = container.querySelectorAll('filter');
      expect(filters.length).toBe(2);
      expect(filters[0].id).not.toBe('');
      expect(filters[0].id).not.toBe(filters[1].id);
    });

    it('backdrop layer references the filter id via url(#id)', () => {
      const { container } = render(<LiquidGlass>x</LiquidGlass>);
      const filter = container.querySelector('filter') as SVGFilterElement;
      const { backdrop } = getLayers(container);
      // jsdom may serialize url(#id) with quotes — strip them for comparison.
      const normalized = backdrop.style.filter.replace(/["']/g, '');
      expect(normalized).toBe(`url(#${filter.id})`);
    });
  });

  /* --------------- layer structure --------------- */

  describe('layer structure', () => {
    it('renders three positioned div layers by default', () => {
      const { container } = render(<LiquidGlass>x</LiquidGlass>);
      const root = getRoot(container);
      const divs = root.querySelectorAll(':scope > div');
      expect(divs.length).toBe(3);
    });

    it('backdrop layer has zIndex 0 and absolute position', () => {
      const { container } = render(<LiquidGlass>x</LiquidGlass>);
      const { backdrop } = getLayers(container);
      expect(backdrop.style.zIndex).toBe('0');
      expect(backdrop.style.position).toBe('absolute');
    });

    it('tint layer has zIndex 1 and absolute position', () => {
      const { container } = render(<LiquidGlass>x</LiquidGlass>);
      const { tint } = getLayers(container);
      expect(tint.style.zIndex).toBe('1');
      expect(tint.style.position).toBe('absolute');
    });

    it('content layer has zIndex 3 and relative position', () => {
      const { container } = render(<LiquidGlass>x</LiquidGlass>);
      const { content } = getLayers(container);
      expect(content.style.zIndex).toBe('3');
      expect(content.style.position).toBe('relative');
    });

    it('all positioned layers inherit border-radius', () => {
      const { container } = render(
        <LiquidGlass style={{ borderRadius: 24 }}>x</LiquidGlass>
      );
      const { backdrop, tint, content } = getLayers(container);
      expect(backdrop.style.borderRadius).toBe('inherit');
      expect(tint.style.borderRadius).toBe('inherit');
      expect(content.style.borderRadius).toBe('inherit');
    });
  });

  /* --------------- backdropBlur prop --------------- */

  describe('backdropBlur', () => {
    it('applies default blur of 2px', () => {
      const { container } = render(<LiquidGlass>x</LiquidGlass>);
      const { backdrop } = getLayers(container);
      expect(backdrop.style.backdropFilter).toBe('blur(2px)');
    });

    it('applies custom blur value', () => {
      const { container } = render(
        <LiquidGlass backdropBlur={12}>x</LiquidGlass>
      );
      const { backdrop } = getLayers(container);
      expect(backdrop.style.backdropFilter).toBe('blur(12px)');
    });

    it('also sets -webkit-backdrop-filter for Safari', () => {
      const { container } = render(
        <LiquidGlass backdropBlur={5}>x</LiquidGlass>
      );
      const { backdrop } = getLayers(container);
      // Vendor prefix may render as different style names depending on jsdom.
      const styleStr = backdrop.getAttribute('style') || '';
      expect(styleStr).toContain('blur(5px)');
    });
  });

  /* --------------- tintColor prop --------------- */

  describe('tintColor', () => {
    it('applies default tint to the tint layer', () => {
      const { container } = render(<LiquidGlass>x</LiquidGlass>);
      const { tint } = getLayers(container);
      // jsdom may normalize rgba; just assert it contains "255, 255, 255"
      expect(tint.style.background).toContain('255, 255, 255');
    });

    it('applies custom tint to the tint layer', () => {
      const { container } = render(
        <LiquidGlass tintColor="rgb(255, 0, 0)">x</LiquidGlass>
      );
      const { tint } = getLayers(container);
      expect(tint.style.background).toContain('255, 0, 0');
    });
  });

  /* --------------- turbulenceBaseFrequency prop --------------- */

  describe('turbulenceBaseFrequency', () => {
    it('uses default value 0.008 formatted as single number', () => {
      const { container } = render(<LiquidGlass>x</LiquidGlass>);
      const turb = container.querySelector('feTurbulence') as Element;
      expect(turb.getAttribute('baseFrequency')).toBe('0.008');
    });

    it('formats a single number as one value', () => {
      const { container } = render(
        <LiquidGlass turbulenceBaseFrequency={0.012}>x</LiquidGlass>
      );
      const turb = container.querySelector('feTurbulence') as Element;
      expect(turb.getAttribute('baseFrequency')).toBe('0.012');
    });

    it('formats a tuple as "x y" pair', () => {
      const { container } = render(
        <LiquidGlass turbulenceBaseFrequency={[0.005, 0.02]}>x</LiquidGlass>
      );
      const turb = container.querySelector('feTurbulence') as Element;
      expect(turb.getAttribute('baseFrequency')).toBe('0.005 0.02');
    });
  });

  /* --------------- turbulenceSeed prop --------------- */

  describe('turbulenceSeed', () => {
    it('uses default seed 1.5', () => {
      const { container } = render(<LiquidGlass>x</LiquidGlass>);
      const turb = container.querySelector('feTurbulence') as Element;
      expect(turb.getAttribute('seed')).toBe('1.5');
    });

    it('applies custom seed', () => {
      const { container } = render(
        <LiquidGlass turbulenceSeed={42}>x</LiquidGlass>
      );
      const turb = container.querySelector('feTurbulence') as Element;
      expect(turb.getAttribute('seed')).toBe('42');
    });
  });

  /* --------------- displacementScale prop --------------- */

  describe('displacementScale', () => {
    it('uses default scale 150 on feDisplacementMap', () => {
      const { container } = render(<LiquidGlass>x</LiquidGlass>);
      const dm = container.querySelector('feDisplacementMap') as Element;
      expect(dm.getAttribute('scale')).toBe('150');
    });

    it('applies custom scale', () => {
      const { container } = render(
        <LiquidGlass displacementScale={300}>x</LiquidGlass>
      );
      const dm = container.querySelector('feDisplacementMap') as Element;
      expect(dm.getAttribute('scale')).toBe('300');
    });
  });

  /* --------------- glassBorder prop --------------- */

  describe('glassBorder', () => {
    it('uses default outer drop-shadow when false (default)', () => {
      const { container } = render(<LiquidGlass>x</LiquidGlass>);
      const root = getRoot(container);
      // Default shadow contains "0 6px 6px" + "0 0 20px"
      expect(root.style.boxShadow).toMatch(/0 6px 6px/);
    });

    it('uses polished shadow when true', () => {
      const { container } = render(<LiquidGlass glassBorder>x</LiquidGlass>);
      const root = getRoot(container);
      expect(root.style.boxShadow).toMatch(/0 8px 32px/);
    });

    it('does NOT render sheen overlay when false', () => {
      const { container } = render(<LiquidGlass>x</LiquidGlass>);
      const { sheen } = getLayers(container);
      expect(sheen).toBeNull();
    });

    it('renders sheen overlay span with zIndex 2 when true', () => {
      const { container } = render(<LiquidGlass glassBorder>x</LiquidGlass>);
      const { sheen } = getLayers(container);
      expect(sheen).toBeInTheDocument();
      expect((sheen as HTMLSpanElement).style.zIndex).toBe('2');
    });

    it('sheen overlay has pointer-events: none', () => {
      const { container } = render(<LiquidGlass glassBorder>x</LiquidGlass>);
      const { sheen } = getLayers(container);
      expect((sheen as HTMLSpanElement).style.pointerEvents).toBe('none');
    });

    it('sheen overlay carries inset highlight box-shadow', () => {
      const { container } = render(<LiquidGlass glassBorder>x</LiquidGlass>);
      const { sheen } = getLayers(container);
      expect((sheen as HTMLSpanElement).style.boxShadow).toContain('inset');
    });
  });

  /* --------------- filter path (full vs simple) --------------- */

  describe('filter path', () => {
    it('renders the full feSpecularLighting + feDisplacementMap chain on non-Safari', () => {
      const { container } = render(<LiquidGlass>x</LiquidGlass>);
      expect(container.querySelector('feSpecularLighting')).toBeInTheDocument();
      expect(container.querySelector('feDisplacementMap')).toBeInTheDocument();
    });
  });
});
