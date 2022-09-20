import { Vector3 } from '../math';
export declare class Ellipsoid {
    static readonly Wgs84: Ellipsoid;
    static readonly ScaledWgs84: Ellipsoid;
    static readonly UnitSphere: Ellipsoid;
    private readonly _radii;
    private readonly _radiiSquared;
    private readonly _oneOverRadiiSquared;
    /** The tree radii of the ellipsoid. */
    get radii(): Vector3;
    /** The squares corresponding to the three radii of the ellipsoid. */
    get radiiSquared(): Vector3;
    /** The inverse of the square corresponding to the three radii of the ellipsoid. */
    get oneOverRadiiSquared(): Vector3;
    constructor(a: number, b: number, c: number);
}
