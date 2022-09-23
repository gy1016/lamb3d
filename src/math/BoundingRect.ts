import { Geodetic2 } from './Geodetic2';
import { Vector2 } from './Vector2';

export class BoundingRect<T extends Vector2 | Geodetic2> {
  /** The minimum point of the rect. */
  public readonly min: T;
  /** The maximum point of the rect. */
  public readonly max: T;

  /**
   * Constructor of BoundingBox.
   * @param min - The minimum point of the rect
   * @param max - The maximum point of the rect
   */
  constructor(min: T = null, max: T = null) {
    if (!min || !max) {
      throw new Error('Bounding Rect not empty');
    }

    if (min instanceof Vector2 && max instanceof Vector2) {
      (this.min as Vector2).copyFrom(min);
      (this.max as Vector2).copyFrom(max);
    } else if (min instanceof Geodetic2 && max instanceof Geodetic2) {
      (this.min as Geodetic2).copyFrom(min);
      (this.max as Geodetic2).copyFrom(max);
    }
  }
}
