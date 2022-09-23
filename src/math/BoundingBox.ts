import { Vector3 } from './Vector3';

export class BoundingBox {
  /** The minimum point of the box. */
  public readonly min: Vector3 = new Vector3();
  /** The maximum point of the box. */
  public readonly max: Vector3 = new Vector3();

  /**
   * Constructor of BoundingBox.
   * @param min - The minimum point of the box
   * @param max - The maximum point of the box
   */
  constructor(min: Vector3 = null, max: Vector3 = null) {
    min && this.min.copyFrom(min);
    max && this.max.copyFrom(max);
  }
}
