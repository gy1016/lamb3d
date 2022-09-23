import { MathUtil, Vector2 } from '../../src/math';
import { Geodetic2 } from '../../src/math/Geodetic2';

describe('MathUtil', function () {
  it('Grid To WebMercator Rect', () => {
    let res0 = MathUtil.gridToWebMercatorRect(0, 0, 0);
    expect(MathUtil.equals(res0.min.x, res0.min.y)).toBe(true);
    expect(MathUtil.equals(res0.max.x, res0.max.y)).toBe(true);

    let res1 = MathUtil.gridToWebMercatorRect(1, 0, 0);
    expect(MathUtil.equals(res1.min.x, -Math.PI * 6378137));
    expect(MathUtil.equals(res1.max.x, 0));
  });

  it('Web mercator coordinate to geodetic', () => {
    let res0 = MathUtil.webMercatorToGeodetic(new Vector2(0, 0));
    expect(res0.lon).toBe(0);
    expect(res0.lat).toBe(0);

    let res1 = MathUtil.webMercatorToGeodetic(new Vector2(-Math.PI * 6378137, 0));
    expect(MathUtil.equals(res1.lon, -180)).toBe(true);
    expect(MathUtil.equals(res1.lat, 0)).toBe(true);
  });

  it('Grid to geodetic rect', () => {
    let res0 = MathUtil.gridToGeodeticRect(0, 0, 0);
    expect(MathUtil.equals(res0.min.lon, -180)).toBe(true);
    expect(MathUtil.equals(res0.min.lat, -85.05112877980659)).toBe(true);
    expect(MathUtil.equals(res0.max.lon, 180)).toBe(true);
    expect(MathUtil.equals(res0.max.lat, 85.05112877980659)).toBe(true);

    let res1 = MathUtil.gridToGeodeticRect(1, 0, 0);
    expect(MathUtil.equals(res1.min.lon, -180)).toBe(true);
    expect(MathUtil.equals(res1.min.lat, 0)).toBe(true);
    expect(MathUtil.equals(res1.max.lon, 0)).toBe(true);
    expect(MathUtil.equals(res1.max.lat, 85.05112877980659)).toBe(true);
  });

  it('Geodetic to web mercator', () => {
    let res0 = MathUtil.geodeticToWebMercator(new Geodetic2(0, 0));
    expect(MathUtil.equals(res0.x, 0)).toBe(true);
    expect(MathUtil.equals(res0.y, 0)).toBe(true);

    let res1 = MathUtil.geodeticToWebMercator(new Geodetic2(-180, 0));
    expect(MathUtil.equals(res1.x, -20037508.342789244)).toBe(true);
    expect(MathUtil.equals(res1.y, 0)).toBe(true);
  });
});
