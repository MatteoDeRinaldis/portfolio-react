import type { CSSProperties, ReactNode } from 'react';
import './ShinyText.css';

type ShinyTextProps = {
  children: ReactNode;
  color: string;
  shineColor: string;
  speed?: number;
};

export const ShinyText = ({ children, color, shineColor, speed = 2 }: ShinyTextProps) => (
  <span
    className="shiny-text"
    style={{
      '--shiny-text-color': color,
      '--shiny-text-shine-color': shineColor,
      '--shiny-text-speed': `${Math.max(0.1, speed)}s`,
    } as CSSProperties}
  >
    {children}
  </span>
);
