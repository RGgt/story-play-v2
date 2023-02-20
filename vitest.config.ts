// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // TODO: check ❗ may not be needed
    include: [
      '**/__tests__/**/*.test.{js,ts,jsx,tsx}',
      '**/__tests__/**/*.spec.{js,ts,jsx,tsx}',
    ],
  },
});
