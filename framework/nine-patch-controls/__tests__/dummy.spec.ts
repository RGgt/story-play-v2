// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, it, expect } from 'vitest';

describe('Always pass', () => {
  it('simple valid equation', () => {
    expect(Math.sqrt(4)).toBe(2);
    expect(2 + 5).toBe(7);
    expect(3 * 5).toBe(15);
    expect(24 / 6).toBe(4);
  });
});
