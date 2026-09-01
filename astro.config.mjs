import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

let adapter = node({ mode: 'standalone' });

if (process.env.VERCEL) {
  try {
    const vercelModule = await import('@astrojs/vercel');
    adapter = vercelModule.default();
  } catch (e) {
    // fallback to node adapter if vercel adapter is not installed locally
  }
}

export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output: 'server',
  adapter,
});
