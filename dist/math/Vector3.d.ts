import { Matrix4 } from './Matrix4';
import { Quaternion } from './Quaternion';
import { Vector4 } from './Vector4';
/**
 * Describes a 3D-vector.
 */
export declare class Vector3 {
    /** @internal */
    static readonly _zero: Vector3;
    /** @internal */
    static readonly _one: Vector3;
    /**
     * Determines the sum of two vectors.
     * @param left - The first vector to add
     * @param right - The second vector to add
     * @param out - The sum of two vectors
     */
    static add(left: Vector3, right: Vector3, out: Vector3): void;
    /**
     * Determines the difference between two vectors.
     * @param left - The first vector to subtract
     * @param right - The second vector to subtract
     * @param out - The difference between two vectors
     */
    static subtract(left: Vector3, right: Vector3, out: Vector3): void;
    /**
     * Determines the product of two vectors.
     * @param left - The first vector to multiply
     * @param right - The second vector to multiply
     * @param out - The product of two vectors
     */
    static multiply(left: Vector3, right: Vector3, out: Vector3): void;
    /**
     * Determines the divisor of two vectors.
     * @param left - The first vector to divide
     * @param right - The second vector to divide
     * @param out - The divisor of two vectors
     */
    static divide(left: Vector3, right: Vector3, out: Vector3): void;
    /**
     * Determines the dot product of two vectors.
     * @param left - The first vector to dot
     * @param right - The second vector to dot
     * @returns The dot product of two vectors
     */
    static dot(left: Vector3, right: Vector3): number;
    /**
     * Determines the cross product of two vectors.
     * @param left - The first vector to cross
     * @param right - The second vector to cross
     * @param out - The cross product of two vectors
     */
    static cross(left: Vector3, right: Vector3, out: Vector3): void;
    /**
     * Determines the distance of two vectors.
     * @param a - The first vector
     * @param b - The second vector
     * @returns The distance of two vectors
     */
    static distance(a: Vector3, b: Vector3): number;
    /**
     * Determines the squared distance of two vectors.
     * @param a - The first vector
     * @param b - The second vector
     * @returns The squared distance of two vectors
     */
    static distanceSquared(a: Vector3, b: Vector3): number;
    /**
     * Determines whether the specified vectors are equals.
     * @param left - The first vector to compare
     * @param right - The second vector to compare
     * @returns True if the specified vectors are equals, false otherwise
     */
    static equals(left: Vector3, right: Vector3): boolean;
    /**
     * Performs a linear interpolation between two vectors.
     * @param start - The first vector
     * @param end - The second vector
     * @param t - The blend amount where 0 returns start and 1 end
     * @param out - The result of linear blending between two vectors
     */
    static lerp(start: Vector3, end: Vector3, t: number, out: Vector3): void;
    /**
     * Calculate a vector containing the largest components of the specified vectors.
     * @param left - The first vector
     * @param right - The second vector
     * @param out - The vector containing the largest components of the specified vectors
     */
    static max(left: Vector3, right: Vector3, out: Vector3): void;
    /**
     * Calculate a vector containing the smallest components of the specified vectors.
     * @param left - The first vector
     * @param right - The second vector
     * @param out - The vector containing the smallest components of the specified vectors
     */
    static min(left: Vector3, right: Vector3, out: Vector3): void;
    /**
     * Reverses the direction of a given vector.
     * @param a - The vector to negate
     * @param out - The vector facing in the opposite direction
     */
    static negate(a: Vector3, out: Vector3): void;
    /**
     * Converts the vector into a unit vector.
     * @param a - The vector to normalize
     * @param out - The normalized vector
     */
    static normalize(a: Vector3, out: Vector3): void;
    /**
     * Scale a vector by the given value.
     * @param a - The vector to scale
     * @param s - The amount by which to scale the vector
     * @param out - The scaled vector
     */
    static scale(a: Vector3, s: number, out: Vector3): void;
    /**
     * Performs a normal transformation using the given 4x4 matrix.
     * @remarks
     * A normal transform performs the transformation with the assumption that the w component
     * is zero. This causes the fourth row and fourth column of the matrix to be unused. The
     * end result is a vector that is not translated, but all other transformation properties
     * apply. This is often preferred for normal vectors as normals purely represent direction
     * rather than location because normal vectors should not be translated.
     * @param v - The normal vector to transform
     * @param m - The transform matrix
     * @param out - The transformed normal
     */
    static transformNormal(v: Vector3, m: Matrix4, out: Vector3): void;
    /**
     * Performs a transformation using the given 4x4 matrix.
     * @param v - The vector to transform
     * @param m - The transform matrix
     * @param out - The transformed vector3
     */
    static transformToVec3(v: Vector3, m: Matrix4, out: Vector3): void;
    /**
     * Performs a transformation from vector3 to vector4 using the given 4x4 matrix.
     * @param v - The vector to transform
     * @param m - The transform matrix
     * @param out - The transformed vector4
     */
    static transformToVec4(v: Vector3, m: Matrix4, out: Vector4): void;
    /**
     * Performs a coordinate transformation using the given 4x4 matrix.
     *
     * @remarks
     * A coordinate transform performs the transformation with the assumption that the w component
     * is one. The four dimensional vector obtained from the transformation operation has each
     * component in the vector divided by the w component. This forces the w-component to be one and
     * therefore makes the vector homogeneous. The homogeneous vector is often preferred when working
     * with coordinates as the w component can safely be ignored.
     * @param v - The coordinate vector to transform
     * @param m - The transform matrix
     * @param out - The transformed coordinates
     */
    static transformCoordinate(v: Vector3, m: Matrix4, out: Vector3): void;
    /**
     * Performs a transformation using the given quaternion.
     * @param v - The vector to transform
     * @param quaternion - The transform quaternion
     * @param out - The transformed vector
     */
    static transformByQuat(v: Vector3, quaternion: Quaternion, out: Vector3): void;
    /** @internal */
    _x: number;
    /** @internal */
    _y: number;
    /** @internal */
    _z: number;
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
     * Constructor of Vector3.
     * @param x - The x component of the vector, default 0
     * @param y - The y component of the vector, default 0
     * @param z - The z component of the vector, default 0
     */
    constructor(x?: number, y?: number, z?: number);
    /**
     * Set the value of this vector.
     * @param x - The x component of the vector
     * @param y - The y component of the vector
     * @param z - The z component of the vector
     * @returns This vector
     */
    setValue(x: number, y: number, z: number): Vector3;
    /**
     * Set the value of this vector by an array.
     * @param array - The array
     * @param offset - The start offset of the array
     * @returns This vector
     */
    setValueByArray(array: ArrayLike<number>, offset?: number): Vector3;
    /**
     * Determines the sum of this vector and the specified vector.
     * @param right - The specified vector
     * @returns This vector
     */
    add(right: Vector3): Vector3;
    /**
     * Determines the difference of this vector and the specified vector.
     * @param right - The specified vector
     * @returns This vector
     */
    subtract(right: Vector3): Vector3;
    /**
     * Determines the product of this vector and the specified vector.
     * @param right - The specified vector
     * @returns This vector
     */
    multiply(right: Vector3): Vector3;
    /**
     * Determines the divisor of this vector and the specified vector.
     * @param right - The specified vector
     * @returns This vector
     */
    divide(right: Vector3): Vector3;
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
    negate(): Vector3;
    /**
     * Converts this vector into a unit vector.
     * @returns This vector
     */
    normalize(): Vector3;
    /**
     * Scale this vector by the given value.
     * @param s - The amount by which to scale the vector
     * @returns This vector
     */
    scale(s: number): Vector3;
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
    clone(): Vector3;
    /**
     * Clones this vector to the specified vector.
     * @param out - The specified vector
     * @returns The specified vector
     */
    cloneTo(out: Vector3): Vector3;
    /**
     * This vector performs a normal transformation using the given 4x4 matrix.
     * @remarks
     * A normal transform performs the transformation with the assumption that the w component
     * is zero. This causes the fourth row and fourth column of the matrix to be unused. The
     * end result is a vector that is not translated, but all other transformation properties
     * apply. This is often preferred for normal vectors as normals purely represent direction
     * rather than location because normal vectors should not be translated.
     * @param m - The transform matrix
     * @returns This vector
     */
    transformNormal(m: Matrix4): Vector3;
    /**
     * This vector performs a transformation using the given 4x4 matrix.
     * @param m - The transform matrix
     * @returns This vector
     */
    transformToVec3(m: Matrix4): Vector3;
    /**
     * This vector performs a coordinate transformation using the given 4x4 matrix.
     * @remarks
     * A coordinate transform performs the transformation with the assumption that the w component
     * is one. The four dimensional vector obtained from the transformation operation has each
     * component in the vector divided by the w component. This forces the w-component to be one and
     * therefore makes the vector homogeneous. The homogeneous vector is often preferred when working
     * with coordinates as the w component can safely be ignored.
     * @param m - The transform matrix
     * @returns This vector
     */
    transformCoordinate(m: Matrix4): Vector3;
    /**
     * This vector performs a transformation using the given quaternion.
     * @param quaternion - The transform quaternion
     * @returns This vector
     */
    transformByQuat(quaternion: Quaternion): Vector3;
}
