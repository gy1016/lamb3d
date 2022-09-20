import { Matrix3 } from './Matrix3';
import { Vector3 } from './Vector3';
/**
 * Represents a four dimensional mathematical quaternion.
 */
export declare class Quaternion {
    /** @internal */
    static readonly _tempVector3: Vector3;
    /** @internal */
    static readonly _tempQuat1: Quaternion;
    /**
     * Determines the sum of two quaternions.
     * @param left - The first quaternion to add
     * @param right - The second quaternion to add
     * @param out - The sum of two quaternions
     */
    static add(left: Quaternion, right: Quaternion, out: Quaternion): void;
    /**
     * Determines the product of two quaternions.
     * @param left - The first quaternion to multiply
     * @param right - The second quaternion to multiply
     * @param out - The product of two quaternions
     */
    static multiply(left: Quaternion, right: Quaternion, out: Quaternion): void;
    /**
     * Calculate quaternion that contains conjugated version of the specified quaternion.
     * @param a - The specified quaternion
     * @param out - The conjugate version of the specified quaternion
     */
    static conjugate(a: Quaternion, out: Quaternion): void;
    /**
     * Determines the dot product of two quaternions.
     * @param left - The first quaternion to dot
     * @param right - The second quaternion to dot
     * @returns The dot product of two quaternions
     */
    static dot(left: Quaternion, right: Quaternion): number;
    /**
     * Determines whether the specified quaternions are equals.
     * @param left - The first quaternion to compare
     * @param right - The second quaternion to compare
     * @returns True if the specified quaternions are equals, false otherwise
     */
    static equals(left: Quaternion, right: Quaternion): boolean;
    /**
     * Calculate a quaternion rotates around an arbitrary axis.
     * @param axis - The axis
     * @param rad - The rotation angle in radians
     * @param out - The quaternion after rotate
     */
    static rotationAxisAngle(axis: Vector3, rad: number, out: Quaternion): void;
    /**
     * Calculate a quaternion rotates around x, y, z axis (pitch/yaw/roll).
     * @param x - The radian of rotation around X (pitch)
     * @param y - The radian of rotation around Y (yaw)
     * @param z - The radian of rotation around Z (roll)
     * @param out - The calculated quaternion
     */
    static rotationEuler(x: number, y: number, z: number, out: Quaternion): void;
    /**
     * Calculate a quaternion from the specified yaw, pitch and roll angles.
     * @param yaw - Yaw around the y axis in radians
     * @param pitch - Pitch around the x axis in radians
     * @param roll - Roll around the z axis in radians
     * @param out - The calculated quaternion
     */
    static rotationYawPitchRoll(yaw: number, pitch: number, roll: number, out: Quaternion): void;
    /**
     * Calculate a quaternion from the specified 3x3 matrix.
     * @param m - The specified 3x3 matrix
     * @param out - The calculated quaternion
     */
    static rotationMatrix3x3(m: Matrix3, out: Quaternion): void;
    /**
     * Calculate the inverse of the specified quaternion.
     * @param a - The quaternion whose inverse is to be calculated
     * @param out - The inverse of the specified quaternion
     */
    static invert(a: Quaternion, out: Quaternion): void;
    /**
     * Performs a linear blend between two quaternions.
     * @param start - The first quaternion
     * @param end - The second quaternion
     * @param t - The blend amount where 0 returns start and 1 end
     * @param out - The result of linear blending between two quaternions
     */
    static lerp(start: Quaternion, end: Quaternion, t: number, out: Quaternion): void;
    /**
     * Performs a spherical linear blend between two quaternions.
     * @param start - The first quaternion
     * @param end - The second quaternion
     * @param t - The blend amount where 0 returns start and 1 end
     * @param out - The result of spherical linear blending between two quaternions
     */
    static slerp(start: Quaternion, end: Quaternion, t: number, out: Quaternion): void;
    /**
     * Scales the specified quaternion magnitude to unit length.
     * @param a - The specified quaternion
     * @param out - The normalized quaternion
     */
    static normalize(a: Quaternion, out: Quaternion): void;
    /**
     * Calculate a quaternion rotate around X axis.
     * @param rad - The rotation angle in radians
     * @param out - The calculated quaternion
     */
    static rotationX(rad: number, out: Quaternion): void;
    /**
     * Calculate a quaternion rotate around Y axis.
     * @param rad - The rotation angle in radians
     * @param out - The calculated quaternion
     */
    static rotationY(rad: number, out: Quaternion): void;
    /**
     * Calculate a quaternion rotate around Z axis.
     * @param rad - The rotation angle in radians
     * @param out - The calculated quaternion
     */
    static rotationZ(rad: number, out: Quaternion): void;
    /**
     * Calculate a quaternion that the specified quaternion rotate around X axis.
     * @param quaternion - The specified quaternion
     * @param rad - The rotation angle in radians
     * @param out - The calculated quaternion
     */
    static rotateX(quaternion: Quaternion, rad: number, out: Quaternion): void;
    /**
     * Calculate a quaternion that the specified quaternion rotate around Y axis.
     * @param quaternion - The specified quaternion
     * @param rad - The rotation angle in radians
     * @param out - The calculated quaternion
     */
    static rotateY(quaternion: Quaternion, rad: number, out: Quaternion): void;
    /**
     * Calculate a quaternion that the specified quaternion rotate around Z axis.
     * @param quaternion - The specified quaternion
     * @param rad - The rotation angle in radians
     * @param out - The calculated quaternion
     */
    static rotateZ(quaternion: Quaternion, rad: number, out: Quaternion): void;
    /**
     * Scale a quaternion by a given number.
     * @param a - The quaternion
     * @param s - The given number
     * @param out - The scaled quaternion
     */
    static scale(a: Quaternion, s: number, out: Quaternion): void;
    /** @internal */
    _x: number;
    /** @internal */
    _y: number;
    /** @internal */
    _z: number;
    /** @internal */
    _w: number;
    /** @internal */
    _onValueChanged: () => void;
    /**
     * The x component of the quaternion.
     */
    get x(): number;
    set x(value: number);
    /**
     * The y component of the quaternion.
     */
    get y(): number;
    set y(value: number);
    /**
     * The z component of the quaternion.
     */
    get z(): number;
    set z(value: number);
    /**
     * Indicting whether this instance is normalized.
     */
    get normalized(): boolean;
    /**
     * The w component of the quaternion.
     */
    get w(): number;
    set w(value: number);
    /**
     * Constructor of Quaternion.
     * @param x - The x component of the quaternion, default 0
     * @param y - The y component of the quaternion, default 0
     * @param z - The z component of the quaternion, default 0
     * @param w - The w component of the quaternion, default 1
     */
    constructor(x?: number, y?: number, z?: number, w?: number);
    /**
     * Set the value of this quaternion, and return this quaternion.
     * @param x - The x component of the quaternion
     * @param y - The y component of the quaternion
     * @param z - The z component of the quaternion
     * @param w - The w component of the quaternion
     * @returns This quaternion
     */
    setValue(x: number, y: number, z: number, w: number): Quaternion;
    /**
     * Set the value of this quaternion by an array.
     * @param array - The array
     * @param offset - The start offset of the array
     * @returns This quaternion
     */
    setValueByArray(array: ArrayLike<number>, offset?: number): Quaternion;
    /**
     * Transforms this quaternion into its conjugated version.
     * @returns This quaternion
     */
    conjugate(): Quaternion;
    /**
     * Get the rotation axis and rotation angle of the quaternion (unit: radians).
     * @param out - The axis as an output parameter
     * @returns The rotation angle (unit: radians)
     */
    getAxisAngle(out: Vector3): number;
    /**
     * Identity this quaternion.
     * @returns This quaternion after identity
     */
    identity(): Quaternion;
    /**
     * Calculate the length of this quaternion.
     * @returns The length of this quaternion
     */
    length(): number;
    /**
     * Calculates the squared length of this quaternion.
     * @returns The squared length of this quaternion
     */
    lengthSquared(): number;
    /**
     * Converts this quaternion into a unit quaternion.
     * @returns This quaternion
     */
    normalize(): Quaternion;
    /**
     * Get the euler of this quaternion.
     * @param out - The euler (in radians) as an output parameter
     * @returns Euler x->pitch y->yaw z->roll
     */
    toEuler(out: Vector3): Vector3;
    /**
     * Get the euler of this quaternion.
     * @param out - The euler (in radians) as an output parameter
     * @returns Euler x->yaw y->pitch z->roll
     */
    toYawPitchRoll(out: Vector3): Vector3;
    /**
     * Clone the value of this quaternion to an array.
     * @param out - The array
     * @param outOffset - The start offset of the array
     */
    toArray(out: number[] | Float32Array | Float64Array, outOffset?: number): void;
    /**
     * Creates a clone of this quaternion.
     * @returns A clone of this quaternion
     */
    clone(): Quaternion;
    /**
     * Clones this quaternion to the specified quaternion.
     * @param out - The specified quaternion
     * @returns The specified quaternion
     */
    cloneTo(out: Quaternion): Quaternion;
    /**
     * Calculate this quaternion rotate around X axis.
     * @param rad - The rotation angle in radians
     * @returns This quaternion
     */
    rotateX(rad: number): Quaternion;
    /**
     * Calculate this quaternion rotate around Y axis.
     * @param rad - The rotation angle in radians
     * @returns This quaternion
     */
    rotateY(rad: number): Quaternion;
    /**
     * Calculate this quaternion rotate around Z axis.
     * @param rad - The rotation angle in radians
     * @returns This quaternion
     */
    rotateZ(rad: number): Quaternion;
    /**
     * Calculate this quaternion rotates around an arbitrary axis.
     * @param axis - The axis
     * @param rad - The rotation angle in radians
     * @returns This quaternion
     */
    rotationAxisAngle(axis: Vector3, rad: number): Quaternion;
    /**
     * Determines the product of this quaternion and the specified quaternion.
     * @param quat - The specified quaternion
     * @returns The product of the two quaternions
     */
    multiply(quat: Quaternion): Quaternion;
    /**
     * Invert this quaternion.
     * @returns This quaternion after invert
     */
    invert(): Quaternion;
    /**
     * Determines the dot product of this quaternion and the specified quaternion.
     * @param quat - The specified quaternion
     * @returns The dot product of two quaternions
     */
    dot(quat: Quaternion): number;
    /**
     * Performs a linear blend between this quaternion and the specified quaternion.
     * @param quat - The specified quaternion
     * @param t - The blend amount where 0 returns this and 1 quat
     * @returns - The result of linear blending between two quaternions
     */
    lerp(quat: Quaternion, t: number): Quaternion;
    /**
     * Calculate this quaternion rotation around an arbitrary axis.
     * @param axis - The axis
     * @param rad - The rotation angle in radians
     * @returns This quaternion
     */
    rotateAxisAngle(axis: Vector3, rad: number): Quaternion;
    private _toYawPitchRoll;
}
