import 'styled-components';

import type { Theme } from './styles/theme';

declare const require: any;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.ttf' {
  const value: string;
  export default value;
}

declare module '*.json' {
  const value: Record<string, unknown>;
  export default value;
}

declare module './reportWebVitals' {
  const value: () => void;
  export default value;
}
