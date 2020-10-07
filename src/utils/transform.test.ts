import { getRotatedBoundingBox } from './transform';

test('getRotatedBoundingBox works as expected with 0 rotation', () => {
    const res = getRotatedBoundingBox(200, 100, 0);
    expect(res.minX).toBe(0);
    expect(res.maxX).toBe(200);
    expect(res.minY).toBe(0);
    expect(res.maxY).toBe(100);
});

test('getRotatedBoundingBox works as expected with a 90deg rotation', () => {
    const res = getRotatedBoundingBox(200, 100, Math.PI / 2);
    expect(res.minX).toBe(50);
    expect(res.maxX).toBe(150);
    expect(res.minY).toBe(-50);
    expect(res.maxY).toBe(150);
});
