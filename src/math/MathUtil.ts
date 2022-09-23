import { BoundingRect } from './BoundingRect';
import { Geodetic2 } from './Geodetic2';
import { Vector2 } from './Vector2';

/**
 * Common utility methods for math operations.
 */
export class MathUtil {
  /** The value for which all absolute numbers smaller than are considered equal to zero. */
  static readonly zeroTolerance: number = 1e-6;
  /** The conversion factor that radian to degree. */
  static readonly radToDegreeFactor: number = 180 / Math.PI;
  /** The conversion factor that degree to radian. */
  static readonly degreeToRadFactor: number = Math.PI / 180;
  /** WGS84 Earth Radius. */
  static readonly earthRadius: number = 6378137;

  /**
   * Clamps the specified value.
   * @param v - The specified value
   * @param min - The min value
   * @param max - The max value
   * @returns The result of clamping a value between min and max
   */
  static clamp(v: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, v));
  }

  /**
   * Checks if a and b are almost equals.
   * The absolute value of the difference between a and b is close to zero.
   * @param a - The left value to compare
   * @param b - The right value to compare
   * @returns True if a almost equal to b, false otherwise
   */
  static equals(a: number, b: number): boolean {
    return Math.abs(a - b) <= MathUtil.zeroTolerance;
  }

  /**
   * Determines whether the specified v is pow2.
   * @param v - The specified v
   * @returns True if the specified v is pow2, false otherwise
   */
  static isPowerOf2(v: number): boolean {
    return (v & (v - 1)) === 0;
  }

  /**
   * Modify the specified r from radian to degree.
   * @param r - The specified r
   * @returns The degree value
   */
  static radianToDegree(r: number): number {
    return r * MathUtil.radToDegreeFactor;
  }

  /**
   * Modify the specified d from degree to radian.
   * @param d - The specified d
   * @returns The radian value
   */
  static degreeToRadian(d: number): number {
    return d * MathUtil.degreeToRadFactor;
  }

  /**
   * Calculate the range of the projection area covered by the slice.
   * @param level Tile level.
   * @param row Tile row.
   * @param column Tile column.
   * @returns BoundingRect<Vector2>.
   */
  static gridToWebMercatorRect(level: number, row: number, column: number): BoundingRect<Vector2> {
    const min = new Vector2();
    const max = new Vector2();

    // size =  2 * pi * r / (2 << level); 表示一块tile的宽(宽高相等)
    const perimeterHalf = Math.PI * MathUtil.earthRadius;
    const size = (perimeterHalf * 2) / (1 << level);

    min.x = -perimeterHalf + column * size;
    max.x = min.x + size;
    max.y = perimeterHalf - row * size;
    min.y = max.y - size;

    return new BoundingRect(min, max);
  }

  /**
   * Calculate the range of the projection area covered by the slice.
   * @param level Tile level.
   * @param row Tile row.
   * @param column Tile column.
   * @returns BoundingRect<Geodetic2>.
   */
  static gridToGeodeticRect(level: number, row: number, column: number): BoundingRect<Geodetic2> {
    const mercatorRect = this.gridToWebMercatorRect(level, row, column);
    const min = this.webMercatorToGeodetic(mercatorRect.min);
    const max = this.webMercatorToGeodetic(mercatorRect.max);

    return new BoundingRect<Geodetic2>(min, max);
  }

  /**
   * Web mercator coordinate to geodetic.
   * @param coord Web mercator coordinate.
   * @returns Geodetic2.
   */
  static webMercatorToGeodetic(coord: Vector2): Geodetic2 {
    const lon = MathUtil.radianToDegree(coord.x / MathUtil.earthRadius);
    const lat = MathUtil.radianToDegree(2 * Math.atan(Math.pow(Math.E, coord.y / MathUtil.earthRadius)) - Math.PI / 2);
    return new Geodetic2(lon, lat);
  }

  /**
   * 将度数表示的地理坐标转换为墨卡托坐标。
   * @param coord 地理坐标。
   * @returns 墨卡托坐标。
   */
  static geodeticToWebMercator(coord: Geodetic2): Vector2 {
    const x = this.degreeToRadian(coord.lon) * MathUtil.earthRadius;
    const y = MathUtil.earthRadius * Math.log(Math.tan(Math.PI / 4 + this.degreeToRadian(coord.lat) / 2));

    return new Vector2(x, y);
  }
}
