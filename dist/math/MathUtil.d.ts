/**
 * Common utility methods for math operations.
 */
export declare class MathUtil {
    /** The value for which all absolute numbers smaller than are considered equal to zero. */
    static readonly zeroTolerance: number;
    /** The conversion factor that radian to degree. */
    static readonly radToDegreeFactor: number;
    /** The conversion factor that degree to radian. */
    static readonly degreeToRadFactor: number;
    /**
     * Clamps the specified value.
     * @param v - The specified value
     * @param min - The min value
     * @param max - The max value
     * @returns The result of clamping a value between min and max
     */
    static clamp(v: number, min: number, max: number): number;
    /**
     * Checks if a and b are almost equals.
     * The absolute value of the difference between a and b is close to zero.
     * @param a - The left value to compare
     * @param b - The right value to compare
     * @returns True if a almost equal to b, false otherwise
     */
    static equals(a: number, b: number): boolean;
    /**
     * Determines whether the specified v is pow2.
     * @param v - The specified v
     * @returns True if the specified v is pow2, false otherwise
     */
    static isPowerOf2(v: number): boolean;
    /**
     * Modify the specified r from radian to degree.
     * @param r - The specified r
     * @returns The degree value
     */
    static radianToDegree(r: number): number;
    /**
     * Modify the specified d from degree to radian.
     * @param d - The specified d
     * @returns The radian value
     */
    static degreeToRadian(d: number): number;
}
