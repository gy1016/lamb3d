import { Vector3 } from '../math';

export class Ellipsoid {
  public static readonly Wgs84: Ellipsoid = new Ellipsoid(6378137.0, 6378137.0, 6356752.314245);
  public static readonly ScaledWgs84: Ellipsoid = new Ellipsoid(1.0, 1.0, 6356752.314245 / 6378137.0);
  public static readonly UnitSphere: Ellipsoid = new Ellipsoid(1.0, 1.0, 1.0);

  private readonly _radii: Vector3;
  private readonly _radiiSquared: Vector3;
  private readonly _oneOverRadiiSquared: Vector3;

  /** The tree radii of the ellipsoid. */
  get radii(): Vector3 {
    return this._radii;
  }

  /** The squares corresponding to the three radii of the ellipsoid. */
  get radiiSquared(): Vector3 {
    return this._radiiSquared;
  }

  /** The inverse of the square corresponding to the three radii of the ellipsoid. */
  get oneOverRadiiSquared(): Vector3 {
    return this._oneOverRadiiSquared;
  }

  constructor(a: number, b: number, c: number) {
    if (a <= 0 || b <= 0 || c <= 0) {
      throw new Error('Ellipsoid parameters are not allowed to be set to less than or equal to 0.');
    }
    this._radii = new Vector3(a, b, c);
    this._radiiSquared = new Vector3(a * a, b * b, c * c);
    this._oneOverRadiiSquared = new Vector3(
      1 / (this._radii.x * this._radii.x),
      1 / (this._radii.y * this._radii.y),
      1 / (this._radii.z * this._radii.z),
    );
  }
}
