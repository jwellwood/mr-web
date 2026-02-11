import '@mui/material/styles';

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

  interface PaletteOptions {
    dark?: Palette['dark'];
    data?: Palette['data'];
    label?: Palette['label'];
    tertiary?: Palette['tertiary'];
    gold?: Palette['gold'];
    silver?: Palette['silver'];
    bronze?: Palette['bronze'];
  }

  interface TypographyVariants {
    secondaryFont: {
      fontFamily: string;
    };
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    secondaryFont?: {
      fontFamily?: string;
    };
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}

// Export to make this a module
export {};
