import ffmpeg from '@motion-canvas/ffmpeg';
import process from 'process';
import motionCanvas from '@motion-canvas/vite-plugin';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'MC_');
  if (!env.MC_PROJECT) {
    throw new Error('MC_PROJECT environment variable is not set.');
  }

  return {
    plugins: [
      motionCanvas({ project: env.MC_PROJECT }),
      ffmpeg(),
    ],
  };
});
