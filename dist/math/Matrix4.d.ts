import { Quaternion } from './Quaternion';
import { Vector3 } from './Vector3';
/**
 * Represents a 4x4 mathematical matrix.
 */
export declare class Matrix4 {
    private static readonly _tempVec30;
    private static readonly _tempVec31;
    private static readonly _tempVec32;
    private static readonly _tempMat30;
    /** @internal Identity matrix. */
    static readonly _identity: Matrix4;
    /**
     * Determines the product of two matrices.
     * @param left - The first matrix to multiply
     * @param right - The second matrix to multiply
     * @param out - The product of the two matrices
     */
    static multiply(left: Matrix4, right: Matrix4, out: Matrix4): void;
    /**
     * Determines whether the specified matrices are equals.
     * @param left - The first matrix to compare
     * @param right - The second matrix to compare
     * @returns True if the specified matrices are equals, false otherwise
     */
    static equals(left: Matrix4, right: Matrix4): boolean;
    /**
     * Performs a linear interpolation between two matrices.
     * @param start - The first matrix
     * @param end - The second matrix
     * @param t - The blend amount where 0 returns start and 1 end
     * @param out - The result of linear blending between two matrices
     */
    static lerp(start: Matrix4, end: Matrix4, t: number, out: Matrix4): void;
    /**
     * Calculate a rotation matrix from a quaternion.
     * @param quaternion - The quaternion used to calculate the matrix
     * @param out - The calculated rotation matrix
     */
    static rotationQuaternion(quaternion: Quaternion, out: Matrix4): void;
    /**
     * Calculate a matrix rotates around an arbitrary axis.
     * @param axis - The axis
     * @param r - The rotation angle in radians
     * @param out - The matrix after rotate
     */
    static rotationAxisAngle(axis: Vector3, r: number, out: Matrix4): void;
    /**
     * Calculate a matrix from a quaternion and a translation.
     * @param quaternion - The quaternion used to calculate the matrix
     * @param translation - The translation used to calculate the matrix
     * @param out - The calculated matrix
     */
    static rotationTranslation(quaternion: Quaternion, translation: Vector3, out: Matrix4): void;
    /**
     * Calculate an affine matrix.
     * @param scale - The scale used to calculate matrix
     * @param rotation - The rotation used to calculate matrix
     * @param translation - The translation used to calculate matrix
     * @param out - The calculated matrix
     */
    static affineTransformation(scale: Vector3, rotation: Quaternion, translation: Vector3, out: Matrix4): void;
    /**
     * Calculate a matrix from scale vector.
     * @param s - The scale vector
     * @param out - The calculated matrix
     */
    static scaling(s: Vector3, out: Matrix4): void;
    /**
     * Calculate a matrix from translation vector.
     * @param translation - The translation vector
     * @param out - The calculated matrix
     */
    static translation(translation: Vector3, out: Matrix4): void;
    /**
     * Calculate the inverse of the specified matrix.
     * @param a - The matrix whose inverse is to be calculated
     * @param out - The inverse of the specified matrix
     */
    static invert(a: Matrix4, out: Matrix4): void;
    /**
     * Calculate a right-handed look-at matrix.
     * @param eye - The position of the viewer's eye
     * @param target - The camera look-at target
     * @param up - The camera's up vector
     * @param out - The calculated look-at matrix
     */
    static lookAt(eye: Vector3, target: Vector3, up: Vector3, out: Matrix4): void;
    /**
     * Calculate an orthographic projection matrix.
     * @param left - The left edge of the viewing
     * @param right - The right edge of the viewing
     * @param bottom - The bottom edge of the viewing
     * @param top - The top edge of the viewing
     * @param near - The depth of the near plane
     * @param far - The depth of the far plane
     * @param out - The calculated orthographic projection matrix
     */
    static ortho(left: number, right: number, bottom: number, top: number, near: number, far: number, out: Matrix4): void;
    /**
     * Calculate a perspective projection matrix.
     * @param fovY - Field of view in the y direction, in radians
     * @param aspect - Aspect ratio, defined as view space width divided by height
     * @param near - The depth of the near plane
     * @param far - The depth of the far plane
     * @param out - The calculated perspective projection matrix
     */
    static perspective(fovY: number, aspect: number, near: number, far: number, out: Matrix4): void;
    /**
     * The specified matrix rotates around an arbitrary axis.
     * @param m - The specified matrix
     * @param axis - The axis
     * @param r - The rotation angle in radians
     * @param out - The rotated matrix
     */
    static rotateAxisAngle(m: Matrix4, axis: Vector3, r: number, out: Matrix4): void;
    /**
     * Scale a matrix by a given vector.
     * @param m - The matrix
     * @param s - The given vector
     * @param out - The scaled matrix
     */
    static scale(m: Matrix4, s: Vector3, out: Matrix4): void;
    /**
     * Translate a matrix by a given vector.
     * @param m - The matrix
     * @param v - The given vector
     * @param out - The translated matrix
     */
    static translate(m: Matrix4, v: Vector3, out: Matrix4): void;
    /**
     * Calculate the transpose of the specified matrix.
     * @param a - The specified matrix
     * @param out - The transpose of the specified matrix
     */
    static transpose(a: Matrix4, out: Matrix4): void;
    /**
     * An array containing the elements of the matrix (column matrix).
     * @remarks
     * elements[0] first column and first row value m11
     * elements[1] first column and second row value m12
     * elements[2] first column and third row value m13
     * elements[3] first column and fourth row value m14
     * elements[4] second column and first row value m21
     * and so on
     */
    elements: Float32Array;
    /**
     * Constructor of 4x4 Matrix4.
     * @param m11 - default 1, column 1, row 1
     * @param m12 - default 0, column 1, row 2
     * @param m13 - default 0, column 1, row 3
     * @param m14 - default 0, column 1, row 4
     * @param m21 - default 0, column 2, row 1
     * @param m22 - default 1, column 2, row 2
     * @param m23 - default 0, column 2, row 3
     * @param m24 - default 0, column 2, row 4
     * @param m31 - default 0, column 3, row 1
     * @param m32 - default 0, column 3, row 2
     * @param m33 - default 1, column 3, row 3
     * @param m34 - default 0, column 3, row 4
     * @param m41 - default 0, column 4, row 1
     * @param m42 - default 0, column 4, row 2
     * @param m43 - default 0, column 4, row 3
     * @param m44 - default 1, column 4, row 4
     */
    constructor(m11?: number, m12?: number, m13?: number, m14?: number, m21?: number, m22?: number, m23?: number, m24?: number, m31?: number, m32?: number, m33?: number, m34?: number, m41?: number, m42?: number, m43?: number, m44?: number);
    /**
     * Set the value of this matrix, and return this matrix.
     * @param m11 - column 1, row 1
     * @param m12 - column 1, row 2
     * @param m13 - column 1, row 3
     * @param m14 - column 1, row 4
     * @param m21 - column 2, row 1
     * @param m22 - column 2, row 2
     * @param m23 - column 2, row 3
     * @param m24 - column 2, row 4
     * @param m31 - column 3, row 1
     * @param m32 - column 3, row 2
     * @param m33 - column 3, row 3
     * @param m34 - column 3, row 4
     * @param m41 - column 4, row 1
     * @param m42 - column 4, row 2
     * @param m43 - column 4, row 3
     * @param m44 - column 4, row 4
     * @returns This matrix
     */
    setValue(m11: number, m12: number, m13: number, m14: number, m21: number, m22: number, m23: number, m24: number, m31: number, m32: number, m33: number, m34: number, m41: number, m42: number, m43: number, m44: number): Matrix4;
    /**
     * Set the value of this matrix by an array.
     * @param array - The array
     * @param offset - The start offset of the array
     * @returns This matrix
     */
    setValueByArray(array: ArrayLike<number>, offset?: number): Matrix4;
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
    clone(): Matrix4;
    /**
     * Clones this matrix to the specified matrix.
     * @param out - The specified matrix
     * @returns The specified matrix
     */
    cloneTo(out: Matrix4): Matrix4;
    /**
     * Determines the product of this matrix and the specified matrix.
     * @param right - The specified matrix
     * @returns This matrix that store the product of the two matrices
     */
    multiply(right: Matrix4): Matrix4;
    /**
     * Calculate a determinant of this matrix.
     * @returns The determinant of this matrix
     */
    determinant(): number;
    /**
     * Decompose this matrix to translation, rotation and scale elements.
     * @param translation - Translation vector as an output parameter
     * @param rotation - Rotation quaternion as an output parameter
     * @param scale - Scale vector as an output parameter
     * @returns True if this matrix can be decomposed, false otherwise
     */
    decompose(translation: Vector3, rotation: Quaternion, scale: Vector3): boolean;
    /**
     * Get rotation from this matrix.
     * @param out - Rotation quaternion as an output parameter
     * @returns The out
     */
    getRotation(out: Quaternion): Quaternion;
    /**
     * Get scale from this matrix.
     * @param out - Scale vector as an output parameter
     * @returns The out
     */
    getScaling(out: Vector3): Vector3;
    /**
     * Get translation from this matrix.
     * @param out - Translation vector as an output parameter
     * @returns The out
     */
    getTranslation(out: Vector3): Vector3;
    /**
     * Identity this matrix.
     * @returns This matrix after identity
     */
    identity(): Matrix4;
    /**
     * Invert the matrix.
     * @returns The matrix after invert
     */
    invert(): Matrix4;
    /**
     * This matrix rotates around an arbitrary axis.
     * @param axis - The axis
     * @param r - The rotation angle in radians
     * @returns This matrix after rotate
     */
    rotateAxisAngle(axis: Vector3, r: number): Matrix4;
    /**
     * Scale this matrix by a given vector.
     * @param s - The given vector
     * @returns This matrix after scale
     */
    scale(s: Vector3): Matrix4;
    /**
     * Translate this matrix by a given vector.
     * @param v - The given vector
     * @returns This matrix after translate
     */
    translate(v: Vector3): Matrix4;
    /**
     * Calculate the transpose of this matrix.
     * @returns This matrix after transpose
     */
    transpose(): Matrix4;
}
