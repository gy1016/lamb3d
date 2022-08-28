import { Matrix4 } from './Matrix4';
import { Quaternion } from './Quaternion';
/**
 * Describes a 4D-vector.
 */
export declare class Vector4 {
    /** @internal */
    static readonly _zero: Vector4;
    /** @internal */
    static readonly _one: Vector4;
    /**
     * Determines the sum of two vectors.
     * @param left - The first vector to add
     * @param right - The second vector to add
     * @param out - The sum of two vectors
     */
    static add(left: Vector4, right: Vector4, out: Vector4): void;
    /**
     * Determines the difference between two vectors.
     * @param left - The first vector to subtract
     * @param right - The second vector to subtract
     * @param out - The difference between two vectors
     */
    static subtract(left: Vector4, right: Vector4, out: Vector4): void;
    /**
     * Determines the product of two vectors.
     * @param left - The first vector to multiply
     * @param right - The second vector to multiply
     * @param out - The product of two vectors
     */
    static multiply(left: Vector4, right: Vector4, out: Vector4): void;
    /**
     * Determines the divisor of two vectors.
     * @param left - The first vector to divide
     * @param right - The second vector to divide
     * @param out - The divisor of two vectors
     */
    static divide(left: Vector4, right: Vector4, out: Vector4): void;
    /**
     * Determines the dot product of two vectors.
     * @param left - The first vector to dot
     * @param right - The second vector to dot
     * @returns The dot product of two vectors
     */
    static dot(left: Vector4, right: Vector4): number;
    /**
     * Determines the distance of two vectors.
     * @param a - The first vector
     * @param b - The second vector
     * @returns The distance of two vectors
     */
    static distance(a: Vector4, b: Vector4): number;
    /**
     * Determines the squared distance of two vectors.
     * @param a - The first vector
     * @param b - The second vector
     * @returns The squared distance of two vectors
     */
    static distanceSquared(a: Vector4, b: Vector4): number;
    /**
     * Determines whether the specified vectors are equals.
     * @param left - The first vector to compare
     * @param right - The second vector to compare
     * @returns True if the specified vectors are equals, false otherwise
     */
    static equals(left: Vector4, right: Vector4): boolean;
    /**
     * Performs a linear interpolation between two vectors.
     * @param start - The first vector
     * @param end - The second vector
     * @param t - The blend amount where 0 returns start and 1 end
     * @param out - The result of linear blending between two vectors
     */
    static lerp(start: Vector4, end: Vector4, t: number, out: Vector4): void;
    /**
     * Calculate a vector containing the largest components of the specified vectors.
     * @param left - The first vector
     * @param right - The second vector
     * @param out - The vector containing the largest components of the specified vectors
     */
    static max(left: Vector4, right: Vector4, out: Vector4): void;
    /**
     * Calculate a vector containing the smallest components of the specified vectors.
     * @param left - The first vector
     * @param right - The second vector
     * @param out - The vector containing the smallest components of the specified vectors
     */
    static min(left: Vector4, right: Vector4, out: Vector4): void;
    /**
     * Reverses the direction of a given vector.
     * @param a - The vector to negate
     * @param out - The vector facing in the opposite direction
     */
    static negate(a: Vector4, out: Vector4): void;
    /**
     * Converts the vector into a unit vector.
     * @param a - The vector to normalize
     * @param out - The normalized vector
     */
    static normalize(a: Vector4, out: Vector4): void;
    /**
     * Scale a vector by the given value.
     * @param a - The vector to scale
     * @param s - The amount by which to scale the vector
     * @param out - The scaled vector
     */
    static scale(a: Vector4, s: number, out: Vector4): void;
    /**
     * Performs a transformation using the given 4x4 matrix.
     * @param v - The vector to transform
     * @param m - The transform matrix
     * @param out - The transformed vector3
     */
    static transform(v: Vector4, m: Matrix4, out: Vector4): void;
    /**
     * Performs a transformation using the given quaternion.
     * @param v - The vector to transform
     * @param q - The transform quaternion
     * @param out - The transformed vector
     */
    static transformByQuat(v: Vector4, q: Quaternion, out: Vector4): void;
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
     * The x component of the vector.
     */
    get x(): number;
    set x(value: number);
    /**
     * The y component of the vector.
     */
    get y(): number;
    set y(value: number);
    /**
     * The z component of the vector.
     */
    get z(): number;
    set z(value: number);
    /**
     * The w component of the vector.
     */
    get w(): number;
    set w(value: number);
    /**
     * Constructor of Vector4.
     * @param x - The x component of the vector, default 0
     * @param y - The y component of the vector, default 0
     * @param z - The z component of the vector, default 0
     * @param w - The w component of the vector, default 0
     */
    constructor(x?: number, y?: number, z?: number, w?: number);
    /**
     * Set the value of this vector.
     * @param x - The x component of the vector
     * @param y - The y component of the vector
     * @param z - The z component of the vector
     * @param w - The w component of the vector
     * @returns This vector
     */
    setValue(x: number, y: number, z: number, w: number): Vector4;
    /**
     * Set the value of this vector by an array.
     * @param array - The array
     * @param offset - The start offset of the array
     * @returns This vector
     */
    setValueByArray(array: ArrayLike<number>, offset?: number): Vector4;
    /**
     * Determines the sum of this vector and the specified vector.
     * @param right - The specified vector
     * @returns This vector
     */
    add(right: Vector4): Vector4;
    /**
     * Determines the difference of this vector and the specified vector.
     * @param right - the specified vector
     * @returns This vector
     */
    subtract(right: Vector4): Vector4;
    /**
     * Determines the product of this vector and the specified vector.
     * @param right - the specified vector
     * @returns This vector
     */
    multiply(right: Vector4): Vector4;
    /**
     * Determines the divisor of this vector and the specified vector.
     * @param right - the specified vector
     * @returns This vector
     */
    divide(right: Vector4): Vector4;
    /**
     * Calculate the length of this vector.
     * @returns The length of this vector
     */
    length(): number;
    /**
     * Calculate the squared length of this vector.
     * @returns The squared length of this vector
     */
    lengthSquared(): number;
    /**
     * Reverses the direction of this vector.
     * @returns This vector
     */
    negate(): Vector4;
    /**
     * Converts this vector into a unit vector.
     * @returns This vector
     */
    normalize(): Vector4;
    /**
     * Scale this vector by the given value.
     * @param s - The amount by which to scale the vector
     * @returns This vector
     */
    scale(s: number): Vector4;
    /**
     * Clone the value of this vector to an array.
     * @param out - The array
     * @param outOffset - The start offset of the array
     */
    toArray(out: number[] | Float32Array | Float64Array, outOffset?: number): void;
    /**
     * Creates a clone of this vector.
     * @returns A clone of this vector
     */
    clone(): Vector4;
    /**
     * Clones this vector to the specified vector.
     * @param out - The specified vector
     * @returns The specified vector
     */
    cloneTo(out: Vector4): Vector4;
}
