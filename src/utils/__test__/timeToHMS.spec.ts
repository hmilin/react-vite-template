import timeToHMS from '../timeToHMS';

describe('test timeToHMS render', () => {
  test('zero seconds', () => {
    expect(timeToHMS(0)).toBe('0s');
  });

  test('zero undefined', () => {
    expect(timeToHMS(undefined)).toBe('');
  });

  test('zero string', () => {
    expect(timeToHMS('---')).toBe('');
  });

  test('zero normal time', () => {
    expect(timeToHMS(3661000)).toBe('1h1m1s');
  });

  test('test negative', () => {
    expect(timeToHMS(-1)).toBe('0s');
  });
});
