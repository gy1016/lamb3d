import { Geodetic2 } from './Geodetic2';
import { Vector2 } from './Vector2';

export class BoundingRect<T extends Vector2 | Geodetic2> {
  /** The minimum point of the rect. */
  public readonly min: T;
  /** The maximum point of the rect. */
  public readonly max: T;

  /**
   * Constructor of BoundingBox.
   * @param min - The minimum point of the rect.
   * @param max - The maximum point of the rect.
   */
  constructor(min: T = null, max: T = null) {
    if (!min || !max) {
      throw new Error('Bounding Rect not empty');
    }

    // TODO: 携程anyscript了！后续看看怎么改。
    this.min = min.clone() as any;
    this.max = max.clone() as any;
  }
}
