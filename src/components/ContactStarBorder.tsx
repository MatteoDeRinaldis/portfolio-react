import { useEffect, useRef } from 'react';

type HoverEffect = 'lap' | 'brighten' | 'reveal' | 'none';
type RGB = [number, number, number];

type ContactStarBorderProps = {
  color: string;
  trailColor?: string;
  duration?: number;
  direction?: 'clockwise' | 'counterclockwise';
  stars?: number;
  trailLength?: number;
  thickness?: number;
  radius?: number;
  glow?: number;
  hover?: HoverEffect;
  sparkle?: boolean;
  clickPulse?: boolean;
  theme?: 'dark' | 'light';
};

type OutlineSegment = {
  length: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  angle: number | null;
};

type OutlineShape = {
  r: number;
  segments: OutlineSegment[];
  total: number;
};

type Point = {
  x: number;
  y: number;
  nx: number;
  ny: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  size: number;
  seed: number;
};

type Pulse = {
  origin: number;
  age: number;
};

type Settings = {
  light: boolean;
  color: string;
  trailColor: string;
  duration: number;
  thickness: number;
  radius: number;
  trailLength: number;
  stars: number;
  glow: number;
  sparkle: boolean;
  direction: 1 | -1;
  hover: HoverEffect;
  clickPulse: boolean;
};

type AnimationState = {
  width: number;
  height: number;
  dpr: number;
  phase: number;
  velocity: number;
  motion: number;
  lap: number;
  time: number;
  reveal: number;
  boost: number;
  flash: number;
  emit: number;
  hovered: boolean;
  focused: boolean;
  pointerX: number;
  pointerY: number;
  visible: boolean;
};

type ColorCache = {
  key: string;
  head: RGB;
  tail: RGB;
};

const BLEED = 48;
const LAP_DURATION = 0.9;
const TAU = Math.PI * 2;
const WHITE: RGB = [255, 255, 255];
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const wrap = (value: number, total: number) => ((value % total) + total) % total;
const ease = (value: number) =>
  value < 0.5 ? 4 * value ** 3 : 1 - ((-2 * value + 2) ** 3) / 2;
const mix = (a: RGB, b: RGB, amount: number): RGB => [
  a[0] + (b[0] - a[0]) * amount,
  a[1] + (b[1] - a[1]) * amount,
  a[2] + (b[2] - a[2]) * amount,
];
const rgba = (rgb: RGB, alpha: number) =>
  `rgba(${Math.round(rgb[0])}, ${Math.round(rgb[1])}, ${Math.round(rgb[2])}, ${clamp(alpha, 0, 1).toFixed(3)})`;

const toRgb = (color: string): RGB => {
  const context = document.createElement('canvas').getContext('2d');
  if (!context) return WHITE;
  context.fillStyle = '#000000';
  context.fillStyle = color;
  const value = String(context.fillStyle);
  if (value.startsWith('#')) {
    const hex = parseInt(value.slice(1, 7), 16);
    return [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255];
  }
  const channels = value.match(/[\d.]+/g)?.map(Number) ?? WHITE;
  return [channels[0], channels[1], channels[2]];
};

const outline = (width: number, height: number, radius: number): OutlineShape => {
  const r = Math.max(0, Math.min(radius, width / 2, height / 2));
  const arc = (Math.PI * r) / 2;
  const across = Math.max(0, width - 2 * r);
  const down = Math.max(0, height - 2 * r);
  const segments: OutlineSegment[] = [
    { length: across, x: r, y: 0, dx: 1, dy: 0, angle: null },
    { length: arc, x: width - r, y: r, dx: 0, dy: 0, angle: -Math.PI / 2 },
    { length: down, x: width, y: r, dx: 0, dy: 1, angle: null },
    { length: arc, x: width - r, y: height - r, dx: 0, dy: 0, angle: 0 },
    { length: across, x: width - r, y: height, dx: -1, dy: 0, angle: null },
    { length: arc, x: r, y: height - r, dx: 0, dy: 0, angle: Math.PI / 2 },
    { length: down, x: 0, y: height - r, dx: 0, dy: -1, angle: null },
    { length: arc, x: r, y: r, dx: 0, dy: 0, angle: Math.PI },
  ];
  return {
    r,
    segments,
    total: Math.max(1, segments.reduce((sum, segment) => sum + segment.length, 0)),
  };
};

const pointAt = (shape: OutlineShape, distance: number, point: Point) => {
  let remaining = wrap(distance, shape.total);
  for (const segment of shape.segments) {
    if (segment.length > 0 && remaining <= segment.length) {
      if (segment.angle === null) {
        point.x = segment.x + segment.dx * remaining;
        point.y = segment.y + segment.dy * remaining;
        point.nx = segment.dy;
        point.ny = -segment.dx;
      } else {
        const angle = segment.angle + remaining / shape.r;
        point.nx = Math.cos(angle);
        point.ny = Math.sin(angle);
        point.x = segment.x + point.nx * shape.r;
        point.y = segment.y + point.ny * shape.r;
      }
      return point;
    }
    remaining -= segment.length;
  }
  return point;
};

const project = (shape: OutlineShape, px: number, py: number) => {
  let best = Number.POSITIVE_INFINITY;
  let found = 0;
  let offset = 0;
  shape.segments.forEach((segment) => {
    if (segment.length > 0) {
      let distance = 0;
      let x = 0;
      let y = 0;
      if (segment.angle === null) {
        distance = clamp(
          (px - segment.x) * segment.dx + (py - segment.y) * segment.dy,
          0,
          segment.length,
        );
        x = segment.x + segment.dx * distance;
        y = segment.y + segment.dy * distance;
      } else {
        let angle = wrap(Math.atan2(py - segment.y, px - segment.x) - segment.angle, TAU);
        if (angle > Math.PI / 2) angle = angle > Math.PI * 1.25 ? 0 : Math.PI / 2;
        distance = angle * shape.r;
        x = segment.x + Math.cos(segment.angle + angle) * shape.r;
        y = segment.y + Math.sin(segment.angle + angle) * shape.r;
      }
      const squaredDistance = (px - x) ** 2 + (py - y) ** 2;
      if (squaredDistance < best) {
        best = squaredDistance;
        found = offset + distance;
      }
    }
    offset += segment.length;
  });
  return found;
};

export const ContactStarBorder = ({
  color,
  trailColor,
  duration = 5,
  direction = 'clockwise',
  stars = 2,
  trailLength = 0.25,
  thickness = 0.5,
  radius = 8,
  glow = 0.5,
  hover = 'brighten',
  sparkle = false,
  clickPulse = true,
  theme = 'dark',
}: ContactStarBorderProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wakeRef = useRef<(() => void) | null>(null);
  const settings: Settings = {
    light: theme === 'light',
    color,
    trailColor: trailColor ?? color,
    duration: Math.max(0.3, duration),
    thickness: Math.max(0.5, thickness),
    radius: Math.max(0, radius),
    trailLength: clamp(trailLength, 0, 1),
    stars: clamp(Math.round(stars), 1, 6),
    glow: clamp(glow, 0, 1),
    sparkle,
    direction: direction === 'counterclockwise' ? -1 : 1,
    hover,
    clickPulse,
  };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = canvas?.parentElement;
    const context = canvas?.getContext('2d');
    if (!root || !canvas || !context) return undefined;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const point: Point = { x: 0, y: 0, nx: 0, ny: -1 };
    const state: AnimationState = {
      width: 0,
      height: 0,
      dpr: 1,
      phase: 0,
      velocity: 0,
      motion: 0,
      lap: -1,
      time: 0,
      reveal: 0,
      boost: 0,
      flash: 0,
      emit: 0,
      hovered: false,
      focused: false,
      pointerX: 0,
      pointerY: 0,
      visible: true,
    };
    const pulses: Pulse[] = [];
    const dust: Particle[] = [];
    const colors: ColorCache = { key: '', head: WHITE, tail: WHITE };
    let frameId = 0;
    let lastFrame = performance.now();
    let alive = true;

    const wake = () => {
      if (frameId || !alive || !state.visible) return;
      lastFrame = performance.now();
      frameId = requestAnimationFrame(frame);
    };
    wakeRef.current = wake;

    const measure = () => {
      state.width = root.offsetWidth;
      state.height = root.offsetHeight;
      state.dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round((state.width + BLEED * 2) * state.dpr));
      canvas.height = Math.max(1, Math.round((state.height + BLEED * 2) * state.dpr));
      wake();
    };

    const local = (event: PointerEvent): [number, number] => {
      const rect = root.getBoundingClientRect();
      const scaleX = rect.width ? state.width / rect.width : 1;
      const scaleY = rect.height ? state.height / rect.height : 1;
      return [(event.clientX - rect.left) * scaleX, (event.clientY - rect.top) * scaleY];
    };

    const shapeFor = (current: Settings) =>
      outline(
        Math.max(1, state.width - current.thickness),
        Math.max(1, state.height - current.thickness),
        current.radius - current.thickness / 2,
      );

    const stroke = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      width: number,
      style: string | CanvasGradient,
    ) => {
      context.lineWidth = width;
      context.strokeStyle = style;
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
    };

    const drawTrail = (
      current: Settings,
      shape: OutlineShape,
      head: number,
      length: number,
      sign: number,
      intensity: number,
      tip = true,
    ) => {
      if (length < 0.5 || intensity <= 0) return;
      const steps = clamp(Math.ceil(length / 2), 2, 90);
      pointAt(shape, head, point);
      let previousX = point.x;
      let previousY = point.y;
      for (let index = 1; index <= steps; index += 1) {
        pointAt(shape, head - sign * length * (index / steps), point);
        const progress = 1 - (index - 0.5) / steps;
        const fade = progress * progress * intensity;
        let tone = mix(colors.tail, colors.head, progress);
        if (!current.light) tone = mix(tone, WHITE, progress ** 6 * 0.65);
        context.lineCap = tip && index === 1 ? 'round' : 'butt';
        stroke(
          previousX,
          previousY,
          point.x,
          point.y,
          2 + 6 * current.glow,
          rgba(tone, fade * (current.light ? 0.1 : 0.2) * current.glow),
        );
        stroke(previousX, previousY, point.x, point.y, current.thickness, rgba(tone, fade));
        previousX = point.x;
        previousY = point.y;
      }
    };

    const drawHead = (
      current: Settings,
      x: number,
      y: number,
      intensity: number,
      twinkle: number,
    ) => {
      if (intensity <= 0) return;
      const tone = colors.head;
      const reach = (12 + 40 * current.glow) * (current.light ? 0.6 : 1);
      const bloom = context.createRadialGradient(x, y, 0, x, y, reach);
      const strength = (current.light ? 0.08 : 0.4) * current.glow * intensity;
      bloom.addColorStop(0, rgba(tone, strength));
      bloom.addColorStop(0.2, rgba(tone, strength * 0.4));
      bloom.addColorStop(0.5, rgba(tone, strength * 0.1));
      bloom.addColorStop(1, rgba(tone, 0));
      context.fillStyle = bloom;
      context.fillRect(x - reach, y - reach, reach * 2, reach * 2);
      if (!current.sparkle) return;

      const size = (1 + current.thickness * 0.6) * (current.light ? 0.85 : 1);
      const core = context.createRadialGradient(x, y, 0, x, y, size * 2.2);
      core.addColorStop(0, rgba(current.light ? tone : WHITE, intensity));
      core.addColorStop(
        current.light ? 0.3 : 0.4,
        rgba(current.light ? tone : mix(tone, WHITE, 0.5), intensity * 0.9),
      );
      core.addColorStop(current.light ? 0.55 : 1, rgba(tone, current.light ? intensity * 0.12 : 0));
      core.addColorStop(1, rgba(tone, 0));
      context.fillStyle = core;
      context.beginPath();
      context.arc(x, y, size * 2.2, 0, TAU);
      context.fill();

      const spike = (3 + 4 * current.glow + current.thickness * 1.5) * twinkle;
      const center = current.light ? tone : WHITE;
      const horizontal = context.createLinearGradient(x - spike, y, x + spike, y);
      horizontal.addColorStop(0, rgba(tone, 0));
      horizontal.addColorStop(0.5, rgba(center, intensity * 0.95));
      horizontal.addColorStop(1, rgba(tone, 0));
      stroke(x - spike, y, x + spike, y, current.light ? 0.75 : 1, horizontal);
      const vertical = context.createLinearGradient(x, y - spike, x, y + spike);
      vertical.addColorStop(0, rgba(tone, 0));
      vertical.addColorStop(0.5, rgba(center, intensity * 0.95));
      vertical.addColorStop(1, rgba(tone, 0));
      stroke(x, y - spike, x, y + spike, current.light ? 0.75 : 1, vertical);
    };

    const spawnDust = (x: number, y: number, nx: number, ny: number, speed: number) => {
      if (dust.length > 48) return;
      const push = 3 + Math.random() * 10;
      const drift = (Math.random() - 0.5) * 8;
      dust.push({
        x: x + nx * (Math.random() * 3 - 1),
        y: y + ny * (Math.random() * 3 - 1),
        vx: nx * push - ny * drift - speed * -ny * 0.04,
        vy: ny * push + nx * drift - speed * nx * 0.04,
        age: 0,
        life: 0.35 + Math.random() * 0.5,
        size: 0.45 + Math.random() * 0.7,
        seed: Math.random() * TAU,
      });
    };

    const draw = (base: Settings, shape: OutlineShape) => {
      const current = state.boost > 0.001
        ? { ...base, glow: Math.min(1.5, base.glow + 0.4 * state.boost) }
        : base;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (state.width < 2 || state.height < 2) return;
      const offset = (BLEED + current.thickness / 2) * state.dpr;
      context.setTransform(state.dpr, 0, 0, state.dpr, offset, offset);
      context.globalCompositeOperation = current.light ? 'source-over' : 'lighter';
      context.lineCap = 'butt';

      const total = shape.total;
      const spacing = total / current.stars;
      const speed = Math.abs(state.motion);
      const sign = state.motion >= 0 ? 1 : -1;
      const span = current.trailLength * current.duration;
      const length = Math.min(speed * span, spacing * 0.92, total * 0.6);
      const intensity = state.reveal * (1 + 0.4 * state.boost + 0.6 * state.flash);

      const ring = state.flash * (current.light ? 0.18 : 0.32)
        + state.boost * state.reveal * (current.light ? 0.07 : 0.12);
      if (ring > 0.005) {
        context.lineWidth = current.thickness + 2 * current.glow;
        context.strokeStyle = rgba(colors.head, ring);
        context.beginPath();
        context.roundRect(
          0,
          0,
          Math.max(1, state.width - current.thickness),
          Math.max(1, state.height - current.thickness),
          Math.max(0, shape.r),
        );
        context.stroke();
      }

      const still = clamp(1 - speed / Math.max(1, (total / current.duration) * 0.6), 0, 1)
        * Math.min(1, intensity);
      const rest = (10 + 14 * current.glow + current.thickness * 2) * still;
      for (let index = 0; index < current.stars; index += 1) {
        const head = state.phase + index * spacing;
        drawTrail(current, shape, head, length, sign, Math.min(1, intensity));
        if (still > 0.01) {
          drawTrail(current, shape, head, rest, 1, still, false);
          drawTrail(current, shape, head, rest, -1, still, false);
        }
      }

      pulses.forEach((pulse) => {
        const progress = pulse.age / 0.65;
        const fade = (1 - progress) ** 2;
        const travel = (total / 2) * (1 - (1 - Math.min(1, pulse.age / 0.5)) ** 2);
        const tail = Math.min(travel, total * 0.16);
        [1, -1].forEach((way) => {
          const front = pulse.origin + way * travel;
          drawTrail(current, shape, front, tail, way, fade);
          pointAt(shape, front, point);
          drawHead(current, point.x, point.y, fade * 0.8, 0.8);
        });
      });

      for (let index = 0; index < current.stars; index += 1) {
        pointAt(shape, state.phase + index * spacing, point);
        const twinkle = 0.82
          + 0.18 * Math.sin(state.time * 6.1 + index * 2.3) * Math.sin(state.time * 2.7 + index);
        drawHead(current, point.x, point.y, Math.min(1.3, intensity), twinkle);
      }

      dust.forEach((particle) => {
        const left = 1 - particle.age / particle.life;
        const shimmer = 0.45 + 0.55 * Math.sin(state.time * 20 + particle.seed);
        const alpha = left * shimmer * state.reveal * (current.light ? 0.35 : 0.9);
        if (alpha <= 0.01) return;
        context.fillStyle = rgba(
          current.light ? colors.head : mix(colors.tail, WHITE, 0.6),
          alpha,
        );
        context.beginPath();
        context.arc(particle.x, particle.y, particle.size * (0.6 + 0.4 * left), 0, TAU);
        context.fill();
      });
    };

    const frame = (now: number) => {
      frameId = 0;
      if (!alive) return;
      const current = settingsRef.current;
      const dt = Math.min(0.05, Math.max(0.001, (now - lastFrame) / 1000));
      lastFrame = now;
      state.time += dt;

      const key = `${current.color}|${current.trailColor}`;
      if (key !== colors.key) {
        colors.key = key;
        colors.head = toRgb(current.color);
        colors.tail = toRgb(current.trailColor);
      }

      const shape = shapeFor(current);
      const total = shape.total;
      const spacing = total / current.stars;
      const engaged = state.hovered || state.focused;
      const cruise = reduce ? 0 : (current.direction * total) / current.duration;

      const revealTarget = current.hover === 'reveal' && !engaged ? 0 : 1;
      state.reveal += (revealTarget - state.reveal)
        * (1 - Math.exp(-dt / (revealTarget > state.reveal ? 0.16 : 0.45)));
      const boostTarget = current.hover === 'brighten' && engaged ? 1 : 0;
      state.boost += (boostTarget - state.boost)
        * (1 - Math.exp(-dt / (boostTarget > state.boost ? 0.18 : 0.5)));
      state.flash *= Math.exp(-dt / 0.22);

      state.velocity += (cruise - state.velocity) * (1 - Math.exp(-dt / 0.45));
      let extra = 0;
      if (state.lap >= 0) {
        const before = ease(Math.min(1, state.lap / LAP_DURATION));
        state.lap += dt;
        extra = (ease(Math.min(1, state.lap / LAP_DURATION)) - before) * total * current.direction;
        if (state.lap >= LAP_DURATION) state.lap = -1;
      }
      state.motion = state.velocity + extra / dt;
      state.phase = wrap(state.phase + state.velocity * dt + extra, total);

      const pace = Math.abs(state.motion) / Math.max(1, Math.abs(total / current.duration));
      if (current.sparkle && !reduce && state.reveal > 0.05) {
        state.emit += dt * (2 + 6 * Math.min(2, pace)) * current.stars;
        while (state.emit > 1) {
          state.emit -= 1;
          pointAt(shape, state.phase + Math.floor(Math.random() * current.stars) * spacing, point);
          spawnDust(point.x, point.y, point.nx, point.ny, state.motion);
        }
      }

      for (let index = dust.length - 1; index >= 0; index -= 1) {
        const particle = dust[index];
        particle.age += dt;
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        particle.vx *= Math.exp(-dt * 2.2);
        particle.vy *= Math.exp(-dt * 2.2);
        if (particle.age >= particle.life) dust.splice(index, 1);
      }
      for (let index = pulses.length - 1; index >= 0; index -= 1) {
        pulses[index].age += dt;
        if (pulses[index].age >= 0.65) pulses.splice(index, 1);
      }

      draw(current, shape);

      const settling = Math.abs(revealTarget - state.reveal) > 0.002
        || Math.abs(boostTarget - state.boost) > 0.002
        || state.flash > 0.01
        || pulses.length > 0
        || dust.length > 0;
      const moving = Math.abs(state.motion) > 0.05 || cruise !== 0 || state.lap >= 0;
      const showing = state.reveal > 0.002 || revealTarget > 0;
      if (state.visible && (settling || (moving && showing) || state.hovered)) {
        frameId = requestAnimationFrame(frame);
      }
    };

    const onEnter = (event: PointerEvent) => {
      const current = settingsRef.current;
      [state.pointerX, state.pointerY] = local(event);
      state.hovered = true;
      if (current.hover === 'reveal' && state.reveal < 0.15) {
        state.phase = project(
          shapeFor(current),
          state.pointerX - current.thickness / 2,
          state.pointerY - current.thickness / 2,
        );
        state.velocity = 0;
      }
      if (current.hover === 'lap' && state.lap < 0 && !reduce) state.lap = 0;
      wake();
    };
    const onLeave = () => {
      state.hovered = false;
      wake();
    };
    const pulse = (origin: number) => {
      if (!settingsRef.current.clickPulse) return;
      pulses.push({ origin, age: 0 });
      if (pulses.length > 4) pulses.shift();
      state.flash = 1;
      wake();
    };
    const onDown = (event: PointerEvent) => {
      if ((event.button !== 0 && event.pointerType === 'mouse') || reduce) return;
      const current = settingsRef.current;
      const [x, y] = local(event);
      pulse(project(shapeFor(current), x - current.thickness / 2, y - current.thickness / 2));
    };
    const onClick = (event: MouseEvent) => {
      if (event.detail === 0) pulse(state.phase);
    };
    const onFocus = () => {
      state.focused = root.matches(':focus-visible');
      if (state.focused && settingsRef.current.hover === 'lap' && state.lap < 0 && !reduce) {
        state.lap = 0;
      }
      wake();
    };
    const onBlur = () => {
      state.focused = false;
      wake();
    };

    const resizeObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    resizeObserver?.observe(root);
    const visibilityObserver = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver((entries) => {
        state.visible = entries.some((entry) => entry.isIntersecting);
        if (state.visible) wake();
      });
    visibilityObserver?.observe(root);
    root.addEventListener('pointerenter', onEnter);
    root.addEventListener('pointerleave', onLeave);
    root.addEventListener('pointerdown', onDown);
    root.addEventListener('click', onClick);
    root.addEventListener('focus', onFocus);
    root.addEventListener('blur', onBlur);
    measure();

    return () => {
      alive = false;
      wakeRef.current = null;
      cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      visibilityObserver?.disconnect();
      root.removeEventListener('pointerenter', onEnter);
      root.removeEventListener('pointerleave', onLeave);
      root.removeEventListener('pointerdown', onDown);
      root.removeEventListener('click', onClick);
      root.removeEventListener('focus', onFocus);
      root.removeEventListener('blur', onBlur);
    };
  }, []);

  useEffect(() => {
    wakeRef.current?.();
  });

  return <canvas ref={canvasRef} className="contact-star-border-canvas" aria-hidden="true" />;
};
