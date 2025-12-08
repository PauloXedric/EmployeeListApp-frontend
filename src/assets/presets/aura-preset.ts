import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f8f3ef',
      100: '#f1e2d3',
      200: '#e3c3a4',
      300: '#d2a174',
      400: '#b97d4a',
      500: '#8b4513',
      600: '#753a10',
      700: '#5e2f0d',
      800: '#47240a',
      900: '#301806',
      950: '#1a0d03',
    },
  },
});
