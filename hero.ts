import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';

export default {
  content: [
    // You can add additional content paths here if needed
  ],
  plugins: [
    heroui({
      // Add any HeroUI customization options here
    })
  ],
} satisfies Config;
