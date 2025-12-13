export type ThemeMode = 'light' | 'dark';

export interface ColorTokens {
  primary: string;
  black: string;
  white: string;
  gray100: string;
}

export interface TypographyTokens {
  heading: string;
  body: string;
  mono: string;
  weights: {
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };
}

export interface ElevationTokens {
  resting: string;
  raised: string;
  overlay: string;
}

export const COLOR_TOKENS: ColorTokens = {
  primary: '#FD272D',
  black: '#000000',
  white: '#FFFFFF',
  gray100: '#F1F1F1'
};

export const TYPOGRAPHY_TOKENS: TypographyTokens = {
  heading: '"Work Sans", "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  body: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  mono: '"JetBrains Mono", "SFMono-Regular", ui-monospace, "Source Code Pro", monospace',
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  }
};

export const ELEVATION_TOKENS: ElevationTokens = {
  resting: '0 1px 2px rgba(0,0,0,0.06)',
  raised: '0 10px 30px rgba(0,0,0,0.12)',
  overlay: '0 30px 80px rgba(0,0,0,0.28)'
};

