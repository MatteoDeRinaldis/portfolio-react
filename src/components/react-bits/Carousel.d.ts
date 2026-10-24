import type { CSSProperties, FC, ReactNode } from 'react';

export interface CarouselItem {
  id?: string | number;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  image?: string;
  alt?: string;
}

export interface CarouselProps {
  items?: Array<CarouselItem | string | ReactNode>;
  baseWidth?: number | string;
  aspectRatio?: number;
  peek?: number;
  gap?: number;
  radius?: number;
  frame?: boolean;
  effect?: 'tilt' | 'slide' | 'scale' | 'fade' | 'cube';
  indicator?: 'dots' | 'bars' | 'counter' | 'none';
  arrows?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  draggable?: boolean;
  round?: boolean;
  initialIndex?: number;
  theme?: 'dark' | 'light';
  onChange?: (index: number) => void;
  className?: string;
  style?: CSSProperties;
}

declare const Carousel: FC<CarouselProps>;

export default Carousel;
