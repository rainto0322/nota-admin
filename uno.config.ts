// uno.config.ts
import { defineConfig, presetWebFonts } from 'unocss'
import { presetWind3 } from "@unocss/preset-wind3";
export default defineConfig({
  theme: {
    colors: {
      base: 'var(--base)',
      text: 'var(--text)',
      done: 'var(--done)',
      warn: 'var(--warn)',
      error: 'var(--error)',
    }
  },
  presets: [
    presetWind3()
  ],

})