/**
 * Describes a color in the from of RGBA (in order: R, G, B, A).
 */
export declare class Color {
    /**
     * Modify a value from the gamma space to the linear space.
     * @param value - The value in gamma space
     * @returns The value in linear space
     */
    static gammaToLinearSpace(value: number): number;
    /**
     * Modify a value from the linear space to the gamma space.
     * @param value - The value in linear space
     * @returns The value in gamma space
     */
    static linearToGammaSpace(value: number): number;
    /**
     * Determines whether the specified colors are equals.
     * @param left - The first color to compare
     * @param right - The second color to compare
     * @returns True if the specified colors are equals, false otherwise
     */
    static equals(left: Color, right: Color): boolean;
    /**
     * Determines the sum of two colors.
     * @param left - The first color to add
     * @param right - The second color to add
     * @param out - The sum of two colors
     * @returns The added color
     */
    static add(left: Color, right: Color, out: Color): Color;
    /**
     * Scale a color by the given value.
     * @param left - The color to scale
     * @param s - The amount by which to scale the color
     * @param out - The scaled color
     * @returns The scaled color
     */
    static scale(left: Color, s: number, out: Color): Color;
    /** The red component of the color, 0~1. */
    r: number;
    /** The green component of the color, 0~1. */
    g: number;
    /** The blue component of the color, 0~1. */
    b: number;
    /** The alpha component of the color, 0~1. */
    a: number;
    /**
     * Constructor of Color.
     * @param r - The red component of the color
     * @param g - The green component of the color
     * @param b - The blue component of the color
     * @param a - The alpha component of the color
     */
    constructor(r?: number, g?: number, b?: number, a?: number);
    /**
     * Set the value of this color.
     * @param r - The red component of the color
     * @param g - The green component of the color
     * @param b - The blue component of the color
     * @param a - The alpha component of the color
     * @returns This color.
     */
    setValue(r: number, g: number, b: number, a: number): Color;
    /**
     * Determines the sum of this color and the specified color.
     * @param color - The specified color
     * @returns The added color
     */
    add(color: Color): Color;
    /**
     * Scale this color by the given value.
     * @param s - The amount by which to scale the color
     * @returns The scaled color
     */
    scale(s: number): Color;
    /**
     * Creates a clone of this color.
     * @returns A clone of this color
     */
    clone(): Color;
    /**
     * Clones this color to the specified color.
     * @param out - The specified color
     * @returns The specified color
     */
    cloneTo(out: Color): Color;
    /**
     * Modify components (r, g, b) of this color from gamma space to linear space.
     * @param out - The color in linear space
     * @returns The color in linear space
     */
    toLinear(out: Color): Color;
    /**
     * Modify components (r, g, b) of this color from linear space to gamma space.
     * @param out - The color in gamma space
     * @returns The color in gamma space
     */
    toGamma(out: Color): Color;
}
