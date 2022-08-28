import { Matrix4 } from './Matrix4';
import { Quaternion } from './Quaternion';
import { Vector2 } from './Vector2';
/**
 * Represents a 3x3 mathematical matrix.
 */
export declare class Matrix3 {
    /**
     * Determines the sum of two matrices.
     * @param left - The first matrix to add
     * @param right - The second matrix to add
     * @param out - The sum of two matrices
     */
    static add(left: Matrix3, right: Matrix3, out: Matrix3): void;
    /**
     * Determines the difference between two matrices.
     * @param left - The first matrix to subtract
     * @param right - The second matrix to subtract
     * @param out - The difference between two matrices
     */
    static subtract(left: Matrix3, right: Matrix3, out: Matrix3): void;
    /**
     * Determines the product of two matrices.
     * @param left - The first matrix to multiply
     * @param right - The second matrix to multiply
     * @param out - The product of two matrices
     */
    static multiply(left: Matrix3, right: Matrix3, out: Matrix3): void;
    /**
     * Determines whether the specified matrices are equals.
     * @param left - The first matrix to compare
     * @param right - The second matrix to compare
     * @returns True if the specified matrices are equals, false otherwise
     */
    static equals(left: Matrix3, right: Matrix3): boolean;
    /**
     * Performs a linear interpolation between two matrices.
     * @param start - The first matrix
     * @param end - The second matrix
     * @param t - The blend amount where 0 returns start and 1 end
     * @param out - The result of linear blending between two matrices
     */
    static lerp(start: Matrix3, end: Matrix3, t: number, out: Matrix3): void;
    /**
     * Calculate a rotation matrix from a quaternion.
     * @param quaternion - The quaternion used to calculate the matrix
     * @param out - The calculated rotation matrix
     */
    static rotationQuaternion(quaternion: Quaternion, out: Matrix3): void;
    /**
     * Calculate a matrix from scale vector.
     * @param s - The scale vector
     * @param out - The calculated matrix
     */
    static scaling(s: Vector2, out: Matrix3): void;
    /**
     * Calculate a matrix from translation vector.
     * @param translation - The translation vector
     * @param out - The calculated matrix
     */
    static translation(translation: Vector2, out: Matrix3): void;
    /**
     * Calculate the inverse of the specified matrix.
     * @param a - The matrix whose inverse is to be calculated
     * @param out - The inverse of the specified matrix
     */
    static invert(a: Matrix3, out: Matrix3): void;
    /**
     * Calculate a 3x3 normal matrix from a 4x4 matrix.
     * @remarks The calculation process is the transpose matrix of the inverse matrix.
     * @param mat4 - The 4x4 matrix
     * @param out - THe 3x3 normal matrix
     */
    static normalMatrix(mat4: Matrix4, out: Matrix3): void;
    /**
     * The specified matrix rotates around an angle.
     * @param a - The specified matrix
     * @param r - The rotation angle in radians
     * @param out - The rotated matrix
     */
    static rotate(a: Matrix3, r: number, out: Matrix3): void;
    /**
     * Scale a matrix by a given vector.
     * @param m - The matrix
     * @param s - The given vector
     * @param out - The scaled matrix
     */
    static scale(m: Matrix3, s: Vector2, out: Matrix3): void;
    /**
     * Translate a matrix by a given vector.
     * @param m - The matrix
     * @param translation - The given vector
     * @param out - The translated matrix
     */
    static translate(m: Matrix3, translation: Vector2, out: Matrix3): void;
    /**
     * Calculate the transpose of the specified matrix.
     * @param a - The specified matrix
     * @param out - The transpose of the specified matrix
     */
    static transpose(a: Matrix3, out: Matrix3): void;
    /**
     * An array containing the elements of the matrix (column matrix).
     * @remarks
     * elements[0] first column and first row value m11
     * elements[1] first column and second row value m12
     * elements[2] first column and third row value m13
     * elements[3] second column and first row value m21
     * and so on
     */
    elements: Float32Array;
    /**
     * Constructor of 3*3 matrix.
     * @param m11 - Default 1 column 1, row 1
     * @param m12 - Default 0 column 1, row 2
     * @param m13 - Default 0 column 1, row 3
     * @param m21 - Default 0 column 2, row 1
     * @param m22 - Default 1 column 2, row 2
     * @param m23 - Default 0 column 2, row 3
     * @param m31 - Default 0 column 3, row 1
     * @param m32 - Default 0 column 3, row 2
     * @param m33 - Default 1 column 3, row 3
     */
    constructor(m11?: number, m12?: number, m13?: number, m21?: number, m22?: number, m23?: number, m31?: number, m32?: number, m33?: number);
    /**
     * Set the value of this matrix, and return this matrix.
     * @param m11
     * @param m12
     * @param m13
     * @param m21
     * @param m22
     * @param m23
     * @param m31
     * @param m32
     * @param m33
     * @returns This matrix
     */
    setValue(m11: number, m12: number, m13: number, m21: number, m22: number, m23: number, m31: number, m32: number, m33: number): Matrix3;
    /**
     * Set the value of this matrix by an array.
     * @param array - The array
     * @param offset - The start offset of the array
     * @returns This matrix
     */
    setValueByArray(array: ArrayLike<number>, offset?: number): Matrix3;
    /**
     * Set the value of this 3x3 matrix by the specified 4x4 matrix.
     * upper-left principle
     * @param a - The specified 4x4 matrix
     * @returns This 3x3 matrix
     */
    setValueByMatrix(a: Matrix4): Matrix3;
    /**
     * Clone the value of this matrix to an array.
     * @param out - The array
     * @param outOffset - The start offset of the array
     */
    toArray(out: number[] | Float32Array | Float64Array, outOffset?: number): void;
    /**
     * Creates a clone of this matrix.
     * @returns A clone of this matrix
     */
    clone(): Matrix3;
    /**
     * Clones this matrix to the specified matrix.
     * @param out - The specified matrix
     * @returns The specified matrix
     */
    cloneTo(out: Matrix3): Matrix3;
    /**
     * Determines the sum of this matrix and the specified matrix.
     * @param right - The specified matrix
     * @returns This matrix that store the sum of the two matrices
     */
    add(right: Matrix3): Matrix3;
    /**
     * Determines the difference between this matrix and the specified matrix.
     * @param right - The specified matrix
     * @returns This matrix that store the difference between the two matrices
     */
    subtract(right: Matrix3): Matrix3;
    /**
     * Determines the product of this matrix and the specified matrix.
     * @param right - The specified matrix
     * @returns This matrix that store the product of the two matrices
     */
    multiply(right: Matrix3): Matrix3;
    /**
     * Calculate a determinant of this matrix.
     * @returns The determinant of this matrix
     */
    determinant(): number;
    /**
     * Identity this matrix.
     * @returns This matrix after identity
     */
    identity(): Matrix3;
    /**
     * Invert the matrix.
     * @returns The matrix after invert
     */
    invert(): Matrix3;
    /**
     * This matrix rotates around an angle.
     * @param r - The rotation angle in radians
     * @returns This matrix after rotate
     */
    rotate(r: number): Matrix3;
    /**
     * Scale this matrix by a given vector.
     * @param s - The given vector
     * @returns This matrix after scale
     */
    scale(s: Vector2): Matrix3;
    /**
     * Translate this matrix by a given vector.
     * @param translation - The given vector
     * @returns This matrix after translate
     */
    translate(translation: Vector2): Matrix3;
    /**
     * Calculate the transpose of this matrix.
     * @returns This matrix after transpose
     */
    transpose(): Matrix3;
}
