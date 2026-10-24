import { useEffect, useRef, type RefObject } from 'react';

type CrosshairProps = {
  containerRef: RefObject<HTMLElement | null>;
  color?: string;
  thickness?: number;
  opacity?: number;
  smoothing?: number;
  clickPulse?: boolean;
  targetEffect?: 'lock' | 'none';
};

type Pulse = {
  x: number;
  y: number;
  age: number;
};

export const Crosshair = ({
  containerRef,
  color = '#ffffff',
  thickness = 1,
  opacity = 0.75,
  smoothing = 0.35,
  clickPulse = true,
  targetEffect = 'lock',
}: CrosshairProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settingsRef = useRef({ color, thickness, opacity, smoothing, clickPulse, targetEffect });
  settingsRef.current = { color, thickness, opacity, smoothing, clickPulse, targetEffect };

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = containerRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !host || !context) return undefined;

    const activeCanvas = canvas;
    const drawingContext = context;
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const state = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      inside: false,
      presence: 0,
      target: null as Element | null,
      lockX: 0,
      lockY: 0,
      lockWidth: 0,
      lockHeight: 0,
      lockOpacity: 0,
      pulses: [] as Pulse[],
    };
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let animationFrame = 0;
    let lastFrame = 0;
    let active = true;

    const resize = () => {
      const bounds = activeCanvas.getBoundingClientRect();
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      activeCanvas.width = Math.max(1, Math.round(width * pixelRatio));
      activeCanvas.height = Math.max(1, Math.round(height * pixelRatio));
      wake();
    };

    const wake = () => {
      if (animationFrame || !active) return;
      lastFrame = performance.now();
      animationFrame = window.requestAnimationFrame(drawFrame);
    };

    const getPointerPosition = (event: PointerEvent) => {
      const bounds = activeCanvas.getBoundingClientRect();
      state.targetX = event.clientX - bounds.left;
      state.targetY = event.clientY - bounds.top;
    };

    const findTarget = (element: EventTarget | null) => {
      if (settingsRef.current.targetEffect === 'none' || !(element instanceof Element)) return null;
      const closest = element.closest('a, button, [data-crosshair-target]');
      const target = closest?.querySelector('[data-crosshair-lock]') ?? closest;
      return target && host.contains(target) ? target : null;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch' && event.buttons === 0) return;
      getPointerPosition(event);
      state.inside = true;
      state.target = findTarget(event.target);
      wake();
    };

    const onPointerDown = (event: PointerEvent) => {
      onPointerMove(event);
      if (!settingsRef.current.clickPulse || prefersReducedMotion) return;
      state.pulses.push({ x: state.targetX, y: state.targetY, age: 0 });
      wake();
    };

    const onPointerLeave = () => {
      state.inside = false;
      state.target = null;
      wake();
    };

    const onPointerUp = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') onPointerLeave();
    };

    const drawBracket = (x: number, y: number, boxWidth: number, boxHeight: number) => {
      const arm = Math.min(14, boxWidth / 3, boxHeight / 3);
      drawingContext.beginPath();
      drawingContext.moveTo(x, y + arm);
      drawingContext.lineTo(x, y);
      drawingContext.lineTo(x + arm, y);
      drawingContext.moveTo(x + boxWidth - arm, y);
      drawingContext.lineTo(x + boxWidth, y);
      drawingContext.lineTo(x + boxWidth, y + arm);
      drawingContext.moveTo(x + boxWidth, y + boxHeight - arm);
      drawingContext.lineTo(x + boxWidth, y + boxHeight);
      drawingContext.lineTo(x + boxWidth - arm, y + boxHeight);
      drawingContext.moveTo(x + arm, y + boxHeight);
      drawingContext.lineTo(x, y + boxHeight);
      drawingContext.lineTo(x, y + boxHeight - arm);
      drawingContext.stroke();
    };

    function drawFrame(now: number) {
      animationFrame = 0;
      if (!active) return;

      const settings = settingsRef.current;
      const delta = Math.min(0.05, Math.max(0.001, (now - lastFrame) / 1000));
      lastFrame = now;
      const bounds = activeCanvas.getBoundingClientRect();
      const follow = prefersReducedMotion || settings.smoothing === 0
        ? 1
        : 1 - Math.exp(-delta / (0.008 + settings.smoothing * 0.16));
      state.x += (state.targetX - state.x) * follow;
      state.y += (state.targetY - state.y) * follow;

      const presenceTarget = state.inside ? 1 : 0;
      state.presence += (presenceTarget - state.presence) *
        (prefersReducedMotion ? 1 : 1 - Math.exp(-delta / (state.inside ? 0.12 : 0.25)));
      if (Math.abs(presenceTarget - state.presence) < 0.002) state.presence = presenceTarget;

      const target = state.inside && settings.targetEffect === 'lock' ? state.target : null;
      const targetBounds = target?.getBoundingClientRect();
      const lockBounds = targetBounds
        ? {
          x: targetBounds.left - bounds.left - 6,
          y: targetBounds.top - bounds.top - 6,
          width: targetBounds.width + 12,
          height: targetBounds.height + 12,
        }
        : { x: state.x - 10, y: state.y - 10, width: 20, height: 20 };
      const lockFollow = prefersReducedMotion ? 1 : 1 - Math.exp(-delta / 0.085);
      state.lockX += (lockBounds.x - state.lockX) * lockFollow;
      state.lockY += (lockBounds.y - state.lockY) * lockFollow;
      state.lockWidth += (lockBounds.width - state.lockWidth) * lockFollow;
      state.lockHeight += (lockBounds.height - state.lockHeight) * lockFollow;
      const lockOpacityTarget = target ? 1 : 0;
      state.lockOpacity += (lockOpacityTarget - state.lockOpacity) *
        (prefersReducedMotion ? 1 : 1 - Math.exp(-delta / (target ? 0.08 : 0.14)));
      if (Math.abs(lockOpacityTarget - state.lockOpacity) < 0.002) {
        state.lockOpacity = lockOpacityTarget;
      }

      drawingContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      drawingContext.clearRect(0, 0, width, height);
      drawingContext.strokeStyle = settings.color;
      drawingContext.lineWidth = settings.thickness;
      drawingContext.lineCap = 'square';
      drawingContext.setLineDash([]);

      if (state.presence > 0.001) {
        drawingContext.globalAlpha = state.presence * settings.opacity * (1 - 0.6 * state.lockOpacity);
        drawingContext.beginPath();
        drawingContext.moveTo(0, state.y);
        drawingContext.lineTo(state.x - 10, state.y);
        drawingContext.moveTo(state.x + 10, state.y);
        drawingContext.lineTo(width, state.y);
        drawingContext.moveTo(state.x, 0);
        drawingContext.lineTo(state.x, state.y - 10);
        drawingContext.moveTo(state.x, state.y + 10);
        drawingContext.lineTo(state.x, height);
        drawingContext.stroke();
      }

      if (state.lockOpacity > 0.001) {
        drawingContext.globalAlpha = state.lockOpacity * settings.opacity;
        drawingContext.lineWidth = Math.max(1.5, settings.thickness);
        drawBracket(state.lockX, state.lockY, state.lockWidth, state.lockHeight);
      }

      state.pulses = state.pulses.filter((pulse) => {
        pulse.age += delta;
        const progress = pulse.age / 0.55;
        if (progress >= 1) return false;
        const eased = 1 - (1 - progress) ** 3;
        drawingContext.globalAlpha = (1 - progress) ** 2 * settings.opacity;
        drawingContext.lineWidth = Math.max(1, settings.thickness);
        drawingContext.beginPath();
        drawingContext.arc(pulse.x, pulse.y, 3 + 30 * eased, 0, Math.PI * 2);
        drawingContext.stroke();
        return true;
      });

      drawingContext.globalAlpha = 1;
      const isSettling =
        Math.abs(state.targetX - state.x) > 0.05 ||
        Math.abs(state.targetY - state.y) > 0.05 ||
        Math.abs(presenceTarget - state.presence) > 0.002 ||
        Math.abs(lockOpacityTarget - state.lockOpacity) > 0.002 ||
        (target && (
          Math.abs(lockBounds.x - state.lockX) +
          Math.abs(lockBounds.y - state.lockY) +
          Math.abs(lockBounds.width - state.lockWidth) +
          Math.abs(lockBounds.height - state.lockHeight) > 0.1
        )) ||
        state.pulses.length > 0;
      if (isSettling) wake();
    }

    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(resize);
    observer?.observe(activeCanvas);
    host.addEventListener('pointermove', onPointerMove);
    host.addEventListener('pointerdown', onPointerDown);
    host.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerLeave);
    window.addEventListener('scroll', wake, { capture: true, passive: true });
    window.addEventListener('resize', resize);
    resize();

    return () => {
      active = false;
      window.cancelAnimationFrame(animationFrame);
      observer?.disconnect();
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerdown', onPointerDown);
      host.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerLeave);
      window.removeEventListener('scroll', wake, { capture: true });
      window.removeEventListener('resize', resize);
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        mixBlendMode: 'normal',
      }}
    />
  );
};
