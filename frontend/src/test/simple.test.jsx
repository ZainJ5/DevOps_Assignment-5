import { describe, it, expect } from 'vitest';

describe('Logic Testing', () => {
  it('should correctly sum two numbers', () => {
    expect(1 + 1).toBe(2);
  });

  it('should correctly verify a truthy value', () => {
    const isVisible = true;
    expect(isVisible).toBe(true);
  });
});

describe('String Formatting', () => {
  it('should capitalize the first letter of a news category', () => {
    const category = 'technology';
    const formatted = category.charAt(0).toUpperCase() + category.slice(1);
    expect(formatted).toBe('Technology');
  });
});