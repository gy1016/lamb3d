import { Vector3 } from '../math';
/**
 * Spherical.
 */
export declare class Spherical {
    /** Spherical radius. */
    radius: number;
    /** In the xoy plane, the angle with the x-axis. */
    phi: number;
    /** Angle with z-axis. */
    theta: number;
    /**
     * Build the initial state of the sphere.
     * @param radius Spherical radius, default is 1.0.
     * @param phi Angle with the x-axis, default is 0.
     * @param theta Angle with the z-axis, default is 0.
     */
    constructor(radius?: number, phi?: number, theta?: number);
    /**
     * Set spherical state
     * @param radius Spherical radius.
     * @param phi Angle with the x-axis.
     * @param theta Angle with the z-axis.
     * @returns Spherical.
     */
    set(radius: number, phi: number, theta: number): this;
    makeSafe(): this;
    /**
     * Calculate sphere state from vector.
     * @param v3 Vector3.
     * @returns Spherical.
     */
    setFromVec3(v3: Vector3): this;
    /**
     * Get Vector3 from sphere state.
     * @param v3 Vector3.
     * @returns Spherical.
     */
    setToVec3(v3: Vector3): this;
}
