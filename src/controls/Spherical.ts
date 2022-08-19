import { Vector3, MathUtil } from '../math';

/** Prevent gimbal lock. */
const ESP = MathUtil.zeroTolerance;

/**
 * Spherical.
 */
export class Spherical {
  /** Spherical radius. */
  public radius: number;
  /** In the xoy plane, the angle with the x-axis. */
  public phi: number;
  /** Angle with z-axis. */
  public theta: number;

  /**
   * Build the initial state of the sphere.
   * @param radius Spherical radius, default is 1.0.
   * @param phi Angle with the x-axis, default is 0.
   * @param theta Angle with the z-axis, default is 0.
   */
  constructor(radius?: number, phi?: number, theta?: number) {
    this.radius = radius !== undefined ? radius : 1.0;
    this.phi = phi !== undefined ? phi : 0;
    this.theta = theta !== undefined ? theta : 0;
  }

  /**
   * Set spherical state
   * @param radius Spherical radius.
   * @param phi Angle with the x-axis.
   * @param theta Angle with the z-axis.
   * @returns Spherical.
   */
  set(radius: number, phi: number, theta: number) {
    this.radius = radius;
    this.phi = phi;
    this.theta = theta;

    return this;
  }

  makeSafe() {
    this.phi = MathUtil.clamp(this.phi, ESP, Math.PI - ESP);
    return this;
  }

  /**
   * Calculate sphere state from vector.
   * @param v3 Vector3.
   * @returns Spherical.
   */
  setFromVec3(v3: Vector3) {
    this.radius = v3.length();
    if (this.radius === 0) {
      this.theta = 0;
      this.phi = 0;
    } else {
      this.theta = Math.atan2(v3.x, v3.z);
      this.phi = Math.acos(MathUtil.clamp(v3.y / this.radius, -1, 1));
    }

    return this;
  }

  /**
   * Get Vector3 from sphere state.
   * @param v3 Vector3.
   * @returns Spherical.
   */
  setToVec3(v3: Vector3) {
    const sinPhiRadius = Math.sin(this.phi) * this.radius;
    v3.setValue(
      sinPhiRadius * Math.sin(this.theta),
      Math.cos(this.phi) * this.radius,
      sinPhiRadius * Math.cos(this.theta),
    );

    return this;
  }
}
