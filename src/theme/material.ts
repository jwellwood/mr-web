import type { PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    data: {
      main: string;
    };
    label: {
      main: string;
    };
    dark: {
      main: string;
    };
    tertiary: {
      main: string;
    };
    gold: {
      main: string;
    };
    silver: {
      main: string;
    };
    bronze: {
      main: string;
    };
  }
}

declare module '@mui/material/styles' {
  export interface TypographyVariants {
    secondaryFont: React.CSSProperties['fontFamily'];
  }
  interface SecondaryFont {
    fontFamily: string;
  }
  interface FontStyle {
    secondaryFont: SecondaryFont;
    color: string;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}

declare module '@mui/material/styles' {
  // interface Palette {
  //   dark: PaletteColor;
  //   data: PaletteColor;
  //   label: PaletteColor;
  //   tertiary: PaletteColor;
  //   gold: PaletteColor;
  //   silver: PaletteColor;
  //   bronze: PaletteColor;
  // }
  interface PaletteOptions {
    dark: PaletteColorOptions;
    data: PaletteColorOptions;
    label: PaletteColorOptions;
    tertiary: PaletteColorOptions;
    gold: PaletteColorOptions;
    silver: PaletteColorOptions;
    bronze: PaletteColorOptions;
  }
}
